const { dispatchAttack } = require('../utils/channelSender')
const Employee = require('../models/Employee')
const Scenario = require('../models/Scenario')

const { nanoid } = require('nanoid')

async function attackRoutes(fastify) {


  // ───────────────── EMAIL ATTACK ─────────────────

  fastify.post('/api/attacks/email', async (req, reply) => {

    const { employeeId, scenarioId, template } = req.body

    const employee = await Employee.findById(employeeId)
    const scenario = await Scenario.findById(scenarioId)

    if (!employee)
      return reply.status(404).send({ error: 'Employee not found' })

    const token = nanoid(32)

    const trackingUrl =
      `${process.env.PUBLIC_URL}/api/sim/click/${token}`


    await dispatchAttack({
      employee,
      attackType: 'email_phishing',
      template,
      trackingUrl,
      orgName: 'Security Operations',
      managerName: 'IT Security',
      aggressionLevel: 1
    })


    return { success: true, token }

  })



  // ───────────────── SMS ATTACK ─────────────────

  fastify.post('/api/attacks/sms', async (req, reply) => {

    const { employeeId } = req.body

    const employee = await Employee.findById(employeeId)

    const token = nanoid(32)

    const trackingUrl =
      `${process.env.PUBLIC_URL}/api/sim/click/${token}`


    await dispatchAttack({
      employee,
      attackType: 'social_engineering',
      trackingUrl,
      orgName: 'Security Operations',
      managerName: 'IT Security',
      aggressionLevel: 2
    })


    return { success: true }

  })



  // ───────────────── WHATSAPP ATTACK ─────────────────

  fastify.post('/api/attacks/whatsapp', async (req, reply) => {

    const { employeeId } = req.body

    const employee = await Employee.findById(employeeId)

    const token = nanoid(32)

    const trackingUrl =
      `${process.env.PUBLIC_URL}/api/sim/click/${token}`


    await dispatchAttack({
      employee,
      attackType: 'social_engineering',
      trackingUrl,
      orgName: 'Security Operations',
      managerName: 'CEO',
      aggressionLevel: 2
    })


    return { success: true }

  })



  // ───────────────── VOICE ATTACK ─────────────────

  fastify.post('/api/attacks/voice', async (req, reply) => {

    const { employeeId } = req.body

    const employee = await Employee.findById(employeeId)

    const token = nanoid(32)

    const trackingUrl =
      `${process.env.PUBLIC_URL}/api/sim/click/${token}`


    await dispatchAttack({
      employee,
      attackType: 'sim_swap',
      trackingUrl,
      orgName: 'Carrier Support',
      managerName: 'Verification Center',
      aggressionLevel: 3
    })


    return { success: true }

  })


}

module.exports = attackRoutes