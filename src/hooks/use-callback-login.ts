import {useMutation} from "@tanstack/react-query";
import {CallbackLogin, CheckLoginReq, LoginResponse} from "../services/auth-service";
import {useNavigate} from "react-router-dom";

export const useCallbackLogin = () => {

    const navigate = useNavigate();
    return useMutation({
        mutationFn: (credentials: CheckLoginReq) => CallbackLogin(credentials),
        onSuccess: (data: LoginResponse) => {
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
        },
        onError: (error: Error , variables : CheckLoginReq) => {

            const encodedUrl = encodeURIComponent(variables.clientUrl);

            navigate(`/login/${encodedUrl}`)
        },
    });
};