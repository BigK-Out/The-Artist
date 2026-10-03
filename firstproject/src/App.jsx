import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Projects from "./components/Projects";
import About from "./components/About";
import Work from "./components/Work";
import Contact from "./components/Contact";


export default function App() {
  return (
    <main className="font-light text-white antialiased  selection:bg-lime300 selection:text-black">
      <Navbar/>
      <Hero />
      <Marquee />
      <Projects />
      <About />
      <Work />
      <Contact />
    </main>
  )
}