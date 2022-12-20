import { NextPage } from 'next';
import Layout from '@components/layout';
import Input from '@components/input';
import Button from '@components/button';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useUser from '@libs/client/useUser';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const {
    register,
    setValue,
    setError,
    formState: { errors },
    clearErrors,
    handleSubmit,
    watch,
  } = useForm<EditProfileForm>({ mode: 'onBlur' });

  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  const avatar = watch('avatar');
  const [avatarPreview, setAvatarPReview] = useState('');

  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === '' && phone === '' && name === '') {
      return setError('formErrors', {
        message: 'Email OR Phone number aer required. you need to choose one',
      });
    }
    if (avatar && avatar.length > 0) {
      const { id, uploadURL } = await (await fetch('/api/files')).json();
      const form = new FormData();
      form.append('file', avatar[0], user?.name);
      await fetch(uploadURL, {
        method: 'POST',
        body: form,
      });

      // editProfile({ email, phone, name });
    } else {
      // editProfile({ email, phone, name });
    }
  };

  const onChange = () => {
    if (errors?.formErrors?.message) {
      clearErrors('formErrors');
    }
  };

  useEffect(() => {
    if (user?.email) setValue('email', user.email);
    if (user?.phone) setValue('phone', user.phone);
    if (user?.name) setValue('name', user.name);
  }, [user, setValue]);

  useEffect(() => {
    if (data && !data.ok) {
      setError('formErrors', { message: data.error }, { shouldFocus: true });
    }
  }, [data, setError]);

  useEffect(() => {
    if (data?.ok === true) {
      router.push(`/profile`);
    }
  }, [data, router]);

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPReview(URL.createObjectURL(file));
    }
  }, [avatar]);
  return (
    <Layout canGoBack title='Edit Profile'>
      <form
        className='space-y-4 py-10 px-4'
        onChange={onChange}
        onSubmit={handleSubmit(onValid)}
      >
        <div className='flex items-center space-x-3'>
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt='avatarPreview'
              className='h-14 w-14 rounded-full '
            />
          ) : (
            <div className='h-14 w-14 rounded-full bg-slate-500' />
          )}
          <label
            htmlFor='picture'
            className='cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
          >
            Change
            <input
              {...register('avatar')}
              id='picture'
              type='file'
              className='hidden'
              accept='image/*'
            />
          </label>
        </div>
        <Input
          required={false}
          register={register('name')}
          label='Name'
          name='name'
          type='name'
          kind='text'
        />
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
        <Button loading={loading} text={'Update Profile'} />
      </form>
    </Layout>
  );
};

export default EditProfile;
