// Menu mobile toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Chiudi menu quando clicchi un link su mobile
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Scroll smooth sui link ancora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form contatti
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Invio in corso...';
    submitBtn.disabled = true;
    
    const formData = new FormData(contactForm);
    
    try {
      const response = await fetch('send-email.php', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        formMessage.textContent = 'Messaggio inviato con successo! Ti risponderemo al più presto.';
        formMessage.className = 'form-message success';
        contactForm.reset();
      } else {
        formMessage.textContent = result.error || 'Si è verificato un errore. Riprova più tardi.';
        formMessage.className = 'form-message error';
      }
    } catch (error) {
      formMessage.textContent = 'Errore di connessione. Riprova più tardi.';
      formMessage.className = 'form-message error';
    }
    
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}

// Quiz
const quizQuestions = [
  {
    question: "Quale spiaggia ti attira di più?",
    options: [
      { label: "Spiaggia tranquilla con lettini e relax", category: "relax" },
      { label: "Spiaggia con sport e onde per surfare", category: "avventura" },
      { label: "Spiaggia con chiosco gastronomico", category: "foodie" },
      { label: "Spiaggia con musica e feste", category: "festa" }
    ]
  },
  {
    question: "Cosa ti piace fare la sera?",
    options: [
      { label: "Rilassarmi guardando il tramonto", category: "relax" },
      { label: "Esplorare la città illuminata", category: "cultura" },
      { label: "Cena gourmet con vista mare", category: "foodie" },
      { label: "Ballare fino all'alba", category: "festa" }
    ]
  },
  {
    question: "Quale attività pomeridiana preferisci?",
    options: [
      { label: "Yoga o meditazione", category: "relax" },
      { label: "Trekking o escursioni", category: "avventura" },
      { label: "Visita a musei e monumenti", category: "cultura" },
      { label: "Tour gastronomico", category: "foodie" }
    ]
  },
  {
    question: "Come immagini il tuo hotel ideale?",
    options: [
      { label: "Spa e centro benessere", category: "relax" },
      { label: "Sport e attività organizzate", category: "avventura" },
      { label: "Ristorante stellato incluso", category: "foodie" },
      { label: "Vicino a locali e nightlife", category: "festa" }
    ]
  },
  {
    question: "Quale esperienza culturale ti affascina?",
    options: [
      { label: "Visita a luoghi storici", category: "cultura" },
      { label: "Passeggiate panoramiche", category: "relax" },
      { label: "Escursioni nella natura", category: "avventura" },
      { label: "Concerti ed eventi live", category: "festa" }
    ]
  },
  {
    question: "Quale souvenir porteresti a casa?",
    options: [
      { label: "Prodotti tipici locali", category: "foodie" },
      { label: "Foto di paesaggi mozzafiato", category: "avventura" },
      { label: "Oggetti artigianali storici", category: "cultura" },
      { label: "Ricordi di serate indimenticabili", category: "festa" }
    ]
  }
];

