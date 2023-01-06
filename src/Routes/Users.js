const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Users';

    conn.query(sql, (error, results) => {
    if (error){
      if(error.errno == 1054) {
        res.statusCode = 202; 
        res.send('No users found');
        return;
      }
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    }
    if (results.length > 0) {
      res.json(results);
    }else{
      res.statusCode = 202;
      res.send('No user found')
      return;
    } 
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Users WHERE ID = "${id}"`;
  conn.query(sql, (error, result) => {
    if (error) {
      if (error.errno == 1054) {
        res.statusCode = 202;
        res.send('No user found');
        return;
      }
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    }
    if (result.length > 0) {
      res.json(result);
      console.log(result)
    }else{
      res.statusCode = 202;
      res.send('No user found')
      return;
    }
  });
});

router.get('/isUser/:id/:password', (req, res) => {
  const { id, password } = req.params;
  const sql = `SELECT COUNT(ID) as isUser
  FROM Users
  WHERE ID = "${id}" AND Password = "${password}"`;
  conn.query(sql, (error, results) => {
  if (error){
    res.statusCode = 500; //meter un status que tenga aqui
    console.log(error.sqlMessage);
    res.send(error.sqlMessage);
    return;
  }
  if (results.length > 0) {
    res.send(results[0]);
  }});
});

router.post('/add', (req, res) => {
    const sql = 'INSERT INTO Users SET ?';
  
    const userObj = {
      ID: req.body.id,
      password: req.body.password
    };
    
    // Aqui poner las verificaciones
    
    conn.query(sql, userObj, error => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No user found');
            return;
          }
          if(error.errno == 1062){
            res.statusCode = 409;
            res.send('User duplicated')
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          console.log(error.sqlMessage)
          return;
        }
        res.send('User created!');
    });
  });


router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Users WHERE ID = "${id}"`;
  
    conn.query(sql, error => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No user found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
        res.send('User deleted!');
    });
});
  
module.exports = router; 