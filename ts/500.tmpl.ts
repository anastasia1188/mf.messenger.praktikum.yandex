export function getTemplate500():string {
    return `<div class="basic-wrapper">
    <div class="basic-wrapper__item">
        <div class="basic-wrapper__line">
            <p> {{errcode}} </p>
        </div>
        <div class="basic-wrapper__line">
            <p> {{errmes}} </p>
        </div>
        <div class="basic-wrapper__href">
            <p> <a href="../chat/chat.html"> {{backToChat}}</a></p>
        </div>
    </div>
</div>`;
}