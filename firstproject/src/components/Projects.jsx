import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '../constants'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-title', {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-title', start: 'top 85%' },
      })

      // cards fade up in batches as they enter the viewport
      gsap.set('.project-card', { opacity: 0, y: 80 })
      ScrollTrigger.batch('.project-card', {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 }),
      })

      // image parallax inside each card
      gsap.utils.toArray('.project-img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6, scale: 1.12 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className='p-8' id='projects'>
        <h2 className='projects-title my-10 text-center text-3xl lg:text-8xl'>My Work</h2>
        <div className='columns-1 gap-4 md:columns-2 lg:columns-3'>
            {PROJECTS.map((project)  => (
                <a key={project.id} href={project.link} target='_blank' rel="noopener noreferrer" className='project-card block'>
                    <div className='relative mb-4 overflow-hidden rounded-lg bg-white shadow-lg'>
                        <img src={project.imgSrc} alt={project.title} className='project-img h-auto w-full object-cover'/>
                        <div className='absolute bottom-0 left-0 right-0 m-8 p-8 text-[#EFBF04] backdrop-blur-md font-bold'>
                            <h3 className='text-3xl'> {project.title}</h3>
                            <p className='max-w-xs text-lg'>{project.description}</p>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    </section>
  )
}

export default Projects
