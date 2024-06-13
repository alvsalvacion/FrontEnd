import { useState, useRef } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../../AxiosClient";
export const ForgotPassword = () => {
    const emailRef = useRef();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        setError(null);
        setMessage(null);

        try {
            const { data } = await axiosClient.post("/forgotPassword", { email });
            setMessage(data.message);
            alert(data.message);
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setError(response.data.errors.message || "Validation failed. Please check your input.");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };
    return(
        <div className="App">
            <div className="auth-form-container" onSubmit={onSubmit}>
            <h2>Forgot Password</h2>
            {error && (
                <div className="validation-error">
                    <p>{error}</p>
                </div>
            )}
            {/* {message && (
                <div className="success-message">
                    <p>{message}</p>
                </div>
            )} */}
                <form className="login-form">
                    <label htmlFor="email">Email</label>
                    <input ref={emailRef} type="email" placeholder="Email" id="email" name="email" required />
                    <button className="submit-btn" type="submit">Submit</button>
                </form>
                <Link to="/login" className="link-btn">Already have an account? Login here.</Link>
            </div>
        </div>
    )
}