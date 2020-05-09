module.exports = {
    name: 'ping',
    description: 'Ping!',
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        if (message.author.id === '178880546221326336') {
            return message.channel.send('P0ng!');
        }
        else {
            return message.channel.send('Pong!');
        }
    },
};

// || message.author.id === '160217975285219328'