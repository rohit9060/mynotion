// User Email Verification
export function UserEmailVerification(otp: string, name: string) {
  const html = `
<h1>Verify your email</h1>
<p>Please verify your email</p>
<p> ${otp} </p>
<p>If you did not request this email, please ignore this message.</p>
<p>Thanks,<br />
${name}</p>
`;
  return html;
}
