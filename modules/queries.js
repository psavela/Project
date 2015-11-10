var db = require('./database');

/* This function gets all documents from person collection */
exports.getAllCdlevyt = function(req,res) {
    
    db.Cdlevy.find(function(err,data){
        
        if(err) {
            
            console.log(err.message);
            res.send("Error in database");
        }
        else{
            
            res.send(data);
        }
        
    });    
    
}
//ite keksitty nimi funktiolle saveNewPerson
//This function saves new person information to our person collection
exports.saveNewCdlevy = function(req,res){
    
    var cdlevyTemp = new db.Cdlevy(req.body);   // body sisältää json objektin
    //Save i to database
    cdlevyTemp.save(function(err,ok){
        
        res.send("Database action done");
    });
}

// This function deletes one person from our collection
exports.deleteCdlevy = function(req,res){
    
    //What happens here is that req.params.id return string "id=34844646bbsksjdks"
    //split function splits the string form "=" and creates  an array where [0] contains "id"
    //and [1] contains "34844646bbsksjdks"
    var id = req.params.id.split("=")[1];
    console.log(id);
    
    db.Cdlevy.remove({_id:id}, function(err){
        
       if(err){
           
           res.send(err.message);
       } 
        else{
            
            res.send("Delete ok");
        }
    });
    
}

//This method updates one person info
exports.updateCdlevy = function(req,res){
    
    var updateData = {
        nimi:req.body.nimi,
        formaatti:req.body.formaatti,
        levyn_sijainti:req.body.levyn_sijainti,
        arvostelu:req.body.arvostelu,
        kappaleet:req.body.kappaleet,
    }
    db.Cdlevy.update({_id:req.body.id,},updateData, function(err){
        
        res.send({data:"ok"});
    });
    
}
