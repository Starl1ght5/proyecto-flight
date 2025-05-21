import { Helmet } from "react-helmet";
import Footer from "../components/footercomponent";
import Navbar from "../components/navbarcomponent";
import { BoardingPassCard } from "../components/cards/boardingpasscard";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from 'react-cookie';
import { BoardingPass, customPayload } from "../types";

export default function ticketsmenu () {

    const [ selected1, setSelected1 ] = useState<boolean>(true);
    const [ selected2, setSelected2 ] = useState<boolean>(false);
    const [ selected3, setSelected3 ] = useState<boolean>(false);
    const [ cookie ] = useCookies(['RoyalUserToken']);

    const [ passess, setPassess ] = useState<BoardingPass[]>([]);


    useEffect(() => {

        const checkCookie = () => {
            const doesCookieExist = !cookie.RoyalUserToken || cookie.RoyalUserToken === "";
            return doesCookieExist ? "" : cookie.RoyalUserToken;
        }


        const decodeToken = (token: string): customPayload | null => {
            try {
                return jwtDecode<customPayload>(token);
            } catch (error) {
                console.error('Error decodificando token:', error);
                return null;
            }
        }   


        const searchAllFromUser = async () => {
            try {
                const token = decodeToken(checkCookie());

                if (!token || !token.id) {
                    console.error('Token inválido o sin ID');
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}boarding/searchAll?user=${token.id}`, {
                    method: 'GET'
                });

                const res = await response.json();
                setPassess(res);

            } catch (e) {
                console.error(e);
            }
        }


        searchAllFromUser();

    }, [])


    const checkCookie = () => {
        const doesCookieExist = !cookie.RoyalUserToken || cookie.RoyalUserToken === "";
        return doesCookieExist ? "" : cookie.RoyalUserToken;
    }


    const decodeToken = (token: string): customPayload | null => {
        try {
            return jwtDecode<customPayload>(token);
        } catch (error) {
            console.error('Error decodificando token:', error);
            return null;
        }
    }


    const searchAllFromUser = async () => {
            try {
                const token = decodeToken(checkCookie());

                if (!token || !token.id) {
                    console.error('Token inválido o sin ID');
                    return;
                }
                
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}boarding/searchAll?user=${token.id}`, {
                    method: 'GET'
                });

                const res = await response.json();
                setPassess(res);

            } catch (e) {
                console.error(e);
            }
        }


    const searchActive = async () => {
        try {
                const token = decodeToken(checkCookie());

                if (!token || !token.id) {
                    console.error('Token inválido o sin ID');
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}boarding/searchActive?user=${token.id}`, {
                    method: 'GET'
                });

                const res = await response.json();
                setPassess(res);

            } catch (e) {
                console.error(e);
            }
    }

    const searchInactive = async () => {
        try {
                const token = decodeToken(checkCookie());

                if (!token || !token.id) {
                    console.error('Token inválido o sin ID');
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}boarding/searchInactive?user=${token.id}`, {
                    method: 'GET'
                });

                const res = await response.json();
                setPassess(res);

            } catch (e) {
                console.error(e);
            }
    }


    const changeState1 = () => {
        if (!selected1) {
            setSelected1(true);
            setSelected2(false);
            setSelected3(false);
            searchAllFromUser();
        }
    }


    const changeState2 = () => {
        if (!selected2) {
            setSelected1(false);
            setSelected2(true);
            setSelected3(false);
            searchActive();
        }
    }


    const changeState3 = () => {
        if (!selected3) {
            setSelected1(false);
            setSelected2(false);
            setSelected3(true);
            searchInactive();
        }   
    }


    return (
        <div>
            <Helmet>
                <title>Royal Airlines - Mis Ticketes</title>
            </Helmet>

            <Navbar />

            <div className="flex flex-col px-7 py-3">

                <h1 className="lg:text-2-5xl text-2xl px-3 pb-3">Mis Ticketes</h1>

                <div className="flex flex-row justify-between gap-2">

                    <div className="bg-white px-7 py-5 rounded-lg shadow-lg h-45">

                        <h2 className="pb-4 text-lg">Mostrar:</h2>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 items-center justify-between">
                                <p  className={`duration-200" 
                                    ${ selected1 
                                    ? ''
                                    : ' hover:cursor-pointer hover:text-gold' }`} 
                                    onClick={changeState1}>Todos los ticketes</p>

                                <span className={`icon-[ion--checkmark-circled]  
                                ${ selected1 
                                    ? 'bg-lilac'
                                    : 'bg-gray-400 hover:cursor-pointer hover:text-gold' }`} />
                            </div>

                            <div className="flex flex-row gap-2 items-center justify-between">
                                <p className={`duration-200" 
                                    ${ selected2 
                                    ? ''
                                    : ' hover:cursor-pointer hover:text-gold' }`} 
                                    onClick={changeState2}>Ticketes Activos</p>

                                <span className={`icon-[ion--checkmark-circled]  
                                ${ selected2 
                                    ? 'bg-lilac'
                                    : 'bg-gray-400' }`} />
                            </div>
                            <div className="flex flex-row gap-2 items-center justify-between">
                                <p className={`duration-200" 
                                    ${ selected3 
                                    ? ''
                                    : ' hover:cursor-pointer hover:text-gold' }`}
                                    onClick={changeState3}> Ticketes Antiguos</p>

                                <span className={`icon-[ion--checkmark-circled]  
                                ${ selected3 
                                    ? 'bg-lilac'
                                    : 'bg-gray-400' }`} />
                            </div>
                        </div>

                    </div>

                    <div className="grid grid-cols-2 space-y-3 space-x-2">
                        {passess?.map(element => {
                            return (
                                <BoardingPassCard boardingPass={element} />
                            )
                        })}
                        
                    </div>

                </div>

            </div>

            <Footer />
        </div>
    )
}
