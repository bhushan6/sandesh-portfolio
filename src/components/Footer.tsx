import { Button, Column, IconButton, Row, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";
import { LogoHeader } from "./LogoHeader";
import React from "react";

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
          align="center"
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
            {social.length > 0 && (
              <Row
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                data-border="rounded"
              >
                {social.map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Row s={{ hide: true }}>
                          <Button
                            key={item.name}
                            href={item.link}
                            prefixIcon={item.icon}
                            label={item.name}
                            size="s"
                            weight="default"
                            variant="secondary"
                          />
                        </Row>
                        <Row hide s={{ hide: false }}>
                          <IconButton
                            size="l"
                            key={`${item.name}-icon`}
                            href={item.link}
                            icon={item.icon}
                            variant="secondary"
                          />
                        </Row>
                      </React.Fragment>
                    )
                )}
              </Row>
            )}
            <Text
              style={{
                fontSize: "16px",
              }}
              paddingX="4"
            >
              +91 9322898398
            </Text>
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
