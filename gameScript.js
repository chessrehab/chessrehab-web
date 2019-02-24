	function setSceneMenus() {
		document.body.style.zoom="77%"
		document.title="chess rehab";
	    

		
	
		var ltxt="";
	
			
		if (sessionStorage.username==undefined) {	
			    
			ltxt+="<a href='javascript:void(0)' class='dropbtn'>Login</a>";
			ltxt+="<div class='dropdown-content'>";
			ltxt+="<a href='javascript:showModal(2,\"Player login\")'>Login</a>";
			ltxt+="<a href='javascript:showModal(1,\"New player registration\")'>Register as new</a>";
			ltxt+="<a href='javascript:showModal(3,\"Password reset\")'>Reset password</a>";
			ltxt+="</div>";
			document.getElementById("Gamedrpd").style.visibility="hidden";
			document.getElementById("Statdrpd").style.visibility="hidden";

			
				
		}
		else {	
		    document.title=sessionStorage.username+"'s rehab";
			ltxt+="<a href='javascript:void(0)' class='dropbtn'>&nbsp<b>"+sessionStorage.username+"</b></a>";
			ltxt+="<div class='dropdown-content'>";
			ltxt+="<a href='javascript:showModal(4,\"Player logout\")'>Log out</a>";
			ltxt+="</div>";
		}
		return(ltxt);
							
	}
	function setSceneLogged() {
		
		var mygms="";
			mygms="";
			mygms+="<b style='font-size:12px' >" + sessionStorage.username+"'s active games: </b></br>";
			mygms+="<div id='gamebox'>";
			mygms+="</div></br>";
			
			
			mygms+="<b style='font-size:12px' >Active challenges: </b></br>";
			mygms+="<div id='challbox'>";
			mygms+="</div></br>";
			
			mygms+="<b style='font-size:12px' >" + sessionStorage.username+"'s finished games: </b></br>";
			mygms+="<div id='gamebox2'>";
			mygms+="</div></br>";
		
		return (mygms);

	}
	function setSceneUnlogged() {
		
		var ttxt="";
			ttxt+="<div id='title' class='title'>";
			ttxt+="Welcome to <b><span style='color:GoldenRod;'> chess.rehab<span></b> </br> A place that supports playing chess on multiple boards at the same time with the other rehab patients:</br></br>";
			ttxt+="<table><td><img class='rnd2' width=100% src='title.png'></td><td align=left></td>";
			//ttxt+="<td style='vertical-align:top' width=5%><img class='rnd' width='120px' src='lo.jpg'> </td><td style='vertical-align:top'><blockquote>\"meow.........meow, meow..........meoww......meaow </br>";
			//ttxt+="meow meow.....................meow........................,</br> .................meow.";
			//ttxt+="</br><p>Meoww, meow, meow?.........Meow! </br> ";
			//ttxt+="meow, meow, meow    meow.....................meow </br>";
			//ttxt+="Meow, meow, meow......meow  </br>";
			//ttxt+="Meow...meow,meow,meow................chess.rehab.....meow</br> Meow chess rehab. \"<p> ";
			//ttxt+="<b><span style='color:Cornflowerblue'>London L., chess.rehab ambassador</span></b></blockquote></td>";
			//ttxt+="</table>";
			
			ttxt+="<table><td width=5% style='vertical-align:top'><img class='rnd' width='120px' src='la.jpg'> </td><td style='vertical-align:top' width=80%><blockquote>\"I started playing chess with a group of patients and became pleasantly surprised by how effective it was at distracting me. </br>";
			ttxt+="I discovered that the more time I spent thinking about my corn eating addictions and my dramas, the more likely I was to relapse,</br> so this was a welcome distraction for me.";
			ttxt+="</br><p>As time went by I developed a routine. I would get up, eat breakfast in the dining facility, go to counseling,  </br> ";
			ttxt+="then go to the garden to spend a few hours playing chess with my fellow addicts. </br>";
			ttxt+="Those games helped me calm my frazzled nerves and find my center again.  </br>";
			ttxt+="Eventually I progressed to the point that I was no longer even thinking about my troubles at all: I had finally healed.</br> Thanks chess rehab. \"<p> ";
			ttxt+="<b><span> Amanda L., chess.rehab ambassador</span></b></blockquote></td>";
			
			ttxt+="</table>";
				
	
			ttxt+="<button class='buttonx' style='vertical-align:middle'><span><a class='titel' href='javascript:showModal(2,\"Player login\")'>Login</a> </span></button>";
			ttxt+="<button class='buttonx' style='vertical-align:middle'><span><a class='titel' href='javascript:showModal(1,\"New player registration\")'>Register</a> </span></button></br></br>";
				
			ttxt+="</div>";
		return(ttxt);

	}
	function initiateBoard(obj,iter) {
		
			boardx[iter]=new board(iter,obj[0]);	
			boardx[iter].moveid=obj[4];	
							
			boardx[iter].init=obj[5];	
			boardx[iter].latest_nr=obj[4];	
			boardx[iter].turn0=obj[12];
			boardx[iter].objectplayer=sessionStorage.username;
			obj[6]=1;				
			if (obj[6]==1)	{
				boardx[iter].show=true;
			}
							
			if (obj[11]=="b_drawoff") {
				boardx[iter].black_draw_offer=true;		
			}
			if (obj[11]=="w_drawoff") {
				boardx[iter].white_draw_offer=true;		
			}
							
			if (obj[9]==0) {
				boardx[iter].winner_id=obj[8];
				if (obj[8]==sessionStorage.userid) {
					boardx[iter].winner=sessionStorage.username;
				}	
				else {
					boardx[iter].winner=obj[1];
				}
				boardx[iter].winreason=obj[10];
				boardx[iter].game="off";
			}
			
			if (obj[3]=="w") {
				boardx[iter].black_id=obj[2];
				boardx[iter].black_name=obj[1];
				boardx[iter].white_id=sessionStorage.userid;
				boardx[iter].white_name=sessionStorage.username;
				boardx[iter].objectplayer_col="w";
			}
			if (obj[3]=="b") {
				boardx[iter].white_id=obj[2];
				boardx[iter].white_name=obj[1];
				boardx[iter].black_id=sessionStorage.userid;
				boardx[iter].black_name=sessionStorage.username;
				boardx[iter].objectplayer_col="b";
			}	
			if (boardx[iter].objectplayer_col=="w") {
				boardx[iter].flip="w";
			}
			else {
				boardx[iter].flip="b";
			}
			for (i=0;i<gamex;i++)  {
				if (game[i][0]==obj[0]) {
					game[i][15]=iter;
				}
			}		
	}
	function loadBoards() {
		
		boardx=[];
		boardsx=0;
		
		req=[];
		reqx=0;
		
		game=[];
		gamex=0;
		
		chathandler=[];
		chathandlerx=0;
		
		document.getElementById("doccontainer").innerHTML="";
		
		gameReload();
		document.getElementById("gamebox").innerHTML=loadGames();
		document.getElementById("gamebox2").innerHTML=loadFinGames();
		document.getElementById("challbox").innerHTML=loadChal();
		hideshow(1,0);
		hideshow(2,0);
		hideshow(3,0);
		chalpoint=setInterval(alertChall,5000);
		gamepoint=setInterval(alertGames,5000);		
		
		var ttxt2 = '{"login":"'+sessionStorage.username+'" , "id":"'+sessionStorage.userid+'"}';
		var jjs=JSON.parse(ttxt2);
		var mmyJSON = JSON.stringify(jjs);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {	
				return(this.responseText);
			}			
		}
		xhttp.open("POST", "check.php", false);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("y=11&x="+mmyJSON);
		rresp=xhttp.onreadystatechange();
		
		if(rresp !== "nula") {
			
			var oobj=JSON.parse(rresp);
			
			for (ii=0;ii<oobj.length;ii++) {
		
				gtid=-1;
				for (ixx=0;ixx<gamex;ixx++)  {
				
					if (game[ixx][0]==oobj[ii][0]) {
						gtid=ixx;
					}
				}	
				addBoard(oobj[ii][0],gtid);
				
				if (boardx[boardsx].init==0) {
					boardx[boardsx].initMe1();			
					boardx[boardsx].startPositionSet1();
					boardx[boardsx].confirmMove("mov0");			
				}
				if ((boardx[boardsx].init=1) & (boardx[boardsx].show)) {		
					boardx[boardsx].getLatest();	
				}		
			}
		}
	}
	function alertBoard(ms) {
		
		var txt2 = '{"gameid":"'+ms.id+'","lastmove":"'+ms.latest_nr+'", "turn":"'+ms.turn0+'"}';
		var js=JSON.parse(txt2);
		var myJSON = JSON.stringify(js);
	
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {	
				return(this.responseText);
			}			
		}
		xhttp.open("POST", "check.php", false);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("y=14&x="+myJSON);
		resp=xhttp.onreadystatechange();
		
		obj=JSON.parse(resp);
		
		if (ms.show==true) {
		
			var bublina=document.getElementById("bubble"+ms.id);
		
			
			if (ms.objectplayer_col=="w") {
				if (obj.chatcol=="b") {
					bublina.src="chatw.svg";
				} else {
					bublina.src="chato.svg";
				}
			}
			if (ms.objectplayer_col=="b") {
				if (obj.chatcol=="w") {
					bublina.src="chatw.svg";
				} else {
					bublina.src="chato.svg";
				}
			}
		}
		if (obj.drw=="y") {
			if (obj.gameid=="q") {
				if (ms.turn0=="w") {
					ms.turn0="b";
				}
				else {
					ms.turn0="w";
				}	
			}
			ms.refreshMeta();
			ms.getLatest();
			ms.loaderShow("doc88_"+ms.id);
			
		}	
	}
	function alertChall() {
		
		
		document.getElementById("challbox").innerHTML=loadChal();
		hideshow(3,0);
	}
	function alertGames() {
		
		gameReload();
		document.getElementById("gamebox").innerHTML=loadGames();
		document.getElementById("gamebox2").innerHTML=loadFinGames();
		hideshow(2,0);
		hideshow(1,0);
	}
	function alertChat(gid,iter) {
		
		var x = document.getElementById('chat'+gid);
		var xw = document.getElementById('chatw'+gid);
			
			if (x.style.visibility === 'visible') {
			
		        xw.innerHTML=boardx[iter].getChat2();
			    xw.scrollTop = xw.scrollHeight;
			} else {
				
			}
			
	}
	function showGame(gid,pid) {
		var txt2 = '{"login":"'+sessionStorage.username+'" , "id":"'+sessionStorage.userid+'","gid":"'+gid+'"}';
		var js=JSON.parse(txt2);
		var myJSON = JSON.stringify(js);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {	
				return(this.responseText);
			}			
		}
		xhttp.open("POST", "check.php", false);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("y=9&x="+myJSON);
		resp=xhttp.onreadystatechange();	
		
		if(resp == "OK") {
			addBoard(gid, pid);
		}
		else {
			showModal(5,"Info",0,"Error");
		}	
	}
	function hideGame(gid,pid) {
		var txt2 = '{"login":"'+sessionStorage.username+'" , "id":"'+sessionStorage.userid+'","gid":"'+gid+'"}';
		var js=JSON.parse(txt2);
		var myJSON = JSON.stringify(js);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {	
				return(this.responseText);
			}			
		}
		xhttp.open("POST", "check.php", false);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("y=10&x="+myJSON);
		resp=xhttp.onreadystatechange();	
		
		if(resp == "OK") {
			//location.reload(true);
			removeBoard(gid,pid);
			
		}
		else {
			showModal(5,"Info",0,"Error");
		}	
	}			
	function addBoard(ggid,ppid) {

		if (boardsx>0) { 
			boardsx++;
		}
		else {
			boardsx=1;		
		}
		var after_life=1;
		initiateBoard(game[ppid],boardsx);
		if (boardx[boardsx].init==0) {
			after_life=0;
			boardx[boardsx].initMe1();			
			boardx[boardsx].startPositionSet1();
			boardx[boardsx].confirmMove("mov00");			
		}	
	
		var divv = document.createElement("div");
		divv.className = "doc0";
		divv.id =ggid;
		divv.draggable=true;
		
		var parnt=document.getElementById("doccontainer");	
		parnt.appendChild(divv);
		parnt.insertBefore(divv, parnt.childNodes[0]);


		req[boardsx]=setInterval(alertBoard,5000,boardx[boardsx]);
		divv.ondragstart=function(event) {
			event.dataTransfer.setData("text", event.target.id);
		}
		divv.ondrop = function(ev) {
			ev.preventDefault();
			var data = ev.dataTransfer.getData("text");
			var parnt=document.getElementById("doccontainer");	
			var droppedele=document.getElementById(data);
			parnt.insertBefore(droppedele,divv);
			divv.style.border= "10px solid rgba(0,0,0,0)";
			var dropbanner=document.getElementById("drp"+ggid);
			dropbanner.style.visibility="hidden";
		}
		divv.ondragover = function(event) {
			event.preventDefault();
			divv.style.borderLeft= "10px solid GoldenRod";
			//divv.style.borderTop= "10px solid GoldenRod";
			var dropbanner=document.getElementById("drp"+ggid);
			dropbanner.style.visibility="visible";
		
			
		}	
		divv.ondragleave = function(event) {
			event.preventDefault();
			divv.style.border= "10px solid rgba(0,0,0,0)";
			var dropbanner=document.getElementById("drp"+ggid);
			dropbanner.style.visibility="hidden";
		}	
		buttx=document.getElementById("ba"+ggid);
		buttx.className="a88";
		buttx.innerHTML="hide >>";
		buttx.href="javascript:hideGame("+ggid+","+ppid+")";
		if (after_life==0) {
			boardx[boardsx].drawMe1();
			boardx[boardsx].loaderShow("doc88_"+boardx[boardsx].id);	
		}	
		boardx[boardsx].getLatest();
	}	
	function removeBoard(ggid,ppid) {
		
	  
		var parent = document.getElementById("doccontainer");
		var child = document.getElementById(ggid);
		parent.removeChild(child);
		var buttx=document.getElementById("ba"+ggid);
	
		buttx.className="a8";
		buttx.innerHTML="show >>";
		buttx.href="javascript:showGame("+ggid+","+ppid+")";
		
		
		for (i=1;i<=boardsx;i++) {
			if (boardx[i].id==ggid) {
				clearInterval(req[i]);
				clearInterval(chathandler[i]);
				boardx[i]=[];
			}
		}
					
	}
	function replacePasses(medno,padno) {
		
		
		var txt2 = '{"login":"'+medno+'" , "password":"'+padno+'"}';
		var js=JSON.parse(txt2);
		var myJSON = JSON.stringify(js);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {	
				return(this.responseText);
			}			
		}
		xhttp.open("POST", "temp.php", false);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("y=2&x="+myJSON);
		resp=xhttp.onreadystatechange();
		
		if(resp !== "nula") {
			
			alert(medno+":"+resp);
           				
		
		}	
		else {
			return("...error");
		}	
	}
	function createChallenge() {
		var x = Math.floor((Math.random() * 2) + 1);
		if (x==2) { colx="w" };
		if (x==1) { colx="b" };
		var txt2 = '{"login":"'+sessionStorage.username+'" , "id":"'+sessionStorage.userid+'"  , "col1":"'+colx+'"}';
	
		var js=JSON.parse(txt2);
		var myJSON = JSON.stringify(js);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {	
				return(this.responseText);
			}			
		}
		xhttp.open("POST", "check.php", false);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("y=8&x="+myJSON);
		resp=xhttp.onreadystatechange();	
	
		if(resp == "OK") {
			document.getElementById("challbox").innerHTML=window.loadChal();
			showModal(5,"Info",0,"Challenge has been created!");
		}
		else {
			showModal(5,"Info",0,"Error");
		}	
	
	}
	function createPrivateChallenge() {
		
		if (checkChallenger()) {
			
			var msg = document.getElementById('username');
			var login1 = document.getElementById('login');
			
			var txt2 = '{"idchaled":"'+login1.value+'"}';
			var js=JSON.parse(txt2);
			var myJSON = JSON.stringify(js);
			
				
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {	
					return(this.responseText);
				}			
			}
			xhttp.open("POST", "check.php", false);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("y=17&x="+myJSON);
			resp=xhttp.onreadystatechange();
			
			if (resp !== "nula") {
				obj=JSON.parse(resp);
				var idd=obj[0];
				var x = Math.floor((Math.random() * 2) + 1);
				if (x==2) { colx="w" };
				if (x==1) { colx="b" };
				var txt2 = '{"login":"'+sessionStorage.username+'" , "id":"'+sessionStorage.userid+'","idchaled":"'+idd+'" , "col1":"'+colx+'"}';
			
			
				var js=JSON.parse(txt2);
				var myJSON = JSON.stringify(js);
			
				
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {	
						return(this.responseText);
					}			
				}
				xhttp.open("POST", "check.php", false);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send("y=16&x="+myJSON);
				resp=xhttp.onreadystatechange();
		
				if(resp == "OK") {
					
					var modalDiv = document.getElementById('myModal');
					modalDiv.style.display = "none";
					showModal(5,"Info",0,"Challenge was sent! ");
					
				}
				
			
			
			}
	
		}
	}	
	function cancelChallenge(chid) {
		
		var txt2 = '{"login":"'+sessionStorage.username+'" , "id":"'+sessionStorage.userid+'", "chid":"'+chid+'"}';
		var js=JSON.parse(txt2);
		var myJSON = JSON.stringify(js);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {	
				return(this.responseText);
			}			
		}
		xhttp.open("POST", "check.php", false);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("y=7&x="+myJSON);
		resp=xhttp.onreadystatechange();	 
		if(resp == "OK") {
			document.getElementById("challbox").innerHTML=window.loadChal();
		}
		else {
			showModal(5,"Info",0,"Error");
		}	
	
	}
	function declineChallenge(chid) {
		
		var txt2 = '{"login":"'+sessionStorage.username+'" , "id":"'+sessionStorage.userid+'", "chid":"'+chid+'"}';
		var js=JSON.parse(txt2);
		var myJSON = JSON.stringify(js);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {	
				return(this.responseText);
			}			
		}
		xhttp.open("POST", "check.php", false);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("y=7&x="+myJSON);
		resp=xhttp.onreadystatechange();	 
		if(resp == "OK") {
			document.getElementById("challbox").innerHTML=window.loadChal();
		}
		else {
			showModal(5,"Info",0,"Error");
		}	
	
	}
	function acceptChallenge(chid) {
		
		
		var txt2 = '{"login":"'+sessionStorage.username+'" , "id":"'+sessionStorage.userid+'", "chid":"'+chid+'"}';
		var js=JSON.parse(txt2);
		var myJSON = JSON.stringify(js);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {	
				return(this.responseText);
			}			
		}
		xhttp.open("POST", "check.php", false);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("y=6&x="+myJSON);
		resp=xhttp.onreadystatechange();	
      
		if(resp !== "nula") {
			obj=JSON.parse(resp);
			ggid=obj.gameid;
			gameReload();
		
			document.getElementById("gamebox").innerHTML=loadGames();
			for (i=0;i<gamex;i++)  {
				//alert("game:"+game[i][0]+" ggid:"+ggid);
				if (game[i][0]==ggid) {
					ppid=i;
				}
			}	
			//alert(ggid+"/"+ppid);
			addBoard(ggid,ppid);
		
		}
		else {
			showModal(5,"Info",0,"The challenge is no longer valid");
		}	
	
	}
	function loadChal() {
		
		var txt2 = '{"login":"'+sessionStorage.username+'" , "id":"'+sessionStorage.userid+'"}';
		var js=JSON.parse(txt2);
		var myJSON = JSON.stringify(js);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {	
				return(this.responseText);
			}			
		}
		xhttp.open("POST", "check.php", false);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("y=5&x="+myJSON);
		resp=xhttp.onreadystatechange();	 
		if(resp !== "nula") {
			
			obj=JSON.parse(resp);
			txt8="";
			txt8+="<table class='gamebox1'>"
			if (sessionStorage.showch==1) { var aplus="<img src='eyew.svg' width=20px>" }
			if (sessionStorage.showch==0) { var aplus="<img src='eyeo.svg' width=20px>" }
			
			txt8+="<tr><td colspan=2 style='text-align:center;border-bottom:0px solid;border-radius: 5px;background-color:white;border-right:0px solid'><b> challenger:</b></td><td colspan=3 style='text-align:right;'><a id='oko3' href='javascript:hideshow(3,1)'>"+aplus+"</a></td></tr>";
			
			var prpub=1;
			for (i=0;i<obj.length;i++) {
				if ((obj[i][4]==1) & (prpub==1)) {
					txt8+="<tr class='inferno3'><td colspan=5> <div class='gamebox1' style='color:White;'>Your challenges:</div></td>";
					prpub=0;
				}
				if ((obj[i][4]==0) & (prpub==0)) {
					txt8+="<tr class='inferno3'><td colspan=5> <div class='gamebox1' style='color:White;'>Public challenges: (anyone can accept)</div></td>";
					prpub=2;
				}
				if ((obj[i][4]==1) & ((obj[i][5]!==sessionStorage.userid) & (obj[i][3]!==sessionStorage.userid))) {
					}
				else {
					txt8+="<tr class='inferno3'>"
						
					if (obj[i][2]=="w") {
						txt8+="<td><div class='gamebox1'><img src='Kw0.svg' height=15px weight=15px></div></td>";
					}
					if (obj[i][2]=="b") {
						txt8+="<td><div class='gamebox1'><img src='Kb0.svg' height=15px weight=15px></div></td>";
					}
					if (obj[i][2]=="a") {
						txt8+="<td><div class='gamebox1'></div></td>";
					}
					if (sessionStorage.userid== obj[i][3]) {
						if (obj[i][4]==0) {
							txt8+="<td><div class='gamebox1'>"+sessionStorage.username+"</div></td>";
						}
						else {
							if (obj[i][4]==1) {
								txt8+="<td><div class='gamebox1'>"+obj[i][6]+"</div></td>";
							} else {
								txt8+="<td><div class='gamebox1'>"+obj[i][6]+"</div></td>";
							}
							
						}
					
					}
					else {
						if (obj[i][4]==1) {
							txt8+="<td><div class='gamebox1' style='text-shadow: 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod;'>"+obj[i][1]+"</div></td>";
						} else {
							txt8+="<td><div class='gamebox1' >"+obj[i][1]+"</div></td>";
						}
					}
			
					
					if (sessionStorage.userid== obj[i][3]) {
						if (obj[i][4]==0) {
							txt8+="<td></td>";
						}
						else {
							txt8+="<td></td>";
						}
						
						txt8+="<td align='right'><a class='a8'  href='javascript:cancelChallenge("+obj[i][0]+")'>  cancel</a> </div></td>";
					}
					else {
						
						if (obj[i][4]==1) {
							txt8+="<td align='right'><a  class='a88' href='javascript:acceptChallenge("+obj[i][0]+")'> accept</a> </div></td>";
							txt8+="<td align='right'><a  class='a8' href='javascript:declineChallenge("+obj[i][0]+")'> decline</a> </div></td>";
						}
						else {
							txt8+="<td align='right'><a  class='a88' href='javascript:acceptChallenge("+obj[i][0]+")'> accept</a> </div></td>";
						}
					}	
					txt8+="</tr>";
				}
			}
			txt8+="</table>";
			return(txt8);	
		}
		else {
			return("...no active challenges");
		}	
	}
	function gameReload() {
		
		//0	 game.idgame	4
		//1	 user.name	Panda Likely
		//2	 game.black_user	21
		//3	 color	white
		//4	 game.move	4
		//5	 game.init	1
		//6	 showgame.visible	1	
		//7	 game.white_user	20
		//8	 game.winner	21
		//9	 game.active	0
		//10 game.winreason	resignation
		//11 game.status	
		//12 game.turn	
		//13 game.ts2
		//14 game.brd1

		
		var txt2 = '{"login":"'+sessionStorage.username+'" , "id":"'+sessionStorage.userid+'"}';
		var js=JSON.parse(txt2);
		var myJSON = JSON.stringify(js);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {	
				return(this.responseText);
			}			
		}
		
		xhttp.open("POST", "check.php", false);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("y=4&x="+myJSON);
		resp=xhttp.onreadystatechange();	
        game=[];
		gamex=0;
		
		if(resp!=="nula") {
			
			obj=JSON.parse(resp);
		
			for (i=0;i<obj.length;i++) {
				game[i]=[];
				gamex++
				for (j=0;j<15;j++) {
					
					game[i][j]=obj[i][j];
				}
				game[i][15]=-1;
			}
			
			
		}
	}
	function loadGames() {
		var cntr=0;
	
		if(gamex>0) {
			
		
			var txt8="";
			txt8+="<table class='gamebox1'>"
			if (sessionStorage.showg==1) { var aplus="<img src='eyew.svg' width=20px>" }
			if (sessionStorage.showg==0) { var aplus="<img src='eyeo.svg' width=20px>" }
			txt8+="<tr><td colspan=2 style='text-align:center;border-bottom:0px solid;border-radius: 5px;background-color:white;border-right:0px solid'><b> oponnent:</b></td><td></td><td colspan=1 style='text-align:center;border-bottom:0px solid;border-radius: 5px;background-color:white;border-right:0px solid'><b> move</b></td><td  style='text-align:right;'><a id='oko1' href='javascript:hideshow(1,1)'>"+aplus+"</a></td></tr>";
			//txt8+="<tr><td colspan=6 style='text-align:center;border-bottom:0px solid;border-radius: 5px;background-color:white;border-right:0px solid'><b></b></td>";
			for (i=0;i<gamex;i++) {
				
				if (game[i][9]==1) {
				
					txt8+=drawGameRow(i);
					if (game[i][12]==game[i][3]) {
						cntr++;
					}	
				}
			}
			txt8+="</table>";
			if (cntr>0) {
				document.title="("+cntr+")"+sessionStorage.username+"'s rehab";
			}
			else {
				document.title=sessionStorage.username+"'s rehab";
			}
			
			return(txt8);	
		}
		else {
			txt8="";
			txt8+="<table class='gamebox1'>"
			if (sessionStorage.showg==1) { var aplus="<img src='eyew.svg' width=20px>" }
			if (sessionStorage.showg==0) { var aplus="<img src='eyeo.svg' width=20px>" }
			txt8+="<tr><td colspan=2 style='text-align:center;border-bottom:0px solid;border-radius: 5px;background-color:white;border-right:0px solid'><b> oponnent:</b></td><td colspan=2 style='text-align:right;'><a id='oko1' href='javascript:hideshow(1,1)'>"+aplus+"</a></td></tr>";
			txt8+="<tr><td colspan=2> ...no active games</td></tr>";
			return(txt8);
		}	
	}
	function drawGameRow(pid) {
		    var txt0=""
			txt0+="<tr id='grw"+game[pid][0]+"' class='inferno1'>"
				
				if (game[pid][3]=="w") {
					txt0+="<td><div class='gamebox1'><img src='Kw0.svg' height=15px weight=15px></div></td>";
					if (game[pid][12]==game[pid][3]) {
						if (game[pid][14]=="b") {
							txt0+="<td><div class='gamebox1' style='text-shadow: 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod;'>"+game[pid][1]+"&nbsp <img title='new messages in chat' id='msgg"+game[pid][0]+"' src='chatw.svg' height=15px ></div></td>";
						} else {
							txt0+="<td><div class='gamebox1' style='text-shadow: 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod;'>"+game[pid][1]+"</div></td>";
						}
					}
					else {
						if (game[pid][14]=="b") {
							txt0+="<td><div class='gamebox1' style='text-shadow: 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod;'>"+game[pid][1]+"&nbsp<img title='new messages in chat' id='msgg"+game[pid][0]+"' src='chatw.svg' height=15px ></div></td>";
						} else {
							txt0+="<td><div class='gamebox1'>"+game[pid][1]+"</div></td>";
						}
					}
				}
				if (game[pid][3]=="b") {
					txt0+="<td><div class='gamebox1'><img src='Kb0.svg' height=15px weight=15px></div></td>";
					if (game[pid][12]==game[pid][3]) {
						if (game[pid][14]=="w") {
							txt0+="<td><div class='gamebox1' style='text-shadow: 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod;'>"+game[pid][1]+"&nbsp<img title='new messages in chat' id='msgg"+game[pid][0]+"' src='chatw.svg' height=15px ></div></td>";
						} else {
							txt0+="<td><div class='gamebox1' style='text-shadow: 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod;'>"+game[pid][1]+"</div></td>";
						}
					}
					else {
						if (game[pid][14]=="w") {
							txt0+="<td><div class='gamebox1' style='text-shadow: 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod;'>"+game[pid][1]+"&nbsp<img title='new messages in chat' id='msgg"+game[pid][0]+"' src='chatw.svg' height=15px ></div></td>";
						} else {
							txt0+="<td><div class='gamebox1'>"+game[pid][1]+"</div></td>";
						}
					}
				}
						
					
				
						
				if (game[pid][12]==game[pid][3]) {
					txt0+="<td><div class='gamebox1' id='mo"+game[pid][0]+"'><img title='your move' id='ig"+game[pid][0]+"' src='move.svg' height=15px ></div></td>";
				}
				else {
					txt0+="<td><div class='gamebox1' id='mo"+game[pid][0]+"'><img id='ig"+game[pid][0]+"' src='clock.svg' width=15px></div></td>";
				}
				
				
				
				
				if (game[pid][4]>0) {
					txt0+="<td><div class='gamebox11'>"+game[pid][4]+"</div></td>";
				}
				else {
					txt0+="<td><div class='gamebox11'><img  src='new.svg' width=20px></div></td>";
				}	
				if (game[pid][6]==0) {
					txt0+="<td align='right'><div style='display:inline-block;align:right'><a class='a8' style='text-align:right;' id='ba"+game[pid][0]+"' href='javascript:showGame("+game[pid][0]+","+pid+")'>show >></a> </div></td>";
				}
				else {
					txt0+="<td align='right'><div style='display:inline-block;align:right'> <a class='a88' id='ba"+game[pid][0]+"' href='javascript:hideGame("+game[pid][0]+","+pid+")'>hide >></a> </div></td>";
				}
			txt0+="</tr>";
			return(txt0);
	}
	function loadFinGames() {

		if(gamex>0) {
			
			txt8="";
			txt8+="<table class='gamebox1'>"
			if (sessionStorage.showgf==1) { var aplus="<img src='eyew.svg' width=20px>" }
			if (sessionStorage.showgf==0) { var aplus="<img src='eyeo.svg' width=20px>" }
			//txt8+="<tr><td colspan=2 style='text-align:center;border-bottom:0px solid;border-radius: 5px;background-color:white;border-right:0px solid'><b> oponnent:</b></td><td colspan=3 style='text-align:right;'><a id='oko2' href='javascript:hideshow(2,1)'>"+aplus+"</a></td></tr>";
			
			txt8+="<tr><td colspan=2 style='text-align:center;border-bottom:0px solid;border-radius: 5px;background-color:white;border-right:0px solid'><b> oponnent:</b></td><td></td><td colspan=1 style='text-align:center;border-bottom:0px solid;border-radius: 5px;background-color:white;border-right:0px solid'><b> move</b></td><td  style='text-align:right;'><a id='oko2' href='javascript:hideshow(2,1)'>"+aplus+"</a></td></tr>";
			for (i=0;i<gamex;i++) {
				if (game[i][9]==0) {
					txt8+="<tr class='inferno2'>"
				
					if (game[i][3]=="w") {
						txt8+="<td><div class='gamebox1'><img src='Kw0.svg' height=15px weight=15px></div></td>";
						
						if (game[i][14]=="b") {
							txt8+="<td><div class='gamebox1' style='text-shadow: 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod;'>"+game[i][1]+"&nbsp <img title='new messages in chat' id='msgg"+game[i][0]+"' src='chatw.svg' height=15px ></div></td>";
						} else {
							txt8+="<td><div class='gamebox1' style='color: white;text-shadow: 0 0 1.2em black;'>"+game[i][1]+"</div></td>";
						}
						
						
					}
					if (game[i][3]=="b") {
						txt8+="<td><div class='gamebox1'><img src='Kb0.svg' height=15px weight=15px></div></td>";
						if (game[i][14]=="w") {
							txt8+="<td><div class='gamebox1' style='text-shadow: 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod, 0 0 0.2em GoldenRod;'>"+game[i][1]+"&nbsp <img title='new messages in chat' id='msgg"+game[i][0]+"' src='chatw.svg' height=15px ></div></td>";
						} else {
							txt8+="<td><div class='gamebox1' style='color: white;text-shadow: 0 0 1.2em black;'>"+game[i][1]+"</div></td>";
						}
					}
					
					
					
					if (game[i][8]>0) {
						if (game[i][8]==sessionStorage.userid) {
							txt8+="<td><div class='gamebox1'><img src='cup.svg' height=15px weight=15px></div></td>";
						}
						if (game[i][8]!==sessionStorage.userid) {
							txt8+="<td><div class='gamebox1'><img src='dead.svg' height=15px weight=15px></div></td>";
						}
					}
					else {
						txt8+="<td><div class='gamebox1'><img src='shake.svg' height=15px weight=15px></div></td>";
					}
					
					
					txt8+="<td><div class='gamebox11'>"+game[i][4]+"</div></td>";
					
					if (game[i][6]==0) {
						txt8+="<td align='right'><div style='display:inline-block;align:right'><a class='a8' id='ba"+game[i][0]+"' href='javascript:showGame("+game[i][0]+","+i+")'>show >></a> </div></td>";
						      
					}
					else {
						txt8+="<td align='right'><div style='display:inline-block;align:right' ><a  class='a88' id='ba"+game[i][0]+"' href='javascript:hideGame("+game[i][0]+","+i+")'>hide >></a></div> </td>";
					}
					txt8+="</tr>";
				}
			}
			txt8+="</table>";
			return(txt8);	
		}
		else {
			txt8="";
			txt8+="<table class='gamebox1'>"
			if (sessionStorage.showgf==1) { var aplus="<img src='eyew.svg' width=20px>" }
			if (sessionStorage.showgf==0) { var aplus="<img src='eyeo.svg' width=20px>" }
			txt8+="<tr><td colspan=2 style='text-align:center;border-bottom:0px solid;border-radius: 5px;background-color:white;border-right:0px solid'><b> oponnent:</b></td><td colspan=2 style='text-align:right;'><a id='oko2' href='javascript:hideshow(2,1)'>"+aplus+"</a></td></tr>";
			txt8+="<tr><td colspan=2> ...no finished games</td></tr>";
			return(txt8);
		}	
	}	
	function hideshow(par,par2) {
		switch(par) {
			case 1:
			    if (par2>0) {
					ele=document.getElementById("oko1");
			
				
					if (sessionStorage.showg==1) {
						
						sessionStorage.showg=0;
						ele.innerHTML="<img src='eyeo.svg' width=20px>";
					
						var rws = document.getElementsByClassName('inferno1');
						
						for(ix=0; ix<rws.length; ix++) {
							rws[ix].style.display ='none';
						}

					}
					else {
						
						sessionStorage.showg=1;
						ele.innerHTML="<img src='eyew.svg' width=20px>";
						var rws = document.getElementsByClassName('inferno1');
						for(ix=0; ix<rws.length; ix++) {
							rws[ix].style.display ='table-row';
						}
					}
					break;
				}
				if (par2==0) {
					ele=document.getElementById("oko1");
			
				
					if (sessionStorage.showg==1) {
						
						sessionStorage.showg=1;
						ele.innerHTML="<img src='eyew.svg' width=20px>";
						
						var rws = document.getElementsByClassName('inferno1');
						for(ix=0; ix<rws.length; ix++) {
							rws[ix].style.display ='table-row';
						}

					}
					else {
						
						sessionStorage.showg=0;
						ele.innerHTML="<img src='eyeo.svg' width=20px>";
						var rws = document.getElementsByClassName('inferno1');
						for(ix=0; ix<rws.length; ix++) {
							rws[ix].style.display ='none';
						}
					}
					break;
				}
			case 2:
				if (par2>0) {
					ele=document.getElementById("oko2");
				
					if (sessionStorage.showgf==1) {
						sessionStorage.showgf=0;
						
						ele.innerHTML="<img src='eyeo.svg' width=20px>";
						
						var rws = document.getElementsByClassName('inferno2');
						for(ix=0; ix<rws.length; ix++) {
							rws[ix].style.display ='none';
						}
					}
					else {
						sessionStorage.showgf=1;
						ele.innerHTML="<img src='eyew.svg' width=20px>";
						var rws = document.getElementsByClassName('inferno2');
						for(ix=0; ix<rws.length; ix++) {
							rws[ix].style.display ='table-row';
						}
					}
					break;
				}
				if (par2==0) {
					ele=document.getElementById("oko2");
			
				
					if (sessionStorage.showgf==1) {
						
						sessionStorage.showgf=1;
						ele.innerHTML="<img src='eyew.svg' width=20px>";
						
						var rws = document.getElementsByClassName('inferno2');
						for(ix=0; ix<rws.length; ix++) {
							rws[ix].style.display ='table-row';
						}

					}
					else {
						
						sessionStorage.showgf=0;
						ele.innerHTML="<img src='eyeo.svg' width=20px>";
						var rws = document.getElementsByClassName('inferno2');
						for(ix=0; ix<rws.length; ix++) {
							rws[ix].style.display ='none';
						}
					}
					break;
				}
			case 3:
				if (par2>0) {
					ele=document.getElementById("oko3");
					ele2=document.getElementById("challbox");
					if (sessionStorage.showch==1) {
						sessionStorage.showch=0;
						
						ele.innerHTML="<img src='eyeo.svg' width=20px>";
						var rws = document.getElementsByClassName('inferno3');
						for(ix=0; ix<rws.length; ix++) {
							rws[ix].style.display ='none';
						}
					}
					else {
						sessionStorage.showch=1;
						ele.innerHTML="<img src='eyew.svg' width=20px>";
						var rws = document.getElementsByClassName('inferno3');
						for(ix=0; ix<rws.length; ix++) {
							rws[ix].style.display ='table-row';
						}
					}
					break;
				}
				if (par2==0) {
					ele=document.getElementById("oko3");
			
				
					if (sessionStorage.showch==1) {
						
						sessionStorage.showch=1;
						ele.innerHTML="<img src='eyew.svg' width=20px>";
						
						var rws = document.getElementsByClassName('inferno3');
						for(ix=0; ix<rws.length; ix++) {
							rws[ix].style.display ='table-row';
						}

					}
					else {
						
						sessionStorage.showch=0;
						ele.innerHTML="<img src='eyeo.svg' width=20px>";
						var rws = document.getElementsByClassName('inferno3');
						for(ix=0; ix<rws.length; ix++) {
							rws[ix].style.display ='none';
						}
					}
					break;
				}
		}		
	}
	function showModal(moder,titletext,uid0,infotext) {
		        //show modal dialog window
				var modalDiv = document.getElementById('myModal');
				var btn = document.getElementById("mButton");
				
				
				window.onclick = function(event) {
					if (event.target == modalDiv) {
						
						modalDiv.style.display = "none";
						location.search="";
					}
				}
				switch (moder) {
					case 1:
					//rgistration tab
						htmmodal="";
						htmmodal+="<span class='mClose' id='mCloseButt'>" + titletext+"  <img align='right' margin-right=10px; src='exit.svg' height=15 width=15></span>";
						htmmodal+="<p class='htmmodal'>";
						htmmodal+="<div class='doc000'>";
						htmmodal+="<form>";
						htmmodal+="<span class='break'>username:</span><input class='mod' type='text' id='login' placeholder='username...' onkeyup='checkUser()'>";
						htmmodal+="<span class='nobreak' id='username'></span>";
						htmmodal+="<span class='break'>password:</span><input class='mod' type='password' id='pass1' placeholder='password...' onkeyup='checkPass()'>";
		                htmmodal+="<span class='nobreak' id='passwd1'></span>";
						htmmodal+="<span class='break'>re-enter password:</span><input class='mod' type='password' id='pass2' placeholder='password...' onkeyup='checkPass()'>";
						htmmodal+="<span class='nobreak' id='passwd2'></span>";
						htmmodal+="<span class='break'>e-mail:</span><input class='mod' type='text' id='email' placeholder='@...' onkeyup='checkEmail(1)'>";
						htmmodal+="<span class='nobreak' id='mailcheck'></span></br></br></br></br>";
						htmmodal+="<a class='b3' href='javascript:register()'><b>Register</b></a>";
						htmmodal+="</form>";
						htmmodal+="</div>";
						htmmodal+="</p>";
						document.getElementById("modalBox").innerHTML=htmmodal;
						break;
					
					case 2:
					//login tab
						htmmodal="";
						htmmodal+="<span class='mClose' id='mCloseButt'>" +titletext+" <img align='right' margin-right=10px; src='exit.svg' height=15 width=15></span>";
						htmmodal+="<p class='htmmodal'>";
						htmmodal+="<div class='doc000'>";
						htmmodal+="<form>";
						htmmodal+="<span class='break'>username:</span><input onkeyup='javascript:login_enter13(event)' class='mod' type='text' id='login' placeholder='username...' >";
						htmmodal+="<span class='nobreak' id='username'></span>";
						htmmodal+="<span class='break'>password:</span><input onkeyup='javascript:login_enter13(event)' class='mod' type='password' id='pass1' placeholder='password...' >";
		                htmmodal+="<span class='nobreak' id='passwd1'></span></br></br></br></br>";
						htmmodal+="<a class='b3' href='javascript:login()'><b>Login</b></a>&nbsp &nbsp &nbsp &nbsp<a class='b3' href='javascript:showModal(3,\"Password reset\")'><b>Forgotten password</b></a>";
						htmmodal+="</form>";
						htmmodal+="</div>";
						htmmodal+="</p>";
						document.getElementById("modalBox").innerHTML=htmmodal;
						break;
					
					case 3:
						htmmodal="";
						htmmodal+="<span class='mClose' id='mCloseButt'>" +titletext+" <img align='right' margin-right=10px; src='exit.svg' height=15 width=15></span>";
						htmmodal+="<p class='htmmodal'>";
						htmmodal+="<div class='doc000'>";
						htmmodal+="<form>";
						htmmodal+="<span class='break'>e-mail:</span><input class='mod' type='text' id='email' placeholder='@...' onkeyup='checkEmail(2)'>";
						htmmodal+="<span class='nobreak' id='mailcheck'></span></br></br></br></br>";
						htmmodal+="<a class='b3' href='javascript:passReset()'><b>Send password reset token</b></a>";
						htmmodal+="</form>";
						htmmodal+="</div>";
						htmmodal+="</p>";
						document.getElementById("modalBox").innerHTML=htmmodal;
						break;
					case 4:
						htmmodal="";
						htmmodal+="<span class='mClose' id='mCloseButt'>" +titletext+" <img align='right' margin-right=10px; src='exit.svg' height=15 width=15></span>";
						htmmodal+="<p class='htmmodal'>";
						htmmodal+="<div class='doc000'>";
						htmmodal+="<form>";
						htmmodal+="<a class='b3' href='javascript:logOut()'><b>Log out</b></a>";
						htmmodal+="</form>";
						htmmodal+="</div>";
						htmmodal+="</p>";
						document.getElementById("modalBox").innerHTML=htmmodal;
						break;
					case 5:
						htmmodal="";
						htmmodal+="<span class='mClose' id='mCloseButt'>" +titletext+" <img align='right' margin-right=10px; src='exit.svg' height=15 width=15></span>";
						htmmodal+="<p class='htmmodal'>";
						htmmodal+="<div class='doc000'>";
						htmmodal+="<form>";
						htmmodal+="<span class='break'>"+infotext+"</span>";
						htmmodal+="</br></br>";
						htmmodal+="<a class='b3' href='javascript:shutModal()'><b>Ok</b></a>";
						htmmodal+="</form>";
						htmmodal+="</div>";
						htmmodal+="</p>";
						document.getElementById("modalBox").innerHTML=htmmodal;
						break;
					case 6:
						htmmodal="";
						htmmodal+="<span class='mClose' id='mCloseButt'>" +titletext+" <img align='right' margin-right=10px; src='exit.svg' height=15 width=15></span>";
						htmmodal+="<p class='htmmodal'>";
						htmmodal+="<div class='doc000'>";
						htmmodal+="<form>";
						htmmodal+="<span class='break'>User to challenge:</span><input class='mod' type='text' id='login' placeholder='user to challenge...' onkeyup='checkChallenger()'>";
						htmmodal+="<span class='nobreak' id='username'></span></br></br></br></br>";
						htmmodal+="<a class='b3' href='javascript:createPrivateChallenge()'><b>Send challenge</b></a>";
						htmmodal+="</form>";
						htmmodal+="</div>";
						htmmodal+="</p>";
						document.getElementById("modalBox").innerHTML=htmmodal;
						break;
					case 7:
						htmmodal="";
						htmmodal+="<span class='mClose' id='mCloseButt'>" + titletext+"  <img align='right' margin-right=10px; src='exit.svg' height=15 width=15></span>";
						htmmodal+="<p class='htmmodal'>";
						htmmodal+="<div class='doc000'>";
						htmmodal+="<form>";
						htmmodal+="<span class='break'>password:</span><input class='mod' type='password' id='pass1' placeholder='password...' onkeyup='checkPass()'>";
		                htmmodal+="<span class='nobreak' id='passwd1'></span>";
						htmmodal+="<span class='break'>re-enter password:</span><input class='mod' type='password' id='pass2' placeholder='password...' onkeyup='checkPass()'>";
						htmmodal+="<span class='nobreak' id='passwd2'></span></br></br></br></br>";
						htmmodal+="<a class='b3' href='javascript:saveNewPass("+uid0+")'><b>Save new password</b></a>";
						htmmodal+="</form>";
						htmmodal+="</div>";
						htmmodal+="</p>";
						document.getElementById("modalBox").innerHTML=htmmodal;
						break;
				}
			
				var clsButt = document.getElementById("mCloseButt");
				modalDiv.style.display = "block";
				
				clsButt.onclick = function() {
					modalDiv.style.display = "none";
					location.search="";
				}
			}
	function register() {
		
		if ((checkEmail(1)) & (checkPass()) & (checkUser())) {
			
			var msg = document.getElementById('username');
			var login1 = document.getElementById('login');
			var password1 = document.getElementById('pass1');
			var email1=document.getElementById('email');
			var txt2 = '{"login":"'+login1.value+'" , "password":"'+password1.value+'" , "email":"'+email1.value+'"}';
			
			var js=JSON.parse(txt2);
			var myJSON = JSON.stringify(js);
			if (login1.value.length>0) {
				
				var xhttp = new XMLHttpRequest();
					xhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {	
							return(this.responseText);
						}			
					}
					xhttp.open("POST", "check.php", false);
					xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhttp.send("y=2&x="+myJSON);
					resp=xhttp.onreadystatechange();
				
				if(resp == "OK") {
					var modalDiv = document.getElementById('myModal');
					modalDiv.style.display = "none";
					showModal(2,"Registration successful, you can login ");
				}
				
			}
			
		}
	}  
	function checkUser() {
		
	
		var login1 = document.getElementById('login');
		var msg = document.getElementById('username');
		
		if (login1.value.length>0) {
			
			var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {	
						return(this.responseText);
					}			
				};
				xhttp.open("POST", "check.php", false);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send("y=1&x="+login1.value);
				resp=xhttp.onreadystatechange();
			
			if(resp == "OK") {
				
				msg.innerHTML = "<span style='color:green'> &nbsp user ok</span>";
				return(true)
			}
			else {
				msg.innerHTML = "<span style='color:red'> &nbsp user already exists</span>";
				return(false)
			}
		}
		else {
			msg.innerHTML = "<span style='color:red'> &nbsp username invalid</span>";
			return(false);
		
		}
	}  
	function checkChallenger() {
		
	
		var login1 = document.getElementById('login');
		var msg = document.getElementById('username');
		
		if (login1.value.length>0) {
			
			var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {	
						return(this.responseText);
					}			
				};
				xhttp.open("POST", "check.php", false);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send("y=1&x="+login1.value);
				resp=xhttp.onreadystatechange();
			
			if(resp == "OK") {
			
				msg.innerHTML = "<span style='color:red'> &nbsp user doesnt exist</span>";
				return(false);
			}
			else {
				
				if (login1.value!==sessionStorage.username) {
					msg.innerHTML = "<span style='color:green'> &nbsp user ok</span>";
					return(true);
				}
				else {
					msg.innerHTML = "<span style='color:red'> &nbsp you cannot play yourself</span>";
					return(false);
				}	
			}
		}
		else {
			msg.innerHTML = "<span style='color:red'> &nbsp username invalid</span>";
			return(false);
		
		}
	}  	
	function checkPass() {
		

		var pass1 = document.getElementById('pass1');
		var pass2 = document.getElementById('pass2');

		var msg = document.getElementById('passwd2');

	
		if (pass1.value.length>7) {
			
			if(pass1.value == pass2.value) {
		
				msg.innerHTML = "<span style='color:green'> &nbsp password ok</span>";
				return(true);
			}
			else {

				msg.innerHTML = "<span style='color:red'> &nbsp passwords do not match</span>";
				return(false);
			}
		}
		else {
			msg.innerHTML = "<span style='color:red'> &nbsp password too short</span>";
			return(false)
		}
	}  	
	function checkEmail(sw) {
		var msg = document.getElementById('mailcheck');
		var em1 = document.getElementById('email');
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,13})+$/;
		
		if (em1.value.match(mailformat)) {
		
			if (sw==1) {
				
				if (checkEmail2()=="neexistuje") {
				
					msg.innerHTML = "<span style='color:green'> &nbsp email ok</span>";
					return (true);
				}
				else {
					msg.innerHTML = "<span style='color:red'> &nbsp e-mail was already entered by existing user</span>";
					return (false);
				}
			} else {
				if (checkEmail2()=="neexistuje") {
					msg.innerHTML = "<span style='color:red'> &nbsp e-mail is not registered with a user</span>";
					return (false);
				}
				else {
					msg.innerHTML = "<span style='color:green'> &nbsp e-mail exists with registered user</span>";
					return(checkEmail2());

				}
			}
        }
		else {
			msg.innerHTML = "<span style='color:red'> &nbsp invalid email address</span>";
			return (false)
		}
	}
	function checkEmail2() {
		
	
		var em1 = document.getElementById('email');
		
		if (em1.value.length>0) {
			
			var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {	
						return(this.responseText);
					}			
				};
				xhttp.open("POST", "check.php", false);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send("y=0&x="+em1.value);
				resp=xhttp.onreadystatechange();
			
			if(resp == "OK") {
				return("neexistuje");
			}
			else {
				return(resp);
			}
		} else {
			return("notokemail");
		}
	}
	function login_enter13(event) {
		var key = event.keyCode;

		if (key==13) {
			var login1 = document.getElementById('login');
			var pass11 = document.getElementById('pass1');
			var msg = document.getElementById('passwd1');
			
			if ((login1.value.length>0) & (pass11.value.length>0)) {
				var txt2 = '{"login":"'+login1.value+'" , "password":"'+pass11.value+'"}';
				var js=JSON.parse(txt2);
				var myJSON = JSON.stringify(js);
					
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {	
						return(this.responseText);
					}			
				}
				xhttp.open("POST", "check.php", false);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send("y=3&x="+myJSON);
				resp1=xhttp.onreadystatechange();
					 
				if(resp1 !== "nula") {
					var obj1=JSON.parse(resp1);
					sessionStorage.username = login1.value;
					sessionStorage.userid = obj1[0][0];
					sessionStorage.showg=1;
					sessionStorage.showgf=1;
					sessionStorage.showch=1;
					sessionStorage.email=obj1[0][3];
					msg.innerHTML = "<span style='color:green'> &nbsp login successful</span>";
					var modalDiv = document.getElementById('myModal');
					modalDiv.style.display = "none";
					location.reload();
						
						
				}
				else {
					msg.innerHTML = "<span style='color:red'> &nbsp login failed</span>";
					sessionStorage.username = undefined;
					sessionStorage.userid = undefined;
					sessionStorage.email=undefined;
					sessionStorage.showg=undefined;
					sessionStorage.showgf=undefined;
					sessionStorage.showch=undefined;
			
				}
					
			}
		}	
	}
	function login() {
		
		var login1 = document.getElementById('login');
		var pass11 = document.getElementById('pass1');
		var msg = document.getElementById('passwd1');
			
		if ((login1.value.length>0) & (pass11.value.length>0)) {
			var txt2 = '{"login":"'+login1.value+'" , "password":"'+pass11.value+'"}';
			var js=JSON.parse(txt2);
			var myJSON = JSON.stringify(js);
					
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {	
						return(this.responseText);
				}			
			}
			xhttp.open("POST", "check.php", false);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("y=3&x="+myJSON);
			resp1=xhttp.onreadystatechange();
					 
			if(resp1 !== "nula") {
				var obj1=JSON.parse(resp1);
				
				sessionStorage.username = login1.value;
				sessionStorage.userid = obj1[0][0];
				sessionStorage.showg=1;
				sessionStorage.showgf=1;
				sessionStorage.showch=1;
				sessionStorage.email=obj1[0][3];
				msg.innerHTML = "<span style='color:green'> &nbsp login successful</span>";
				var modalDiv = document.getElementById('myModal');
				modalDiv.style.display = "none";
				location.search="";			
			}
			else {
				msg.innerHTML = "<span style='color:red'> &nbsp login failed</span>";
				sessionStorage.username = undefined;
				sessionStorage.userid = undefined;
				sessionStorage.email=undefined;
				sessionStorage.showg=undefined;
				sessionStorage.showgf=undefined;
				sessionStorage.showch=undefined;
			}
					
		}
			
	}
	function saveNewPass(uid1) {
		
		if (checkPass()) {
			
			var password1 = document.getElementById('pass1');
			var txt2 = '{"uid":"'+uid1+'" , "password":"'+password1.value+'"}';
			
			var js=JSON.parse(txt2);
			var myJSON = JSON.stringify(js);
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {	
					return(this.responseText);
				}			
			}
			xhttp.open("POST", "check.php", false);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("y=21&x="+myJSON);
			resp=xhttp.onreadystatechange();
				
			if(resp == "OK") {
				var modalDiv = document.getElementById('myModal');
				modalDiv.style.display = "none";
					showModal(2,"Password changed, you can login ");
			}
			
		}
			
	}
	function logOut() {
		sessionStorage.clear();
		var modalDiv = document.getElementById('myModal');
		modalDiv.style.display = "none";
		location.reload();

	}
	function shutModal() {
		var modalDiv = document.getElementById('myModal');
		modalDiv.style.display = "none";
		location.reload();
	}
	function field(name,i,j, color1, piece1,selected1,option1,board1) {
		//chess field object constructor
		this.name1=name;
		this.x1 = i;
		this.y1 = j;
		this.color1 = color1;
		this.piece1 = piece1;
		this.selected1=selected1;
		this.option1=option1
		this.board1=board1;		
		this.stress=0;
	}
	function transferObject(object1) {
		//transfer object constructor
		this.game=object1.game;
		this.black_id=object1.black_id;
		this.white_id=object1.white_id;
		this.moveid=object1.moveid;
		this.id=object1.id;

		this.fields = object1.fields;
		this.blackouts = object1.blackouts;
		this.whiteouts = object1.whiteouts;
		this.stress = object1.stress;
		this.checkMateIs=object1.checkMateIs;
		this.kingWpositionI=object1.kingWpositionI;
		this.kingBpositionI=object1.kingBpositionI;
		this.kingBpositionJ=object1.kingBpositionJ;
		this.kingWpositionJ=object1.kingWpositionJ;
		this.kingWcheck=object1.kingWcheck;
		this.kingBcheck=object1.kingBcheck;
		this.enPassantI=object1.enPassantI;
		this.enPassantJ=object1.enPassantJ;
		this.enPassantColor=object1.enPassantColor;
		this.castleWK=object1.castleWK;
		this.castleWQ=object1.castleWQ;
		this.castleBK=object1.castleBK;
		this.castleBQ=object1.castleBQ;
		this.turn0=object1.turn0;
		this.white_resign=object1.white_resign;
		this.black_resign=object1.black_resign;
		this.white_draw_offer=object1.white_draw_offer;
		this.black_draw_offer=object1.black_draw_offer;
		
	}
	function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
	}
	function passReset() {
		if (checkEmail(2)!==false) {
			var obj=JSON.parse(checkEmail(2));
			
			var txt2 = '{"uname":"'+obj[0][2]+'","email":"'+obj[0][0]+'","uid":"'+obj[0][1]+'"}';
			var js=JSON.parse(txt2);
			var myJSON = JSON.stringify(js);
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {	
						return(this.responseText);
				}			
			}
			xhttp.open("POST", "mail.php", false);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("y=0&x="+myJSON);
			resp1=xhttp.onreadystatechange();
			var modalDiv = document.getElementById('myModal');
			modalDiv.style.display = "none";
			showModal(5,"Info",0,"Password reset link has been sent to address:"+obj[0][0]+". </br>If you dont find it in inbox, please check the spam folder.");	
			
		
		}
	}
	function passReset2(s,v) {
			
			
			var txt2 = '{"sel":"'+s+'","val":"'+v+'"}';
			var js=JSON.parse(txt2);
			var myJSON = JSON.stringify(js);
		
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {	
						return(this.responseText);
				}			
			}
			xhttp.open("POST", "mail.php", false);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("y=1&x="+myJSON);
			resp1=xhttp.onreadystatechange();
			if(resp1 !== "nula") {
				var obj1=JSON.parse(resp1);
				
				//sessionStorage.username = obj1[0][1];
				//sessionStorage.userid = obj1[0][0];
				//sessionStorage.showg=1;
				//sessionStorage.showgf=1;
				//sessionStorage.showch=1;
				//sessionStorage.email=obj1[0][3];
				showModal(7,"Enter new password",obj1[0][0]);
			
			
				
			} else {
			
				sessionStorage.username = undefined;
				sessionStorage.userid = undefined;
				sessionStorage.email=undefined;
				sessionStorage.showg=undefined;
				sessionStorage.showgf=undefined;
				sessionStorage.showch=undefined;
			}
		
	}
	function recMsg(idg,idusr,plcol) {
		var tbox = document.getElementById('chatx'+idg);
		var chatbox=document.getElementById('chat'+idg);
		if (tbox.value.length>0) {	
			var msg0=tbox.value;
			var msg1 = msg0.replace(/"/g, "'");
			
			var idg1=idg;
			var iduser1=idusr;
			var txt2 = '{"idgame":"'+idg1+'" , "iduser":"'+iduser1+'" , "msg":"'+msg1+'", "col":"'+plcol+'"}';
			var js=JSON.parse(txt2);
			var myJSON = JSON.stringify(js);
		
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {	
					return(this.responseText);
				}			
			}
			xhttp.open("POST", "check.php", false);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("y=19&x="+myJSON);
			resp1=xhttp.onreadystatechange();	
		
		}
		
	}
	function showStats() {
		var ww=0;
		var wd=0;
		var wl=0;
		var bw=0;
		var bd=0;
		var bl=0;
		for (i=0;i<gamex;i++) {
			if (game[i][9]==0) {		
				if (game[i][3]=="w") {
					if (game[i][8]==sessionStorage.userid) {
						ww++;
					} else {
						if (game[i][10]=="draw") {
							wd++;
						} else {
							wl++;
						}
					}
				}
				if (game[i][3]=="b") {
					if (game[i][8]==sessionStorage.userid) {
						bw++;
					} else {
						if (game[i][10]=="draw") {
							bd++;
						} else {
							bl++;
						}
					}
				}	
			}
		}
		var aw=ww+bw;
		var ad=wd+bd;
		var al=wl+bl;
		var shgraph= document.getElementById("graphs");
		

		shgraph.style.visibility="visible";
		shgraph.innerHTML="";
		
		var ultimateColors = [
			['GoldenRod','CornFlowerBlue', 'grey'],
			['GoldenRod','CornFlowerBlue', 'grey'],
			['GoldenRod','CornFlowerBlue', 'grey'],

		];
		var allLabels = ['won games', 'drawn', 'lost'];
		var allValues = [
			[aw, ad, al],
			[ww, wd, wl],
			[bw, bd, bl]
			
		];
		var data = [{
			type: 'pie',
			hole: .3,
			values: allValues[0],
			labels: allLabels,
			type: 'pie',
			name: 'All games',
			marker: {
				colors: ultimateColors[0]
			},
			domain: {
				x: [0.2,0.8],
				y: [0.4,1]
			},
			hoverinfo: 'label+text+percent',
			text: 'All'
			
		},{
			type: 'pie',
			hole: .3,
			values: allValues[1],
			labels: allLabels,
			type: 'pie',
			name: 'White',
			marker: {
				colors: ultimateColors[1]
			},
			domain: {
				x: [0.1,0.45],
				y: [0,0.4]
			},
			hoverinfo: 'label+percent',
			text: 'White'
		},{
			type: 'pie',
			hole: .3,
			values: allValues[2],
			labels: allLabels,
			type: 'pie',
			name: 'Black',
			marker: {
				colors: ultimateColors[2]
			},
			domain: {
				x: [0.55,0.9],
				y: [0,0.4]
			},
			hoverinfo: 'label+percent',
			text: 'Black'
		}];
		var layout = {
		    height:1200,
			width: 1000,
			paper_bgcolor:'rgba(255, 255, 255,0)',
			title: "Statistics of user "+sessionStorage.username+ " -click anywhere to close" ,
			annotations: [
				{
					font: {
						size: 16
					},
					showarrow: false,
					text: 'All games',
					x: 0.5,
					y: 0.7
				},
				{
					font: {
						size: 16
					},
					showarrow: false,
					text: 'White',
					x: 0.24,
					y: 0.2
				},
				{
					font: {
						size: 16,
						color: 'Black'
					},
					showarrow: false,
					text: 'Black',
					x: 0.76,
					y: 0.2
				}
			],
		};

		Plotly.newPlot(shgraph, data, layout);
		var svg1= document.getElementById("js-plotly-tester");
		shgraph.style.height=svg1.style.height;
		shgraph.style.width=svg1.style.width;
		window.onclick = function(event) {
			shgraph.style.visibility = "hidden";	
			shgraph.innerHTML="";
		}
		
		
	}
