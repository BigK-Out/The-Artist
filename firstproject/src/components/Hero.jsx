import React from 'react'
import { LuImport } from "react-icons/lu"
import artist from "../assets/newartist.webp"

const Hero = () => {
  return (
    <section>
        <div className='flex flex-col items-center justify-center'>
            <h1 className='mt-16 overflow-hidden text-[12vw] font-semibold uppercase leading-none'>
                Malik <br /> A. <br /> Olsson
            </h1>
            <div className='mt-8'>
                <a href="/Malik-Olssen.pdf" target='_blank' rel="noopener noreferrer" download className='flex items-center rounded-xl bg-[#FFB300] p-2 px-3 font-sans font-medium text-black hover:bg-[#C99200]'>
                   <span>Latest Artworks</span>
                   <LuImport className='ml-2'/> 
                </a>
            </div>
            <div className='flex items-center justify-center'>
                <img src={artist}alt='Malik Olssen' className='mt-8 '/>
            </div>
        </div>
    </section>
  )
}

export default Hero
