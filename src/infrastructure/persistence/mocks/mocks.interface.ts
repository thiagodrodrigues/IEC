import { UsersEntity } from "../../../domain/entities/users/type.users.entity";

export default interface IMocks {
    getUsers(): UsersEntity[];
}