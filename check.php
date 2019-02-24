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
		    /* checkin if the email exists while registration of a new user */
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="select email,iduser,name from user where email='".$js_string."'";
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			$row=mysqli_fetch_row($resultset);
			if ($row!==NULL) {
					$myArray[] = $row;
					echo json_encode($myArray);
			}
			else {
				echo "OK";
			}	
			break;
		case "1":
		    /* checkin if the username exists while registration of a new user */
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="select name from user where name='".$js_string."'";
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			$row=mysqli_fetch_row($resultset);
			if ($row!==NULL) {
				echo "TAKEN";
			}
			else {
				echo "OK";
			}	
			break;
		case "2":
		     /* create username  while registration of a new user */
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$pass= password_hash($obj->password,PASSWORD_DEFAULT);
			$email= $obj->email;
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="INSERT INTO `user` (`name`, `password`, `email`) VALUES ('".$log."', '".$pass."', '".$email."')";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
		
			echo "OK";
			break;
		case "3":
		    /* checking the login and password */  
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$pass= $obj->password;
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="select iduser,name,password,email from user where name='".$log."'";
			
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			
			if (mysqli_num_rows($resultset) > 0) {
				
				$row=mysqli_fetch_row($resultset);
				if (password_verify($pass , $row[2])) {
					$myArray[] = $row;
					echo json_encode($myArray);
					
				}
				else { 
					echo "nula";
				}	
			}
			else {
				echo "nula";
			}	
			break; 
		case "4":
		    /* getting all games list for a user */
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$id= $obj->id;
			
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
			
			
			$dotaz="SELECT game.idgame, user.name, game.black_user,'w' as color,game.move,game.init,";
			$dotaz.="showgame.visible, game.white_user, game.winner,game.active,game.winreason,game.status, game.turn,game.ts2,game.chatcol ";
			$dotaz.=" from game,showgame,user where game.black_user=user.iduser and game.white_user=".$id." and ";
			$dotaz.="(showgame.idgame=game.idgame and showgame.iduser=game.white_user) union (";
			$dotaz.="SELECT game.idgame, user.name, game.black_user,'b' as color, game.move,game.init, ";
			$dotaz.="showgame.visible, game.white_user,game.winner,game.active,game.winreason, game.status, game.turn, game.ts2, game.chatcol ";
			$dotaz.=" from game,showgame,user where game.white_user=user.iduser and game.black_user=".$id." and ";
			$dotaz.="(showgame.idgame=game.idgame and showgame.iduser=game.black_user)) order by ts2 desc,idgame desc";

			
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			if (mysqli_num_rows($resultset) > 0) {
				while($row = mysqli_fetch_array($resultset)) {
					$myArray[] = $row;
				}
				echo json_encode($myArray);
			}
			else {
				echo "nula";
			}	
			break;
			
		case "5":
		    /* getting active challenges  */
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$id= $obj->id;
			
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="SELECT challenge.idchallenge, user0.name, challenge.color, user0.iduser,challenge.private,challenge.idchallenged, user1.name as challenged FROM challenge, user as user0,user as user1 where challenge.idchallenger=user0.iduser and challenge.active=1 and user1.iduser=challenge.idchallenged order by challenge.private DESC,challenge.idchallenge";
		
			
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			if (mysqli_num_rows($resultset) > 0) {
				while($row = mysqli_fetch_array($resultset)) {
					$myArray[] = $row;
				}
				echo json_encode($myArray);
			}
			else {
				echo "nula";
			}	
			break;
			
			
			
		case "6":
		    /* accepting the challenge and creating a game */
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$id= $obj->id;
			$chaid= $obj->chid;
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="SELECT challenge.idchallenge, challenge.idchallenger, challenge.color FROM challenge  where challenge.active=1 and challenge.idchallenge=".$chaid;
		
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			if (mysqli_num_rows($resultset) > 0) {
				while($row = mysqli_fetch_array($resultset)) {
					if ($row[2]=="w") {
						$wu=$row[1];
						$bu=$id;
					}
					if ($row[2]=="b") {
						$bu=$row[1];
						$wu=$id;
					}
					if ($row[2]=="a") {
						$thr=rand(1,2);
						if ($thr==1) {
							$bu=$row[1];
							$wu=$id;
						}
						else {
							$wu=$row[1];
							$bu=$id;
						}
					}
				}
			    $dotaz="SELECT max(idgame) FROM game";
		        $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			    if (mysqli_num_rows($resultset) > 0) {
					$row = mysqli_fetch_array($resultset);
					$gid=$row[0]+1;
				}		
						
					
				$dotaz="INSERT INTO game(idgame,white_user, black_user, active, winner,init,move, turn) VALUES (".$gid.",".$wu.", ".$bu.",1,NULL,0,0,'w')";
				$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
				$dotaz="UPDATE challenge set active=0 WHERE idchallenge=".$chaid;
				$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on update');
				$dotaz="INSERT INTO showgame (iduser, idgame,visible) VALUES (".$bu.",".$gid.",1)";
				$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
				$dotaz="INSERT INTO showgame (iduser, idgame,visible) VALUES (".$wu.",".$gid.",1)";
				$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
				$responsex = '{"gameid":"'.$gid.'"}';
				$odp=json_decode($responsex);
				echo json_encode($odp);
			}
			else {
				echo "nula";
			}
			break;
		case "7":
		    /* inactivation of a challenge */
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$id= $obj->id;
			$chaid= $obj->chid;
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="UPDATE challenge set active=0 WHERE idchallenge=".$chaid;
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on update');
			echo "OK";
			break;
		case "8":
		    /* creating a challenge */
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$id= $obj->id;
			$colx=$obj->col1;
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="INSERT INTO challenge (idchallenger, color, active,private,idchallenged) VALUES (".$id.",'".$colx."',1,0,0)";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
			echo "OK";
			break;
		case "9":
		     /* displaying the game*/
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$id= $obj->id;
			$gid= $obj->gid;
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="UPDATE showgame set visible=1 WHERE (iduser=".$id." and  idgame=".$gid.")";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on update');
			echo "OK";
			break;
		case "10":
		    /* hiding the game board */
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$id= $obj->id;
			$gid= $obj->gid;
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="UPDATE showgame set visible=0 WHERE (iduser=".$id." and  idgame=".$gid.")";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
			echo "OK";
			break;
		
		case "11":
		    /* getting list of games and latest moveid*/
		    $obj = json_decode($js_string, false);
			$log= $obj->login;
			$id= $obj->id;
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="SELECT game.idgame, user.name, game.black_user, 'w' as color,game.move,game.init,";
			$dotaz.="showgame.visible, game.white_user, game.winner,game.active,game.winreason,game.status,game.turn ";
			$dotaz.=" from game,showgame,user where game.black_user=user.iduser and game.white_user=".$id." and ";
			$dotaz.="(showgame.idgame=game.idgame and showgame.iduser=game.white_user and showgame.visible=1) union (";
			$dotaz.="SELECT game.idgame, user.name, game.white_user, 'b' as color, game.move,game.init, ";
			$dotaz.="showgame.visible, game.black_user,game.winner,game.active,game.winreason, game.status,game.turn ";
			$dotaz.=" from game,showgame,user where game.white_user=user.iduser and game.black_user=".$id." and ";
			$dotaz.="(showgame.idgame=game.idgame and showgame.iduser=game.black_user and showgame.visible=1))";
			
			
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			if (mysqli_num_rows($resultset) > 0) {
				while($row = mysqli_fetch_array($resultset)) {
					$myArray[] = $row;
				}
				echo json_encode($myArray);
			}
			else {
				echo "nula";
			}	
			break;
			
		case "12":
		    /* showing 1 additional board*/
		    $obj = json_decode($js_string, false);
			$log= $obj->login;
			$id= $obj->id;
			$gid=$obj->gid;
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
			
			$dotaz="UPDATE showgame set visible=1 WHERE (iduser=".$id." and  idgame=".$gid.")";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on update');
		
			$dotaz="SELECT game.idgame, user.name, game.black_user, 'w' as color,game.move,game.init,";
			$dotaz.="showgame.visible, game.white_user, game.winner,game.active,game.winreason,game.status,game.turn ";
			$dotaz.=" from game,showgame,user where game.black_user=user.iduser and game.white_user=".$id." and game.idgame=".$gid." and ";
			$dotaz.="(showgame.idgame=game.idgame and showgame.iduser=game.white_user and showgame.visible=1) union (";
			$dotaz.="SELECT game.idgame, user.name, game.white_user, 'b' as color, game.move,game.init, ";
			$dotaz.="showgame.visible, game.black_user,game.winner,game.active,game.winreason, game.status,game.turn ";
			$dotaz.=" from game,showgame,user where game.white_user=user.iduser and game.black_user=".$id." and game.idgame=".$gid." and ";
			$dotaz.="(showgame.idgame=game.idgame and showgame.iduser=game.black_user and showgame.visible=1))";
			
			
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			if (mysqli_num_rows($resultset) > 0) {
				while($row = mysqli_fetch_array($resultset)) {
					$myArray[] = $row;
				}
				echo json_encode($myArray);
			}
			else {
				echo "nula";
			}	
			break;
		
		case "14":
		    /*  checkin for a move*/
		    $obj = json_decode($js_string, false);
			$gid= $obj->gameid;
			$mv=$obj->lastmove;
			$trn=$obj->turn;
			
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
			
			$dotaz="select move,turn,chatcol from game  WHERE game.idgame=".$gid;
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on update');
			if (mysqli_num_rows($resultset) > 0) {
				$row=mysqli_fetch_row($resultset);
				if ($row[0]>$mv) {
					$responsex = '{"gameid":"'.$gid.'","lastmove":"'.$row[0].'","drw":"y","chatcol":"'.$row[2].'"}';
				}
				else {
					
					if ($row[1]==$trn) {
						$responsex = '{"gameid":"q","lastmove":"qq","drw":"n","chatcol":"'.$row[2].'"}';
					}
					else {
						$responsex = '{"gameid":"q","lastmove":"ww","drw":"y","chatcol":"'.$row[2].'"}';
					}
							
				}
			}
			else {
				$responsex = '{"gameid":"x","lastmove":"xx","drw":"n","chatcol":"'.$row[2].'"}';
			}
			$odp=json_decode($responsex);
			echo json_encode($odp);
			break;
		case "15":
		    /* getting list of games and latest moveid*/
		    $obj = json_decode($js_string, false);
			$gid= $obj->gid;
			$id= $obj->id;
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="SELECT move,turn,status,active,winner,winreason,ts2 from game where idgame=".$gid;
			
			
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			if (mysqli_num_rows($resultset) > 0) {
				while($row = mysqli_fetch_array($resultset)) {
					$myArray[] = $row;
				}
				echo json_encode($myArray);
			}
			else {
				echo "nula";
			}	
			break;
		case "16":
		    /* creating a private challenge */
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$id= $obj->id;
			$idchaled= $obj->idchaled;
			$colx=$obj->col1;
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="INSERT INTO challenge (idchallenger, color, active,private,idchallenged) VALUES (".$id.",'".$colx."',1,1,".$idchaled.")";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
			echo "OK";
			break;
		case "17":
		    /*  selecting id for a private challenge */
			$obj= json_decode($js_string, false);
			$idchaled= $obj->idchaled;
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="SELECT iduser from user where name='".$idchaled."'";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
			if (mysqli_num_rows($resultset) > 0) {
				$row=mysqli_fetch_row($resultset);
				echo json_encode($row);
			}
			else {
				echo "nula";
			}	
			break;
		case "18":
		    /* getting chat data */
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$gid= $obj->gid;
			
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
			
			
			$dotaz="SELECT iduser, msg, ts1 from chat where idgame=".$gid." order by ts1 ASC";
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			if (mysqli_num_rows($resultset) > 0) {
				while($row = mysqli_fetch_array($resultset)) {
					$myArray[] = $row;
				}
				echo json_encode($myArray);
			}
			else {
				echo "nula";
			}	
			break;
	
		
	    case "19":
		    /* saving a message */
			$obj = json_decode($js_string, false);
			$idg= $obj->idgame;
			$iduser= $obj->iduser;
			$msg= $obj->msg;
			$plcol=$obj->col;
			$msg2=str_ireplace("'","''",$msg);
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="INSERT INTO chat(idgame, iduser,msg) VALUES (".$idg.",".$iduser.",'".$msg2."')";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
			
			$dotaz="UPDATE game set chatcol='".$plcol."' where idgame=".$idg;
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
			echo "OK";
			break; 
		
		case "20":
		    /* refreshing chat refresh info */
			$obj = json_decode($js_string, false);
			$idg= $obj->gid;
			$col=$obj->col;
			
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
			
			$dotaz="UPDATE game set chatcol='nul' where (idgame=".$idg." and chatcol!='".$col."')";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
			echo "OK";
			break;
		case "21":
		     /* changing password */
			$obj = json_decode($js_string, false);
			$uid= $obj->uid;
			$pass= password_hash($obj->password,PASSWORD_DEFAULT);

			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			$dotaz="UPDATE user set password='".$pass."' where iduser='".$uid."'";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
		
			echo "OK";
			break;
			
		case "31":
		    
			
			echo "cuckooo";
			break;
		
		case "32":
		    /* getting active games list for a user */
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$id= $obj->id;
			
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
			
			
			$dotaz="SELECT game.idgame, user.name, game.black_user,'w' as color,game.move,game.init,";
			$dotaz.="showgame.visible, game.white_user, game.winner,game.active,game.winreason,game.status, game.turn,game.ts2,game.chatcol ";
			$dotaz.=" from game,showgame,user where game.active=1 and game.black_user=user.iduser and game.white_user=".$id." and ";
			$dotaz.="(showgame.idgame=game.idgame and showgame.iduser=game.white_user) union (";
			$dotaz.="SELECT game.idgame, user.name, game.black_user,'b' as color, game.move,game.init, ";
			$dotaz.="showgame.visible, game.white_user,game.winner,game.active,game.winreason, game.status, game.turn, game.ts2, game.chatcol ";
			$dotaz.=" from game,showgame,user where game.active=1 and game.white_user=user.iduser and game.black_user=".$id." and ";
			$dotaz.="(showgame.idgame=game.idgame and showgame.iduser=game.black_user)) order by ts2 desc,idgame desc";

			
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			if (mysqli_num_rows($resultset) > 0) {
				while($row = mysqli_fetch_array($resultset)) {
					$myArray[] = $row;
				}
				echo json_encode($myArray);
			}
			else {
				echo "nula";
			}	
			break;
			
		case "33":
		    /* getting finished games list for a user */
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$id= $obj->id;
			
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
			
			
			$dotaz="SELECT game.idgame, user.name, game.black_user,'w' as color,game.move,game.init,";
			$dotaz.="showgame.visible, game.white_user, game.winner,game.active,game.winreason,game.status, game.turn,game.ts2,game.chatcol ";
			$dotaz.=" from game,showgame,user where game.active=0 and game.black_user=user.iduser and game.white_user=".$id." and ";
			$dotaz.="(showgame.idgame=game.idgame and showgame.iduser=game.white_user) union (";
			$dotaz.="SELECT game.idgame, user.name, game.black_user,'b' as color, game.move,game.init, ";
			$dotaz.="showgame.visible, game.white_user,game.winner,game.active,game.winreason, game.status, game.turn, game.ts2, game.chatcol ";
			$dotaz.=" from game,showgame,user where game.active=0 and game.white_user=user.iduser and game.black_user=".$id." and ";
			$dotaz.="(showgame.idgame=game.idgame and showgame.iduser=game.black_user)) order by ts2 desc,idgame desc";

			
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			if (mysqli_num_rows($resultset) > 0) {
				while($row = mysqli_fetch_array($resultset)) {
					$myArray[] = $row;
				}
				echo json_encode($myArray);
			}
			else {
				echo "nula";
			}	
			break;
		case "34":
		    /* getting chat status */
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$gid= $obj->gid;
			
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
			
			
			$dotaz="SELECT max(ts1) from chat where idgame=".$gid;
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			if (mysqli_num_rows($resultset) > 0) {
			
				echo json_encode(mysqli_fetch_row($resultset));
			}
			else {
				echo "nula";
			}	
		
			break;
			
		case "35":
		    /* getting board status */
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$gid= $obj->gid;
			
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
			
			
			$dotaz="SELECT max(ts2) from game where idgame=".$gid;
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			if (mysqli_num_rows($resultset) > 0) {
			
				echo json_encode(mysqli_fetch_row($resultset));
			}
			else {
				echo "nula";
			}	
		
			break;	
			
		case "36":
		    /* getting active games list refresher */
			$obj = json_decode($js_string, false);
			$log= $obj->login;
			$id= $obj->id;
			
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
			
			
			$dotaz="SELECT max(ts2) from game where active=1 and (black_user=".$id." OR white_user=".$id.")";
		

			
		    $resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			if (mysqli_num_rows($resultset) > 0) {
			
				echo json_encode(mysqli_fetch_row($resultset));
			}
			else {
				echo "nula";
			}	
			break;	
		
			
			
			
			
	}


?>