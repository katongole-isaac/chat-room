import User from "../../models/user";
import { NextAuthOptions, getServerSession } from "next-auth";
import { verifyPassword } from "../../../../lib/hashPassword";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../../lib/mongo/db";
import { createSession, decrypt, encrypt } from "../../../../lib/session";

const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
    newUser: "/signup"
  },
  session: {
    maxAge: 14 * 24 * 60 * 60 * 1000,
    strategy: "jwt",
  },

  jwt: {
    encode : ({ token  }) => {

        const { email,name, sub } = token;
        const payload = { email, name, sub };

        return encrypt(payload);
     
    } ,
    decode : async ({ token })  => {

      const decoded = await decrypt(token);

      if(!decoded) return {}

      return decoded;
    }
  },

  callbacks: {

   async jwt({ token }) {

      return token;

    },

    async session({session, token  }) {
     
      const { email , name, sub } = token;

      session.user = {email, username: name, id: sub } as { id: string; email: string; username: string; }

      return session;

    },

  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {

       await dbConnect();

       const { email, password } = credentials;

       const emailRegExp = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

       const isEmailOrUsername = emailRegExp.test(email);

       let user ;

       if(isEmailOrUsername)
        user = await User.findOne({ email })

      else
        user = await User.findOne({ username: email  });

       if(!user) return null;

       const { password: hash, _id  } = user;

       const isValidPassword = await verifyPassword(hash, password);

       if(!isValidPassword) return null;
 
       createSession(_id.toString());

       const { email:_email, username } = user;

        return { id: _id.toString(), email: _email, name: username };
      },
    }),
  ],
};

export default options;

export const _getServerSession = async( ) => await getServerSession(options)



