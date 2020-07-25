let nombre = document.getElementsByClassName("nombre");
let apellido = document.getElementsByClassName("apellido");
let email = document.getElementsByClassName("email");
let contrasena = document.getElementsByClassName("contrasena");
let formRegistro = document.getElementById("formRegistro");

let errores = [];
nombre.addEventListener("blur", function(){
    if(nombre.value == ""){
        errores.push("El campo nombre debe estar completo");
        document.querySelector('.nombre-invalido').innerHTML = '<li>Este campo debe estar completo.</li>'
    } else if (nombre.value.length < 2){
        document.querySelector('.nombre-invalido').innerHTML = '<li> El nombre debe tener al menos 2 caracteres </li>';
        errores.push("El nombre debe tener al menos 2 caracteres");
        } else {
        document.querySelector('.nombre-invalido').innerHTML = ""
        let error1 = errores.indexOf("El nombre debe tener al menos 2 caracteres")
        if (error1 > -1){
            errores.splice(error1, 1);
        }
        let error2 = errores.indexOf("El campo nombre debe estar completo")
        if (error2 > -1){
            errores.splice(error2, 1);
        }
    }
});

apellido.addEventListener("blur", function(){
    if(apellido.value == ""){
        errores.push("El campo apellido debe estar completo");
        document.querySelector('.apellido-invalido').innerHTML = '<li>Este campo debe estar completo.</li>'
    } else if (apellido.value.length < 2){
        document.querySelector('.apellido-invalido').innerHTML = '<li> El apellido debe tener al menos 2 caracteres </li>';
        errores.push("El apellido debe tener al menos 2 caracteres");
        } else {
        document.querySelector('.apellido-invalido').innerHTML = ""
        let error1 = errores.indexOf("El apellido debe tener al menos 2 caracteres")
        if (error1 > -1){
            errores.splice(error1, 1);
        }
        let error2 = errores.indexOf("El campo apellido debe estar completo")
        if (error2 > -1){
            errores.splice(error2, 1);
        }
    }
});

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
        } else if (contrasena.value.length < 8){
        document.querySelector('.contrasena-invalida').innerHTML = '<li> La contraseña debe tener al menos 8 caracteres </li>';
        errores.push("La contraseña debe tener al menos 4 caracteres");
        } else {
        document.querySelector('.contrasena-invalida').innerHTML = ""
        let error1 = errores.indexOf("Debe ingresar una contraseña")
        if (error1 > -1){
            errores.splice(error1, 1)
        }
        let error2 = errores.indexOf("La contraseña debe tener al menos 4 caracteres")
        if (error2 > -1){
            errores.splice(error2, 1)
        }
    }
});

formRegistro.addEventListener("submit", function(e){
    console.log(errores);
    if (errores.length > 0){
    e.preventDefault();
    }
});