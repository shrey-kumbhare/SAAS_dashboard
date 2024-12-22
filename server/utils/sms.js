const {
  twilioAccountSid,
  twilioAuthToken,
  twilioPhoneNumber,
} = require("../config");
const twilio = require("twilio");
// Twilio client for sending SMS
const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

const sendSms = async (phone, message) => {
  try {
    await twilioClient.messages.create({
      body: message,
      messagingServiceSid: "MG6331e9ae49a2eead581f6c3fb23f9a8f",
      to: phone,
    });
    console.log(`SMS sent to ${phone}`);
  } catch (error) {
    console.error(`Failed to send SMS: ${error.message}`);
  }
};

module.exports = sendSms;
