const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const superagent = require("superagent");
require("dotenv").config();

module.exports = {
  subCommand: "pihole.stats",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let { body } = await superagent.get(
      `${process.env.IP}/admin/api.php?summary&version&type&auth=${process.env.AUTH}`,
    );

    const attachment = new AttachmentBuilder("assets/pihole.png");

    const stats = new EmbedBuilder()
      .setTitle("Here are your Pi-Hole Stats")
      .setTimestamp()
      .setColor("Green")
      .setThumbnail("attachment://pihole.png")
      .setFooter({ text: `Type: ${body.type} | API Version: ${body.version}` })
      .addFields(
        {
          name: "⛔ Number of Domains being blocked",
          value: `\`\`\`${body.domains_being_blocked}\`\`\``,
        },
        {
          name: "🔢 Number of DNS queries to date",
          value: `\`\`\`${body.dns_queries_today}\`\`\``,
        },
        {
          name: "% Precentage of DNS queries blocked today",
          value: `\`\`\`${body.ads_percentage_today}%\`\`\``,
        },
        {
          name: "⚙️ Number of DNS queries cached",
          value: `\`\`\`${body.queries_cached}\`\`\``,
        },
        {
          name: "⚙️ Number of DNS queries forwarded",
          value: `\`\`\`${body.queries_forwarded}\`\`\``,
        },
        {
          name: "🖥️ Number of current clients",
          value: `\`\`\`${body.unique_clients}\`\`\``,
        },
        {
          name: "🖥️ Number of clients ever seen",
          value: `\`\`\`${body.clients_ever_seen}\`\`\``,
        },
        {
          name: "🔒 Privacy level",
          value: `\`\`\`${body.privacy_level}\`\`\``,
        },
        {
          name: "📃 Gravity last updated",
          value: `\`\`\`${new Date(
            body.gravity_last_updated.absolute * 1000,
          ).toLocaleString()}\`\`\``,
        },
      );

    if (body.status === "disabled") {
      stats.setColor("Red");
    } else {
      stats.setColor("Green");
    }

    interaction.reply({
      embeds: [stats],
      files: [attachment],
    });
  },
};
