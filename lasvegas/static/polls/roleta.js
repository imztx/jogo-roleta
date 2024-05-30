

const data = document.currentScript.dataset;
var balance = parseFloat(data.balance);
var username = data.username

let bankValue = balance;

const casa = {
    0: '0', 1: '32', 2: '15', 3: '19', 4: '4', 5: '21', 6: '2', 7: '25', 8: '17', 9: '34', 10: '6', 11: '27', 12: '13', 13: '36', 14: '11', 15: '30', 16: '8', 17: '23', 18: '10', 19: '5', 20: '24', 21: '16', 22: '33', 23: '1', 24: '20', 25: '14', 26: '31', 27: '9', 28: '22', 29: '18', 30: '29', 31: '7', 32: '28', 33: '12', 34: '35', 35: '3', 36: '26', 37: '0'
}


let currentBet = 0;
let wager = 5;
let lastWager = 0;
let bet = [];
let numbersBet = [];
let previousNumbers = [];
let winningSpin = 0;

let numRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
let wheelnumbersAC = [0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32];

let container = document.createElement('div');
container.setAttribute('id', 'container');
document.body.append(container);

startGame();

let wheel = document.getElementsByClassName('wheel')[0];
let ballTrack = document.getElementsByClassName('ballTrack')[0];


$(document).ready(function() {
	$('#formMov').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			data: $('#formMov').serialize(),
			url: '/roleta',
			success: function(data, status){
				spin(data.casa_certa, data.aposta_total, data.aposta_vencedora, data.lucro)
			}
		});
	});
});

function resetGame(){
	bankValue = 0;
	currentBet = 0;
	wager = 5;
	bet = [];
	numbersBet = [];
	previousNumbers = [];
	document.getElementById('betting_board').remove();
	document.getElementById('notification').remove();
	buildBettingBoard();
}

function startGame(){
	buildBettingBoard();
}

function gameOver(){
	let notification = document.createElement('div');
	notification.setAttribute('id', 'notification');
		let nSpan = document.createElement('span');
		nSpan.setAttribute('class', 'nSpan');
		nSpan.innerText = 'Perdeu tudo!!';
		notification.append(nSpan);

		let nBtn = document.createElement('div');
		nBtn.setAttribute('class', 'nBtn');
		nBtn.innerText = 'Jogar novamente';	
		nBtn.onclick = function(){
			resetGame();
		};
		notification.append(nBtn);
	container.prepend(notification);
}

