import { useState } from "react";
import { Form } from "../components/Form";
import { dbFunc } from "../api/db";

const Login = () => {
  const [state, setState] = useState<{ userName: string; password: string }>({
    userName: "",
    password: "",
  });
  interface ReqBody {
    username: string;
    password: string;
  }
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userObj: ReqBody = {
      username: state.userName,
      password: state.password,
    };
    dbFunc(
      "https://splendidsrv.herokuapp.com/api/users/login",
      "post",
      userObj
    );
    setState((prev) => ({ ...prev, userName: "", password: "" }));
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.id === "username"
      ? setState((prev) => ({ ...prev, userName: e.target.value }))
      : setState((prev) => ({ ...prev, password: e.target.value }));
  };
  return (
    <>
      <Form
        submitFunc={submit}
        values={{
          username: "Username",
          password: "Password",
          buttonText: "submit",
        }}
      >
        {(values) => (
          <>
            <label>{values.username}</label>
            <input
              type="text"
              id="username"
              value={state.userName}
              onChange={(e) => onInputChange(e)}
            />
            <label>{values.password}</label>
            <input
              type="password"
              id="password"
              value={state.password}
              onChange={(e) => onInputChange(e)}
            />
            <button>{values.buttonText}</button>
          </>
        )}
      </Form>
    </>
  );
};

export default Login;
