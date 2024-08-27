/******************************************************************************
 * Declaracion de variables
 ******************************************************************************/
let footer = document.getElementsByTagName("footer");
let p = document.createElement("p");

const enlances = [
    {
        link: "home",
        nombre: "home"
    },
    {
        link: "productos",
        nombre: "productos"
    },
    {
        link: "contacto",
        nombre: "contacto"
    },
];

/******************************************************************************
 * Funciones
 ******************************************************************************/
function fnNavigation(_page) {
    console.log(`${_page}` + ".html");
    window.location.href = `${_page}` + ".html";
}

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
 * array menu de opciones
 ******************************************************************************/
function CreateAndDateFooter(){
    p.innerHTML =
    "Creado por Julian Jimenez | Bogota Colombia <b>CoderHouse</b> 2024 | Hora Local: " +
    userDate();
  footer[0].append(p);
}