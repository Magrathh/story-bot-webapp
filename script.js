document.addEventListener('DOMContentLoaded', function() {
    const tg = window.Telegram.WebApp;
    tg.ready();

    const buttons = document.querySelectorAll('.select-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const gameId = this.getAttribute('data-game-id');
            const dataToSend = {
                type: 'game_selection',
                game_id: gameId
            };
            tg.sendData(JSON.stringify(dataToSend));
        });
    });
});