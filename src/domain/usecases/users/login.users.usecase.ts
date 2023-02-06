import { IUsersRepository } from "../../repositories/users.repository.interface";
import { IUseCase } from "../usecase.interface";
import UsersRepository from "../../../adapters/repositories/users.repository";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class LoginAuthUseCase implements IUseCase {
    constructor(private _repository: IUsersRepository){

    }

    async execute(data: any) {
        if(data.email){
            const user = await this._repository.readByWhere(data.email);
            if(user && bcrypt.compareSync(data.password, user.password!)){
                const token = jwt.sign(user, String(process.env.SECRET_KEY), {
                    expiresIn: '12h'
                });
                return {
                    user: user,
                    token: token
                };
            }
        } 
        return;
    }
}

export default new LoginAuthUseCase(
    UsersRepository
);