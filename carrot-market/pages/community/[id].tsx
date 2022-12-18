import { NextPage } from 'next';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useEffect } from 'react';
import Link from 'next/link';
import type { Answer, Post, User } from '@prisma/client';
import { AnswerWithUser } from '@components/answer';

import AnswerComponent from '@components/answer';
import WonderingAnswerCount from '@components/community/WonderingAnswerCount';
import useMutation from '@libs/client/useMutation';
import { useForm } from 'react-hook-form';

interface PostWithUser extends Post {
  user: User;
  answers: AnswerWithUser[];
  _count: {
    answers: number;
    wonderings: number;
  };
}

interface CommunityPostResponse {
  ok: boolean;
  post: PostWithUser;
  isWondering: boolean;
}

interface AnswerRespnose {
  ok: boolean;
  answer: Answer;
}

interface AnswerForm {
  answer: string;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  const { data, mutate } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );

  const [wonder, { loading }] = useMutation(
    `/api/posts/${router.query.id}/wonder`
  );
  const [answer, { data: answerData, loading: answerLoading }] =
    useMutation<AnswerRespnose>(`/api/posts/${router.query.id}/answer`);

  const onWonderClick = () => {
    if (!data || !data?.ok) return;
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            wonderings: data.isWondering
              ? data.post._count.wonderings - 1
              : data.post._count.wonderings + 1,
          },
        },
        isWondering: !data.isWondering,
      },
      false
    );
    if (!loading) wonder({});
  };
  const onValid = (form: AnswerForm) => {
    if (answerLoading) return;
    answer(form);
  };

  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
      mutate();
    }
  }, [answerData, reset, mutate]);

  useEffect(() => {
    if (!data) return;
    if (data.ok && !data.post) router.push('/community');
  }, [data, router]);

  return (
    <Layout canGoBack>
      <div>
        <span className='my-3 ml-4 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800'>
          동네질문
        </span>
        <div className='mb-3 flex cursor-pointer items-center space-x-3  border-b px-4 pb-3'>
          <div className='h-10 w-10 rounded-full bg-slate-300' />
          <div>
            <p className='text-sm font-medium text-gray-700'>
              {data?.post.user.name}
            </p>
            <Link href={`/profile/${data?.post?.userId}`}>
              <p className='text-xs font-medium text-gray-500'>
                View profile &rarr;
              </p>
            </Link>
          </div>
        </div>

        <div className='mt-2 px-4 text-gray-700'>
          <span className='font-medium text-orange-500'>Q. </span>
          {data?.post.question}
        </div>

        <WonderingAnswerCount
          wonderingCnt={data?.post._count.wonderings}
          answerCnt={data?.post._count.answers}
          isWondering={data?.isWondering}
          onClick={onWonderClick}
        />

        <div className='my-5 space-y-5 px-4'>
          {data?.post.answers.map((answer) => (
            <AnswerComponent key={answer.id} answer={answer} />
          ))}
        </div>

        <form className='px-4' onSubmit={handleSubmit(onValid)}>
          <TextArea
            name='description'
            placeholder='Answer this question!'
            required
            register={register('answer', { required: true, minLength: 5 })}
          />
          <button className='mt-2 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 '>
            {answerLoading ? 'Loading...' : 'Reply'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
