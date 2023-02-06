import { UsersEntity } from "../../../domain/entities/users/type.users.entity";
import IMocks from "./mocks.interface";
import bcrypt from 'bcrypt';
import { ActionEntity } from "../../../domain/entities/actions/type.actions.entity";
import { Action } from "../../../domain/entities/actions/actions.enum";


export default class FakerMocks implements IMocks{
    getUsers(): UsersEntity[]{
        let users: UsersEntity[] = [];
        users = this._getUsers();
        return users;
    }

    getActions(): ActionEntity[]{
        let actions: ActionEntity[] = []
        actions = this._getActions();
        return actions;
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

    private _getActions(): ActionEntity[]{
        const actions: ActionEntity[] = [];
        actions.push({
            action: ("Projetos" as unknown) as Action,
            coverPhoto: "https://blog.publicidade.uol.com.br/wp-content/uploads/2022/09/ralston-smith-zc9pWsPZd4Y-unsplash-768x512.jpg",
            title: "curso de ciência e tecnologia",
            subtitle: "Desenvolvendo habilidades críticas através da educação em ciência e tecnologia",
            photoContent: "https://cdn.euroinnova.edu.es/img/subidasEditor/dise%C3%B1o%20sin%20t%C3%ADtulo%20-%202021-06-11t121023-1623427933.249",
            text: `A ciência e a tecnologia são dois campos que têm um impacto significativo em nossas vidas diárias. A ciência nos permite entender melhor o mundo ao nosso redor, enquanto a tecnologia nos permite aplicar esses conhecimentos para melhorar nossa qualidade de vida.
            A ciência é o estudo sistemático da natureza e do universo, enquanto a tecnologia é o uso prático desses conhecimentos científicos para criar novos produtos e processos. A ciência e a tecnologia estão intimamente ligadas, pois a ciência fornece o conhecimento básico necessário para o desenvolvimento de novas tecnologias.
            `,
        })
        return actions;
    }
}