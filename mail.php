<?php
	$dbs=3;
	ini_set('display_errors', 1);
	error_reporting(E_ALL);
	header("Content-Type: application/json; charset=UTF-8");
	$js_string=$_POST["x"];
	$type=$_POST["y"];
	if  ($dbs==1) {
		$host='mysql57.websupport.sk';
		$user='chessdb';
		$heslo='ndranghetta';
		$db='chessdb';
		$port=3311;
	}
	if  ($dbs==2) {
		$host='localhost';
		$user='chess1';
		$heslo='localhost111';
		$db='chessdb';
		$port=3306;
	}
if  ($dbs==3) {
		$host='chessrehab.co6zh5t0vver.eu-central-1.rds.amazonaws.com';
		$user='chessdb';
		$heslo='ndranghetta';
		$db='chessdb';
		$port=3306;
	}

	switch ($type) {

		case "0":
			$obj = json_decode($js_string, false);
			$userid= $obj->uid;
			$username=$obj->uname;
			$email= $obj->email;
		
			
			$selector = bin2hex(random_bytes(8));
			$token = random_bytes(32);
			$urlToEmail = 'https://chess.rehab/chessboard.htm?'.http_build_query(['slctr' => $selector,'vldtr' => bin2hex($token)]); 
		
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			$headers .= "From: <panda@chess.rehab>" . "\r\n";
			
			$subject = "Password reset";
			
			$message="<html><body>Dear ".$username."!<p> To reset your password please click on <p><a href='". $urlToEmail."'>password reset</a> <p> Yours truly <p> Panda (from chess.rehab) </body></html>";
			
		
			$success=mail($email, $subject, $message, $headers);

			$token = hash('sha256', $token);

			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="INSERT INTO tokens(userid, selector,token) VALUES (".$userid.",'".$selector."','".$token."')";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
			echo "OK";
			break;
		case "1":
		    $obj = json_decode($js_string, false);
			$selector= $obj->sel;
			$validator=$obj->val;
			$validator2 = hash('sha256', hex2bin($validator));
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="select userid,token from tokens where selector='".$selector."'";
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			$row=mysqli_fetch_row($resultset);
			if ($row!==NULL) {
				if (hash_equals($validator2, $row[1])) {
					$dotaz2="select iduser,name,password,email from user where iduser='".$row[0]."'";
					$resultset2=mysqli_query($conx, $dotaz2) or die('DB Query error on select');
					if (mysqli_num_rows($resultset2) > 0) {
						$row2=mysqli_fetch_row($resultset2);
						$myArray[] = $row2;
						echo json_encode($myArray);
					} else {
						echo "nula";
					}
				} else {
					echo "nula";
				}	
			} else {
				echo "nula";
			}
			
			break;
			
			
		
	}

?>