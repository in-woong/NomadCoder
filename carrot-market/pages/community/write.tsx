import { NextPage } from 'next';
import TextArea from '@components/textarea';
import Layout from '@components/layout';
import Button from '@components/button';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import useCoords from '@libs/client/useCoords';

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutation<WriteResponse>('/api/posts');
  const onValid = (data: WriteForm) => {
    if (loading) return;
    post({ ...data, latitude, longitude });
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title='Write Post'>
      <form onSubmit={handleSubmit(onValid)} className='space-y-4 p-4'>
        <TextArea
          register={register('question', { required: true, minLength: 5 })}
          required
          placeholder='Ask a question!'
        />
        <Button loading={loading} text={'Submit'} />
      </form>
    </Layout>
  );
};

export default Write;
