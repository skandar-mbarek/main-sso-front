import React, {useEffect, useState} from "react";
import {useLogin} from "../hooks/use-login";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";


const LoginPage :React.FC=()=>{

    const { clientUrl } = useParams<{ clientUrl: string }>();
    const actualClientUrl = clientUrl || "default-client";

    const loginMutation = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        loginMutation.mutate({
            email,
            password,
            clientUrl: actualClientUrl,
        });
    };


    return(
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                maxWidth: '450px',
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                padding: '40px',
                position: 'relative'
            }}>

                {/* Header Section */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '32px'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#667eea',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}>
                        🔐
                    </div>
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: '#333',
                        marginBottom: '8px'
                    }}>
                        Welcome Back
                    </h1>
                    <p style={{
                        color: '#666',
                        fontSize: '16px'
                    }}>
                        Sign in to your account
                    </p>
                </div>

                {/* Error Messages */}
                {loginMutation.isError && (
                    <div style={{
                        backgroundColor: '#f8d7da',
                        border: '1px solid #f5c6cb',
                        borderRadius: '8px',
                        padding: '16px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}>
                            <span style={{ fontSize: '16px' }}>❌</span>
                            <span style={{
                                color: '#721c24',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>
        Error: {(loginMutation.error as Error).message}
        </span>
                        </div>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: '2px solid #e9ecef',
                                borderRadius: '10px',
                                fontSize: '16px',
                                transition: 'all 0.3s ease',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e9ecef';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: '2px solid #e9ecef',
                                borderRadius: '10px',
                                fontSize: '16px',
                                transition: 'all 0.3s ease',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e9ecef';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        style={{
                            width: '100%',
                            backgroundColor: loginMutation.isPending ? '#9ca3af' : '#667eea',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '16px 24px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: loginMutation.isPending ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: loginMutation.isPending ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.3)',
                            transform: loginMutation.isPending ? 'none' : 'translateY(0)',
                            opacity: loginMutation.isPending ? 0.7 : 1
                        }}
                        onMouseEnter={(e) => {
                            if (!loginMutation.isPending) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loginMutation.isPending) {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                            }
                        }}
                    >
                        {loginMutation.isPending ? (
                            <>
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    border: '2px solid transparent',
                                    borderTop: '2px solid white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <>
                                <span>🚀</span>
                                <span>Sign In</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div style={{
                    marginTop: '24px',
                    textAlign: 'center'
                }}>
                    <p style={{
                        color: '#6c757d',
                        fontSize: '12px',
                        margin: 0
                    }}>
                        Secure login powered by OAuth 2.0
                    </p>
                </div>
            </div>

            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
    `}
            </style>
        </div>
    )
}
export default LoginPage;