import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { COLLABORATORS } from "../constants"

gsap.registerPlugin(ScrollTrigger)

const Work = () => {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-title", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".work-title", start: "top 85%" },
      })
      gsap.utils.toArray(".work-item").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          x: -60,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id='collaborators'>
        <h2 className='work-title my-10 text-center text-3xl lg:text-8xl'>
            Artists Worked With
        </h2>
        <div className='mx-auto max-w-6xl'>
            {COLLABORATORS.map((artist) => (
                <div key={artist.name} className='work-item mx-4 mb-20'>
                    <h3 className='font-medium lg:text-2xl'>
                        {artist.name}
                    </h3>
                    <div className="flex justify-between">
                        <p className="py-4 tracking-wide lg:text-xl">
                            {artist.role}
                        </p>
                        <p className="py-4 text-right lg:text-xl">
                            {artist.date} · {artist.venue}
                        </p>
                    </div>
                    <p className="font-sans text-gray-400">{artist.description}</p>
                </div>
            ))}
        </div>
    </section>
  )
}

export default Work
