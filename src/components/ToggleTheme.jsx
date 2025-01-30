import React from 'react';
import { ThemeConsumer } from '../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function ToggleTheme() {
  return (
    <ThemeConsumer >
      {({ theme, toggleTheme }) => {
        return (
          <button className="toggle-theme-button" onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        );
      }}
    </ThemeConsumer>
  );
}

export default ToggleTheme;
