/// <reference path="../common/references.d.ts" />
const context: object = { errmes: "Не туда попали", errcode: "404", backToChat: "назад к чатам" };
compileTemplate('template-404', getTemplate404(), context);