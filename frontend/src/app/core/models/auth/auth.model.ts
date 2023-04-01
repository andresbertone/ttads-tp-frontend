import { UserModel } from "../user/user.model";

export interface AuthModel {
    sessionToken: string,
    user: UserModel
}