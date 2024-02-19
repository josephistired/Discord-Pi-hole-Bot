/*
 * Author: Joseph Carmosino
 * Date: []
 * Description: This file contains the definition of Slash Commands for accessing Pi-hole API Pi-hole configuration endpoints.
 */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("pihole_configuration")
    .setDescription("Configure your Pi-hole."),
};
