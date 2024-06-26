import { NextAuthOptions, getServerSession } from "next-auth";

const options: NextAuthOptions = {
  
  jwt: { },

  callbacks: { },

  providers: []
    
};

export default options;

export const _getServerSession = async( ) => await getServerSession(options)



