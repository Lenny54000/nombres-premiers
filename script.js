document.getElementById('calculate').addEventListener('click', () => {
    const resultDiv = document.getElementById('result');
    const currentNumberDiv = document.getElementById('current-number');

    let primes = JSON.parse(localStorage.getItem('primes')) || [];
    let lastChecked = JSON.parse(localStorage.getItem('lastChecked')) || 1;

    if (primes.length > 0) {
        displayPrimes(primes, resultDiv);
    } else {
        resultDiv.textContent = 'Calcul en cours...';
    }

    continueCalculatingPrimes(primes, lastChecked, resultDiv, currentNumberDiv);
});

function continueCalculatingPrimes(primes, lastChecked, resultDiv, currentNumberDiv) {
    const batchSize = 100; // Nombre de nombres à vérifier par batch
    let totalPrimes = primes.length;

    function calculateBatch() {
        let num = lastChecked + 1;
        let count = 0;

        while (count < batchSize) {
            currentNumberDiv.textContent = `Nombre actuel : ${num} | Nombres premiers trouvés : ${totalPrimes}`;
            let isPrime = true;
            for (let i = 0; i < primes.length; i++) {
                if (primes[i] > Math.sqrt(num)) break;
                if (num % primes[i] === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                primes.push(num);
                totalPrimes++;
                count++;
            }
            num++;
        }

        lastChecked = num - 1;

        // Mettre à jour le local storage
        localStorage.setItem('primes', JSON.stringify(primes));
        localStorage.setItem('lastChecked', JSON.stringify(lastChecked));

        displayPrimes(primes, resultDiv);

        // Auto-scroll vers le bas
        resultDiv.scrollTop = resultDiv.scrollHeight;

        // Continuer à calculer après un court délai pour ne pas bloquer l'UI
        setTimeout(calculateBatch, 10);
    }

    calculateBatch();
}

function displayPrimes(primes, resultDiv) {
    resultDiv.innerHTML = ''; // Effacer le contenu actuel
    
    // Créer une liste de nombres premiers avec chaque nombre sur une nouvelle ligne
    primes.forEach(prime => {
        const primeElement = document.createElement('div');
        primeElement.textContent = prime;
        resultDiv.appendChild(primeElement);
    });
}
