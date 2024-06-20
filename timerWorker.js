let count = 0;
let timerId = null;

onmessage = function(e) {
    if (e.data === 'start') {
        timerId = setInterval(() => {
            count += 10;
            postMessage(count);
        }, 10);
    } else if (e.data === 'stop') {
        clearInterval(timerId);
        timerId = null;
    } else if (e.data === 'reset') {
        count = 0;
        postMessage(count);
    }
};
