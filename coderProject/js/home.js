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
 * si la cosulta es verdadera
 * se ingresa el serial y se borra del array devices
 */
const deleteDeviceByUser = function (_numberSerial) {
  devices = devices.filter((devices) => devices.serial != _numberSerial);
  localStorage.setItem("UserDevices", JSON.stringify(devices)); // guardar en el local storage el array devices
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
 * recorrer el array devices[], si hace match reemplazar las propiedades del objeto con los datos de entrada
 * guadar en local storage
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
  localStorage.setItem("UserDevices", JSON.stringify(devices)); // guardar en el local storage
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
 * Guardar en el local storage el dispositivo que se ingresa
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
      //userDevice.state = state;
      //userDevice.date = null;
      //userDevice.temp = null;

      //userDevice.temp = fnGeneradorNumeros();
      //console.log(userDevice.temp);
      //console.log(userDevice);
      resultArray.push(userDevice);
    }
    localStorage.setItem("UserDevices", JSON.stringify(resultArray)); // guardar en el local storage
  }
  //console.log(resultArray);
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
  constructor(_owner, _serial, _description, _estate, _date, _temp) {
    this.owner = _owner;
    this.serial = _serial;
    this.description = _description;
    this.estate = _estate;
    this.date = _date;
    this.temp = _temp;
  }
}

//funcion generador numeros
const fnGeneradorNumeros = () => {
  return (Math.random() * 100).toFixed(2);
};

/**
 * funcion que determina sobre cual opcion selecciona el usuario
 * para saber sobre cual opcion se hace click se llama la clase class="item" del html
 * el evento addEventListener toma los datos de la posicion donde se hace click
 * la funcion userChoose la opcion donde se hace click (valor entero) 
 * 
 */
function UserMenuClick() {
  const optionClick = document.querySelectorAll(".item");
  optionClick.forEach((item, value) => {
    item.addEventListener("click", function () {
      //alert('Has Seleccionado la opcion ' + item.innerHTML +" " +`${parseInt(value)}` );
      //alert("Has Seleccionado " + item.innerHTML);
      //console.log(parseInt(value));
      userChoose(parseInt(value));
    });
  });
}

/**
 * @param {*} _usr 
 * @param {*} _dev 
 * @param {*} _ul 
 * @param {*} _apky 
 * recorrer el array devices obtener la ciudad y el usuario
 * comparar el usuario del array con el valor de entrada
 * si hace match el usuario, consumir el api clima con el valor de ciudad
 * actualizar el valor temp del array, con la repuesta del api clima °C
 * se sobre escribe el json UserDevices en el localStorage
 */
const waetherApi = async (_usr,_dev,_ul,_apky) => {
  let userCity;
  let userOwner;
  for (let index = 0; index <_dev.length; index++) {
    userOwner = _dev[index].owner;
    userCity = _dev[index].description;
    if (userOwner == _usr) {
      const respuesta = await fetch(
        `https://${_ul}?q=${userCity}&appid=${_apky}&units=metric`
      );
      const data = await respuesta.json();
      _dev[index].temp = data?.main?.temp;
    }
    localStorage.setItem("UserDevices", JSON.stringify(_dev));
  }
};

/**
 *
 * @param {*} _option
 */
