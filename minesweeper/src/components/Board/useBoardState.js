import {useEffect, useState} from "react";

export const useBoardState = ({board, amountPerWin}) => {
    const [boardStatus, setBoardStatus] = useState([]);
    const [score, setScore] = useState(0);
    const [isEndGame, setIsEndGame] = useState(false);
    const [showCashOut, setShowCashOut] = useState(false);

    const initBoardStatus = () =>
        setBoardStatus(
            board.map(
                row => row.map(() => ({isClicked: false}))
            )
        );

    useEffect(() => {
        initBoardStatus();
        setIsEndGame(false);
        setShowCashOut(false);
        setScore(0);
    }, [board]);

    const toggleTile = (i, j) => {
        if (isEndGame || boardStatus[i][j].isClicked) return;

        setBoardStatus(prev =>
            prev.map((row, r) =>
                row.map((cell, c) =>
                    r === i && c === j ? {...cell, isClicked: true} : cell
                )
            )
        );

        if (board[i][j].isWinning) {
            setScore(prev => prev + amountPerWin);
        } else {
            setIsEndGame(true);
            setScore(0);
        }
    };

    const onCashOut = () => {
        setIsEndGame(true);
        setShowCashOut(true);
        setTimeout(() => {
            setShowCashOut(false);
            setScore(0);
        }, 1000);
    };

    return {boardStatus, score, isEndGame, showCashOut, toggleTile, onCashOut};
}