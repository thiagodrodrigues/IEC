import { UsersEntity } from "../entities/users/type.users.entity";

export interface IUsersRepository {
    readById(resourceId: number): Promise<UsersEntity | undefined>,
    create(resource: UsersEntity): Promise<UsersEntity>,
    deleteById(resourceId: number): Promise<void>,
    list(): Promise<UsersEntity[]>,
    updateById(resource: UsersEntity): Promise<UsersEntity | undefined>,
    readByWhere(resource: string): Promise<UsersEntity | undefined>
}