document.addEventListener('DOMContentLoaded', function() {
    const tg = window.Telegram.WebApp;
    tg.ready();

    // Показываем главную кнопку, она будет отправлять данные
    tg.MainButton.text = "Подтвердить выбор";
    tg.MainButton.show();

    let selectedGameId = null;

    const buttons = document.querySelectorAll('.select-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // "Выделяем" выбранную карточку
            document.querySelectorAll('.game-card').forEach(card => card.classList.remove('selected'));
            this.closest('.game-card').classList.add('selected');

            // Сохраняем ID выбранной игры
            selectedGameId = this.getAttribute('data-game-id');

            // Обновляем текст главной кнопки
            tg.MainButton.text = `Выбрать: ${this.closest('.game-card').querySelector('h3').innerText}`;
        });
    });

    // Вешаем обработчик на главную кнопку Telegram
    tg.MainButton.onClick(function() {
        if (!selectedGameId) {
            tg.showAlert('Пожалуйста, сначала выберите историю.');
            return;
        }

        // URL вашего бэкенда на PythonAnywhere (мы получим его позже)
        const backendUrl = 'https://Magrath.pythonanywhere.com/start_game';

        // Данные для отправки
        const data = {
            user: tg.initDataUnsafe.user, // Отправляем данные о пользователе
            game_id: selectedGameId
        };

        // Показываем индикатор загрузки
        tg.MainButton.showProgress();

        fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            // Если сервер ответил успехом, закрываем Web App
            if (result.status === 'ok') {
                tg.close();
            } else {
                tg.showAlert(result.message || 'Произошла ошибка.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            tg.showAlert('Не удалось связаться с сервером. Ошибка: ' + error.message);
        })
        .finally(() => {
            // Убираем индикатор загрузки
            tg.MainButton.hideProgress();
        });
    });
});