import React from 'react';

const score = (props) => {
    return (
        <h4>Current Score: {props.num_correct} / {props.num_total}</h4>
    )
}

export default score;