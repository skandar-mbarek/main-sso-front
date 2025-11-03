import React, {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import { useCallbackLogin } from "../hooks/use-callback-login";

export const Authorize: React.FC = () => {

    const [searchParams] = useSearchParams();
    const clientUrl = searchParams.get("clientUrl") ??"default-client"

    const navigate = useNavigate();
    const callbackLogin = useCallbackLogin();

    useEffect(() => {
        if (!clientUrl) return;

        callbackLogin.mutate({ clientUrl: clientUrl });

    }, [clientUrl]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                {/* Spinner */}
                <div
                    style={{
                        width: "60px",
                        height: "60px",
                        border: "6px solid rgba(255,255,255,0.2)",
                        borderTop: "6px solid white",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                    }}
                ></div>

                {/* Text */}
                <div
                    style={{
                        fontSize: "20px",
                        fontWeight: "600",
                        textAlign: "center",
                    }}
                >
                    Bookini Identity Check...
                </div>
            </div>

            {/* Spinner animation */}
            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
};
