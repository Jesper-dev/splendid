import { useState } from "react";
import { Form } from "../components/Form";
import { dbFunc } from "../api/db";

const Signup = () => {
  const [state, setState] = useState<{
    name: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  interface ReqBody {
    name: string;
    username: string;
    email: string;
    password: string;
    password2: string;
    date: number;
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.password !== state.confirmPassword)
      alert("Passwords do not match!");
    else {
      const userObj: ReqBody = {
        name: state.name,
        username: state.userName,
        email: state.email,
        password: state.password,
        password2: state.confirmPassword,
        date: Date.now(),
      };
      dbFunc(
        "https://splendidsrv.herokuapp.com/api/users/register",
        "post",
        userObj
      );
      setState((prev) => ({
        ...prev,
        name: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }));
      console.log(
        state.name,
        state.userName,
        state.email,
        state.password,
        state.confirmPassword
      );
    }
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "name") {
      setState((prev) => ({ ...prev, name: e.target.value }));
    } else if (e.target.id === "username") {
      setState((prev) => ({ ...prev, userName: e.target.value }));
    } else if (e.target.id === "email") {
      setState((prev) => ({ ...prev, email: e.target.value }));
    } else if (e.target.id === "password") {
      setState((prev) => ({ ...prev, password: e.target.value }));
    } else if (e.target.id === "confirmPassword") {
      setState((prev) => ({ ...prev, confirmPassword: e.target.value }));
    }
  };

  return (
    <>
      <h1>Signup</h1>
      <Form
        submitFunc={submit}
        values={{
          name: "Name",
          userName: "Username",
          email: "Email",
          password: "Password",
          confirmPassword: "Confirm Password",
          buttonText: "submit",
        }}
      >
        {(values) => (
          <>
            <label>{values.name}</label>
            <input
              type="text"
              id="name"
              value={state.name}
              onChange={(e) => onInputChange(e)}
            />
            <label>{values.userName}</label>
            <input
              type="text"
              id="username"
              value={state.userName}
              onChange={(e) => onInputChange(e)}
            />
            <label>{values.email}</label>
            <input
              type="email"
              id="email"
              value={state.email}
              onChange={(e) => onInputChange(e)}
            />
            <label>{values.password}</label>
            <input
              type="password"
              id="password"
              value={state.password}
              onChange={(e) => onInputChange(e)}
            />
            <label>{values.confirmPassword}</label>
            <input
              type="password"
              id="confirmPassword"
              value={state.confirmPassword}
              onChange={(e) => onInputChange(e)}
            />
            <button>{values.buttonText}</button>
          </>
        )}
      </Form>
    </>
  );
};

export default Signup;
