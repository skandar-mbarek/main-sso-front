import axiosInstance from "../config/axios-config";

export interface LoginRequest{
    email: string;
    password: string;
    clientUrl: string;
}

export interface LoginResponse{
    redirectUrl: string;
}

export interface CheckLoginReq {
    clientUrl: string;
}

export const Login = async (credentials: LoginRequest):Promise<LoginResponse> => {
    try{
        const response = await axiosInstance.post<LoginResponse>(
            '/api/connect/login',
            credentials,
            {
                withCredentials: true
            }
        );
        return response.data;
    }catch (error) {
        console.error('Error during login:', error);
        throw new Error('Login failed. Please check your credentials and try again.');
    }
}

export const CallbackLogin = async (request:CheckLoginReq):Promise<LoginResponse>=>{
    try{
        const response = await axiosInstance.post<LoginResponse>(
            '/api/connect/check-session',
            null,
            {
                params:{
                    clientUrl : request.clientUrl,
                },
                withCredentials: true
            },
        );
        return response.data;
    }catch (error) {
        console.error('Error during login:', error);
        throw new Error('Login failed. Please check your credentials and try again.');
    }
}