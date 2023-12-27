require("dotenv").config();
const {
  Client,
  IntentsBitField,
  Activity,
  ActivityType,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  Component,
  ComponentType,
  Colors,
  time,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildScheduledEvents,
  ],
});

client.once("ready", () => {
  console.log(`${client.user.tag} is ready`);
  client.user.setPresence({
    status: "dnd",
    activities: [
      {
        type: ActivityType.Custom,
        state: "Helping Server Developers",
        name: "hmm",
      },
    ],
  });
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot || msg.channel.id !== process.env.CHANNEL_ID) {
    return;
  }

  const str = msg.content.toUpperCase();

  if (str.startsWith("HELP")) {
    msg.reply("Please Make A Ticket");
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const commandName = interaction.commandName;

  switch (commandName) {
    case "download":
      handlePluginDownload(interaction);
      break;
    case "wiki":
      handlePluginWiki(interaction);
      break;
    default:
      interaction.reply("Unknown command.");
  }
});

function handlePluginDownload(interaction) {
  const pluginName = interaction.options.getString("plugin-name");

  if (!pluginName) {
    interaction.reply("Please provide a valid plugin name.");
    return;
  }

  const downloadLinks = {
    Ultimate_BlockRegen:
      "https://www.spigotmc.org/resources/ultimate-blockregen.110552/",
    Mine_X_Farm_Regen:
      "https://www.spigotmc.org/resources/mine-x-farm-regen-1-17-1-20.107060/",
    ResourcePack_Hub:
      "https://www.spigotmc.org/resources/resourcepack-hub.113337/",
    Modify_BrushDrop:
      "https://www.spigotmc.org/resources/modify-brush-drop.114133/",
  };
  const img = {
    Ultimate_BlockRegen:
      "https://www.spigotmc.org/data/resource_icons/110/110552.jpg?1690298769",
    Mine_X_Farm_Regen:
      "https://www.spigotmc.org/data/resource_icons/107/107060.jpg?1690299037",
    ResourcePack_Hub:
      "https://www.spigotmc.org/data/resource_icons/113/113337.jpg?1698824916",
    Modify_BrushDrop:
      "https://www.spigotmc.org/data/resource_icons/114/114133.jpg?1703656579",
  };
  const downloadLink = downloadLinks[pluginName];
  const imglink = img[pluginName];
  if (downloadLink) {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`Download ${pluginName}`)
      .setURL(downloadLink)
      .setDescription(`**Download Link**\n${downloadLink}`)
      .setThumbnail(imglink)
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  } else {
    interaction.reply("Unknown plugin name");
  }
}

