import {
  Text,
  Button,
  RevealFx,
  Column,
  Row,
  Schema,
  Meta,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { contact } from "@/resources/content";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          <RevealFx
            translateY="4"
            fillWidth
            horizontal="center"
            paddingBottom="16"
          >
            {home.headline}
          </RevealFx>
          <RevealFx
            translateY="8"
            delay={0.2}
            fillWidth
            horizontal="center"
            paddingBottom="32"
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
            >
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx
            paddingTop="12"
            delay={0.4}
            horizontal="center"
            paddingLeft="12"
          >
            <Button
              id="about"
              data-border="rounded"
              href={contact.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
              style={{
                background:
                  "linear-gradient(180deg,rgba(231, 68, 78, 1) 0%, rgba(177, 81, 219, 1) 100%)",
              }}
            >
              <Row gap="8" vertical="center" paddingRight="4">
                Contact Me
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" delay={0.6}>
        <Projects
          heading="Explainers"
          videos={[
            "https://res.cloudinary.com/dlcjorjvc/video/upload/v1756560272/B-Comp_1_22_fmpwhm.mp4",
            "https://res.cloudinary.com/dlcjorjvc/video/upload/v1756560265/new-herd-explainer-video-max-m-1078_pflim9.mp4",
            "https://res.cloudinary.com/dlcjorjvc/video/upload/v1756560263/1-real-estate-ai-assistant-max-m-1078_zrod1j.mp4",
          ]}
        />
      </RevealFx>
      {/* <Projects
        heading="3D"
        videos={[
          "https://res.cloudinary.com/dlcjorjvc/video/upload/v1756560427/Lipstick_Animation_04_m8y8sw.mp4",
          "https://res.cloudinary.com/dlcjorjvc/video/upload/v1756560424/Drink_wtare_Product_Animation_rn2rf1.mp4",
        ]}
      />
      <Projects
        heading="Podcasts"
        videos={[
          "https://res.cloudinary.com/dlcjorjvc/video/upload/v1756560396/SSYouTube.online_Smith_2nd_Project_Personal_Brand_Vol_1_1080p_me277x.mp4",
          "https://res.cloudinary.com/dlcjorjvc/video/upload/v1756560393/1-mo_iy45tv.mp4",
        ]}
      /> */}

      <Mailchimp />
    </Column>
  );
}
