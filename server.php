<?php
$data = file_get_contents("php://input");
$data = json_decode($data);
//file_put_contents("chat.log", print_r($data->custName,true),FILE_APPEND);
$customerName = str_replace(" ", "_", $data->custName);
//echo $customerName.".json";
if(file_exists($customerName.".json")){
    $chatData = json_decode(file_get_contents($customerName.".json"));
    $textToSendBack = [] ; 
    $textToRestore = [];
    foreach ($chatData as $chat){
        if($chat->status == "new"){
            $textToSendBack[] = $chat->Kornit;
            $chat->status = "old";
            $textToRestore[] = $chat;
        }
    }
    $textToRestore = isset($textToRestore) && !empty($textToRestore) ? json_encode($textToRestore) : file_get_contents($customerName.".json");
    file_put_contents($customerName.".json", $textToRestore);
 
    if(isset($textToSendBack) && !empty($textToSendBack)){
        print_r(json_encode($textToSendBack));
    }
    
 
}else{
    echo "waiting for representative";
}