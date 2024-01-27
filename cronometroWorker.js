let milisegundos = 0;
let segundos = 0;
let minutos = 0;
let horas = 0;
let cronometro;

function iniciarCronometro() {
    cronometro = setInterval(() => {
        milisegundos += 10;
        if (milisegundos === 1000) {
            milisegundos = 0;
            segundos++;
            if (segundos === 60) {
                segundos = 0;
                minutos++;
                if (minutos === 60) {
                    minutos = 0;
                    horas++;
                }
            }
        }
        postMessage({ horas, minutos, segundos, milisegundos });
    }, 10);
}

function detenerCronometro() {
    clearInterval(cronometro);
}

self.onmessage = function(e) {
    if (e.data === 'start') {
        iniciarCronometro();
    } else if (e.data === 'stop') {
        detenerCronometro();
    }
};
