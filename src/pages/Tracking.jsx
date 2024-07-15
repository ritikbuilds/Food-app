import React, { useEffect, useState } from "react";
import { logout } from "../firebase/auth";
import axios from "axios";
import { quoteApi } from "../constants";
import Clock from "../components/Clock";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { IoCopyOutline } from "react-icons/io5";
import bgImg from "../assets/image-2.webp";

function Tracking() {
  const [quote, setQuote] = useState(null);
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.api-ninjas.com/v1/quotes?category=computers",
          {
            headers: {
              "X-Api-Key": quoteApi,
            },
          }
        );
        setQuote(response.data[0]);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleModal = () => {
    setModalState((prev) => !prev);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    toggleModal();
    alert("URL copied to clipboard");
  };

  return (
    <section
      style={{ backgroundImage: `url(${bgImg})` }}
      className={`tracking-section max-w-[600px] w-full h-dvh overflow-hidden relative bg-no-repeat bg-cover bg-[20%]`}
    >
      {modalState && (
        <Modal handleDismiss={toggleModal}>
          <div className="flex flex-col gap-2 items-center w-full">
            <h2 className="text-lg font-medium text-[#878787]">
              Share this URL
            </h2>
            <input
              type="text"
              readOnly
              className="w-full p-2 text-sm text-[#878787] outline-none"
              value={window.location.href}
            />
            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-1 px-4 py-2 bg-[#FE8C00] text-white text-sm rounded-full"
            >
              <span>Copy</span>
              <IoCopyOutline />
            </button>
          </div>
        </Modal>
      )}
      <section className="flex justify-between items-center py-4 px-3">
        <button
          className="bg-[#FE8C00] px-3 rounded-full py-1 text-white
           text-sm"
          onClick={toggleModal}
        >
          Share
        </button>
        <button
          className="bg-[#FE8C00] px-3 rounded-full py-1 text-white text-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </section>
      <Clock />

      <div className="absolute left-1/2 -translate-x-1/2 bottom-12 flex items-center justify-center flex-col w-[19.438rem]  h-[40dvh] px-4 rounded-[3rem]  bg-[#FE8C00] z-[2] ">
        {quote && (
          <p className="text-center text-white text-sm  pt-2">{quote.quote}</p>
        )}
        {quote && (
          <p className="text-white text-center font-semibold text-sm mt-2">
            -{quote.author}
          </p>
        )}
      </div>
    </section>
  );
}

export default Tracking;
