import { Injectable , OnModuleInit} from '@nestjs/common';
import { Telegraf } from 'telegraf';
import {Cron} from '@nestjs/schedule';
import axios from 'axios';


@Injectable()
export class TelegramService implements OnModuleInit {
    private bot: Telegraf;
    private subscribers : Set<number> = new Set();

    constructor() {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        if (!botToken) {
        throw new Error('TELEGRAM_BOT_TOKEN is not defined');
        }
        this.bot = new Telegraf(botToken);
    }

    onModuleInit() {
        this.bot.start((ctx) =>{
            ctx.reply('Welcome! You can subscribe to daily weather updates by sending /subscribe.');
        });

        this.bot.command('subscribe', (ctx) => {
            this.subscribers.add(ctx.chat.id);
            ctx.reply('You have been subscribed to daily weather updates.');
        });

        this.bot.command('unsubscribe', (ctx) => {
            this.subscribers.delete(ctx.chat.id);
            ctx.reply('You have been unsubscribed from daily weather updates.');
        });

        this.bot.launch();
    }

    @Cron('0 0 8 * * *')
    async sendDailyWeatherUpdate() {
        const weather = await this.getWeather();
        const message = `Good morning! Here is the weather update for today: ${weather}`;
        this.subscribers.forEach((chatId) => {
            this.bot.telegram.sendMessage(chatId, message);
        });
    }

    async getWeather() {
        try {
            const response = await axios.get('YOUR_WEATHER_API_URL');
            // Extract weather information from the response as needed
            return response.data.weather[0].description;
          } catch (error) {
            console.error('Error fetching weather:', error);
            return 'Unable to fetch weather data.';
        }
    }   
}
