import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  if (!resend)
    return NextResponse.json(
      { message: "please provide resend's api key" },
      { status: 400 }
    );
  const { data, error } = await resend.emails.send({
    from: "Enquiry <you@mail.comett.xyz>", // The address emails are sent FROM
    to: ["comett.motion@gmail.com"],
    subject: "Hello from Comett!",
    html: "<h1>This is our message.</h1>",
  });

  return NextResponse.json(data, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { email, name, message, isSendingMessage } = body;
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!isSendingMessage) {
    if (!email)
      return NextResponse.json(
        { message: "please provide email id of sender" },
        { status: 400 }
      );
    const { data, error } = await resend.emails.send({
      from: "Enquiry <portfolio@mail.comett.xyz>", // The address emails are sent FROM
      to: ["comett.motion@gmail.com"],
      subject: "Hello from Visitor",
      html: `
    <h1>Trying to reach</h1>
    <p>${email} is trying to reach out to you.</p>
    <p>Reached from : Sandesh's Portfolio</p>
    `,
    });
    return NextResponse.json(data || error, { status: data ? 200 : 400 });
  } else {
    const { data, error } = await resend.emails.send({
      from: "Enquiry <portfolio@mail.comett.xyz>", // The address emails are sent FROM
      to: ["comett.motion@gmail.com"],
      subject: `Hello From ${name}`,
      html: `
    <h1>Trying to reach</h1>
    <p>${email} is trying to reach out to you.</p>
    <p>Visitor Message: ${message}</p>
    <p>Reached from : Sandesh's Portfolio</p>
    `,
    });
    return NextResponse.json(data || error, { status: data ? 200 : 400 });
  }
}
