import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const stream = await client.stream.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              id: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  const isOwner = stream?.userId === user?.id;
  if (stream && !isOwner) {
    delete stream.cloudflareKey;
    delete stream.cloudflareUrl;
  }

  if (!stream) return res.json({ ok: false });
  return res.json({ ok: true, stream: stream });
}

export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: true })
);
