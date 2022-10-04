import { IUserWithoutToken } from "./userTypes";

export interface IBook {
    id: number|string;
    title: string;
    description: string;
    issuedAt: string | null;
    issuedBy: IUserWithoutToken | null;
    issuedTo: IUserWithoutToken | null; 
    addedBy: IUserWithoutToken;
    addedAt: string;
    returnedAt: string | null;
}

export interface ILibrary {
    id: string|number;
    name: string;
    admins: IUserWithoutToken[];
    librarians: IUserWithoutToken[];
    books: IBook[];
}