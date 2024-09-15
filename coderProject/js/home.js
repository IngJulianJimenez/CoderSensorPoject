/**
 * funcion clasica
 * @param {*} _user
 * @param {*} _numberSerial
 * @returns resultArray
 * recorrer el array devices obtener
 * comparar userOwner con el valor de entrada
 * comparar userSerial con el valor de entrada
 * si hace match el usuario el dispositvo existe
 * actualizar el valor temp del array, con la repuesta del api clima °C
 * se sobre escribe el json UserDevices en el localStorage
 */
function searchDevicesByUser(_usr, _nbrSrl,_dev) {
  let userOwner;
  let userSerial;
  let exist = false;  
  for (let index = 0; index < _dev.length; index++) {
    userOwner = _dev[index].owner;
    userSerial = _dev[index].serial;
    //console.log("x:"+userOwner);
    if (userOwner == _usr && userSerial == _nbrSrl) {
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
  let userOwner;
  let userSerial;

  for (let index = 0; index < devices.length; index++) {
    userDevice = devices[index];

    userOwner = devices[index].owner;
    userSerial = devices[index].serial;

    if (userOwner == _user && userSerial == _numberSerial) {
      devices[index].date = _funcion; //actualizar fecha
      devices[index].description = _description;
      devices[index].estate = _state;
    }
    localStorage.setItem("UserDevices", JSON.stringify(devices[index])); // guardar en el local storage
  }
};

/**
 * funcion clasica
 * @param {_usr} _user
 * @returns resultArray
 * recorrer el array devices obtener la propiedad _dev[index].owner
 * comparar el userOwner del array con el valor de entrada _usr
 * si hace match el objeto completo se guarda en un nuevo resultArray
 * se sobre escribe el json UserDevices en el localStorage con el valor del resultArray
 */
function showDevicesByUser(_usr, _dev) {
  let userOwner;
  let resultArray = [];
  for (let index = 0; index < _dev.length; index++) {
    userOwner = _dev[index].owner;
    //console.log("x:"+userOwner);
    if (userOwner == _usr) {
      //console.log(_dev[index]);
      resultArray.push(_dev[index]);
    }
    localStorage.setItem("UserDevices", JSON.stringify(resultArray));
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

  //funcion generador de la fecha actual
  let userDate = function () {
    let d = new Date();
    //console.log(d);
    //console.log(d.getDay());

    let yy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let hh = d.getHours();
    let mn = d.getMinutes();
    let ss = d.getSeconds();
    return yy + "/" + mm + "/" + dd + " " + hh + ":" + mn + ":" + ss;
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
 * guardar el resultado en un nuevo array
 * se sobre escribe el json UserDevices en el localStorage
 */
const waetherApi = async (_usr, _dev, _ul, _apky) => {
  let userCity;
  let userOwner;
  let resultArray = [];
  for (let index = 0; index < _dev.length; index++) {
    userOwner = _dev[index].owner;
    userCity = _dev[index].description;
    if (userOwner == _usr) {
      const respuesta = await fetch(
        `https://${_ul}?q=${userCity}&appid=${_apky}&units=metric`
      );
      const data = await respuesta.json();
      _dev[index].temp = data?.main?.temp;
      resultArray.push(_dev[index]);
    }
    localStorage.setItem("UserDevices", JSON.stringify(resultArray));
  }
};

/**
 * @param {*} _option
 * funcion para la opcion que escoge el usuario
 * async para promesas de la libreria sweetAlert
 */
const userChoose = function (option) {
  switch (option) {
    case 1:
      /******************************************************************************
       * funcion cleanTable(), limpia el DOM
       * DOM formulario para agregar nuevos dispositivos agregarUsuario()
       * leer  el local storage  y guardar la data de  UserDevices en el array devices
       * funcion evento formulario
       * agregar un nuevo dispositivo, instanciar un objeto addDevices()
       * agregar el nuevo dispositivo showDevicesByUser();
       * funcion waetherApi() para consumir el api del clima, y actulizar el valor de temp
       ******************************************************************************/
      cleanTable();
      agregarUsuarioDom();
      devices = JSON.parse(localStorage.getItem("UserDevices"));

      formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        let serial = document.getElementById("serial").value;
        let description = document.getElementById("description").value;
        //console.log(typeof(serial)+serial);
        //console.log(typeof(description)+description);

        //instanciar objeto y agregar objeto
        /** 
        const newDevice = new addDevices(user, serial, description, state);
        devices.push(newDevice);
        console.log("dispositivo agregado consulte desde el menu de opciones: " + newDevice);
        alert("dispositivo agregado consulte desde el menu de opciones");
        */
        //otra forma de agregar mas pro
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

          showDevicesByUser(user, devices);
          waetherApi(user, devices, url, appkey);
          cleanTable();

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Se ha guardado la información.",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Ha ocurrido un error, inténtelo nuevamente.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
      break;

    case 2:
      // funcion clasica
      /******************************************************************************
       * funcion cleanTable(), limpia el DOM la lista  de usuarios
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
      devices = JSON.parse(localStorage.getItem("UserDevices"));
      _showDevicesByUser = showDevicesByUser(user, devices);
      if (_showDevicesByUser <= 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "usted no cuenta con dispositivos!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        devices = [];
        showTableUsersDevices();
      }
      break;

    case 3:
      /******************************************************************************
       * Actulizar
       * funcion cleanTable(), limpia el DOM la lista  de usuarios
       * DOM para mostrar el formulario que se actulizara updateDispositivoDom()
       * evento addEventListener para capturar la informacion del formulario dispositivos
       * leer el local storage para obtener la informacion de los devices 
       ******************************************************************************/
      cleanTable();
      updateDispositivoDom();

      formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        devices = JSON.parse(localStorage.getItem("UserDevices"));
        let numberSerial = document.getElementById("numberSerial").value;
        let description = document.getElementById("city").value;
        let state = document.getElementById("stateOption").value;
        //console.log(user);
        //console.log(numberSerial);
        //console.log(description);
        //console.log(state);

        _showsearchDevicesByUser = searchDevicesByUser(user, numberSerial, devices);
        if (_showsearchDevicesByUser && numberSerial != "" && description != "") {
          updateDeviceByUser(user, numberSerial, description, state, userDate()); // enviar fecha
          waetherApi(user, devices, url, appkey);

          cleanTable();
          devices=[];
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Dispositivo Actulizado!",
            text: "consulte el listado de dispositivos",
            showConfirmButton: false,
            timer: 2000
          });   
        }
        else{
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Ha ocurrido un error!",
            text: "intentelo nuevamente",
            showConfirmButton: false,
            timer: 2000
          });   
        }
      });
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
    /** 
    case 5:
      alert("Hasta pronto..");
      console.log("Hasta pronto..");
      break;

    default:
      alert("ingrese una opcion correcta");
      break;
      */
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
  '<div class="item">Ingresar dispositivo. </div>',
  '<div class="item">Mostrar lista dispositivos. </div>',
  '<div class="item">Actaulizar lista dispositivos. </div>',
  '<div class="item">Borrar dispositivo. </div>',
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
   * borrar el array devices
   ******************************************************************************/

  devices = JSON.parse(localStorage.getItem("UserDevices"));
  waetherApi(user, devices, url, appkey);
  devices = [];

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
