import { resizeImage } from 'next/dist/server/image-optimizer';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Forms() {
  const { register, handleSubmit } = useForm();
  const onValid = () => {
    console.log("I'm valid");
  };
  const inValid = (e) => {
    console.log(e);
  };
  return (
    <form onSubmit={handleSubmit(onValid, inValid)}>
      <input
        {...register('username', { required: true })}
        type='text'
        placeholder='Username'
      />
      <input
        {...register('email', { required: true })}
        type='email'
        placeholder='Email'
      />
      <input
        {...register('password', { required: true })}
        type='password'
        placeholder='Password'
      />
      <input type='submit' value='Create Account' />
    </form>
  );
}
