// Updates the total amount of money you have
function updateMoney() {
    let currentMoney=Number(localStorage.getItem("totalMoney"))
    localStorage.setItem("totalMoney",currentMoney-=5)
    document.getElementById("totalMoney").textContent=currentMoney;
}

// Assign events to different things
function assignEvents() {
    document.getElementById("hoverZone").addEventListener("mouseover", function() {
        showInfo()
    })
    document.getElementById("overlay").addEventListener("mouseover", function() {
        hideInfo("assignEvents")
    })
    document.getElementById("refreshGame").addEventListener("click",function() {
        location.reload();
    })
}

function showInfo() {
    document.getElementById("info").style.bottom="0px"
}
function hideInfo() {
    document.getElementById("info").style.bottom="-70px"
}

// Makes the buttons that the player can click on
function makeButtons() {
    // The collection that holds that values for each cell, the money gained, and the clicks left
    let cellNumbers=[]
    let moneyGained=[]
    let clicksLeft=10

    for(let i=0;i<=9;i++) {
        // Defines the value a cell will have and creates the button
        let numberToAdd=Math.floor(Math.random() * 20) + 1;
        let newCell=document.createElement("div");
        
        // Will eventually hold the winning cells
        let winningCells;

        // Gives an amount to each cell
        let cellAmount=Math.floor(Math.random() * 20) + 1;

        // Gives the button both an ID and a cell
        newCell.id=`cell${i}`;
        newCell.className="ticketCell";

        // Adds placeholder text and hides it
        newCell.style.color="rgb(200, 200, 255,0)"
        newCell.textContent="0\n000"

        // Shows the number & value after clicking on a cell, also removes a clickLeft
        newCell.onclick=function() {
            if(this.style.backgroundColor!="transparent") {
                clicksLeft-=1;
            }
            if(clicksLeft==0) {
                endGame()
            }
            if(winningCells==undefined) {
                winningCells=getWinningNumbers()
            }
            showValues(newCell, cellAmount, cellNumbers, winningCells, moneyGained)
        }

        // Ensures that the number that is assigned to a cell was not taken
        // then adds the number to the list of already taken numbers
        while(cellNumbers.includes(numberToAdd)) {
            numberToAdd=Math.floor(Math.random() * 20) + 1;
        }
        cellNumbers.push(numberToAdd)
        document.getElementById("cellZone").appendChild(newCell);
    }
}

// Shows the values of each cell as you click on it
function showValues(newCell, cellAmount, cellNumbers, winningCells, moneyGained) {
    let id=newCell.id.at(-1)
    newCell.style.backgroundColor="transparent";
    newCell.style.color="white";
    newCell.textContent=`${cellNumbers[id]} \n $${cellAmount}`
    newCell.style.cursor="default";

    if(winningCells.includes(String(cellNumbers[id]))) {
        moneyGained.push(cellAmount)
        addToMoneyGained(moneyGained)
    }
}

// Adds to a list of money youve earned
function addToMoneyGained(moneyGained) {
    let ticketEarned=document.getElementById("ticketEarned")
    let sum=0;
    for(let i=0;i<moneyGained.length;i++) {
        sum+=Number(moneyGained[i])
    }
    ticketEarned.textContent=sum;
    currentTotal=Number(localStorage.getItem("totalMoney"))
    localStorage.setItem("totalMoney",currentTotal+sum)
    return sum
}

// Grabs all the winning numbers
function getWinningNumbers() {
    let winningNumbers=document.getElementsByClassName("winningNumber");
    let numberText=[]
    for(let i=0;i<winningNumbers.length;i++) {
        numberText.push(winningNumbers[i].textContent);
    }

    return numberText
}

// Makes the winning numbers
function makeWinningNumbers() {
    let alreadyUsed=[]

    for(let i=0;i<5;i++) {
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

// Ends the game
function endGame(sum) {
    // Shows your stats
    showInfo("endGame")

    // Hides the overlay that makes the info box hide
    document.getElementById("overlay").style.display="none";

    // Show new game button
    document.getElementById("refreshGame").style.opacity="1";
    document.getElementById("refreshGame").style.pointerEvents="all";

    currentValue=localStorage.getItem("totalMoney")
}