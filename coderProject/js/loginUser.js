/******************************************************************************
 * Funciones
 ******************************************************************************/
  /**
    * 
    * @param {*} _user 
    * @param {*} _password 
    * @returns si el usario existe en el array retorna true o false
    */
   function userExist(_user, _password) {
    const userExist = users.find(userFind => userFind.owner == _user && userFind.password == _password);
    if (userExist) {
        return true;
    }else{
        return false;
    }
};

/******************************************************************************
 * Declaracion de variables
 ******************************************************************************/
const loginForm = document.getElementById("loginForm");
const input1 = document.createElement('input');
const input2 = document.createElement('input');
const input3 = document.createElement('input');
const div = document.createElement('div');

let users = [
    {
        owner: "usera",
        password: "Co123@",
    },
    {
        owner: "userb",
        password: "Co123#",
    },
    {
        owner: "super",
        password: "Co123*",
    },
];

// credenciales
let user;
let passWord;
let option;


/******************************************************************************
 * DOM
 * plantilla:
 * creacion campo usuario 
 * creación campo contraseña
 * creación botton
 * mensaje de error si falla las credenciales
 ******************************************************************************/
input1.id = "username";
input1.type = "text";
input1.className = "form-control";
input1.placeholder = "Ingrese Usuario";
input1.required = true;
loginForm.appendChild(input1);
//<input type="text" id="username" class="form-control" placeholder="Username" required>

input2.id = "password";
input2.type = "password";
input2.className = "form-control";
input2.placeholder = "Ingrese Contraseña";
input2.required = true;
loginForm.appendChild(input2);
// <input type="password" id="password" class="form-control" placeholder="Password" required>

input3.id = "idBtnLogin";
input3.type = "submit";
input3.className = "btn btn-primary";
input3.value = "Login";
loginForm.appendChild(input3);
//<input id="idBtnLogin" type="submit" value="Send" class="btn btn-primary"></input>

div.id = "ierror-message";
div.className = "error-message";
div.style = "color:#FF0000";
loginForm.appendChild(div);
//<div id="error-message" class="error-message" style="color:#FF0000"></div>

/******************************************************************************
 * inicio
 * Verificar credenciales
 * prevenir el refresh preventDefault();
 * guardar datos del usuario en el localStorage
 * invocar la funcion para navegacion a otra pagina fnNavigation()
 ******************************************************************************/
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //console.log("formualrio Enviado");
    //console.log("usuario es: "+form.children[0].value);
    //console.log("password es: "+form.children[1].value);

    let form = e.target;
    user = form.children[0].value;
    passWord = form.children[1].value;

    if (userExist(user, passWord) == true) {
        localStorage.setItem("user",user);
        fnNavigation("home");
    }else{
        document.getElementById('ierror-message').innerText = "¡Por favor, verifique las credenciales!";
    }
});
