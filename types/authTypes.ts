import { UserType } from "./userTypes";

export interface RegisterState {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

export interface LoginState {
  username: string;
  password: string;
}
  

export interface IAuth {
  userProfile: UserType | null;
  allUsers: UserType[] | null;
  // CALLED AFTER REGISTERING NEW USER / LOGGING IN
  addUser: any;
  // LOGOUT USER
  logout: any;
  // FETCH ALL USERS FUNCTION
  fetchAllUsers: any;
  updateUsersLibraryEnrolled: any;
  removeLibraryFromUser: any;
}

export interface CustomJWTPayload {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  exp: number;
  iat: number;
  librariesEnrolled: string[];
}