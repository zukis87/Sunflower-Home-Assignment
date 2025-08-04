import React from 'react';
import clsx from 'clsx';
import './Tile.scss';

const Tile = ({clicked, winning, endgame, showCashOut, onClick}) => {
    const showIcon = clicked && (winning || endgame); // תראה משהו רק אם נלחץ ובמשחק נגמר

    return (
        <div
            className={clsx('tile', {
                clicked,
                winning,
                endgame,
                losing: !winning,
                'win-flash': showCashOut && clicked && winning,
                'loss-flash': endgame && clicked && !winning
            })}
            onClick={onClick}
        >
            {showIcon &&
                <span className="tile-content">
                    {winning ? '💰' : '💣'}
                </span>
            }
        </div>
    );
};

export default Tile;