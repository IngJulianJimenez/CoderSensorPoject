/**
 *
 * @param {*} _user
 * @param {*} _password
 * @returns true
 * ingresar credenciales
 * el for of recorre el array users
 * se compara cada objeto con el _user y  _password
 * si existe true
 * si no existe false
 */
function userExist(_user, _password) {
  let ownerUser;
  let passwordUser;
  for (const x of users) {
    //console.log(x);
    ownerUser = x.owner;
    passwordUser = x.password;
    //console.log(ownerUser);

    if (ownerUser == _user && passwordUser == _password) {
      return true;
    }
  }
  return false;
}

/**
 * funcion clasica
 * @param {*} _user
 * @param {*} _numberSerial
 * @returns resultArray
 * se recorre el arreglo de objetos devices con un for;
 * el objeto completo y sus atributos se guardan en userDevice, por cada ciclo del for;
 * se accede al la propiedad del objeto en cada ciclo del for[index], con userOwner=userDevice.owner y userSerial = userDevice.serial ;
 * comparar si el valor de user que hace login y el serial hacen match en el array devices con userOwner == _user y el serial;
 * si la comparacion es valida exist = true;
 * si la comparacion no es valida exist = false;
 */
function searchDevicesByUser(_user, _numberSerial) {
  let userDevice;
  let userOwner;
  let userSerial;
  let exist = false;

  for (let index = 0; index < devices.length; index++) {
    userDevice = devices[index];
    //console.log(userDevice);
    //console.log(devices[0]);

    userOwner = userDevice.owner;
    userSerial = userDevice.serial;
    //console.log("x:"+userOwner);

    if (userOwner == _user && userSerial == _numberSerial) {
      //
      //console.log(userDevice);
      exist = true;
    }
  }
  return exist;
}

/**
 * funcion anonima
 * @param {*} _numberSerial
 * previamente se consulta si el serial existe
 * si la cinsulta es verdadera
 * se ingresa el serial y se borra del array devices
 */
const deleteDeviceByUser = function (_numberSerial) {
  devices = devices.filter((devices) => devices.serial != _numberSerial);
};

/**
 *
 * @param {*} _user
 * @param {*} _numberSerial
 * @param {*} _description
 * @param {*} _state
 * @param {*} userDate()
 * actulizar dispositivo:
 * description
 * state
 * userDate() actualizar fecha
 */
const updateDeviceByUser = function (
  _user,
  _numberSerial,
  _description,
  _state,
  _funcion
) {
  let userDevice;
  let userOwner;
  let userSerial;

  for (let index = 0; index < devices.length; index++) {
    userDevice = devices[index];

    userOwner = userDevice.owner;
    userSerial = userDevice.serial;

    if (userOwner == _user && userSerial == _numberSerial) {
      userDevice.date = _funcion; //actualizar fecha
      userDevice.description = _description;
      userDevice.estate = _state;
    }
  }
};

/**
 * funcion clasica
 * @param {_user} _user
 * @returns resultArray
 * se recorre el arreglo de objetos devices con un for;
 * el objeto completo y sustributos se guardan en userDevice, por cada ciclo del for;
 * se accede al la propiedad del objeto en cada ciclo del for con userOwner=userDevice.owner;
 * comparar si el valor de la propiedad es igual al user que hace login userOwner == _user;
 * concatenar el resultado en una arreglo vacio resultArray;
 * fnGeneradorNumeros() genera un numero aleatorio  para simular la tempertura
 */
function showDevicesByUser(_user) {
  let userDevice;
  let userOwner;
  let resultArray = [];

  for (let index = 0; index < devices.length; index++) {
    userDevice = devices[index];
    //console.log(userDevice);
    //console.log(devices[0]);

    userOwner = userDevice.owner;
    //console.log("x:"+userOwner);

    if (userOwner == _user) {
      userDevice.temp = fnGeneradorNumeros();
      //console.log(userDevice.temp);
      //console.log(userDevice);
      resultArray.push(userDevice);
    }
  }
  //console.log(answerArray);
  return resultArray;
}

