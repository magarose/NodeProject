const urlParams = new URLSearchParams (window.location.search);
const editUser = urlParams.get('id');
//validar los datos ingresados en Editar Usuario

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
        return true;
    }

}

$.ajax('http://localhost:3000/api/users/' + editUser)
.done(function(data){
        $('#nombre').val(data.name)
        $('#apellido').val(data.surname)
        $('#mail').val(data.email)
        $('#telefono').val(data.phone)
        console.log(data)
  })

$('#editarUsuario').on('click', function(){
    if (validar()){
    $.ajax('http://localhost:3000/api/users/' + editUser,{
    method: "PUT",
    data:{
        name: $('#nombre').val(),
        surname: $('#apellido').val(),
        email: $('#mail').val(),
        phone: $('#telefono').val()

        },

     success: function (){
        alert('usuario EDITADO');
        location.href="http://localhost:3000/users/"
        }
        })
    }
    })