function buildBettingBoard(){
	let bettingBoard = document.createElement('div');
	bettingBoard.setAttribute('id', 'betting_board');

	let wl = document.createElement('div');
	wl.setAttribute('class', 'winning_lines');
	
	var wlttb = document.createElement('div');
	wlttb.setAttribute('id', 'wlttb_top');
	wlttb.setAttribute('class', 'wlttb');
	for(i = 0; i < 11; i++){
		let j = i;
		var ttbbetblock = document.createElement('div');
		ttbbetblock.setAttribute('class', 'ttbbetblock');
		var numA = (1 + (3 * j));
		var numB = (2 + (3 * j));
		var numC = (3 + (3 * j));
		var numD = (4 + (3 * j));
		var numE = (5 + (3 * j));
		var numF = (6 + (3 * j));
		let num = numA + ', ' + numB + ', ' + numC + ', ' + numD + ', ' + numE + ', ' + numF;
		var objType = 'double_street';
		ttbbetblock.onclick = function(){
			setBet(this, num, objType, 5);
		};
		ttbbetblock.oncontextmenu = function(e){
			e.preventDefault();
			removeBet(this, num, objType, 5);
		};
		wlttb.append(ttbbetblock);
	}
	wl.append(wlttb);

	for(c =  1; c < 4; c++){
		let d = c;
		var wlttb = document.createElement('div');
		wlttb.setAttribute('id', 'wlttb_'+c);
		wlttb.setAttribute('class', 'wlttb');
		for(i = 0; i < 12; i++){
			let j = i;
			var ttbbetblock = document.createElement('div');
			ttbbetblock.setAttribute('class', 'ttbbetblock');
			ttbbetblock.onclick = function(){
				if(d == 1 || d == 2){
					var numA = ((2 - (d - 1)) + (3 * j));
					var numB = ((3 - (d - 1)) + (3 * j));
					var num = numA + ', ' + numB;
				}
				else{
					var numA = (1 + (3 * j));
					var numB = (2 + (3 * j));
					var numC = (3 + (3 * j));
					var num = numA + ', ' + numB + ', ' + numC;
				}
				var objType = (d == 3)? 'street' : 'split';
				var odd = (d == 3)? 11 : 17;
				setBet(this, num, objType, odd);
			};
			ttbbetblock.oncontextmenu = function(e){
				e.preventDefault();
				if(d == 1 || d == 2){
					var numA = ((2 - (d - 1)) + (3 * j));
					var numB = ((3 - (d - 1)) + (3 * j));
					var num = numA + ', ' + numB;
				}
				else{
					var numA = (1 + (3 * j));
					var numB = (2 + (3 * j));
					var numC = (3 + (3 * j));
					var num = numA + ', ' + numB + ', ' + numC;
				}
				var objType = (d == 3)? 'street' : 'split';
				var odd = (d == 3)? 11 : 17;
				removeBet(this, num, objType, odd);
			};
			wlttb.append(ttbbetblock);
		}
		wl.append(wlttb);
	}

	for(c = 1; c < 12; c++){
		let d = c;
		var wlrtl = document.createElement('div');
		wlrtl.setAttribute('id', 'wlrtl_'+c);
		wlrtl.setAttribute('class', 'wlrtl');
		for(i = 1; i < 4; i++){
			let j = i;
			var rtlbb = document.createElement('div');
			rtlbb.setAttribute('class', 'rtlbb'+i);
			var numA = (3 + (3 * (d - 1))) - (j - 1);
			var numB = (6 + (3 * (d - 1))) - (j - 1);
			let num = numA + ', ' + numB;
			rtlbb.onclick = function(){
				setBet(this, num, 'split', 17);
			};
			rtlbb.oncontextmenu = function(e){
				e.preventDefault();
				removeBet(this, num, 'split', 17);
			};
			wlrtl.append(rtlbb);
		}
		wl.append(wlrtl);
	}
	
	for(c = 1; c < 3; c++){
		var wlcb = document.createElement('div');
		wlcb.setAttribute('id', 'wlcb_'+c);
		wlcb.setAttribute('class', 'wlcb');
		for(i = 1; i < 12; i++){
			let count = (c == 1)? i : i + 11;
			var cbbb = document.createElement('div');
			cbbb.setAttribute('id', 'cbbb_'+count);
			cbbb.setAttribute('class', 'cbbb');
			var numA = '2';
			var numB = '3';
			var numC = '5';
			var numD = '6';
			let num = (count >= 1 && count < 12)? (parseInt(numA) + ((count - 1) * 3)) + ', ' + (parseInt(numB)+((count - 1) * 3)) + ', ' + (parseInt(numC)+((count - 1) * 3)) + ', ' + (parseInt(numD)+((count - 1) * 3)) : ((parseInt(numA) - 1) + ((count - 12) * 3)) + ', ' + ((parseInt(numB) - 1)+((count - 12) * 3)) + ', ' + ((parseInt(numC) - 1)+((count - 12) * 3)) + ', ' + ((parseInt(numD) - 1)+((count - 12) * 3));
			var objType = 'corner_bet';
			cbbb.onclick = function(){
				setBet(this, num, objType, 8);
			};
			cbbb.oncontextmenu = function(e){
				e.preventDefault();
				removeBet(this, num, objType, 8);
			};
			wlcb.append(cbbb);
		}
		wl.append(wlcb);
	}

	bettingBoard.append(wl);

	let bbtop = document.createElement('div');
	bbtop.setAttribute('class', 'bbtop');
	let bbtopBlocks = ['1 a 18', '19 a 36'];
	for(i = 0; i < bbtopBlocks.length; i++){
		let f = i;
		var bbtoptwo = document.createElement('div');
		bbtoptwo.setAttribute('class', 'bbtoptwo');
		let num = (f == 0)? '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18' : '19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36';
		var objType = (f == 0)? 'outside_low' : 'outside_high';
		bbtoptwo.onclick = function(){
			setBet(this, num, objType, 1);
		};
		bbtoptwo.oncontextmenu = function(e){
			e.preventDefault();
			removeBet(this, num, objType, 1);
		};
		bbtoptwo.innerText = bbtopBlocks[i];
		bbtop.append(bbtoptwo);
	}
	bettingBoard.append(bbtop);

	let numberBoard = document.createElement('div');
	numberBoard.setAttribute('class', 'number_board');

	let zero = document.createElement('div');
	zero.setAttribute('class', 'number_0');
	var objType = 'zero';
	var odds = 35;
	zero.onclick = function(){
		setBet(this, '0', objType, odds);
	};
	zero.oncontextmenu = function(e){
		e.preventDefault();
		removeBet(this, '0', objType, odds);
	};
	let nbnz = document.createElement('div');
	nbnz.setAttribute('class', 'nbn');
	nbnz.innerText = '0';
	zero.append(nbnz);
	numberBoard.append(zero);
	
	var numberBlocks = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, '2 : 1', 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, '2 : 1', 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, '2 : 1'];
	var redBlocks = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
	for(i = 0; i < numberBlocks.length; i++){
		let a = i;
		var nbClass = (numberBlocks[i] == '2 : 1')? 'tt1_block' : 'number_block';
		var colourClass = (redBlocks.includes(numberBlocks[i]))? ' redNum' : ((nbClass == 'number_block')? ' blackNum' : '');
		var numberBlock = document.createElement('div');
		numberBlock.setAttribute('class', nbClass + colourClass);
		numberBlock.onclick = function(){
			if(numberBlocks[a] != '2 : 1'){
				setBet(this, ''+numberBlocks[a]+'', 'inside_whole', 35);
			}else{
				num = (a == 12)? '3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36' : ((a == 25)? '2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35' : '1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34');
				setBet(this, num, 'outside_column', 2);
			}
		};
		numberBlock.oncontextmenu = function(e){
			e.preventDefault();
			if(numberBlocks[a] != '2 : 1'){
				removeBet(this, ''+numberBlocks[a]+'', 'inside_whole', 35);
			}else{
				num = (a == 12)? '3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36' : ((a == 25)? '2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35' : '1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34');
				removeBet(this, num, 'outside_column', 2);
			}
		};
		var nbn = document.createElement('div');
		nbn.setAttribute('class', 'nbn');
		nbn.innerText = numberBlocks[i];
		numberBlock.append(nbn);
		numberBoard.append(numberBlock);
	}
	bettingBoard.append(numberBoard);

	let bo3Board = document.createElement('div');
	bo3Board.setAttribute('class', 'bo3_board');	
	let bo3Blocks = ['1 a 12', '13 a 24', '25 a 36'];
	for(i = 0; i < bo3Blocks.length; i++){
		let b = i;
		var bo3Block = document.createElement('div');
		bo3Block.setAttribute('class', 'bo3_block');
		bo3Block.onclick = function(){
			num = (b == 0)? '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12' : ((b == 1)? '13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24' : '25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36');
			setBet(this, num, 'outside_dozen', 2);
		};
		bo3Block.oncontextmenu = function(e){
			e.preventDefault();
			num = (b == 0)? '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12' : ((b == 1)? '13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24' : '25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36');
			removeBet(this, num, 'outside_dozen', 2);
		};
		bo3Block.innerText = bo3Blocks[i];
		bo3Board.append(bo3Block);
	}
	bettingBoard.append(bo3Board);

	let otoBoard = document.createElement('div');
	otoBoard.setAttribute('class', 'oto_board');	
	let otoBlocks = ['PAR', 'VER', 'PRETO', 'ÍMPAR'];
	for(i = 0; i < otoBlocks.length; i++){
		let d = i;
		var colourClass = (otoBlocks[i] == 'VER')? ' redNum' : ((otoBlocks[i] == 'PRETO')? ' blackNum' : '');
		var otoBlock = document.createElement('div');
		otoBlock.setAttribute('class', 'oto_block' + colourClass);
		otoBlock.onclick = function(){
			num = (d == 0)? '2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36' : ((d == 1)? '1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36' : ((d == 2)? '2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35' : '1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35'));
			setBet(this, num, 'outside_oerb', 1);
		};
		otoBlock.oncontextmenu = function(e){
			num = (d == 0)? '2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36' : ((d == 1)? '1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36' : ((d == 2)? '2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35' : '1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35'));
			e.preventDefault();
			removeBet(this, num, 'outside_oerb', 1);
		};
		otoBlock.innerText = otoBlocks[i];
		otoBoard.append(otoBlock);
	}
	bettingBoard.append(otoBoard);

	let chipDeck = document.createElement('div');
	chipDeck.setAttribute('class', 'chipDeck');
	let chipValues = [1, 5, 10, 100, 'zerar'];
	for(i = 0; i < chipValues.length; i++){
		let cvi = i;
		let chipColour = (i == 0)? 'red' : ((i == 1)? 'blue cdChipActive' : ((i == 2)? 'orange' : ((i == 3)? 'gold' : 'clearBet')));
		let chip = document.createElement('div');
		chip.setAttribute('class', 'cdChip ' + chipColour);
		chip.onclick = function(){
			if(cvi !== 4){
				let cdChipActive = document.getElementsByClassName('cdChipActive');
				for(i = 0; i < cdChipActive.length; i++){
					cdChipActive[i].classList.remove('cdChipActive');
				}
				let curClass = this.getAttribute('class');
				if(!curClass.includes('cdChipActive')){
					this.setAttribute('class', curClass + ' cdChipActive');
				}
				wager = parseInt(chip.childNodes[0].innerText);
			}else{
				bankValue = bankValue + currentBet;
				currentBet = 0;
				document.getElementById('bankSpan').innerText = '' + bankValue.toLocaleString("en-GB") + '';
				document.getElementById('betSpan').innerText = '' + currentBet.toLocaleString("en-GB") + '';
				clearBet();
				removeChips();
			}
		};
		let chipSpan = document.createElement('span');
		chipSpan.setAttribute('class', 'cdChipSpan');
		chipSpan.innerText = chipValues[i];
		chip.append(chipSpan);
		chipDeck.append(chip);
	}
	bettingBoard.append(chipDeck);

	let bankContainer = document.createElement('div');
	bankContainer.setAttribute('class', 'bankContainer');

	let bank = document.createElement('div');
	bank.setAttribute('class', 'bank');
	let bankSpan = document.createElement('span');
	bankSpan.setAttribute('id', 'bankSpan');
	bankSpan.innerText = '' + bankValue.toLocaleString("en-GB") + '';
	bank.append(bankSpan);
	bankContainer.append(bank);

	let bet = document.createElement('div');
	bet.setAttribute('class', 'bet');
	let betSpan = document.createElement('span');
	betSpan.setAttribute('id', 'betSpan');
	betSpan.innerText = '' + currentBet.toLocaleString("en-GB") + '';
	bet.append(betSpan);
	bankContainer.append(bet);	
	bettingBoard.append(bankContainer);

	let pnBlock = document.createElement('div');
	pnBlock.setAttribute('class', 'pnBlock');
	let pnContent = document.createElement('div');
	pnContent.setAttribute('id', 'pnContent');
	pnContent.onwheel = function(e){
		e.preventDefault();
		pnContent.scrollLeft += e.deltaY;
	};
	pnBlock.append(pnContent);	
	bettingBoard.append(pnBlock);
	
	container.append(bettingBoard);
}

