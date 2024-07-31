console.log("inicio");

let devices = [
  { owner: "usera", serial: "AB12", description: "arriba", estate: "off" },
  { owner: "userb", serial: "AB34", description: "abajo", estate: "off" },
  { owner: "usera", serial: "AB56", description: "derecha", estate: "off" },
  { owner: "userb", serial: "AB78", description: "izquierda", estate: "off" },
  { owner: "usera", serial: "CD12", description: "salida", estate: "off" },
];

/**
 * funcion clasica
 * @param {_user} _user
 * @returns resultArray
 * se recorre el arreglo de objetos devices con un for;
 * el resultado se guarda en userDevice;
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
 * funcion clasica
 * @param {*} _user
 * @param {*} _deleteSerial
 * @returns resultArray
 * se recorre el arreglo de objetos devices con un for;
 * el resultado se guarda en userDevice;
 * se accede al la propiedad del objeto en cada ciclo del for con userOwner=userDevice.owner y userSerail = userDevice.serial ;
 * comparar si el valor de la propiedad es igual al user que hace login userOwner == _user y el serial;
 * concatenar el resultado en una arreglo vacio resultArray;
 * si el arreglo resultante es  mayor a 0
 * se borra el objeto con el serial a consultar del array con devices.filter, adicional se sobre escribe el array original
 */
function deleteDevicesByUser(_user, _deleteSerial) {
  let userDevice;
  let userOwner;
  let userSerail;
  let resultArray = [];

  for (let index = 0; index < devices.length; index++) {
    userDevice = devices[index];
    //console.log(userDevice);
    //console.log(devices[0]);

    userOwner = userDevice.owner;
    userSerail = userDevice.serial;
    //console.log("x:"+userOwner);

    if (userOwner == _user && userSerail == _deleteSerial) {
      //console.log(userDevice);
      resultArray.push(userDevice);
    }
  }

  if (resultArray.length <= 0) {
    return resultArray;
  } else {
    devices = devices.filter((devices) => devices.serial != _deleteSerial);
    //console.log(devices);
    return resultArray;
  }
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

/**************************************************
 *               ingreso credenciales
 *************************************************/

let user = prompt("ingrese usuario: ");
let passWord = prompt("ingrese contraseña: ");
let option;

if (
  (user == "a" && passWord == "c") ||
  (user == "userb" && passWord == "Co123#") ||
  (user == "super" && passWord == "Co123*")
) {
  alert("Bienvenido.. ! " + user);
  console.log("Welcome.. " + user);

  /**
   * bucle menu de opciones
   */
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
        /**
         * agregar un nuevo dispositivo
         * definir un objeto
         * agregarlo al arreglo de objetos devices,con devices.push(newDevice);
         */
        const state = "off";
        let serial = prompt("ingrese el serial del dipositivo: ");
        let description = prompt("ingrese una descripcion ");

        //instanciar objeto y agregar objeto
        /** 
        const newDevice = new addDevices(user, serial, description, state);
        devices.push(newDevice);
        console.log("dispositivo agregado consulte desde el menu de opciones: " + newDevice);
        alert("dispositivo agregado consulte desde el menu de opciones");
        */
       //otra forma de agregar mas pro 
        devices.push(new addDevices(user, serial, description, state)); 
        console.log("dispositivo agregado consulte desde el menu de opciones: ");
        alert("dispositivo agregado consulte desde el menu de opciones");
        break;

      case 2:
        // funcion clasica
        /**
         * se recorre el arreglo de objetos respuesta de la funcion con un for;
         * el resultado se muestra en pantalla
         */
        let _showDevicesByUser;
        let lastArrayShow;

        _showDevicesByUser = showDevicesByUser(user);

        if (_showDevicesByUser <= 0) {
          console.log("usted no cuenta con dispositivos");
          alert("usted no cuenta con dispositivos");
        } else {
          console.log("usuario " + user + " sus dipostivos son:");
          for (let index = 0; index < _showDevicesByUser.length; index++) {
            lastArrayShow = _showDevicesByUser[index];
            console.log(lastArrayShow);
          }
        }
        break;

      case 3:
        console.log("modulo en actulizacion... ");
        alert("modulo en actulizacion... ");
        break;

      case 4:
        console.log("ingrese el serial del dipositivo a eliminar: ");
        let deleteSerial = prompt(
          "ingrese el serial del dipositivo a eliminar: "
        );

        // funcion clasica
        /**
         * se recorre el arreglo de objetos respuesta de la funcion con un for;
         * se muestra un mensaje si se borro el dispositivo
         * el valor de retorno solo es para determinar si es vacio o con datos el array
         */
        let _showDeleteDevicesByUser;

        _showDeleteDevicesByUser = deleteDevicesByUser(user, deleteSerial);

        if (_showDeleteDevicesByUser <= 0) {
          console.log("ha ocurrido un error, verifique el serial a borrar");
          alert("ha ocurrido un error, verifique el serial a borrar");
        } else {
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
