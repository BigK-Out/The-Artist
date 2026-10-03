import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ABOUT } from "../constants"

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const root = useRef(null)
  const words = ABOUT.trim().split(/\s+/)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-title", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-title", start: "top 85%" },
      })

      // words light up one by one as the paragraph scrolls through
      gsap.fromTo(
        ".about-word",
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: ".about-text", start: "top 80%", end: "bottom 45%", scrub: true },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="about">
        <h2 className="about-title my-10 text-center text-3xl lg:text-8xl">Who is The Artist?</h2>
        <div className="flex items-center justify-center">
            <p className="about-text m-8 max-w-6xl text-3xl lg:text-6xl">
                <span className="sr-only">{ABOUT.trim()}</span>
                {words.map((word, i) => (
                    <span key={i} className="about-word" aria-hidden="true">{word}{" "}</span>
                ))}
            </p>
        </div>
    </section>
  )
}

export default About
