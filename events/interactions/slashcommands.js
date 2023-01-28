const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const Converter = require("timestamp-conv");
require("dotenv").config();

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    const sent = `${
      new Converter.timestamp(interaction.createdTimestamp).formatSeconds
    }`;

    const errorsArray = [];

    const errorEmbed = new EmbedBuilder()
      .setTitle("Error Executing Command")
      .setColor("Red")
      .setTimestamp();

    if (!command) errorsArray.push("💤 Command Is Outdated.");

    if (command.developer && interaction.user.id !== process.env.ID)
      errorsArray.push("Sorry, this bot is only for use of the owner!");

    if (command.testing == true)
      errorsArray.push(
        "Command Is In Testing Phase! Vist The Github For More Infortmation!"
      );

    if (errorsArray.length)
      return interaction.reply({
        embeds: [
          errorEmbed.addFields(
            {
              name: "User:",
              value: `\`\`\`${interaction.user.username}\`\`\``,
            },
            {
              name: "Reasons:",
              value: `\`\`\`${errorsArray.join("\n")}\`\`\``,
            }
          ),
        ],
        ephemeral: true,
      });

    const subCommand = interaction.options.getSubcommand(false);
    if (subCommand) {
      const subCommandFile = client.subCommands.get(
        `${interaction.commandName}.${subCommand}`
      );
      if (!subCommandFile)
        return interaction.reply({
          content: "💤 Command Is Outdated.",
          ephemeral: true,
        });
      subCommandFile.execute(interaction, client);
    } else command.execute(interaction, client);
  },
};
