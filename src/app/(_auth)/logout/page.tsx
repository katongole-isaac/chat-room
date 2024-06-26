'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import Loading from "../../../components/common/loading";

export default function LogoutPage() {

    const router = useRouter();

    useEffect(() => {

        Cookies.remove('x-session-token');
        Cookies.remove('x-refresh-token');

        router.replace('/login');

     }, []);


    return (
            <div className="w-full h-screen flex justify-center items-center">
                <Loading />
            </div>    
    )
}