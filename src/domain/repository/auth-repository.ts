import { SignInInputTypes, SignInResTypes, SignUpInputTypes, SignUpResTypes } from "../model/auth"
import { User } from "../model/user"

export interface AuthRepository {
  signin(params: SignInInputTypes): Promise<SignInResTypes>
  signup(params: SignUpInputTypes): Promise<SignUpResTypes>
  getme(): Promise<User>
}
