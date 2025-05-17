import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function oauthredirect () {

    const navigate = useNavigate();

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