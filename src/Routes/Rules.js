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
    } 
    });
});

router.get('/:rule', (req, res) => {
    const { rule } = req.params;
    const sql = `SELECT * FROM Rules WHERE Rule = "${rule}"`;
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
        res.json(result);
        console.log(result)
      }
    });
  });

router.post('/add', (req, res) => {
    const sql = 'INSERT INTO Rules SET ?';
  
    const userObj = {
      Rule: req.body.rule
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


router.delete('/delete/:rule', (req, res) => {
    const { rule } = req.params;
    const sql = `DELETE FROM Rules WHERE Rule = "${rule}"`;
  
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