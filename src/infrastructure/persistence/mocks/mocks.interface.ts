import { ActionEntity } from "../../../domain/entities/actions/type.actions.entity";
import { UsersEntity } from "../../../domain/entities/users/type.users.entity";

export default interface IMocks {
    getUsers(): UsersEntity[];
    getActions(): ActionEntity[];
}