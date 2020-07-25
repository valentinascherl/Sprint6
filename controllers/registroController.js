const fs=require('fs');
const path = require('path');
const bcrypt=require('bcrypt');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const usersFile = path.join(__dirname, "..", "data", "users.json");
const readJSONfile = () => JSON.parse(fs.readFileSync(usersFile, "utf-8"));
const saveJSONfile = (file) => fs.writeFileSync(usersFile, JSON.stringify(file));
const getNewId = () => {
    const users = readJSONfile();
    let lastId = 0;
    users.forEach(user => {
        if(user.id > lastId) {
            lastId = user.id;
        }
    });
    return lastId+=1;
};

let registroController = {
    registro: function(req, res, next) {
    res.locals.title = "registro";
    res.render('registro', {productosAMostrar: products});
  },


  crear: (req, res) => {
    /*if (req.body.password == req.body.repeat_password) {
        const user = {
            id: getNewId(),
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            avatar: req.body.avatar,
            email: req.body.email,
            contrasena: bcrypt.hashSync(req.body.contrasena, 10),
            domicilio: req.body.domicilio,
            ciudad: req.body.ciudad,
            departamento: req.body.departamento,
            cp: req.body.cp

            
            //faltan los otros datos
           
        };
        req.session.user = user;
        let archivoJSON = readJSONfile();
        archivoJSON.push(user);
        saveJSONfile(archivoJSON);
        res.send("Felicitaciones!, ya formas parte de esta hermosa comunidad HOME GYM. A comprar!");
        //quiero que vuelva a la home y que diga un msj de exito.
        res.redirect('/');
    } else {
        res.redirect("/register", {errors: errrors.errors});
    }*/
    db.Usuario.findAll()
        .then(function(usuarios){
            let usuarioExistente = null;
            usuarios.forEach((elem, i) => {
            if (elem.email == req.body.email) {
                usuarioExistente = elem;
            }
            });
            if (usuarioExistente == null){ // Validamos que el usuario no exista en nuestra base de datos.

                let errors = validationResult(req);

                if (errors.isEmpty()){ //Validamos que no haya errores y creamos una variable con los datos del nuevo usuario.
                let usuario = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                contrasena: bcrypt.hashSync(req.body.contrasena, 10)
                }
                //Agregamos el usuario a Session
                req.session.usuarioLogueado = usuario
                //y agregamos el nuevo usuario a la base de datos
                db.Usuario.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    contrasena: bcrypt.hashSync(req.body.contrasena, 10)
                    });
                mensaje = "El usuario se ha creado correctamente!";
                return res.render("registro",{mensaje: mensaje});
                } else {
                return res.render('registro', {errors: errors.errors});
                }
            } else {
                //Si el usuario ya está registrado.
            res.render("registro", {errors: [{msg:'El Email ingresado ya se encuentra registrado'}]});
            }
        })
        .catch(function(e){
            console.log(e)
        });
},
}



module.exports= registroController;