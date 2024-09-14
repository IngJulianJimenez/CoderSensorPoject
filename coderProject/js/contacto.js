/******************************************************************************
 * inicio
 * leer data en el local storage
 ******************************************************************************/
user = localStorage.getItem("user");
imagen = localStorage.getItem("imagen");

/******************************************************************************
 * funcion para el footer creador y fecha CreateAndDateFooter()
 ******************************************************************************/
CreateAndDateFooter();
userImageLogin(user, imagen);
