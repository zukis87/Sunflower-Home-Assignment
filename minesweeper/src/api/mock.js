import {sleep} from "../utils/common";

const generateBoard = (bombs = 2, rows = 3, cols = 3) => {
    const totalCells = rows * cols;

    if (bombs > totalCells) {
        throw new Error("Too many bombs for the board size.");
    }
    const flatBoard = Array(bombs)
        .fill(false)
        .concat(Array(totalCells - bombs).fill(true))
        .sort(() => Math.random() - 0.5);

    const board = [];
    for (let i = 0; i < rows; i++) {
        board.push(
            flatBoard.slice(i * cols, (i + 1) * cols)
                .map(isWinning => ({ isWinning }))
        );
    }
    return board;
}
export const fetchBoard = async (amountPerWin = 10) => {
    await sleep(1000);
    return {
        board: generateBoard(),
        amountPerWin
    }
}