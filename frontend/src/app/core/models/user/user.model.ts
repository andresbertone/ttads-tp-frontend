import { RoleModel } from "../role/role.model";

export interface UserModel {
    userId: number,
    mechanicId: number,
    roleId: number,
    username: string,
    role: RoleModel
}