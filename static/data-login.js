const elemTemplate = document.getElementById('template-login');
const source = elemTeplate.innerHTML;
const template = Handlebars.compile(source);
const context = {
    mesEnter: "Вход",
    mesMail: "Введите почту",
    mesPassword: "Введите пароль",
    mesAutorisation: "Авторизация",
    mesAccount: "нет аккаунта?"
};
const html = template(context);
elemTemplate.innerHTML = html;

const arrInputs = ["email", "password"];
for (let i = 0; i < arrInputs.length; i++) {
    let id = arrInputs[i];
    finput = document.getElementById(id);
    finput.addEventListener('blur', validate(id));
}
const elemInEditor = document.getElementById("autorisation");
elemInEditor.addEventListener('click', function(e) {

    if (validate(arrInputs)) {
        const data = getData(arrInputs);
        console.log(data);
    }
});