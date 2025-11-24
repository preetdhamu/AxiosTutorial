import User from "./userModel";

export interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  firstLaunch: boolean;
}