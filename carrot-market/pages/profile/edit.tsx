import { NextPage } from 'next';
import Layout from '@components/layout';
import Input from '@components/input';
import Button from '@components/button';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useUser from '@libs/client/useUser';

interface EditProfileForm {
  email?: string;
  phone?: string;
  formErrors?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<EditProfileForm>();

  useEffect(() => {
    if (user?.email) setValue('email', user.email);
    if (user?.phone) setValue('phone', user.phone);
  }, [user, setValue]);

  const onValid = ({ email, phone }: EditProfileForm) => {
    if (email === '' && phone == '') {
      setError('formErrors', {
        message: 'Email OR Phone number aer required. you need to choose one',
      });
    }
  };
  return (
    <Layout canGoBack title='Edit Profile'>
      <form className='space-y-4 py-10 px-4' onSubmit={handleSubmit(onValid)}>
        <div className='flex items-center space-x-3'>
          <div className='h-14 w-14 rounded-full bg-slate-500' />
          <label
            htmlFor='picture'
            className='cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
          >
            Change
            <input
              id='picture'
              type='file'
              className='hidden'
              accept='image/*'
            />
          </label>
        </div>
        <Input
          required={false}
          register={register('email')}
          label='Email address'
          name='email'
          type='email'
        />
        <Input
          required={false}
          register={register('phone')}
          label='Phone number'
          name='phone'
          type='number'
          kind='phone'
        />
        {errors.formErrors ? (
          <span className='my-2 block font-bold text-red-500'>
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text='Update Profile' />
      </form>
    </Layout>
  );
};

export default EditProfile;
