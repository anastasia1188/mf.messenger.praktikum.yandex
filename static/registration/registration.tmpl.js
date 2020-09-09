function getTemplateRegistration() {
    return `<div class="wrapper">

    <div class="wrapper__row">
        <p> {{mesReg}} </p>
    </div>

    <div class="wrapper__row">
        <p>
            <input class="wrapper__row" id="email" name="email" type="email" placeholder={{mesEmail}}>
        </p>
    </div>
    <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-email0">
        {{errorMes0}}
    </p>
    <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-email4">
        {{errorMes4}}
    </p>
    <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-email5">
        {{errorMes5}}
    </p>

    <div class="wrapper__row">
        <input class="wrapper__row" id="login" name="login" type="text" placeholder={{mesLogin}}>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-login0">
            {{errorMes0}}
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-login4">
            {{errorMes4}}
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-login5">
            {{errorMes5}}
        </p>
    </div>
    <div class="wrapper__row">
        <input class="wrapper__row" id="password" name="password" type="password" placeholder={{mesPassword}}>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password1">
            {{errorMes1}}
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password2">
            {{errorMes2}}
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password3">
            {{errorMes3}}
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password4">
            {{errorMes4}}
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password5">
            {{errorMes5}}
        </p>
    </div>
    <div class="wrapper__row">
        <input class="wrapper__row" id="passwordr" name="passwordr" type="password" placeholder={{mesPasswordR}}>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-passwordr6">
            {{errorMes6}}
        </p>
    </div>

    <div>
        <p><button id="reg" class="my-button"> {{btnReg}} </button></p>
    </div>

</div>`;
}