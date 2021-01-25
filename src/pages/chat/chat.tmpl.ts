export default function getTemplateChat() {
  return `<div class="chat-wrapper">
    <div class="chat-wrapper__left-part">
        <div class="chat-wrapper__search">
            <div class="chat-wrapper__logo">
                <img id="avatar" src="{{fileImage}}" alt="" class="round" width="60px" height="60px">
                <div><a href="/#settings" onclick = "window.location.hash = '#settings'" height="10px"> {{name}} </a></div>
            </div>
            <div><a href="/#login" onclick = "Chat.exit()"> Выход </a></div>
            <img id="sound" src="{{fileImageSound}}" alt="" class="round" width="15px" height="15px">
            <img id="add" src="{{fileAdd}}" alt="" class="round" width="15px" height="15px">
            <img id="delete" src="{{fileDelete}}" alt="" class="round" width="15px" height="15px">
            <div> <input id="search" class="chat-wrapper__search-field" type="search" placeholder="Поиск">
            </div>
        </div>
        <div class="chat-wrapper__contacts">
            {{#each pianoKeys}}
            <div class="chat-wrapper__white-pianokey {{this.pressed}}">
                <div class="chat-wrapper__row-contact">
                    <div class="chat-wrapper__contact"> {{this.contact}} </div>
                    <div class="chat-wrapper__count-mes"> {{this.countmes}} </div>
                </div>
                <div class="chat-wrapper__black-pianokey" {{this.hidden}}></div>
            </div>
            {{/each}}
        </div>
    </div>
    <div class="chat-wrapper__chat">
        <div class="chat-wrapper__messages">
            {{#each messages}}
            <div class="chat-wrapper__date-mes"> {{this.date}}</div>
            {{#each this.message}}
            <div class={{classmes}}> {{this.text}}
                <div class="chat-wrapper__time-mes"> {{this.time}} </div>
            </div>
            {{/each}} {{/each}}           
        </div>
        <input id="ineditor" class="chat-wrapper__in-editor">
        <p class="chat-wrapper__errmes chat-wrapper__errmes-hiddenerr" id="err-ineditor7">
            {{errmes}}
        </p>
    </div>
</div>


</div>`;
}
