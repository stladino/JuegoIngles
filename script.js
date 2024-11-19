let level = 1;
let attempts = 0;

// Explicación introductoria
const explanation = `
    Welcome to the Comparison Game! This game will help you practice comparative adjectives in English.
    In Level 1, you will compare animals and choose the correct form of the adjective.
    In Level 2, you'll complete sentences with the correct comparative.
    In Level 3, you'll identify the correct sentence using superlatives.
    Good luck!
`;

// Preguntas para cada nivel
const comparisonsLevel1 = [
    { subject1: "A lion", subject2: "a cat", question: "Is the lion _____?", options: ["bigger", "biggest"], answer: "bigger" },
    { subject1: "A cheetah", subject2: "a rabbit", question: "Is the cheetah ______?", options: ["faster", "fastest"], answer: "faster" },
    { subject1: "An elephant", subject2: "a mouse", question: "Is the elephant _____?", options: ["larger", "largest"], answer: "larger" }
];

const comparisonsLevel2 = [
    { sentence: "A giraffe is _____ than an ant.", options: ["taller", "wider", "smaller"], answer: "higher" },
    { sentence: "A cheetah is ___ than a turtle.", options: ["faster", "weaker", "stronger"], answer: "faster" },
    { sentence: "An elephant is ___ than a mouse.", options: ["bigger", "smaller", "older"], answer: "bigger" }
];

const comparisonsLevel3 = [
    { question: "Choose the correct sentence:", options: [
        "The giraffe is tallest animal.",
        "The giraffe is the tallest animal.",
        "The giraffe is taller animal."
    ], answer: "The giraffe is the tallest animal." },
    { question: "Choose the correct sentence:", options: [
        "An elephant is the heavier land animal.",
        "An elephant is the heaviest land animal.",
        "An elephant is heaviest land animal."
    ], answer: "An elephant is the heaviest land animal." },
    { question: "Choose the correct sentence:", options: [
        "The whale is the largest mammal.",
        "The whale is largest mammal.",
        "The whale is the larges mammal."
    ], answer: "The whale is the largest mammal." }
];

// Iniciar el juego
function startGame() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const id = document.getElementById("id").value;

    if (name && email && id) {
        alert(explanation); // Mostrar la explicación antes de iniciar el juego
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

    optionsDiv.classList.add("hidden");
    optionsDiv.innerHTML = "";

    if (level === 1) {
        const comparison = comparisonsLevel1[attempts];
        instructions.innerText = `${comparison.subject1} and ${comparison.subject2}: ${comparison.question}`;
        renderOptions(comparison.options);
    } else if (level === 2) {
        const comparison = comparisonsLevel2[attempts];
        instructions.innerText = comparison.sentence;
        renderOptions(comparison.options);
    } else if (level === 3) {
        const comparison = comparisonsLevel3[attempts];
        instructions.innerText = comparison.question;
        renderOptions(comparison.options);
    }
}

// Renderizar opciones como botones
function renderOptions(options) {
    const optionsDiv = document.getElementById("options");
    optionsDiv.classList.remove("hidden");

    options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => selectAnswer(option);
        optionsDiv.appendChild(btn);
    });
}

// Seleccionar respuesta
function selectAnswer(option) {
    document.getElementById("answerInput").value = option;
}

// Enviar respuesta
function submitAnswer() {
    const answerInput = document.getElementById("answerInput").value.trim();
    if (!answerInput) {
        alert("Please select or type an answer.");
        return;
    }

    const isCorrect =
        (level === 1 && answerInput === comparisonsLevel1[attempts].answer) ||
        (level === 2 && answerInput === comparisonsLevel2[attempts].answer) ||
        (level === 3 && answerInput === comparisonsLevel3[attempts].answer);

    if (isCorrect) {
        attempts++;
        if (attempts === 3) {
            attempts = 0;
            level++;
        }

        if (level > 3) {
            endGame();
        } else {
            loadLevel();
        }
    } else {
        alert("Incorrect, try again!");
    }
}

// Terminar el juego
function endGame() {
    document.getElementById("game").classList.add("hidden");
    const endMessage = document.getElementById("end-message");
    endMessage.classList.remove("hidden");

    const balloon = document.getElementById("balloon");
    balloon.innerHTML = `
        <div class="balloon">
            <p style="margin: 0; color: white; text-align: center;">🎉</p>
        </div>
    `;
}


