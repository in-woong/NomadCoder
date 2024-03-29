import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;

  const purchases = await client.purchase.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      product: {
        include: {
          _count: {
            select: {
              favs: true,
            },
          },
        },
      },
    },
  });

  return res.json({ ok: true, purchases });
}

export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: true })
);
