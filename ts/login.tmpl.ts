export function getTemplateLogin():string {
    return ` <div class="wrapper">

    <div class="wrapper__row">
        <p> {{mesEnter}} </p>
    </div>
    <div class="wrapper__row">
        <p>
            <img src="img/trebleСlef.png" width="40px" height="40px">
            <input class="wrapper__row" id="login" name="login" type="login" placeholder={{mesMail}}>
           
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-login0">
                    {{errorMes0}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-login4">
                    {{errorMes4}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-login5">
                    {{errorMes5}}
                </p>
        </p>
    </div>
    <div class="wrapper__row">
        <p><img src="img/bassСlef.jpg" width="40" height="40px">
            <input class="wrapper__row" id="password" name="password" type="password" placeholder={{mesPassword}}>
        </p>

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
        <p><button id="autorisation" class="my-button"> {{mesAutorisation}} </button></p>
    </div>
    <div class="wrapper__row wrapper__no-accaunt">
        <p><a href="../registration/registration.html"> {{mesAccount}} </a></p>
    </div>
</div>`;
}