import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


export default function oauthredirect () {

    const navigate = useNavigate();
    const [ , setCookie ] = useCookies(['RoyalUserToken']);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        setCookie('RoyalUserToken', token, {
            path: '/',
            secure: true,
            sameSite: 'none',
            maxAge: 3600,
        });

        navigate("/");
        
    }, []);

    return (
        <div></div>
    )
}