const keys = require("../config/keys");
const emailTemplate = require("./emailTemplate");

module.exports = (users) => {
  let content = "";
  users.forEach((user) => {
    content = `
      ${content}
      <div>Child username: ${user.name}</div>
      <div>Child address: ${user.address}</div>
      <div>${user.message}</div>
      <br />
    `;
  });

  return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3>Santa App</h3>
                <p>All pending requests:</p>
                <div>
                    ${content}
                </div>
                <a href="${keys.redirectDomain}">Shanta App</a>
            </div>
        </body>
    </html>
  `;
};
