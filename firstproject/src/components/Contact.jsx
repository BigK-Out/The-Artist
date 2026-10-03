import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CONTACT, SOCIAL_MEDIA_LINKS } from "../constants"

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-item", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="contact" className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="contact-item my-10 text-center text-3xl lg:text-8xl">Get in touch</h2>
        <p className="contact-item font-sans text-gray-400 lg:text-xl">{CONTACT.text}</p>
        <div className="contact-item mt-8 flex flex-col gap-2 lg:text-2xl">
            <a href={`mailto:${CONTACT.email}`} className="hover:text-[#FFB300]">{CONTACT.email}</a>
            <a href={`tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`} className="hover:text-[#FFB300]">{CONTACT.phone}</a>
        </div>
        <div className="contact-item mt-8 flex flex-wrap gap-6">
            {SOCIAL_MEDIA_LINKS.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={new URL(link.href).hostname}>
                    {link.icon}
                </a>
            ))}
        </div>
        <p className="my-8 text-center text-gray-400">&copy; Malik A. Olssen. All Rights Reserved</p>
    </section>
  )
}

export default Contact
