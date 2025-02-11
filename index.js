// (() => {
//     // set the final date "March 01, 2025 00:00"
//     const compareDate = new Date(2025, 2, 1, 0, 0).getTime();

//     const timer = setInterval(() => {
//         timeBetweenDates(compareDate);
//     }, 1000);

//     function timeBetweenDates(toDate) {

//         const difference = toDate - Date.now();

//         // if the date has passed, the timer stops
//         if (difference <= 0) {

//             clearInterval(timer);

//         } else {

//             let seconds = Math.floor(difference / 1000),
//                 minutes = Math.floor(seconds / 60),
//                 hours = Math.floor(minutes / 60),
//                 days = Math.floor(hours / 24);

//             hours %= 24;
//             minutes %= 60;
//             seconds %= 60;

//             if (days < 10) days = '0' + days;
//             if (hours < 10) hours = '0' + hours;
//             if (minutes < 10) minutes = '0' + minutes;
//             if (seconds < 10) seconds = '0' + seconds;

//             document.getElementById('days').innerHTML = days;
//             document.getElementById('hours').innerHTML = hours;
//             document.getElementById('minutes').innerHTML = minutes;
//             document.getElementById('seconds').innerHTML = seconds;

//         }
//     }
// })();

(() => {
  const compareDate = new Date(2025, 2, 1, 0, 0).getTime();

  function updateTimer() {
    const difference = compareDate - Date.now();

    if (difference <= 0) {
      clearInterval(timer);
      return;
    }

    let seconds = Math.floor(difference / 1000) % 60;
    let minutes = Math.floor(difference / (1000 * 60)) % 60;
    let hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateTimer(); // Обновить сразу при загрузке
  const timer = setInterval(updateTimer, 1000);
})();