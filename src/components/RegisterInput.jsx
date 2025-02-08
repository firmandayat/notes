import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { LocaleConsumer } from '../contexts/LocaleContext';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    register({
      name,
      email,
      password,
    });
  };

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <form onSubmit={onSubmitHandler} className="register-input">
          <input
            type="text"
            placeholder={locale === 'en' ? 'Name' : 'Nama'}
            value={name}
            onChange={onNameChange}
          />
          <input
            autoComplete='current-email'
            type="email"
            placeholder={locale === 'en' ? 'Email' : 'Surel'}
            value={email}
            onChange={onEmailChange}
          />
          <input
            type="password"
            placeholder={locale === 'en' ? 'Password' : 'Sandi'}
            autoComplete="current-password"
            value={password}
            onChange={onPasswordChange}
          />
          <button className="regis">
            {locale === 'en' ? 'Register' : 'Daftar'}
          </button>
        </form>
      )}
    </LocaleConsumer>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
