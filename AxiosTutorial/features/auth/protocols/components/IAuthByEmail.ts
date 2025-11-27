import User from "../../models/userModel";

export interface IAuthByEmail {
    loginEmail(email: string, password: string): Promise<{ token: string; user: User }>;
}

