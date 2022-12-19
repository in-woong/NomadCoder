import { NextPage } from 'next';
import Layout from '@components/layout';
import Message from '@components/message';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Stream } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';

interface StreamResponse {
  ok: true;
  streams: Stream;
}

interface MessageForm {
  message: string;
}

const StreamDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null
  );
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${router.query.id}/message`
  );
  const onValid = (form: MessageForm) => {
    if (loading) return;
    sendMessage(form);
    reset();
  };

  return (
    <Layout canGoBack>
      <div className='space-y-4 px-4 py-10'>
        <div className='aspect-video w-full rounded-md bg-slate-300 shadow-sm' />
        <div className='mt-5'>
          <h1 className='text-3xl font-bold text-gray-900'>
            {data?.streams?.name}
          </h1>
          <span className='mt-3 block text-2xl text-gray-900'>
            ${data?.streams?.price}
          </span>
          <p className=' my-6 text-gray-700'>{data?.streams?.description}</p>
        </div>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Live Chat</h2>
          <div className='h-[50vh] space-y-4 overflow-y-scroll py-10  px-4 pb-16'></div>
          <div className='fixed inset-x-0 bottom-0  bg-white py-2'>
            <form
              onSubmit={handleSubmit(onValid)}
              className='relative mx-auto flex w-full  max-w-md items-center'
            >
              <input
                type='text'
                {...register('message', { required: true })}
                className='w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500'
              />
              <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
                <button className='flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'>
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
