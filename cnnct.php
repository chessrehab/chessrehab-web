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
	
	$obj = json_decode($js_string, false);
	
	$movis= $obj->moveid;
	$gid=$obj->id;
	$whiter=$obj->white_resign;
	$blackr=$obj->black_resign;
	$blackp=$obj->black_id;
	$whitep=$obj->white_id;
	$whitedo=$obj->white_draw_offer;
	$blackdo=$obj->black_draw_offer;
	$turn1=$obj->turn0;
	$chm=$obj->checkMateIs;
	
	$movis1=$movis-1;
	$movis2=$movis+1;
	
	switch ($type) {
		case "0":
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			
			$dotaz="INSERT INTO board (id_game, move_id, board_status) VALUES (".$gid.", ".$movis.", '".$js_string."')";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
			
			$dotaz="Update game set move=".$movis.",turn='w',init=1, ts2=now(1) where idgame=".$gid;
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on update');
			
			echo "ok";
			
			break;
		case "1":
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
			if ($chm=="nula") {
				$dotaz="Update game set  ts2=now(1),turn='".$turn1."',move=".$movis.",init=1 where idgame=".$gid;
			}
			if ($chm=="w") {
				$dotaz="Update game set  ts3=now(1),ts2=now(1),turn='',active=0,winner=".$whitep.", winreason='checkmate',move=".$movis.",init=1 where idgame=".$gid;
			}
			if ($chm=="b") {
				$dotaz="Update game set  ts3=now(1),ts2=now(1),turn='',active=0,winner=".$blackp.", winreason='checkmate',move=".$movis.",init=1 where idgame=".$gid;
			}
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on update');
			
			$dotaz="INSERT INTO board (id_game, move_id, board_status) VALUES (".$gid.", ".$movis.", '".$js_string."')";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
			
			
			
			
			
			break;
		case "2":
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
			
			$dotaz="Select board_status from board where id_game=".$gid." and move_id='".$movis1."'";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			$row=mysqli_fetch_row($resultset);
			if ($row!==NULL) {
				echo implode($row);
			}
			else {
				echo "q";
			}	
			
			break;
		case "3":
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
			
			$dotaz="Select board_status from board where id_game=".$gid." and move_id='".$movis2."'";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			$row=mysqli_fetch_row($resultset);
			if ($row!==NULL) {
				echo implode($row);
			}
			else {
				echo "q";
			}	
			break;
		case "4":
			
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
			
			$dotaz="Select board_status from board,game where game.idgame=".$gid." and (game.idgame=board.id_game and game.move=board.move_id)";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on select');
			$row=mysqli_fetch_row($resultset);
			if ($row!==NULL) {
				echo implode($row);
			}
			else {
				echo "q";
			}	
			break;
		case "5":
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			if ($whiter) {
				$dotaz="Update game set   ts3=now(1),ts2=now(1),move=".$movis.",init=1,turn='', active=0,winner=".$blackp.", winreason='resignation' where idgame=".$gid;	
				$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on update');
			
			}	
			if ($blackr) {
				$dotaz="Update game set   ts3=now(1),ts2=now(1),move=".$movis.",init=1,turn='',active=0,winner=".$whitep.", winreason='resignation' where idgame=".$gid;	
				$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on update');
				
			}

			$dotaz="INSERT INTO board (id_game, move_id, board_status) VALUES (".$gid.", ".$movis.", '".$js_string."')";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
			
			
			break;
		case "6":
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			if ($whitedo) {
				$dotaz="Update game set  ts2=now(1),status='w_drawoff', turn='b' where idgame=".$gid;	
				$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on update');
				echo "wok";
				
			}	
			if ($blackdo) {
				$dotaz="Update game set  ts2=now(1),status='b_drawoff', turn='w' where idgame=".$gid;	
				$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on update');
				echo "bok";
			}

			
			break;	
		case "7":
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			if ($whitedo) {
				$dotaz="Update game set  ts3=now(1),ts2=now(1),  move=".($movis).",active=0,turn='', winreason='draw' where idgame=".$gid;
				$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on update');
				
			}	
			if ($blackdo) {
				$dotaz="Update game set ts3=now(1),  ts2=now(1),move=".($movis).", active=0,turn='', winreason='draw' where idgame=".$gid;
				$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on update');
					
			}
			$dotaz="INSERT INTO board (id_game, move_id, board_status) VALUES (".$gid.", ".$movis.", '".$js_string."')";
			$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on insert');
			
			
			break;	
		case "8":
			$conx= mysqli_connect($host,$user,$heslo,$db,$port) ;
		
			if ($whitedo) {
				$dotaz="Update game set  ts2=now(1),status='', turn='w' where idgame=".$gid;	
				$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on update');
				echo "wok";
				
			}	
			if ($blackdo) {
				$dotaz="Update game set  ts2=now(1),status='', turn='b' where idgame=".$gid;	
				$resultset=mysqli_query($conx, $dotaz) or die('DB Query error on update');
				echo "bok";
			}

			break;	
		
	}
	
	
	
	
	
	

	





?>