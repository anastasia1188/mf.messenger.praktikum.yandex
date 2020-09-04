function getData(arrFields) {
    result = [];
    for (let i = 0; i < arrFields.length; i++) {
        let idinput = arrFields[i];
        let finput = document.getElementById(idinput);
        let value = finput.value;
        result.push(value);
    }
    return result;
}