export async function sendSMS(to: string, body: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const from = process.env.TWILIO_FROM_NUMBER
  if (!sid || !token || !from) {
    return { ok: false, reason: 'sms_unconfigured' }
  }
  const creds = Buffer.from(`${sid}:${token}`).toString('base64')
  const form = new URLSearchParams()
  form.append('To', to)
  form.append('From', from)
  form.append('Body', body)
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form,
  })
  if (!res.ok) {
    return { ok: false, reason: 'sms_failed', status: res.status }
  }
  return { ok: true }
}
