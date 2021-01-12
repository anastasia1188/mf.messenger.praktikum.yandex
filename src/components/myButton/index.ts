import Block from '../../modules/block';
import getTemplateMyButton from './myButton.tmpl';
import { compileTemplate } from '../../modules/common';

export default class MyButton extends Block {
    props: Record<string, any>;

    constructor(props: Record<string, any>) {
      super('button', props);
    }

    render(mainElem: HTMLElement) {
      return compileTemplate('.myButton', getTemplateMyButton(), this.props, mainElem);
    }
}
