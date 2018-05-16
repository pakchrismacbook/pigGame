let scores, roundScore, activePlayer, dice, diceObj = document.querySelector('#dice'), inPlay, lastDice;

init();

document.getElementById('rollDice').addEventListener('click', function(){
	if(inPlay){
		dice = Math.floor(Math.random()*6)+1;
		diceObj.src = 'images/dice'+dice+'.jpg';
		diceObj.style.display = 'block';
    if(dice===6 && lastDice===6){
      scores[activePlayer] = 0;
      document.getElementById('gameScore-'+activePlayer).textContent = 0;
      nextPlayer();
    } else if(dice !== 1){
			roundScore += dice;
			document.getElementById('currentScore-'+activePlayer).textContent = roundScore;
		} else{
			nextPlayer();
		}
    lastDice = dice;
	}
});

document.getElementById('hold').addEventListener('click', function(){
	if(inPlay){
		scores[activePlayer-1] += roundScore;
		document.getElementById('gameScore-'+activePlayer).textContent = scores[activePlayer-1];

    const newScore = document.querySelector('#inputDiv input').value;
    let winningScore;
    if(newScore) winningScore = newScore;
    else winningScore = 50;

		if(scores[activePlayer-1] >= winningScore){
			document.querySelector('#player'+activePlayer+' h2').textContent = 'Winner!';
			diceObj.style.display = 'none';
			document.getElementById('player'+activePlayer).classList.add('winner');
			document.getElementById('player'+activePlayer).classList.remove('active');
			inPlay = false;
		} else{
			nextPlayer();
		}
	}
});

function nextPlayer(){
	activePlayer === 1 ? activePlayer=2 : activePlayer=1;
	roundScore = 0;
	document.getElementById('currentScore-1').textContent = 0;
	document.getElementById('currentScore-2').textContent = 0;
	document.getElementById('player1').classList.toggle('active');
	document.getElementById('player2').classList.toggle('active');
}

document.getElementById('newGame').addEventListener('click', init);

function init(){
	inPlay = true;
	scores = [0,0];
	roundScore = 0;
	activePlayer = 1;
	diceObj.style.display = 'none';
	document.getElementById('gameScore-1').textContent = 0;
	document.getElementById('gameScore-2').textContent = 0;
	document.getElementById('currentScore-1').textContent = 0;
	document.getElementById('currentScore-2').textContent = 0;
	document.querySelector('#player1 h2').textContent = 'Player 1';
	document.querySelector('#player2 h2').textContent = 'Player 2';
	document.getElementById('player1').classList.remove('winner');
	document.getElementById('player2').classList.remove('winner');
	document.getElementById('player1').classList.remove('active');
	document.getElementById('player2').classList.remove('active');
	document.getElementById('player1').classList.add('active');
}
