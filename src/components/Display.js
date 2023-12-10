import React from 'react';

import { StyledDisplay } from './styles/StyledDisplay';

const Display = ({ gameOver, text }) => (
    <StyledDisplay gameOver={gameOver}>
        {text}
    </StyledDisplay>
);
console.log('change')
export default Display;
