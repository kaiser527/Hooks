import { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiServices";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showHidePassword, setShowHidePassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email !");
      return;
    }
    if (!password) {
      toast.error("Invalid Password !");
      return;
    }

    //submit apis
    const data = await postRegister(email, username, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <span>Have an account ?</span>
        <button onClick={() => navigate("/login")}>Sign in</button>
      </div>
      <div className="title col-4 mx-auto">Register</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type={"email"}
            value={email}
            className="form-control"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type={"text"}
            value={username}
            className="form-control"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label>Password</label>
          <input
            type={showHidePassword ? "text" : "password"}
            value={password}
            className="form-control"
            onChange={(event) => setPassword(event.target.value)}
          />
          <span
            className="icons-eye"
            onClick={() => setShowHidePassword(!showHidePassword)}
          >
            {showHidePassword ? <VscEye /> : <VscEyeClosed />}
          </span>
        </div>
        <div>
          <button onClick={() => handleRegister()}>Create an account</button>
        </div>
        <div className="text-center">
          <span className="back" onClick={() => navigate("/")}>
            &lt;&lt; Go to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
