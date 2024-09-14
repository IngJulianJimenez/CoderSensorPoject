/******************************************************************************
 * inicio
 * leer data en el local storage
 ******************************************************************************/
user = localStorage.getItem("user");
imagen = localStorage.getItem("imagen");

/******************************************************************************
   * DOM
   * funcion para el footer creador y fecha CreateAndDateFooter()
   * mostrar en el front, usuario que hace login userImageLogin()
 ******************************************************************************/
CreateAndDateFooter();
userImageLogin(user, imagen);