const userChoose = function (option) {
  switch (option) {
    case 1:
      /******************************************************************************
       * funcion cleanTable(), limpia el DOM
       *
       * DOM formulario agregarUsuario()
       * funcion evento formulario
       * agregar un nuevo dispositivo, instanciar un objeto addDevices()
       * agregar el nuevo dispositivo showDevicesByUser();
       *
       ******************************************************************************/
      cleanTable();
      agregarUsuario();

      formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        let serial = document.getElementById("serial").value;
        let description = document.getElementById("description").value;
        //console.log(typeof(serial));
        //console.log(typeof(description));

        //instanciar objeto y agregar objeto
        /** 
        const newDevice = new addDevices(user, serial, description, state);
        devices.push(newDevice);
        console.log("dispositivo agregado consulte desde el menu de opciones: " + newDevice);
        alert("dispositivo agregado consulte desde el menu de opciones");
        */
        //otra forma de agregar mas pro
        //serial != null && description != null &&
        if (serial != "" && description != "") {
          devices.push(
            new addDevices(
              user,
              serial,
              description,
              (state = "off"),
              (date = ""),
              (temp = null)
            )
          );

          showDevicesByUser(user);
          //console.log(devices);
          //console.log(showDevicesByUser(user));

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Se ha guardado la información.",
            showConfirmButton: false,
            timer: 1500,
          });
          cleanTable();
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Ha ocurrido un error, inténtelo nuevamente.",
            showConfirmButton: false,
            timer: 1500,
          });
          cleanTable();
        }
      });
      break;

    case 2:
      // funcion clasica
      /******************************************************************************
       * funcion cleanTable(), limpia el DOM la lista  de usuarios
       * limpiar el local storage
       * limpiar el array devicesLs de almacenamiento del local storage
       * mostrar por El DOM la lista de  devices por usuario showTableUsersDevices();
       *
       * mostrar dispositivos
       * se recorre el arreglo de objetos respuesta de la funcion con un for;
       * el resultado se muestra en pantalla
       *
       * guadar en el array devicesLs los dispositivos del usuario
       * convertir a Json el devicesLs
       * por ultimo guaraar en el local storage  el Json
       ******************************************************************************/
      cleanTable();
      devicesLs = [];

      _showDevicesByUser = showDevicesByUser(user);

      if (_showDevicesByUser <= 0) {
        console.log("usted no cuenta con dispositivos");
        alert("usted no cuenta con dispositivos");
      } else {
        showTableUsersDevices();
      }
      //console.log("prueba: "+ JSON.stringify(devicesLs));
      break;

    case 3:
      /******************************************************************************
       * Actulizar
       * funcion cleanTable(), limpia el DOM la lista  de usuarios
       ******************************************************************************/
      cleanTable();

      console.log("ingrese el serial del dipositivo a actulizar: ");
      numberSerial = prompt("ingrese el serial del dipositivo a actulizar: ");

      _showsearchDevicesByUser = searchDevicesByUser(user, numberSerial);

      if (_showsearchDevicesByUser != true) {
        console.log("por favor, verifique el serial");
        alert("por favor, verifique el serial");
      } else {
        description = prompt("ingrese una descripcion ");
        state = prompt("ingrese un estado valido on / off");

        updateDeviceByUser(user, numberSerial, description, state, userDate()); // enviar fecha
        alert("actualizando ...");
        console.log("actualizando ...");
      }
      break;

    case 4:
      /******************************************************************************
       * Eliminar
       *  funcion cleanTable(), limpia el DOM la lista  de usuarios
       ******************************************************************************/
      cleanTable();

      console.log("ingrese el serial del dipositivo a eliminar: ");
      numberSerial = prompt("ingrese el serial del dipositivo a eliminar: ");

      // funcion clasica
      /**
       * se recorre el arreglo de objetos respuesta de la funcion con un for;
       * se muestra un mensaje si se borro el dispositivo
       * el valor de retorno solo es para determinar si hace match el serial y el usuario
       */

      _showsearchDevicesByUser = searchDevicesByUser(user, numberSerial);
      if (_showsearchDevicesByUser != true) {
        console.log("ha ocurrido un error, verifique el serial a borrar");
        alert("ha ocurrido un error, verifique el serial a borrar");
      } else {
        deleteDeviceByUser(numberSerial);
        console.log("dispositivo eliminado, verifique la lista de dipositivos");
        alert("dispositivo eliminado, verifique la lista de dipositivos");
      }
      break;

    case 5:
      alert("Hasta pronto..");
      console.log("Hasta pronto..");
      break;

    default:
      alert("ingrese una opcion correcta");
      break;
  }
};

/******************************************************************************
 * declaracion de varaibles
 ******************************************************************************/
let devices = []; // leer la informacion del local storage
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
*/

const options = [
  '<div class="item"><b> Seleccione una opción del menú: </b></div>',
  '<div class="item">1 para ingresar nuevo dispositivos </div>',
  '<div class="item">2 mostrar dispositivos </div>',
  '<div class="item">3 actulizar </div>',
  '<div class="item">4 borrar </div>',
  '<div class="item">5 para salir </div>',
];

// credenciales
let user;
let imagen;
let option;

//actulizar dispositivo
let numberSerial = 0;
let _showsearchDevicesByUser;

//agregar dispositivo
let state = "off";
let serial;
let description;
let date;
let temp;

//mostrar dispositivos
let _showDevicesByUser;
let lastArrayShow;
let x;

//guardar en el localStorage
let devicesLs = [];

//varaibles consumir el Api
const url = "api.openweathermap.org/data/2.5/weather";
let appkey = "5f5d115d54af7d2c880aee2f2ea144bd";
let city;

/******************************************************************************
 * inicio
 * leer data en el local storage
 ******************************************************************************/
user = localStorage.getItem("user");
imagen = localStorage.getItem("imagen");

if (user != null) {
  //alert("Bienvenido.. ! " + user);

  /******************************************************************************
  * leer local storage y pasear el json a un array de objetos devices
  * consumir el api del clima waetherApi() y actualizar el valor temp de devices
  * 
  * crear el menu de opciones iterando sobre el array options
  * funcion UserMenuClick(), spara saber sobre cual opcion se hace click
  ******************************************************************************/

  devices = JSON.parse(localStorage.getItem("UserDevices"));
  waetherApi(user,devices,url,appkey); 

  let frMenuOption = document.getElementById("MenuOption");
  for (const op of options) {
    let ul = document.createElement("ul");
    ul.innerHTML = `<li class="list-group-item">${op}</li>`;
    frMenuOption.append(ul);
  }
  UserMenuClick();
} else {
  //alert("Please verify your credentials");
  window.location.href = "404" + ".html";
}