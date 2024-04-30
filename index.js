const TelegramApi = require("node-telegram-bot-api");
const { btnTransferOfCountersOption } = require("./options");

const token = "6998607211:AAEgKicxTpDeC0GRknoc4HiUk2-zG3gFfqo";

const bot = new TelegramApi(token, { polling: true });

const start = () => {
  bot.on("message", async (msg) => {
    try {
      const text = msg.text;
      const chatId = msg.chat.id;

      bot.setMyCommands([
        { command: "/start", description: "Start greeting" },
        { command: "/info", description: "Info about user" },
      ]);

      if (text === "/start") {
        await bot.sendMessage(
          chatId,
          `КПТМ "Черкаситеплокомуненерго"\n Добрий день, ${msg.from.first_name} ${msg.from.last_name}!\n Для передачі показів лічильника натисніть кнопку "Показники лічильників".`,
          btnTransferOfCountersOption
        );
      }

      bot.on("callback_query", async (msg) => {
        const chatId = msg.message.chat.id;
        const data = msg.data;

        if (data === "/transfer") {
          await bot.sendMessage(
            chatId,
            `КПТМ "Черкаситеплокомуненерго"\n Введіть особовий рахунок в форматі \n XXXXXXXX`
          );
        }

        bot.on("message", async (msg) => {
          const userInput = msg.text.trim();
          const isNumeric = /^\d+$/.test(userInput);
          const isCorrectLength = userInput.length === 8;

          if (!isNumeric || !isCorrectLength) {
            await bot.sendMessage(
              chatId,
              "Некоректно введено особовий рахунок. Введіть повторно."
            );
          } else {
            // Введені дані відповідають критеріям, продовжуємо далі
            // Тут ви можете реалізувати логіку для збереження показників лічильників або ще щось
          }
        });
      });
    } catch (e) {
      return bot.sendMessage(chatId, "Error: " + e.message);
    }
  });
};

start();
