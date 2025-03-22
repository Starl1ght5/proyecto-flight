import { useEffect } from "react";
import { ApplicationContext } from "./ApplicationContext";
import { CookiesProvider, useCookies } from 'react-cookie'


const getInitialState = () => {
    const currentUser = localStorage.getItem("currentUser");
    return currentUser ? JSON.parse(currentUser) : null
  }


const ContextComponent = ({ children }) => {

    const [ userCookie, setUserCookie ] = useCookies([getInitialState]);


    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(userCookie))
    }, [userCookie])
    

    return (
        <ApplicationContext.Provider
            value={{ userCookie, setUserCookie }}
        >
            { children }
        </ApplicationContext.Provider>
        )
}

export default ContextComponent;