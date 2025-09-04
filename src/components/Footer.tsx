import { Column, Row, Text } from "@once-ui-system/core";
import { person } from "@/resources";
import styles from "./Footer.module.scss";
import { LogoHeader } from "./LogoHeader";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Row as="footer" fillWidth paddingX="xl" maxWidth="s" horizontal="center">
        <Row
          className={styles.mobile}
          maxWidth="m"
          paddingY="8"
          paddingX="16"
          gap="16"
          vertical="center"
          horizontal="center"
          s={{
            direction: "column",
            horizontal: "center",
            align: "center",
          }}
        >
          <Column
            style={{
              fontSize: "44px",
            }}
            onBackground="neutral-strong"
          >
            <Text
              style={{
                fontSize: "16px",
              }}
              paddingX="4"
            >
              {person.email}
            </Text>
            <Text size="xl" onBackground="neutral-weak">
              © {currentYear}
            </Text>
          </Column>
        </Row>
        {/* <Row s={{ hide: true }}>
          <LogoHeader />
        </Row> */}
      </Row>
      <Row height="40" hide s={{ hide: false }} />
    </>
  );
};
