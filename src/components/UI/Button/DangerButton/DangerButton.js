import React from 'react';

const dangerButton = (props) => (
    <button
        className="btn btn-danger"
        onClick={props.clicked}>{props.children}</button>
);

export default dangerButton;