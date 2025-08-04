import './Board.scss';
import Tile from './Tile';
import {useBoardState} from "./useBoardState";

const Board = ({board, amountPerWin, initBoard}) => {

    const {
        boardStatus,
        score,
        isEndGame,
        showCashOut,
        toggleTile,
        onCashOut
    } = useBoardState({board, amountPerWin});

    return <div className='wrapper'>
        <div className='score'>Balance: {score} Coins</div>
        <div className='rows-wrapper'>
            {boardStatus.length && board.map((rows, i) =>
                <div className='row' key={i}>{rows.map(({isWinning}, j) =>
                    <Tile
                        key={`${i}${j}`}
                        clicked={boardStatus[i][j].isClicked}
                        winning={board[i][j].isWinning}
                        endgame={isEndGame}
                        showCashOut={showCashOut}
                        onClick={() => toggleTile(i, j)}
                    />)}
                </div>
            )
            }
        </div>
        {(score > 0 || isEndGame) && (
            <div className='button' onClick={isEndGame ? initBoard : onCashOut}>
                {isEndGame ? 'Restart' : 'Cash Out'}
            </div>
        )}
        {showCashOut && <div className="cash-out-text">💰{score} COINS CASHED OUT!</div>}
    </div>
}
export default Board;