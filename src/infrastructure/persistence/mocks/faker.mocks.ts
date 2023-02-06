import { UsersEntity } from "../../../domain/entities/users/type.users.entity";
import IMocks from "./mocks.interface";
import bcrypt from 'bcrypt';


export default class FakerMocks implements IMocks{
    getUsers(): UsersEntity[]{
        let users: UsersEntity[] = [];
        users = this._getUsers();
        return users;
    }


    private _getUsers(): UsersEntity[]{
        const users: UsersEntity[] = [];
        let password = "adminIEC";
        let shufflePassword = bcrypt.hashSync(password,10);
        users.push({
            name: "Cleise Souza",
            email: "admin.geral@gmail.com",
            password: shufflePassword,
            photo: "encurtador.com.br/iopLV",
        })
        return users;
    }

}