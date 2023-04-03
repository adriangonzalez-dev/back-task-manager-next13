export interface IUser {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    avatar: string;
    role: string;
    google: boolean;
    createdAt: Date;
    updatedAt: Date;
}