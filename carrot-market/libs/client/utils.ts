export function cls(...classnames: string[]) {
  return classnames.join(' ');
}

interface loadImgeProps {
  imgId: string;
  varName?: 'public' | 'avatar';
}
export function loadImg({ imgId, varName = 'public' }: loadImgeProps) {
  return `https://imagedelivery.net/8Y7LSXihgcc5yJjzmABO2w/${imgId}/${varName}`;
}
