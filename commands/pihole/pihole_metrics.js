/*
 * Author: Joseph Carmosino
 * Date: []
 * Description: This file contains the definition of Slash Commands for accessing Pi-hole API Metric endpoints.
 */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("pihole_metrics")
    .setDescription("Get usage data from your Pi-hole."),
};