/**
 * clase constructor de un objeto
 * @param {*} _usuario que hace login
 * @param {*} _serial
 * @param {*} _description
 * @param {*} _al agregar es off
 */
class addDevices {
  constructor(_owner, _serial, _description, _estate) {
    this.owner = _owner;
    this.serial = _serial;
    this.description = _description;
    this.estate = _estate;
  }
}

//funcion generador numeros
const fnGeneradorNumeros = () => {
  return (Math.random() * 100).toFixed(2);
};

//funcion gnereador de la fecha actual
let userDate = function () {
  let d = new Date();

  let yy = d.getFullYear();
  let mm = d.getMonth();
  let dd = d.getDay();
  let hh = d.getHours();
  let mn = d.getMinutes();
  let ss = d.getSeconds();
  return yy + "/" + mm + "/" + dd + " " + hh + ":" + mn + ":" + ss;
};

/******************************************************************************
 * declaracion de varaibles
 ******************************************************************************/

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

let devices = [
  {
    owner: "usera",
    serial: "AB12",
    description: "arriba",
    estate: "off",
    date: "",
    temp: "",
  },
  {
    owner: "userb",
    serial: "AB34",
    description: "abajo",
    estate: "off",
    date: "",
    temp: "",
  },
  {
    owner: "usera",
    serial: "AB56",
    description: "derecha",
    estate: "off",
    date: "",
    temp: "",
  },
  {
    owner: "userb",
    serial: "AB78",
    description: "izquierda",
    estate: "off",
    date: "",
    temp: "",
  },
  {
    owner: "usera",
    serial: "CD12",
    description: "salida",
    estate: "off",
    date: "",
    temp: "",
  },
];

const options = [
  "<b>Seleccione una opción del menú: </b>",
  "1 para ingresar nuevo dispositivo",
  "2 mostrar dispositivos",
  "3 actulizar",
  "4 borrar",
  "5 para salir",
  "<form id='formulario'><input type='text'><input type='submit' value='Send' class='button-grey'> </form>",
];

let user;
let passWord;
let option;

let numberSerial = 0;
let _showsearchDevicesByUser;

let state = "off";
let serial;
let description;

let _showDevicesByUser;
let lastArrayShow;

/******************************************************************************
 * inicio
 * Verificar credenciales
 ******************************************************************************/
user = prompt("ingrese usuario: ");
passWord = prompt("ingrese contraseña: ");

if (userExist(user, passWord) == true) {
  alert("Bienvenido.. ! " + user);

  /******************************************************************************
   * DOM
   * mostrar en el front
   * mensaje de bienvenida mas la funcion userDate()
   * usuario que hace login
   * array menu de opciones
   ******************************************************************************/
  let frNameHour = document.getElementsByTagName("footer");
  let frText_1 = document.createElement("p");
  frText_1.innerHTML =
    "Creado por Julian Jimenez | Bogota Colombia <b>CoderHouse</b> 2024 | Hora Local: " +
    userDate();
  frNameHour[0].append(frText_1);

  let frUser = document.getElementById("user");
  let frText_2 = document.createElement("p");
  frText_2.innerHTML = `
  Bienvenido!: <b>${user.toUpperCase()}</b> 
  `;
  frUser.append(frText_2);

  let frMenuOption = document.getElementById("MenuOption");
  for (const op of options) {
    let ul = document.createElement("ul");
    ul.innerHTML = `<li class="list-group-item">${op}</li>`;
    frMenuOption.append(ul);
  }

  let formulario = document.querySelector("#formulario");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    //console.log("formualrio Enviado");
    let form = e.target;
    //console.log("el valor selecionado es: "+form.children[0].value);
    //mostrar
    document.getElementById("resultado").innerHTML = form.children[0].value;
  });

} else {
  alert("Please verify your credentials");
}
