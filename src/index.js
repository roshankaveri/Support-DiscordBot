require('dotenv').config();
const { Client, IntentsBitField, Activity, ActivityType, EmbedBuilder } = require('discord.js');

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

client.once('ready', () => {
    console.log(`${client.user.tag} is ready`);
    client.user.setPresence({
        status: 'dnd',
        activities: [{ name: 'Helping Server Developers', type: ActivityType.CUSTOM }],
    });
});


client.on('messageCreate', async (msg) => {
    if (msg.author.bot || msg.channel.id !== process.env.CHANNEL_ID) {
        return;
    }

    const str = msg.content.toUpperCase();

    if (str.startsWith('HELP')) {
        msg.reply('Please Make A Ticket');

    }
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const commandName = interaction.commandName;

    switch (commandName) {
        case 'download':
            handlePluginDownload(interaction);
            break;
        case 'wiki':
            handlePluginWiki(interaction);
            break;
        default:
            interaction.reply('Unknown command.');
    }
});

function handlePluginDownload(interaction) {
    const pluginName = interaction.options.getString('plugin-name');

    if (!pluginName) {
        interaction.reply('Please provide a valid plugin name.');
        return;
    }

    const downloadLinks = {
        'Ultimate_BlockRegen': 'https://www.spigotmc.org/resources/ultimate-blockregen.110552/',
        'Mine_X_Farm_Regen': 'https://www.spigotmc.org/resources/mine-x-farm-regen-1-17-1-20.107060/',
    };
    const img = {
        'Ultimate_BlockRegen': 'https://www.spigotmc.org/data/resource_icons/110/110552.jpg?1690298769',
        'Mine_X_Farm_Regen': 'https://www.spigotmc.org/data/resource_icons/107/107060.jpg?1690299037',
    };
    const downloadLink = downloadLinks[pluginName];
    const imglink = img[pluginName];
    if (downloadLink) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Download ${pluginName}`)
            .setURL(downloadLink)
            .setDescription(`**Download Link**\n${downloadLink}`)
            .setThumbnail(imglink)
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    } else {
        interaction.reply('Unknown plugin name');
    }
}

function handlePluginWiki(interaction) {
    const pluginName = interaction.options.getString('plugin-name');

    if (!pluginName) {
        interaction.reply('Please provide a valid plugin name.');
        return;
    }

    const wikiLinks = {
        'Ultimate_BlockRegen': 'https://roshan-x-hmmbo.gitbook.io/ultimate-blockregen/',
        'Mine_X_Farm_Regen': 'https://github.com/HmmboYT/Mine-X-Farm-Regen/wiki/',
    };

    

    const wikiLink = wikiLinks[pluginName];
 
    if (wikiLink) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${pluginName} Wiki`)
            .setURL(wikiLink)
            .setDescription(`**Wiki Link**\n${wikiLink}`)
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    } else {
        interaction.reply('Unknown plugin name.');
    }
}


client.on('messageCreate', async (msg) => {
    if (msg.author.bot) {
      return;
    }
  
    const str = msg.content.toUpperCase();
  
    if (msg.channelId == '1158349649875320922') {
      
      const embed = new EmbedBuilder()
        .setColor('#0099FF')
        .setAuthor({
            name: msg.author.displayName,
            iconURL: msg.author.avatarURL(),
        })
        .setTitle(`Suggestion:\n`)
        .setDescription(`${msg.content}`)
        .setTimestamp();
  
      const reply = await msg.channel.send({ embeds: [embed] });
      reply.react('✅');
      reply.react('❌');
      
      const thread = await msg.channel.threads.create({
        name: 'DisCuss Here',
        startMessage: reply,
      });
      thread.send({ content: 'Discuss About The Suggestion' })
      .then((newMessage) => {
        console.log(`Added a new message to the thread with ID: ${newMessage.id}`);
      })
      .catch(console.error);
      msg.delete();
    }
   
  });

client.login(process.env.TOKEN);
