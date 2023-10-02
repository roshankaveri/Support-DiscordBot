require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType  } = require('discord.js');

const commands = [
    {
      name: 'wiki',
      description: 'get the wiki link of plugin',
      options: [
        {
          name: 'plugin-name',
          description: 'Enter plugin name',
          type: ApplicationCommandOptionType.String,
          choices: [
            {
              name: 'Ultimate_BlockRegen',
              value: 'Ultimate_BlockRegen',
            },
            {
              name: 'Mine_X_Farm_Regen',
              value: 'Mine_X_Farm_Regen',
            },

          ],
          required: true,
        },
      ],
    },{
        name: 'download',
        description: 'get the download link of plugin',
        options: [
          {
            name: 'plugin-name',
            description: 'Enter plugin name',
            type: ApplicationCommandOptionType.String,
            choices: [
              {
                name: 'Ultimate_BlockRegen',
                value: 'Ultimate_BlockRegen',
              },
              {
                name: 'Mine_X_Farm_Regen',
                value: 'Mine_X_Farm_Regen',
              },
  
            ],
            required: true,
          },
        ],
      },
  ];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();