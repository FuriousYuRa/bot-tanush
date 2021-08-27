const TelegramBot = require('node-telegram-bot-api');
const compliments = require('./compliments.json');
const smiles = require('./smiles.json');
const sample = require('lodash.sample');
const request = require('request');
const config = require('config');

const TOKEN = config.get('token');

const bot = new TelegramBot(TOKEN, {polling: true});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Приветик, выбирай что нравится 😘', {
        reply_markup: {
            keyboard: [['Комплиментик 🥰', 'Котейку 😍']],
            resize_keyboard: true,
        },
    });
});

bot.onText(/\/menu/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Ыыы, менюшечка, выбирай что нравится 😘', {
        reply_markup: {
            keyboard: [['Комплиментик 🥰', 'Котейку 😍']],
            resize_keyboard: true,
        },
    });
});

bot.onText(/\/compliment/, (msg) => {
    const chatId = msg.chat.id;
    compliment(chatId);
});

bot.onText(/\/cat/, (msg) => {
    const chatId = msg.chat.id;
    cat(chatId);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    const text = msg.text.toString();

    switch (text) {
        case 'Комплиментик 🥰':
            compliment(chatId);
            break;
        case 'Котейку 😍':
            cat(chatId);
            break;
    }
});

function compliment(chatId) {
    bot.sendMessage(chatId, sample(smiles) + ' ' + sample(compliments));
}

function cat(chatId) {
    const url = 'https://cataas.com/cat';
    const photo = request(url);
    bot.sendPhoto(chatId, photo);
}