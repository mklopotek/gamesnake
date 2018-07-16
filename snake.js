// (function () {

function GameSnake() {
    this.container = document.body

    this.areaRowsLengthX = 10
    this.areaColumnsLengthY = 10
    this.gameContainer = null
    this.scoreContainer = null

    //here we declaared that when we call initialArea it call the function createEmptyArea and give her a two variable -areaRowsLenghtX and areaColumnsLenghtY 
    this.initialArea = this.createEmptyArea(this.areaRowsLengthX, this.areaColumnsLengthY)
    // var clearArea = JSON.parse(JSON.stringify(initialArea))  //i dont know yet if there should be a clear, first area or only one area for all
    this.area = JSON.parse(JSON.stringify(this.initialArea))
    // console.log(initialArea !== clearArea)   //it works because it says: true! (so it copy a old area but without references!!!! (changing area not changing a initialArea))

    this.initialPosition = (whatRow, whatColumn) => ({
        whatRow: whatRow,
        whatColumn: whatColumn
    })

    this.initialPositionSnakeHead = this.initialPosition(6, 6)
    this.initialPositionSnakeBody1 = this.initialPosition(7, 6)
    this.initialPositionSnakeBody2 = this.initialPosition(8, 6)
    this.initialPositionFood = this.initialPosition(3, 3)

    this.positionSnakeHead = JSON.parse(JSON.stringify(this.initialPositionSnakeHead))
    this.positionSnakeBody1 = JSON.parse(JSON.stringify(this.initialPositionSnakeBody1))
    this.positionSnakeBody2 = JSON.parse(JSON.stringify(this.initialPositionSnakeBody2))
    this.positionFood = JSON.parse(JSON.stringify(this.initialPositionFood))

    this.theLastMove = this.initialPosition(-1, 0)
    this.mainIntervalId = setInterval(
        () => this.checkIfMovieIsPossible(this.theLastMove.whatRow, this.theLastMove.whatColumn),
        500
    )

    this.score = 0

    this.init()
}

GameSnake.prototype.createEmptyArea = function (areaRowsLengthX, areaColumnsLengthY) {
    return Array(areaRowsLengthX).fill('0').map(function () {
        return Array(areaColumnsLengthY).fill('0')
    })
}

GameSnake.prototype.init = function () {
    this.prepareLayout()
    this.addSnakeAndFoodToArea()
    this.displayScore(this.score)
    this.render()
    this.eventListeners()

    alert('Press "ok" to start!')

}

GameSnake.prototype.prepareLayout = function () {

    function makeGameContainer() {
        gameContainer = document.createElement('div')
        gameContainer.classList.add('game')

        return gameContainer
    }


    function makeScoreContainer() {
        scoreContainer = document.createElement('div')
        scoreContainer.classList.add('score')

        return scoreContainer
    }

    this.gameContainer = makeGameContainer()
    this.scoreContainer = makeScoreContainer()
    this.container.appendChild(this.scoreContainer)
    this.container.appendChild(this.gameContainer)
}

//this function will be transform the table from js to HTML 
GameSnake.prototype.render = function () {
    this.gameContainer.innerHTML = ''

    this.addSnakeAndFoodToArea()

    this.area.forEach(areaRow => {
        var row = this.makeRowsforElementsInArea()

        areaRow.forEach(element => {
            var cell = this.makeCellforElementsThatInElementsInArea(element)
            row.appendChild(cell)
        })

        this.gameContainer.appendChild(row)


        // console.log(this.gameContainer)   //it work i hope ;) 
    })
}

GameSnake.prototype.makeRowsforElementsInArea = function () {
    const row = document.createElement('div')
    row.classList.add('game__row')
    return row
}

GameSnake.prototype.makeCellforElementsThatInElementsInArea = function (element) {
    const makeGameElement = (modifier) => () => {
        const el = document.createElement('div')
        el.classList.add('game__cell--' + modifier)
        return el
    }

    const makeCellEmpty = makeGameElement('empty')
    const makeCellHeadSnake = makeGameElement('snake-head')
    const makeCellBodySnake = makeGameElement('snake-body')
    const makeCellFood = makeGameElement('food')

    switch (element) {
        case '0':
            return makeCellEmpty();
        case 'H':
            return makeCellHeadSnake()
        case '1':
            return makeCellBodySnake()
        case 'F':
            return makeCellFood()
    }
}

GameSnake.prototype.addSnakeAndFoodToArea = function () {
    this.area = JSON.parse(JSON.stringify(this.initialArea))
    this.area[this.positionSnakeHead.whatRow][this.positionSnakeHead.whatColumn] = 'H'
    this.area[this.positionSnakeBody1.whatRow][this.positionSnakeBody1.whatColumn] = '1'
    this.area[this.positionSnakeBody2.whatRow][this.positionSnakeBody2.whatColumn] = '1'
    this.area[this.positionFood.whatRow][this.positionFood.whatColumn] = 'F'
}

