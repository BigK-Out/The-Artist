import { lazy, Suspense, useEffect, useRef } from "react"
import gsap from "gsap"
import { LuImport } from "react-icons/lu"
// three.js is heavy, so load it in its own chunk
const HeroScene = lazy(() => import("./HeroScene"))

const NAME_LINES = ["Malik", "A.", "Olssen"]

const Hero = () => {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // heading lines slide up out of a mask
      gsap.from(".hero-line", {
        yPercent: 110,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.15,
      })
      gsap.from(".hero-cta", { opacity: 0, y: 20, duration: 0.8, delay: 0.8, ease: "power2.out" })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-center text-[12vw] font-semibold uppercase leading-none">
          {NAME_LINES.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span className="hero-line block">{line}</span>
            </span>
          ))}
        </h1>
        <div className="hero-cta mt-8">
          <a
            href="/Malik-Olssen.pdf"
            download
            className="flex items-center rounded-xl bg-[#FFB300] p-2 px-3 font-sans font-medium text-black hover:bg-[#C99200]"
          >
            <span>Latest Artworks</span>
            <LuImport className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
