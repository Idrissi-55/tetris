import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = newStage =>
            newStage.reduce((acc, row) => {
                //Check if row contains empty cell
                if(row.findIndex(cell => cell[0] === 0) === -1) {
                    console.log("empty row")
                    setRowsCleared(prev => prev +1);
                    //We drop the actual row and add a new one on the stage
                    acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return acc;
                }
                //else we just add the row to the stage
                acc.push(row);
                return acc;
            }, [])


        const updateStage = prevStage => {
            // Clear the stage
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
                );

            // Draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if(value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            // Check if the tetromino has collided
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                })
            });
            // I check if there is a collision
            if(player.collided) {
                console.log('collision !')
                resetPlayer();
                return sweepRows(newStage)
            }

            return newStage;
        }

        setStage(prev => updateStage(prev))
    }, [player, resetPlayer, rowsCleared]);

    return [stage, setStage];
}