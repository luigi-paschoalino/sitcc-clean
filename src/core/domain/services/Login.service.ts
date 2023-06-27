export interface LoginJWT {
    auth: boolean
    token: string
}

export interface LoginService {
    login(body: LoginDTO):  
}