
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Button from '@components/button';
import Layout from '@components/layout';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import { Product, User } from '@prisma/client';
import useMutation from '@libs/client/useMutation';
import { cls, loadImg } from '@libs/client/utils';
import Image from 'next/image';
import client from '@libs/server/client';
interface ProductwithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductwithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage<ItemDetailResponse> = ({
  product,
  relatedProducts,
  isLiked,
}) => {
  // const router = useRouter();
  // const { data, mutate } = useSWR<ItemDetailResponse>(
  //   router.query.id && `/api/products/${router.query.id}`
  // );
  // const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  // const onFavClick = () => {
  //   if (!data) return;
  //   mutate((prev) => prev && { ...prev, isLiked: !data.isLiked }, false);
  //   toggleFav({});
  // };

  return (
    <Layout canGoBack>
      <div className='px-4 py-4'>
        <div className='mb-8'>
          {product.image ? (
            <div className='relative pb-80'>
              <Image
                alt='product'
                src={loadImg({ imgId: product.image })}
                className='bg-slate-300 object-center '
                fill={true}
              />
            </div>
          ) : (
            <div className='h-96 bg-gray-400' />
          )}

          <div className='flex items-center space-x-3 border-t border-b py-3'>
            {product.user.avatar ? (
              <Image
                alt='avatar'
                src={loadImg({
                  imgId: product.user.avatar,
                  varName: 'avatar',
                })}
                width={10}
                height={10}
                className='h-12 w-12 rounded-full bg-slate-300'
              />
            ) : (
              <div className='h-12 w-12 rounded-full bg-slate-300' />
            )}
            <div>
              <p className='text-sm font-medium text-gray-700'>
                {product?.user?.name}
              </p>
              <Link href={`/profile/${product?.user?.id}`}>
                <p className='cursor-pointer text-xs font-medium text-gray-500'>
                  View profile &rarr;
                </p>
              </Link>
            </div>
          </div>
          <div className='mt-5'>
            <h1 className='text-3xl font-bold text-gray-900'>
              {product?.name}
            </h1>
            <span className='mt-3 block text-3xl text-gray-900'>
              ${product?.price}
            </span>
            <p className=' my-6 text-gray-700'>{product?.description}</p>
            <div className='flex items-center justify-between space-x-2'>
              <Button large text='Talk to seller' />
              <button
                // onClick={onFavClick}
                className={cls(
                  'flex items-center justify-center rounded-md p-3',
                  isLiked
                    ? 'text-red-500 hover:bg-red-600 hover:text-white'
                    : 'text-gray-400 hover:bg-gray-100 hover:text-gray-500'
                )}
              >
                {isLiked ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    className='h-6 w-6 '
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Similar items</h2>
          <div className='mt-6 grid grid-cols-2 gap-4'>
            {relatedProducts?.map((product) => (
              <Link key={product.id} href={`/items/${product.id}`}>
                <div>
                  {product.image ? (
                    <Image
                      alt='product'
                      src={loadImg({ imgId: product.image })}
                      className='mb-4 h-56 w-full bg-slate-300'
                    />
                  ) : (
                    <div className='mb-4 h-56 w-full bg-slate-300' />
                  )}
                  <h3 className='-mb-1 text-gray-700'>{product.name}</h3>
                  <span className='text-sm font-medium text-gray-900'>
                    ${product.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (!ctx?.params?.id) {
    return {
      props: {},
    };
  }
  const product = await client.product.findUnique({
    where: {
      id: Number(ctx.params.id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = product?.name
    .split(' ')
    .map((word) => ({ name: { contains: word } }));

  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
    take: 4,
  });
  const isLiked = false;
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
      isLiked,
    },
  };
};
export default ItemDetail;
