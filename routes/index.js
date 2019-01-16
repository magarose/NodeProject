var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require ('fs')
var users = fs.readFileSync('usuarios.json')
 
users = JSON.parse(users)
  console.log(users)

//// fs.writeFileSync('usuarios.json', JSON.stringify(users))

/* GET home page. */
router.get('/ping', function(req, res, next){
  res.send('Pong');
});

router.get('/users/', function(req, res, next){
  res.sendFile(path.join(__dirname,'..','public','html','users.html'));
  }); 
  
router.get('/users/new/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html'));
});

router.get('/users/edit/', function(req, res, next){
  res.sendFile(path.join(__dirname,'..','public','html','put.html'));
  }); 
  

router.get('/api/users/:id', function (req, res, next) {
  const id = req.params.id; ///nos trae el parametro que en este caso el id
  console.log(id)

  for (let i = 0; i < users.length; i++) { ///CUANDO PONGO EN LA URL EL NUMERO DE ID ME TIENE QUE TRAER LOS DATOS DEL USER
    if (users[i].id == id) {
      return res.json(users[i]);
      
    }
  }
});


router.post('/api/users/', function (req, res, next) {
  let user = req.body ///TODO EL DOCUMENTO DE LA URL
  
  if(users.length === 0){
    user = {
      name: user.name,
      surname:user.surname,
      email: user.email,
      phone:user.phone,
      id: 1
    }
    console.log(user)
  }else {
    const lastId = users[users.length - 1].id
    user.id = lastId + 1}
  
  users.push(user)
  fs.writeFileSync('usuarios.json', JSON.stringify(users))
  res.json(users)
})

router.put('/api/users/:id', function (req, res, next) {
  console.log (users)
  //siempre hay que bajar el valor dinamico en una constante
  const id = req.params.id  ///req == lo pido // params//el objeto // . id (ej) el elemento q quiero del objeto
  const body = req.body
  const bodyKeys = Object.keys (body)
  for (let i = 0; i < users.length; i++) {
  
    if (users[i].id == id) {
      const currentUser = users [i]
    const userKeys = Object.keys(currentUser)
      // console.log (userKeys) //array
      // console.log (bodyKeys) ///array

      for (let x = 0; x < bodyKeys.length; x++){
        const currentBodyKey = bodyKeys[x]
        // console.log (currentBodyKey) //elemento del array en consola
       if ( userKeys.indexOf(currentBodyKey)  > -1 ) {
         ///si queremos acceder a una clave variable dentro de un objeto, va entre corchetes []
        currentUser[currentBodyKey] = body[currentBodyKey]
        } else {
          console.log (`${currentBodyKey} no es una clave valida`)
        }
      }
      fs.writeFileSync('usuarios.json', JSON.stringify(users))
      return res.json (currentUser)
    }
  }
  
})

router.get('/api/users', function(req, res, next) {
  let usersList = users;
  const search = req.query.search;

  if ( search && search.length > 0) {
    usersList = usersList.filter(function (user) {
      return user.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
        user.surname.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
        user.phone.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
        user.email.toLowerCase().indexOf(search.toLowerCase()) >= 0
    })
  }
  res.json(usersList);
});

  router.delete ('/api/users/:id', function (req, res, next) { ///similar al splice
    const id = req.params.id 
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
      users.splice (i,1)
      }
  }
  console.log (users)
  fs.writeFileSync('usuarios.json', JSON.stringify(users))
  res.send ('ok')
  })

module.exports = router;
