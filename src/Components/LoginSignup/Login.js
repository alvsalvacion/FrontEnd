import React, { useRef, useState } from "react";
import axiosClient from "../../AxiosClient";
import { useStateContext } from "../Context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import '../Assets/App.css';

export const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        setErrors(null);
        axiosClient
            .post("/login", { email, password })
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setLoading(false);
                navigate("/home");
            })
            .catch((err) => {
                setLoading(false);
                const response = err.response;
                if (response && response.status === 403) {
                    setErrors(response.data.error);
                } else if (response && response.status === 422) {
                    setErrors(response.data.error || "Invalid email or password. Please try again");
                } else {
                    setErrors("An error occurred. Please try again.");
                }
            });
    };
    return (
        <div className="App">
            <div className="auth-form-container">
            {loading && (
                        <div className="loader"></div>
                )}
                {!loading && (
                    <>
                {errors && (
                        <div className="validation-error">
                            <p>{errors}</p>
                        </div>
                    )}
                <h2>Login</h2>
                <form className="login-form" onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input ref={emailRef} type="email" placeholder="Email" id="email" name="email" required />
                    <label htmlFor="password">Password</label>
                    <input ref={passwordRef} type="password" id="password" name="password" required />

                    <button className="submit-btn" type="submit">Log In</button>
                </form>
                <Link to="/forgot-password" className="link-btn">Forgot password?</Link>
                <Link to="/signup" className="link-btn">Don't have an account? Register here.</Link>
                    </>
                )}
            </div>
        </div>
    );
};
