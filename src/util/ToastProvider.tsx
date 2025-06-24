import React from "react";
import { isMobile } from "react-device-detect";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <ToastContainer
        position={isMobile ? "bottom-center" : "top-right"}
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
        style={{
          zIndex: "var(--z-index-top)", // トーストが他の要素に隠れないようにする
          marginBottom: isMobile ? "5px" : undefined, // モバイルで下部に余白を追加
        }}
      />
    </div>
  );
};

export default ToastProvider;
