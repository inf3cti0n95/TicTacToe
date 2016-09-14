<?php

	$conn = mysqli_connect($dbhost, $dbuser, $dbpass, "tictoe");
   
   	if(! $conn ) {
      die('Could not connect: ' . mysqli_error());
   	}

?>
