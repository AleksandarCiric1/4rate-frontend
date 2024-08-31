import React, { useRef, useState } from "react";
import FormInput from "../components/shared/FormInput";

export const SimpleForm = () => {
  //   if we use useState hook, it will rerender this component every time username has changed.
  //   as better solution we can use useRef hook!
  //   const [username, setUsername] = useState("");
  //   const usernameRef = useRef();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Enter username",
      errorMessage:
        "Username should be 3-16 character and shouldn't include any special character!",
      label: "Username",
      required: true,
      pattern: "^[A-Za-z0-9]{3,16}$",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Enter email",
      errorMessage: "It should be valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Enter password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Enter confirm password",
      errorMessage: "Passwords don't match",
      label: "Confrim password",
      pattern: values.password,
      required: true,
    },
    {
      id: 5,
      name: "birthday",
      type: "date",
      placeholder: "Enter birthday",
      label: "Birthday",
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const data = new FormData(e.target as HTMLFormElement);
    // const formData = Object.fromEntries(data.entries());
    // console.log(formData);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);
  return (
    <div className="flex justify-center items-center h-svh">
      <form
        onSubmit={handleSubmit}
        className="border-2 rounded-2xl px-7 py-5 bg-gray-200"
      >
        <h1 className="text-center text-emerald-600 mb-8">Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name as keyof typeof values]}
            onChange={onChange}
          />
        ))}
        <div className="flex justify-center">
          <button className="font-medium mt-4 px-3 py-2 rounded-xl bg-orange-400 hover:bg-slate-500 flex border-2 border-green-200">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
