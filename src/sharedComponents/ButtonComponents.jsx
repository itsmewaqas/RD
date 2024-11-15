import React, { useState } from 'react';

function SimpleButton(props) {
    return (
        <button
            className='actionButtonStyle1'
            disabled={props.disabled}
            id={props.buttonID}
            onClick={props.buttonClick}>
            <img src={props.buttonIcon} alt="" />
            {props.buttonText}
        </button>
    );
}

function OutlineButton(props) {
    return (
        <button
            className='actionButtonStyle2'
            disabled={props.disabled}
            id={props.buttonID}
            onClick={props.buttonClick}>
            <img src={props.buttonIcon} alt="" />
            {props.buttonText}
        </button>
    );
}

function FilledButton(props) {
    return (
        <button
            className='actionButtonStyle3'
            disabled={props.disabled}
            id={props.buttonID}
            onClick={props.buttonClick}>
            <img src={props.buttonIcon} alt="" />
            {props.buttonText}
        </button>
    );
}

function ModeViewButton(props) {
    return (
        <button
            className="actionButtonStyle4"
            style={{ backgroundColor: props.activStyle }}
            disabled={props.disabled}
            id={props.buttonID}
            onClick={props.buttonClick}>
            <img src={props.buttonIcon} alt="" />
        </button>
    );
}

export { SimpleButton, OutlineButton, FilledButton, ModeViewButton };