import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VerifyEmail = () => {
    const { userId } = useParams();

    useEffect(() => {
        console.log('User ID:', userId);
    }, [userId]);

    return (
    <div className="App">
        <div className="auth-form-container">
        <h2>Email Verified</h2>
            <div style={{ marginTop: '10px' }}>
                <p style={{ textAlign: 'center', fontSize: '18px', color: '#fff' }}>
                    Thank you for verifying your email.
                </p>
            </div>
        </div>
    </div>
    );
};

export default VerifyEmail;