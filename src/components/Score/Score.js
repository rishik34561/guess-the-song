import React from 'react';
import classes from './Score.css';

const score = (props) => {
    return (
        <div className={classes.Score}>
            <h4 style={{textAlign: 'center'}}>Current Score: {props.num_correct} / {props.num_total}</h4>
        </div>
    )
}

export default score;