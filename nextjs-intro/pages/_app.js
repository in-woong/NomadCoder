export default function CustomApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <span>Hello</span>
    </div>
  );
}
