const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const {
  ChatInputCommandInteraction,
  AttachmentBuilder,
  EmbedBuilder,
} = require("discord.js");
const superagent = require("superagent");
require("dotenv").config();

module.exports = {
  subCommand: "pihole.chart",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let { body } = await superagent.get(
      `${process.env.IP}/admin/api.php?summaryRaw&auth=${process.env.AUTH}`
    );

    const chart = {
      type: "pie",
      data: {
        datasets: [
          {
            fill: true,
            spanGaps: false,
            lineTension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 3,
            pointStyle: "circle",
            borderDash: [0, 0],
            barPercentage: 0.9,
            categoryPercentage: 0.8,
            data: [
              body.reply_UNKNOWN,
              body.reply_NODATA,
              body.reply_NXDOMAIN,
              body.reply_CNAME,
              body.reply_IP,
              body.reply_DNSSEC,
            ],
            type: "pie",
            label: "Dataset 1",
            borderColor: "#ffffff",
            backgroundColor: [
              "#4E79A7",
              "#F28E2B",
              "#E15759",
              "#76B7B2",
              "#59A14F",
              "#EDC948",
              "#B07AA1",
            ],
            borderWidth: 3,
            hidden: false,
          },
        ],
        labels: ["UNKNOWN", "NODATA", "NXDOMAIN", "CNAME", "IP", "DNSSEC"],
      },
      options: {
        title: {
          display: true,
          position: "top",
          fontSize: 12,
          fontFamily: "sans-serif",
          fontColor: "#666666",
          fontStyle: "bold",
          padding: 10,
          lineHeight: 1.2,
          text: "Type of Queries",
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        legend: {
          display: true,
          position: "top",
          align: "center",
          fullWidth: true,
          reverse: false,
          labels: {
            fontSize: 12,
            fontFamily: "sans-serif",
            fontColor: "#666666",
            fontStyle: "normal",
            padding: 10,
          },
        },
      },
    };

    const encodedChart = encodeURIComponent(JSON.stringify(chart));
    const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;

    const stats = new EmbedBuilder().setImage(chartUrl);

    interaction.reply({ embeds: [stats] });
  },
};
