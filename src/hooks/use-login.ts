import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {Login, LoginRequest, LoginResponse} from "../services/auth-service";


export const useLogin = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (credentials: LoginRequest) => Login(credentials),
        onSuccess: (data: LoginResponse, variables: LoginRequest) => {
            console.log('Session ID saved:', data.token);

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