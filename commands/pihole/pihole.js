const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("pihole")
    .setDescription(
      "View your Pi-hole stats or even disable your Pi-hole DNS server."
    )
    .addSubcommand((options) =>
      options
        .setName("view")
        .setDescription("View various stats on your Pi-hole.")
    )
    .addSubcommand((options) =>
      options
        .setName("chart")
        .setDescription(
          "View various stats DNS Queries on your Pi-hole with a Chart."
        )
    )
    .addSubcommand((options) =>
      options
        .setName("enable")
        .setDescription("Enable your Pi-hole DNS server with a simple command.")
    )
    .addSubcommand((options) =>
      options
        .setName("disable")
        .setDescription(
          "Disable your Pi-hole DNS server with a simple command."
        )
        .addNumberOption((options) =>
          options
            .setName("seconds")
            .setDescription(
              "Type the amount of seconds you want your Pi-hole DNS server to be disabled for."
            )
        )
    ),
};
