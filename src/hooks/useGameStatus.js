import { useState, useEffect, useCallback, useMemo } from "react";

export const useGameStatus = rowsCleared => {
    //states
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);
    let linePoints = useMemo(() => {}, []);
    linePoints = [40, 100, 300, 1200];

    
    //useCallback avoids infinite loops
    const calcScore = useCallback(() => {
        //Check if i have a score to count
        if(rowsCleared > 0) {
            //How original Tetris score is calculated
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
            setRows(prev => prev + rowsCleared);
        }
    }, [level, linePoints, rowsCleared])

    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score]);

    return[score, setScore, rows, setRows, level, setLevel];

}