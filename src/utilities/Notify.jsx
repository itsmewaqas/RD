import React, { useState } from 'react';
import close from '../assets/images/closeCross.svg';
import flag from '../assets/images/flag.svg';

function Notify(props) {

    return (
        <div className='notifyRow'>
            <p><img src={flag} alt="" />Once you confirm your email, you can log into our 30 day trial for free</p>
            <a onClick={props.notifyClose}><img src={close} alt="" /></a></div>
    );
}

export default Notify;