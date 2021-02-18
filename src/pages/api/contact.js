const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  if (req.method === 'POST') {
    if (!req.body.name || !req.body.email || !req.body.message) return;

    const message = {
      to: 'lukas@rksk.lt',
      from: 'noreply@rksk.lt',
      subject: `Message from ${req.body.name} ${req.body.email} from rksk.lt`,
      text: req.body.message
    };

    try {
      await mail.send(message);
    } catch (error) {
      return res.status(500).json({});
    }
  }

  return res.status(200).json({});
};
