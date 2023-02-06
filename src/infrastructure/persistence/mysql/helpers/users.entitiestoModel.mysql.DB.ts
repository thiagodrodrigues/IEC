import { UsersEntity } from "../../../../domain/entities/users/type.users.entity";



export default function (user: UsersEntity ){
    const userGeneral = {
        idUsers: user.idUsers,
        name: user.name,
        email: user.email,
        password: user.password,
        photo: user.photo,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt, 
        }
    

    return {
        userGeneral: userGeneral,
    };
}