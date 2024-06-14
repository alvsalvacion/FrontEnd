import React, { useEffect, useState } from "react";
import axiosClient from "../../AxiosClient";
import { useStateContext } from "../Context/ContextProvider"
import { Navigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Home = () => {
    const { user, token, setUser, setToken } = useStateContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient.get("/currentUser")
            .then(({ data }) => {
                setUser(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching current user:", error);
                setLoading(false);
            });
    }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }
    return(
        <div>
          <Navbar />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {loading && (
                        <div className="loader"></div>
                )}
                {!loading && (
                    <>
                <h2 style={{ color: 'red' }}>Home</h2>
                {user && (
                    <>
                        <p><strong>Email:</strong> {user.email}</p>
                    </>
                )}
                </>
            )}
            </div>
        </div>
    )
}