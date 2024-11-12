// Variables de estado
let level = 1;
let attempts = 0;

// Palabras de juego
const adjectives = [
    ["bigger", "small"],
    ["taller", "short"],
    ["faster", "slow"]
];

const comparisons = [
    { sentence: "An elephant is ___ than a mouse.", options: ["bigger", "smaller", "older"], answer: "bigger" },
    { sentence: "A skyscraper is ___ than a house.", options: ["taller", "wider", "smaller"], answer: "taller" },
    { sentence: "A cheetah is ___ than a turtle.", options: ["faster", "weaker", "stronger"], answer: "faster" }
];

const versus = [
    { question: "Choose the correct sentence:", options: [
        "The giraffe is tallest animal.",
        "The giraffe is the tallest animal.",
        "The giraffe is taller animal."
    ], answer: "The giraffe is the tallest animal." },
    { question: "Choose the correct sentence:", options: [
        "Mount Everest is higher than all other mountains.",
        "Mount Everest is high than all other mountains.",
        "Mount Everest is highest than all other mountains."
    ], answer: "Mount Everest is higher than all other mountains." },
    { question: "Choose the correct sentence:", options: [
        "This puzzle is more difficult than the others.",
        "This puzzle is difficult than the others.",
        "This puzzle is most difficult than the others."
    ], answer: "This puzzle is more difficult than the others." }
];

// Iniciar el juego
function startGame() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const id = document.getElementById("id").value;
    if (name && email && id) {
        document.getElementById("user-form").classList.add("hidden");
        document.getElementById("game").classList.remove("hidden");
        loadLevel();
    } else {
        alert("Please fill in all fields.");
    }
}

// Cargar el nivel actual
function loadLevel() {
    document.getElementById("levelTitle").innerText = `Level ${level}`;
    const instructions = document.getElementById("instructions");
    const answerInput = document.getElementById("answerInput");
    const optionsDiv = document.getElementById("options");

    answerInput.classList.add("hidden");
    optionsDiv.classList.add("hidden");

    if (level === 1) {
        instructions.innerText = `Choose the correct adjective between: ${adjectives[attempts][0]} and ${adjectives[attempts][1]}`;
        answerInput.classList.remove("hidden");
        answerInput.value = "";
    } else if (level === 2) {
        const comparison = comparisons[attempts];
        instructions.innerText = comparison.sentence;
        optionsDiv.classList.remove("hidden");
        optionsDiv.innerHTML = "";

        comparison.options.forEach(option => {
            const btn = document.createElement("button");
            btn.innerText = option;
            btn.onclick = () => (answerInput.value = option);
            optionsDiv.appendChild(btn);
        });
    } else if (level === 3) {
        const versusQuestion = versus[attempts];
        instructions.innerText = versusQuestion.question;
        optionsDiv.classList.remove("hidden");
        optionsDiv.innerHTML = "";

        versusQuestion.options.forEach(option => {
            const btn = document.createElement("button");
            btn.innerText = option;
            btn.onclick = () => (answerInput.value = option);
            optionsDiv.appendChild(btn);
        });
    }
}

// Enviar la respuesta
function submitAnswer() {
    const answerInput = document.getElementById("answerInput").value.trim();

    if (!answerInput) {
        alert("Please enter an answer.");
        return;
    }

    const isCorrect = 
        (level === 1 && answerInput === adjectives[attempts][0]) ||
        (level === 2 && answerInput === comparisons[attempts].answer) ||
        (level === 3 && answerInput === versus[attempts].answer);

    if (isCorrect) {
        attempts++;
        if (attempts === 3) {
            attempts = 0;
            level++;
        }

        if (level > 3) {
            alert("Congratulations! You've passed all levels.");
            resetGame();
        } else {
            loadLevel();
        }
    } else {
        alert("Incorrect, try again!");
    }
}

// Reiniciar el juego
function resetGame() {
    level = 1;
    attempts = 0;
    document.getElementById("user-form").classList.remove("hidden");
    document.getElementById("game").classList.add("hidden");
}
