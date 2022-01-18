import Navbar from "../components/Navbar";
import About from "../components/About";
import Card from "../components/Card";

export default function Home(props) {
  return (
    <div>
      <Navbar />
      <About />
      <Card size={1} />
    </div>
  );
}
