document.addEventListener("DOMContentLoaded", function() {
    // Definiciones y configuraciones
    const subjects = {
        'A': 'Interfaces',
        'B': 'Android',
        'C': 'Gestión',
        'D': 'Datos',
        'E': 'Empresa',
        'F': 'Servicios',
    };

    const timeBlocks = [
        "8:30", "9:20", "10:10", "11:00", "11:25", "12:15", "13:20", "14:10", "17:00", "17:50"
    ];

    luxon.Settings.defaultLocale = 'es';  // Configuración de Luxon para usar el idioma español

    // Funciones
    function replaceSubjectsInSchedule() {
        const divs = document.querySelectorAll(".week div");

        divs.forEach(div => {
            Array.from(div.children).forEach(child => {
                if (subjects[child.textContent]) {
                    child.textContent = subjects[child.textContent];
                }
            });
        });
    }

    function highlightCurrentTimeBlock(dt) {
        const dayIndex = dt.weekday;
        let currentHour = dt.hour;
        let currentMinute = dt.minute;

        let timeBlockIndex = timeBlocks.findIndex((block) => {
            const [hour, minute] = block.split(':').map(Number);
            return currentHour < hour || (currentHour === hour && currentMinute < minute);
        });

        if (timeBlockIndex !== -1 && timeBlockIndex !== 0) {
            timeBlockIndex -= 1;
        }

        const tableId = timeBlockIndex < 8 ? "table1" : "table2";

        if (dayIndex >= 1 && dayIndex <= 5 && timeBlockIndex !== -1) {
            const dayDiv = document.querySelector(`#${tableId} .week`).children[dayIndex - 1];

            if (tableId === "table2") {
                timeBlockIndex -= 8;
            }

            const timeDiv = dayDiv && dayDiv.children[timeBlockIndex + 1];
            if (timeDiv) {
                timeDiv.id = "now";
                console.log("Asignatura:", timeDiv.textContent);
            }
        }
    }

    // Ejecución
    const dt = luxon.DateTime.now().setZone("Europe/Madrid");

    console.log("Día:", dt.weekdayLong, "| Hora:", dt.toFormat("HH:mm"));  // Imprimir día y hora

    replaceSubjectsInSchedule();
    highlightCurrentTimeBlock(dt);
});
