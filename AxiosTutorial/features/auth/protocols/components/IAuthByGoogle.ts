import User from "../../models/userModel";


export interface IAuthByGoogle {
    loginGoogle(): Promise<{ token: string; user: User }>;
}


