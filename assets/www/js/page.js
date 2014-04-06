//index.html
$(document).ready(function(){
        var toppos=($(window).height()/3.5) - ($("#alertdiv").height()/3.5);
        var leftpos=($(window).width()/2) - ($("#alertdiv").width()/2);
        $("#alertdiv").css("top", toppos).css("left",leftpos);
        // setTimeout("ind()",100);
        //SearchText();
     var token = window.localStorage.getItem('login_token');
});
//home.html





function user_logout() {
        window.localStorage.removeItem('login_token');
        window.localStorage.removeItem('location');

        window.localStorage.removeItem('id');
        window.localStorage.removeItem('role');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('first_name');
        window.localStorage.removeItem('last_name');
        window.localStorage.removeItem('farm');
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('barn_id');
        window.location ='index.html'
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
    // if($('#death').val()=="Yes"){
    //      window.location ='#demo-page2'
    //      }
    // 
    //else{
    //     window.location ='#demo-page3'
    //     }      
}
function check_treat(){
  if($('#radio-choiceb-1').is(':checked')) { 
    //alert();
    window.location ='#demo-page4'
   }
   else{
        window.location ='#demo-page7'
        }    
//     if($('#treatment').val()=="Yes")
//         window.location ='#demo-page4'
//     else
//        window.location ='#demo-page7' 
//        //location.reload();
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
/*function reason(){

  var num = $('#report_number_of_pig_deaths').val();
  //alert(num);
  $( "#reasons" ).empty();
  var j=2;
  for (i = 0; i < num-1; i++) {
  var a = $('#cause').clone();
  var b = a;
  //var  = $('<br>'+ j + '</br>' + a);

  b.appendTo('#reasons');
  //$("#main" ) ("<label for='report_death' id='causeof' class='select'>Cause Of Death for Pig "+j" </label></br>")
  $('#causeof').text("Cause Of Death for Pig " + j);
  j= j+1;
  }
};*/
function reason(){
  var num = $('#report_number_of_pig_deaths').val();
  //alert(num);
  $( "#reasons" ).empty();
  var j=2;
  for (i = 0; i < num-1; i++) {
  //$('#cause').clone().appendTo('#reasons');
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
/*function treat(){
   var a = $('#report_number_of_pigs_treated').val();
  //alert(a);
  $( "#medicine" ).empty();
  var j=2;
  for (i = 0; i < a-1; i++) {
    //$('#details').text("Details of Pig" + j);
    $('#pig').clone().appendTo('#medicine');
    j= j+1;
  }
}*/
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
  //$('#treat_list').listview().listview('refresh');  
  //$("#medicine").trigger('create');
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
  //$('#dosage_list').listview().listview('refresh');  
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
    //$('#admins_list').listview().listview('refresh');  
    j= j+1;
  }
}

/*function SearchText() {
$("#report_name_of_product_given").autocomplete({
source: function(request, response) {
$.ajax({
type: "POST",
contentType: "application/json; charset=utf-8",
url: "Default.aspx/GetAutoCompleteData",
data: "{'username':'" + extractLast(request.term) + "'}",
dataType: "json",
success: function(data) {
response(data.d);
},
error: function(result) {
alert("Error");
}
});
},
focus: function() {
// prevent value inserted on focus
return false;
},
select: function(event, ui) {
var terms = split(this.value);
// remove the current input
terms.pop();
// add the selected item
terms.push(ui.item.value);
// add placeholder to get the comma-and-space at the end
terms.push("");
this.value = terms.join(", ");
return false;
}
});
$("#report_name_of_product_given").bind("keydown", function(event) {
if (event.keyCode === $.ui.keyCode.TAB &&
$(this).data("autocomplete").menu.active) {
event.preventDefault();
}
})
function split(val) {
return val.split(/,\s*//*);*/
/*}
function extractLast(term) {
return split(term).pop();
}
}*/
//order.html


// shipments
$(function() {    

  var token = window.localStorage.getItem('login_token');

  $('#new_shipment').on("submit", function(){        
      $.ajax({
      type: "POST",
      url: 'http://farms.herokuapp.com/shipments.json?user_credentials='+token,
      data: $(this).serialize(),
      dataType: "json",
      cache: false,
      success: function(data) {        
        $('#new_shipment')[0].reset()
        alert("Shipment created successfully")
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
  else{
    window.location ="main_dashboard.html"  
  }
}
