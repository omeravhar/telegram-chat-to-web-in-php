


$("body").append(`<button class='chatbox-open'>
    <i class='fa fa-comment fa-2x' aria-hidden='true'></i>
</button>
<button class='chatbox-close'>
    <i class='fa fa-close fa-2x' aria-hidden='true'></i>
</button>
<section class='chatbox-popup'>
    <header class='chatbox-popup__header'>
        <aside style='flex:3;'>
            <i class='fa fa-user-circle fa-4x chatbox-popup__avatar' aria-hidden='true'></i>
        </aside>
        <aside style='flex:8;'>
            <h1>Kornit help center</h1> Agent (Online)
        </aside><aside style='flex:1;'>
        <button class='chatbox-maximize'>
            <i class='fa fa-window-maximize' aria-hidden='true'></i>
        </button>
        </aside>
    </header>
   <main class='chatbox-popup__main'>
    <textarea id='chatFull'  placeholder='Send a message and one of our admins will connect shortly.' autofocus></textarea>
</main>
<footer class='chatbox-popup__footer'>
        <aside style='flex:1;color:#888;text-align:center;'>
            <i class='fa fa-camera' aria-hidden='true'></i>
        </aside><aside style='flex:10;'>
        <textarea class='chatText'  placeholder='Type your message here...' autofocus></textarea>
        </aside>
    <aside style='flex:1;color:#888;text-align:center;'>
            <button type='submit' id='submitChat'  class='btn'>Send</button>
        </aside>
    </footer>
</section>`);




$(".chatText").keyup(function(event) {
     
        if (event.which === 13) {
            $("#submitChat").click();
        }
});

$("#submitChat").on("click",function(){
        
        let text = $(".chatText").val();
//        $(".chatText").val("");
        //    text = text.trim();
        if(text.trim() == "")return ;
        //get customer name
        let customerName = $('.user-details-wrap').find('.icon-text').text() || "no name";
        //concatenated name and text for server
        let textForServer = JSON.stringify({name:customerName,text:text});
            $.ajax({
                type: "POST",
                url: "https://api.telegram.org/bot5831846648:AAHm0aQHMlDgB8C8pF5b6YbGbYD_2E3SJWE/sendMessage?chat_id=-1002021331671",
                data: {text:textForServer},

                success: function(resultData){
                    if (typeof getResponseInterval === 'undefined') { 
                        getResponseInterval = setInterval(()=>getServerResponse(customerName), 3000);
                    }
                }
              });


              //save text + history in localstorage
              let textHistory = localStorage.getItem("chat");

              textHistory = localStorage.getItem("chat") ? textHistory : "";
              textHistory = textHistory ? textHistory + "\n" + "you:"+text : "you:"+text;

              $("#chatFull").text(textHistory);
              $('#chatFull').animate({ scrollTop: 9999999 }, 'slow');
              localStorage.setItem("chat",textHistory); 
              $(".chatText").val("");

    });

function getServerResponse(customerName){
    
    $.ajax({
      type: "POST",
      url: "https://dev.kornit.com/telegram/server.php",
      data: JSON.stringify({custName:customerName}),
      
      success: function(resultData){
          
        let textHistory = localStorage.getItem("chat"); 
        textHistory = localStorage.getItem("chat") ? textHistory : "";
        let textFromResultData = resultData ? resultData : "" ;
       
        textHistory = textFromResultData ? textHistory + "\n" + textFromResultData : textHistory;
        localStorage.setItem("chat",textHistory);
        $("#chatFull").val(textHistory);
        $('#chatFull').animate({ scrollTop: 9999999 }, 'slow');
      }
    });
}
        
  




        
 
$(".chatbox-open").on("click",function(){ 
    $(".chatbox-popup, .chatbox-close").fadeIn()
    });
    
$(".chatbox-close").click(() =>{
    $(".chatbox-popup, .chatbox-close").fadeOut();
    clearInterval(getResponseInterval);       
    });    
  
//$(".chatbox-maximize").click(() => {
//    $(".chatbox-popup, .chatbox-open, .chatbox-close").fadeOut();
//    $(".chatbox-panel").fadeIn();
//    $(".chatbox-panel").css({ display: "flex" });
//  });  
  
$(".chatbox-minimize").click(() => {
    $(".chatbox-panel").fadeOut();
    $(".chatbox-popup, .chatbox-open, .chatbox-close").fadeIn();
  });
  
$(".chatbox-panel-close").click(() => {
    $(".chatbox-panel").fadeOut();
    $(".chatbox-open").fadeIn();
  });
  
  
  
  
  


  

