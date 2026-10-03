import {
  FaXTwitter,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaDiscord,
  FaInstagram,
} from "react-icons/fa6";

import project1 from "../assets/firstimg.webp";
import project2 from "../assets/secondimg.webp";
import project3 from "../assets/thirdimg.webp";
import project4 from "../assets/fourthimg.webp";
import project5 from "../assets/fifthimg.webp";
import project6 from "../assets/sixthimg.webp";
import project7 from "../assets/seventhimg.webp";
import project8 from "../assets/eightimg.webp";
import project9 from "../assets/ninthimage.webp";

export const LINKS = [
  { id: "projects", name: "projects" },
  { id: "about", name: "about" },
  { id: "collaborators", name: "collaborators" },
  { id: "contact", name: "contact" },
];

export const MARQUEE_TEXT =
  " White Cube, Saatchi Gallery, Gagosian Gallery, Galerie Templon, Kunsthalle, Galerie Perrotin, The Museum of Modern Art (MoMA), Tate Modern, Centre Pompidou, Zetterberg Gallery, Pace Gallery, The New Museum, Galerie Thaddaeus Ropac, Fundación Juan March, Galleria Continua, ";

export const PROJECTS = [
  {
    id: 1,
    title: "The White Cube",
    description:
      "A contemporary gallery in London known for cutting-edge exhibitions",
    imgSrc: project1,
    link: "https://whitecube.com/",
  },
  {
    id: 2,
    title: "Saatchi Gallery",
    description:
      "A London platform for new and emerging artists featuring innovative art",
    imgSrc: project2,
    link: "https://www.saatchigallery.com/",
  },
  {
    id: 3,
    title: "Gagosian Gallery",
    description:
      "A leading global gallery showcasing high-profile modern and abstract artists",
    imgSrc: project3,
    link: "https://gagosian.com/",
  },
  {
    id: 4,
    title: "Galerie Templon",
    description:
      "A Parisian gallery for contemporary and experimental abstraction",
    imgSrc: project4,
    link: "https://www.templon.com/",
  },
  {
    id: 5,
    title: "Kunsthalle",
    description: "An international art space hosting innovative contemporary exhibitions",
    imgSrc: project5,
    link: "https://www.kunsthalle.com/",
  },
  {
    id: 6,
    title: "Galerie Perrotin",
    description:
      "A Paris gallery for contemporary abstract artists",
    imgSrc: project6,
    link: "https://www.perrotin.com/",
  },
  {
    id: 7,
    title: "The Museum of Modern Art (MoMA)",
    description: "A renowned museum emphasizing modern and contemporary abstract art",
    imgSrc: project7,
    link: "https://www.moma.org/",
  },
  {
    id: 8,
    title: "Zetterberg Gallery",
    description: "A Stockholm gallery featuring innovative abstract and experimental art",
    imgSrc: project8,
    link: "https://www.zetterberggallery.com/",
  },
  {
    id: 9,
    title: "The New Museum",
    description:
      "A New York museum focused on innovative and emerging artists",
    imgSrc: project9,
    link: "https://www.newmuseum.org/",
  },
];

export const ABOUT =
  " Malik A. Olssen is a contemporary abstract artist based in Stockholm, known for blending his Nigerian heritage with minimalist Scandinavian aesthetics. Drawing inspiration from vibrant African narratives and serene Nordic landscapes, Malik creates bold, dynamic works that explore themes of identity, culture, and emotion. His art invites viewers to engage in conversations about race and belonging, using color and form to reflect the shared human experience. With exhibitions across Europe and collaborations with international artists, Malik strives to create pieces that resonate on a personal level, encouraging reflection and dialogue.";

export const COLLABORATORS = [
  {
    name: "Ava Sinclair",
    role: "Abstract Painter",
    date: "12/2023",
    venue: "Moderna Museet, Stockholm, Sweden",
    description:
      "Creating vibrant abstract paintings that explore themes of identity and emotion. Collaborating with galleries to showcase her work and engage with the community. Experimenting with various mediums, including acrylics and mixed media, to enhance her artistic expression. Committed to fostering creativity through workshops and community outreach programs.",
  },
  {
    name: "Liam Chen",
    role: "Mixed Media Artist",
    date: "01/2022",
    venue: "Stedelijk Museum, Amsterdam, Netherlands",
    description:
      "Developed innovative mixed media installations that challenge perceptions of culture and society. Engaged in collaborative projects with other artists to create immersive experiences. Conducted exhibitions that highlight the intersection of technology and art, attracting diverse audiences. Focused on using sustainable materials and practices in his creative process.",
  },
];

export const SOCIAL_MEDIA_LINKS = [
  {
    href: "https://facebook.com/",
    icon: <FaFacebook fontSize={26} className="hover:opacity-80" />,
  },
  {
    href: "https://discord.com/",
    icon: <FaDiscord fontSize={26} className="hover:opacity-80" />,
  },
  {
    href: "https://instagram.com/",
    icon: <FaInstagram fontSize={26} className="hover:opacity-80" />,
  },
  {
    href: "https://x.com/",
    icon: <FaXTwitter fontSize={26} className="hover:opacity-80" />,
  },
  {
    href: "https://github.com/",
    icon: <FaGithub fontSize={26} className="hover:opacity-80" />,
  },
  {
    href: "https://www.linkedin.com/",
    icon: <FaLinkedin fontSize={26} className="hover:opacity-80" />,
  },
];

export const CONTACT = {
  text: "I am always excited to collaborate on new and challenging projects. Whether you have a specific project in mind or just want to explore potential opportunities, I'd love to hear from you. Let's combine our skills and expertise to create something amazing. Feel free to reach out to discuss how we can work together to achieve your goals.",
  email: "hi@malik.olssen.me",
  phone: "+46 8 123 456 78",
};
