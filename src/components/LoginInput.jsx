import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { LocaleConsumer } from '../contexts/LocaleContext';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <form onSubmit={onSubmitHandler} className="login-input">
          <input
            type="email"
            placeholder={locale === 'en' ? 'Email' : 'Surel'}
            value={email}
            onChange={onEmailChange}
          />
          <input
            type="password"
            placeholder={locale === 'en' ? 'Password' : 'Sandi'}
            value={password}
            onChange={onPasswordChange}
          />
          <button className="login">
            {locale === 'en' ? 'Login' : 'Masuk'}
          </button>
        </form>
      )}
    </LocaleConsumer>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
