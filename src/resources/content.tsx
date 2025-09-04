import { About, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
import styles from "./content.module.scss";

console.log(styles);

const person: Person = {
  firstName: "",
  lastName: "",
  name: `Comet`,
  role: "Design Agency",
  avatar: "/images/avatar.jpg",
  email: "comett.motion@gmail.com",
  location: "Asia/Kolkata",
  languages: ["English", "Hindi"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Leave your email</>,
  description: <>We will reach out to you asap</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // {
  //   name: "GitHub",
  //   icon: "github",
  //   link: "https://github.com/once-ui-system",
  // },
  // {
  //   name: "LinkedIn",
  //   icon: "linkedin",
  //   link: "https://www.linkedin.com/company/once-ui/",
  // },
  // {
  //   name: "Threads",
  //   icon: "threads",
  //   link: "https://www.threads.com/@once_ui",
  // },
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
    <div
      className={styles.headingDiv}
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   gap: 0,
      //   fontSize: "38px",
      // }}
    >
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // border: "1px solid red",
          margin: 0,
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        Hi, We are{" "}
        <img
          className={styles.logoGif}
          src={
            "https://res.cloudinary.com/dlcjorjvc/image/upload/v1756136515/gif-comet-logo-1-ezgif.com-crop_josgi9.gif"
          }
        />
      </span>
      <div className={styles.subHeadingDiv}>
        We craft motion that shines bright.
      </div>
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
        At Comet, we believe powerful design starts with powerful storytelling.
        We’re a motion design studio dedicated to transforming complex ideas
        into visually stunning, easy-to-understand stories. Whether it’s UI
        animation, product explainers, or brand videos, our mission is to create
        visuals that not only catch eyes but also connect with hearts. What sets
        us apart is our blend of creativity and strategy—we don’t just animate;
        we craft experiences that elevate your brand and leave a lasting
        impression. With a focus on detail, clarity, and impact, every project
        we deliver is built to shine as bright as a comet in the sky.
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
