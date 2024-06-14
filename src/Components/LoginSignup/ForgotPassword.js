import { useState, useRef } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../../AxiosClient";
export const ForgotPassword = () => {
    const emailRef = useRef();
    const [errors, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        setError(null);
        setMessage(null);
        setLoading(true);

        try {
            const { data } = await axiosClient.post("/forgotPassword", { email });
            setMessage(data.message);
            alert(data.message);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            const response = err.response;
            if (response && response.status === 422) {
                setError(response.data.errors.message || "Email does not exist");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };
    return(
        <div className="App">
            <div className="auth-form-container" onSubmit={onSubmit}>
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
            <h2>Forgot Password</h2>
                <form className="login-form">
                    <label htmlFor="email">Email</label>
                    <input ref={emailRef} type="email" placeholder="Email" id="email" name="email" required />
                    <button className="submit-btn" type="submit">Submit</button>
                </form>
                <Link to="/login" className="link-btn">Already have an account? Login here.</Link>
                </>
                )}
            </div>
        </div>
    )
}