GameSnake.prototype.eventListeners = function () {

    this.container.addEventListener('keydown', event => {
        event.preventDefault()

        switch (event.key) {
            case 'ArrowLeft':
                // this.move(0, -1)
                this.rememberTheLastMove(0,-1)
                break

            case 'ArrowUp':
                // this.move(-1, 0)
                this.rememberTheLastMove(-1,0)
                break

            case 'ArrowRight':
                //    this.move(0, 1)
                this.rememberTheLastMove(0,1)
                break

            case 'ArrowDown':
                //    this.move(1, 0)
                this.rememberTheLastMove(1,0)
                break

            // default: return    //is it necassary?
        }

        // event.preventDefault()  //the same?


    })
}

GameSnake.prototype.checkIfMovieIsPossible = function (deltaRow, deltaColumn) {
    this.rememberTheLastMove(deltaRow, deltaColumn)

    //this variable are defined for if statement
    const ifNextMoveIsInsideArrayRowsLeft = this.positionSnakeHead.whatRow + deltaRow >= 0
    const ifNextMoveIsInsideArrayRowsRight = this.positionSnakeHead.whatRow + deltaRow < this.areaRowsLengthX
    const ifNextMoveIsInsideArrayColumnLeft = this.positionSnakeHead.whatColumn + deltaColumn >= 0
    const ifNextMoveIsInsideArrayColumnRight = this.positionSnakeHead.whatColumn + deltaColumn < this.areaColumnsLengthY
    const ifNextMoveIsNotSnakeBody = this.area[this.positionSnakeHead.whatRow + deltaRow][this.positionSnakeHead.whatColumn + deltaColumn] !== this.area[this.positionSnakeBody1.whatRow][this.positionSnakeBody1.whatColumn]

    if (
        ifNextMoveIsInsideArrayRowsLeft &&
        ifNextMoveIsInsideArrayColumnLeft &&
        ifNextMoveIsInsideArrayRowsRight &&
        ifNextMoveIsInsideArrayColumnRight &&
        ifNextMoveIsNotSnakeBody
    ) {
        this.move(deltaRow, deltaColumn)
    } else {
        this.endGame()
    }
}

GameSnake.prototype.rememberTheLastMove = function(whatRow, whatColumn){
    this.theLastMove.whatRow = whatRow
    this.theLastMove.whatColumn = whatColumn
}

GameSnake.prototype.endGame = function(){
    window.location = ''
    alert('GAME OVER\n' + 'You completed the game with: ' + this.score + ' points!' + '\n Congratulations!')
}

GameSnake.prototype.move = function(deltaRow, deltaColumn){
    if (this.area[this.positionSnakeHead.whatRow + deltaRow][this.positionSnakeHead.whatColumn + deltaColumn] != this.area[this.positionFood.whatRow][this.positionFood.whatColumn]) {

        this.positionSnakeBody2.whatRow = this.positionSnakeBody1.whatRow
        this.positionSnakeBody2.whatColumn = this.positionSnakeBody1.whatColumn

        this.positionSnakeBody1.whatRow = this.positionSnakeHead.whatRow
        this.positionSnakeBody1.whatColumn = this.positionSnakeHead.whatColumn

        this.positionSnakeHead.whatRow = this.positionSnakeHead.whatRow + deltaRow
        this.positionSnakeHead.whatColumn = this.positionSnakeHead.whatColumn + deltaColumn
    } else {
        //if the new head is a food, change food to a new place 
        this.incScore()
        this.placeNewFood()

        this.positionSnakeBody2.whatRow = this.positionSnakeBody1.whatRow
        this.positionSnakeBody2.whatColumn = this.positionSnakeBody1.whatColumn

        this.positionSnakeBody1.whatRow = this.positionSnakeHead.whatRow
        this.positionSnakeBody1.whatColumn = this.positionSnakeHead.whatColumn

        this.positionSnakeHead.whatRow = this.positionSnakeHead.whatRow + deltaRow
        this.positionSnakeHead.whatColumn = this.positionSnakeHead.whatColumn + deltaColumn
    }
    this.render()
}

GameSnake.prototype.placeNewFood = function () {
    var newFoodPosition = {
        whatRow: Math.floor(Math.random() * this.areaRowsLengthX),
        whatColumn: Math.floor(Math.random() * this.areaColumnsLengthY)
    }

    if (this.area[newFoodPosition.whatRow][newFoodPosition.whatColumn] === 1
        || this.area[newFoodPosition.whatRow][newFoodPosition.whatColumn] === 'H'
        || this.area[newFoodPosition.whatRow][newFoodPosition.whatColumn] === 'F') {

        this.placeNewFood()
        return
    }
    this.positionFood = newFoodPosition
}

GameSnake.prototype.incScore = function () {
    this.score++
    this.displayScore(this.score)
}

GameSnake.prototype.displayScore = function (score) {
    this.score = score || this.score
    this.scoreContainer.innerHTML = 'Your curent score is: ' + this.score
}

const game1 = new GameSnake()

// // })()

