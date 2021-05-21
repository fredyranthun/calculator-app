import React from 'react';
import styled, { ThemeProvider } from 'styled-components'

const StyledSwitcher = styled.form`
	background: ${props => props.theme.keypad};
	padding: 0.2rem;
	border-radius: 0.3rem;
	height: 0.6rem;
	position: relative;
	display: flex;
	align-items: center;
	gap: 0.2rem;
	justify-content: space-between;
`
const StyledInput = styled.input`
    margin: 0;
	appearance: none;
	outline: none;
	cursor: pointer;
	padding: 0 0.1rem;
	color: ${props => props.theme.text1};
	font-size: 0.3rem;
	transition: all 100ms ease-in-out;
    &:checked {
        background: ${props => props.theme.key3.background};
        border-radius: 50%;
    }
    &::before {
        content: attr(label);
	    display: inline-block;
    }
`

const LabelTheme = styled.span`
    margin-right: 0.2rem;
    margin-left: auto;
    font-size: 0.3rem;
    color: ${props => props.theme.text1};
`

const Switcher = (props) => {
    return (
        <ThemeProvider theme={props.theme}>
            <LabelTheme>theme</LabelTheme>
            <StyledSwitcher onChange={props.handleThemeChange}>
                <StyledInput label="1" type="radio" id="one" name="theme" value="one" defaultChecked />
                <StyledInput label="2" type="radio" id="two" name="theme" value="two" />
                <StyledInput label="3" type="radio" id="three" name="theme" value="three" />
            </StyledSwitcher>
        </ThemeProvider>
    )
}

export default Switcher;