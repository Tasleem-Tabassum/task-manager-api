const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'taslu5678@gmail.com',
        subject: 'Task Manager - Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendExitEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'taslu5678@gmail.com',
        subject: 'Task Manager - Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon. Thank you for using the app till now. Let us know more about why you are leaving to enhance the functionalities much better. Please reply your thoughts to this email.`
    })
}

module.exports = { sendWelcomeEmail, sendExitEmail }