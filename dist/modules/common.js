"use strict";
/// <reference path="common.d.ts" />
function getData(arrFields = []) {
    const result = {};
    for (let i = 0; i < arrFields.length; i++) {
        const idinput = arrFields[i].input;
        const finput = document.getElementById(idinput);
        result[idinput] = finput.value;
    }
    return result;
}
function compileTemplate(idTemplate, source, context, elemDocument) {
    let elemTemplate;
    if (elemDocument === undefined)
        elemTemplate = document.querySelector(idTemplate);
    else
        elemTemplate = elemDocument.querySelector(idTemplate);
    //console.log(idTemplate, elemTemplate, elemDocument);
    const template = Handlebars.compile(source);
    const html = template(context);
    if (elemTemplate !== null)
        elemTemplate.innerHTML = html;
    return html;
}
function setButtonEvents(idButton, arrInputs, nameHiddenErr) {
    const elemButton = document.getElementById(idButton);
    elemButton.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            goNextPage(arrInputs, nameHiddenErr);
        }
    });
    elemButton.addEventListener('click', function (e) {
        goNextPage(arrInputs, nameHiddenErr);
    });
}
function goNextPage(arrInputs, nameHiddenErr) {
    const data = getData(arrInputs);
    console.log(data);
    window.location.hash = '#chat';
}
function setFormEvents(arrInputs, nameHiddenErr) {
    const frmAutorisation = document.querySelector("#form");
    frmAutorisation.addEventListener("submit", function (e) {
        e.preventDefault();
        goNextPage(arrInputs, nameHiddenErr);
    });
}
function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZHVsZXMvY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQ0FBb0M7QUFVcEMsU0FBUyxPQUFPLENBQUMsWUFBZ0QsRUFBRTtJQUMvRCxNQUFNLE1BQU0sR0FBb0IsRUFBRSxDQUFDO0lBRW5DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLE1BQU0sT0FBTyxHQUFXLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDM0MsTUFBTSxNQUFNLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDbEM7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsVUFBa0IsRUFBRSxNQUFjLEVBQUUsT0FBZSxFQUFFLFlBQXdDO0lBQ2xILElBQUksWUFBd0IsQ0FBQztJQUM3QixJQUFJLFlBQVksS0FBSyxTQUFTO1FBQzFCLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFBOztRQUVqRCxZQUFZLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUxRCxzREFBc0Q7SUFDdEQsTUFBTSxRQUFRLEdBQVEsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0IsSUFBSSxZQUFZLEtBQUssSUFBSTtRQUNyQixZQUFZLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNsQyxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsUUFBZ0IsRUFBRSxTQUEwQyxFQUFFLGFBQXFCO0lBQ3hHLE1BQU0sVUFBVSxHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO1FBQy9DLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxPQUFPLEVBQUU7WUFDbkIsVUFBVSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7UUFDNUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxTQUEwQyxFQUFFLGFBQXFCO0lBQzdFLE1BQU0sSUFBSSxHQUFRLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztBQUNuQyxDQUFDO0FBRUwsU0FBUyxhQUFhLENBQUMsU0FBMEMsRUFBRSxhQUFxQjtJQUNwRixNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO1FBQ2xELENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixVQUFVLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLElBQVksRUFBRSxJQUFZO0lBQ3pDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pELENBQUMifQ==