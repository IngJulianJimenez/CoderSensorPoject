/******************************************************************************
 * inicio
 * leer data en el local storage
 ******************************************************************************/
user = localStorage.getItem("user");
if (user != null) {
  /******************************************************************************
   * Declaracion de variables
   ******************************************************************************/
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
      link: "#",
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
   * mostrar en el front footer
   * mensaje de bienvenida mas la funcion userDate()
   * usuario que hace login
   *
   * creaion del  NAVBAR
   ******************************************************************************/
  //FOOTER
  let footer = document.getElementsByTagName("footer");
  let p = document.createElement("p");

  function CreateAndDateFooter() {
    p.innerHTML =
      " © All rights reserved. Julian Jimenez | Bogota Colombia <b>CoderHouse</b> 2024 | Hora Local: " +
      userDate();
    footer[0].append(p);
  }

  //NAVBAR
  const div = document.querySelector("#navbarText");
  const ul = document.createElement("ul");
  //li se crea con cada iteracion del for, por fuera solo se crea una vez
  div.appendChild(ul);
  ul.className = "navbar-nav";
  for (const i of enlances) {
    const li = document.createElement("li");
    li.innerHTML = `<a class="nav-link" href="${i.link}.html">${i.nombre}</a>`;
    ul.appendChild(li);
  }

  /******************************************************************************
   * salir en logOut
   * modal sweet alert
   * proceso afirmativo, borrar el storage , redireccion index.html
   ******************************************************************************/
  function UserNavBar() {
    const navLink = document.querySelectorAll(".nav-link");
    navLink.forEach((item, value) => {
      item.addEventListener("click", function () {
        //alert('Has Seleccionado la opcion ' + item.innerHTML +" " +`${parseInt(value)}` );
        if (parseInt(value) === 2) {
          Swal.fire({
            title: "Está a punto de cerrar sesión",
            text: "¿Desea continuar?",
            icon: "warning",
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            denyButtonColor: "#d33",
            confirmButtonText: "Si, continuar!",
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.clear();
              window.location.href = "index" + ".html";
            }
          });
        }
      });
    });
  }

  UserNavBar();
} else {
  /******************************************************************************
   * 404 regresar al login
   ******************************************************************************/
  let GoBackLogin = document.getElementById("GoBackLogin");
  GoBackLogin.addEventListener("click", () => {
    window.location.href = "index" + ".html";
  });
}
