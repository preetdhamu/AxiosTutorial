
import { fakeLoginAPI } from "../../../api/authApi";
import { IAuthRepository } from "../protocols/IAuthRepository";

export const AuthRepository = (): IAuthRepository => ({
    loginEmail: (email, password) => fakeLoginAPI("email", email, password),
    loginGoogle: () => fakeLoginAPI("google"),
    loginFacebook: () => fakeLoginAPI("facebook"),
});