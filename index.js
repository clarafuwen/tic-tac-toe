// let square = createSquare();
let gameboard = [];
for(let i = 0; i < 9; i++)
    gameboard.push(createSquare());


const player0 = createPlayer("O", "Player 0");
const player1 = createPlayer("X", "player 1");

let turn = Math.floor(Math.random()*2) === 0? "player 0" : "player 1";
let currentPlayer = turn === "player 0"? player0 : player1;

console.log(`Game start. Current player: ${currentPlayer.getName()}`);


while(!squaresAllFilled()&&!checkWinner().hasWinner){
    const input = prompt(`${currentPlayer.getName()} please enter the square to place your mark: `);
    if(!gameboard[input].getMarkedStatus()){
        gameboard[input].toggleMarkedStatus(true);
        gameboard[input].setMarkedBy(currentPlayer.getName());
        console.log(`current player is ${currentPlayer.getName()} and its mark is ${currentPlayer.getMark()}`)
        gameboard[input].setMark(currentPlayer.getMark());
        currentPlayer = currentPlayer.getName() === "Player 0"? player1 : player0;
        console.log(`gameboard index ${input} has mark: ${gameboard[input].getMark()}`);
        console.log(`Current player is now ${currentPlayer.getName()}`);

    } else{
        alert("the square you chose is taken.");
    }
}

if(squaresAllFilled()){
    alert("All squared filled")
} else if(checkWinner().hasWinner){
   alert(`We has a winner: ${checkWinner(gameboard).winner}`) 
}


function checkWinner(){
    console.log("checking winner");
    const WINNING_PATTERNS = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,8],[2,5,8],[3,4,5],[6,7,8]];
    let hasWinner = false;
    let winner = null;
    for( const [index, square] of gameboard.entries()){
        console.log(`now at square ${index}`);
        console.log(`the square has been marked? ${square.getMarkedStatus()}`);
        if(square.getMarkedStatus()){
            for (const pattern of WINNING_PATTERNS) {
                const [first, second, third] = pattern;
                // console.log(`now at pattern ${pattern}`);
                // console.log(`index is ${index} and mark ${square.getMark()}`);
                // console.log(`first is ${first} and mark ${gameboard[first].getMark()}`);
                // console.log(`second is ${second} and mark ${gameboard[second].getMark()}`);
                // console.log(`third is ${third} and mark ${gameboard[third].getMark()}`);
                if(pattern.includes(index)&&gameboard[first].getMark()===gameboard[second].getMark()&&gameboard[second].getMark()===gameboard[third].getMark()){
                    hasWinner = true;
                    winner = gameboard[first].getMarkedBy();
                    console.log(`winning index starts at ${index}`);
                    return {hasWinner, winner};
                }
            };
        }   
    };
    return {hasWinner, winner};
};

function squaresAllFilled(){
    for(const square of gameboard){
        if(square.getMarkedStatus() === false)
            return false;
    }
    return true;
};

//square object -- the smallest unit of a gameboard
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