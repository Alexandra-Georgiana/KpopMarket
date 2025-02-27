import { useState } from "react";
import { NavLink } from "react-router-dom";	

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isInteracted, setIsInteracted] = useState(false); // Tracks if user clicked on inputs

  const validatePassword = (value) => {
    setPassword(value);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(value)) {
      setPasswordError("Password must be at least 8 characters long and contain both letters and numbers.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordError) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <section className="max_padd_container flexCenter flex-col pt-32">
      <form onSubmit={handleSubmit} className="flex flex-col m-auto px-14 py-10 bg-[#ffffff77] justify-center items-center max-w-[555px] h-[600px] rounded-xl">
        <h3 className="text-2xl font-bold mb-4">Log In</h3>
        <div className="flex flex-col gap-4 mt-7">
          <input
            type="text"
            placeholder="Username"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl cursor-text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onClick={() => setIsInteracted(true)} // Detects user interaction
          />
          <input
            type="email"
            placeholder="Email"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl cursor-text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClick={() => setIsInteracted(true)}
          />
          <input
            type="password"
            placeholder="Password"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl cursor-text"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            onClick={() => setIsInteracted(true)}
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          <button
            type="submit"
            className={`my-4 bg-pink-500 text-white py-2 px-4 rounded-xl transition ${
              isInteracted ? "hover:bg-pink-600" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isInteracted} // Button disabled until user clicks any input
          >
            Log In
          </button>

          <p className="text-black font-bold">
            Don't have an account?{" "}
            <NavLink to="/signup" className="relative text-blue-500 hover:underline inline-block">
              Sign Up
            </NavLink>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
