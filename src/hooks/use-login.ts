import {useMutation} from "@tanstack/react-query";
import {Login, LoginRequest, LoginResponse} from "../services/auth-service";


export const useLogin = () => {

    return useMutation({
        mutationFn: (credentials: LoginRequest) => Login(credentials),
        onSuccess: (data: LoginResponse) => {

            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
        },
        onError: (error: Error) => {
            console.error('Login failed:', error);
        },
    });
};