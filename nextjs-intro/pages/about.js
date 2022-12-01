import NavBar from '../components/NavBar';

export default function Potate() {
  return (
    <div>
      <NavBar />
      <h1>About</h1>
      <style jsx global>{`
        .active {
          color: white;
        }
      `}</style>
    </div>
  );
}
