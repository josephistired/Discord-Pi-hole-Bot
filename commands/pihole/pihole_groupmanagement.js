/*
 * Author: Joseph Carmosino
 * Date: []
 * Description: This file contains the definition of Slash Commands for accessing Pi-hole API Group management endpoints.
 */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("pihole_groupmanagement")
    .setDescription("Manage groups on your Pi-hole."),
};
