// У кнопки есть index.js, который экспортирует только нужное
import { render } from "../utils/renderDOM.js";
import { Err } from "../components/err/index.js";


export const err = new Err({
    errcode: ''
});

// app — это class дива в корне DOM
render(".template-err", err);