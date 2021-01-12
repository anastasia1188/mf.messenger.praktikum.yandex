import Block from '../../modules/block';
import getTemplateMyButton from './myButton.tmpl';
import { compileTemplate } from '../../modules/common';
export default class MyButton extends Block {
    constructor(props) {
        super('button', props);
    }
    render(mainElem) {
        return compileTemplate('.myButton', getTemplateMyButton(), this.props, mainElem);
    }
}
