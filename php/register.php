<?php

   	$nm=$_REQUEST['nm'];
   	$unm=$_REQUEST['unm'];
   	$pwd=$_REQUEST['pwd'];


    $dbhost = 'localhost';
    $dbuser = 'root';
   	$dbpass = '';

    include_once('connect_db.php');

    $query = "SELECT user_unm from user";
    $all_user_nm =  mysqli_query($conn,$query);

    $i=0;
    while($row = mysqli_fetch_row($all_user_nm)){
      if($unm==$row[0])
        ++$i;
    }

    if($i==0){
     	$query = "INSERT INTO `user`(`user_nm`, `user_unm`, `user_pwd`) VALUES ('$nm','$unm','$pwd')";
     	$ret=mysqli_query($conn,$query);
     	if(!$ret){
     		die('Please try again: ' . mysql_error());
     	}
      else{
  		$resp = array('resp' => "success" );
      }
    }  
    else{
      $resp = array('resp' => "user_exist" );
    }
    echo json_encode($resp);
?>