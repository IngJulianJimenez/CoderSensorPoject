/******************************************************************************
 * Declaracion de variables
 ******************************************************************************/
const formGroup = document.getElementsByClassName ('form-group');
const send = document.getElementById ('send');
//console.log(formGroup[0]);
//console.log(formGroup[1]);

const label1 = document.createElement('label1');
const label2 = document.createElement('label2');

const input1 = document.createElement('input');
const input2 = document.createElement('input');

const p1 = document.createElement('h6');
const p2 = document.createElement('h6');
const button = document.createElement('button');

let idUser = "idUser";
let idPassWord = "idPassWord";
let idBtnLogin = "idBtnLogin";

/******************************************************************************
 * DOM
 * creacion campo usuario 
 * creación campo contraseña
 * creación botton
 * appendChild o append se usa cuando se anidan varios elementos
 * si es solo uno usar directamente innerHTML o innerTEXT
 * tener presente el input1.id => para capturar el valor de entrada
 ******************************************************************************/
formGroup[0].appendChild(p1).innerHTML="Usuario";
formGroup[0].appendChild(label1).appendChild(input1);
input1.id = idUser;
input1.type ="text";
input1.className = "form-control";
input1.placeholder ="Ingrese Usuario";

formGroup[1].appendChild(p2).innerHTML="Contraseña";
formGroup[1].appendChild(label2).appendChild(input2);
input2.id = idPassWord;
input2.type ="password";
input2.className = "form-control";
input2.placeholder ="Ingrese Contrasenia";

send.innerHTML = `<button id="${idBtnLogin}" type="submit" class="btn btn-primary">Login</button>`;

/******************************************************************************
 * verificar credencioles.
 * Arreglar el boton no funciono
 ******************************************************************************/

const userName = document.getElementById("idUser").value;
const passWord = document.getElementById("idPassWord").value;
const loginBtn = document.querySelector("#idBtnLogin");

loginBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log("formualrio Enviado");

    let form = e.target;

    console.log(form.userName);
    console.log(passWord);
});


