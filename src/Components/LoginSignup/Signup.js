import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../AxiosClient";

const Signup = () => {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passRef.current.value,
            password_confirmation: confirmPasswordRef.current.value,
        };
        // console.log(payload);
        axiosClient.post("/register", payload)
            .then(({ data }) => {
                alert(data.message);
                navigate("/login");
            })
            .catch((err) => {
                const response = err.response;
                console.log("Response status:", response.status);
                console.log("Response data:", response.data);
                if (response.status === 422) {
                    setErrors(response.data.errors);
                } else {
                    console.log("An error occurred. Please try again.");
                }
            });
    };
    return (
        <div className="App">
            <div className="auth-form-container">
                <h2>Sign Up</h2>
                {errors && Object.keys(errors).length > 0 && (
                    <div className="validation-error">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                <form className="signup-form" onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input ref={emailRef} type="email" placeholder="Email" id="email" name="email" required />
                    <label htmlFor="password">Password</label>
                    <input ref={passRef} type="password" id="password" name="password" required />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input ref={confirmPasswordRef} type="password" id="password_confirmation" name="password_confirmation" required />
                    <button className="submit-btn" type="submit">Sign Up</button>
                    <Link to="/login" className="link-btn">Already have an account? Login here.</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
