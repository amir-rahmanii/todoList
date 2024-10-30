"use client";
import React from 'react'
import { Toaster } from 'react-hot-toast';

function ToastError() {
    return (
        <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Default options
          duration: 4000,
          style: {
            background: "#333",
            color: "#E6E6E6",
            borderRadius: "8px",
            padding: "16px",
            fontSize: "14px",
          },
          success: {
            duration: 3000,
            style: {
              background: "#4caf4fb0",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "#f44336a6",
            },
          },
        }}
      />
    )
}

export default ToastError