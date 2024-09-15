/******************************************************************************
 * Funciones
 ******************************************************************************/
/**
 *
 * @param {*} _user
 * @param {*} _password
 * @returns 
 * si el usario existe en el array retorna true o false 
 * guarda en el locla storage la informacion del usuario que hace login
 */
function userExist(_user, _password) {
  const userExist = users.find(
    (userFind) => userFind.owner == _user && userFind.password == _password
  );
  if (userExist) {
    localStorage.setItem("user", userExist.owner);
    localStorage.setItem("imagen", userExist.imagen);
    //console.log(userExist.owner);
    //console.log(userExist.password);
    //console.log(userExist.imagen);
    return true;
  } else {
    return false;
  }
}

/**
 * leer el users.json
 * concatenar cada objeto del json en un array global users=[]
 */
const readUserJson = async () => {
    let a;
    const respuesta = await fetch("./json/users.json");
    const datos = await respuesta.json();
    for (item of datos) {
      a = item;
      users.push(a);
    }
    //console.log(users);
  };

  /**
 * leer el devices.json
 * concatenar cada objeto del json en un array global users=[]
 */
  const readUserDevices = async () => {
    let a;
    const respuesta = await fetch("./json/devices.json");
    const datos = await respuesta.json();
    for (item of datos) {
      a = item;
      devices.push(a);
    }
    //console.log(devices);
  };

  /**
 * funcion clasica
 * @param {_user} _user
 * @returns resultArray
 * recorrer el array devices obtener la propiedad _dev[index].owner 
 * comparar el userOwner del array con el valor de entrada _usr
 * si hace match el objeto completo se guarda en un nuevo resultArray
 * se sobre escribe el json UserDevices en el localStorage, con el array resultArray
 * se intenta sobre escribir con _dev y el reultado es todo el array de entrada sin filtrar
 */
function showDevicesByUser__(_usr,_dev ) {
  let userOwner;
  let resultArray = [];

  for (let index = 0; index < _dev.length; index++) {
    userOwner = _dev[index].owner;
    //console.log("x:"+userOwner);
    if (userOwner == _usr) {
      resultArray.push(_dev[index]);
    }
    localStorage.setItem("UserDevices", JSON.stringify(resultArray)); // guardar en el local storage      
  }
  //console.log(answerArray);
  return resultArray;
};

/******************************************************************************
 * Declaracion de variables
 ******************************************************************************/
let users = [];
let devices = [];


/** 
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
*/

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
const loginForm = document.getElementById("loginForm");
let div1 = document.createElement("div");
let div2 = document.createElement("div");
let div3 = document.createElement("div");
let input1 = document.createElement("input");
let input2 = document.createElement("input");
let button = document.createElement("input");
let div = document.createElement("div");

div1.className = "mb-3";
input1.id = "username";
input1.type = "text";
input1.className = "form-control";
input1.placeholder = "Ingrese Usuario";
input1.required = true;
loginForm.appendChild(div1);
div1.appendChild(input1);
//<input type="text" id="username" class="form-control" placeholder="Username" required>

div2.className = "mb-3";
input2.id = "password";
input2.type = "password";
input2.className = "form-control";
input2.placeholder = "Ingrese Contraseña";
input2.required = true;
loginForm.appendChild(div2);
div2.appendChild(input2);
// <input type="password" id="password" class="form-control" placeholder="Password" required>

div3.className = "d-grid gap-2";
button.id = "idBtnLogin";
button.type = "submit";
button.className = "btn btn-primary";
button.value = "Login";
loginForm.appendChild(div3);
div3.appendChild(button);
//<input id="idBtnLogin" type="submit" value="Send" class="btn btn-primary"></input>

div.id = "ierror-message";
div.className = "error-message";
div.style = "color:#FF0000";
loginForm.appendChild(div);
//<div id="error-message" class="error-message" style="color:#FF0000"></div>

/******************************************************************************
 * inicio
 * funcion readUserJson leer json local con los usuarios
 * 
 * Verificar credenciales
 * prevenir el refresh preventDefault();
 * guardar datos del usuario en el localStorage
 * redireccionar a la pantalla home => window.location.href
 ******************************************************************************/

readUserJson();
readUserDevices();

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //console.log("formualrio Enviado");
  //console.log("usuario es: "+form.children[0].value);
  //console.log("password es: "+form.children[1].value);

  user = document.getElementById("username").value;
  passWord = document.getElementById("password").value;

  if (userExist(user, passWord) == true){
    showDevicesByUser__(user,devices);
    //localStorage.setItem("UserDevices", JSON.stringify(_showDevicesByUser_)); // guardar en el local storage
    //console.log(_showDevicesByUser_);
    //localStorage.setItem("user", user);
    window.location.href = "home" + ".html";
  } else {
    document.getElementById("ierror-message").innerText =
      "¡Por favor, verifique las credenciales!";
  }
});
