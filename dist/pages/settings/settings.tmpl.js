export default function getTemplateSettings() {
    return `
    <div class="basic-wrapper">
    <form method="post" id="form" class="basic-wrapper__item">
        <div class="basic-wrapper__settings">
            
            <p>
                <img src={{fimg}} alt="" id="avatar" class="round" width="80px" height="80px">
            </p>
            <p>
                <input type="file" id="newPhoto"></input>
            </p>
           
            <div>
                <p>{{fname}}</p>
            </div>
            <p>
                <div class="basic-wrapper__itemrow">
                    <label for="email" class="basic-wrapper__leftitem">Почта</label>
                    <input id="email" class="basic-wrapper__setting" value={{femail}}>
                </div>
                
                <div class="basic-wrapper__line"></div>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-email0">
                    {{errorMes0}}
                 </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-email4">
                    {{errorMes4}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-email5">
                    {{errorMes5}}
                </p>
            </p>
            <p>
                <div class="basic-wrapper__itemrow">
                    <label for="name"class="basic-wrapper__leftitem">Имя</label>
                    <input id="name" class="basic-wrapper__setting" value={{fname}}>
                </div>
                <div class="basic-wrapper__line"></div>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-name0">
                    {{errorMes0}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-name4">
                    {{errorMes4}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-name5">
                    {{errorMes5}}
                </p>
            </p>
            <p>
                <div class="basic-wrapper__itemrow">
                    <label for="password" class="basic-wrapper__leftitem">Пароль</label>
                    <input id="password" class="basic-wrapper__setting" type="password" value={{fpassword}}>
                </div>
                
                <div class="basic-wrapper__line"></div>
                
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password1">
                    {{errorMes1}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password2">
                    {{errorMes2}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password3">
                    {{errorMes3}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password4">
                    {{errorMes4}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password5">
                    {{errorMes5}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-password6">
                {{errorMes6}}
            </p>
            </p>
            <p>
                <div class="basic-wrapper__itemrow">
                    <label for="passwordr" class="basic-wrapper__leftitem">Пароль (еще раз)</label>
                    <input id="passwordr" class="basic-wrapper__setting" type="password" value={{fpasswordRepeat}}>
                </div>
               
                <div class="basic-wrapper__line"></div>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-passwordr1">
                    {{errorMes1}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-passwordr2">
                    {{errorMes2}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-passwordr3">
                    {{errorMes3}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-passwordr4">
                    {{errorMes4}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-passwordr5">
                    {{errorMes5}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-passwordr6">
                    {{errorMes6}}
                </p>
            </p>
            <div class="myButton">
            </div>
        </div>
    </form>
    </div>`;
}
