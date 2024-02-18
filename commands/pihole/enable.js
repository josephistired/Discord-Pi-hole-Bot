const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const superagent = require("superagent");
require("dotenv").config();

module.exports = {
  subCommand: "pihole.enable",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const errorsArray = [];

    const errorEmbed = new EmbedBuilder()
      .setTitle("Error executing command")
      .setColor("Red");

    let { body } = await superagent.get(
      `${process.env.IP}/admin/api.php?summary&auth=${process.env.AUTH}`,
    );

    if (body.status === "enabled")
      errorsArray.push("Your Pi-hole DNS server seems to already be enabled.");

    if (errorsArray.length)
      return interaction.reply({
        embeds: [
          errorEmbed.addFields({
            name: "Reason:",
            value: `\`\`\`${errorsArray.join("\n")}\`\`\``,
          }),
        ],
        ephemeral: true,
      });

    const attachment = new AttachmentBuilder("assets/pihole.png");

    const success = new EmbedBuilder()
      .setTitle(`Your Pi-hole DNS server has been enabled.`)
      .setTimestamp()
      .setColor("Green")
      .setThumbnail("attachment://pihole.png");

    await superagent
      .get(`${process.env.IP}/admin/api.php?enable&auth=${process.env.AUTH}`)
      .then(interaction.reply({ embeds: [success], files: [attachment] }));
  },
};
