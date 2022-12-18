import type { Answer, User } from '@prisma/client';

export interface AnswerWithUser extends Answer {
  user: User;
}

interface AnswerProps {
  answer: AnswerWithUser;
  [key: string]: any;
}

export default function Answer({ answer, ...rest }: AnswerProps) {
  return (
    <div className='flex items-start space-x-3' {...rest}>
      <div className='h-8 w-8 rounded-full bg-slate-200' />
      <div>
        <span className='block text-sm font-medium text-gray-700'>
          {answer.user.name}
        </span>
        <span className='block text-xs text-gray-500 '>2시간 전</span>
        <p className='mt-2 text-gray-700'>{answer.answer}</p>
      </div>
    </div>
  );
}
