# Discord.js-Pi-hole-Bot
This is a bot that utilizes the Pi-hole API to retrieve statistics and perform actions on your Pi-hole DNS server. With this bot, you can easily check the performance of your Pi-hole server and disable or enable it with simple commands, giving you full control over your network's DNS blocking capabilities.


# 🔧 Prerequisites
Before using this bot, you must have the latest version of node.js installed, an instance of Pi-hole running on a Raspberry Pi or your preferred device, your Pi-hole API token obtained from the Pi-hole dashboard, your Discord account ID and bot token, and the "Server Members Intent" and "Message Content Intent" enabled in your Discord developer portal, in addition to the "application.commands" scope enabled when inviting the bot to your server.

* [Node.js LTS](https://nodejs.org/en/)
* [Pi-hole](https://docs.pi-hole.net/main/basic-install/)
* [Pi-hole API Token](https://user-images.githubusercontent.com/65987360/215274165-f55ecf0c-f566-462d-bd4e-839d8416a5a4.png) 
| To obtain your Pi-hole API token, follow these steps:
1. Log in to your Pi-hole Admin Console.
2. Go to the Settings page, then the API/Web Interface tab.
3. At the bottom of the page, click on the "Show API Token" button.
4. Confirm the action in the pop-up window.
5. A new window will appear with a QR code, copy the "Raw API Token" located below the QR code.
6. Paste the copied token into the relevant configuration file for this bot.
* [Discord Account ID](https://www.businessinsider.com/guides/tech/discord-id)
* [Discord Bot Token](https://discord.com/developers/applications)
* [Server Members Intent and Message Content Intent Enabled](https://autocode.com/discord/threads/what-are-discord-privileged-intents-and-how-do-i-enable-them-tutorial-0c3f9977/)
* [Application.commands Checked](https://user-images.githubusercontent.com/65987360/215274052-ea7c0c8d-505d-43f8-b16a-1673bdffe032.png)

# 💫 Getting Started
Now that you have all the required Prerequisites. You can move on to the next steps. By running the commands below.

```
git clone https://github.com/josephistired/Discord-Pi-hole-Bot.git
cd Discord-Pi-hole-Bot
```

# ⚙️ Configuration
Once you have cloned the bot to your local machine and have all the necessary prerequisites in place, you must now edit the configuration file for the bot to properly use the Pi-hole API. Before, you do anything remove the ".example" part of the .env file, so that it is just named ".env" without the file extension.

Enter your Discord Bot Token, Auth for Pi-hole, Discord Account ID, and the IP of your Pi-hole.

``` 
TOKEN= Discord Bot Token Here
AUTH= Pi-hole Auth Token Here
ID= Discord Account ID Here
IP= IP of Pi-hole Here
```

Crtl - S

# 🎊 Starting The Bot

If you have successfully completed all the previous steps, the bot should now be ready to run. If you are on Windows, you can run the bot by opening the bot.bat file. If you are using a Raspberry Pi or other Linux-based system, make sure you are in the bot's directory and run the command **"nohup node ."**  in the terminal. Once the bot is running, you can enjoy its features! If you encounter any issues, you can create a pull request for help.


# 💬 Commands

With this bot, you can use the following commands:

   *  /pihole view: Allows you to view statistics about your Pi-hole server, such as the number of domains being blocked, number of DNS queries to date, percentage of queries blocked, number of cached queries, number of clients, privacy level, and last gravity update.
 *    /pihole disable [seconds]: Allows you to disable your Pi-hole server for an indefinite period of time or for a specified number of seconds.
  *   /pihole enable: Allows you to re-enable your Pi-hole server after it has been disabled.

# 🤚🏻 Disclaimer
**Please note that this bot is not endorsed, sponsored by, or associated with Pi-hole. It is an independent project that uses the Pi-hole API, but is not endorsed or supported by the Pi-hole team. This bot is not affiliated with the Pi-hole developers or their respective trademarks. Use this bot at your own risk and always make sure to read the documentation and understand how it works before using it.**
