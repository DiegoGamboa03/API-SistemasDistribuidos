const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Rules';

    conn.query(sql, (error, results) => {
    if (error){
      if(error.errno == 1054) {
        res.statusCode = 202; 
        res.send('No rules found');
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
      res.send('No rules found')
      return;
    } 
    });
});

router.get('/getRule/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM Rules WHERE ID = "${id}"`;
    conn.query(sql, (error, result) => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No rule found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
      if (result.length > 0) {
        res.statusCode = 200;
        res.send(result);
      }else{
        res.statusCode = 202;
        res.send('No rules found')
        return;
      }
    });
  });

router.post('/add', (req, res) => {
    const sql = 'INSERT INTO Rules SET ?';
  
    const userObj = {
      ID: req.body.id,
      Fact: req.body.fact,
      Operator: req.body.operator,
      Value: req.body.value
    };
    
    // Aqui poner las verificaciones
    
    conn.query(sql, userObj, error => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No rule found');
            return;
          }
          if(error.errno == 1062){
            res.statusCode = 409;
            res.send('Rule duplicated')
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          console.log(error.sqlMessage)
          return;
        }
        res.send('Rule created!');
    });
  });


router.delete('/delete/:id', (req, res) => {
    const { ID } = req.params;
    const sql = `DELETE FROM Rules WHERE Rule = "${ID}"`;
  
    conn.query(sql, error => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No rule found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }
        res.send('Rule deleted!');
    });
});
  
module.exports = router; 