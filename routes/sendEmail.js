var nodemailer = require('nodemailer')

const sendEmail = async(option) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'tameradel209@gmail.com',
            pass: 'Tamer$209',
        },
    })

    const info = await transporter.sendMail(option);

    return info
}

module.exports = sendEmail