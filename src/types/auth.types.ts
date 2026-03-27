export interface ILoginResponse {
  token: string;
  accessToken: string;
  refreshToken: string;
  user: {
    needPasswordChange: boolean;
    email: string;
    name: string;
    role: string;
    image: string;
    status: string;
    isDeleted: boolean;
    emailVerified: boolean;
  };
}
export interface IRegisterData {
  email: string;
  name: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}
