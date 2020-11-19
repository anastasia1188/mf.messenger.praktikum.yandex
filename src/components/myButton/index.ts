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