function clearBet(){
	bet = [];
	numbersBet = [];
}		

function setBet(e, n, t, o){
	lastWager = wager;
	wager = (bankValue < wager)? bankValue : wager;
	if(wager > 0){
		if(!container.querySelector('.spinBtn')){
			let spinBtn = document.createElement('div');
			spinBtn.setAttribute('class', 'spinBtn');
			spinBtn.innerText = 'girar';
			spinBtn.onclick = function(){
				this.remove();
				document.getElementById('id_bet').value = JSON.stringify(bet);
				document.getElementById('submitForm').click();
			};
			container.append(spinBtn);
		}
		bankValue = bankValue - wager;
		currentBet = currentBet + wager;
		document.getElementById('bankSpan').innerText = '' + bankValue.toLocaleString("en-GB") + '';
		document.getElementById('betSpan').innerText = '' + currentBet.toLocaleString("en-GB") + '';
		for(i = 0; i < bet.length; i++){
			if(bet[i].numbers == n && bet[i].type == t){
				bet[i].amt = bet[i].amt + wager;
				let chipColour = (bet[i].amt < 5)? 'red' : ((bet[i].amt < 10)? 'blue' : ((bet[i].amt < 100)? 'orange' : 'gold'));
				e.querySelector('.chip').style.cssText = '';
				e.querySelector('.chip').setAttribute('class', 'chip ' + chipColour);
				let chipSpan = e.querySelector('.chipSpan');
				chipSpan.innerText = bet[i].amt;
				return;
			}
			
		}
		var obj = {
			amt: wager,
			type: t,
			odds: o,
			numbers: n
		};
		bet.push(obj);
		
		let numArray = n.split(',').map(Number);
		for(i = 0; i < numArray.length; i++){
			if(!numbersBet.includes(numArray[i])){
				numbersBet.push(numArray[i]);
			}
		}

		if(!e.querySelector('.chip')){
			let chipColour = (wager < 5)? 'red' : ((wager < 10)? 'blue' : ((wager < 100)? 'orange' : 'gold'));
			let chip = document.createElement('div');
			chip.setAttribute('class', 'chip ' + chipColour);
			let chipSpan = document.createElement('span');
			chipSpan.setAttribute('class', 'chipSpan');
			chipSpan.innerText = wager;
			chip.append(chipSpan);
			e.append(chip);
		}
	}
}

