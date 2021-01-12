import Block from '../../../dist/modules/block';
import getTemplateErr from './err.tmpl';
import { compileTemplate } from '../../modules/common';

export default class Err extends Block {
    props: {
        errcode: string
    }

    constructor(props: { errcode: string }) {
      super('err', props);
    }

    render() {
      const context = { errmes: 'Не туда попали', errcode: this.props.errcode, backToChat: 'назад к чатам' };
      return compileTemplate('.template-err', getTemplateErr(), context);
    }
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  return root;
}

const err = new Err({
  errcode: errorCode,
});

render('.template-err', err);
