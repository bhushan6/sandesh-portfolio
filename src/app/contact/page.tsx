import { Column, Heading, Schema } from "@once-ui-system/core";
import { baseURL, about, person } from "@/resources";
import { contact } from "@/resources/content";
import ContactForm from "@/components/contact/ContactForm";
import { LogoHeader } from "@/components/LogoHeader";

export default function Work() {
  return (
    <Column maxWidth="m" paddingTop="24">
      {/* <LogoHeader /> */}
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={contact.path}
        title={contact.title}
        description={contact.description}
        image={`/api/og/generate?title=${encodeURIComponent(contact.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {contact.title}
      </Heading>
      <ContactForm />
    </Column>
  );
}
