import React from 'react';
import { LocaleConsumer } from '../contexts/LocaleContext';

function ToggleLocale() {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <button className="toggle-languange-button" onClick={toggleLocale}>
            {locale === 'id' ? 'en' : 'id'}
          </button>
        );
      }}
    </LocaleConsumer>
  );
}

export default ToggleLocale;
