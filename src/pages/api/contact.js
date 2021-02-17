const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'lukas@rksk.lt',
  from: 'noreply@rksk.lt',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js'
};
mail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error);
  });

export default async (req, res) => {
  // if sent more than 1 message in 1 minute from same ip, prevent and refresh 1 min

  if (req.method === 'POST') {
    return res.status(200).json({});
  }

  // only post
  return res.status().json({});
};
