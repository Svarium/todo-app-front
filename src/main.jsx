import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // 👈
import { TaskProvider } from "./context/TaskContext";

ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
            <App />
        <Toaster position="top-right" reverseOrder={false} /> {/* 👈 */}
        </TaskProvider>        
      </AuthProvider>
    </BrowserRouter>
 
);
