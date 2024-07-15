import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";
import {
  doSignInWithEmailAndPassword,
  resetPassword,
  signInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/AuthProvider";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  async function handleGoogleLogin() {
    if (authLoading) return;
    try {
      const user = await signInWithGoogle();
      if (user) {
        navigate(location.state || "/login-success", { replace: true });
      }
    } catch (error) {
      console.error("Google sign-in failed", error);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { user, error } = await doSignInWithEmailAndPassword(
        email,
        password
      );

      if (user) {
        navigate(location.state || "/login-success", { replace: true });
      } else {
        alert(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleReset = async () => {
    try {
      const { user, error } = await resetPassword(email);
      if (user) {
        setShowModal(true);
      } else {
        alert(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;
  return (
    <section className="max-w-[600px] w-full px-[1.2rem]">
      <h2 className="text-[2rem] font-semibold w-[80%] leading-[2.5rem] mt-10 overflow-hidden">
        Login to your account.
      </h2>
      <p className="text-sm text-[#878787] mt-3">
        Please sign in to your account
      </p>
      <form onSubmit={handleLogin}>
        <div className="mt-4 flex flex-col">
          <label htmlFor="email" className="text-sm mb-2 font-semibold">
            Email Address
          </label>
          <input
            required
            type="text"
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
              <LuEye
                size={"1.25rem"}
                onClick={handleShowPassword}
                className="cursor-pointer"
              />
            ) : (
              <LuEyeOff
                size={"1.25rem"}
                onClick={handleShowPassword}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
        <p className="text-right mt-6">
          <span
            onClick={handleReset}
            className="cursor-pointer text-sm text-[#FE8C00]"
          >
            Forgot password?
          </span>
        </p>
        <button className="w-full text-white text-center h-[3.25rem] rounded-full bg-[#FE8C00] mt-6">
          Sign In
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
        Don't have an account?{" "}
        <span
          className="text-[#FE8C00] cursor-pointer"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Register
        </span>
      </p>
      {showModal && (
        <Modal handleDismiss={closeModal}>
          <p className="text-sm text-center text-[#878787] px-3">
            After account verification password reset link will be sent to
            registered Email Id.
          </p>
          <button
            className="mt-4 px-6 font-medium py-2 bg-[#FE8C00] text-white text-sm rounded-full cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          >
            OK
          </button>
        </Modal>
      )}
    </section>
  );
}

export default Login;
