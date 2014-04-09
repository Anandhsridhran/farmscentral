//index.html
$(document).ready(function(){
  delayShow();
  var toppos=($(window).height()/3.5) - ($("#alertdiv").height()/3.5);
  var leftpos=($(window).width()/2) - ($("#alertdiv").width()/2);
  $("#alertdiv").css("top", toppos).css("left",leftpos);    
  var token = window.localStorage.getItem('login_token');
});
//home.html
function delayShow() {
  var secs = 50;
  setTimeout('jQuery("body").css("visibility","visible");', secs);
}




function user_logout() {
        window.localStorage.removeItem('login_token');
        window.localStorage.removeItem('location');
        window.localStorage.removeItem('shipid');
        window.localStorage.removeItem('id');
        window.localStorage.removeItem('role');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('first_name');
        window.localStorage.removeItem('last_name');
        window.localStorage.removeItem('farm');
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('barn_id');
        window.location ='index.html';
}

//Inventory.html
function check_pig_death(){
  if($('#radio-choice-1').is(':checked')) { 
    //alert();
    window.location ='#demo-page2'
   }
   else{
        window.location ='#demo-page3'
        }    
}
function check_treat(){
  if($('#radio-choiceb-1').is(':checked')) { 
    //alert();
    window.location ='#demo-page4'
   }
   else{
        window.location ='#demo-page7'
        }   
 }

function demopage3(){
  window.location ='#demo-page3'
  //location.reload();
}
function demopage5(){
  history.back();
  //window.location ='#demo-page5'
  //location.reload();
}
function back(){
  //window.location ='#demo-page1'
  history.back();
}

function reason(){
  var num = $('#report_number_of_pig_deaths').val();
  //alert(num);
  $( "#reasons" ).empty();
  var j=2;
  for (i = 0; i < num-1; i++) {
  var c = "Cause of Death for Pig" + j;
   var data = {
      'foo': 'Belly Rupture',
      'foo2': 'Scrotal Rupture',
      'foo3': 'Lame/BadLeg',
      'foo4': 'Humpback',
      'foo5': 'Strep',
      'foo6': 'Greasy pig',
      'foo7': 'Tail Bite',
      'foo8': 'Prolapse',
      'foo9': 'Abcess',
      'foo10': 'Hematoma Ear',
      'foo11': 'Euthanized'
    }
    var s = $('<br>'+ c + '</br><select />');
    var d = "";
    for(var val in data) {   
      d +=  $('<option />', {value: val, text: data[val]}).appendTo(s);
    }
    s.appendTo('#reasons');
    $('select').selectmenu();
    $('[type="text"]').textinput();    
    j= j+1;
  }
};
function treat(){
  var a = $('#report_number_of_pigs_treated').val();
  //alert(a);
  $( "#medicine" ).empty();
  $( "#dosage" ).empty();
  $( "#adminis" ).empty();
  var j=2;
  for (i = 0; i < a-1; i++) {
  var m1 = "Name of medicine given for pig" + j;
  var m2 = $('<p>'+ m1 + '</p><input type="text" /><br></br>');
  m2.appendTo('#medicine');
  $('[type="text"]').textinput(); 
  j= j+1;
  }
}
function demo5(){
   $( "#dosage" ).empty();
  var j=2;
  var a = $('#report_number_of_pigs_treated').val();
  for (i = 0; i < a-1; i++) {
  var d1 = "Dosage Amount for pig" + j;
  var d2 = $('<p>'+ d1 + '</p><input type="text" /><br></br>');
  d2.appendTo('#dosage');
  $('[type="text"]').textinput();
  j= j+1;
  }
  $('#index').trigger('create');
}
function demo6(){
  $( "#adminis" ).empty();
  var j=2;
  var a = $('#report_number_of_pigs_treated').val();
  //alert(a);
  for (i = 0; i < a-1; i++) {
    var h1 ="How Adminstered for Pig" + j;
    var h2 = $('<p>'+ h1 + '</p><input type="text" /><br></br>');
    h2.appendTo('#adminis');
    $('[type="text"]').textinput();
    j= j+1;
  }
}

// shipments
$(function() {    

  var token = window.localStorage.getItem('login_token');

  $('#new_shipment').on("submit", function(){        
      var shipment_date = $('#shipment_date').val();
      var shipid =  window.localStorage.getItem('shipid');
      var total_pigs = $('#total_pigs').val();
      var total_doa = $('#shipment_dead_on_arrival').val();
      var pig_supplier = $('#pig_supplier').val();
      alert(shipment_date + shipid + total_pigs + total_doa + pig_supplier);
       var bookData = {
                 "barn_id": 0,
                 "shipment_date": "32334833425543",
                 "total_pigs": 0,
                 "total_doa":0,
                 "pig_supplier":"test"

             };
      $.ajax({
      type: "POST",
      url: 'http://farmcentral.softimum.com/shipments.json?user_credentials='+token,
      //url: 'test.json',
      //data: "{'barn_id':"+ shipid +",'shipment_date':" + shipment_date + "}",
      //data: $(this).serialize(),
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      dataType: "jsonp",
      data: "{'barn_id':" + shipid + ",'shipment_date':'" + shipment_date + "','total_pigs':" + total_pigs + ",'total_doa':" + total_doa + ",'pig_supplier':'" + pig_supplier + "'}",
     // data:bookData,
      cache: false,
      success: function(data) {        
        alert(JSON.stringify(data));
        alert("Shipment created successfully");
        $('#new_shipment')[0].reset();
        window.localStorage.removeItem('shipid');
        //return false
      },
      error: function(data,status){
        alert(JSON.stringify(data));
        alert(status);
      },

      complete: function(data){
          // alert('completed')
      },

      denied: function(data){
            alert('Access denied')
      }
    });
     // e.preventDefault();
     // return false    
  });


  $('#new_report').on("submit", function(){        
      $.ajax({
      type: "POST",
      url: 'http://farms.herokuapp.com/reports.json?user_credentials='+token,
      data: $(this).serialize(),
      dataType: "json",
      cache: false,
      success: function(data) {        
        $('#new_report')[0].reset()
        alert("Inventory created successfully")
        return false
      },
      error: function(data,status){
        alert('Require valid data. Please try again!')
      },

      complete: function(data){
          // alert('completed')
      },

      denied: function(data){
            alert('Access denied')
      }
    });
      e.preventDefault();
      return false  
  });
});
function db(){
  var role = window.localStorage.getItem('role');
  if(role == "SiteManager"){
    window.location="main_dashboard.html#demo-page2"
  }
  else if(role == "HogOwner"){
    window.location ="main_dashboard.html"  
  }
  else if(role == "BarnManager"){
    window.location ="main_dashboard.html#demo-page4"  
  }
}
function ship(){
  var shipid =  window.localStorage.getItem('shipid');
  alert(shipid);
}
