import { SignInInputTypes, SignInResTypes, SignUpInputTypes, SignUpResTypes } from "@/domain/model/auth";
import { AuthRepository } from "@/domain/repository/auth-repository";
import { api } from "../_api";
import { User } from "@/domain/model/user";


export class AuthApiRepository implements AuthRepository {
  constructor(private _api = api) { }

  signin(body: SignInInputTypes): Promise<SignInResTypes> {
    return this._api.post(`auth/login`, body).then(res => res.data);
  }
  signup(body: SignUpInputTypes): Promise<SignUpResTypes> {
    return this._api.post(`auth/register`, body).then(res => res.data);
  }
  getme(): Promise<User> {
    return this._api.get(`auth/me`).then(res => res.data);
  }
}

