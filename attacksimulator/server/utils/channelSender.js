const { Resend } = require('resend')
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_to_prevent_crash_123')

const twilio = require('twilio')
const axios = require('axios')

const { buildContent, selectDelivery } = require('./contentGenerator')

const fs = require('fs/promises')
const path = require('path')


function getTwilioClient() {

  if (!process.env.TWILIO_SID || !process.env.TWILIO_TOKEN)
    return null

  return twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_TOKEN
  )

}



//
// EMAIL
//

async function sendEmailResend({ to, subject, html }) {

  try {

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to,
      subject,
      html
    })

    return { sent: true, channel: 'email' }

  } catch (err) {

    console.error('[EMAIL ERROR]', err.message)

    return { sent: false, channel: 'email' }

  }

}



//
// EMAIL WITH PDF
//

async function sendEmailWithPDF({
  to,
  subject,
  employeeName,
  orgName,
  pdfBuffer,
  filename,
  trackingUrl
}) {

  try {

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to,
      subject,
      html: `
      <div style="font-family:Arial">
        <p>Dear ${employeeName}</p>
        <p>Please review the attached document.</p>
        <p>If you cannot open it <a href="${trackingUrl}">click here</a></p>
        <p>${orgName}</p>
      </div>
      `,
      attachments: [{
        filename,
        content: pdfBuffer
      }]
    })

    return { sent: true, channel: 'email' }

  } catch (err) {

    console.error('[EMAIL PDF ERROR]', err.message)

    return { sent: false, channel: 'email' }

  }

}



//
// SMS
//

async function sendSMS({ to, message }) {

  const client = getTwilioClient()

  if (!client)
    return { sent: false, channel: 'sms' }

  try {

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_FROM_PHONE,
      to
    })

    console.log('[SMS SENT]', to)

    return { sent: true, channel: 'sms' }

  } catch (err) {

    console.error('[SMS ERROR]', err.message)

    return { sent: false, channel: 'sms' }

  }

}



//
// WHATSAPP TEXT
//

async function sendWhatsAppText({ to, message }) {

  const client = getTwilioClient()

  if (!client)
    return { sent: false, channel: 'whatsapp' }

  try {

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:${to}`
    })

    return { sent: true, channel: 'whatsapp' }

  } catch (err) {

    console.error('[WHATSAPP ERROR]', err.message)

    return { sent: false, channel: 'whatsapp' }

  }

}



//
// WHATSAPP PDF
//

async function sendWhatsAppPDF({ to, pdfBuffer, filename }) {

  const client = getTwilioClient()

  if (!client)
    return { sent: false, channel: 'whatsapp' }

  try {

    const tmpFile = `/tmp/${Date.now()}_${filename}`

    await fs.writeFile(tmpFile, pdfBuffer)

    const publicUrl =
      `${process.env.PUBLIC_URL}/api/sim/media/${path.basename(tmpFile)}`

    await fs.copyFile(
      tmpFile,
      path.join(__dirname, '../uploads', path.basename(tmpFile))
    )

    await client.messages.create({
      body: 'Please review the attached document',
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:${to}`,
      mediaUrl: [publicUrl]
    })

    return { sent: true, channel: 'whatsapp' }

  } catch (err) {

    console.error('[WHATSAPP PDF ERROR]', err.message)

    return { sent: false, channel: 'whatsapp' }

  }

}



//
// TELEGRAM
//

async function sendTelegram({ to, message }) {

  if (!process.env.TELEGRAM_BOT_TOKEN)
    return { sent: false, channel: 'telegram' }

  try {

    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: to,
        text: message
      }
    )

    return { sent: true, channel: 'telegram' }

  } catch (err) {

    console.error('[TELEGRAM ERROR]', err.message)

    return { sent: false, channel: 'telegram' }

  }

}



//
// SLACK
//

async function sendSlack({ webhook, message }) {

  if (!webhook)
    return { sent: false, channel: 'slack' }

  try {

    await axios.post(webhook, { text: message })

    return { sent: true, channel: 'slack' }

  } catch (err) {

    console.error('[SLACK ERROR]', err.message)

    return { sent: false, channel: 'slack' }

  }

}



//
// DISCORD
//

async function sendDiscord({ webhook, message }) {

  if (!webhook)
    return { sent: false, channel: 'discord' }

  try {

    await axios.post(webhook, {
      content: message
    })

    return { sent: true, channel: 'discord' }

  } catch (err) {

    console.error('[DISCORD ERROR]', err.message)

    return { sent: false, channel: 'discord' }

  }

}



//
// VOICE CALL
//

