import { MARQUEE_TEXT } from "../constants"
import { motion } from "framer-motion"

const Marquee = () => {
  return (
    <div className="mt-4 w-full bg-[#FFB300] text-black lg:py-6">
        <div className="flex overflow-hidden whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
                <motion.div
                    key={i}
                    aria-hidden={i > 0}
                    initial={{ x: "0%" }}
                    animate={{ x: "-100%" }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 100 }}
                    className="shrink-0 py-2 text-3xl font-bold leading-none tracking-tighter lg:text-7xl"
                >
                    {MARQUEE_TEXT}
                </motion.div>
            ))}
        </div>
    </div>
  )
}

export default Marquee
