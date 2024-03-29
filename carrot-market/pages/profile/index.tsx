
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import useSWR, { SWRConfig } from 'swr';
import { Review, User } from '@prisma/client';
import { cls, loadImg } from '@libs/client/utils';
import Image from 'next/image';
import { withSsrSession } from '@libs/server/withSession';
import client from '@libs/server/client';
import { Suspense, useEffect, useState } from 'react';
import Loading from './loading';

interface ReviewWithUser extends Review {
  createdBy: User;
}

interface ReviewsResponse {
  ok: boolean;
  reviews: ReviewWithUser[];
}

const Reviews = () => {
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl('/api/reviews');
  }, []);
  const { data } = useSWR<ReviewsResponse>(url);

  return (
    <>
      {data?.reviews?.map((review) => (
        <div className='mt-12' key={review.id}>
          <div className='flex items-center space-x-4'>
            {review?.createdBy.avatar ? (
              <Image
                height={12}
                width={12}
                alt='avatar'
                src={loadImg({
                  imgId: review.createdBy.avatar,
                  varName: 'avatar',
                })}
                className='rounded-full bg-slate-400'
              />
            ) : (
              <div className='h-12 w-12 rounded-full bg-slate-400' />
            )}
            <div>
              <h4 className='text-sm font-bold text-gray-900'>
                {review.createdBy.name}
              </h4>
              <div className='flex items-center'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={cls(
                      'h-5 w-5',
                      review.score >= star ? 'text-yellow-400' : 'text-gray-400'
                    )}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div className='mt-4 text-sm text-gray-600'>
            <p>{review.review}</p>
          </div>
        </div>
      ))}
    </>
  );
};

const MiniProfile = () => {
  const { user } = useUser();
  return (
    <div className='mt-4 flex items-center space-x-3'>
      {user?.avatar ? (
        <Image
          alt='avatar'
          width={48}
          height={48}
          src={loadImg({ imgId: user?.avatar, varName: 'avatar' })}
          className='h-16 w-16 rounded-full bg-slate-500'
        />
      ) : (
        <div className='h-16 w-16 rounded-full bg-slate-500' />
      )}
      <div className='flex flex-col'>
        <span className='font-medium text-gray-900'>{user?.name}</span>
        <Link href='/profile/edit'>
          <div className='text-sm text-gray-700'>Edit profile &rarr;</div>
        </Link>
      </div>
    </div>
  );
};

const Profile: NextPage = () => {
  return (
    <Layout hasTabBar title='나의 캐럿'>
      <div className='px-4'>
        <Suspense fallback={<Loading />}>
          <MiniProfile />
        </Suspense>
        <div className='mt-10 flex justify-around'>
          <Link href='/profile/sold'>
            <div className='flex flex-col items-center'>
              <div className='flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-white'>
                <svg
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  ></path>
                </svg>
              </div>
              <span className='mt-2 text-sm font-medium text-gray-700'>
                판매내역
              </span>
            </div>
          </Link>
          <Link href='/profile/bought'>
            <div className='flex flex-col items-center'>
              <div className='flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-white'>
                <svg
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                  ></path>
                </svg>
              </div>
              <span className='mt-2 text-sm font-medium text-gray-700'>
                구매내역
              </span>
            </div>
          </Link>
          <Link href='/profile/loved'>
            <div className='flex flex-col items-center'>
              <div className='flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-white'>
                <svg
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  ></path>
                </svg>
              </div>
              <span className='mt-2 text-sm font-medium text-gray-700'>
                관심목록
              </span>
            </div>
          </Link>
        </div>
        <Suspense fallback={<Loading />}>
          <Reviews />
        </Suspense>
      </div>
    </Layout>
  );
};

const Page: NextPage = () => {
  return (
    <SWRConfig value={{ suspense: true }}>
      <Profile />
    </SWRConfig>
  );
};
// value={{
//   fallback: {
//     '/api/users/me': { ok: true, profile },
//   },
// }}

// export const getServerSideProps = withSsrSession(async function ({
//   req,
// }: NextPageContext) {
//   const profile = await client?.user.findUnique({
//     where: { id: req?.session.user?.id },
//   });
//   return {
//     props: JSON.parse(JSON.stringify(profile)),
//   };
// });

export default Page;
