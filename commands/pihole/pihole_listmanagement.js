/*
 * Author: Joseph Carmosino
 * Date: []
 * Description: This file contains the definition of Slash Commands for accessing Pi-hole API List management endpoints.
 */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("pihole_listmanagement")
    .setDescription("Manage lists on your Pi-hole."),
};
