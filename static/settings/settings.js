const elemTempl = document.getElementById('template-settings');
const source = elemTempl.innerHTML;
const template = Handlebars.compile(source);
const context = { fimg: "img/ava.png", fname: "Анастасия", femail: "anastasia1188@mail.ru", flogin: "anastasia1188", fpassword: "********", fpasswordRepeat: "********" };
const html = template(context);
elemTempl.innerHTML = html;

const arrInputs = ["email", "login", "password", "passwordr"];
for (let i = 0; i < arrInputs.length; i++) {
    let id = arrInputs[i];
    const finput = document.getElementById(id);
    finput.addEventListener('blur', validate(id));
}
const elemInEditor = document.getElementById("save");
elemInEditor.addEventListener('click', function(e) {

    if (validate(arrInputs)) {
        const data = getData(arrInputs);
        console.log(data);
    }
});