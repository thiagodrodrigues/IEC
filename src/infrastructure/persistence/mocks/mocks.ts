import { ActionEntity } from "../../../domain/entities/actions/type.actions.entity";
import { UsersEntity } from "../../../domain/entities/users/type.users.entity";
import createActionsUsecase from "../../../domain/usecases/actions/create.actions.usecase";
import createUsersUsecase from "../../../domain/usecases/users/create.users.usecase";
import FakerMocks from "./faker.mocks";
import IMocks from "./mocks.interface";

class Mocks {
    private _users: UsersEntity[];
    private _actions: ActionEntity[];

    constructor(mocksGenerator: IMocks){
        this._users = mocksGenerator.getUsers();
        this._actions = mocksGenerator.getActions();
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

    async createActions(){
        let countActions = 0;
        for(countActions = 0; countActions < this._users.length; countActions++){
           
            await createActionsUsecase.execute(this._actions[countActions]);
        }
        return {
            createdActions: countActions
        };
    } 

}


const execute = async ()=>{
    const mocks = new Mocks(new FakerMocks);

    const totalUsers = await mocks.createUsers();
    console.log(totalUsers);
    const totalActions = await mocks.createActions();
    console.log(totalActions);
}

execute();