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
  } = req;
  const streams = await client.stream.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!streams) return res.json({ ok: false });
  return res.json({ ok: true, streams });
}

export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: true })
);
