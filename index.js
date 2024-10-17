// fetching
const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;


const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// function which initialize the game;

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // update on UI after clicking new game
    boxes.forEach((box,index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all"; 
        // initialize box with green color again
        box.classList = `box box${index+1}`;

    })
    newGamebtn.classList.remove("active");
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    gameinfo.innerText = `Current Player - ${currentPlayer}`; //UI updated
}

function checkGameOver(){
    let answer = "";
    winningPosition.forEach((position)=>{
        // all 3 boxes should be non empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !==""
        ) && gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]]){
            // check if winner is x
            if(gameGrid[position[0]]==="X"){
                answer = "X";
            }
            else{
                answer = "0";
            }
            // now we know X/0 win
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    // it means we have winner
     if(answer!==""){
        gameinfo.innerText = `winner player - ${answer}`;
        newGamebtn.classList.add("active");
        // gameOver = true;  
        return;
     }
     // lets check whether the game tied
     let fillCount = 0;
     gameGrid.forEach((box)=>{
        if(box!=="") fillCount++
     });
     if(fillCount===9){
        gameinfo.innerText = `Game Tied!`;
        newGamebtn.classList.add("active");

     }  
}
function handleClick(index){
    if(gameGrid[index]=== ""){
        boxes[index].innerText = currentPlayer; // changes in UI
        gameGrid[index] = currentPlayer; // changes in js grid
        boxes[index].style.pointerEvents = "none"; 
        // swap turn
        swapTurn();

        // check anyone won or not
        checkGameOver();

    }
}
// Using event listner on click
boxes.forEach((box,index) =>{
   box.addEventListener("click",() => {
   handleClick(index);
})
});
// makes grid empty after clicking on new game btn
newGamebtn.addEventListener("click",initGame);
