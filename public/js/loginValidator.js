let email = document.getElementsByClassName("email");
let contrasena = document.getElementsByClassName("contrasena");
let formLogin = document.getElementById("formLogin");

let errores = [];
email.addEventListener("blur", function(){
    if (email.value == ""){
        errores.push("Este Campo debe estar completo");
        document.querySelector('.email-invalido').innerHTML = '<li>Debe ingresar su email</li>';
        } else {
        document.querySelector('.email-invalido').innerHTML = ""
        let error = errores.indexOf("Este Campo debe estar completo")
        if (error > -1){
            errores.splice(error, 1)
        }
    }
});

contrasena.addEventListener("blur", function(){
    if (contrasena.value == ""){
        document.querySelector('.contrasena-invalida').innerHTML = '<li> Debe ingresar una contraseña </li>';
        errores.push("Debe ingresar una contraseña");
        } else {
        document.querySelector('.contrasena-invalida').innerHTML = ""
        let error = errores.indexOf("Debe ingresar una contraseña")
        if (error > -1){
            errores.splice(error, 1)
        }
    }
});

formLogin.addEventListener("submit", function(e){
    console.log(errores);
    if (errores.length > 0){
    e.preventDefault();
    }
});