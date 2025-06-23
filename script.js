// Файл: webapp/script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("Страница загружена. Начинаю выполнение скрипта.");

    try {
        const tg = window.Telegram.WebApp;
        console.log("Объект Telegram WebApp успешно получен.", tg);
        tg.ready();
    } catch (e) {
        console.error("Не удалось получить объект Telegram WebApp. Это нормально, если вы открыли страницу не в Telegram.", e);
    }

    const buttons = document.querySelectorAll('.select-button');
    console.log(`Найдено кнопок 'Выбрать': ${buttons.length}`);

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            console.log("Кнопка нажата!"); // <-- Проверяем, срабатывает ли клик

            const gameId = this.getAttribute('data-game-id');
            console.log(`Получен gameId: ${gameId}`);

            const dataToSend = {
                type: 'game_selection',
                game_id: gameId
            };
            console.log("Данные для отправки:", dataToSend);

            try {
                // Пытаемся отправить данные. В браузере это вызовет ошибку, но это нормально.
                const tg = window.Telegram.WebApp;
                tg.sendData(JSON.stringify(dataToSend));
                console.log("Данные успешно отправлены через tg.sendData.");
            } catch(e) {
                console.error("Ошибка при отправке данных через tg.sendData. Это ожидаемо в обычном браузере.", e);
                // Для отладки вне Telegram, можно показать alert
                alert(`Отладка: попытка отправить game_id: ${gameId}`);
            }
        });
    });
});