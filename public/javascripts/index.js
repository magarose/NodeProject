//funcion para validar los datos ingresados en los inputs

function validar (){
    var nombre =  $('#nombre').val()
    var apellido =  $('#apellido').val()
    var mail= $('#mail').val()
    var telefono =  $("#telefono").val();


    if (nombre.length == 0 || nombre.length >= 30 || /^\s+$/.test(nombre) ) {
        console.log (nombre)
        alert ('el nombre ingresado no es valido')
        return false; 
    }else if (apellido.length == 0 || apellido.length >= 30 || /^\s+$/.test(apellido) ) {
        console.log(apellido)
        alert ('el apellido ingresado no es valido')
        return false;
    } else if(!(/^\d{10}$/.test(telefono) )) {
        console.log(telefono)
        alert ('El telefono ingresado no es valido. Debe tener 10 caracteres')
        return false;
    } else if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        console.log(mail)
        alert ('el mail ingresado no es valido')
        return false;
    } else{
        alert('usuario ingresado')
        return true;
    }
}
//funcion para guardar los datoss
$('#save').on('click', function guardar(){ 
   if (validar()){
    var nombre =  $('#nombre').val()
    var apellido =  $('#apellido').val()
    var mail= $('#mail').val()
    var telefono =  $("#telefono").val();
    $.ajax('http://localhost:3000/api/users/',{
        method: "POST",
        data:{
            name: nombre,
            surname: apellido,
            email: mail,
            phone: telefono,
            },
            success: function(){
                location.href='http://localhost:3000/users/'
                }
    
        }) 
        
        .done(function(){

   
         })   
      }
})