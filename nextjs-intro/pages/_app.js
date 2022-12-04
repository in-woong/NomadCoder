import NavBar from '../components/NavBar';
import '../styles/globals.css';

export default function CustomApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <style jsx global>{`
        a {
          color: white;
          text-decoration: none;
        }
      `}</style>
    </>
  );
}
