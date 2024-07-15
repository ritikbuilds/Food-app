import React from "react";
import ReactDOM from "react-dom";

function Modal({ handleDismiss, children }) {
  return ReactDOM.createPortal(
    <>
      <div
        className="max-w-[600px] fixed overflow-hidden top-0 left-0 w-dvw  h-dvh z-[11] bg-[rgba(0,0,0,0.5)]"
        onClick={handleDismiss}
      ></div>
      <div className="fixed w-[70%] h-[30dvh] flex justify-center items-center flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] bg-white z-[20]">
        {children}
      </div>
    </>,
    document.getElementById("modal-root")
  );
}

export default Modal;
