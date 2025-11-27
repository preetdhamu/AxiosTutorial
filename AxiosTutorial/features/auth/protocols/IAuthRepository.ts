import { IAuthByEmail } from "./components/IAuthByEmail";
import { IAuthByFacebook } from "./components/IAuthByFacebook";
import { IAuthByGoogle } from "./components/IAuthByGoogle";


export type IAuthRepository  = IAuthByEmail & IAuthByGoogle & IAuthByFacebook ;

