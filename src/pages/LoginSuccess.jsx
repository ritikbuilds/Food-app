import React from "react";
import bgImage from "../assets/image-1.webp";
import successImg from "../assets/success-img.webp";
import { useNavigate } from "react-router-dom";
import { logout } from "../firebase/auth";

function LoginSuccess() {
  const navigate = useNavigate();
  return (
    <section className="login-success-section max-w-[600px] w-full h-dvh overflow-hidden relative">
      <img
        src={bgImage}
        alt="background-image"
        className={`top-0 left-0 absolute w-full h-dvh object-cover object-center scale-x-[-1] -z-[-1]`}
      />
      <div className="absolute left-0 bottom-0 w-full h-[30rem] rounded-tl-[1.5rem] rounded-tr-[1.5rem]  bg-white z-[2] ">
        <div className="w-[4rem] h-1 rounded-full bg-[#00000025] mx-auto mt-2"></div>
        <img src={successImg} alt="success-icon" className="mx-auto mt-6" />
        <h2 className="text-[1.5rem] mt-4 font-semibold text-center">
          Login Successful
        </h2>
        <button
          onClick={() => {
            navigate("/tracking", { replace: true });
          }}
          className="block w-[85%] h-[3.25rem] rounded-full text-center mx-auto text-sm bg-[#FE8C00] font-semibold text-white mt-7 cursor-pointer"
        >
          Go to Tracking Screen
        </button>
        <button
          onClick={logout}
          className="block mx-auto mt-5 text-[#878787] text-sm font-medium cursor-pointer"
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default LoginSuccess;
