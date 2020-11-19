export default function getTemplateLogin() {
    return ` <div class="wrapper">
    <form method="post" id="form" action="#" enctype="multipart/form-data">
    <div class="wrapper__row">
        <p> {{mesEnter}} </p>
    </div>
    <div class="wrapper__row">
        <p>
            <img src="../data/img/trebleСlef.png" width="40px" height="40px">
            <input class="wrapper__row" id="login" name="login" type="login" placeholder={{mesMail}}>
           
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-login0">
                    {{errorMes0}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-login4">
                    {{errorMes4}}
                </p>
                <p class="wrapper__errmes wrapper__errmes-hiddenerr" id="err-login5">
                    {{errorMes5}}
                </p>
        </p>
    </div>
    <div class="wrapper__row">
        <p><img src="../data/img/bassСlef.jpg" width="40" height="40px">
            <input class="wrapper__row" id="password" name="password" type="password" placeholder={{mesPassword}}>
        </p>
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
    </div>
    <div class="wrapper__row">
    <div class="myButton"></div>
       
    </div>
    <div class="wrapper__row wrapper__no-accaunt">
        <p id="noAccount"><a href="/#registration" onclick = " window.location.hash = '#registration'"> {{mesAccount}} </a></p>
    </div>
    </form>
</div>`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4udG1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9sb2dpbi9sb2dpbi50bXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCO0lBQ3BDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvREosQ0FBQztBQUNSLENBQUMifQ==