const quizResults = {
  relax: {
    icon: "🏝️",
    title: "Sei un Rilassatore!",
    text: "La tua vacanza ideale è fatta di sole, mare e relax assoluto. A Bellaria: giornate in spiaggia con lettino e ombrellone, passeggiate sul lungomare al tramonto, aperitivo nei chioschi sulla spiaggia. Attività didattiche vicine: visite guidate alle saline di Cervia, centro visitatori delle oasi naturalistiche della Romagna, laboratori di yoga sulla spiaggia organizzati dagli hotel.",
    suggestions: ["Spiaggia Bellaria - Relax totale sul mare", "Yoga al mare - Laboratori sulla spiaggia", "Tramonto sul lungomare - Passeggiate indimenticabili", "Hotel con Spa - Centro benessere incluso"]
  },
  avventura: {
    icon: "🏄",
    title: "Sei un Avventuriero!",
    text: "Non stai mai fermo! A Bellaria: beach volley, windsurf, kitesurf, noleggio biciclette sul lungomare, escursioni in barca lungo la costa. Città vicine: parco avventura di San Marino, sport acquatici a Riccione, ciclismo sulle colline del Montefeltro, escursioni a cavallo nell'entroterra romagnolo, trekking nel Parco del Sasso Simone.",
    suggestions: ["Sport acquatici - Windsurf e kitesurf", "Trekking Montefeltro - Sentieri panoramici", "Parco avventura San Marino", "Ciclismo - Colline romagnole"]
  },
  foodie: {
    icon: "🍝",
    title: "Sei un Buongustaio!",
    text: "Per te la vacanza è un viaggio nei sapori! A Bellaria: ristoranti di pesce fresco sul porto canale, piadinerie artigianali, cantine con degustazione di Sangiovese. Attività didattiche: corsi di pasta fresca a Rimini, laboratori di piadina romagnola a Cesena, visite alle aziende vinicole dei Colli di Rimini, tour gastronomici a Santarcangelo, museo del Tartufo a Sant'Agata Feltria.",
    suggestions: ["Piadina romagnola - Laboratori a Cesena", "Ristoranti sul porto - Pesce fresco a Bellaria", "Degustazione vini - Colli di Rimini", "Tour gastronomico - Santarcangelo"]
  },
  festa: {
    icon: "🎉",
    title: "Sei un Festaiolo!",
    text: "La sera è il tuo momento! A Bellaria: Notte Rosa con eventi e concerti, locali sul lungomare, Notte Blu con mercatini e musica dal vivo, le Frecce Tricolori a giugno. Città vicine: discoteche e locali di Rimini e Riccione, festival estivi di Santarcangelo, Paganini e del Blues, eventi all'aperto a Cervia, Villaggio della Spensieratezza.",
    suggestions: ["Notte Rosa - L'evento dell'estate", "Concerti live sul lungomare", "Discoteche Rimini - Nightlife famoso", "Frecce Tricolori - Spettacolo a giugno"]
  },
  cultura: {
    icon: "🏛️",
    title: "Sei un Esploratore Culturale!",
    text: "Ami scoprire storia e tradizioni! A Bellaria: Museo della Conchiglia, Casa Rossa di Alfredo Panzini, centro storico con chiese storiche, parco Gelso. Attività didattiche: Arco di Augusto e Ponte di Tiberio a Rimini, musei di San Marino, visita alle Rocche Malatestiane di Rimini e Cesena, Biblioteca Malatestiana UNESCO di Cesena, Montebello con il Castello e il fantasma, Verucchio e il Museo Villanoviano.",
    suggestions: ["Arco di Augusto - Rimini storica", "Biblioteca Malatestiana - UNESCO a Cesena", "Castello di Montebello - Con il fantasma Azzurrina", "San Marino - Musei e storia"]
  }
};

let currentQuestion = 0;
let scores = { relax: 0, avventura: 0, foodie: 0, festa: 0, cultura: 0 };

function updateQuiz() {
  const questionEl = document.getElementById('quizQuestion');
  const optionsEl = document.getElementById('quizOptions');
  const progressEl = document.getElementById('quizProgress');
  const progressText = document.getElementById('quizProgressText');
  
  if (currentQuestion < quizQuestions.length) {
    const q = quizQuestions[currentQuestion];
    questionEl.textContent = q.question;
    progressEl.style.width = ((currentQuestion + 1) / quizQuestions.length * 100) + '%';
    progressText.textContent = `${currentQuestion + 1}/${quizQuestions.length}`;
    
    optionsEl.innerHTML = '';
    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => selectOption(opt.category));
      optionsEl.appendChild(btn);
    });
  } else {
    showResult();
  }
}

function selectOption(category) {
  scores[category]++;
  currentQuestion++;
  
  const optionsEl = document.getElementById('quizOptions');
  optionsEl.style.opacity = '0';
  optionsEl.style.transform = 'translateY(10px)';
  
  setTimeout(() => {
    optionsEl.style.transition = 'none';
    updateQuiz();
    setTimeout(() => {
      optionsEl.style.transition = 'opacity 0.3s, transform 0.3s';
      optionsEl.style.opacity = '1';
      optionsEl.style.transform = 'translateY(0)';
    }, 50);
  }, 200);
}

function showResult() {
  const container = document.getElementById('quizContainer');
  const result = document.getElementById('quizResult');
  
  let maxScore = 0;
  let topCategory = 'relax';
  
  for (const [category, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      topCategory = category;
    }
  }
  
  const data = quizResults[topCategory];
  
  document.getElementById('resultIcon').textContent = data.icon;
  document.getElementById('resultTitle').textContent = data.title;
  document.getElementById('resultText').textContent = data.text;
  
  const suggestionsEl = document.getElementById('quizSuggestions');
  suggestionsEl.innerHTML = '<h4>Attività consigliate:</h4><ul>' + 
    data.suggestions.map(s => `<li>${s}</li>`).join('') + 
    '</ul>';
  
  container.style.display = 'none';
  result.style.display = 'block';
}

function restartQuiz() {
  currentQuestion = 0;
  scores = { relax: 0, avventura: 0, foodie: 0, festa: 0, cultura: 0 };
  
  document.getElementById('quizContainer').style.display = 'block';
  document.getElementById('quizResult').style.display = 'none';
  updateQuiz();
}

document.getElementById('btnRestart').addEventListener('click', restartQuiz);

updateQuiz();