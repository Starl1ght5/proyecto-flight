import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


export default function oauthredirect () {

    const navigate = useNavigate();
    const [ , setCookie ] = useCookies(['RoyalUserToken']);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            fetch(`${import.meta.env.VITE_BACKEND_URL}users/cookie`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })

            }).then(response => {

                if (response.ok) {
                    const res = response.json();

                    setCookie('RoyalUserToken', res, {
                        path: '/',
                        secure: true,
                        sameSite: 'none',
                        maxAge: 3600,
                    });

                    navigate("/");
                    
                } else {
                    console.error('Error estableciendo cookie');
                }
            });
        }
    }, []);

    return (
        <div></div>
    )
}