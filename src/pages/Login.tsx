import { useState } from "react";
import { Form } from "../components/Form";

const Login = () => {
  const [state, setState] = useState<{ userName: string; password: string }>({
    userName: "",
    password: "",
  });
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Username: ", state.userName);
    console.log("Password: ", state.password);
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
          firstInput: "Username",
          secondInput: "Password",
          buttonText: "submit",
        }}
      >
        {(values) => (
          <>
            <label>{values.firstInput}</label>
            <input
              type="text"
              id="username"
              value={state.userName}
              onChange={(e) => onInputChange(e)}
            />
            <label>{values.secondInput}</label>
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
