import './App.scss';
import { useEffect, useState } from 'react';
import { fetchBoard } from './api/mock';
import { Loader } from './components/Loader/Loader';
import Board from './components/Board/Board';


function App() {
    const [board, setBoard] = useState([]);
    const [amountPerWin, setAmountPerWin] = useState(0);
    const [loading, setLoading] = useState(true);
    const initBoard = async () => {
        setLoading(true);
        try {
            const {amountPerWin, board} = await fetchBoard()
            setAmountPerWin(amountPerWin);
            setBoard(board);
        } catch (error) {
            console.error('Initialization failed:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        initBoard();

    }, []);
    return (
        <div className='app'>
            {loading ? <Loader />:
                <Board board={board} amountPerWin={amountPerWin} initBoard={initBoard}/>
            }
        </div>
    );
}

export default App;
