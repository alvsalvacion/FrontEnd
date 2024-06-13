import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import axiosClient from "../../AxiosClient";
import { useNavigate } from "react-router-dom";
export const ChangePassword = () => {
    const { userId } = useParams();
    const passRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const navigate = useNavigate();
    const [error, setErrors] = useState(null);

    useEffect(() => {
        console.log('User ID:', userId);
    }, [userId]);
    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            id: userId,
            password: passRef.current.value,
            password_confirmation: confirmPasswordRef.current.value,
        };
        console.log(payload);
        axiosClient.post(`/updatePassword`, payload)
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
    }
    return(
        <div className="App">
            <div className="auth-form-container">
                <h2>Change Password</h2>
                {error && Object.keys(error).length > 0 && (
                    <div className="validation-error">
                        {Object.keys(error).map((key) => (
                            <p key={key}>{error[key][0]}</p>
                        ))}
                    </div>
                )}
                <form className="login-form" onSubmit={onSubmit}>
                    <label htmlFor="newPassword">New Password</label>
                    <input ref={passRef} type="password" id="password" name="password" required />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input ref={confirmPasswordRef} type="password" id="password_confirmation" name="password_confirmation" required />
                    <button className="submit-btn" type="submit">Submit</button>
                </form>
                <Link to="/login" className="link-btn">Already have an account? Login here.</Link>
            </div>
        </div>
    )
}