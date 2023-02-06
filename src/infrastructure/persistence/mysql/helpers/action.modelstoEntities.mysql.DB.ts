import { ActionEntity } from "../../../../domain/entities/actions/type.actions.entity";
import { IProjectsEntity } from "../../../../domain/entities/actions/projects.entity";
import { IActionEntity } from "../../../../domain/entities/actions/actions.entity";

export default function (action:any): ActionEntity | undefined {
    if(!action)
    return;
    let actionGeneral: IActionEntity = {
        tinytitle: action.tinytitle,
        action: action.action,
    };

    if(String(actionGeneral.action) == "Projetos"){
        (actionGeneral as IProjectsEntity).title = action.project.title;
        (actionGeneral as IProjectsEntity).photo = action.project.photo;
        (actionGeneral as IProjectsEntity).text = action.project.text;
    }

    return (actionGeneral as ActionEntity);
}
