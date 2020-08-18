//adding 3rd party modules
const express = require('express');
const path = require('path');
const db = require('../util/database.js');
const bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');


//using express router
const app = express();
const router = express.Router();


//set views file
app.set('views', path.join(__dirname, 'views'));

//set view engine
app.set('view engine', 'hbs');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/', (req, res) => {

   db.execute("SELECT * FROM items")
      .then(items => {

         res.render('../views/User/MainDashboard.hbs', {
            result: items[0]
         });

      })
      .catch(err => {
         console.warn(err)
      });

})

router.use('/selecedlist', function (request, response) {
   const items = request.body.items;
   var name = request.body.name;

   var itemsArr = items.split(',');
   var i;
   for (i = 0; i < itemsArr.length - 1; i++) {

      db.execute(" INSERT INTO list( itemid, quantity, listname) VALUES ('" + itemsArr[i] + "', '1' ,'" + name + "') ")
         .then(items => {

            console.log("Inserted initial list")
            console.log(i + " " + itemsArr.length)
            if(i==itemsArr.length-1)
            {
               response.redirect('/route');
            }            

         })
         .catch(err => {
            console.warn(err)
         });
   }

});

router.use('/route', (req, res) => {
   
   db.execute("SELECT * FROM list")
      .then(list => {
         
         res.render('../views/User/ListPage2.hbs', {
            result: list[0]
         });

         console.log("here")

      })
      .catch(err => {
         console.warn(err)
      });

})

//exporting module
module.exports = router;