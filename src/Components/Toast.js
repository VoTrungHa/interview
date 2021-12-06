import React from "react";
import { toast, ToastContainer as BaseToastContainer } from "react-toastify";

export default function Toast() {
  return (
    <BaseToastContainer
      position="top-center"
      autoClose={4000}
      hideProgressBar
      closeOnClick
      draggable={false}
      pauseOnHover
    />
  );
}
export { toast };
