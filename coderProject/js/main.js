/**
 *
 * @param {*} _user
 * @param {*} _password
 * @returns true
 * ingresar credenciales
 * se usa el for  of para recorrer el array users 
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
    console.log(ownerUser);

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
 * el objeto completo y sustributos se guardan en userDevice, por cada ciclo del for;
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

//actulizar
const updateDeviceByUser = function (
  _user,
  _numberSerial,
  _description,
  _state
) {
  let userDevice;
  let userOwner;
  let userSerial;
  let exist = false;

  for (let index = 0; index < devices.length; index++) {
    userDevice = devices[index];

    userOwner = userDevice.owner;
    userSerial = userDevice.serial;

    if (userOwner == _user && userSerial == _numberSerial) {
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
 *
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
  console.log("Welcome.. " + user);

  /******************************************************************************
   * bucle menu de opciones
   ******************************************************************************/
  do {
    option = parseInt(
      prompt(
        "\nSeleccione numero: \n1 para ingresar nuevo dispositivo\n2 mostrar dispositivos\n3 actulizar\n4 borrar\n5 para salir"
      )
    );
    console.log(
      "\nSeleccione numero: \n1 para ingresar nuevo dispositivo\n2 mostrar dispositivos\n3 actulizar\n4 borrar\n5 para salir"
    );

    switch (option) {
      case 1:
        /******************************************************************************
         * agregar un nuevo dispositivo
         * definir un objeto
         * agregarlo al arreglo de objetos devices,con devices.push(newDevice);
         ******************************************************************************/
        serial = prompt("ingrese el serial del dipositivo: ");
        description = prompt("ingrese una descripcion ");

        //instanciar objeto y agregar objeto
        /** 
        const newDevice = new addDevices(user, serial, description, state);
        devices.push(newDevice);
        console.log("dispositivo agregado consulte desde el menu de opciones: " + newDevice);
        alert("dispositivo agregado consulte desde el menu de opciones");
        */
        //otra forma de agregar mas pro
        devices.push(new addDevices(user, serial, description, state));
        console.log(
          "dispositivo agregado consulte desde el menu de opciones: "
        );
        alert("dispositivo agregado consulte desde el menu de opciones");
        break;

      case 2:
        // funcion clasica
        /******************************************************************************
         * mostrar dispositivos
         * se recorre el arreglo de objetos respuesta de la funcion con un for;
         * el resultado se muestra en pantalla
         ******************************************************************************/
        _showDevicesByUser;
        lastArrayShow;

        _showDevicesByUser = showDevicesByUser(user);

        if (_showDevicesByUser <= 0) {
          console.log("usted no cuenta con dispositivos");
          alert("usted no cuenta con dispositivos");
        } else {
          _showDevicesByUser.forEach(element => {
            lastArrayShow = element;
            console.log(lastArrayShow);
          });
        }
        break;

      case 3:
        /******************************************************************************
         * Actulizar
         ******************************************************************************/
        console.log("ingrese el serial del dipositivo a actulizar: ");
        numberSerial = prompt("ingrese el serial del dipositivo a actulizar: ");

        _showsearchDevicesByUser = searchDevicesByUser(user, numberSerial);

        if (_showsearchDevicesByUser != true) {
          console.log("por favor, verifique el serial");
          alert("por favor, verifique el serial");
        } else {
          description = prompt("ingrese una descripcion ");
          state = prompt("ingrese un estado valido on / off");
          updateDeviceByUser(user, numberSerial, description, state);
          alert("actualizando ...");
          console.log("actualizando ...");
        }
        break;

      case 4:
        /******************************************************************************
         * Eliminar
         ******************************************************************************/
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
          console.log(
            "dispositivo eliminado, verifique la lista de dipositivos"
          );
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
  } while (option < 5);
} else {
  alert("Please verify your credentials");
  console.log("Please verify your credentials");
}
