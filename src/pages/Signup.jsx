import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import {
  doCreateUserWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/AuthProvider";
import Modal from "../components/Modal";
import Loading from "../components/Loading";

function SignUp() {
  const [termsChecked, setTermsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  function closeModal() {
    setShowModal(false);
  }

  async function handleGoogleLogin() {
    if (authLoading) return;
    try {
      const user = await signInWithGoogle();
      if (user) {
        navigate(location.state || "/login-success");
      }
    } catch (error) {
      console.error("Google sign-in failed", error);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    if (password.trim().length < 6) {
      alert("Passwords must be a minimum of six characters in length.");
      return;
    }
    try {
      setLoading(true);
      const { user, error } = await doCreateUserWithEmailAndPassword(
        email,
        password
      );
      if (user) {
        setShowModal(true);
      } else {
        alert(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <section className="max-w-[600px] w-full px-[1.2rem]">
      <h2 className="text-[2rem] font-semibold w-[80%] leading-[2.5rem] mt-10">
        Create your new account.
      </h2>
      <p className="text-sm text-[#878787] mt-3">
        Create an account to start looking for the food you like
      </p>
      <form onSubmit={handleSignUp}>
        <div className="mt-4 flex flex-col">
          <label htmlFor="email" className="text-sm mb-2 font-semibold">
            Email Address
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
            className="border-[1px] h-[3.25rem] rounded-[0.5rem] px-3 outline-none"
            placeholder="Enter Email"
          />
        </div>

        <div className="mt-4 flex flex-col">
          <label htmlFor="usename" className="text-sm mb-2 font-semibold">
            Username
          </label>
          <input
            required
            type="text"
            id="username"
            className="border-[1px] h-[3.25rem] rounded-[0.5rem] px-3 outline-none"
            placeholder="Username"
          />
        </div>

        <div className="mt-4 flex flex-col">
          <label htmlFor="password" className="text-sm mb-2 font-semibold">
            Password
          </label>
          <div className="w-full border-[1px] rounded-[0.5rem] flex items-center">
            <input
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-[90%]  h-[3.25rem] rounded-[0.5rem]  px-3 outline-none"
              placeholder="Password"
            />
            {showPassword ? (
              <LuEye size={"1.25rem"} onClick={handleShowPassword} />
            ) : (
              <LuEyeOff size={"1.25rem"} onClick={handleShowPassword} />
            )}
          </div>
        </div>
        <div className="mt-6 flex items-start gap-3">
          <input
            type="checkbox"
            id="check"
            className="terms-checkbox"
            checked={termsChecked}
            onChange={() => {
              setTermsChecked((prev) => !prev);
            }}
          />
          <label htmlFor="check" className="text-sm font-semibold">
            I Agree with{" "}
            <span className="text-[#FE8C00]">Terms of Service</span> and{" "}
            <span className="text-[#FE8C00]">Privacy Policy</span>
          </label>
        </div>
        <button
          disabled={!termsChecked}
          className="w-full text-white text-center h-[3.25rem] rounded-full disabled:bg-[#fe8c00d9] bg-[#FE8C00] mt-6"
        >
          Register
        </button>
      </form>
      <div className="text-center mt-8 border-[0.5px] border-[#8787878b] relative">
        <p className="absolute left-1/2 -translate-x-1/2 bg-white text-[#878787] -top-1/2 -translate-y-1/2 px-4">
          Or sign in with
        </p>
      </div>
      <button onClick={handleGoogleLogin} className="block mx-auto mt-6">
        <FcGoogle size={"2rem"} />
      </button>
      <p className="text-sm text-center font-semibold mt-8">
        Have an account?{" "}
        <span
          className="text-[#FE8C00] cursor-pointer"
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign In
        </span>
      </p>

      {showModal && (
        <Modal handleDismiss={closeModal}>
          <p className="text-sm text-center text-[#878787] px-3">
            Created account successfully! Sign In to Continue.
          </p>
          <button
            className="mt-4 px-6 font-medium py-2 bg-[#FE8C00] text-white text-sm rounded-full cursor-pointer"
            onClick={() => {
              closeModal();
              navigate("/login");
            }}
          >
            OK
          </button>
        </Modal>
      )}
    </section>
  );
}

export default SignUp;