function handlePluginWiki(interaction) {
  const pluginName = interaction.options.getString("plugin-name");

  if (!pluginName) {
    interaction.reply("Please provide a valid plugin name.");
    return;
  }

  const wikiLinks = {
    Ultimate_BlockRegen:
      "https://roshan-x-hmmbo.gitbook.io/ultimate-blockregen/",
    Mine_X_Farm_Regen: "https://github.com/HmmboYT/Mine-X-Farm-Regen/wiki/",
  };

  const wikiLink = wikiLinks[pluginName];

  if (wikiLink) {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`${pluginName} Wiki`)
      .setURL(wikiLink)

      .setDescription(`**Wiki Link**\n${wikiLink}`)
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  } else {
    interaction.reply("Unknown plugin name.");
  }
}

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.channelId == "1043852444687401021") {
    const first = new ButtonBuilder()
      .setLabel("Mine X Farm Regen")
      .setStyle(ButtonStyle.Primary)
      .setCustomId("MineXFarm");

    const second = new ButtonBuilder()
      .setLabel("Ulimate Block Regen")
      .setStyle(ButtonStyle.Success)
      .setCustomId("UBR");

    const third = new ButtonBuilder()
      .setLabel("ResourcePack Hub")
      .setStyle(ButtonStyle.Secondary)
      .setCustomId("RPH");

    const fourth = new ButtonBuilder()
      .setLabel("Modify BrushDrop")
      .setStyle(ButtonStyle.Secondary)
      .setCustomId("MBD");

    const buttonrow = new ActionRowBuilder().addComponents(
      first,
      second,
      third,
      fourth
    );
    const buttonreply = await msg.reply({
      content:
        "**Which Plugin Your Suggestion Based On?**\n```" + msg.content + "```",
      components: [buttonrow],
    });
    const filter = (i) =>
      i.user.id === msg.author.id || i.user.id === "850394179686105139";
    const collector = buttonreply.createMessageComponentCollector({
      componentType: ComponentType.Button,
      filter,
    });

    const embed = new EmbedBuilder()
      .setColor("#0099FF")
      .setAuthor({
        name: msg.author.displayName,
        iconURL: msg.author.avatarURL(),
      })
      .setTitle(`Suggestion:                   \n`)
      .setDescription(`${msg.content}`)
      .setTimestamp();

    collector.on("collect", async (interaction) => {
      if (interaction.customId === "MineXFarm") {
        embed.setTitle("Suggestion: (Mine X Farm Regen)");
        embed.setColor(Colors.Yellow);
        embed.setThumbnail(
          "https://www.spigotmc.org/data/resource_icons/107/107060.jpg?1690299037"
        );
      } else if (interaction.customId === "UBR") {
        embed.setTitle("Suggestion: (Ultimate BlockRegen)");
        embed.setColor(Colors.Orange);
        embed.setThumbnail(
          "https://www.spigotmc.org/data/resource_icons/110/110552.jpg?1690298769"
        );
      } else if (interaction.customId === "RPH") {
        embed.setTitle("Suggestion: (ResourcePack Hub)");
        embed.setColor(Colors.Purple);
        embed.setThumbnail(
          "https://www.spigotmc.org/data/resource_icons/113/113337.jpg?1698824916"
        );
      } else if (interaction.customId === "MBD") {
        embed.setTitle("Suggestion: (Modify BrushDrop)");
        const red = 245;
        const green = 187;
        const blue = 148;
        const color = (red << 16) | (green << 8) | blue;
        embed.setColor(color);
        embed.setThumbnail(
          "https://www.spigotmc.org/data/resource_icons/114/114133.jpg?1703656579"
        );
      }
      const reply = await interaction.channel.send({ embeds: [embed] });
      reply.react("⬆️");
      reply.react("⬇️");

      const thread = await interaction.channel.threads.create({
        name: "Discuss Suggestion Here",
        startMessage: reply,
      });
      thread
        .send({ content: "Discuss about the suggestion" })
        .then((newMessage) => {
          console.log(
            `Added a new message to the thread with ID: ${newMessage.id}`
          );
        })
        .catch(console.error);
      console.log("Added Suggestion From : " + msg.author + "at " + time);
      msg.delete();
      buttonreply.delete();
      return;
    });
  }
});
client.on("messageCreate", async (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content.startsWith("!dm")) {
    const args = msg.content.split(" ");

    const embed1 = new EmbedBuilder()
      .setColor("#0099FF")
      .setAuthor({
        name: msg.author.displayName,
        iconURL: msg.author.avatarURL(),
      })
      .setTitle(`⭐ Leave a Review ⭐`)
      .setDescription(
        `Could you please leave a review for our plugin?\nYour feedback is greatly appreciated and helps us improve.\n\n⭐⭐⭐⭐⭐\nReview Here: [Plugin Link](https://www.spigotmc.org/resources/mine-x-farm-regen-1-17-1-20.107060/)\n\nThank You!!`
      )
      .setURL(
        "https://www.spigotmc.org/resources/mine-x-farm-regen-1-17-1-20.107060/"
      )
      .setTimestamp();

    const embed2 = new EmbedBuilder()
      .setColor("#0099FF")
      .setAuthor({
        name: msg.author.displayName,
        iconURL: msg.author.avatarURL(),
      })
      .setTitle(`⭐ Leave a Review ⭐`)
      .setDescription(
        `Could you please leave a review for our plugin?\nYour feedback is greatly appreciated and helps us improve.\n\n⭐⭐⭐⭐⭐\nReview Here: [Plugin Link](https://www.spigotmc.org/resources/ultimate-blockregen.110552/)\n\nThank You!!`
      )
      .setURL("https://www.spigotmc.org/resources/ultimate-blockregen.110552/")
      .setTimestamp();

    if (args.length === 3) {
      const user = msg.mentions.users.first();

      if (!user) {
        msg.reply("You need to mention a user.");
      } else {
        const response = args[2] === "free" ? embed1 : embed2;
        user
          .send({ embeds: [response] })
          .then(() => {
            console.log(`Message sent to ${user.tag}'s DM`);
          })
          .catch((error) => {
            console.error(`Error sending message: ${error}`);
          });
      }
    }

    msg.delete();
  }
});

client.login(process.env.TOKEN);
