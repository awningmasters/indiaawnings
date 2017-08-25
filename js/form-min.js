$(".navbar-toggle").on("click",function(){$(this).toggleClass("active")});

// clevertap embed
// if(isApp){
//                 clvtid = "8R5-66Z-874Z";
//             }else{
//                 clvtid = "TEST-9R5-66Z-874Z";
//             }

var clvtid = "TEST-9R5-66Z-874Z";
var serverURL="https://app.pitchdeck.io/docs/";
if(window.location.href.indexOf("pitchdeck.io")>-1){
  clvtid = "8R5-66Z-874Z";
  serverURL= "https://app.pitchdeck.io/docs/";
}
if(window.location.href.indexOf("qcw")>-1){
  clvtid = "TEST-9R5-66Z-874Z";
  serverURL= "https://qc.pitchdeck.io/docs/";
}
var clevertap = {event:[], profile:[], account:[], onUserLogin:[], notifications:[]};
             clevertap.account.push({"id": clvtid});
             (function () {
                 var wzrk = document.createElement('script');
                 wzrk.type = 'text/javascript';
                 wzrk.async = true;
                 wzrk.src = ('https:' == document.location.protocol ? 'https://d2r1yp2w7bby2u.cloudfront.net' : 'http://static.clevertap.com') + '/js/a.js';
                 var s = document.getElementsByTagName('script')[0];
                 s.parentNode.insertBefore(wzrk, s);
              })();


// clevertap embed end

function contactForm(){
  $('.name-check').hide("slow");
  var name = $('#Name').val();
  var company = $('#Company').val();
  var email = $('#Email').val();
  var phone = $('#Phone').val();
  var msg = $('#Msg').val();
  if(name == ""){$('#Name').focus();$('#invalid-name').show();}
   else if(company == ""){$('#Company').focus();$('#invalid-company').show();}
   else if(!validateEmail(email)){$('#Email').focus();$('#invalid-email').show();}
   else if(phone == ""){$('#Phone').focus();$('#invalid-phone').show();}
   else if(msg == ""){$('#Msg').focus();$('#invalid-msg').show();}
   else
   {

        var DataJson =
        {
          "Name": name,"Company": company,"Email": email,"PhoneNo": phone,"Message": msg,
          "PresentationFor": $('#pitchType').val()
        };
        var file = $('#upload-ppt')[0].files[0];
        // $('#theFile')[0].files[0];
        var jsonValue = JSON.stringify(DataJson);
        var formData = new FormData();
        formData.append("message",jsonValue);
        formData.append("theFile",file);
      $.ajax(
        {
          url: serverURL+"/scheduleDemo.do",
          type: "POST",
          data: formData,
          async: false,
          success: function (data) {
            var result = JSON.parse(data);
            console.log(result);
            if(result.status == 0){
              clevertap.profile.push({"Site": {"Name": name, "Email": email }});
              clevertap.event.push("Form Submission",{"Name": name,"Email": email,"Message": msg,"PresentationFor": $('#pitchType').val(),"file": $('#upload-ppt')[0].files[0],})
              $('#services-form').hide("slow");
              $('#successMsg').show();
              $('.upload-ppt').css('height','auto');
            }
          },
          cache: false,
          contentType: false,
          processData: false
        }
      );
    }
function validateEmail (email){
  var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return expr.test(email);
}
}
$("#upload-ppt").change(function(){
  $("#fileName").text($(this).val());
});

function preSignUp(){
  $('.name-check').hide("slow");
  var name = $('#Name1').val();
  var email = $('#Email1').val();
  var msg= $('#Msg1').val();
  if(name == ""){$('#Name1').focus();$('#invalid-name').show();}
   else if(!validateEmail(email)){$('#Email1').focus();$('#invalid-email').show();}
   else if(msg == ""){$('#Msg1').focus();$('#invalid-msg').show();}
   else
   {
        var DataJson =
        {
          "Name": name,"Email": email,"Message": msg
        };
        var formData = new FormData();
        var jsonValue = JSON.stringify(DataJson);
        formData.append("message",jsonValue);

      $.ajax(
        {
          url: serverURL+"/scheduleDemo.do",
          type: "POST",
          data: formData,
          async: false,
          success: function (data) {
            var result = JSON.parse(data);
            console.log(result);
            if(result.status == 0){
              clevertap.profile.push({"Site": {"Name": name, "Email": email }});
              clevertap.event.push("Form Submission",{"Name": name,"Email": email,"Message": msg})
              $('#contact-form ').hide("slow");
              $('#successMsg').show();
              $('.upload-ppt').css('height','auto');
            }
          },
          cache: false,
          contentType: false,
          processData: false
        }
      );
    }
function validateEmail (email){
  var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return expr.test(email);
}
}
