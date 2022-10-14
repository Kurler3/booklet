import { IUserWithoutToken } from "./userTypes";

export interface IBook {
    id: number|string;
    title: string;
    description: string;
    issuedAt: string | null;
    issuedBy: string | null;
    issuedTo: string | null; 
    addedBy: string;
    addedAt: string;
    returnedAt: string | null;
}

export interface ILibrary {
    id: string|number;
    name: string;
    admins: string[];
    librarians: string[];
    normalUsers: string[];
    books: IBook[];
}

// LIBRARY INPUT
export interface LibraryInput {
    userId: string|number;
    name: string;
    admins: number[]|string[];
    librarians: number[]|string[];
}

export interface IDefaultLibrary {
    name: string;
    admins: {value:string, label: string}[];
    librarians: {value:string, label: string}[];
}