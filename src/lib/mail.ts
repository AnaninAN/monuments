import { Resend } from 'resend';

const resend = new Resend(process.env.RESENT_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '2FA Code',
    html: `<p>Ваш код: <strong>${token}</strong></p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Сбросьте ваш пароль',
    html: `<p>Нажми <a href="${confirmLink}">здесь</a> для сброса пароля</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Подтвердите свой адрес электронной почты',
    html: `<p>Нажми <a href="${confirmLink}">здесь</a> для подтверждения почты</p>`,
  });
};