function spin(casa_certa, aposta_total, aposta_vencedora, lucro){
	rodar_roleta(casa_certa);
	teste(aposta_total, aposta_vencedora, lucro);
}



async function teste(aposta_total, aposta_vencedora, lucro){
	let winValue = lucro;
	let betTotal = aposta_vencedora;
	bankValue = bankValue + aposta_vencedora;
	win(winningSpin, winValue, betTotal, aposta_total);
	await sleep(10000);
	
	currentBet = 0;
	document.getElementById('bankSpan').innerText = '' + bankValue.toLocaleString("en-GB") + '';
	document.getElementById("saldo_user").innerHTML = "<i class='fas fa-coins'></i>&nbsp;Saldo: " + bankValue + ",0";
	document.getElementById('betSpan').innerText = '' + currentBet.toLocaleString("en-GB") + '';
	
	
	let pnClass = (numRed.includes(parseInt(winningSpin)))? 'pnRed' : ((parseInt(winningSpin) == 0)? 'pnGreen' : 'pnBlack');
	let pnContent = document.getElementById('pnContent');
	let pnSpan = document.createElement('span');
	pnSpan.setAttribute('class', pnClass);
	pnSpan.innerText = winningSpin;
	pnContent.append(pnSpan);
	pnContent.scrollLeft = pnContent.scrollWidth;

	bet = [];
	numbersBet = [];
	removeChips();
	wager = lastWager;
	if(bankValue == 0 && currentBet == 0){
		gameOver();
	}
}



