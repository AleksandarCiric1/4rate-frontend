import { useState } from "react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === "" || password === "") {
      setError("Please fill in both username and password!");
    } else {
      console.log("User successfully logged in!");
    }
  };
  return (
    <>
      <div className="bg-gradient-to-t from-cyan-300  to-pink-800 px-10 py-20 rounded-3xl border-2 border-gray-200 ">
        <h1 className="text-5xl font-semibold text-center">Welcome!</h1>
        <h3 className="pt-6 pb-2 font-bold text-3xl text-center">Login</h3>
        <div className="mt-8">
          <div>
            <label htmlFor="username" className="text-lg font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="bg-cyan-50 w-full border-2 border-gray-100 rounded-xl p-3 mt-1"
            />
          </div>
          <div className="pt-2">
            <label htmlFor="password" className="text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="bg-cyan-50 w-full border-2 border-gray-100 rounded-xl p-3 mt-1"
            />
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ml-2 font-medium text-base">
                Remember me!
              </label>
            </div>
            <button className="font-medium text-base text-violet-700">
              Forgot password
            </button>
          </div>
          <div className="mt-8 flex flex-col ">
            <button className="bg-fuchsia-600 text-white font-bold  text-lg py-2 rounded-xl active:scale-[.98]">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
