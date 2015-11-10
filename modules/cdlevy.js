var express = require("express");
var db = require('./queries');

var router = express.Router();

//handle GET request for /persons context
router.get('/', function(req, res) {
    
    db.getAllCdlevyt(req, res);
    
});

//handle POST request for /persons context
router.post('/', function(req, res) {
        
    db.saveNewCdlevy(req, res);
    
});

router.put('/', function(req, res) {
    
    db.updateCdlevy(req,res);
    
});

router.delete('/:id', function(req, res) {
    
    db.deleteCdlevy(req,res);
    
//    console.log(req.params.id);
//    res.send("Person deleted"); //redirect('/');    //Palaa root sivulle
    
});

module.exports = router;