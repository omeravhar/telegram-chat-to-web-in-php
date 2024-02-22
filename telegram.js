

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

var getResponseInterval;

$("#submitChat").on("click",function(){
    //get text value
    let text = $("#chatText").val();
//    text = text.trim();
    if(text.trim() == "")return ;
    //get customer name
    let customerName = "omer avhar";
    //concatenated name and text for server
    let textForServer = JSON.stringify({name:customerName,text:text});
    console.log(textForServer);
    //send text
    $.ajax({
      type: "POST",
//      url: "chatServer.php",
      url: "https://api.telegram.org/bot5831846648:AAHm0aQHMlDgB8C8pF5b6YbGbYD_2E3SJWE/sendMessage?chat_id=-1002021331671",
      data: {text:textForServer},
      
      success: function(resultData){
          if (!getResponseInterval) { 
              getResponseInterval = setInterval(()=>getServerResponse(customerName), 3000);
          }
      }
    });
    
    
    //save text + history in localstorage
    let textHistory = localStorage.getItem("chat");
    
    textHistory = localStorage.getItem("chat") ? textHistory : "";
    textHistory = textHistory ? textHistory + "\n" + "you:"+text : "you:"+text;
    
    $("#chatFull").val(textHistory);
     
    localStorage.setItem("chat",textHistory); 
    $("#chatText").val("");
    
});


function getServerResponse(customerName){
    $.ajax({
      type: "POST",
      url: "server.php",
      data: JSON.stringify({custName:customerName}),
      
      success: function(resultData){
        let textHistory = localStorage.getItem("chat"); 
        textHistory = localStorage.getItem("chat") ? textHistory : "";
//        console.log(textHistory);
//        alert(textHistory);
//          /textHistory = textHistory ? textHistory + "\n" + "kornit:"+text : "you:"+text;
      }
    });
} 