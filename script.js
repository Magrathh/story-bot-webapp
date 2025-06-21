// Ждем, пока вся страница загрузится
document.addEventListener('DOMContentLoaded', function() {
    // Получаем объект WebApp из глобального объекта window
    const tg = window.Telegram.WebApp;

    // Сообщаем Telegram, что приложение готово к отображению
    tg.ready();

    // Находим все кнопки с классом 'select-button'
    const buttons = document.querySelectorAll('.select-button');

    // Для каждой кнопки добавляем обработчик клика
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // При клике получаем ID игры из атрибута data-game-id
            const gameId = this.getAttribute('data-game-id');

            // Формируем объект с данными для отправки боту
            const dataToSend = {
                type: 'game_selection', // Указываем тип действия
                game_id: gameId
            };

            // Отправляем данные боту в виде JSON-строки
            tg.sendData(JSON.stringify(dataToSend));

            // После отправки данных можно закрыть Web App
            // tg.close(); // Раскомментируйте, если хотите, чтобы окно закрывалось сразу
        });
    });
});