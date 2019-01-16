$.ajax('http://localhost:3000/api/users')
//llamo a la ruta para apendear en /users las personas ingresadas en la lista
    .done(function(data){
    for (let i = 0; i<data.length; i++) {
            $('#usuarios').append(`<tr class ='table' id="user-${data[i].id}">            
       <td>${data[i].name}</td>
       <td>${data[i].surname}</td>
       <td>${data[i].phone}</td>
       <td>${data[i].email}</td>
       <td>
       <button id="edit"><a href="/users/edit?id=${data[i].id}">Editar</a></button>
       </td>
       <td>
       <button onclick="eliminar(${data[i].id})" id="delete"><i class="fas fa-trash-alt"></i></button>
       </td>
       </tr>`)
    } 
})
//funcion para que cuando hago Click en Agregar Usuario se agregue a la lista el usuario ingresado
$('#add').on('click', function(){
    location.href=('http://localhost:3000/users/new')

})
//funcion filtro para buscar por palabra clave algun miembro de la lista
$('#filter').on('click', function (search) {
    const filtro = $('#filtrar').val();
    $.ajax('/api/users?search=' + filtro)
    .done(function (data) {
        $('tr').remove();
        for (var i = 0; i < data.length; i++){
            $('.tabla').append(`
            <tr class='table' id="user-${data[i].id}">            
            <td>${data[i].name}</td>
            <td>${data[i].surname}</td>
            <td>${data[i].phone}</td>
            <td>${data[i].email}</td>
            <td> <button id="edit"><a href="/users/edit?id=${data[i].id}">Editar</a></button></td>
            <td><button onclick="eliminar(${data[i].id})" id="delete"><i class="fas fa-trash-alt"></i></button> </td>
            </tr>
            `);
        }
    })

 });
 //funcion para eliminar un usuario

function eliminar (id) {
    alert('Usted elimino un usuario')
    $.ajax('http://localhost:3000/api/users/' + id, {
        method: 'DELETE',
        success: function () {
            $('#user-' + id).remove();
        }
    })
}