import { ActionEntity } from "../../../../domain/entities/actions/type.actions.entity";


export default function (action: ActionEntity ){
    let newTitle = action.title.replace(/ /g, "-").toLowerCase();
    const actionGeneral = {
        tinytitle: newTitle,
        action: action.action,
    };

    let projectGeneral = undefined;
    if(String(actionGeneral.action) == "Projetos"){
        projectGeneral = {
            title: action.title,
            tinytitle: newTitle,
            text: action.text,
            photo: action.photo,
        }
    };

    return {
        projectGeneral: projectGeneral,
        actionGeneral: actionGeneral,
    }
}