<?php
$data = file_get_contents("php://input");
$data = json_decode($data);
$customerData = json_decode($data->message->reply_to_message->text);
$fileName = str_replace(" ", "_",$customerData->name);
$msg = [
    "customer" => $customerData->text,
     "Kornit" => $data->message->text,
     "date" => $data->message->reply_to_message->date,
     "message_thread_id" => $data->message->reply_to_message->message_id,
     "status" => "new"
];

file_put_contents("chat.log", print_r($data,true),FILE_APPEND);
file_put_contents("chatdata.log", print_r($customerData,true),FILE_APPEND);

if(file_exists("omer_avhar.json")){
$file = (array)json_decode(file_get_contents($fileName.".json"));
$file[] = $msg;
$msg = $file;
file_put_contents($fileName.".json",json_encode($msg));
}else{
    $arr =[];
    $arr[] = $msg;
    file_put_contents($fileName.".json",json_encode($arr));
}






