 
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabSections = document.querySelectorAll('.converter-section');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                tabSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === tabId) {
                        section.classList.add('active');
                    }
                });
            });
        });
        
        function calculateSpeed() {
            let file_size = document.getElementById('file_size').value;
            let internet_speed = document.getElementById('internet_speed').value;
            let fileUnit = document.getElementById('size_per_byte').value;
            let speedUnit = document.getElementById('size_byte_per_sec').value;
            let answer = 0;

            file_size = parseFloat(file_size);
            internet_speed = parseFloat(internet_speed);

            if (!file_size || !internet_speed) {
                document.getElementById('file-transfer-answer').textContent = 'Please enter both values.';
                return;
            }

            if (file_size <= 0 || internet_speed <= 0) {
                document.getElementById('file-transfer-answer').textContent = 'Values must be greater than zero.';
                return;
            }

            let fileSizeBits;
            switch (fileUnit) {
                case 'kilobytes':
                    fileSizeBits = file_size * 8 * 1024; 
                case 'megabits':
                    fileSizeBits = file_size * 1_000_000; 
                    break;
                case 'gigabits':
                    fileSizeBits = file_size * 1_000_000_000; 
                    break;
                case 'megabytes':
                    fileSizeBits = file_size * 8 * 1024 * 1024; 
                    break;
                case 'gigabytes':
                    fileSizeBits = file_size * 8 * 1024 * 1024 * 1024; 
                    break;
                default:
                    fileSizeBits = file_size;
            }

            let speedBitsPerSec;
            switch (speedUnit) {
                case 'kilobytes_sec':
                    speedBitsPerSec = internet_speed * 8 * 1024; 
                    break;
                case 'megabits_sec':
                    speedBitsPerSec = internet_speed * 1_000_000; 
                    break;
                case 'gigabits_sec':
                    speedBitsPerSec = internet_speed * 1_000_000_000;
                    break;
                case 'megabytes_sec':
                    speedBitsPerSec = internet_speed * 8 * 1024 * 1024; 
                    break;
                default:
                    speedBitsPerSec = internet_speed;
            }

            if (speedBitsPerSec === 0) {
                document.getElementById('file-transfer-answer').textContent = 'Internet speed cannot be zero.';
                return;
            }

            answer = fileSizeBits / speedBitsPerSec;

            function formatTime(seconds) {
                if (seconds < 1) return (seconds * 1000).toFixed(2) + ' milliseconds';
                if (seconds < 60) return seconds.toFixed(2) + ' seconds';
                
                let mins = Math.floor(seconds / 60);
                let secs = Math.round(seconds % 60);
                
                if (mins < 60) {
                    if (secs === 0) return `${mins} minute${mins !== 1 ? 's' : ''}`;
                    return `${mins} minute${mins !== 1 ? 's' : ''} ${secs} second${secs !== 1 ? 's' : ''}`;
                }
                
                let hrs = Math.floor(mins / 60);
                mins = mins % 60;
                
                if (hrs < 24) {
                    let timeStr = `${hrs} hour${hrs !== 1 ? 's' : ''}`;
                    if (mins > 0) timeStr += ` ${mins} minute${mins !== 1 ? 's' : ''}`;
                    return timeStr;
                }
                
                let days = Math.floor(hrs / 24);
                hrs = hrs % 24;
                
                let timeStr = `${days} day${days !== 1 ? 's' : ''}`;
                if (hrs > 0) timeStr += ` ${hrs} hour${hrs !== 1 ? 's' : ''}`;
                if (mins > 0 && days < 3) timeStr += ` ${mins} minute${mins !== 1 ? 's' : ''}`;
                
                return timeStr;
            }

            document.getElementById('file-transfer-answer').textContent = formatTime(answer);
        }

        
        function convertTemperature() {
            const tempValue = parseFloat(document.getElementById('temp-value').value);
            const fromUnit = document.getElementById('temp-from').value;
            const toUnit = document.getElementById('temp-to').value;
            const resultElement = document.getElementById('temp-answer');
            
            if (isNaN(tempValue)) {
                resultElement.textContent = 'Please enter a valid temperature value.';
                return;
            }
            
            
            let celsius;
            switch (fromUnit) {
                case 'celsius':
                    celsius = tempValue;
                    break;
                case 'fahrenheit':
                    celsius = (tempValue - 32) * 5/9;
                    break;
                case 'kelvin':
                    celsius = tempValue - 273.15;
                    break;
            }
            
           
            if (fromUnit === 'kelvin' && tempValue < 0) {
                resultElement.textContent = 'Temperature cannot be below absolute zero (0K).';
                return;
            }
            
            if ((fromUnit === 'celsius' && tempValue < -273.15) || 
                (fromUnit === 'fahrenheit' && tempValue < -459.67)) {
                resultElement.textContent = 'Temperature cannot be below absolute zero.';
                return;
            }
            
            
            let result;
            switch (toUnit) {
                case 'celsius':
                    result = celsius;
                    break;
                case 'fahrenheit':
                    result = (celsius * 9/5) + 32;
                    break;
                case 'kelvin':
                    result = celsius + 273.15;
                    break;
            }
            
           
            let unitSymbol;
            switch (toUnit) {
                case 'celsius': unitSymbol = '°C'; break;
                case 'fahrenheit': unitSymbol = '°F'; break;
                case 'kelvin': unitSymbol = 'K'; break;
            }
            
            resultElement.textContent = `${result.toFixed(2)} ${unitSymbol}`;
        }
    