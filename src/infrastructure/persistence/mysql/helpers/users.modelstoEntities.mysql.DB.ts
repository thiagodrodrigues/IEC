import { UsersEntity } from "../../../../domain/entities/users/type.users.entity";

export default function (user:any): UsersEntity | undefined {
    if(!user)
    return;


    let userGeneral: UsersEntity = {
        idUsers: user.idUsers,
        name: user.name,
        email: user.email,
        password: user.password,
        photo: user.photo,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt, 
    };


    return (userGeneral as UsersEntity);
}
