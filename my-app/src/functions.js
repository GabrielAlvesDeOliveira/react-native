const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_,column) => {
            return{
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

const spreadMines = (board, minesAmount) => {
    const rows = board.length
    const columns = board[0].length 
    let minesPlanted = 0
    while(minesPlanted < minesAmount){

        const randomRow = Math.floor(Math.random() * rows, 10)
        const randomColumn = Math.floor(Math.random() * columns, 10)

        if(!board[randomRow][randomColumn].mined){
            board[randomRow][randomColumn].mined = true
        }

    }
}

const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)

}


export { createMinedBoard, createBoard, spreadMines }