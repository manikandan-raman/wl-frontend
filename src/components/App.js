import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { User } from "./User";


function App() {

  const checkValidToken = () => {
    return localStorage.getItem('wl_user_token') !== null;
  }

  return (
    <Routes>
      <Route path="/" exact Component={SignUpForm} />
      <Route path="/login" exact Component={LoginForm} />
      <Route path="/signup"exact Component={SignUpForm} />
      {/* {checkValidToken() ? <Route path="/user" exact Component={User} /> : <Route path="/user"exact Component={User} />  } */}
      <Route path="/user"exact Component={checkValidToken ? User : LoginForm} />
    </Routes>
  );
}

export default App;
