/*
 * Author: Joseph Carmosino
 * Date: []
 * Description: This file contains the definition of Slash Commands for accessing Pi-hole API Network information endpoints.
 */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("pihole_networkinformation")
    .setDescription("Gather advanced information about your network."),
};
