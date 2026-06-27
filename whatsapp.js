const ULTRAMSG_INSTANCE = process.env.REACT_APP_ULTRAMSG_INSTANCE;
const ULTRAMSG_TOKEN = process.env.REACT_APP_ULTRAMSG_TOKEN;

export const sendWhatsAppNotification = async (phoneNumber, message) => {
  try {
    const response = await fetch(
      `https://api.ultramsg.com/${ULTRAMSG_INSTANCE}/messages/chat`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: ULTRAMSG_TOKEN,
          to: phoneNumber,
          body: `BinConnect Alert: ${message}`
        })
      }
    );
    return response.json();
  } catch (error) {
    console.error('WhatsApp notification failed:', error);
  }
};
