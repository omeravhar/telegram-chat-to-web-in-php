<?php
$data = file_get_contents("php://input");
$data = json_decode($data);
$fileName = str_replace(" ", "_",$data->name);
str_re
$data->time = time();
file_put_contents($fileName.".log", print_r($data,true),FILE_APPEND);
file_put_contents($fileName.".log", print_r($data->message->reply_to_message->text,true),FILE_APPEND);

