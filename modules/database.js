var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/koe',connectionStatus);

/***********************************************
**** Connection callback for fail and ok cases *
************************************************/

function connectionStatus(err, ok){
    
    if(err){
        
        console.log(err.message);
        
    }else{
        
        console.log("We are connected!");
        
    }
}


var Cdlevy = mongoose.model('Cdlevy', {   //joka collectionista tehtävä malli. tee tästä kopio user malliin!!!
    
    nimi:String,
    formaatti:String,
    levyn_sijainti:String,
    arvostelu:{type:Number}, //, min:0,max:120,default:2}
    kappaleet:{String}
},'cdlevy');


/******** Using exports object you exspose the data to other modules ********/

exports.Cdlevy = Cdlevy;         //Person 

exports.myFunction = function() {
    
    console.log("This ");
}