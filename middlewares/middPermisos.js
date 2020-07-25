
let soloUsuariosLogueados = {
   soloUsuariosLogueados: function(req, res, next){
      if (req.session.usuario == undefined) {
         return res.redirect('/users/registro');
      }else{
         next(); // lo deja pasar porque está logueado
      }
   }
}
module.exports = soloUsuariosLogueados;
