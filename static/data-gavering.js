function getData(arrFields) {
    const result = [];
    for (let i = 0; i < arrFields.length; i++) {
        let idinput = arrFields[i];
        let finput = document.getElementById(idinput);
        result.push(finput.value);
    }
    return result;
}