async function sendVoiceCall({ to, employeeName, managerName, orgName }) {

  const client = getTwilioClient()

  if (!client)
    return { sent: false, channel: 'voice' }

  try {

    const twiml = `
<Response>
<Say voice="alice">
Hello ${employeeName}. This is ${managerName} from ${orgName}.
Please verify your account immediately.
</Say>
</Response>
`

    await client.calls.create({
      twiml,
      from: process.env.TWILIO_FROM_PHONE,
      to
    })

    return { sent: true, channel: 'voice' }

  } catch (err) {

    console.error('[VOICE ERROR]', err.message)

    return { sent: false, channel: 'voice' }

  }

}

async function sendTelegramText({ to, message }) {

  try {

    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: to,
        text: message
      }
    )

    return { sent:true }

  } catch(err) {

    console.error("[TELEGRAM TEXT ERROR]",err.message)

    return { sent:false }

  }

}

async function sendTelegramImage({ to, imageUrl, caption }) {

  try {

    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`,
      {
        chat_id: to,
        photo: imageUrl,
        caption
      }
    )

    return { sent:true }

  } catch(err) {

    console.error("[TELEGRAM IMAGE ERROR]",err.message)

    return { sent:false }

  }

}

async function sendTelegramFile({ to, fileUrl }) {

  try {

    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`,
      {
        chat_id: to,
        document: fileUrl
      }
    )

    return { sent:true }

  } catch(err) {

    console.error("[TELEGRAM FILE ERROR]",err.message)

    return { sent:false }

  }

}
//
// MASTER DISPATCH
//

async function dispatchAttack({
  employee,
  attackType,
  trackingUrl,
  orgName,
  managerName = 'IT Security',
  aggressionLevel = 1
}) {

  const results = []

  const phone = employee.phone || null
  const email = employee.email || null
  const telegramId = employee.telegramId || null

  const archetype = employee.behavioralArchetype || 'unknown'

  const { channel, contentType } =
    selectDelivery({ attackType, archetype, aggressionLevel })

  let content = null

  if (contentType === 'pdf' || contentType === 'image') {

    content = await buildContent({
      attackType,
      contentType,
      employee,
      orgName,
      managerName,
      trackingUrl
    })

  }

  //
  // EMAIL
  //
  if (channel === 'email' && email) {

    if (content?.buffer) {

      results.push(await sendEmailWithPDF({
        to: email,
        subject: 'Important Document',
        employeeName: employee.displayName,
        orgName,
        pdfBuffer: content.buffer,
        filename: content.filename,
        trackingUrl
      }))

    } else {

      results.push(await sendEmailResend({
        to: email,
        subject: 'Security Alert',
        html: `<p>Hello ${employee.displayName}</p>
        <p>Please verify your account:</p>
        <a href="${trackingUrl}">${trackingUrl}</a>`
      }))

    }

  }

  //
  // SMS
  //
  else if (channel === 'sms' && phone) {

    results.push(await sendSMS({
      to: phone,
      message: `Security verification required: ${trackingUrl}`
    }))

  }

  //
  // WHATSAPP
  //
  else if (channel === 'whatsapp' && phone) {

    if (content?.buffer) {

      results.push(await sendWhatsAppPDF({
        to: phone,
        pdfBuffer: content.buffer,
        filename: content.filename
      }))

    } else {

      results.push(await sendWhatsAppText({
        to: phone,
        message: `Security alert: ${trackingUrl}`
      }))

    }

  }

  //
  // TELEGRAM
  //
  else if (channel === 'telegram' && telegramId) {

    if (contentType === 'image' && content?.imageUrl) {

      results.push(await sendTelegramImage({
        to: telegramId,
        imageUrl: content.imageUrl,
        caption: `Security alert — verify immediately`
      }))

    }

    else if (contentType === 'pdf' && content?.fileUrl) {

      results.push(await sendTelegramFile({
        to: telegramId,
        fileUrl: content.fileUrl
      }))

    }

    else {

      results.push(await sendTelegram({
        to: telegramId,
        message: `Security verification required: ${trackingUrl}`
      }))

    }

  }

  //
  // VOICE CALL
  //
  else if (channel === 'voice' && phone) {

    results.push(await sendVoiceCall({
      to: phone,
      employeeName: employee.displayName,
      managerName,
      orgName
    }))

  }

  return results

}


module.exports = {
  dispatchAttack,
  sendSMS,
  sendWhatsAppText,
  sendWhatsAppPDF,
  sendVoiceCall,
  sendTelegram,
  sendSlack,
  sendDiscord
}