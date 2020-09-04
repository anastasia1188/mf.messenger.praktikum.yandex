const elemTempl = document.getElementById('template-registration');
const source = elemTempl.innerHTML;
const template = Handlebars.compile(source);
const context = {
    mesReg: "Регистрация",
    mesEmail: "Почта",
    mesLogin: "Логин",
    mesPassword: "Пароль",
    mesPasswordR: "Пароль (еще раз)",
    btnReg: "Зарегистрироваться"
};
const html = template(context);
elemTempl.innerHTML = html;

const arrInputs = ["email", "login", "password", "passwordr"];
for (let i = 0; i < arrInputs.length; i++) {
    let id = arrInputs[i];
    const finput = document.getElementById(id);
    finput.addEventListener('blur', validate(id));
}
const elemInEditor = document.getElementById("reg");
elemInEditor.addEventListener('click', function(e) {
    if (validate(arrInputs)) {
        const data = getData(arrInputs);
        console.log(data);
    }
});