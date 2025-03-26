function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function celcToFahr(n) {
    return ((n * 9.0 / 5.0) + 32.0);
}

module.exports = { generateRandomNumber, celcToFahr };