const timetables = {
    3: {
        "09:00 AM - 09:45 AM": [" ", "Maths", "Biology", "Computer", "Maths", "Biology"],
        "09:45 AM - 10:30 AM": [" ", "Biology", "Computer", "Physics", "Biology", "Computer"],
        "10:30 AM - 11:15 AM": ["Ethics & Values", "Computer", "Physics", "Maths", "Computer", "Physics"],
        "11:15 AM - 12:00 PM": ["Core-7 (p)", "Physics", "Maths", "Biology", "Physics", "Maths"],
        "12:00 PM - 12:45 PM": ["Core-7 (p)", "Maths", "Biology", "Computer", "Biology", "Computer"],
        "12:45 PM - 01:30 PM": ["Core-7 (p)", "Biology", "Computer", "Physics", "Computer", "Physics"],
        "01:30 PM - 02:15 PM": [" ", "Computer", "Physics", "Maths", "Physics", "Maths"],
        "02:15 PM - 03:00 PM": [" ", "Physics", "Maths", "Biology", "Maths", "Biology"]
    },
    5: {
        "09:00 AM - 09:45 AM": [" ", "DSE-1", "Maths", "Biology", "Computer", "Biology"],
        "09:45 AM - 10:30 AM": [" ", "Core-11", "Biology", "Computer", "Physics", "Maths"],
        "10:30 AM - 11:15 AM": [" ", " ", "Computer", "Physics", "Maths", "Computer"],
        "11:15 AM - 12:00 PM": [" ", "Core-12", "Physics", "Maths", "Biology", "Physics"],
        "12:00 PM - 12:45 PM": ["DSE-1", "DSE-1", "Maths", "Biology", "Computer", "Maths"],
        "12:45 PM - 01:30 PM": ["DSE-2", " ", "Biology", "Computer", "Physics", "Biology"],
        "01:30 PM - 02:15 PM": [" ", " ", "Computer", "Physics", "Maths", "Computer"],
        "02:15 PM - 03:00 PM": [" ", " ", "Physics", "Maths", "Biology", "Physics"]
    }
};

function updateTimetable() {
    const selectedSemester = document.querySelector('input[name="semester"]:checked');
    if (!selectedSemester) {
        // alert("Please select a semester.");
        return;
    }
    const semester = selectedSemester.value;
    const timetable = timetables[semester];
    const tableBody = document.getElementById('timetable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    const now = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayIndex = now.getDay(); // Current day index
    const currentDay = dayNames[currentDayIndex];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const ampm = currentHour >= 12 ? 'PM' : 'AM';
    const hour = currentHour % 12 || 12;
    const minute = currentMinute < 10 ? '0' + currentMinute : currentMinute;
    const currentTime = `${hour}:${minute} ${ampm}`;
    
    // console.log(currentDay);
    const a = "Saturday"
   
    if(a==currentDay){
      console.log("sanibar");
    }

    for (const [time, subjects] of Object.entries(timetable)) {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.textContent = time;
        row.appendChild(timeCell);

        subjects.forEach((subject, index) => {
            const cell = document.createElement('td');
            cell.textContent = subject;
            row.appendChild(cell);

            // Highlight the cell for the current day and time slot
            if (dayNames[index + 1] === currentDay && currentTime >= time.split(' - ')[0] && currentTime < time.split(' - ')[1]) {
                cell.classList.add('highlight');
            }
        });

        tableBody.appendChild(row);
    }
}

function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('date-time').textContent = now.toLocaleDateString('en-US', options);
}

setInterval(updateDateTime, 1000);
updateTimetable();