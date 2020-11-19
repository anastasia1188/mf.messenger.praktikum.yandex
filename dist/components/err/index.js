/// <reference path="../../../dist/modules/references.d.ts" />
/// <reference path="./err.d.ts" />
import Block from "../../../dist/modules/block.js";
import { getTemplateErr } from "./err.tmpl.js";
export class Err extends Block {
    constructor(props) {
        super("err", props);
    }
    render() {
        const context = { errmes: "Не туда попали", errcode: this.props.errcode, backToChat: "назад к чатам" };
        return compileTemplate('.template-err', getTemplateErr(), context);
    }
}
function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}
const err = new Err({
    errcode: errorCode,
});
render(".template-err", err);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9lcnIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThEO0FBQzlELG1DQUFtQztBQUNuQyxPQUFPLEtBQUssTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE1BQU0sT0FBTyxHQUFJLFNBQVEsS0FBSztJQUkxQixZQUFZLEtBQTBCO1FBQ2xDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLE9BQU8sR0FBRyxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxDQUFDO1FBQ3ZHLE9BQU8sZUFBZSxDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2RSxDQUFDO0NBQ0o7QUFFRCxTQUFTLE1BQU0sQ0FBQyxLQUFhLEVBQUUsS0FBWTtJQUN2QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDckMsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDO0lBQ2hCLE9BQU8sRUFBRSxTQUFTO0NBQ3JCLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUMifQ==