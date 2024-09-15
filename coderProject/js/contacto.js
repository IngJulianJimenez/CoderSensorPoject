/******************************************************************************
 * inicio
 * leer data en el local storage
 ******************************************************************************/
user = localStorage.getItem("user");
imagen = localStorage.getItem("imagen");

if (user != null) {
  /******************************************************************************
   * DOM
   * funcion para el footer creador y fecha CreateAndDateFooter()
   * mostrar en el front, usuario que hace login userImageLogin()
   ******************************************************************************/
  CreateAndDateFooter();
  userImageLogin(user, imagen);
} else {
  //alert("Please verify your credentials");
  window.location.href = "404" + ".html";
}
