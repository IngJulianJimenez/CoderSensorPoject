/******************************************************************************
 * Declaracion de variables
 ******************************************************************************/
//FOOTER
let footer = document.getElementsByTagName("footer");
let p = document.createElement("p");

//NAVBAR
const div = document.querySelector("#navbarText");
const ul = document.createElement("ul");

const enlances = [
  {
    link: "home",
    nombre: "Home",
  },
  {
    link: "contacto",
    nombre: "Contacto",
  },
  {
    link: "logOut",
    nombre: "Log out",
  },
];

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

/******************************************************************************
 * DOM
 * mostrar en el front
 * mensaje de bienvenida mas la funcion userDate()
 * usuario que hace login
 *
 * creaion del  NAVBAR
 ******************************************************************************/
function CreateAndDateFooter() {
  p.innerHTML =
    " © All rights reserved. Julian Jimenez | Bogota Colombia <b>CoderHouse</b> 2024 | Hora Local: " +
    userDate();
  footer[0].append(p);
}

//NAVBAR
//li se crea con cada iteracion del for, por fuera solo se crea una vez
div.appendChild(ul);
ul.className = "navbar-nav";
for (const i of enlances) {
  const li = document.createElement("li");
  li.innerHTML = `<a class="nav-link" href="${i.link}.html">${i.nombre}</a>`;
  ul.appendChild(li);
}
