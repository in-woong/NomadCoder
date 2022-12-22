import React, { useState } from 'react';

export default function Forms() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState();

  const onUsernameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setUsername(value);
  };
  const onEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setEmail(value);
  };
  const onPasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setPassword(value);
  };

  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === '' || email === '' || password == '') {
      setFormErrors('All fields are required');
    }
    console.log(username, email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onUsernameChange}
        value={username}
        type='text'
        placeholder='Username'
        minLength={5}
        required
      />
      <input
        onChange={onEmailChange}
        value={email}
        type='email'
        placeholder='Email'
        required
      />
      <input
        onChange={onPasswordChange}
        value={password}
        type='password'
        placeholder='Password'
        required
      />
      <input type='submit' value='Create Account' />
    </form>
  );
}
