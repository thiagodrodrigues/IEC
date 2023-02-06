import { UsersEntity } from "../../entities/users/type.users.entity";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import { IUseCase } from "../usecase.interface";
import UsersRepository from "../../../adapters/repositories/users.repository";

class ReadStringUseCase implements IUseCase {
    constructor(private _repository: IUsersRepository){
    }
    async execute(resource: UsersEntity): Promise<UsersEntity | undefined> {
        const user = await this._repository.readByWhere(resource.email);
        if(user){
            return user
        } 
        return
    }
}

export default new ReadStringUseCase(
    UsersRepository
);