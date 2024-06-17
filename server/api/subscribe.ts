import nodemailer from 'nodemailer'

export default async (req: { method: string; body: { email: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): any; new(): any } } }) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body

  // 配置 nodemailer 传输
  const transporter = nodemailer.createTransport({
    service: 'gmail', // 使用你选择的邮件服务提供商
    auth: {
      user: 'hengworkingemail@gmail.com',
      pass: 'nzh278799'
    }
  })

  const mailOptions = {
    from: 'hengworkingemail@gmail.com',
    to: email,
    subject: 'Newsletter Subscription',
    text: 'Thank you for subscribing to our newsletter!'
  }

  try {
    await transporter.sendMail(mailOptions)
    return res.status(200).json({ message: 'Subscription successful' })
  } catch (error) {
    return res.status(500).json({ message: 'Failed to send email' })
  }
}
