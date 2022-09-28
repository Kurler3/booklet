
// REGISTER INPUT
export interface RegisterInput {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
}

export interface UserType {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    token: string;
    librariesEnrolled: string[];
}

export interface UserJWT {
    id: string;
    email: string;
    username: string;
}
// USER
export interface IUser {
    image: string;
    userName: string;
    _id: string;
    _type: string;
}