<?php

?>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="chat.css">
</head>
<body>
<button class="open-button" onclick="openForm()">Chat</button>
<div class="chat-popup" id="myForm">
    <div class="form-container">
    <h1>Chat</h1>
<textarea id="chatFull"></textarea>
    <label for="msg"><b>Message</b></label>
    <textarea id="chatText" placeholder="Type message.." name="msg" required></textarea>

    <button type="submit" id="submitChat"  class="btn">Send</button>
    <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
  </div>
</div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"  crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="telegram.js" type="text/javascript"></script>
</html>