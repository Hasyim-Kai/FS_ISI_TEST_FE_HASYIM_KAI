import { User } from "./user"

export interface SignInInputTypes {
    email: string
    password: string
}

export interface SignInResTypes extends User {
    token: string
}

export interface SignUpInputTypes {
    username: string
    email: string,
    password: string
}

export interface SignUpResTypes {
    message: string
}