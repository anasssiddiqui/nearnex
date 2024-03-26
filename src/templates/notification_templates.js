
/**
 * @description - This function is used to create firebase notification template for single user
 */

const sendNotificationTemplate = ({ fcmToken, data, message }) => {
    let messageFormat = {
        notification: {
            title: 'Important Notification from Package delivery app',
            body: message,
        },
        token: fcmToken,
    };
    if(data)
        messageFormat.data=data
    return messageFormat;
};

/**
 * @description - This function is used to create firebase notification template for multiple user
 */

const sendNotificationsTemplate = ({ fcmTokens, data, message,title }) => {
    let messageFormat = {
        data,
        notification: {
            title: title,
            body: message,
        },
        tokens: fcmTokens,
    };
    return messageFormat;
};

module.exports = {
    sendNotificationTemplate,
    sendNotificationsTemplate
};
