import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";


const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const validatePassword = (value) => {
    setPassword(value);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(value)) {
      setPasswordError("Password must be at least 8 characters long and contain both letters and numbers.");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (value) => {
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const isFormValid =
    username.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    passwordError === "" &&
    confirmPasswordError === "" &&
    isChecked;

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: user.email,
    });
    window.location.href = "/profile";

    console.log("User created and added to Firestore successfully!");
  } catch (error) {
    console.error("Error:", error.message);
  }
};


  return (
    <section className="max_pad_container flexCenter flex-col pt-32 mb-12">
      <form onSubmit={handleSubmit} className="flex flex-col m-auto px-14 py-10 bg-[#ffffff77] justify-center items-center max-w-[555px] h-[600px] rounded-xl">
        <h3 className="text-2xl font-bold mb-4">Sign Up</h3>
        <div className="flex flex-col gap-4 mt-7">
          <input
            type="text"
            placeholder="Username"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl cursor-text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl cursor-text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl cursor-text"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl cursor-text"
            value={confirmPassword}
            onChange={(e) => validateConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}

          <div className="flex items-center mt-6 gap-3">
            <input type="checkbox" id="terms" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
            <label htmlFor="terms" className="ml-2">
              By continuing, I agree with the terms and conditions
            </label>
          </div>

          <button
            type="submit"
            className={`my-4 bg-pink-500 text-white py-2 px-4 rounded-xl transition ${
              isFormValid ? "hover:bg-pink-600" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            Sign Up
          </button>

          <p className="text-black font-bold ">
            Already have an account?{" "}
            <NavLink to="/login" className=" flex relative text-blue-500 hover:underline ">
              Log In
            </NavLink>
          </p>

        </div>
      </form>
    </section>
  );
};

export default Signup;
