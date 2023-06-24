const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[ data-your-score]')
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats:'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats:'rock'
    },
    {
        name: 'scissors',
        emoji: '✌️',
        beats:'paper'
    }
]
//this function is to go through the data selection and return the name of the option the user has clicked and store it in the variable selectionName.
//the makeSelection function pass the variable selectionName as argument
selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        //searches to see what the user has selected is in the array SELECTIONS and stores in the variable selection. the value is an array
        const selection = SELECTIONS.find(selection => selection.name == selectionName)
        makeSelection(selection)
    })
})
//this function gets the random selection selected by the computer
function makeSelection(selection) {
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const compWinner = isWinner(computerSelection, selection )
   addSelectionResult(computerSelection,compWinner)
   addSelectionResult(selection,yourWinner)
    //the function gets called only if the winner variables are filled
   if (yourWinner) incrementScore(yourScoreSpan) 
   if (compWinner) incrementScore(computerScoreSpan)
}
//function gets paramets and converts the current string to integer then increments the value
function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}
//function to make the choices made by the user and computer appear after below the name tags with the latest one being the highest
function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if(winner) div.classList.add('winner')
    finalColumn.after(div)
}
//function to check the winner . logic is the selection which I have chosen if the opponents(computer) name is same with the i beat, then I have won
function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
} 

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length) //return a random number between 0 and 2
    return SELECTIONS[randomIndex] //returns a random selection based on the random number generator 
}

