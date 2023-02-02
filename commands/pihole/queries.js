const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const superagent = require("superagent");
require("dotenv").config();

module.exports = {
  subCommand: "pihole.queries",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let { body } = await superagent.get(
      `${process.env.IP}/admin/api.php?summaryRaw&auth=${process.env.AUTH}`
    );

    const chart = {
      type: "bar",
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
              body.reply_DOMAIN,
              body.reply_RRNAME,
              body.reply_SERVFAIL,
              body.reply_REFUSED,
              body.reply_NOTIMP,
              body.reply_OTHER,
              body.reply_DNSSEC,
              body.reply_NONE,
              body.reply_BLOB,
            ],
            type: "bar",
            label: "Type of Queries",
            borderColor: "#f20900",
            backgroundColor: "#4E79A733",
            borderWidth: 3,
            hidden: false,
          },
        ],
        labels: [
          "UNKNOWN",
          "NODATA",
          "NXDOMAIN",
          "CNAME",
          "IP",
          "DOMAIN",
          "RRNAME",
          "SERVFAIL",
          "REFUSED",
          "NOTIMP",
          "OTHER",
          "DNSSEC",
          "NONE",
          "BLOB",
        ],
      },
      options: {
        title: {
          display: false,
          position: "top",
          fontSize: 12,
          fontFamily: "sans-serif",
          fontColor: "#666666",
          fontStyle: "bold",
          padding: 10,
          lineHeight: 1.2,
          text: "Chart title",
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        plugins: {
          datalabels: {
            display: true,
            align: "center",
            anchor: "center",
            backgroundColor: "#eee",
            borderColor: "#ddd",
            borderRadius: 6,
            borderWidth: 1,
            padding: 4,
            color: "#000000",
            font: {
              family: "sans-serif",
              size: 8,
              style: "normal",
            },
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
