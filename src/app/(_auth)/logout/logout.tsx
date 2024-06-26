'use client';

import { useRouter } from 'next/navigation';
import { MdLogout } from 'react-icons/md';

export default function Logout () {

    const router = useRouter();

    return (
      <div className="">
          <button 
            className="w-10 h-10 rounded-full flex text-xl  hover:bg-lightHover  dark:hover:bg-darkHover justify-center items-center "
            onClick={() => router.push('/logout')}
          > 
            <MdLogout /> 
          </button>
      </div>
    )
}