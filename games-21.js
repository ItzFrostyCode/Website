const player1 = {
    cards: [],
    hearts: 5,
    hasStayed: false
  };
  
  const player2 = {
    cards: [],
    hearts: 5,
    hasStayed: false
  };
  
  let undoUsed = false;
  
  document.getElementById('hitButton').addEventListener('click', playerHit);
  document.getElementById('stayButton').addEventListener('click', playerStay);
  document.getElementById('undoButton').addEventListener('click', playerUndo);
  
  function startGame() {
    undoUsed = false;
    player1.cards = [randomCard(), randomCard()];
    player2.cards = [randomCard(), randomCard()];
    player1.hasStayed = false;
    player2.hasStayed = false;
  
    updateUI();
  
    setTimeout(() => {
      document.getElementById('bankerMessage').innerText = "Banker: YOUR TURN. . . .";
      enableChoices();
    }, 2000);
  }
  
  function playerHit() {
    player1.cards.push(randomCard());
    updateUI();
    botTurn();
  }
  
  function playerStay() {
    player1.hasStayed = true;
    disableChoices();
    botTurn();
  }
  
  function playerUndo() {
    if (!undoUsed && player1.cards.length > 2) {
      player1.cards.pop();
      undoUsed = true;
      updateUI();
    }
    botTurn();
  }
  
  function botTurn() {
    disableChoices();
    document.getElementById('bankerMessage').innerText = "Banker: BOT IS THINKING...";

    setTimeout(() => {
        if (!player2.hasStayed) {
            const botScore = calculateScore(player2.cards);
            const playerScore = calculateScore(player1.cards);

            if (botScore === 21) {
                player2.hasStayed = true;
            } else if (botScore < 17 || (playerScore > botScore && playerScore <= 21)) {
                player2.cards.push(randomCard()); // Bot tries to beat the player strategically
            } else {
                player2.hasStayed = true;
            }

            document.getElementById('bankerMessage').innerText = player2.hasStayed ? "Banker: BOT CHOSE STAY, YOUR TURN" : "Banker: BOT CHOSE HIT, YOUR TURN";
            updateUI();
        }

        checkIfGameCanDecide();
    }, 1500);
}
  
  function checkIfGameCanDecide() {
    if (player1.hasStayed && player2.hasStayed) {
      document.getElementById('bankerMessage').innerText = "Banker: THE WINNER IS...";
      setTimeout(() => decideWinner(), 3000);
    } else {
      enableChoices();
    }
  }
  
  function decideWinner() {
    // Reveal bot's hidden card
    updateUI(true);
  
    const playerScore = calculateScore(player1.cards);
    const botScore = calculateScore(player2.cards);
  
    if ((playerScore > 21 && botScore <= 21) || (botScore > playerScore && botScore <= 21)) {
      loseHeart(player1);
      document.getElementById('bankerMessage').innerText = "Banker: BOT WINS";
    } else if ((botScore > 21 && playerScore <= 21) || (playerScore > botScore && playerScore <= 21)) {
      loseHeart(player2);
      document.getElementById('bankerMessage').innerText = "Banker: YOU WIN";
    } else {
      document.getElementById('bankerMessage').innerText = "Banker: IT'S A TIE";
    }
  
    setTimeout(() => checkGameOver(), 5000);
  }
  
  function randomCard() {
    return Math.floor(Math.random() * 9) + 1;
  }
  
  function calculateScore(cards) {
    return cards.reduce((sum, card) => sum + card, 0);
  }
  
  function loseHeart(player) {
    player.hearts -= 1;
    if (player.hearts === 0) {
      showPopup(player === player1 ? "YOU LOST :( DO YOU WANT TO PLAY AGAIN?" : "YOU WIN! DO YOU WANT TO PLAY AGAIN?");
    }
  }
  
  function checkGameOver() {
    if (player1.hearts > 0 && player2.hearts > 0) {
      startGame();
    }
  }
  
  function showPopup(message) {
    document.getElementById('popupMessage').innerText = message;
    document.getElementById('popup').style.display = 'block';
    document.getElementById('playAgainYes').addEventListener('click', restartGame);
    document.getElementById('playAgainNo').addEventListener('click', thankYou);
  }
  
  function restartGame() {
    document.getElementById('popup').style.display = 'none';
    player1.hearts = 5;
    player2.hearts = 5;
    startGame();
  }
  
  function thankYou() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('bankerMessage').innerText = "Thank you for playing!";
  }
  
  function updateUI(revealBot = false) {
    const playerScore = calculateScore(player1.cards);
    document.getElementById('playerCards').innerText = `Cards: ${player1.cards.join(' + ')} = ${playerScore}  / 21`;
    document.getElementById('playerHearts').innerText = `Hearts: ${'♥'.repeat(player1.hearts)}`;
  
    const botScore = calculateScore(player2.cards);
    const botCardsDisplay = revealBot
      ? `${player2.cards.join(' + ')}`
      : `? + ${player2.cards.slice(1).join(' + ')}`;
    const botScoreDisplay = revealBot ? botScore : calculateScore(player2.cards.slice(1));
    document.getElementById('botCards').innerText = `Cards: ${botCardsDisplay} = ${botScoreDisplay}  / 21`;
    document.getElementById('botHearts').innerText = `Hearts: ${'♥'.repeat(player2.hearts)}`;
  }
  
  function enableChoices() {
    document.getElementById('hitButton').disabled = false;
    document.getElementById('stayButton').disabled = false;
    document.getElementById('undoButton').disabled = undoUsed;
  }
  
  function disableChoices() {
    document.getElementById('hitButton').disabled = true;
    document.getElementById('stayButton').disabled = true;
    document.getElementById('undoButton').disabled = true;
  }
  
  startGame();
  