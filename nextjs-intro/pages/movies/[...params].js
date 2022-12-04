import SEO from '../../components/Seo';
import { useRouter } from 'next/router';

export default function Deatil({ params }) {
  const router = useRouter();

  const [title, id] = params || [];
  return (
    <div>
      <SEO title={title} />
      <h4>{title || 'Loading...'}</h4>
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: { params },
  };
}
