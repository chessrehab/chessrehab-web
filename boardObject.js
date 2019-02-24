//chess board object constructor

	function board(iter,id) {
		//board only attributes
		
		// high level board attributes
		this.name="boardx["+iter+"]";
		this.iter=iter;
		this.init=0;
		this.objectplayer="";
		this.objectplayer_col="";
		this.black_name="";
		this.white_name="";
		this.winner="";
		this.winner_id=0;
		this.winreason="";
		this.latest_nr=0;
		this.turn0="w";
		this.flip="w";
		this.show=false;

		//operative shortterm 1 move board attributes
		this.latestmove=false;
		this.selectedi=0;
		this.selectedj=0;
		this.selectedField=false;
		this.zaloha="";
		this.dropped=false;
		this.whitePromoShow="none";
		this.whitePromoj=0;
		this.blackPromoShow="none";
		this.blackPromoj=0;
		this.white_resign=false;
		this.black_resign=false;
		this.white_draw_offer=false;
		this.black_draw_offer=false;
		
		//transfer object attributes 
		
		//board attributes that need to be transfered for easier sql
		this.game="on";
		this.black_id="";
		this.white_id="";
		this.moveid=0;
		this.id=id;
		
		//transfered oject move attributes
		this.fields = [];
		this.blackouts = [];
		this.whiteouts = [];
	
		this.checkMateIs="nula";
		this.kingWpositionI=0;
		this.kingBpositionI=0;
		this.kingBpositionJ=0;
		this.kingWpositionJ=0;
		this.kingWcheck=false;
		this.kingBcheck=false;
		this.enPassantI=0;
		this.enPassantJ=0;
		this.enPassantColor="nula";
		this.castleWK=true;
		this.castleWQ=true;
		this.castleBK=true;
		this.castleBQ=true;
		
		this.extractTransferObject=function() {
			var Extract= new transferObject(this);
			return (Extract);

		}
		this.drawMe1 = function() {
			//function to draw current position on the chessboard
			
			var middletab="";
			var situacia2="";
			var white_confirm="";
			var black_confirm="";
			var txt1="";
			var kbc="";
			var kwc="";
			var trn0="";
			var cls0="waitt1";
			var apxb="";
			var apxw="";
			var promow="";
			var promob="";
			var StressColor=" rgba(218, 165, 32,0.7) ";
			var xoff=-3;
			
			

			if ((!this.white_resign) & (!this.black_resign) & (this.objectplayer_col=="w") & (this.turn0=="w") & (this.dropped==true)) { situacia2="I did a move as white, waiting for confirmation"}
			if ((!this.white_resign) & (!this.black_resign) & (this.objectplayer_col=="b") & (this.turn0=="b") & (this.dropped==true)) { situacia2="I did a move as black, waiting for confirmation"}
			
			if ((this.white_resign) & (this.objectplayer_col=="w") & (this.turn0=="w") & (this.dropped==true)) { situacia2="I hit resign as white, waiting for my confirmation"}
			if ((this.black_resign) & (this.objectplayer_col=="b") & (this.turn0=="b") & (this.dropped==true)) { situacia2="I hit resign as black, waiting for my confirmation"}	
			
			
			if ((this.white_draw_offer) & (this.objectplayer_col=="w") & (this.turn0=="w") & (this.dropped==true)) { situacia2="I hit offerdraw as white, waiting for my confirmation"}	
			if ((this.black_draw_offer) & (this.objectplayer_col=="b") & (this.turn0=="b") & (this.dropped==true)) { situacia2="I hit offerdraw as black, waiting for my confirmation"}
			
			
			if ((this.white_draw_offer) & (this.objectplayer_col=="b") & (this.turn0=="b") & (this.dropped==false) & (this.latestmove)) { situacia2="Opponent hit offerdraw as white, waiting for my confirmation"}	
			if ((this.black_draw_offer) & (this.objectplayer_col=="w") & (this.turn0=="w") & (this.dropped==false) & (this.latestmove)) { situacia2="Opponent hit offerdraw as black, waiting for my confirmation"}
			
			if ((this.white_draw_offer) & (this.objectplayer_col=="w") & (this.turn0=="b") & (this.dropped==false) & (this.latestmove)) { situacia2="I offered a draw as white, waiting for opponent" }
			if ((this.black_draw_offer) & (this.objectplayer_col=="b") & (this.turn0=="w") & (this.dropped==false) & (this.latestmove)) { situacia2="I offered a draw as black, waiting for opponent" }
			
			if ((this.game=="off")  & (this.winreason=="resignation") & (this.latestmove)  & (this.winner==this.objectplayer)) { situacia2="Game off, opponent has resigned" }
			
			if ((this.game=="off")  & (this.winreason=="resignation") & (this.latestmove)  & (this.winner!==this.objectplayer)) { situacia2="Game off, I have resigned" }
			
			if ((this.game=="off")  & (this.winreason=="draw") & (this.latestmove)) { situacia2="Game off, draw aggreed" }
			
			if ((this.game=="off") & (this.winreason=="checkmate") & (this.dropped==false) & (this.winner==this.objectplayer)) { situacia2="Game off, I won by checkmate" }
			
			if ((this.game=="off") & (this.winreason=="checkmate") & (this.dropped==false) & (this.winner!==this.objectplayer)) { situacia2="Game off, I lost by checkmate" }
			
			if (this.whitePromoShow=="inline-block") { situacia2="I did a move as white, showing promo tab" }
			if (this.blackPromoShow=="inline-block") { situacia2="I did a move as black, showing promo tab" }
			
			switch (situacia2) {
				
				//confirmation awaiting situation
				
				case "I did a move as white, waiting for confirmation":
					addonconfirm="mov";
					white_confirm="<div class='confirm'> <a class='a1' href='javascript:"+this.name+".confirmMove(\""+addonconfirm+"\")'>Confirm</a>";
					white_confirm+="<a class='a1' href='javascript:"+this.name+".cancelMove("+this.zaloha+")'>Cancel</a> </div>";
					
					middletab="<div class='doc4'><b>Send your move?</b></div>";					
					break;
				case "I did a move as black, waiting for confirmation":
					addonconfirm="mov";
					black_confirm="<div class='confirm'> <a class='a1' href='javascript:"+this.name+".confirmMove(\""+addonconfirm+"\")'>Confirm</a>";
					black_confirm+="<a class='a1' href='javascript:"+this.name+".cancelMove("+this.zaloha+")'>Cancel</a> </div>";
					
					middletab="<div class='doc4'><b>Send your move?</b></div>";					
					break;	
				case "I hit resign as white, waiting for my confirmation":
					addonconfirm="res";
					white_confirm="<div class='confirm'> <a class='a1' href='javascript:"+this.name+".confirmMove(\""+addonconfirm+"\")'>Confirm</a>";
					white_confirm+="<a class='a1' href='javascript:"+this.name+".cancelMove("+this.zaloha+")'>Cancel</a> </div>";
					
					middletab="<div class='doc4'><b>Resign the game?</b></div>";
					break;
				case "I hit resign as black, waiting for my confirmation":
					addonconfirm="res";
					black_confirm="<div class='confirm'> <a class='a1' href='javascript:"+this.name+".confirmMove(\""+addonconfirm+"\")'>Confirm</a>";
					black_confirm+="<a class='a1' href='javascript:"+this.name+".cancelMove("+this.zaloha+")'>Cancel</a> </div>";
					
					middletab="<div class='doc4'><b>Resign the game?</b></div>";
					break;											
				case "I hit offerdraw as white, waiting for my confirmation":
					addonconfirm="drw";
					white_confirm="<div class='confirm'> <a class='a1' href='javascript:"+this.name+".confirmMove(\""+addonconfirm+"\")'>Confirm</a>";
					white_confirm+="<a class='a1' href='javascript:"+this.name+".cancelMove("+this.zaloha+")'>Cancel</a> </div>";
					
					middletab="<div class='doc4'><b>Offer draw?</b></div>";
					break;	
				case "I hit offerdraw as black, waiting for my confirmation":
					addonconfirm="drw";
					black_confirm="<div class='confirm'> <a class='a1' href='javascript:"+this.name+".confirmMove(\""+addonconfirm+"\")'>Confirm</a>";
					black_confirm+="<a class='a1' href='javascript:"+this.name+".cancelMove("+this.zaloha+")'>Cancel</a> </div>";
					
					middletab="<div class='doc4'><b>Offer draw?</b></div>";					
					break;					
				case "Opponent hit offerdraw as white, waiting for my confirmation":
					addonconfirm="drwA";
					black_confirm="<div class='confirm'> <a class='a1' href='javascript:"+this.name+".acceptDraw(\""+addonconfirm+"\")'>Accept</a>";
					black_confirm+="<a class='a1' href='javascript:"+this.name+".declineDraw()'>Decline</a> </div>";
					
					middletab="<div class='doc4'><b>Do you accept draw?</b></div>";
					break;	
				case "Opponent hit offerdraw as black, waiting for my confirmation":
					
					addonconfirm="drwA";
					white_confirm="<div class='confirm'> <a class='a1' href='javascript:"+this.name+".acceptDraw(\""+addonconfirm+"\")'>Accept</a>";
					white_confirm+="<a class='a1' href='javascript:"+this.name+".declineDraw()'>Decline</a> </div>";
					
					middletab="<div class='doc4'><b>Do you accept draw?</b></div>";
					break;	


				//no confirmations, just static information
				case "I offered a draw as white, waiting for opponent":
					middletab="<div class='doc4'><b>You offered draw</b></div>";
					break;	
				case "I offered a draw as black, waiting for opponent":
					middletab="<div class='doc4'><b>You offered draw</b></div>";
					break;	
					
				case "I did a move as white, showing promo tab":
					break;	
				case "I did a move as black, showing promo tab":
					break;	
				

				
				
				case "Game off, opponent has resigned":
					if (this.latestmove) {
						middletab="<div class='doc4'><img height=20px width=20px src='cup2.svg'><b>&nbsp Won - they resigned</b></div>";
					}
					break;	
					
					
				case "Game off, I have resigned":
					if (this.latestmove) {
						middletab="<div class='doc4'><img height=20px width=20px src='dead.svg'><b>&nbsp Lost - you resigned</b></div>";
					}
					break;	

				case "Game off, draw aggreed":
					if (this.latestmove) {
						
						middletab="<div class='doc4'><img height=20px width=30px src='shake.svg'> <b> &nbsp Draw agreed</b></div>";
					}
					break;	

				case "Game off, I won by checkmate":
					if (this.latestmove) {
						middletab="<div class='doc4'><img height=20px width=20px src='cup2.svg'> <b>&nbsp Won - checkmate</b></div>";
					}
					break;	

				case "Game off, I lost by checkmate":
					if (this.latestmove) {
						middletab="<div class='doc4'><img height=20px width=20px src='dead.svg'><b>&nbsp Lost - checkmate</b></div>";
					}
					break;	
					
			}
			
			
			
			
			// messages for player blocks
			
			if (this.dropped==false) {
				if ((this.kingBcheck) & (this.checkMateIs!=="w")) {
					kbc="<b>check!</b>";
				}		
				if ((this.kingWcheck) & (this.checkMateIs!=="b")) {
					kwc="<b>check!</b>";
				}	
			}
			
			if (this.winner_id>0) {
				if (this.winner==this.objectplayer) {
					if (this.objectplayer_col=="w") {
						kwc="<b>wins!</b>";
						kbc="<b>loses!</b>";
					}
					if (this.objectplayer_col=="b") {
						kbc="<b>wins!</b>";
						kwc="<b>loses!</b>";
					}
				}
				if (this.winner!==this.objectplayer)  {
					if (this.objectplayer_col=="w") {
						kwc="<b>loses!</b>";
						kbc="<b>wins!</b>";
					}
					if (this.objectplayer_col=="b") {
						kwc="<b>wins!</b>";
						kbc="<b>loses!</b>";
					}
				}
			}
			
			// messages for title block
		

			if ((this.turn0==this.objectplayer_col) & (this.dropped==false)){
				trn0="<b>your turn!</b>";
				cls0="waitt";
			}
			if ((this.turn0!==this.objectplayer_col) & (this.dropped==false) ){ 
			    
				trn0="<b>...waiting for your opponent</b>";
				cls0="waitt0";
			}
			
			if (this.game=="off") { 
				trn0="<b>...is finished</b>";
				cls0="waitt0";
			}
			
			
			//upper(black) player block
			
			if ((this.turn0=="b") & (this.dropped==false) & (this.latestmove) & (this.game=="on") & (this.objectplayer_col==this.turn0)) {
				apxb="selected";
			}	
			
			
			blackplayer_block="<div class='doc1"+apxb+"'>";
			blackplayer_block+=black_confirm;
			blackplayer_block+="<b>Black:</b>&nbsp " +this.black_name+" <span style='color:GoldenRod'> &nbsp" + kbc+ " </span><img src='pin.svg' height=15px align=right> <p class='taken'> "
			for (c=0;c<(this.blackouts.length);c++) {
				
				blackplayer_block+="<img  src='" + this.blackouts[c]+".svg' height=20px width=20px >";
			}	
			blackplayer_block+="</p></div>";
			
			
			
			//bottom(white) player block
			
			if ((this.turn0=="w") & (this.dropped==false) & (this.latestmove)  & (this.game=="on") & (this.objectplayer_col==this.turn0))  {
				apxw="selected";
			}	
			whiteplayer_block="<div class='doc1"+apxw+"'>";
			whiteplayer_block+=white_confirm;
            whiteplayer_block+="<b>White:</b>&nbsp "+this.white_name+"<span style='color:GoldenRod'> &nbsp" + kwc+ " </span> <img src='pin.svg' height=15px align=right> <p class='taken'> "
			
			for (c=0;c<(this.whiteouts.length);c++) {
				whiteplayer_block+="<img src='" + this.whiteouts[c]+".svg' height=20px width=20px >";
			}	
			
			whiteplayer_block+="</p></div>";
			
			
			
			// flippin board
			
			if (this.flip=="b") { 
				
				top0="top";
				bottomplayer_block=blackplayer_block;
				upperplayer_block=whiteplayer_block;
				
			}
			
			
			if (this.flip=="w") {
				top0="bottom";
				bottomplayer_block=whiteplayer_block;
				upperplayer_block=blackplayer_block;
				
			}
			
			
			
			
			
			//promotion tab upper(white)
			
		
			promow+="<div id='whitePromo' style='display:"+this.whitePromoShow+";";
			promow+="position:absolute;z-index:2;"+top0+":100%;left:50%;margin-left:-100px;width:160px;background-color: GoldenRod;color: #fff;text-align: center;border-radius:10px;padding: 5px 0;'>";
			promow+="<a href='javascript:"+this.name+".PromoQ(8,"+this.whitePromoj+",\"w\")'><img src='Qw0.svg' height=40px></a>";
			promow+="<a href='javascript:"+this.name+".PromoR(8,"+this.whitePromoj+",\"w\")'><img src='Rw0.svg' height=40px></a>";
			promow+="<a href='javascript:"+this.name+".PromoB(8,"+this.whitePromoj+",\"w\")'><img src='Bw0.svg' height=40px></a>";
			promow+="<a href='javascript:"+this.name+".PromoN(8,"+this.whitePromoj+",\"w\")'><img src='Nw0.svg' height=40px></a>";
			promow+="</div>";
			
			//promotion tab bottom(black)
			
			promob+="<div id='blackPromo' style='display:"+this.blackPromoShow+";";
			promob+="position:absolute;z-index:2;"+top0+":100%;left:50%;margin-left:-100px;width:160px;background-color: GoldenRod;color: #fff;text-align: center;border-radius:10px;padding: 5px 0;'>";
			promob+="<a href='javascript:"+this.name+".PromoQ(1,"+this.blackPromoj+",\"b\")'><img src='Qb0.svg' height=40px></a>";
			promob+="<a href='javascript:"+this.name+".PromoR(1,"+this.blackPromoj+",\"b\")'><img src='Rb0.svg' height=40px></a>";
			promob+="<a href='javascript:"+this.name+".PromoB(1,"+this.blackPromoj+",\"b\")'><img src='Bb0.svg' height=40px></a>";
			promob+="<a href='javascript:"+this.name+".PromoN(1,"+this.blackPromoj+",\"b\")'><img src='Nb0.svg' height=40px></a>";
			promob+="</div>";
			
			
			
			
			
			//window.alert("situacia: " +situacia2+ "\n \n winner: "+ this.winner+ "\n winreason: "+ this.winreason+ "\n blackPromoJ: "+ this.blackPromoJ+ "\n whitePromoJ: "+ this.whitePromoj+ "\n blackPromoShow: "+ this.blackPromoShow+ "\n whitePromoShow: "+ this.whitePromoShow+ "\n game: "+ this.game+"\n checkmate: "+this.checkMateIs+"\n white_resign: " +this.white_resign+ "\n black_resign: " +this.black_resign+"\n white_draw_offer: " +this.white_draw_offer+ "\n black_draw_offer: " +this.black_draw_offer+"\n objectplayer_col: "+this.objectplayer_col+"\n turn0: "+this.turn0+"\n dropped: "+this.dropped+"\n latestmove: "+this.latestmove);
			
			
			//txt1+="<div class='"+cls0+"'>Table nr:"+this.id+"&nbsp ..."+trn0+" <a href='javascript:"+this.name+".hideMe()'><img align='right' margin-right=10px; src='exit.svg' height=15 width=15></a></div> ";
			txt1+="<div class='"+cls0+"'><a href='javascript:"+this.name+".hideMe()'><img align='right' margin-right=10px; src='exit.svg' height=15 width=15></a></div> ";
			txt1+="<div class='doc44' id='drp"+this.id+"'><img  width=30px src='arrow.svg'> <b>drop here </b></div>";
		    txt1+="<div class='doc444'><a href='javascript:"+this.name+".showChat()'><img  id='bubble"+ this.id+"' width=40px src='chato.svg'></a></div>";
			txt1+="<div class='doc00'>";
			txt1+=upperplayer_block;
				
			txt1+=middletab;
		
			txt1+="<div class='doc888' id='doc88_"+this.id+"'><div class='loader'></div></div>";
			txt1+="<div class='doc88' id='"+this.id+"doc88'><b>Not your move...</b></div>";
			
			
			//board itself
			txt1+="<div class='doc3'> ";
			txt1+="<div style='visibility:hidden' id='chat"+this.id+"' class='chat'></div>";
			pridaj="";
			if (this.latestmove==false) {
				pridaj=" onclick='" + this.name +".getLatest(\""+this.name+"\")'";
			}
		
			txt1+=promow;	
			txt1+=promob;	
			txt1+="<table" + pridaj+">";
			
			
				if (this.flip=="w") {
					for (i = 8; i>0; i--) {
						txt1+="<tr>";
						for (j = 1; j<9; j++) {
							txt1+="<td>";		
							txt1+="<div style='width:30px;height:30px;background-size: 100% 100%; ";
							txt1+= "border:4px solid " ;
								
							//if field is selected it will draw a border
							if (!this.fields[i][j].selected1) {
								txt1+=this.fields[i][j].color1+";";
							}
							else {
							txt1+=" GoldenRod;";
							}	
								
							//if king is in check it will color it
							bckcol=this.fields[i][j].color1;
						
							if (this.fields[i][j].piece1.substr(0,1)=="K") {
								if (this.fields[i][j].piece1.substr(1,1)=="b") {
									if (this.kingBcheck) {
										bckcol= "GoldenRod";
									}
								}
								else {
									if (this.kingWcheck) {
										bckcol= "GoldenRod";
									}
								}
							}
							
							txt1+="background-color:" + bckcol + ";' "
								
							//if field is a drop option it will create drop event option
							if (this.fields[i][j].option1) {								
								// txt1+=" ondrop='"+this.name+".drop(event,"+i+","+j+")' ondragover='"+this.name+".allowDrop(event)' ";
								txt1+=" onclick='"+this.name+".clickdrop("+this.selectedi+","+this.selectedj+","+i+","+j+")' ";								
							}
							else {
								
								if ((this.dropped==false) & (this.latestmove)) {
									if (this.turn0==this.objectplayer_col) {
										txt1+=" onclick='" + this.name +".selectionClick1("+i+","+j+")'";	
									}
									else {
										if (this.game!=="off") {
											txt1+=" onclick='" + this.name +".notMyTurn(\""+this.id+"doc88\")'";
										}
									}
								}	
							}
							txt1+=">";
							
							if (this.fields[i][j].stress==1) {
								txt1+="<div style='width:38px;height:38px;position:relative;left:-4px;top: -4px; ";
								txt1+= "border:0px solid  " + StressColor+ ";";
								txt1+=" background-color:" + StressColor + ";'> "
								xoff=0;
							}	
							//drawing the pieces
							if (this.fields[i][j].piece1 !="nula") {
								txt1+="<div id='" +this.fields[i][j].name1+"'";
									if (this.fields[i][j].selected1) {
										
										//txt1+=" draggable='true' ondragstart='" + this.fields[i][j].board1+".drag(event,"+this.fields[i][j].x1+","+this.fields[i][j].y1+",\""+this.fields[i][j].piece1+"\")'";
									}	
									txt1+=" style='width:38px;height:38px;position:relative;left:"+xoff+"px;top:"+xoff+"px;background-size: 100% 100%;";
									txt1+="background-image:url(" + this.fields[i][j].piece1 + ".svg)';>" ;
									if (this.fields[i][j].option1) {
										txt1+="<div style='width:10px;height:10px;  position: relative;left: 13px;top: 13px;background-size: 100% 100%;";
										txt1+="background-image:url(dot.svg)';>" ;
										txt1+=" </div>";
									}
								txt1+=" </div>";
							}
							else {
								if (this.fields[i][j].option1) {
									txt1+="<div style='width:10px;height:10px;  position: relative;left: 10px;top: 10px;background-size: 100% 100%;";
									txt1+="background-image:url(dot.svg)';>" ;
									txt1+=" </div>";
								}
							}
							if (this.fields[i][j].stress==1) {
								txt1+=" </div>";
								xoff=-3;
							}	
							txt1+=" </div>";
							txt1+=" </td>";	
						}
						txt1+="</tr>";
					}
						
						
				}
				
				
				if (this.flip=="b") {
					for (i = 1; i<9; i++) {
						txt1+="<tr>";
						for (j = 8; j>0; j--) {
							txt1+="<td>";		
							txt1+="<div style='width:30px;height:30px;background-size: 100% 100%; ";
							txt1+= "border:4px solid " ;
								
							//if field is selected it will draw a border
							if (!this.fields[i][j].selected1) {
								txt1+=this.fields[i][j].color1+";";
							}
							else {
							txt1+=" GoldenRod;";
							}	
								
							//if king is in check it will color it
							bckcol=this.fields[i][j].color1;
							
							if (this.fields[i][j].piece1.substr(0,1)=="K") {
								if (this.fields[i][j].piece1.substr(1,1)=="b") {
									if (this.kingBcheck) {
										bckcol= "GoldenRod";
									}
								}
								else {
									if (this.kingWcheck) {
										bckcol= "GoldenRod";
									}
								}
							}
							
							txt1+="background-color:" + bckcol + ";' "
								
							//if field is a drop option it will create drop event option
							if (this.fields[i][j].option1) {								
								txt1+=" ondrop='"+this.name+".drop(event,"+i+","+j+")' ondragover='"+this.name+".allowDrop(event)' onclick='"+this.name+".clickdrop("+this.selectedi+","+this.selectedj+","+i+","+j+")' ";								
							}
							else {
								
								if ((this.dropped==false) & (this.latestmove)) {
									if (this.turn0==this.objectplayer_col) {
										txt1+=" onclick='" + this.name +".selectionClick1("+i+","+j+")'";	
									}
									else {
										if (this.game!=="off") {
											txt1+=" onclick='" + this.name +".notMyTurn(\""+this.id+"doc88\")'";
										}
									}
								}	
							}
							txt1+=">";
							
							if (this.fields[i][j].stress==1) {
								txt1+="<div style='width:38px;height:38px;position:relative;left:-4px;top: -4px; ";
								txt1+= "border:0px solid  " + StressColor+ ";";
								txt1+=" background-color:" + StressColor + ";'> "
								xoff=0;
							}	
							
							//drawing the pieces
							if (this.fields[i][j].piece1 !="nula") {
								txt1+="<div id='" +this.fields[i][j].name1+"'";
								if (this.fields[i][j].selected1) {
									txt1+=" draggable='true' ondragstart='" + this.fields[i][j].board1+".drag(event,"+this.fields[i][j].x1+","+this.fields[i][j].y1+",\""+this.fields[i][j].piece1+"\")'";
								}	
								txt1+=" style='width:38px;height:38px;position:relative;left:"+xoff+"px;top:"+xoff+"px;background-size: 100% 100%;";
								txt1+="background-image:url(" + this.fields[i][j].piece1 + ".svg)';>" ;
								if (this.fields[i][j].option1) {
									txt1+="<div style='width:10px;height:10px;  position: relative;left: 13px;top: 13px;background-size: 100% 100%;";
									txt1+="background-image:url(dot.svg)';>" ;
									txt1+=" </div>";
								}
								txt1+=" </div>";
							}
							else {
								if (this.fields[i][j].option1) {
									txt1+="<div style='width:10px;height:10px;  position: relative;left: 10px;top: 10px;background-size: 100% 100%;";
									txt1+="background-image:url(dot.svg)';>" ;
									txt1+=" </div>";
								}
							}
							if (this.fields[i][j].stress==1) {
								txt1+=" </div>";
								xoff=-3;
							}	
							txt1+=" </div>";
							txt1+=" </td>";	
						}
						txt1+="</tr>";
					}
						
						
				}
				
			
		
			txt1+="</table>";
			txt1+="</div>";
			
			
			
			
			txt1+=bottomplayer_block;
			
			txt1+="</div>";
			txt1+="	<div class='game'>";
			
			
			//buttons section
			situacia="";
			
			if (this.game=="off") { situacia="game off";}
			if ((!this.white_resign) & (!this.black_resign) & (this.dropped) & (this.game=="on")) { situacia="game on, waiting to confirm"; }
			if ((this.whitePromoShow) | (this.blackPromoShow)) { situacia="game on, waiting to confirm"; }
			if ((!this.white_resign) & (!this.black_resign) & (!this.dropped) & (this.game=="on")) { situacia="game on, confirmed"; }
			if ((this.white_resign) & (this.objectplayer_col=="w") & (this.game=="on")) { situacia="game on, my white resignation to confirm"; }
			if ((this.black_resign) & (this.objectplayer_col=="b") & (this.game=="on")) { situacia="game on, my black resignation to confirm"; }
			
		    txt1+="<a href='javascript:"+this.name+".flipBoard()' class='a2'>Flip  board</a>";
			switch (situacia) {
				case "game off":
				
				    txt1+="<a href='javascript:"+this.name+".doNothing()' class='a2'>show: "+ this.moveid+"</a>";
					txt1+="<a href='javascript:"+this.name+".doNothing()' class='a2'>actual:"+this.latest_nr+"</a>";
					
					if (this.moveid>0) {
						txt1+="	<a class='a11' href='javascript:" + this.name+".moveBack()'><<</a>";
					}	
					if (this.moveid==0) {
						txt1+="	<a href='javascript:"+this.name+".doNothing()' class='a1' ><<</a>";
					}
					if (this.moveid<this.latest_nr) {
						txt1+="	<a class='a11' href='javascript:" + this.name+".moveForward()'>>></a><br><br>";
					}
					if (this.moveid==this.latest_nr) {
						txt1+="	<a href='javascript:"+this.name+".doNothing()' class='a1' >>> </a><br><br>";
					}				
					if (this.moveid<this.latest_nr) {
						txt1+="<a class='a22' href='javascript:" + this.name+".getLatest(\""+this.name+"\")'>Actual</a>";
					}	
					if (this.moveid==this.latest_nr) {
						txt1+="<a href='javascript:"+this.name+".doNothing()' class='a2' '>Actual</a>";
					}
					break;
				
				case "game on, waiting to confirm":
				
				    txt1+="<a href='javascript:"+this.name+".doNothing()' class='a2'>show: "+ this.moveid +"</a>";
					txt1+="<a href='javascript:"+this.name+".doNothing()' class='a2'>actual:"+this.latest_nr+"</a>";
					
					txt1+="	<a href='javascript:"+this.name+".doNothing()' class='a1' ><<</a>";
					txt1+="	<a href='javascript:"+this.name+".doNothing()' class='a1' >>></a><br><br>";
					txt1+=" <a href='javascript:"+this.name+".doNothing()' class='a2' '>Actual</a>";	
					txt1+=" <a href='javascript:"+this.name+".doNothing()' class='a2'>Resign</a>";
					txt1+="	<a href='javascript:"+this.name+".doNothing()' class='a2'>Offer draw</a>";
					break;
				case "game on, confirmed":
				   
					txt1+="<a href='javascript:"+this.name+".doNothing()' class='a2'>show: "+ this.moveid+ "</a>";
					txt1+="<a href='javascript:"+this.name+".doNothing()' class='a2'>actual:"+this.latest_nr+"</a>";
					
					if (this.moveid>0) {
						txt1+="	<a class='a11' href='javascript:" + this.name+".moveBack()'><<</a>";
					}	
					if (this.moveid==0) {
						txt1+="	<a href='javascript:"+this.name+".doNothing()' class='a1' ><<</a>";
					}
					if (this.moveid<this.latest_nr) {
						txt1+="	<a class='a11' href='javascript:" + this.name+".moveForward()'>>></a><br><br>";
					}
					if (this.moveid==this.latest_nr) {
						txt1+="	<a href='javascript:"+this.name+".doNothing()' class='a1' >>></a><br><br>";
					}				
					if (this.moveid<this.latest_nr) {
						txt1+=" <a class='a22' href='javascript:" + this.name+".getLatest(\""+this.name+"\")'>Actual</a>";
					}	
					if (this.moveid==this.latest_nr) {
						txt1+=" <a href='javascript:"+this.name+".doNothing()' class='a2' '>Actual</a>";
					}	
					if ((this.objectplayer_col==this.turn0) & (this.latestmove)) {
						txt1+=" <a class='a22' href='javascript:" + this.name+".resign()'>Resign</a>";
						txt1+="	<a class='a22' href='javascript:" + this.name+".offerDraw()'>Offer draw</a>";
					}	
					else {
						txt1+=" <a href='javascript:"+this.name+".doNothing()' class='a2'>Resign</a>";
						txt1+="	<a href='javascript:"+this.name+".doNothing()' class='a2'>Offer draw</a>";
					}
					break;
					
				case "game on, my white resignation to confirm":	
				
					txt1+="<a href='javascript:"+this.name+".doNothing()' class='a2'>show: "+ (this.moveid)+"</a>";
					txt1+="<a href='javascript:"+this.name+".doNothing()' class='a2'>actual:"+this.latest_nr+"</a>";
					
					txt1+="	<a href='javascript:"+this.name+".doNothing()' class='a1'><<</a>";
					txt1+="	<a href='javascript:"+this.name+".doNothing()' class='a1'>>></a><br><br>";
					txt1+=" <a href='javascript:"+this.name+".doNothing()' class='a2'>Actual</a>";
					txt1+=" <a href='javascript:"+this.name+".doNothing()' class='a2'>Resign</a>";
					txt1+="	<a href='javascript:"+this.name+".doNothing()' class='a2'>Offer draw</a>";
					break;
					
				case "game on, my black resignation to confirm":	
				
					txt1+="<a href='javascript:"+this.name+".doNothing()' class='a2'>show: "+ (this.moveid)+"</a>";
					txt1+="<a href='javascript:"+this.name+".doNothing()' class='a2'>actual:"+this.latest_nr+"</a>";
					
					txt1+="	<a href='javascript:"+this.name+".doNothing()' class='a1'><<</a>";
					txt1+="	<a href='javascript:"+this.name+".doNothing()' class='a1'>>></a><br><br>";
					txt1+=" <a href='javascript:"+this.name+".doNothing()' class='a2'>Actual</a>";
					txt1+=" <a href='javascript:"+this.name+".doNothing()' class='a2'>Resign</a>";
					txt1+="	<a href='javascript:"+this.name+".doNothing()' class='a2'>Offer draw</a>";
					break;

			}
			
			txt1+="	</div>";
			txt1+=" </div>";
			
			//filling in the board with all elements
		
			document.getElementById(this.id).innerHTML=txt1;
		}
		this.showChat=function() {
		
			var x = document.getElementById('chat'+this.id);
			
			
			if (x.style.visibility === 'hidden') {
				x.style.visibility = 'visible';
		        x.innerHTML=this.getChat();
				this.refreshChatInfo();
				var xw = document.getElementById('chatw'+this.id);
				xw.scrollTop = xw.scrollHeight;
			
				document.getElementById('chatx'+this.id).focus();
				chathandler[this.iter]=setInterval(alertChat,5000,this.id,this.iter);	
			
				
			} else {
				x.style.visibility = 'hidden';
				clearInterval(chathandler[this.iter]);
				
			}
				
		}
		this.refreshChatInfo=function() {
			var txt2 = '{"login":"'+sessionStorage.username+'" , "id":"'+sessionStorage.userid+'","gid":"'+this.id+'","col":"'+this.objectplayer_col+'"}';
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
			xhttp.send("y=20&x="+myJSON);
			resp=xhttp.onreadystatechange();	
				
			
		}
		this.getChat=function() {
			
			var txt2 = '{"login":"'+sessionStorage.username+'" , "id":"'+sessionStorage.userid+'","gid":"'+this.id+'"}';
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
			xhttp.send("y=18&x="+myJSON);
			resp=xhttp.onreadystatechange();	
			chatxt="<table>";	
			if(resp!=="nula") {
				chatxt+="<tr><td><div id='chatw"+this.id+"' class='chat0'><table cellpadding=4px width=100%>";
				obj=JSON.parse(resp);
			
				for (i=0;i<obj.length;i++) {
					if (obj[i][0]==sessionStorage.userid) {
						chatxt+="<tr  align=right><td><div align=right class='mymsg'>" +obj[i][1]+ "</div><td></tr>";
					} else {
						chatxt+="<tr align=left><td><div class='hismsg'>" +obj[i][1]+ "</div></td></tr>";
					}
						
				}
				chatxt+="</table></div></td></tr>";
				
					
				
			} 
			chatxt+="<tr><td><div style='width:100%' ><input autocomplete='off' class='msg' type='text' id='chatx"+this.id+"' placeholder='type your message here...' onkeyup='"+this.name+".sendMsg(event)'>&nbsp &nbsp ";
			chatxt+="<a style='vertical-align:bottom' href='javascript:"+this.name+".sendMsg2()'><img title='send message' src='send.svg' height=20></a></div></td></tr></table>";
			
			return(chatxt);
			
		}
		this.getChat2=function() {
			this.refreshChatInfo();
			var txt2 = '{"login":"'+sessionStorage.username+'" , "id":"'+sessionStorage.userid+'","gid":"'+this.id+'"}';
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
			xhttp.send("y=18&x="+myJSON);
			resp=xhttp.onreadystatechange();	
			if(resp!=="nula") {
				var chatxt="<table cellpadding=4px width=100%>";
				obj=JSON.parse(resp);
			
				for (i=0;i<obj.length;i++) {
					if (obj[i][0]==sessionStorage.userid) {
						chatxt+="<tr  align=right><td><div align=right class='mymsg'>" +obj[i][1]+ "</div><td></tr>";
					} else {
						chatxt+="<tr align=left><td><div class='hismsg'>" +obj[i][1]+ "</div></td></tr>";
					}
						
				}
				chatxt+="</table>";
				
					
				
			} 
			
			return(chatxt);
			
		}
		this.sendMsg=function(event) {
			var key = event.keyCode;
		
			if (key==13) {
			
				if (this.objectplayer_col=="w") {
					var coll="w";
				} else {
					var coll="b";
				}
			
				recMsg(this.id,sessionStorage.userid,coll)
				var x = document.getElementById('chat'+this.id);
				x.innerHTML=this.getChat();
				var xw = document.getElementById('chatw'+this.id);
				xw.scrollTop = xw.scrollHeight;
				document.getElementById('chatx'+this.id).focus();
			}
		}
		this.sendMsg2=function(event) {
			if (this.objectplayer_col=="white") {
				var coll="w";
			} else {
				var coll="b";
			}
			recMsg(this.id,sessionStorage.userid,coll)
			var x = document.getElementById('chat'+this.id);
			x.innerHTML=this.getChat();
			var xw = document.getElementById('chatw'+this.id);
			xw.scrollTop = xw.scrollHeight;
			document.getElementById('chatx'+this.id).focus();	
		
		}
		this.notMyTurn=function(elex) {
			
			document.getElementById(elex).style.visibility="visible";
			
			myvar=setTimeout(this.notMyTurnHide, 3000, elex);
			
		}
		this.notMyTurnHide=function(px) {
			document.getElementById(px).style.visibility="hidden";
		}
		this.loaderShow=function(elex2) {
			document.getElementById(elex2).style.visibility="visible";
			
			//document.getElementById(elex2).style.visibility="visible";
			
			var myvar2=setTimeout(this.loaderHide, 1500, elex2);
			
		}
		this.loaderHide=function(px2) {
			document.getElementById(px2).style.visibility="hidden";
			document.getElementById("gamebox").innerHTML=loadGames();
			document.getElementById("gamebox2").innerHTML=loadFinGames();
			document.getElementById("challbox").innerHTML=loadChal();
			hideshow(1,0);
			hideshow(2,0);
			hideshow(3,0);
			
		}
		this.flipBoard=function() {
			if (this.flip=="w") {
				this.flip="b";
			}
			else  {
				this.flip="w";
			}
			this.clearSelect1();
			this.drawMe1();
		}
		this.doNothing=function() {
		}
		this.offerDraw=function() {
			this.zaloha=JSON.stringify(this.extractTransferObject());
			if (this.objectplayer_col=="w") {
				this.white_draw_offer=true;
			}
			if (this.objectplayer_col=="b") {
				this.black_draw_offer=true;
			}
		
			this.dropped=true;
			this.clearSelect1();
			this.drawMe1();
		}
		this.resign=function() {
			this.zaloha=JSON.stringify(this.extractTransferObject());
			if (this.objectplayer_col=="w") {
				this.white_resign=true;
			}
			if (this.objectplayer_col=="b") {
				this.black_resign=true;
			}

			this.dropped=true;
			this.clearSelect1();
			this.drawMe1();
		}
		this.initMe1 = function() {
			for (i = 1; i<9; i++) {
			    this.fields[i]=[];
				for (j = 1; j<9; j++) {
						if ((((j%2)==0) && ((i%2)==1)) | (((j%2)==1) && ((i%2)==0))){
							
							this.fields[i][j]= new field(this.name+".fields["+i+"]["+j+"]",i,j,"GhostWhite","nula",false,false,this.name);
							
						} else {
						
							this.fields[i][j]= new field(this.name+".fields["+i+"]["+j+"]",i,j,"CornflowerBlue","nula",false,false,this.name);
							
						}	
					
				}
			}
		}
		this.hideMe = function() {
			//check.php 10
			gid=this.id;
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
				
				for (i=0;i<gamex;i++)  {
					
					if (game[i][0]==this.id) {
						var pid=i;
					}
				}	
				removeBoard(gid,pid);
			}
			else {
				showModal(5,"Error");
			}	
		}
		this.startPositionSet1 = function() {
			for(j=1;j<9;j++) {
				this.fields[2][j].piece1="pw0";
				this.fields[7][j].piece1="pb0";
			}	
			this.fields[1][1].piece1="Rw0";
			this.fields[1][8].piece1="Rw0";
			this.fields[8][1].piece1="Rb0";
			this.fields[8][8].piece1="Rb0";
			this.fields[1][2].piece1="Nw0";
			this.fields[1][7].piece1="Nw0";
			this.fields[8][2].piece1="Nb0";
			this.fields[8][7].piece1="Nb0";
			this.fields[1][3].piece1="Bw0";
			this.fields[1][6].piece1="Bw0";
			this.fields[8][3].piece1="Bb0";
			this.fields[8][6].piece1="Bb0";
			this.fields[1][5].piece1="Kw0";
			this.kingWpositionI=1;
			this.kingWpositionJ=5;
			this.fields[1][4].piece1="Qw0";
			this.fields[8][5].piece1="Kb0";
			this.kingBpositionI=8;
			this.kingBpositionJ=5;
			
			this.fields[8][4].piece1="Qb0";
			for(i=3;i<7;i++) {
				for(j=1;j<9;j++) {
					this.fields[i][j].piece1="nula";
				}	
			}
			
			this.init=1;
			
		}
		this.allowDrop= function(ev) {
			
			ev.preventDefault();
		}	
		this.drag= function(ev,drgi,drgj,img0) {
		    
			var img1 = new Image(); 
			img1.src = ''+img0+'.svg'; 
			img1.style.width='5px';
			img1.style.height='5px';
			
			ev.dataTransfer.setData("text", drgi+","+drgj);
			ev.dataTransfer.setDragImage(img1,50, 40);
			
		}
		this.drop=function(ev,drpi,drpj) {
			 
			ev.preventDefault();
			var data = ev.dataTransfer.getData("text");
		    drgi=data.substr(0,1);
			drgj=data.substr(2,1);
			this.movePieces(drgi,drgj,drpi,drpj);
			
			 
			 
		}
		this.clickdrop=function(seli,selj,drpi,drpj) {
			
		    drgi=seli;
			drgj=selj;
			this.movePieces(drgi,drgj,drpi,drpj);
			
				 
			 
		}
		this.PromoQ=function(i,j,col) {
			this.fields[i][j].piece1="Q"+col+"0";
			this.kingWcheck= this.checkCheck("w",1,1,"Kw0",true);
			this.kingBcheck= this.checkCheck("b",1,1,"Kb0",true);
			if (col=="w") {
				this.whitePromoShow="none";
				this.whitePromoj=0;
			}
			else {
				this.blackPromoShow="none";
				this.blackPromoj=0;
			}	
			this.drawMe1();
		}
		this.PromoR=function(i,j,col) {
			this.fields[i][j].piece1="R"+col+"0";
			this.kingWcheck= this.checkCheck("w",1,1,"Kw0",true);
			this.kingBcheck= this.checkCheck("b",1,1,"Kb0",true);
			if (col=="w") {
				this.whitePromoShow="none";
				this.whitePromoj=0;
			}
			else {
				this.blackPromoShow="none";
				this.blackPromoj=0;
			}	
			this.drawMe1();
		}
		this.PromoB=function(i,j,col) {
			this.fields[i][j].piece1="B"+col+"0";
			this.kingWcheck= this.checkCheck("w",1,1,"Kw0",true);
			this.kingBcheck= this.checkCheck("b",1,1,"Kb0",true);
			if (col=="w") {
				this.whitePromoShow="none";
				this.whitePromoj=0;
			}
			else {
				this.blackPromoShow="none";
				this.blackPromoj=0;
			}	
			this.drawMe1();
		}	
		this.PromoN=function(i,j,col) {
			this.fields[i][j].piece1="N"+col+"0";
			this.kingWcheck= this.checkCheck("w",1,1,"Kw0",true);
			this.kingBcheck= this.checkCheck("b",1,1,"Kb0",true);
			if (col=="w") {
				this.whitePromoShow="none";
				this.whitePromoj=0;
			}
			else {
				this.blackPromoShow="none";
				this.blackPromoj=0;
			}	
			this.drawMe1();
		}
		this.movePieces=function(drgi,drgj,drpi,drpj) {
			// function to move pieces on the board after regular drop
			this.zaloha=JSON.stringify(this.extractTransferObject());
			
			this.clearLastMove();
			takeX=false;
			takenX="";
			
			//enpassant take after drop to empty field in a different column
			
			if ((this.fields[drpi][drpj].piece1=="nula") && (drgj!=drpj) && (this.fields[drgi][drgj].piece1.substr(0,1)=="p")) {
				if (this.fields[drgi][drgj].piece1.substr(1,1)=="b") {
					takeX=true;
					takenX=this.fields[drpi+1][drpj].piece1;
					
					this.fields[drpi+1][drpj].piece1="nula";
					this.fields[drpi+1][drpj].stress=1;
					
				}
				else {
					takeX=true;
					takenX=this.fields[drpi-1][drpj].piece1
					this.fields[drpi-1][drpj].piece1="nula";
					this.fields[drpi+1][drpj].stress=1;
				}
			}
			//en passant variable checked after a move by 2 fields, relevant for next move
			
			this.enPassantI=0;
			this.enPassantJ=0;
			this.enPassantColor="nula";
		    if (this.fields[drgi][drgj].piece1.substr(0,1)=="p") {
				
				if (this.fields[drgi][drgj].piece1.substr(1,1)=="b") {
					if ((drgi-drpi)==2) {
						
						this.enPassantI=drpi;
						this.enPassantJ=drpj;
						this.enPassantColor="b";
					}	
				}
				else {
					if ((drpi-drgi)==2) {
						
						this.enPassantI=drpi;
						this.enPassantJ=drpj;
						this.enPassantColor="w";
					}	
				}
			}
			
			// castling check (if the king or rooks have moved to remove castling rights). IF Kings drop is +-2, commits the rook castling move
			
			if (this.fields[drgi][drgj].piece1.substr(0,1)=="K") {
				if (this.fields[drgi][drgj].piece1.substr(1,1)=="b") {
					this.castleBK=false;
					this.castleBQ=false;
					this.kingBpositionI=drpi;
					this.kingBpositionJ=drpj;
					if ((drpj-drgj)==2) {
						this.fields[8][8].piece1="nula";
						this.fields[8][8].stress=1;
						this.fields[8][6].piece1="Rb0";
						this.fields[8][6].stress=1;
					}
					if ((drpj-drgj)==-2) {
						this.fields[8][1].piece1="nula";
						this.fields[8][1].stress=1;
						this.fields[8][4].piece1="Rb0";
						this.fields[8][4].stress=1;
					}
				}
				else {
					this.castleWK=false;
					this.castleWQ=false;
					this.kingWpositionI=drpi;
					this.kingWpositionJ=drpj;
					if ((drpj-drgj)==2) {
						this.fields[1][8].piece1="nula";
						this.fields[1][8].stress=1;
						this.fields[1][6].piece1="Rw0";
						this.fields[1][6].stress=1;
					}
					if ((drpj-drgj)==-2) {
						this.fields[1][1].piece1="nula";
						this.fields[1][1].stress=1;
						this.fields[1][4].piece1="Rw0";
						this.fields[1][4].stress=1;
					}
				}
			}
			if (this.fields[drgi][drgj].piece1.substr(0,1)=="R") {
				if (this.fields[drgi][drgj].piece1.substr(1,1)=="b") {
					if (drgj==1) {
						this.castleBQ=false;
					}
					if (drgj==8) {
						this.castleBK=false;
					}
				}
				else {
					if (drgj==1) {
						this.castleWQ=false;
					}
					if (drgj==8) {
						
						this.castleWK=false;
					}
				}
			}
			
			
			
			if ((takeX==false) && (this.fields[drpi][drpj].piece1!=="nula")) {
				
				takeX=true;
				takenX=this.fields[drpi][drpj].piece1;
			}	
			this.fields[drpi][drpj].piece1=this.fields[drgi][drgj].piece1;
			this.fields[drpi][drpj].stress=1;
			if ((this.fields[drgi][drgj].piece1.substr(0,1)=="p") && (drpi==8)) {
				
				this.whitePromoShow="inline-block";
				this.whitePromoj=drpj;
			}
			if ((this.fields[drgi][drgj].piece1.substr(0,1)=="p") && (drpi==1)) {
				this.blackPromoShow="inline-block";
				this.blackPromoj=drpj;
			}				
			this.fields[drgi][drgj].piece1="nula";
			this.fields[drgi][drgj].stress=1;
			farba=this.fields[drpi][drpj].piece1.substr(1,1);
			
			//checks if the kings are in check after the move 
			
			
			this.kingWcheck= this.checkCheck("w",1,1,"Kw0",true);
			this.kingBcheck= this.checkCheck("b",1,1,"Kb0",true);

			
			//pushes the taken piece into an array of taken pieces
			if (takeX) {
				if (takenX.substr(1,1)=="b")  {
					this.blackouts.push(takenX);
				}
				else {
					this.whiteouts.push(takenX);
				}	
			}
			
			if (this.kingWcheck) {
				this.checkMate("w");
			}
			if (this.kingBcheck) {
				this.checkMate("b");
			}
			//this.moveid++;
			this.dropped=true;
			this.clearSelect1();
			this.drawMe1();

		}
		this.checkMate=function(colorCH) {
			// function to check if it is mate
			movs=0;
			if (colorCH=="b") {
				color1="w";
			}
			else {
				color1="b";
			}
			
			for (v=1;v<9;v++) {
				for (b=1;b<9;b++) {
					if ((this.fields[v][b].piece1 !=="nula") && (this.fields[v][b].piece1.substr(1,1)!==color1)) {
						this.selectedi=v;
						this.selectedj=b;
						movs+=this.checkMoves1(v,b);
						this.clearSelect1;
					}
				}	
			}	
			
			if (movs==0) {
				this.checkMateIs=color1;
			}	
			
			
		}
		this.confirmMove=function(action) {

			if (action=="mov"){
				if (this.turn0=="w") {
					this.turn0="b";
				}
				else {
					this.turn0="w";
				}	
				this.moveid++;
				var myJSON = JSON.stringify(this.extractTransferObject());
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						return(this.responseText);
					}
				};
				xhttp.open("POST", "cnnct.php", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send("y=1&x="+myJSON);
				resp=xhttp.onreadystatechange();
				
				
				
				if (this.checkMateIs=="b") {
					this.game="off";
					this.winner_id=this.black_id;
					this.winner=this.black_name;
					this.winreason="checkmate";
				}	
							
					
				if (this.checkMateIs=="w") {
					this.game="off";
					this.winner_id=this.white_id;
					this.winner=this.white_name;
					this.winreason="checkmate";
				}	
				
			

			}
			if (action=="mov0"){
				
				var myJSON = JSON.stringify(this.extractTransferObject());
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						return(this.responseText);
					}
				};
				xhttp.open("POST", "cnnct.php", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send("y=0&x="+myJSON);
				resp=xhttp.onreadystatechange();
			
			}
			if (action=="mov00"){
				
				var myJSON = JSON.stringify(this.extractTransferObject());
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						return(this.responseText);
					}
				};
				xhttp.open("POST", "cnnct.php", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send("y=0&x="+myJSON);
				resp=xhttp.onreadystatechange();
				
			
			}
			if (action=="res"){
				this.moveid++;
				
				var myJSON = JSON.stringify(this.extractTransferObject());
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						return(this.responseText);
					}
				};
				xhttp.open("POST", "cnnct.php", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				
				xhttp.send("y=5&x="+myJSON);
				resp=xhttp.onreadystatechange();
				
				
				this.game="off";
				if (this.white_resign) {
					if (this.objectplayer_col=="w") {
						this.winner_id=this.black_id;
						this.winner=this.black_name;
						this.winreason="resignation";
					}	
							
					if (this.objectplayer_col=="b") {
						this.winner_id=this.black_id;
						this.winner=this.black_name;
						this.winreason="resignation";
							
					}
					}
				if (this.black_resign) {
					
					if (this.objectplayer_col=="w") {
						this.winner_id=this.white_id;
						this.winner=this.white_name;
						this.winreason="resignation";
					}
					if (this.objectplayer_col=="b") {
						this.winner_id=this.white_id;
						this.winner=this.white_name;
						this.winreason="resignation";
					}
				}				
			}
			
			if (action=="drw"){
				
				if (this.turn0=="w") {
					this.turn0="b";
				}
				else {
					this.turn0="w";
				}	
				var myJSON = JSON.stringify(this.extractTransferObject());
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						return(this.responseText);
					}
				};
				xhttp.open("POST", "cnnct.php", true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				
				xhttp.send("y=6&x="+myJSON);
				resp=xhttp.onreadystatechange();
				
				
			}
			
			
			
			
			this.latest_nr=this.moveid;
			this.latestmove=true;
			this.dropped=false;
			
		
			if (action!=="mov00") {
				this.drawMe1();
				this.loaderShow("doc88_"+this.id);
			}
		}
		this.declineDraw=function() {
			this.zaloha="";
			
			var myJSON = JSON.stringify(this.extractTransferObject());
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					return(this.responseText);
				}
			}
			xhttp.open("POST", "cnnct.php", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");	
			xhttp.send("y=8&x="+myJSON);
			resp=xhttp.onreadystatechange();
				
			
			this.game="on";
			this.winreason="";
			this.white_draw_offer=false;
			this.black_draw_offer=false;
			this.latestmove=true;
			this.dropped=false;
			if (this.turn0=="w") { this.turn0="b" }
			if (this.turn0=="b") { this.turn0="w" }
			
			this.drawMe1();
		}
		this.acceptDraw=function() {
			this.zaloha="";
			this.moveid++;
			var myJSON = JSON.stringify(this.extractTransferObject());
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					return(this.responseText);
				}
			}
			xhttp.open("POST", "cnnct.php", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");	
			xhttp.send("y=7&x="+myJSON);
			resp=xhttp.onreadystatechange();
				
			
			this.game="off";
			this.moveid++;
			this.winreason="draw";
			this.turn0="";
			this.white_draw_offer=false;
			this.black_draw_offer=false;
			this.latest_nr=this.moveid;
			this.latestmove=true;
			this.dropped=false;
			
			this.drawMe1();
		}
		this.cancelMove=function(object1) {
			//function to cancel and take back move
			this.game=object1.game;
			this.black_id=object1.black_id;
			this.white_id=object1.white_id;
			this.moveid=object1.moveid;
			this.id=object1.id;
			this.fields = object1.fields;
			this.blackouts = object1.blackouts;
			this.whiteouts = object1.whiteouts;
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
			
			this.dropped=false;
			this.zaloha="";
			this.latestmove=true;
		
		    this.clearSelect1();
			this.drawMe1();
		}
		this.moveBack=function() {
				//moving back in moves
			
			var Js="";
			namex=this.name;
			var myJSON = JSON.stringify(this.extractTransferObject());
		
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					//document.getElementById("jsonp").innerHTML = this.responseText;	
					return(this.responseText);
				}

			}
			xhttp.open("POST", "cnnct.php", false);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("y=2&x="+myJSON);
			resp=xhttp.onreadystatechange();
			if (resp!=="q") {
				
				var object1=JSON.parse(resp);
			    
				//this.game=object1.game;
				//this.black_id=object1.black_id;
				//this.white_id=object1.white_id;
				this.moveid=object1.moveid;
				this.id=object1.id;
				this.fields = object1.fields;
				this.blackouts = object1.blackouts;
				this.whiteouts = object1.whiteouts;
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
				//this.turn0=object1.turn0;
				//this.white_resign=object1.white_resign;
				//this.black_resign=object1.black_resign;
				//this.white_draw_offer=object1.white_draw_offer;
				//this.black_draw_offer=object1.black_draw_offer;
				
				
				this.name=namex;
				this.latestmove=false;
		
			
				this.clearSelect1();
				this.drawMe1();
			}
			
			
		}
		this.moveForward=function() {
			//moving forward in moves
			var Js="";
			namex=this.name;
			var myJSON = JSON.stringify(this);
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					//document.getElementById("jsonp").innerHTML = this.responseText;	
					return(this.responseText);
				}
					
					//document.getElementById("jsonp").innerHTML = this.id;
				
						
			};
			xhttp.open("POST", "cnnct.php", false);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("y=3&x="+myJSON);
			resp=xhttp.onreadystatechange();
			
			if (resp!=="q") {
				var object1=JSON.parse(resp);
				
				//this.game=object1.game;
				//this.black_id=object1.black_id;
				//this.white_id=object1.white_id;
				this.moveid=object1.moveid;
				this.id=object1.id;
				this.fields = object1.fields;
				this.blackouts = object1.blackouts;
				this.whiteouts = object1.whiteouts;
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
				//this.turn0=object1.turn0;
				//this.white_resign=object1.white_resign;
				//this.black_resign=object1.black_resign;
				//this.white_draw_offer=object1.white_draw_offer;
				//this.black_draw_offer=object1.black_draw_offer;
				
				
				this.name=namex;
				this.latestmove=false;
				if (this.moveid==this.latest_nr) { this.latestmove=true; }
				
				this.clearSelect1();
				this.drawMe1();
			}
			else {
		
				this.clearSelect1();
				this.drawMe1();
			}	
		}
		this.getLatest=function() {
			
			//actual move to be displayed
			var Js="";
			namex=this.name;
			var myJSON = JSON.stringify(this);
		
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
	
					return(this.responseText);
				}

			}
			
			xhttp.open("POST", "cnnct.php", false);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("y=4&x="+myJSON);
			var resp=xhttp.onreadystatechange();
		
			var object1=JSON.parse(resp);
			
			//this.game=object1.game;
			//this.black_id=object1.black_id;
			//this.white_id=object1.white_id;
			this.moveid=object1.moveid;
			this.id=object1.id;
			this.fields = object1.fields;
			this.blackouts = object1.blackouts;
			this.whiteouts = object1.whiteouts;
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
			//this.turn0=object1.turn0;
			//this.white_resign=object1.white_resign;
			//this.black_resign=object1.black_resign;
			//this.white_draw_offer=object1.white_draw_offer;
			//this.black_draw_offer=object1.black_draw_offer;
	
			this.name=namex;
			this.latestmove=true;
		   
			this.clearSelect1();
			this.drawMe1();
			
				
		}
		this.refreshMeta=function() {
			var txt2 = '{"gid":"'+this.id+'" , "id":"'+sessionStorage.userid+'"}';
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
			xhttp.send("y=15&x="+myJSON);
			resp=xhttp.onreadystatechange();
			
			
			var object2=JSON.parse(resp);
		
			//window.alert(object2[0][0]);
			this.moveid=object2[0][0];	
			this.latest_nr=object2[0][0];	
			this.turn0=object2[0][1];
			if (object2[0][2]=="b_drawoff") {
				this.black_draw_offer=true;
			}
			else {
				this.black_draw_offer=false;
			}
			if (object2[0][2]=="w_drawoff") {
				this.white_draw_offer=true;
			}
			else {
				this.white_draw_offer=false;
			}
			if (object2[0][3]==0) {
				this.winner_id=object2[0][4];
				if (object2[0][4]==sessionStorage.userid) {
					this.winner=sessionStorage.username;
				}	
				else {
					if (this.objectplayer_col=="w") {
						this.winner=this.black_name;
					}
					else {
						this.winner=this.white_name;
					}
					
				}
				this.winreason=object2[0][5];
				this.game="off";
			}
			document.getElementById("gamebox").innerHTML=window.loadGames();
			document.getElementById("gamebox2").innerHTML=window.loadFinGames();
			//this.clearSelect1();
			//this.drawMe1();
				
		}
		this.clearSelect1 = function() {
			// function to clear selection of piece and options
			for (i=1;i<9;i++) {
				for (j=1;j<9;j++) {
					this.fields[i][j].selected1=false;
					this.fields[i][j].option1=false;
				
				}
			}
			this.selectedi=0;
			this.selectedj=0;
			this.selectedField=false;
		}
		this.clearLastMove = function() {
			// function to clear last move history
			for (i=1;i<9;i++) {
				for (j=1;j<9;j++) {
					this.fields[i][j].stress=0;
				
				
				}
			}
	
		}
		this.selectionClick1=function(i,j) {
			//function to select a piece
			if ((this.whitePromoShow=="none") && (this.blackPromoShow=="none")) {
				if ((this.fields[i][j].piece1!=="nula") && (this.fields[i][j].piece1.substr(1,1)==this.turn0) && (this.checkMateIs=="nula")) {
							
					if (this.selectedField) {
						this.clearSelect1();		
					}
					
					this.selectedi=i;
					this.selectedj=j;
					this.fields[i][j].selected1=true;
					this.selectedField=true;
					this.checkMoves1(this.selectedi,this.selectedj);
				}
				else {
					this.clearSelect1();
				}
				this.drawMe1();
			}
		}
		this.checkMoves1=function(i,j) {
			//function to check and select regular options for moves
			movcnt=0;
			piece0= this.fields[i][j].piece1.substr(0,1);
			color0= this.fields[i][j].piece1.substr(1,1);
			switch (piece0) {
				case "p":
				    
					movcnt+=this.pawnOptions1(i,j,color0);
					break;
				case "N":
					movcnt+=this.knightOptions1(i,j,color0);
					break;
				case "R":
					movcnt+=this.rookOptions1(i,j,color0);
					break;
				case "B":
					movcnt+=this.bishopOptions1(i,j,color0);
					break;
				case "Q":
				    movcnt+=this.queenOptions1(i,j,color0);
					break;
				case "K":
					movcnt+=this.kingOptions1(i,j,color0);
					break;
				
			}
			
			return(movcnt);
			
		}
		this.setOption=function(i,j,col) {
			isok=false;
			if (this.checkCheck(col,i,j,this.fields[this.selectedi][this.selectedj].piece1,false)==false) {
				this.fields[i][j].option1=true;
				isok=true;
			}
			return(isok);
		}
		this.pawnOptions1=function(i,j,color0) {
			// pawn options functionm
			cntopt=0;
			if (color0=="w") {
				if ((i!==2) && (i<8)) {
					if (this.fields[i+1][j].piece1=="nula") {
						if(this.setOption(i+1,j,color0)) { cntopt++ };
							
					}
				}	
				if (i==2) {				
					if (this.fields[i+1][j].piece1=="nula") {	
						if(this.setOption(i+1,j,color0)) { cntopt++};
						if (this.fields[i+2][j].piece1=="nula") {
							if(this.setOption(i+2,j,color0)) {cntopt++ };
						}
					}			
				}
				toTakeLeft="nula";
				toTakeRight="nula";
				if (i<8) {
					if (j<8) {
						toTakeRight=this.fields[i+1][j+1].piece1;	
					}
					if (j>1) {
						toTakeLeft=this.fields[i+1][j-1].piece1;
					}
					if ((toTakeRight !=="nula") && (toTakeRight.substr(1,1)!=="w")) {
						
						if(this.setOption(i+1,j+1,color0)) {cntopt++ };
					}	
					if ((toTakeLeft !=="nula") && (toTakeLeft.substr(1,1)!=="w")) {
						if(this.setOption(i+1,j-1,color0)) { cntopt++ };
					}
				}
				if ((i==5) && (this.enPassantColor=="b")) {
					if (this.enPassantJ==(j-1)) {
						if (this.setOption(6,j-1,color0)) {cntopt++ };
					}
					if (this.enPassantJ==(j+1)) {
						if (this.setOption(6,j+1,color0)) {cntopt++} ;
					}
				}						
			}	
			if (color0=="b") {
				if ((i!==7) && (i>1)) {
					if (this.fields[i-1][j].piece1=="nula") {
						if(this.setOption(i-1,j,color0)) {cntopt++};						
					}
				}	
				if (i==7) {				
					if (this.fields[i-1][j].piece1=="nula") {
						if(this.setOption(i-1,j,color0)) {cntopt++};	
						if (this.fields[i-2][j].piece1=="nula") {
							if(this.setOption(i-2,j,color0)) {cntopt++};	
						}
					}					
				}
				toTakeLeft="nula";
				toTakeRight="nula";
				if (i>1) {
					if (j<8) {
						toTakeLeft=this.fields[i-1][j+1].piece1;	
					}					
					if (j>1) {
						toTakeRight=this.fields[i-1][j-1].piece1;
					}			
					if ((toTakeRight !=="nula") && (toTakeRight.substr(1,1)!=="b")) {					
						if(this.setOption(i-1,j-1,color0)) {cntopt++};	
					}	
					if ((toTakeLeft !=="nula") && (toTakeLeft.substr(1,1)!=="b")) {				
						if(this.setOption(i-1,j+1,color0)) {cntopt++};	
					}
				}
				if ((i==4) && (this.enPassantColor=="w")) {
					if (this.enPassantJ==(j-1)) {
						if(this.setOption(3,j-1,color0)) {cntopt++};	
					}
					if (this.enPassantJ==(j+1)) {
						if(this.setOption(3,j+1,color0)) {cntopt++};	
					}
				}	
			}	
			return(cntopt);
		}
		this.knightOptions1=function(i,j,color0) {
			//knight moves options
			cntopt=0;
			if (color0=="w") {
				color2="b";
			}
			if (color0=="b") {
				color2="w";
			}
				
			if ((i<7) && (j>1)) {
				if (this.fields[i+2][j-1].piece1=="nula") {
					if(this.setOption(i+2,j-1,color0)) {cntopt++} ;	
				}
				else {
					if (this.fields[i+2][j-1].piece1.substr(1,1)==color2) {
						if(this.setOption(i+2,j-1,color0)) {cntopt++};	
					}
				}	
			}	
			if ((i<8) && (j>2)) {
				if (this.fields[i+1][j-2].piece1=="nula") {
					if(this.setOption(i+1,j-2,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i+1][j-2].piece1.substr(1,1)==color2) {
						if(this.setOption(i+1,j-2,color0)) {cntopt++};	
					}
				}	
			}	
			if ((i<7) && (j<8)) {
				if (this.fields[i+2][j+1].piece1=="nula") {
					if(this.setOption(i+2,j+1,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i+2][j+1].piece1.substr(1,1)==color2) {
						if(this.setOption(i+2,j+1,color0)) {cntopt++};	
					}
				}	
			}
			if ((i<8) && (j<7)) {
				if (this.fields[i+1][j+2].piece1=="nula") {
					if(this.setOption(i+1,j+2,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i+1][j+2].piece1.substr(1,1)==color2) {
						if(this.setOption(i+1,j+2,color0)) {cntopt++};	
					}
				}	
			}	
			if ((i>2) && (j>1)) {
				if (this.fields[i-2][j-1].piece1=="nula") {
					if(this.setOption(i-2,j-1,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i-2][j-1].piece1.substr(1,1)==color2) {
						if(this.setOption(i-2,j-1,color0)) {cntopt++};	
					}
				}	
			}	
			if ((i>1) && (j>2)) {
				if (this.fields[i-1][j-2].piece1=="nula") {
					if(this.setOption(i-1,j-2,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i-1][j-2].piece1.substr(1,1)==color2) {
						if(this.setOption(i-1,j-2,color0)) {cntopt++};	
					}
				}	
			}	
			if ((i>2) && (j<8)) {
				if (this.fields[i-2][j+1].piece1=="nula") {
					if(this.setOption(i-2,j+1,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i-2][j+1].piece1.substr(1,1)==color2) {
						if(this.setOption(i-2,j+1,color0)) {cntopt++};	
					}
				}	
			}
			if ((i>1) && (j<7)) {
				if (this.fields[i-1][j+2].piece1=="nula") {
					if(this.setOption(i-1,j+2,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i-1][j+2].piece1.substr(1,1)==color2) {
						if(this.setOption(i-1,j+2,color0)) {cntopt++};	
					}
				}	
			}	
			return(cntopt);
		}
		this.rookOptions1=function(i,j,color0) {
			//rook moves options
			cntopt=0;
			if (color0=="w") {
				color2="b";
			}
			if (color0=="b") {
				color2="w";
			}
			conti0=true;
			i0=i;
			while (conti0==true) {
				i0=i0+1;
				if (i0>8) { 
					conti0=false;
					break;
				}
			
				if (this.fields[i0][j].piece1=="nula") {
					if(this.setOption(i0,j,color0)) {cntopt++};		
				}
				else {
					if (this.fields[i0][j].piece1.substr(1,1)==color2) {
						if(this.setOption(i0,j,color0)) {cntopt++};
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}	
			}
		
			conti0=true;
			i0=i;
			while (conti0==true) {
				i0=i0-1;
				if (i0<1) { 
					conti0=false;
					break;
				}
				
				if (this.fields[i0][j].piece1=="nula") {
					if(this.setOption(i0,j,color0)) {cntopt++};
				}
				else {
					if (this.fields[i0][j].piece1.substr(1,1)==color2) {
						if(this.setOption(i0,j,color0)) {cntopt++};	
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}	
			}
			conti0=true;
			j0=j;
			while (conti0==true) {
				j0=j0+1;
				if (j0>8) { 
					conti0=false;
					break;
				}
				if (this.fields[i][j0].piece1=="nula") {
					if(this.setOption(i,j0,color0)) {cntopt++};
				}
				else {
					if (this.fields[i][j0].piece1.substr(1,1)==color2) {
						if(this.setOption(i,j0,color0)) {cntopt++};
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}	
			}
			conti0=true;
			j0=j;
			while (conti0==true) {
				j0=j0-1;
				if (j0<1) { 
					conti=false;
					break;
				}
				if (this.fields[i][j0].piece1=="nula") {
					if(this.setOption(i,j0,color0)) {cntopt++};
				}
				else {
					if (this.fields[i][j0].piece1.substr(1,1)==color2) {
						if(this.setOption(i,j0,color0)) {cntopt++};	
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}	
			}
			return(cntopt);
		}
		this.bishopOptions1=function(i,j,color0) {
			//bishops move options
			cntopt=0;
			if (color0=="w") {
				color2="b";
			}
			if (color0=="b") {
				color2="w";
			}
			conti0=true;
			i0=i;
			j0=j;
			while (conti0==true) {
				
				i0=i0+1;
				j0=j0+1;
				
				if (i0>8) { 
					conti0=false;
					break;
				}
				if (j0>8) { 
					conti0=false;
					break;
				}
			
				if (this.fields[i0][j0].piece1=="nula") {
			
					if(this.setOption(i0,j0,color0)) {cntopt++};
					
				}
				
				else {
					if (this.fields[i0][j0].piece1.substr(1,1)==color2) {
						if(this.setOption(i0,j0,color0)) {cntopt++};
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}
				
				
			}
		
			conti0=true;
			i0=i;
			j0=j;
			while (conti0==true) {
				i0=i0-1;
				j0=j0-1;
				if (i0<1) { 
					conti0=false;
					break;
				}
				if (j0<1) { 
					conti0=false;
					break;
				}
				if (this.fields[i0][j0].piece1=="nula") {
					if(this.setOption(i0,j0,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i0][j0].piece1.substr(1,1)==color2) {
						if(this.setOption(i0,j0,color0)) {cntopt++};
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}	
			}
			conti0=true;
			i0=i;
			j0=j;
			while (conti0==true) {
				j0=j0-1;
				i0=i0+1;
				if (j0<1) { 
					conti0=false;
					break;
				}
				if (i0>8) { 
					conti0=false;
					break;
				}
				if (this.fields[i0][j0].piece1=="nula") {
					if(this.setOption(i0,j0,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i0][j0].piece1.substr(1,1)==color2) {
						if(this.setOption(i0,j0,color0)) {cntopt++};	
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}	
			}
			conti0=true;
			i0=i;
			j0=j;
			while (conti0==true) {
				j0=j0+1;
				i0=i0-1;
				if (j0>8) { 
					conti0=false;
					break;
				}
				if (i0<1) { 
					conti0=false;
					break;
				}
				if (this.fields[i0][j0].piece1=="nula") {
					if(this.setOption(i0,j0,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i0][j0].piece1.substr(1,1)==color2) {
						if(this.setOption(i0,j0,color0)) {cntopt++};	
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}	
			}
			return(cntopt);
		}
		this.queenOptions1=function(i,j,color0) {
			//Queen mnove options
			cntopt=0;
			if (color0=="w") {
				color2="b";
			}
			if (color0=="b") {
				color2="w";
			}
			conti0=true;
			i0=i;
			while (conti0==true) {
				i0=i0+1;
				if (i0>8) { 
					conti0=false;
					break;
				}
				if (this.fields[i0][j].piece1=="nula") {
					if(this.setOption(i0,j,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i0][j].piece1.substr(1,1)==color2) {
						if(this.setOption(i0,j,color0)) {cntopt++};	
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}	
			}
		
			conti0=true;
			i0=i;
			while (conti0==true) {
				i0=i0-1;
				if (i0<1) { 
					conti0=false;
					break;
				}
				if (this.fields[i0][j].piece1=="nula") {
					if(this.setOption(i0,j,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i0][j].piece1.substr(1,1)==color2) {
						if(this.setOption(i0,j,color0)) {cntopt++};	
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}	
			}
			conti0=true;
			j0=j;
			while (conti0==true) {
				j0=j0+1;
				if (j0>8) { 
					conti0=false;
					break;
				}
				if (this.fields[i][j0].piece1=="nula") {
					if(this.setOption(i,j0,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i][j0].piece1.substr(1,1)==color2) {
						if(this.setOption(i,j0,color0)) {cntopt++};
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}	
			}
			conti0=true;
			j0=j;
			while (conti0==true) {
				j0=j0-1;
				if (j0<1) { 
					conti0=false;
					break;
				}
				if (this.fields[i][j0].piece1=="nula") {
					if(this.setOption(i,j0,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i][j0].piece1.substr(1,1)==color2) {
						if(this.setOption(i,j0,color0)) {cntopt++};	
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}	
			}
			conti0=true;
			i0=i;
			j0=j;
			while (conti0==true) {
				i0=i0+1;
				j0=j0+1;
				if (i0>8) { 
					conti0=false;
					break;
				}
				if (j0>8) { 
					conti0=false;
					break;
				}
				if (this.fields[i0][j0].piece1=="nula") {
					if(this.setOption(i0,j0,color0)) {cntopt++};
				}
				else {
					if (this.fields[i0][j0].piece1.substr(1,1)==color2) {
						if(this.setOption(i0,j0,color0)) {cntopt++};	
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}	
			}
		
			conti0=true;
			i0=i;
			j0=j;
			while (conti0==true) {
				i0=i0-1;
				j0=j0-1;
				if (i0<1) { 
					conti0=false;
					break;
				}
				if (j0<1) { 
					conti0=false;
					break;
				}
				if (this.fields[i0][j0].piece1=="nula") {
					if(this.setOption(i0,j0,color0)) {cntopt++};
				}
				else {
					if (this.fields[i0][j0].piece1.substr(1,1)==color2) {
						if(this.setOption(i0,j0,color0)) {cntopt++};	
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}	
			}
			conti0=true;
			i0=i;
			j0=j;
			while (conti0==true) {
				j0=j0-1;
				i0=i0+1;
				if (j0<1) { 
					conti0=false;
					break;
				}
				if (i0>8) { 
					conti0=false;
					break;
				}
				if (this.fields[i0][j0].piece1=="nula") {
					if(this.setOption(i0,j0,color0)) {cntopt++};
				}
				else {
					if (this.fields[i0][j0].piece1.substr(1,1)==color2) {
						if(this.setOption(i0,j0,color0)) {cntopt++};	
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}	
			}
			conti0=true;
			i0=i;
			j0=j;
			while (conti0==true) {
				j0=j0+1;
				i0=i0-1;
				if (j0>8) { 
					conti0=false;
					break;
				}
				if (i0<1) { 
					conti0=false;
					break;
				}
				if (this.fields[i0][j0].piece1=="nula") {
					if(this.setOption(i0,j0,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i0][j0].piece1.substr(1,1)==color2) {
						if(this.setOption(i0,j0,color0)) {cntopt++};
						conti0=false;
					}
					else {
						conti0=false;
					}	
				}	
			}
			return(cntopt);
		}
		this.kingOptions1=function(i,j,color0) {
			//King moves options
			cntopt=0;
			if (color0=="w") {
				color2="b";
			}
			if (color0=="b") {
				color2="w";
			}
			
			if ((color0=="w") && (!this.kingWcheck) && (this.castleWK) && (this.fields[i][j+1].piece1=="nula") && (this.fields[i][j+2].piece1=="nula") && (this.checkCheck(color0,i,j+2,this.fields[this.selectedi][this.selectedj].piece1,false)==false) && (this.checkCheck(color0,i,j+1,this.fields[this.selectedi][this.selectedj].piece1,false)==false)) {
				if(this.setOption(i,j+2,color0)) {cntopt++};
			}	
			if ((color0=="w") && (!this.kingWcheck) && (this.castleWQ) && (this.fields[i][j-1].piece1=="nula") && (this.fields[i][j-2].piece1=="nula") && (this.fields[i][j-3].piece1=="nula") && (this.checkCheck(color0,i,j-2,this.fields[this.selectedi][this.selectedj].piece1,false)==false) && (this.checkCheck(color0,i,j-1,this.fields[this.selectedi][this.selectedj].piece1,false)==false)) {
				if(this.setOption(i,j-2,color0)) {cntopt++};
			}
			if ((color0=="b") && (!this.kingBcheck) && (this.castleBK) && (this.fields[i][j+1].piece1=="nula") && (this.fields[i][j+2].piece1=="nula") && (this.checkCheck(color0,i,j+2,this.fields[this.selectedi][this.selectedj].piece1,false)==false) && (this.checkCheck(color0,i,j+1,this.fields[this.selectedi][this.selectedj].piece1,false)==false)) {
				if(this.setOption(i,j+2,color0)) {cntopt++};
			}	
			if ((color0=="b") && (!this.kingBcheck) && (this.castleBQ) && (this.fields[i][j-1].piece1=="nula") && (this.fields[i][j-2].piece1=="nula") && (this.fields[i][j-3].piece1=="nula") && (this.checkCheck(color0,i,j-2,this.fields[this.selectedi][this.selectedj].piece1,false)==false) && (this.checkCheck(color0,i,j-1,this.fields[this.selectedi][this.selectedj].piece1,false)==false)) {
				if(this.setOption(i,j-2,color0)) {cntopt++};
			}	
			i0=i;
			i0=i0+1;
			if (i0<9) { 
				if (this.fields[i0][j].piece1=="nula") {
					if(this.setOption(i0,j,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i0][j].piece1.substr(1,1)==color2) {
						if(this.setOption(i0,j,color0)) {cntopt++};		
						
					}
				}	
			}

			i0=i;
			i0=i0-1;
			if (i0>0) { 
				if (this.fields[i0][j].piece1=="nula") {
						if(this.setOption(i0,j,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i0][j].piece1.substr(1,1)==color2) {
						if(this.setOption(i0,j,color0)) {cntopt++};		
					}
				}	
			}	
			j0=j;
			j0=j0+1;
			if (j0<9) { 
				if (this.fields[i][j0].piece1=="nula") {
					if(this.setOption(i,j0,color0)) {cntopt++};		
				}
				else {
					if (this.fields[i][j0].piece1.substr(1,1)==color2) {
					if(this.setOption(i,j0,color0)) {cntopt++};
					}	
				}	
			}
			j0=j;
			j0=j0-1;
			if (j0>0) { 
				if (this.fields[i][j0].piece1=="nula") {
					if(this.setOption(i,j0,color0)) {cntopt++};	
				}
				else {
					if (this.fields[i][j0].piece1.substr(1,1)==color2) {
						if(this.setOption(i,j0,color0)) {cntopt++};	
					}
				}	
			}	
			i0=i;
			j0=j;
			i0=i0+1;
			j0=j0+1;
			if (i0<9) { 
				if (j0<9) { 
					if (this.fields[i0][j0].piece1=="nula") {
						if(this.setOption(i0,j0,color0)) {cntopt++};	
					}		
					else {
						if (this.fields[i0][j0].piece1.substr(1,1)==color2) {
							if(this.setOption(i0,j0,color0)) {cntopt++};	
						}
					}	
				}		
			}	
			i0=i;
			j0=j;
			i0=i0-1;
			j0=j0-1;
			if (i0>0) { 
				if (j0>0) { 
					if (this.fields[i0][j0].piece1=="nula") {
						if(this.setOption(i0,j0,color0)) {cntopt++};	
					}
					else {
						if (this.fields[i0][j0].piece1.substr(1,1)==color2) {
							if(this.setOption(i0,j0,color0)) {cntopt++};	
						}
					}	
				}	
			}
			i0=i;
			j0=j;
			j0=j0-1;
			i0=i0+1;
			if (j0>0) { 
				if (i0<9) { 
					if (this.fields[i0][j0].piece1=="nula") {
						if(this.setOption(i0,j0,color0)) {cntopt++};	
					}
					else {
						if (this.fields[i0][j0].piece1.substr(1,1)==color2) {
							if(this.setOption(i0,j0,color0)) {cntopt++};
						}
					}	
				}
			}
			
			i0=i;
			j0=j;
			j0=j0+1;
			i0=i0-1;
			if (j0<9) { 
				if (i0>0) { 
					if (this.fields[i0][j0].piece1=="nula") {
						if(this.setOption(i0,j0,color0)) {cntopt++};
					}
					else {
						if (this.fields[i0][j0].piece1.substr(1,1)==color2) {
							if(this.setOption(i0,j0,color0)) {cntopt++};	
						}	
					}	
				}
				
			}
			return(cntopt);
		}
		this.checkCheck = function(colorX,posIX,posJX,piece0X,kingX) {
			//function to check if king/field is in check	
	
			check0=false;
			if (kingX==false) {
			
				pieceX=this.fields[posIX][posJX].piece1;
				
				this.fields[posIX][posJX].piece1=piece0X;
			
			    
				this.fields[this.selectedi][this.selectedj].piece1="nula";
				if (piece0X.substr(0,1)=="K") {
					kralI=posIX;
					kralJ=posJX;
				}
				else {
					if (colorX=="b") {
						kralI=this.kingBpositionI;
						kralJ=this.kingBpositionJ;
					}
					else {
						kralI=this.kingWpositionI;
						kralJ=this.kingWpositionJ;
					}
				}	
			}	
			
			if (colorX=="b") {
				color2="w";
				//check0=this.kingBcheck;
				if (kingX) {
					kralI=this.kingBpositionI;
					kralJ=this.kingBpositionJ;
				}
			}
			if (colorX=="w") {
				color2="b";
				//check0=this.kingWcheck;
				if (kingX) {
					kralI=this.kingWpositionI;
					kralJ=this.kingWpositionJ;
				}
			}
			
			
			//pependicular check check
			
			if (check0==false) {
				contx=true;
				y0=kralI;
				j=kralJ;
				while (contx==true) {
					y0=y0+1;
					if (y0>8) { 
						contx=false;
						break;
					}
					
					farba=this.fields[y0][j].piece1.substr(1,1);
					kus=this.fields[y0][j].piece1.substr(0,1);
					
					if (this.fields[y0][j].piece1!=="nula") {	
						if (farba==color2) {	
						    
							if ((kus=="Q") || (kus=="R")) {
								check0=true;
								contx=false;
								break;
							}
							if ((y0-kralI==1) && (kus=="K")) {
								check0=true;
								contx=false;
								break;
							}
							
							contx=false;
							break;
						}		
						else {
							contx=false;
							break;
						}	
					}	
				}
			}
			
			if (check0==false) {
				contx=true;
				y0=kralI;
				j=kralJ;
				while (contx==true) {
					y0=y0-1;
					if (y0<1) { 
						contx=false;
						break;
					}
					
					farba=this.fields[y0][j].piece1.substr(1,1);
					kus=this.fields[y0][j].piece1.substr(0,1);
					
					if (this.fields[y0][j].piece1!=="nula") {	
						if (farba==color2) {	
							if ((kus=="Q") || (kus=="R")) {
								check0=true;
								contx=false;
								break;
							}
							if ((y0-kralI==-1) && (kus=="K")) {
								check0=true;
								contx=false;
								break;
							}
							contx=false;
							break;
						}		
						else {
							contx=false;
							break;
						}	
					}	
				}
			}
			
			if (check0==false) {
				contx=true;
				i=kralI;
				z0=kralJ;
				while (contx==true) {
					z0=z0+1;
					if (z0>8) { 
						contx=false;
						break;
					}
					
					farba=this.fields[i][z0].piece1.substr(1,1);
					kus=this.fields[i][z0].piece1.substr(0,1);
					
					if (this.fields[i][z0].piece1!=="nula") {	
						if (farba==color2) {	
							if ((kus=="Q") || (kus=="R") ) {
								check0=true;
								contx=false;
								break;
							}
							if ((z0-kralJ==1) && (kus=="K")) {
								check0=true;
								contx=false;
								break;
							}
							contx=false;
							break;
						}		
						else {
							contx=false;
							break;
						}	
					}	
				}
			}
			
			if (check0==false) {
				contx=true;
				i=kralI;
				z0=kralJ;
				while (contx==true) {
					z0=z0-1;
					if (z0<1) { 
						contx=false;
						break;
					}
					
					farba=this.fields[i][z0].piece1.substr(1,1);
					kus=this.fields[i][z0].piece1.substr(0,1);
					
					if (this.fields[i][z0].piece1!=="nula") {	
						if (farba==color2) {	
							if ((kus=="Q") || (kus=="R") ) {
								check0=true;
								contx=false;
								break;
							}
							if ((z0-kralJ==-1) && (kus=="K")) {
								check0=true;
								contx=false;
								break;
							}
							
							contx=false;
							break;
						}		
						else {
							contx=false;
							break;
						}	
					}	
				}
			}
			
			//diagonal check check 
			
			if (check0==false) {
				contx=true;
				y0=kralI;
				z0=kralJ;
				while (contx==true) {
					y0=y0+1;
					z0=z0+1;
					if (y0>8) { 
						contx=false;
						break;
					}
					if (z0>8) { 
						contx=false;
						break;
					}
					
					farba=this.fields[y0][z0].piece1.substr(1,1);
					kus=this.fields[y0][z0].piece1.substr(0,1);
					
					if (this.fields[y0][z0].piece1!=="nula") {	
						if (farba==color2) {	
							if ((kus=="Q") || (kus=="B")) {
								check0=true;
								contx=false;
								break;
							}
							if ((y0-kralI==1) && (z0-kralJ==1) && (kus=="K")) {
								check0=true;
								contx=false;
								break;
							}
							if ((colorX=="b") && (kralI-y0==1) && (kus=="p")){
								check0=true;
								contx=false;
								break;
							}	
							if ((colorX=="w") && (y0-kralI==1) && (kus=="p")){
								check0=true;
								contx=false;
								break;
							}	
							contx=false;
							break;
						}		
						else {
							contx=false;
							break;
						}	
					}	
				}
			}
			
			if (check0==false) {
				contx=true;
				y0=kralI;
				z0=kralJ;
				while (contx==true) {
					y0=y0+1;
					z0=z0-1;
					if (y0>8) { 
						contx=false;
						break;
					}
					if (z0<1) { 
						contx=false;
						break;
					}
					
					farba=this.fields[y0][z0].piece1.substr(1,1);
					kus=this.fields[y0][z0].piece1.substr(0,1);
					
					if (this.fields[y0][z0].piece1!=="nula") {	
						if (farba==color2) {	
							if ((kus=="Q") || (kus=="B") ) {
								check0=true;
								contx=false;
								break;
							}
							if ((y0-kralI==1) && (z0-kralJ==-1) && (kus=="K")) {
								check0=true;
								contx=false;
								break;
							}
							if ((colorX=="b") & (kralI-y0==1) & (kus=="p")){
								check0=true;
								contx=false;
								break;
							}	
							if ((colorX=="w") & (y0-kralI==1) & (kus=="p")){
								check0=true;
								contx=false;
								break;
							}	
							contx=false;
							break;
						}		
						else {
							contx=false;
							break;
						}	
					}	
				}
			}
			
			if (check0==false) {
				contx=true;
				y0=kralI;
				z0=kralJ;
				while (contx==true) {
					y0=y0-1;
					z0=z0-1;
					if (y0<1) { 
						contx=false;
						break;
					}
					if (z0<1) { 
						contx=false;
						break;
					}
					
					farba=this.fields[y0][z0].piece1.substr(1,1);
					kus=this.fields[y0][z0].piece1.substr(0,1);
					
					if (this.fields[y0][z0].piece1!=="nula") {	
						if (farba==color2) {	
							if ((kus=="Q") || (kus=="B") ) {
								check0=true;
								contx=false;
								break;
							}
							if ((y0-kralI==-1) && (z0-kralJ==-1) && (kus=="K")) {
								check0=true;
								contx=false;
								break;
							}
							if ((colorX=="b") && (kralI-y0==1) && (kus=="p")){
								check0=true;
								contx=false;
								break;
							}	
							if ((colorX=="w") && (y0-kralI==1) && (kus=="p")){
								check0=true;
								contx=false;
								break;
							}	
							contx=false;
							break;
						}		
						else {
							contx=false;
							break;
						}	
					}	
				}
			}
		
			if (check0==false) {
				contx=true;
				y0=kralI;
				z0=kralJ;
				while (contx==true) {
					y0=y0-1;
					z0=z0+1;
					if (y0<1) { 
						contx=false;
						break;
					}
					if (z0>8) { 
						contx=false;
						break;
					}
					
					farba=this.fields[y0][z0].piece1.substr(1,1);
					kus=this.fields[y0][z0].piece1.substr(0,1);
					
					if (this.fields[y0][z0].piece1!=="nula") {	
						if (farba==color2) {	
							if ((kus=="Q") || (kus=="B")) {
								check0=true;
								contx=false;
								break;
							}
							if ((y0-kralI==-1) && (z0-kralJ==1) && (kus=="K")) {
								check0=true;
								contx=false;
								break;
							}
							if ((colorX=="b") && (kralI-y0==1) && (kus=="p")){
								check0=true;
								contx=false;
								break;
							}	
							if ((colorX=="w") && (y0-kralI==1) && (kus=="p")){
								check0=true;
								contx=false;
								break;
							}	
							contx=false;
							break;
						}		
						else {
							contx=false;
							break;
						}	
					}	
				}
			}
			
			// L shape checks check
			
			if (check0==false) {
			
				y0=kralI;
				z0=kralJ;
				y0=y0+1;
				z0=z0-2;
				if ((y0<9) && (z0>0)) {
					farba=this.fields[y0][z0].piece1.substr(1,1);
					kus=this.fields[y0][z0].piece1.substr(0,1);
					if ((kus =="N") && (farba==color2)) {	
						check0=true;
					}	
				}	
			}
			if (check0==false) {
			
				y0=kralI;
				z0=kralJ;
				y0=y0+1;
				z0=z0+2;
				if ((y0<9) && (z0<9)) {
					farba=this.fields[y0][z0].piece1.substr(1,1);
					kus=this.fields[y0][z0].piece1.substr(0,1);
					if ((kus =="N") && (farba==color2)) {	
						check0=true;
					}	
				}		
			}
			if (check0==false) {
			
				y0=kralI;
				z0=kralJ;
				y0=y0+2;
				z0=z0+1;
				if ((y0<9) && (z0<9)) {
					farba=this.fields[y0][z0].piece1.substr(1,1);
					kus=this.fields[y0][z0].piece1.substr(0,1);
					if ((kus =="N") && (farba==color2)) {	
						check0=true;
					}	
				}		
			}
			if (check0==false) {
			
				y0=kralI;
				z0=kralJ;
				y0=y0+2;
				z0=z0-1;
				if ((y0<9) && (z0>0)) {
					farba=this.fields[y0][z0].piece1.substr(1,1);
					kus=this.fields[y0][z0].piece1.substr(0,1);
					if ((kus =="N") && (farba==color2)) {	
						check0=true;
					}	
				}			
			}
			if (check0==false) {
			
				y0=kralI;
				z0=kralJ;
				y0=y0-1;
				z0=z0-2;
				if ((y0>0) && (z0>0)) {
					farba=this.fields[y0][z0].piece1.substr(1,1);
					kus=this.fields[y0][z0].piece1.substr(0,1);
					if ((kus =="N") && (farba==color2)) {	
						check0=true;
					}	
				}	
			}
			if (check0==false) {
			
				y0=kralI;
				z0=kralJ;
				y0=y0-1;
				z0=z0+2;
				if ((y0>0) && (z0<9)) {
					farba=this.fields[y0][z0].piece1.substr(1,1);
					kus=this.fields[y0][z0].piece1.substr(0,1);
					if ((kus =="N") && (farba==color2)) {	
						check0=true;
					}	
				}		
			}
			if (check0==false) {
			
				y0=kralI;
				z0=kralJ;
				y0=y0-2;
				z0=z0+1;
				if ((y0>0) && (z0<9)) {
					farba=this.fields[y0][z0].piece1.substr(1,1);
					kus=this.fields[y0][z0].piece1.substr(0,1);
					if ((kus =="N") && (farba==color2)) {	
						check0=true;
					}	
				}			
			}
			if (check0==false) {
			
				y0=kralI;
				z0=kralJ;
				y0=y0-2;
				z0=z0-1;
				if ((y0>0) && (z0>0)) {
					farba=this.fields[y0][z0].piece1.substr(1,1);
					kus=this.fields[y0][z0].piece1.substr(0,1);
					if ((kus =="N") && (farba==color2)) {	
						check0=true;
					}	
				}		
			}
			if (kingX==false) {
				
				this.fields[posIX][posJX].piece1=pieceX;
				this.fields[this.selectedi][this.selectedj].piece1=piece0X;
				
			}	
		  
			return(check0);
			
		}	
		
	}