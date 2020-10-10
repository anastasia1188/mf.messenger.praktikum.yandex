/// <reference path="common.d.ts" />
function getData(arrFields) {
    if (arrFields === void 0) { arrFields = []; }
    var result = [];
    var i;
    for (var i_1 = 0; i_1 < arrFields.length; i_1++) {
        var idinput = arrFields[i_1].input;
        var finput = document.getElementById(idinput);
        result.push(finput.value);
    }
    return result;
}

function compileTemplate(idTemplate, source, context) {
    console.log(idTemplate);
    var elemTemplate = document.querySelector(idTemplate);
    //console.log(elemTemplate);
    var template = Handlebars.compile(source);
    var html = template(context);
    elemTemplate.innerHTML = html;
    return html;
}

function setButtonEvents(idButton, arrInputs, nameHiddenErr) {
    var elemButton = document.getElementById(idButton);
    elemButton.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (isValidValues(arrInputs, nameHiddenErr)) {
                var data = getData(arrInputs);
                console.log(data);
                mainRouter.go('/chat');
            }
        }
    });
    elemButton.addEventListener('click', function(e) {
        if (isValidValues(arrInputs, nameHiddenErr)) {
            var data = getData(arrInputs);
            console.log(data);
        }
    });
}