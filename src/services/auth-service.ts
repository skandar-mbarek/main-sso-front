import axiosInstance from "../config/axios-config";

export interface LoginRequest{
    email: string;
    password: string;
    clientId: string;
}

export interface LoginResponse{
    redirectUrl: string;
    token: string;
}

export interface CheckLoginReq {
    clientId: string;
    token:string;
}

export const Login = async (credentials: LoginRequest):Promise<LoginResponse> => {
    try{
        const response = await axiosInstance.post<LoginResponse>(
            '/api/connect/login',
            credentials
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
            '/api/connect/callback',
            null,
            {
                params:{
                    clientId : request.clientId,
                    token : request.token ,
                }
            }
        );
        return response.data;
    }catch (error) {
        console.error('Error during login:', error);
        throw new Error('Login failed. Please check your credentials and try again.');
    }
}