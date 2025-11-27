import User from "../../models/userModel";

export interface IAuthByFacebook {
  loginFacebook(): Promise<{ token: string; user: User }>;
}
