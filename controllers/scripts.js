"use strict";
console.log("Here we go!!");

// This variable is shown to every function (global)
//var g_person_data;

/*
window.onload = function(event) {
   console.log(event);
    para1.innerHTML = "Changed from JS"; 
     para1.style = "Changed from JS";
    */

// JQUERY $ == constructor

$(document).ready(function() {
    
    console.log("jquery onload triggered");
    $("#head").css("background-color", "white").css("padding", "5px").css("border-radius", "8px");
    
 //   $(".about").text("New text");
    $(".about").html("<b>Luettelo</b>");
 //   $("[data-dummy]").html("<p>Hello World</p>");
    
    var setting = {
        
        method:"GET",
        url:"http://localhost:3000/cdlevyt",
        dataType:"json",
//        jsonp:"jsonp"    //json padding
    }
/**********************************************************************************************/
/**********************************************************************************************/    
    
    $.ajax(setting).done(function (data) {
        console.log(data);
        console.log(Object.keys(data[0])); // Get all keys (attribute names) from json object
        
        
  
        if(data.length > 0){                            //Check that there are elements in array
            
            var headers = Object.keys(data[0]);        //Create table headers dynamically
        
            var row = $("<tr></tr>");
            
            for(var i = 1; i < headers.length; i++){
                
                $("<th>" + headers[i] + "</th>").appendTo(row);
                
            }
            //Add row to thead element
            $(row).appendTo("thead");
         
        }
            
            for (var i = 0; i < data.length; i++) {     //Create table content dynamically   

        
          var html = "<tr>" +
                       "<td>" + data[i].nimi + "</td>" +
                       "<td>" + data[i].formaatti + "</td>" +
                       "<td>" + data[i].levyn_sijainti + "</td>" +
                       "<td>" + data[i].arvostelu + "</td>" +
                       "<td>" + data[i].kappaleet + "</td>" +
                       "<td><input type='button' id=" + data[i]._id + " value='Modify'/></td>"; // + data[i].email + "</td>" +
                       "</tr>";
            
           
            $(html).appendTo("tbody");    //varo duplikaattimääritystä
        }
        
        // Get all elements from DOM where element has attribute 'type' with 
        //value 'button'. Then add event handler for click vent for each of them.
        $("[type=button]").click(function(click_data){
            
            for(var i = 0; i < data.length; i++){
                
                // Check if id from button matches one of person id
                if(click_data.currentTarget.id == data[i]._id)
                    {
                        buildModifyUI(data[i]);
                        break;
                    }
            }
        
            console.log(click_data);
        });
            
            
    });
    

    
});


function buildModifyUI(cdlevy_data){
    
var html = "<input id='nimi' type='text' value='" + cdlevy_data.nimi + "'/>";
    html += "<input id='formaatti' type='text' value='" + cdlevy_data.formaatti + "'/>";
    html += "<input id='levyn_sijainti' type='text' value='" + cdlevy_data.levyn_sijainti + "'/>";
    html += "<input id='arvostelu' type='text' value='" + cdlevy_data.arvostelu + "'/>";
    html += "<input id='kappaleet' type='text' value='" + cdlevy_data.kappaleet + "'/>";
    html += "<input type='button' value='Update' id='update'/>";
    html += "<input type='button' value='Delete' id='delete'/>";
    
    $("body").html(html); //ylikirjoittaa aikaisemman näkymän
    
    $("#delete").click(function(){      //id määrettä osoitetaan #. jos olisi class määre, niin silloin '.'.
        
       $.ajax({
           method:'DELETE',
           url:'http://localhost:3000/cdlevyt/id=' + cdlevy_data._id
       }).done(function(data){location.reload(true)});  //refreshaa sivun javascriptin avulla
    });
    
    $("#update").click(function(){
 
//siirrä päivitetty data temp:iin
        var temp = {
            id:cdlevy_data._id,
            nimi:$("#nimi").val(),
            formaatti:$("#formaatti").val(),
            levyn_sijainti:$("#levyn_sijainti").val(),
            arvostelu:$("#arvostelu").val(),                        
            kappaleet:$("#kappaleet").val()
        }
        
        $.ajax({
            method:"PUT",
            url:'http://localhost:3000/cdlevyt',
            dataType:'json',
            data:temp
        }).done(function(){location.reload(true)});
    });
}