async function win(winningSpin, winValue, betTotal, aposta_total){
	if(betTotal > 0){
		await sleep(10000);

		let notification = document.createElement('div');
		notification.setAttribute('id', 'notification');
			let nSpan = document.createElement('div');
			nSpan.setAttribute('class', 'nSpan');
				let nsnumber = document.createElement('span');
				nsnumber.setAttribute('class', 'nsnumber');
				nsnumber.style.cssText = (numRed.includes(parseInt(winningSpin)))? 'color:red' : (parseInt(winningSpin) == 0)? 'color:green' : 'color:black';
				nsnumber.innerText = winningSpin;
				nSpan.append(nsnumber);
				let nsTxt = document.createElement('span');
				nsTxt.innerText = ' Ganhou!!';
				nSpan.append(nsTxt);
				let nsWin = document.createElement('div');
				nsWin.setAttribute('class', 'nsWin');
					let nsWinBlock = document.createElement('div');
					nsWinBlock.setAttribute('class', 'nsWinBlock');
					nsWinBlock.innerText = 'Aposta: -' + aposta_total;
					nSpan.append(nsWinBlock);
					nsWin.append(nsWinBlock);
					nsWinBlock = document.createElement('div');
					nsWinBlock.setAttribute('class', 'nsWinBlock');
					let x = betTotal;
					nsWinBlock.innerText = 'Ganho: +' + x;
					nSpan.append(nsWinBlock);
					nsWin.append(nsWinBlock);
					nsWinBlock = document.createElement('div');
					nsWinBlock.setAttribute('class', 'nsWinBlock');
					nsWinBlock.innerText = 'Total: ' + (winValue);
					nsWin.append(nsWinBlock);
				nSpan.append(nsWin);
			notification.append(nSpan);
		container.prepend(notification);
		setTimeout(function(){
			notification.style.cssText = 'opacity:0';
		}, 3000);
		setTimeout(function(){
			notification.remove();
		}, 6000);
	}
	
}

