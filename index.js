// Makes the buttons that the player can click on
function makeButtons() {
    // The collection that holds that values for each cell
    let cellNumbers=[]

    for(let i=0;i<=9;i++) {
        // Defines the value a cell will have and creates the button
        let numberToAdd=Math.floor(Math.random() * 20) + 1;
        let newCell=document.createElement("button");

        // Gives the button both an ID and a cell
        newCell.id=`cell${i}`;
        newCell.className="ticketCell";

        // Adds placeholder text and hides it
        newCell.style.color="rgb(200, 200, 255,0)"
        newCell.textContent="0"

        // Shows the number after clicking on a cell
        newCell.onclick=function() {
            let id=newCell.id.at(-1)
            newCell.style.backgroundColor="transparent";
            newCell.style.color="white";
            newCell.textContent=cellNumbers[id]
            newCell.style.cursor="default";
        }

        // Ensures that the number that is assigned to a cell was not taken
        // then adds the number to the list of already taken numbers
        while(cellNumbers.includes(numberToAdd)) {
            numberToAdd=Math.floor(Math.random() * 20) + 1;
        }
        cellNumbers.push(numberToAdd)
        document.getElementById("cellZone").appendChild(newCell);
    }
    console.log(cellNumbers)
    return cellNumbers
}

// Makes the winning numbers
function makeWinningNumbers() {
    let alreadyUsed=[]
    for(let i=0;i<4;i++) {
        let winningNum=document.createElement("p");
        winningNum.className="winningNumber";
        winningNum.textContent=Math.floor(Math.random() * 30) + 1;
        while(alreadyUsed.includes(winningNum.textContent)) {
            winningNum.textContent=Math.floor(Math.random() * 30) + 1;
        }
        alreadyUsed.push(winningNum.textContent)
        document.getElementById("winNumberZone").appendChild(winningNum);
    }
}

// Shows contents of the buttons you could click on
function showContents(cellNumbers) {
    console.log(cellNumbers)
    let currentId=this.id[-1]
    
}