import nodemailer from "nodemailer";

export async function sendEmail(name: string, email: string, message: string) {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user,
            pass
        }
    });

    const mailOptions = {
        from: user,
        to: user,
        subject: 'Sending Email using Node.js',
        text: `Name:${name}\nEmail:${email}\nMessage:${message}`
    };

    await transporter.sendMail(mailOptions);
}