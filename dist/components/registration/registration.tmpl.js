export default function getTemplateRegistration() {
    return `<div class="wrapper">

    <div class="wrapper__row">
        <p> Регистрация </p>
    </div>
    <form method="post" id="form">
    <div class="wrapper__row">
        <p>
            <input class="wrapper__row" id="email" name="email" type="email" placeholder="Почта">
        </p>
    </div>
    <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-email0">
        Не верно введены данные
    </p>
    <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-email4">
        Не допускаются пробелы
    </p>
    <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-email5">
        Длина должна быть не менее 5 символов
    </p>

    <div class="wrapper__row">
        <input class="wrapper__row" id="login" name="login" type="text" placeholder="Логин">
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-login0">
            Не верно введены данные
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-login4">
            Не допускаются пробелы
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-login5">
            Длина должна быть не менее 5 символов
        </p>
    </div>
    <div class="wrapper__row">
        <input class="wrapper__row" id="password" name="password" type="password" placeholder="Пароль">
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password1">
            Ваш пароль должен быть не менее 8 символов
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password2">
            Ваш пароль должен содержать хотя бы один литерал
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password3">
            Ваш пароль должен содержать хотя бы одну цифру
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password4">
            Не допускаются пробелы
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password5">
            Длина должна быть не менее 5 символов
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password6">
        Пароли не совпадают
    </p>
    </div>
    <div class="wrapper__row">
        <input class="wrapper__row" id="passwordr" name="passwordr" type="password" placeholder="Пароль" (еще="" раз)="">
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-passwordr1">
            Ваш пароль должен быть не менее 8 символов
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-passwordr2">
            Ваш пароль должен содержать хотя бы один литерал
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-passwordr3">
            Ваш пароль должен содержать хотя бы одну цифру
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-passwordr4">
            Не допускаются пробелы
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-passwordr5">
            Длина должна быть не менее 5 символов
        </p>
        <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-passwordr6">
            Пароли не совпадают
        </p>
    </div>

    <div>
        <p><button id="reg" type="submit" class="my-button"> Зарегистрироваться </button></p>
    </div>
</form>
</div>`;
}
;
