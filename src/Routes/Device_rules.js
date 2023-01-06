const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Device_rules';

    conn.query(sql, (error, results) => {
    if (error){
      if(error.errno == 1054) {
        res.statusCode = 202; 
        res.send('No rules found');
        return;
      }
      res.statusCode = 500; //meter un status que tenga aqui
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

router.get('/findRule/:device/:topic', (req, res) => {
  const { device, topic } = req.params;
  const sql = `SELECT ID_rule, message FROM Device_rules WHERE ID_device = "${device}" AND ID_topic = "${topic}"`;

  conn.query(sql, (error, results) => {
  if (error){
    if(error.errno == 1054) {
      res.statusCode = 202; 
      res.send('No rules found');
      return;
    }
    res.statusCode = 500; //meter un status que tenga aqui
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

router.post('/add', (req, res) => {
    const sql = 'INSERT INTO Device_rules SET ?';
  
    const ruleObj = {
      ID_fact: req.body.fact,
      ID_device: req.body.device,
      ID_topic: req.body.topic
    };
    // Aqui poner las verificaciones
    
    conn.query(sql, ruleObj, error => {
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
        res.send('Device rule created!');
    });
});

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Device_rules WHERE ID = "${id}"`;
  
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