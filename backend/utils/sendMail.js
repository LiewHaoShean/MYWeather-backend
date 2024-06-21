import nodemailer from "nodemailer";

export const sendMail = async({email, subject, text, html}) =>{
    try{
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            post: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
        
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
            html: html
        });
        console.log("Email sent successfully.")
    }catch(error){
        console.log("Email not sent.");
        console.log(error);
    }
}