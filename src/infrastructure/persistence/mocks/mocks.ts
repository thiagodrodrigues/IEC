import { UsersEntity } from "../../../domain/entities/users/type.users.entity";
import createUsersUsecase from "../../../domain/usecases/users/create.users.usecase";
import FakerMocks from "./faker.mocks";
import IMocks from "./mocks.interface";

class Mocks {
    private _users: UsersEntity[];

    constructor(mocksGenerator: IMocks){
        this._users = mocksGenerator.getUsers();
    }

    async createUsers(){
        let countUsers = 0;
        for(countUsers = 0; countUsers < this._users.length; countUsers++){
           
            await createUsersUsecase.execute(this._users[countUsers]);
        }
        return {
            createdUsers: countUsers
        };
    } 

}


const execute = async ()=>{
    const mocks = new Mocks(new FakerMocks);

    const totalUsers = await mocks.createUsers();
    console.log(totalUsers);
}

execute();