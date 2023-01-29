const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const superagent = require("superagent");
require("dotenv").config();

module.exports = {
  subCommand: "pihole.disable",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const seconds = interaction.options.getNumber("seconds") || "";

    const errorsArray = [];

    const errorEmbed = new EmbedBuilder()
      .setTitle("Error executing command")
      .setColor("Red");

    let { body } = await superagent.get(
      `${process.env.IP}/admin/api.php?summary&auth=${process.env.AUTH}`
    );

    if (body.status === "disabled")
      errorsArray.push("Your Pi-hole DNS server seems to already be disabled.");

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
      .setTimestamp()
      .setColor("Green")
      .setThumbnail("attachment://pihole.png");

    if (!seconds) {
      success.setTitle("Your Pi-hole DNS server has been disabled.");
    } else {
      success.setTitle(
        `Your Pi-hole DNS server has been disabled for ${seconds} seconds.`
      );
    }

    await superagent
      .get(
        `${process.env.IP}/admin/api.php?disable=${seconds}&auth=${process.env.AUTH}`
      )
      .then(interaction.reply({ embeds: [success], files: [attachment] }));
  },
};
