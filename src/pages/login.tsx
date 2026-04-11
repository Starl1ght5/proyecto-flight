import LoginComponent from "../components/logincomponent.tsx";
import RegisterComponent from "../components/registercomponent.tsx";
import { useState } from "react";
import { Helmet } from "react-helmet";

const Login: React.FC = () => {

  const [ LogginIn, setLogginIn ] = useState<boolean>(true);

  const changeLoginState = (value: boolean) => {
    setLogginIn(value);
  }

  return (
    <div className="flex flex-row justify-center bg-white">
      <Helmet>
        {LogginIn ? (
          <title>Inicia Sesión - Royal Airlines</title>
        ) : (
          <title>Regístrate - Royal Airlines</title>
        )}
      </Helmet>

      {LogginIn ? (
        <LoginComponent changeState={changeLoginState} />
      ) : (
        <RegisterComponent changeState={changeLoginState}/>
      )}
    </div>
    
  )
}

export default Login;