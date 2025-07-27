const squareRegistry = new Map();

const ChessSquare = (x,y) => {
  const xPos = x;
  const yPos = y;
  let predecessor;

  const KNIGHT_OFFSETS = [
    [1, 2], [1, -2],
    [2, 1], [2, -1],
    [-1, 2], [-1, -2],
    [-2, 1], [-2, -1]
  ]

  const getPredecessor = () => predecessor;
  const setPredecessor = (newPred) => {predecessor ||= newPred}

  const name = () => `${x}, ${y}`;
  const newSquareForm = ([xOffset, yOffset]) => {
    const [newX, newY] = [xPos + xOffset, yPos + yOffset];
    if(newX >= 0 && newX < 8 && newY >= 0 && newY < 8){
        return ChessSquare(newX, newY);
    }
    return null;
  }
  const createKnightMoves = () => {
    return KNIGHT_OFFSETS.map(newSquareForm).filter(Boolean);
  }
  if(squareRegistry.has(name())){
    return squareRegistry.get(name())
  }else{
    const newSquare = {name, getPredecessor, setPredecessor, createKnightMoves};
    squareRegistry.set(name(),newSquare);
    return newSquare;
  }
}
  const knightsTravails = (start, finish) =>{
    squareRegistry.clear();

    const origin = ChessSquare(...start);
    const target = ChessSquare(...finish);
    
    const queue = [target];
    while(!queue.includes(origin)){
        const currentSquare = queue.shift();

        const enqueueList = currentSquare.createKnightMoves();
        enqueueList.forEach((square) => square.setPredecessor(currentSquare));
        queue.push(...enqueueList);
    }
    const path = [origin];
    while(!path.includes(target)){
        const nextSquare = path.at(-1).getPredecessor();
        path.push(nextSquare);
    }
    console.log(`The shortest path was ${path.length -1} moves!`);
    console.log(`The moves were:`);
    path.forEach(square => console.log(square.name()));

  }

module.exports = knightsTravails;
