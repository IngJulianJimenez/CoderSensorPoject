/*******************************************************************************
 * limpiar DOM home.js
 *******************************************************************************/
//DOM tabla mostrar dipositivos
let headerTableDevices;
let thDevices;
let TableDevices;
let thTableDevices;

/**
 * funcion limpiar la tabla mostrar usuarios
 * funcion limpiar formulario
 */
function cleanTable() {
  headerTableDevices = document.getElementById("headerTableDevices");
  TableDevices = document.getElementById("TableDevices");

  headerTableDevices.innerHTML = "";
  TableDevices.innerHTML = "";

  let formulario = document.querySelector('#formulario');
  formulario.innerHTML = "";
};


/*******************************************************************************
 * mostrar usuario que hace login e imagen home.js
 *******************************************************************************/
function userImageLogin(user,imagen) {
  let frUser = document.getElementById("user");
  let frText_2 = document.createElement("p");
  frText_2.innerHTML = `
  <b>${user.toUpperCase()}</b>           
  <img src="${imagen}" alt="Avatar" style="width: 40px; border-radius: 50%;"> 
  `;
  frUser.append(frText_2);
}

/*******************************************************************************
 * formulario para agregar dispositivo en el home.js
 *******************************************************************************/
function agregarUsuarioDom() {
  let formulario = document.querySelector('#formulario');

  let div1 = document.createElement("div");
  let div2 = document.createElement("div");
  let input1 = document.createElement("input");
  let input2 = document.createElement("input");
  let button = document.createElement("button");

  div1.className = "mb-3";
  input1.id = "serial";
  input1.type = "text";
  input1.className = "form-control";
  input1.placeholder = "Ingrese serial";

  div2.className = "mb-3";
  input2.id = "description";
  input2.type = "text";
  input2.className = "form-control";
  input2.placeholder = "Ingrese Ciudad";

  button.type = "submit";
  button.className = "btn btn-primary",
    button.innerText = "Agregar"

  //<input id="serial" type="text" class="form-control" placeholder="Ingrese serial">
  //<button type="submit" class="btn btn-primary">Agregar</button>

  formulario.appendChild(div1);
  div1.appendChild(input1);
  formulario.appendChild(div2);
  div2.appendChild(input2);
  formulario.appendChild(button);
}

/*******************************************************************************
 * formulario para actulizar dispositivo en el home.js
 *******************************************************************************/
function updateDispositivoDom() {
  let formulario = document.querySelector("#formulario");
  let div1 = document.createElement("div");
  let div2 = document.createElement("div");
  let div3 = document.createElement("div");
  let input1 = document.createElement("input");
  let input2 = document.createElement("input");
  let label = document.createElement("label");
  let select = document.createElement("select");
  let optionState = ["on", "off"];

  let button = document.createElement("button");

  div1.className = "mb-3";
  input1.id = "numberSerial";
  input1.type = "text";
  input1.className = "form-control";
  input1.placeholder = "Ingrese serial";

  div2.className = "mb-3";
  input2.id = "city";
  input2.type = "text";
  input2.className = "form-control";
  input2.placeholder = "Ingrese Ciudad";

  div3.className = "mb-3";
  label.innerText = "Seleccione un estado: ";
  select.id = "stateOption"; // para capturar el valor de la lista despegable
  select.className = "form-select";
  for (const op of optionState) {
    let option = document.createElement("option");
    option.value = op;
    option.innerText = `${op}`;
    select.appendChild(option);
  }

  button.type = "submit";
  (button.className = "btn btn-primary"),
  (button.innerText = "Actulizar");

  //<input id="serial" type="text" class="form-control" placeholder="Ingrese serial">
  //<button type="submit" class="btn btn-primary">Agregar</button>

  formulario.appendChild(div1);
  div1.appendChild(input1);
  formulario.appendChild(div2);
  div2.appendChild(input2);
  formulario.appendChild(div3);
  div3.appendChild(label);
  label.appendChild(select);
  formulario.appendChild(button);
}

/*******************************************************************************
 * tabla para mostrar los dispositivo por usuario en el home.js
 *******************************************************************************/
function showTableUsersDevices() {
  headerTableDevices = document.getElementById("headerTableDevices");
  thDevices = document.createElement("tr");

  thDevices.innerHTML = `
  <th scope="col">#</th>
  <th scope="col">Owner</th>
  <th scope="col">Serial</th>
  <th scope="col">City</th>
  <th scope="col">State</th>
  <th scope="col">Date</th>
  <th scope="col">Temp°C</th>
  `;
  headerTableDevices.append(thDevices);

  _showDevicesByUser.forEach((element) => {
    lastArrayShow = element;
    //console.log("listado"+lastArrayShow); //array con el resultado por consola

    TableDevices = document.getElementById("TableDevices");
    thTableDevices = document.createElement("tr");

    thTableDevices.innerHTML = `
  <th scope="row">1</th>
  <td>${lastArrayShow.owner}</td>
  <td>${lastArrayShow.serial}</td>
  <td>${lastArrayShow.description}</td>
  <td>${lastArrayShow.estate}</td>
  <td>${lastArrayShow.date}</td>
   <td>${lastArrayShow.temp}</td>
  `;
    TableDevices.append(thTableDevices);
  });
}