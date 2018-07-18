// (function () {

function GameSnake() {
    this.container = document.body

    this.areaRowsLengthX = 10
    this.areaColumnsLengthY = 10
    this.gameContainer = null
    this.scoreContainer = null

    this.initialArea = this.createEmptyArea(this.areaRowsLengthX, this.areaColumnsLengthY)
    this.area = JSON.parse(JSON.stringify(this.initialArea))

    this.initialPosition = (whatRow, whatColumn) => ({
        whatRow: whatRow,
        whatColumn: whatColumn
    })

    this.positionFood = JSON.parse(JSON.stringify(this.initialPosition(3, 3)))

    this.snakeBody = [
        this.initialPosition(6, 6),
        this.initialPosition(7, 6),
        this.initialPosition(8, 6),
    ]

    this.theLastMove = this.initialPosition(-1, 0)
    this.mainIntervalId = setInterval(
        () => this.checkIfMovieIsPossible(this.theLastMove.whatRow, this.theLastMove.whatColumn),
        500
    )

    this.score = 0

    this.init()
}

GameSnake.prototype.createEmptyArea = function (areaRowsLengthX, areaColumnsLengthY) {
    return Array(areaRowsLengthX).fill(1).map(function () {
        return Array(areaColumnsLengthY).fill(1)
    })
}

GameSnake.prototype.init = function () {
    this.prepareLayout()
    this.addFoodToArea()
    this.addSnakeToArea()
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

GameSnake.prototype.render = function () {
    this.gameContainer.innerHTML = ''

    this.area = JSON.parse(JSON.stringify(this.initialArea))

    this.addSnakeToArea()
    this.addFoodToArea()

    this.area.forEach((areaRow, whatRow) => {
        var row = this.makeRow()

        areaRow.forEach((element, whatColumn) => {
            var cell = this.makeCell(element, whatColumn, whatRow)
            row.appendChild(cell)
        })

        this.gameContainer.appendChild(row)

    })
}

GameSnake.prototype.makeRow = function () {
    const row = document.createElement('div')
    row.classList.add('game__row')
    return row
}

GameSnake.prototype.makeCell = function (element, whatColumn, whatRow) {
    const makeGameElement = (modifier) => () => {
        const el = document.createElement('div')
        el.classList.add('game__cell--' + modifier)
        return el
    }

    const makeCellEmpty = makeGameElement('empty')
    const makeCellHeadSnake = makeGameElement('snake-head')
    const makeCellBodySnake = makeGameElement('snake-body')
    const makeCellFood = makeGameElement('food')

    if(this.snakeBody[0].whatRow === whatRow &&
        this.snakeBody[0].whatColumn === whatColumn){
            return makeCellHeadSnake()
        }

    switch (element) {
        case 1:
            return makeCellEmpty();
        case 0:
            return makeCellBodySnake()
        case true:
            return makeCellFood()
    }

}

GameSnake.prototype.addSnakeToArea = function () {
    for (let i = 0; i < this.snakeBody.length; i++) {
        this.area[this.snakeBody[i].whatRow][this.snakeBody[i].whatColumn] = 0
    }
}

GameSnake.prototype.addFoodToArea = function () {
    this.area[this.positionFood.whatRow][this.positionFood.whatColumn] = true
}

GameSnake.prototype.eventListeners = function () {

    this.container.addEventListener('keydown', event => {
        event.preventDefault()

        switch (event.key) {
            case 'ArrowLeft':
                this.rememberTheLastMove(0, -1)
                this.roundPicture(0, -1)
                break

            case 'ArrowUp':
                this.rememberTheLastMove(-1, 0)
                this.roundPicture(-1, 0)
                break

            case 'ArrowRight':
                this.rememberTheLastMove(0, 1)
                this.roundPicture(0, 1)
                break

            case 'ArrowDown':
                this.rememberTheLastMove(1, 0)
                this.roundPicture(1, 0)
                break
        }
    })
}

GameSnake.prototype.checkIfMovieIsPossible = function (deltaRow, deltaColumn) {
    if(this.area[this.snakeBody[0].whatRow + deltaRow][this.snakeBody[0].whatColumn + deltaColumn] == true){
        this.move(deltaRow, deltaColumn)
    } else {
        this.endGame()
    }
}

GameSnake.prototype.rememberTheLastMove = function (whatRow, whatColumn) {
    this.theLastMove.whatRow = whatRow
    this.theLastMove.whatColumn = whatColumn
}

GameSnake.prototype.endGame = function () {
    window.location = ''
    alert('GAME OVER\n' + 'You completed the game with: ' + this.score + ' points!' + '\n Congratulations!')
}

GameSnake.prototype.move = function (deltaRow, deltaColumn) { 

    if(this.area[this.snakeBody[0].whatRow + deltaRow][this.snakeBody[0].whatColumn + deltaColumn] !== 
        this.area[this.positionFood.whatRow][this.positionFood.whatColumn])
    {
        this.createNewSnakeBody(deltaRow, deltaColumn)

    } else {
        this.placeNewFood()
        this.createNewSnakeBodyWithGrow(deltaRow, deltaColumn)
        this.incScore()
    }

    this.render()
}

GameSnake.prototype.createNewSnakeBody = function (deltaRow, deltaColumn) {

    var newSnakeHead = [{
        whatRow: this.snakeBody[0].whatRow + deltaRow,
        whatColumn: this.snakeBody[0].whatColumn + deltaColumn }]

    var snakeBodyWithouLastElement = this.snakeBody.slice(0, -1)
    var newSnakeBody = newSnakeHead.concat(snakeBodyWithouLastElement)

    this.snakeBody = newSnakeBody
}

GameSnake.prototype.createNewSnakeBodyWithGrow = function (deltaRow, deltaColumn) {

    var newSnakeHead = [{
        whatRow: this.snakeBody[0].whatRow + deltaRow,
        whatColumn: this.snakeBody[0].whatColumn + deltaColumn }]

    var newSnakeBody = newSnakeHead.concat(this.snakeBody)
    
    this.snakeBody = newSnakeBody
}

GameSnake.prototype.placeNewFood = function () {
    var newFoodPosition = {
        whatRow: Math.floor(Math.random() * this.areaRowsLengthX),
        whatColumn: Math.floor(Math.random() * this.areaColumnsLengthY)
    }

    if (this.area[newFoodPosition.whatRow][newFoodPosition.whatColumn] === 0
        || this.area[newFoodPosition.whatRow][newFoodPosition.whatColumn] === true
    ) {

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


GameSnake.prototype.roundPicture = function (bottomTop, rightLeft){

    if (bottomTop === 0){
        rightLeft > 0? document.querySelector('.game__cell--snake-head').style.backgroundImage = 'url("./penguin_right")' : 
        document.querySelector('.game__cell--snake-head').style.backgroundImage = 'url("./penguin_left")' 
    } else {

        bottomTop > 0? document.querySelector('.game__cell--snake-head').style.backgroundImage = 'url("./penguin_bottom")' : 
        document.querySelector('.game__cell--snake-head').style.backgroundImage = 'url("./penguin_top")' 
    
    }
}