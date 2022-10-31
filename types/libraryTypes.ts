import { IUserWithoutToken } from "./userTypes";

export interface IBook {
    libraryId: number|string|null;
    id: string;
    title: string;
    description: string;
    issuedAt: string | null;
    issuedTo: string|null;
    issueDueDate: string|null;
    issuedBy: string | null;
    addedBy: string|null;
    addedAt: string|null;
    returnedAt: string | null;
}

export interface ILibrary {
    id: string|number;
    name: string;
    admins: string[];
    librarians: string[];
    normalUsers: string[];
    books: string[];
    createdAt: string;
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