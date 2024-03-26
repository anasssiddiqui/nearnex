const { firebaseApp } = require("../helper/firebase");
const {
  sendNotificationTemplate,
  sendNotificationsTemplate,
} = require("../templates/notification_templates");

const sendMultipleNotification = async ({
  fcmTokens,
  data,
  message,
  title = "Important Notification from Package delivery app",
}) => {
  let messageContent = sendNotificationsTemplate({
    fcmTokens,
    data,
    message,
    title,
  });
  console.log(messageContent, "<<<<<messageContent")
  firebaseApp
    .messaging()
    .sendMulticast(messageContent)
    .then((response) => {
      const resData = `${response.successCount} messages were sent successfully`;
      console.log(resData);
      return;
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  sendMultipleNotification,
};
