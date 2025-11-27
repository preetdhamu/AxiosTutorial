import { IAuthRepository } from "../protocols/IAuthRepository";

export const createAuthUseCases = (repo : IAuthRepository) => ({
    loginEmail : (email : string,  password : string ) => repo.loginEmail(email , password),
    loginGoogle : () => repo.loginGoogle(),
    loginFaceBook : () => repo.loginFacebook()
})