function removeBet(e, n, t, o){
	wager = (wager == 0)? 100 : wager;
	for(i = 0; i < bet.length; i++){
		if(bet[i].numbers == n && bet[i].type == t){
			if(bet[i].amt != 0){
				wager = (bet[i].amt > wager)? wager : bet[i].amt;
				bet[i].amt = bet[i].amt - wager;
				bankValue = bankValue + wager;
				currentBet = currentBet - wager;
				document.getElementById('bankSpan').innerText = '' + bankValue.toLocaleString("en-GB") + '';
				document.getElementById('betSpan').innerText = '' + currentBet.toLocaleString("en-GB") + '';
				if(bet[i].amt == 0){
					e.querySelector('.chip').style.cssText = 'display:none';
				}else{
					let chipColour = (bet[i].amt < 5)? 'red' : ((bet[i].amt < 10)? 'blue' : ((bet[i].amt < 100)? 'orange' : 'gold'));
					e.querySelector('.chip').setAttribute('class', 'chip ' + chipColour);
					let chipSpan = e.querySelector('.chipSpan');
					chipSpan.innerText = bet[i].amt;
				}
			}
		}
	}

	if(currentBet == 0 && container.querySelector('.spinBtn')){
		document.getElementsByClassName('spinBtn')[0].remove();
	}
}



var current_roulette_rotation = 0;
var current_ball_rotation = 0;
var current_angle_diff = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function rodar_roleta(casa_certa) {
    

	var diff = casa_certa * (360/37);

    document.getElementById("roleta").style.transitionDuration = '8s';
    document.getElementById("bola").style.transitionDuration = '9s';
	document.getElementById("travaApostas").style.zIndex = 200;
	document.getElementById("travaReset").style.zIndex = 200;

	var random_angle = (Math.floor(Math.random()*37))*(360/37);
    
    current_roulette_rotation += 1080 + random_angle;
    current_ball_rotation += 4320 + random_angle + diff - current_angle_diff;

	current_angle_diff = diff;

    document.querySelector("#roleta").style.transform = 'rotate(' + current_roulette_rotation + 'deg)';
    document.querySelector("#bola").style.transform = 'rotate(' + current_ball_rotation + 'deg)';
	

	winningSpin = casa[casa_certa];
    await sleep(8000);
  
    
    document.getElementById("roleta").style.transitionDuration = '0s';
    document.getElementById("bola").style.transitionDuration = '0s';

	

	await sleep(2000);

	document.getElementById("travaApostas").style.zIndex = -200;
	document.getElementById("travaReset").style.zIndex = -200;

}

function removeChips(){
	var chips = document.getElementsByClassName('chip');
	if(chips.length > 0){
		for(i = 0; i < chips.length; i++){
			chips[i].remove();
		}
		removeChips();
	}
}
