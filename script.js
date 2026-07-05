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
  { question: "Ti piace svegliarti presto per vedere l'alba sul mare?", relax: 2, avventura: 0 },
  { question: "Ti piace provare piatti locali e nuove cucine?", foodie: 2, relax: 0 },
  { question: "Preferisci una vacanza attiva con sport e escursioni?", avventura: 2, relax: -1 },
  { question: "Ti piace fare lunghe passeggiate sul bagnasciuga?", relax: 2, avventura: 1 },
  { question: "Ti diverti a partecipare a feste ed eventi serali?", festa: 2, relax: -1 },
  { question: "Ti piace visitare musei e luoghi storici?", cultura: 2, festa: 0 },
  { question: "Preferisci un hotel con tutti i comfort e servizi?", relax: 2, avventura: -1 },
  { question: "Ti piace socializzare e conoscere nuove persone?", festa: 2, relax: 0 },
  { question: "Ti piace esplorare posti nascosti e fuori dai circuiti turistici?", avventura: 2, cultura: 1 },
  { question: "La tua vacanza ideale include tempo per non fare nulla?", relax: 3, avventura: -2 }
];

const quizResults = {
  relax: {
    icon: "🏝️",
    title: "Sei un Rilassatore!",
    text: "La tua vacanza ideale è fatta di sole, mare e relax assoluto. A Bellaria: giornate in spiaggia con lettino e ombrellone, passeggiate sul lungomare al tramonto, aperitivo nei chioschi sulla spiaggia. Attività didattiche vicine: visite guidate alle saline di Cervia, centro visitatori delle oasi naturalistiche della Romagna, laboratori di yoga sulla spiaggia organizzati dagli hotel."
  },
  avventura: {
    icon: "🏄",
    title: "Sei un Avventuriero!",
    text: "Non stai mai fermo! A Bellaria: beach volley, windsurf, kitesurf, noleggio biciclette sul lungomare, escursioni in barca lungo la costa. Città vicine: parco avventura di San Marino, sport acquatici a Riccione, ciclismo sulle colline del Montefeltro, escursioni a cavallo nell'entroterra romagnolo, trekking nel Parco del Sasso Simone."
  },
  foodie: {
    icon: "🍝",
    title: "Sei un Buongustaio!",
    text: "Per te la vacanza è un viaggio nei sapori! A Bellaria: ristoranti di pesce fresco sul porto canale, piadinerie artigianali, cantine con degustazione di Sangiovese. Attività didattiche: corsi di pasta fresca a Rimini, laboratori di piadina romagnola a Cesena, visite alle aziende vinicole dei Colli di Rimini, tour gastronomici a Santarcangelo, museo del Tartufo a Sant'Agata Feltria."
  },
  festa: {
    icon: "🎉",
    title: "Sei un Festaiolo!",
    text: "La sera è il tuo momento! A Bellaria: Notte Rosa con eventi e concerti, locali sul lungomare, Notte Blu con mercatini e musica dal vivo, le Frecce Tricolori a giugno. Città vicine: discoteche e locali di Rimini e Riccione, festival estivi di Santarcangelo, Paganini e del Blues, eventi all'aperto a Cervia, Villaggio della Spensieratezza."
  },
  cultura: {
    icon: "🏛️",
    title: "Sei un Esploratore Culturale!",
    text: "Ami scoprire storia e tradizioni! A Bellaria: Museo della Conchiglia, Casa Rossa di Alfredo Panzini, centro storico con chiese storiche, parco Gelso. Attività didattiche: Arco di Augusto e Ponte di Tiberio a Rimini, musei di San Marino, visita alle Rocche Malatestiane di Rimini e Cesena, Biblioteca Malatestiana UNESCO di Cesena, Montebello con il Castello e il fantasma, Verucchio e il Museo Villanoviano."
  }
};

let currentQuestion = 0;
let scores = { relax: 0, avventura: 0, foodie: 0, festa: 0, cultura: 0 };

function updateQuiz() {
  const questionEl = document.getElementById('quizQuestion');
  const progressEl = document.getElementById('quizProgress');
  const progressText = document.getElementById('quizProgressText');
  
  if (currentQuestion < quizQuestions.length) {
    questionEl.textContent = quizQuestions[currentQuestion].question;
    progressEl.style.width = ((currentQuestion + 1) / quizQuestions.length * 100) + '%';
    progressText.textContent = `${currentQuestion + 1}/${quizQuestions.length}`;
  } else {
    showResult();
  }
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
  
  const totalPossible = quizQuestions.reduce((sum, q) => {
    return sum + Math.max(q.relax || 0, q.avventura || 0, q.foodie || 0, q.festa || 0, q.cultura || 0);
  }, 0);
  
  const percentage = Math.round((maxScore / totalPossible) * 100);
  
  document.getElementById('resultIcon').textContent = quizResults[topCategory].icon;
  document.getElementById('resultTitle').textContent = quizResults[topCategory].title;
  document.getElementById('resultText').textContent = quizResults[topCategory].text;
  document.getElementById('resultPercent').textContent = `${percentage}% di affinità con questo tipo di vacanza`;
  
  container.style.display = 'none';
  result.style.display = 'block';
}

function answerQuiz(answer) {
  const q = quizQuestions[currentQuestion];
  const multiplier = answer === 'yes' ? 1 : 0;
  
  if (q.relax) scores.relax += q.relax * multiplier;
  if (q.avventura) scores.avventura += q.avventura * multiplier;
  if (q.foodie) scores.foodie += q.foodie * multiplier;
  if (q.festa) scores.festa += q.festa * multiplier;
  if (q.cultura) scores.cultura += q.cultura * multiplier;
  
  currentQuestion++;
  updateQuiz();
}

function restartQuiz() {
  currentQuestion = 0;
  scores = { relax: 0, avventura: 0, foodie: 0, festa: 0, cultura: 0 };
  
  document.getElementById('quizContainer').style.display = 'block';
  document.getElementById('quizResult').style.display = 'none';
  updateQuiz();
}

document.getElementById('btnYes').addEventListener('click', () => answerQuiz('yes'));
document.getElementById('btnNo').addEventListener('click', () => answerQuiz('no'));
document.getElementById('btnRestart').addEventListener('click', restartQuiz);

updateQuiz();