import nodemailer,{SendMailOptions} from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendEmail = async (options: SendMailOptions) => {
    const mailOptions = {
        from: `Admin <${process.env.EMAIL_FROM}>`,
        to: options.to,
        subject: options.subject,
        text: options.text
    }
    return await transporter.sendMail(mailOptions);
}

