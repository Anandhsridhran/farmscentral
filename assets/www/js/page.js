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
  var secs = 20;
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
  var j=1;
  for (i = 0; i < num; i++) {
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
    var id = "caused"+j;
    var s = $('<br>'+ c + '</br><select id='+id+' />');
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
  var j=1;
  for (i = 0; i < a; i++) {
  var id = "inven_med"+j;
  var m1 = "Name of medicine given for pig" + j;
  var m2 = $('<p>'+ m1 + '</p><input type="text" id='+id+' /><br></br>');
  //alert(id);
  m2.appendTo('#medicine');
  $('[type="text"]').textinput(); 
  j= j+1;
  }
}
function demo5(){
   $( "#dosage" ).empty();
  var j=1;
  // var name = $('#inven_med1').val();
  // alert(name);
  var a = $('#report_number_of_pigs_treated').val();
  for (i = 0; i < a; i++) {
  var id = "inven_dos"+j;  
  var d1 = "Dosage Amount for pig" + j;
  var d2 = $('<p>'+ d1 + '</p><input type="text" id='+id+' /><br></br>');
  d2.appendTo('#dosage');
  $('[type="text"]').textinput();
  j= j+1;
  }
  $('#index').trigger('create');
}
function demo6(){
  $( "#adminis" ).empty();
  var j=1;
  var a = $('#report_number_of_pigs_treated').val();
  for (i = 0; i < a; i++) {
    var id = "inven_adm"+j;  
    var h1 ="How Adminstered for Pig" + j;
    var h2 = $('<p>'+ h1 + '</p><input type="text" id='+id+' /><br></br>');
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
      //alert(shipment_date + shipid + total_pigs + total_doa + pig_supplier);
       var bookData = {
                 "barn_id": shipid,
                 "shipment_date": shipment_date,
                 "total_pigs": total_pigs,
                 "total_doa":total_doa,
                 "pig_supplier":pig_supplier

             };
      $.ajax({
      type: "POST",
      url: 'http://nano.amfnano.com/shipments.json?user_credentials='+token,
      crossDomain: true,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(bookData),
      dataType: "json",
      cache: false,
      success: function(data) {        
        //alert(JSON.stringify(data));
        alert("Shipment created successfully");
        window.localStorage.removeItem('shipid');
        db();
        $('#new_shipment')[0].reset();
        return false
      },
      error: function(data,status){
        //alert(JSON.stringify(data));
        alert(status);
      },

      complete: function(data){
          // alert('completed')
      },

      denied: function(data){
            alert('Access denied')
      }
    });   
  });


  $('#new_report').on("submit", function(){        
      var shipid =  parseInt(window.localStorage.getItem('shipid'));
      var report_date = $('#report_date').val();
      var total_pig_deaths = $('#report_number_of_pig_deaths').val();
      var td = total_pig_deaths;
      var pig_deaths_attributes = [];
      var n =1;
      for (i = 0; i < td; i++) {
        var idtd = "caused"+n;
        pig_deaths_attributes.push('{cause:"'+idtd+'",count:'+td+'}');
        n = n+1;
      }
      // var cause_of_death = $('#report_death_reason').val();
      var total_pigs_treated = $('#report_number_of_pigs_treated').val();
      // var medicine_given = $('#report_name_of_product_given').val();
      // var dosage = $('#report_amount_given').val();
      // var how_administered = $('#report_route_of_admin').val();
      var user_initials = $('#report_initials').val();
      var b = total_pigs_treated;
      var c = 1;
      var pigt = "";
      var pig_treatments = [];
      for (i = 0; i < b; i++) {
        var medic= "inven_med"+c;
        var inven_medic =$("#"+medic).val();
        var inven_dosage =$("#inven_dos"+c).val(); 
        var inven_admin =$("#inven_adm"+c).val();
        // pigt += {"medicine_given":inven_medic, "count": c, "dosage": inven_dosage , "how_administered":inven_admin };
         pig_treatments.push('{"medicine_given":"'+inven_medic+'",count:'+c+',dosage:"'+inven_dosage+'",how_administered:"'+inven_admin+'"}');
        c = c + 1;
        //alert(inven_medic);
      }
      
      // var pig_treatments1 = JSON.stringify(pig_treatments);
      // alert(pig_treatments);
      // alert(pig_treatments1);
      var bookData = {
                 "barn_id": shipid,
                 "report_date": report_date,
                 "user_initials":user_initials,
                 // "total_pig_deaths": total_pig_deaths,
                 // "cause_of_death":cause_of_death,
                 "pig_deaths_attributes":pig_deaths_attributes,
                 "total_pigs_treated":total_pigs_treated,
                 // "medicine_given":medicine_given,
                 // "dosage":dosage,
                 // "how_administered":how_administered,
                 "pig_treatments" :pig_treatments
             };
       alert(JSON.stringify(bookData));    
       alert(bookData);
      $.ajax({
      type: "POST",
      url: 'http://farmcentral.softimum.com/inventory_reports.json?user_credentials=RRFy8ulfERw5wCjtwit',
      crossDomain: true,
      contentType: "application/json; charset=utf-8",
      // data: JSON.stringify(bookData),
      data: bookData, 
      dataType: "json",
      cache: false,
      success: function(data) {  
        alert(JSON.stringify(data));      
        window.localStorage.removeItem('shipid');
        alert("Inventory created successfully");
        db();
        $('#new_report')[0].reset();
        return false
      },
      error: function(data,status){
        alert(JSON.stringify(data)); 
      },

      complete: function(data){
          // alert(JSON.stringify(data));  
          // alert('completed')
      },

      denied: function(data){
            alert('Access denied')
      }
    });
      // e.preventDefault();
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
  var token = window.localStorage.getItem('login_token');
  var shipid =  window.localStorage.getItem('shipid');
  window.location ='shipments.html';
  // alert(shipid);
  //   $.ajax({
  //       type: "GET",
  //       url: 'http://farmcentral.softimum.com/barns/'+shipid+'/last_shipment.json?user_credentials='+token,
  //       crossDomain: true,
  //       success: function(data) {        
  //         alert(JSON.stringify(data));
  //         window.location ='shipments.html'
  //       },
  //       error: function(data,status){
  //         alert(JSON.stringify(data));
  //         alert(JSON.stringify(status));
  //         window.location ='shipments.html'
  //       },

  //       complete: function(data){
  //         // alert('completed')
  //       },

  //       denied: function(data){
  //         alert('Access denied');
  //       }
  //     });
    
}
function inven(){
  var token = window.localStorage.getItem('login_token');
  var shipid =  window.localStorage.getItem('shipid');
  window.location ='inventory.html';
  // alert(shipid);
  // $.ajax({
  //       type: "GET",
  //       url: 'http://farmcentral.softimum.com/barns/'+shipid+'/last_inventory_report.json?user_credentials='+token,
  //       crossDomain: true,
  //       success: function(data) {        
         
  //         alert(JSON.stringify(data));
          
  //         window.location ='inventory.html'

          
  //       },
  //       error: function(data,status){
  //         alert(JSON.stringify(data));
  //         window.location ='inventory.html'
  //       },

  //       complete: function(data){
  //         // alert('completed')
  //       },

  //       denied: function(data){
  //         alert('Access denied');
  //       }
  //     });
}
function deta(){
  window.location = 'details.html';
}