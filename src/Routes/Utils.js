const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');



router.get('/getStatus', (req, res) => {
    const sql = 'SELECT * FROM Rooms';
    let rooms = [];
    conn.query(sql, (error, results) => {
    if (error){
      if(error.errno == 1054) {
        res.statusCode = 202; 
        res.send('No devices found');
        return;
      }
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    }else if (results.length > 0) { 
      for(let i=0; i < results.length; i++){
        let jsonRoom = {
          IDRoom:  results[i]['ID'],
          Devices: []
        } 
        
        rooms.push(jsonRoom);
      }
      
      const sql2 = 'SELECT * FROM Devices';
      
      conn.query(sql2, (error, results2) => {
        if (error){
          if(error.errno == 1054) {
            res.statusCode = 202; 
            res.send('No devices found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        }else if (results2.length > 0) {
          
            for(let i=0; i<rooms.length; i++){
              for (let j = 0; j < results2.length; j++) {
                if (rooms[i]['IDRoom'] == results2[j]['Room']) {
                  let jsonDevice = {
                    IDDevice: results2[j]['ID'],
                    Type: results2[j]['Type'],
                    Status: results2[j]['Status'],
                    Value: results2[j]['Value']
                  }
                  //devices.push(jsonDevice);
                  rooms[i].Devices.push(jsonDevice)
                }
              }
            }
            res.send(rooms);            
          }
        })
    }else{
      res.statusCode = 202;
      res.send('No room found')
      return;
    } 
    });
});

module.exports = router;