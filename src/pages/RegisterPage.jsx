import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/network-data';

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
        <p>
          Kembali ke <Link to="/">Masuk</Link>
        </p>
      </center>
    </section>
  );
}

export default RegisterPage;
