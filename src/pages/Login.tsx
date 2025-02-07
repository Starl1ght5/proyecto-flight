import LoginComponent from "../Components/LoginComponent";
import RegisterComponent from "../Components/RegisterComponent";
import { useState } from "react";
import { Helmet } from "react-helmet";

const Login: React.FC = () => {

  const [ LogginIn, setLogginIn ] = useState<boolean>(true);

  const changeLoginState = (value: boolean) => {
    setLogginIn(value);
  }

  return (
    <div className="flex flex-row justify-center my-6">
      <Helmet>
        {LogginIn ? (
          <title>Inicia Sesion - Royal Airlines</title>
        ) : (
          <title>Registrate - Royal Airlines</title>
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