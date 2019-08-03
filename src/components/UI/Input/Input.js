import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    const optionsArray = props.elementConfig.options;
    
    inputElement = (
        <select 
        //className={inputClasses.join(' ')} 
        value={props.value}
        onChange={props.changed}>
        {optionsArray.map(option => (
            <option key={option.value} value={option.value}>
                {option.value}
            </option>
        ))}
        </select>); 
            
    return (
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>
    );
    
}

export default input;