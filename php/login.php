<?php

   if(isset($_REQUEST['login'])){
      session_start();
      if(isset($_SESSION["login"]))
      {
         $resp['unm']=$_SESSION["unm"];
         $resp['uid']=$_SESSION["uid"];
         $resp['nm']=$_SESSION["nm"];
         $resp['resp']= true;
      }
      else{
         $resp['resp']= false;
      }
   }
   else{
      $unm=$_REQUEST['unm'];
      $pwd=$_REQUEST['pwd'];
      $dbhost = 'localhost';
      $dbuser = 'root';
      $dbpass = '';
      
      include_once("connect_db.php");
      $query="SELECT * FROM user";

      $ret=mysqli_query($conn,$query);

      while($row = mysqli_fetch_assoc($ret)){
         if($row['user_unm']=="$unm" && $row['user_pwd']=="$pwd"){
            $uid = $row['user_id'];
            $nm = $row['user_nm'];
            $flag = true;
            break;
         }
         else{
            $flag = false;
         }
      }

      $resp = array('resp' => $flag);
      if($flag){
         $resp['unm']=$unm;
         $resp['uid']=$uid;
         $resp['nm']=$nm;
         session_start();
         $_SESSION["login"] = true;
         $_SESSION["nm"] = $nm;
         $_SESSION["unm"] = $unm;
         $_SESSION["uid"] = $uid;
      }
   }
   echo json_encode($resp);	
?>