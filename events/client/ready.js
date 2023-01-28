const { loadAllCommands } = require("../../Handlers/commandLoader");
module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    client.user.setActivity(`Repo - `);

    console.log(`Client Logged In As: ${client.user.username}\n`);
    console.log(`Time to start seeing those sweet ad-blocking stats.\n`);

    loadAllCommands(client);
  },
};
