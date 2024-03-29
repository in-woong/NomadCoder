import twilio from 'twilio';
import sgMail from '@sendgrid/mail';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';

twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(10000 + Math.random() * 9000) + '';
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: { name: 'Anonymous', ...user },
        },
      },
    },
  });
  if (phone) {
    // await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!,
    //   body: `로그인 토큰은 ${payload}입니다.`,
    // });
  }
  if (email) {
    // await sgMail.send({
    //   from: 'inwoong100@gmail.com',
    //   to: 'inwoong100@gmail.com',
    //   subject: 'Your Carrot Market Verification Email',
    //   text: `Your token is ${payload}`,
    //   html: `<strong>Your token is ${payload}</strong>`,
    // });
  }
  return res.json({ ok: true });
}

export default withHandler({ methods: ['POST'], handler, isPrivate: false });
