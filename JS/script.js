$(document).ready(function () {
  let cell = "";
  for (let i = 0; i < 9; i++) {
    cell += `<div class="block" data-index="${i}"></div>`;

  }
  $("#game").html(`${cell}`);
  $('.player-turn').html(`turn the player "X"`) 
  let turn = true;
  let zero=[];
  let cross = [];

  $("#game").on("click", stepUpPlayer);
    
    function stepUpPlayer(event){
          if(!$(event.target).html()){
         if ((event.target.className = "block")) {
        if (turn) {
          $(event.target).html("x");
          turn = false;
          turn ? $('.player-turn').html(`turn the player "X"`) : $('.player-turn').html(`turn the player "O"`); 
        } else {
          $(event.target).html("o");
          turn = true;
          turn ? $('.player-turn').html(`turn the player "X"`) : $('.player-turn').html(`turn the player "O"`); 
        }
        if ($(event.target).html() === "x")
          cross.push($(event.target).data("index"));
        if ($(event.target).html() === "o")
          zero.push($(event.target).data("index"));
      }
  

      checkWinner();  
    }
    }  
  

  function checkWinner() {
    let winResults = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let win = false;

    for (let j = 0; j < 8; j++) {
      let counterZero = 0;
      let counterCross = 0;
      let crossWin = false;
      let zeroWin = false;

      for (num of winResults[j]) {
        if (zero.includes(num)) {
          counterZero++;
          if (counterZero === 3) {
            zeroWin = true;
            for (num of winResults[j]) {
              $(".block").eq(num).addClass("cross");
            }
          }
        }
        if (cross.includes(num)) {
          counterCross++;
          if (counterCross === 3) {
            crossWin = true;
            for (num of winResults[j]) {
              $(".block").eq(num).addClass("cross");
            }
          }
        }
      }
      if (crossWin) {
        stopGame("cross");
      }
      if (zeroWin) {
        stopGame("zero");
      }
    }
  }

$("#start").click(newGame);


function stopGame(player){
  counterZero = 0;
  counterCross = 0; 
  crossWin = false;
  zeroWin = false;
  $(".winner-info").html(`Winner is ${player}`);
  $('.player-turn').html(`The end of the game`);
  $('#game').off('click');

}

  function newGame(){
    $('.block').removeClass('cross');
    $("#game").on("click", stepUpPlayer);
    $('.player-turn').html(`turn the player "X"`); 
    zero = [];
    cross = [];
    $(".winner-info").html("");
    $(".block").each(function () {
      $(".block").html("");
    });
  }
});