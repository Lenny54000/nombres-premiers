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
    // Créer une liste HTML avec chaque nombre premier sur une ligne
    resultDiv.innerHTML = primes.map(prime => `<div>${prime}</div>`).join('');
}
