import Block from "../../../dist/modules/block.js";
import getTemplateMyButton from "./myButton.tmpl.js";
export default class myButton extends Block {
    constructor(props) {
        // Создаём враппер DOM-элемент button
        super("button", props);
        console.log('props', props);
    }
    render(mainElem) {
        // В данном случае render возвращает строкой разметку из шаблонизатора
        console.log('mainElem', mainElem);
        return compileTemplate('.myButton', getTemplateMyButton(), this.props, mainElem);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9teUJ1dHRvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRCxPQUFPLG1CQUFtQixNQUFNLG9CQUFvQixDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLE9BQU8sUUFBUyxTQUFRLEtBQUs7SUFDdkMsWUFBWSxLQUFLO1FBQ2YscUNBQXFDO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRO1FBQ2Isc0VBQXNFO1FBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sZUFBZSxDQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbkYsQ0FBQztDQUNGIn0=