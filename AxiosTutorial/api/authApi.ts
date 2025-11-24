import User from "../features/auth/models/userModel";

export interface LoginResponse {
  token: string;
  user: User;
}

export const fakeLoginAPI = async (
  provider: "google" | "facebook" | "email",
  email?: string,
  password?: string
): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // EMAIL LOGIN
      if (provider === "email") {
        if (email === "Test" && password === "123") {
          resolve({
            token: "email_token_123",
            user: {
              id: "999",
              name: "Email User",
              email,
              gender: 'male',
            },
          });
        } else {
          reject(`Invalid credentials: provider=${provider}, email=${email}, password=${password}`);
        }
        return;
      }

      // GOOGLE LOGIN
      if (provider === "google") {
        resolve({
          token: "google_token_123",
          user: {
            id: "1",
            name: "Google User",
            email: "google@example.com",
            gender: 'female',
          },
        });
        return;
      }

      // FACEBOOK LOGIN
      if (provider === "facebook") {
        resolve({
          token: "facebook_token_123",
          user: {
            id: "2",
            name: "Facebook User",
            email: "facebook@example.com",
            gender: 'male',
          },
        });
        return;
      }
    }, 1500);
  });
};
