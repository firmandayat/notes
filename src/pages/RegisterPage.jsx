import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/network-data';
import { LocaleConsumer } from '../contexts/LocaleContext';

function RegisterPage() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/');
    }
  }

  return (
    <section className="register-page">
      <RegisterInput register={onRegisterHandler} />
      <center>
        <LocaleConsumer>
          {({ locale }) => (
            <p>
              {locale === 'en' ? 'Back to' : 'Kembali ke'}
              <Link className='link' to="/">{locale === 'en' ? ' Login' : ' Masuk'}</Link>
            </p>
          )}
        </LocaleConsumer>
      </center>
    </section>
  );
}

export default RegisterPage;
