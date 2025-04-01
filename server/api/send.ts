import { Resend } from 'resend';

interface Body {
  sender: string;
  message: string;
}

const {resendApiKey} = useRuntimeConfig();
const resend = new Resend(resendApiKey);

export default defineEventHandler(async (event) => {
  const { sender, message } = await readBody<Body>(event);

  try {
    return await resend.emails.send({
      from: `DietTailor <support@diettailor.fit>`,
      to: ['support@diettailor.fit'],
      replyTo: sender,
      subject: 'DietTailor Support',
      html: `
        <p>Er is een bericht verstuurd via het contactformulier.</p>
        <p style="margin-bottom: 0">
          Van: ${sender} <br/>
        </p>
        <br/>
        <h4 style="margin-bottom: 12px">Bericht</h4>
        <p>${message}</p>`,
    });
  } catch (error) {
    return { error };
  }
});