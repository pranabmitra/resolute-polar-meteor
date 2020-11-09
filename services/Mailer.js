const nodemailer = require("nodemailer");
const keys = require("../config/keys");
const CONSTANTS = require("../utils/constants");
const emailTemplate = require('./emailTemplate');
const helper = require('../utils/helper');

class Mailer {
  constructor() {
    this.mailOptions = {
      from: keys.senderEmail,
      to: keys.toEmail,
      subject: "Santa App - Pending Requests",
    };
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: keys.authEmail,
        pass: keys.authEmailPass,
      },
    });
    this.sendMailInterval = null;
  }

  send() {
    try {
      const filteredUsers = helper.getAllUsers().filter(user => user.requestStatus === 'pending');
      helper.updateRequestStatus(filteredUsers);
      
      if (filteredUsers.length) {
        const mailContent = emailTemplate(filteredUsers);
        this.mailOptions.html = mailContent;
        this.transporter.sendMail(this.mailOptions, (error, info) => {
          if (error) {
            console.log("Email sending error: ", error);
          } else {
            // console.log("Email send: ", info.response);
          }
        });
      }
  
      // run every 15s
      /**
       * This is not a good way to do this job. This is just a temp solution to make it working.
       * Good way would be like use Redis scheduler or message queue.
       */
      this.sendMailInterval = setInterval(() => this.send(), CONSTANTS.timeDurationToSentEmail * 1000);
    } catch (error) {
      console.log('Error while seding email: ', error);
    }
    
  }
}

module.exports = Mailer;
