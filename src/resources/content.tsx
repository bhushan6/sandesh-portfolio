import { About, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
import styles from "./content.module.scss";
import { style } from "./once-ui.config";

console.log(styles);

const person: Person = {
  firstName: "Sandesh",
  lastName: "Kanawade",
  name: `Sandesh`,
  role: "Motion Designer",
  avatar: "/images/avatar.jpg",
  email: "sandeshmotions@gmail.com",
  location: "Asia/Kolkata",
  languages: ["English", "Hindi"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Leave your email</>,
  description: <>I will reach out to you asap</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // {
  //   name: "GitHub",
  //   icon: "github",
  //   link: "https://github.com/once-ui-system",
  // },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/sandesh-kanawade-3232b422b/",
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/sandesh.motions?utm_source=chatgpt.com",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}`,
  description: `Portfolio website showcasing work of ${person.name} ${person.role}`,
  headline: (
    <div>
      <span>{"Hi, I'm"}</span>
      <br />
      <span className={styles.name}>Sandesh Kanawade</span>
      <br />
      <span className={styles.subheading}>
        {"I turn complex products into simple"}
        <br />
        {"engaging videos"}
      </span>
    </div>
  ),
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: <></>,
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Hi, I’m Sandesh Kanawade, a Motion Designer passionate about bringing
        ideas to life through smooth and engaging animations. I specialize in UI
        animations, product explainers, and brand visuals that not only look
        good but also tell a story. With a background in art and design, I blend
        creativity with technical skills to craft animations that feel modern,
        minimal, and impactful. My goal is simple — to help brands and digital
        products communicate clearly, stand out, and connect with their audience
        through motion. When I’m not designing, you’ll probably find me
        sketching, exploring new animation styles, or sharing creative content
        online.
      </>
    ),
  },
};

const contact: Work = {
  path: "/contact",
  label: "Contact",
  title: ``,
  description: ``,
};

export { person, social, newsletter, home, about, contact };
