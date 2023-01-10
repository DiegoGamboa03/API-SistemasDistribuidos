const { Router } = require('express');
const router = new Router();
const conn = require('../Config/DatabaseConfig');



router.get('/getStatus', (req, res) => {
  let floors = [];  
  //Consulta de pisos
  const sql = 'SELECT * FROM Floors';
  conn.query(sql, (error, results) => {
    if (error) {
      if (error.errno == 1054) {
        res.statusCode = 202;
        res.send('No floors found');
        return;
      }
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if (results.length > 0) {
      // Llenar arreglo de pisos
      for (let i = 0; i < results.length; i++) {
        let jsonFloor = {
          IDFloor: results[i]['ID'],
          Rooms: []
        }
        floors.push(jsonFloor);
      }
      //Consulta de habitaciones
      const sql2 = 'SELECT * FROM Rooms';
      conn.query(sql2, (error, results2) => {
        if (error) {
          if (error.errno == 1054) {
            res.statusCode = 202;
            res.send('No floors found');
            return;
          }
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        } else if (results2.length > 0) {
          //Llenar arreglo de habitaciones
          for (let i = 0; i < floors.length; i++) {
            for (let j = 0; j < results2.length; j++) {
              if (floors[i]['IDFloor'] == results2[j]['Floor']) {
                let jsonRoom = {
                  IDRoom: results2[j]['ID'],
                  PosX: results2[j]['PosX'],
                  PosY: results2[j]['PosY'],
                  Devices: []
                }
                floors[i].Rooms.push(jsonRoom)
              }
            }
          }
          res.send(floors)
        } else {
          return;
        }
      })
      
    } else {
      res.statusCode = 202;
      res.send('No floor found')
      return;
    }
  });
});

module.exports = router;