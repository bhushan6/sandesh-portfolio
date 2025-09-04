"use client";
import React, { useState } from "react";
import {
  Background,
  Button,
  Column,
  Heading,
  Input,
  opacity,
  SpacingToken,
  Text,
  Textarea,
} from "@once-ui-system/core";
import { mailchimp } from "@/resources";
interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const validate = (
    data: FormState,
    forSubmit: boolean = false
  ): FormErrors => {
    const newErrors: FormErrors = {};
    if (!data.name) newErrors.name = "Name is required.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(data.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (forSubmit) {
      if (!data.message) {
        newErrors.message = "Message is required.";
      } else if (data.message.length < 10) {
        newErrors.message = "Message must be at least 10 characters long.";
      }
    }
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const fieldErrors = validate({ ...formData, [name]: value });
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name as keyof FormErrors],
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formData);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name as keyof FormErrors],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const validationErrors = validate(formData, true);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, isSendingMessage: true }),
      });
      if (!response.ok)
        throw new Error("Something went wrong. Please try again.");
      const result = await response.json();
      console.log("API Response:", result);
      setSubmitStatus("Your message has been sent successfully!");
      setTimeout(() => {
        setSubmitStatus(null);
      }, 2000);
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
    } catch (error: any) {
      setSubmitStatus(error.message || "Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Column
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "32px auto",
        padding: "32px",
        background: "#222",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <Background
        top="0"
        left="0"
        position="absolute"
        mask={{
          x: mailchimp.effects.mask.x,
          y: mailchimp.effects.mask.y,
          radius: mailchimp.effects.mask.radius,
          cursor: mailchimp.effects.mask.cursor,
        }}
        gradient={{
          display: mailchimp.effects.gradient.display,
          opacity: mailchimp.effects.gradient.opacity as opacity,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd,
        }}
        dots={{
          display: mailchimp.effects.dots.display,
          opacity: mailchimp.effects.dots.opacity as opacity,
          size: mailchimp.effects.dots.size as SpacingToken,
          color: mailchimp.effects.dots.color,
        }}
        grid={{
          display: mailchimp.effects.grid.display,
          opacity: mailchimp.effects.grid.opacity as opacity,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width,
          height: mailchimp.effects.grid.height,
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity as opacity,
          size: mailchimp.effects.lines.size as SpacingToken,
          thickness: mailchimp.effects.lines.thickness,
          angle: mailchimp.effects.lines.angle,
          color: mailchimp.effects.lines.color,
        }}
      />
      <Column style={{ alignItems: "center", marginBottom: "32px" }}>
        <Heading style={{ marginBottom: "8px" }}>Send us a message</Heading>
        <Text style={{ maxWidth: "400px", textAlign: "center" }}>
          We'd love to hear from you. Send us a message and we'll respond as
          soon as possible.
        </Text>
      </Column>
      <form onSubmit={handleSubmit} noValidate style={{ width: "100%" }}>
        <Column style={{ width: "100%", alignItems: "center", gap: "16px" }}>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={touched.name ? errors.name : ""}
          />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={touched.email ? errors.email : ""}
          />
          <Textarea
            id="message"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={touched.message ? errors.message : ""}
            rows={5}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
          {submitStatus && (
            <p
              style={{
                marginTop: "16px",
                color: submitStatus.includes("successfully")
                  ? "lightgreen"
                  : "lightcoral",
              }}
            >
              {submitStatus}
            </p>
          )}
        </Column>
      </form>
    </Column>
  );
}
