module.exports = {
  btnTransferOfCountersOption: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Показники лічильників", callback_data: "/transfer" }],
      ],
    }),
  },
};
