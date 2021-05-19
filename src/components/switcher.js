import React from 'react';
import './switcher.scss';

const Switcher = (props) => {
    return (
        <form className="radio" onChange={props.handleThemeChange}>
            <input label="1" type="radio" id="one" name="theme" value="one" checked={props.checked === 'one'} />
            <input label="2" type="radio" id="two" name="theme" value="two" checked={props.checked === 'two'} />
            <input label="3" type="radio" id="three" name="theme" value="three" checked={props.checked === 'three'} />
        </form>
    )
}

export default Switcher;