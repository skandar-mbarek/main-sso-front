import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {CallbackLogin, CheckLoginReq, Login, LoginRequest, LoginResponse} from "../services/auth-service";

export const useCallbackLogin = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (credentials: CheckLoginReq) => CallbackLogin(credentials),
        onSuccess: (data: LoginResponse, variables: CheckLoginReq) => {
            console.log('token  saved:', data.token);
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
        },
        onError: (error: Error) => {
            console.error('Login failed:', error);
        },
    });

    return mutation;
};