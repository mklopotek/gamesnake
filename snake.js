
(function () {

//"GLOBAL" VARIABLES

    //this two variable are the number of rows (areaLengthX) and the number of columns (areaLenghtY)
    var areaRowsLengthX = 10
    var areaColumnsLengthY = 10

    var gameContainer = ''
    var scoreContainer = ''
    // var timeContainer

    //here we declaared that when we call initialArea it call the function createClearArea and give her a two variable -areaRowsLenghtX and areaColumnsLenghtY 
    var initialArea = createClearArea(areaRowsLengthX, areaColumnsLengthY)

    // console.log(initialArea) //it works

    // var clearArea = JSON.parse(JSON.stringify(initialArea))  //i dont know yet if there should be a clear, first area or only one area for all
    var area = JSON.parse(JSON.stringify(initialArea))

    // console.log(clearArea)                   //it works
    // console.log(initialArea !== clearArea)   //it works because it says: true! (so it copy a old area but without references!!!! (changing area not changing a initialArea))


    const initialPosition = (whatRow, whatColumn) => ({
        whatRow: whatRow,
        whatColumn: whatColumn
    })

    var initialPositionSnakeHead = initialPosition(6, 6)
    var initialPositionSnakeBody1 = initialPosition(7, 6)
    var initialPositionSnakeBody2 = initialPosition(8, 6)
    var initialPositionFood = initialPosition(3, 3)

    // console.log(initialPositionSnakeHead)

    var foodPosition

    var time
    var score 

    var gameInterval 

    //this function create clear area

    function createClearArea(areaRowsLengthX, areaColumnsLengthY){
        return Array(areaRowsLengthX).fill('0').map(function(element, index, array){
            return Array(areaColumnsLengthY).fill('0')
        })
    }

    // console.log(createClearArea(10,2))     //it works

    function init(container) {
        prepareLayout(container)
        addToAreaSnakeAndFood()
        render()
        // this function should be called when we want to init game
        // it accepts 1 argument - dom node of the container
        // where game should be rendered, eg it can be body of document
        // this function should render first frame of game and set all
        // of the variables like time to game end that werent predefinied
    } 
    
    function prepareLayout(container) {

        function makeGameContainer(){
            var gameContainer = document.createElement('div')
            var atribute = document.createAttribute('class')
            atribute.value = 'game'
            gameContainer.setAttributeNode(atribute)
    
            return gameContainer
        }

        gameContainer = makeGameContainer()

        scoreContainer = document.createElement('div')
        // timeContainer = document.createElement('div')
        container.appendChild(scoreContainer)
        // container.appendChild(timeContainer)
        container.appendChild(gameContainer)
    }

    // console.log(prepareLayout())

    //this function will be transform the table from js to HTML 
    function render() {

        gameContainer.innerHTML = ''

        // console.log(gameContainer)

        addToAreaSnakeAndFood()   //to game container we invoked this function and give the area with snake and food

    
        area.forEach(function (areaRow, index, array) {

            var row = makeRowsforElementsInArea()

            areaRow.forEach(function(element, index, array){

                var cell = makeCellforElementsThatInElementsInArea(element)

                // console.log(cell)

                row.appendChild(cell)

                // console.log(row)

            })

            gameContainer.appendChild(row)

            console.log(gameContainer)   //it work i hope ;) 

        })

    }


    // console.log(render())     

    //helper for render 

    function makeRowsforElementsInArea(){
        var row = document.createElement('div')
        var atribute = document.createAttribute('class')
        atribute.value = 'game__row'
        row.setAttributeNode(atribute)

        return row

    }

    // console.log(makeRowsforElementsInArea())  //it works but maybe I should change the name of class for row? 

    function makeCellforElementsThatInElementsInArea(element){

        const makeCellEmpty = function(){
            var empty = document.createElement('div')
            var atribute = document.createAttribute('class')
            atribute.value = 'game__cell--empty'
            empty.setAttributeNode(atribute)

            return empty
        }
        
        const makeCellHeadSnake = function(){
            var head = document.createElement('div')
            var atribute = document.createAttribute('class')
            atribute.value = 'game__cell--snake-head'
            head.setAttributeNode(atribute)

            return head
        }

        const makeCellBodySnake = function(){
            var body = document.createElement('div')
            var atribute = document.createAttribute('class')
            atribute.value = 'game__cell--snake-body'
            body.setAttributeNode(atribute)

            return body
        }

        const makeCellFood = function(){
            var food = document.createElement('div')
            var atribute = document.createAttribute('class')
            atribute.value = 'game__cell--food'
            food.setAttributeNode(atribute)

            return food
        }

        if(element === '0'){

           return  makeCellEmpty()
        
        } else if(element === 'H') {

           return makeCellHeadSnake()

        } else if(element === '1'){

           return makeCellBodySnake()

        } else if(element === 'F'){

            return makeCellFood()
        }

 
    }

    function addToAreaSnakeAndFood () {

        area = JSON.parse(JSON.stringify(initialArea))    //is this declaration is necessary? this is also in top 

        area[initialPositionSnakeHead.whatRow][initialPositionSnakeHead.whatColumn] = 'H'

        area[initialPositionSnakeBody1.whatRow][initialPositionSnakeBody1.whatColumn] = '1'
        area[initialPositionSnakeBody2.whatRow][initialPositionSnakeBody2.whatColumn] = '1'

        area[initialPositionFood.whatRow][initialPositionFood.whatColumn] = 'F'

    }

 
    // console.log(area)   //it works the clear area have changed and added H, F, 1, 1 :) 
















    // here you can put some functions taht renders only parts of the game 
    // and will be used in render function

    // here you will attach all events listeners like oncliks or keydowns
    function attachEventListeners() { }

    // move should be another function called eg. when event is fired
    // it is quite obvious that move bakwards is a move fovard with minus sign ;)
    function move() { }

    // in this fucntion you can do all stuff that needs to be repeated
    // you can invoke this function in an interval
    // you can set that interval in init function
    function gameTick() { }

    // below functions are self-describing ;)
    function incScore() { }
    function displayScore() { }

    function decTime() { }
    function displayTIme() { }

    // invoked when game ends (you can check if time elepsed eg. in gameTick function)
    function endGame() { }

    // HELPERS

    // here put some functions that are not directly itto the game
    // but will help to do some general stuff - like make an array of ...

    // START GAME
    // document.body is an example of the container for the game





    
    init(document.body)
})()