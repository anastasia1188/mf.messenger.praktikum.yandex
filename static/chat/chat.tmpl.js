window.templateChat = (function() {
    return `<div class="chat-wrapper">
    <div class="chat-wrapper__left-part">
        <div class="chat-wrapper__search">
            <div class="chat-wrapper__logo">
                <img src="{{fimage}}" alt="" class="round" width="80px" height="80px">
                <div><a href="../settings/settings.html"> {{fname}} </a></div>
            </div>
            <div> <input class="chat-wrapper__search-field" type="search" placeholder="Поиск">
            </div>
        </div>
        <div class="chat-wrapper__contacts">
            {{#each pianokeys}}
            <div class="chat-wrapper__white-pianokey">
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
            <div class="chat-wrapper__mes-editor">
                <input id="ineditor" class="chat-wrapper__in-editor">
                <p class="chat-wrapper__errmes chat-wrapper__errmes-hiddenerr" id="err-ineditor7">
                    {{errmes}}
                </p>
            </div>
        </div>
    </div>
</div>`;
});