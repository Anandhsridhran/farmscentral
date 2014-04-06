$(document).ready(function(){
    
    //$('body').append('<img id="loader" src="images/loading-old.gif" style="position: fixed;  margin: 20% 10%;">');
    
     var token = window.localStorage.getItem('login_token');
     var role = window.localStorage.getItem('role');
     var first = window.localStorage.getItem('first_name');
     var last =  window.localStorage.getItem('last_name');
     var user = first +" "+ last ;
     //alert("farms");
      if(role =="SiteManager"){
        var farm = window.localStorage.getItem('farm');
  
    
   
      $.ajax({
        type: "GET",
        url: 'http://farmcentral.softimum.com/farms/'+farm+'/locations.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {        
         /*alert(data.system_status);
         var status = data.system_status;
         if(status == "OK"){
          list  = []
          $.each(data, function(x, v) {
            list.push("<li><a href='#' data-transition='slide' data-id="+v.location_id+" data-location="+v.name+"><img src='../images/logo.png'>"+v.name+"</a></li>")
              //list.push("<div data-role='collapsible' class='location_list' data-id="+v.location_id+" data-collapsed='true' data-theme='a'><h3>"+v.name+"</h3>")
          });        
          }
          else{
          list  = []
          $.each(data, function(x, v) {
            list.push("<li><a href='#' data-transition='slide' data-id="+v.location_id+" data-location="+v.name+"><img src='../images/mobile-logo.png'>"+v.name+"</a></li>")
              //list.push("<div data-role='collapsible' class='location_list' data-id="+v.location_id+" data-collapsed='true' data-theme='a'><h3>"+v.name+"</h3>")
          });   
          }*/
          list  = []
          $.each(data, function(x, v) {
            list.push("<li><a href='#' data-transition='slide' data-id="+v.location_id+" data-location="+v.name+">"+v.name+"</a></li>")
              //list.push("<div data-role='collapsible' class='location_list' data-id="+v.location_id+" data-collapsed='true' data-theme='a'><h3>"+v.name+"</h3>")
          });  
          $('#locations_list').append(list);         
           window.location ="#demo-page2";
          get_barns();
          //$('[data-role=collapsible-set]').collapsibleset().trigger('create');

          $('#locations_list').listview('refresh');
          $('#db_hog2').text(user);
          return false;
        },
        error: function(data,status){
          alert('Error in connection. Check your internet')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
}
      else{
    $.ajax({
      type: "GET",
      url: 'http://farmcentral.softimum.com/farms.json?user_credentials='+token,
      dataType: "json",
      cache: false,
      success: function(data) {

        console.log(data)
        list  = []
        $.each(data, function(x, v) {
          //alert(v.farm_id);
            list.push("<li><a href='#' data-transition='slide' data-id="+v.farm_id+" data-name="+v.name+">"+v.name+"</a></li>")
        });        
        $('#admin_farms').append(list);
        $('#admin_farms').listview('refresh');
        $('#db_hog1').text(user);
        get_locations();
         get_barns();
        return false;
      },
      error: function(data,status){
        alert('Error in connection. Check your internet')
        
      },

      complete: function(data){
        // alert('completed')
        
      },

      denied: function(data){
        alert('Access denied')
       
      }

    });
    }   
  // GET Sites
 
function get_locations(){
 
  $("#admin_farms li a").on('click', function(){ 
   var token = window.localStorage.getItem('login_token');
  var first = window.localStorage.getItem('first_name');
     var last =  window.localStorage.getItem('last_name');
     var user = first +" "+ last ;     
     //$('#locations_list').empty();  
     $('#locations_list li:not(:first)').remove();   
     var id = $(this).data('id');
     var name = $(this).data('name');
    
    var farms = $(this).data('farms');
    //alert(farms);
      $.ajax({
        type: "GET",
        url: 'http://farmcentral.softimum.com/farms/'+id+'/locations.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {        
          //console.log(data);
          //alert("got locations");
         
          list  = []
          $.each(data, function(x, v) {
            list.push("<li><a href='#' data-transition='slide' data-id="+v.location_id+" data-location="+v.name+">"+v.name+"</a></li>")
              //list.push("<div data-role='collapsible' class='location_list' data-id="+v.location_id+" data-collapsed='true' data-theme='a'><h3>"+v.name+"</h3>")
          });        
          $('#locations_list').append(list);         
           window.location ="#demo-page2";
          $('#db_hog2').text(user);
          $('#db_farm1').text(name);
          
          //$('[data-role=collapsible-set]').collapsibleset().trigger('create');
          get_barns();
          $('#locations_list').listview('refresh');
          
          return false;
        },
        error: function(data,status){
          alert('Error in connection. Check your internet')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
   });
}

function get_barns(){

 
  $("#locations_list li a").on('click', function(){   
     var token = window.localStorage.getItem('login_token');
     var first = window.localStorage.getItem('first_name');
     var last =  window.localStorage.getItem('last_name');
     var user = first +" "+ last ;
    //alert("barns");

      //$("#barns_list").empty();
      $('#barns_list li:not(:first)').remove();   
        var $this = $(this),
        id = $(this).data('id');
        var name = $(this).data('location');
        
      $.ajax({
        type: "GET",
        url: 'http://farmcentral.softimum.com/locations/'+id+'/barns.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {                            
          list  = []
          $.each(data, function(x, v) {
              list.push("<li><a href='#'data-transition='slide' data-id="+v.barn_id+">"+v.name+"</a></li>")
          });        
          //$this.append("<ul data-role='listview' id='last_readings'>"+list+"</ul>");          
          //$('[data-role=collapsible]').collapsibleset().trigger('create');
           $('#barns_list').append(list);         
          window.location ="#demo-page3";
           get_reading();
          $('#db_hog3').text(user);
          $('#db_location').text(name);
          $('#barns_list').listview('refresh');
         
          return false;
        },
        error: function(data,status){
          alert('Error in connection. Check your internet')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
   });
}
  function get_reading(){
    
    $("#barns_list li a").on('click', function(){        
    var token = window.localStorage.getItem('login_token');
    var first = window.localStorage.getItem('first_name');
     var last =  window.localStorage.getItem('last_name');
     var user = first +" "+ last ;
    var id = $(this).data('id');
    
    
      $.ajax({
        type: "GET",
        url: 'http://farmcentral.softimum.com/barns/'+id+'/last_reading.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {        
          console.log(data)
         $('#humidity').text(data.humidity+'%');
         $('#high_temp').text(data.temperatures[0].value+'F');
         $('#low_temp').text(data.temperatures[1].value)+'F';
         $('#air').text(data.air_quality);
         $('#water').text(data.water_total+"ltrs");
         $('#db_barn').text(data.barn_name);
          $('#db_hog4').text(user);
          window.location ="#demo-page4";
         
          return false;
        },
        error: function(data,status){
          alert('Error in connection. Check your internet')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
   });
  }
});

