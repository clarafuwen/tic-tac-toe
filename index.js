
const gameBoardUI = document.querySelector(".gameBoard");
const announcement = document.querySelector(".announcement");
const resetButton = document.querySelector(".reset");
const startBUtton = document.querySelector(".start")
const squares = document.querySelectorAll(".square");
const player0Name = document.querySelector("#Player_0_name");
const player1Name = document.querySelector("#Player_1_name");
let player0, player1, currentPlayer,gameBoard = [];


player0Name.addEventListener("keypress", (event)=>{
    if(event.key === "Enter")
        player0Name.disabled = true;

})
player1Name.addEventListener("keypress", (event)=>{
    if(event.key === "Enter")
        player1Name.disabled = true;

})

startBUtton.addEventListener("click", ()=>{
    init();
    gameStart();
    let p0Name = player0Name.value === ""? "Player 0" : player0Name.value;
    let p1Name = player1Name.value === ""? "Player 1" : player1Name.value;
    
    player0 = createPlayer("X", p0Name);
    player1 = createPlayer("O", p1Name);
    currentPlayer = Math.floor(Math.random()*2) === 0? player0 : player1;
    console.log(currentPlayer.getName());
    // currentPlayer = turn === "Player 0"? player0 : player1;
    announcement.textContent = (`Game start. Current player: ${currentPlayer.getName()}`);
})



gameBoardUI.addEventListener("click", handleClick)

resetButton.addEventListener("click", init);

function handleClick(event){
    console.log(event.target.id);
    const index = event.target.id;
    if(!gameBoard[index].getMarkedStatus()){
        event.target.textContent = currentPlayer.getMark();
        gameBoard[index].toggleMarkedStatus(true);
        gameBoard[index].setMarkedBy(currentPlayer.getName());
        // console.log(`current player is ${currentPlayer.getName()} and its mark is ${currentPlayer.getMark()}`)
        gameBoard[index].setMark(currentPlayer.getMark());
        currentPlayer = currentPlayer.getName() === player0.getName()? player1 : player0;
        // console.log(`gameBoard index ${index} has mark: ${gameBoard[index].getMark()}`);
        // console.log(`Current player is now ${currentPlayer.getName()}`);
    } else{
        announcement.textContent = ("the square you chose is taken.");
    }
    announcement.textContent = (`Current player: ${currentPlayer.getName()}`);

    if(checkWinner().hasWinner){
        announcement.textContent = (`We have a winner: ${checkWinner(gameBoard).winner}`);
        gameBoardUI.removeEventListener("click", handleClick);
     } else if(squaresAllFilled()){
         announcement.textContent=("All squared filled");
         gameBoardUI.removeEventListener("click",handleClick);
     } 
}


function checkWinner(){
    console.log("checking winner");
    const WINNING_PATTERNS = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,8],[2,5,8],[3,4,5],[6,7,8]];
    let hasWinner = false;
    let winner = null;
    for( const [index, square] of gameBoard.entries()){
        // console.log(`now at square ${index}`);
        // console.log(`the square has been marked? ${square.getMarkedStatus()}`);
        if(square.getMarkedStatus()){
            for (const pattern of WINNING_PATTERNS) {
                const [first, second, third] = pattern;
                // console.log(`now at pattern ${pattern}`);
                // console.log(`index is ${index} and mark ${square.getMark()}`);
                // console.log(`first is ${first} and mark ${gameBoard[first].getMark()}`);
                // console.log(`second is ${second} and mark ${gameBoard[second].getMark()}`);
                // console.log(`third is ${third} and mark ${gameBoard[third].getMark()}`);
                if(pattern.includes(index)&&gameBoard[first].getMark()===gameBoard[second].getMark()&&gameBoard[second].getMark()===gameBoard[third].getMark()){
                    hasWinner = true;
                    winner = gameBoard[first].getMarkedBy();
                    console.log(`winning index starts at ${index}`);
                    return {hasWinner, winner};
                }
            };
        }   
    };
    return {hasWinner, winner};
};

function squaresAllFilled(){
    for(const square of gameBoard){
        if(square.getMarkedStatus() === false)
            return false;
    }
    return true;
};

//square object -- the smallest unit of a gameBoard
function createSquare(){
    let mark = null;
    let markedStatus = false;
    let markedBy = null;
    const getMark = ()=> mark;
    const setMark = (input) => mark = input;
    const getMarkedBy = () => markedBy;
    const getMarkedStatus = ()=> markedStatus;
    const toggleMarkedStatus = (status)=> markedStatus = status;
    const setMarkedBy = (name) => markedBy = name;

    return {getMark, setMark, getMarkedStatus,toggleMarkedStatus,getMarkedBy,setMarkedBy};
}


function createPlayer(symbol, pName){
    let mark = symbol;
    let name = pName;
    const getName = () => name;
    const getMark = () => mark;
    // const setName = (name) => name = name;
    // const setMark = (mark) => mark = mark;

    return {getName, getMark,};
}

function init(){
    resetGameBoardArray();
    resetUI();
}

function gameStart(){
    player0Name.disabled = true;
    player1Name.disabled = true;
}

function resetGameBoardArray(){
    for(let i = 0; i < 9; i++)
        gameBoard.push(createSquare());
}

function resetUI(){
    squares.forEach((square) =>{
        square.textContent = "";
    })
    announcement.textContent = "";
    player0Name.disabled = false;
    player1Name.disabled = false;
}