require('dotenv').config()

export const ENV = {
    TWITCH_OAUTH: process.env.TWITCH_OAUTH,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    USER_ACCESS_TOKEN: process.env.USER_ACCESS_TOKEN,
    API_URL: process.env.API_URL
}