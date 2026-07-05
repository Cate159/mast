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
      { img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400", label: "Spiaggia tranquilla con lettini", category: "relax" },
      { img: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=400", label: "Spiaggia con sport e onde", category: "avventura" },
      { img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400", label: "Spiaggia con chiosco gastronomico", category: "foodie" },
      { img: "https://images.unsplash.com/photo-1533777851728-3ae5c6cf47d3?w=400", label: "Spiaggia con musica e feste", category: "festa" }
    ]
  },
  {
    question: "Cosa ti piace fare la sera?",
    options: [
      { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", label: "Rilassarmi guardando il tramonto", category: "relax" },
      { img: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400", label: "Esplorare la città illuminata", category: "cultura" },
      { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400", label: "Cena gourmet con vista mare", category: "foodie" },
      { img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400", label: "Ballare fino all'alba", category: "festa" }
    ]
  },
  {
    question: "Quale attività pomeridiana preferisci?",
    options: [
      { img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400", label: "Yoga o meditazione", category: "relax" },
      { img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400", label: "Trekking o escursioni", category: "avventura" },
      { img: "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400", label: "Visita a musei e monumenti", category: "cultura" },
      { img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400", label: "Tour gastronomico", category: "foodie" }
    ]
  },
  {
    question: "Come immagini il tuo hotel ideale?",
    options: [
      { img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400", label: "Spa e centro benessere", category: "relax" },
      { img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400", label: "Sport e attività organizzate", category: "avventura" },
      { img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400", label: "Ristorante stellato incluso", category: "foodie" },
      { img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400", label: "Vicino a locali e nightlife", category: "festa" }
    ]
  },
  {
    question: "Quale esperienza culturale ti affascina?",
    options: [
      { img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400", label: "Visita a luoghi storici", category: "cultura" },
      { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", label: "Passeggiate panoramiche", category: "relax" },
      { img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400", label: "Escursioni nella natura", category: "avventura" },
      { img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400", label: "Concerti ed eventi live", category: "festa" }
    ]
  },
  {
    question: "Quale souvenir porteresti a casa?",
    options: [
      { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", label: "Prodotti tipici locali", category: "foodie" },
      { img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400", label: "Foto di paesaggi mozzafiato", category: "avventura" },
      { img: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400", label: "Oggetti artigianali storici", category: "cultura" },
      { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400", label: "Ricordi di serate indimenticabili", category: "festa" }
    ]
  }
];

const quizResults = {
  relax: {
    icon: "🏝️",
    title: "Sei un Rilassatore!",
    text: "La tua vacanza ideale è fatta di sole, mare e relax assoluto. A Bellaria: giornate in spiaggia con lettino e ombrellone, passeggiate sul lungomare al tramonto, aperitivo nei chioschi sulla spiaggia. Attività didattiche vicine: visite guidate alle saline di Cervia, centro visitatori delle oasi naturalistiche della Romagna, laboratori di yoga sulla spiaggia organizzati dagli hotel.",
    suggestions: [
      { img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300", title: "Spiaggia Bellaria", desc: "Relax totale sul mare" },
      { img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300", title: "Yoga al mare", desc: "Laboratori sulla spiaggia" },
      { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300", title: "Tramonto sul lungomare", desc: "Passeggiate indimenticabili" },
      { img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300", title: "Hotel con Spa", desc: "Centro benessere incluso" }
    ]
  },
  avventura: {
    icon: "🏄",
    title: "Sei un Avventuriero!",
    text: "Non stai mai fermo! A Bellaria: beach volley, windsurf, kitesurf, noleggio biciclette sul lungomare, escursioni in barca lungo la costa. Città vicine: parco avventura di San Marino, sport acquatici a Riccione, ciclismo sulle colline del Montefeltro, escursioni a cavallo nell'entroterra romagnolo, trekking nel Parco del Sasso Simone.",
    suggestions: [
      { img: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=300", title: "Sport acquatici", desc: "Windsurf e kitesurf" },
      { img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300", title: "Trekking Montefeltro", desc: "Sentieri panoramici" },
      { img: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=300", title: "Parco avventura", desc: "San Marino" },
      { img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300", title: "Ciclismo", desc: "Colline romagnole" }
    ]
  },
  foodie: {
    icon: "🍝",
    title: "Sei un Buongustaio!",
    text: "Per te la vacanza è un viaggio nei sapori! A Bellaria: ristoranti di pesce fresco sul porto canale, piadinerie artigianali, cantine con degustazione di Sangiovese. Attività didattiche: corsi di pasta fresca a Rimini, laboratori di piadina romagnola a Cesena, visite alle aziende vinicole dei Colli di Rimini, tour gastronomici a Santarcangelo, museo del Tartufo a Sant'Agata Feltria.",
    suggestions: [
      { img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300", title: "Piadina romagnola", desc: "Laboratori a Cesena" },
      { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300", title: "Ristoranti sul porto", desc: "Pesce fresco a Bellaria" },
      { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300", title: "Degustazione vini", desc: "Colli di Rimini" },
      { img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300", title: "Tour gastronomico", desc: "Santarcangelo" }
    ]
  },
  festa: {
    icon: "🎉",
    title: "Sei un Festaiolo!",
    text: "La sera è il tuo momento! A Bellaria: Notte Rosa con eventi e concerti, locali sul lungomare, Notte Blu con mercatini e musica dal vivo, le Frecce Tricolori a giugno. Città vicine: discoteche e locali di Rimini e Riccione, festival estivi di Santarcangelo, Paganini e del Blues, eventi all'aperto a Cervia, Villaggio della Spensieratezza.",
    suggestions: [
      { img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300", title: "Notte Rosa", desc: "L'evento dell'estate" },
      { img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=300", title: "Concerti live", desc: "Sul lungomare" },
      { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300", title: "Discoteche Rimini", desc: "Nightlife famoso" },
      { img: "https://images.unsplash.com/photo-1533777851728-3ae5c6cf47d3?w=300", title: "Frecce Tricolori", desc: "Spettacolo a giugno" }
    ]
  },
  cultura: {
    icon: "🏛️",
    title: "Sei un Esploratore Culturale!",
    text: "Ami scoprire storia e tradizioni! A Bellaria: Museo della Conchiglia, Casa Rossa di Alfredo Panzini, centro storico con chiese storiche, parco Gelso. Attività didattiche: Arco di Augusto e Ponte di Tiberio a Rimini, musei di San Marino, visita alle Rocche Malatestiane di Rimini e Cesena, Biblioteca Malatestiana UNESCO di Cesena, Montebello con il Castello e il fantasma, Verucchio e il Museo Villanoviano.",
    suggestions: [
      { img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=300", title: "Arco di Augusto", desc: "Rimini storica" },
      { img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300", title: "Biblioteca Malatestiana", desc: "UNESCO a Cesena" },
      { img: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=300", title: "Castello di Montebello", desc: "Con il fantasma Azzurrina" },
      { img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=300", title: "San Marino", desc: "Musei e storia" }
    ]
  }
};

let currentQuestion = 0;
let scores = { relax: 0, avventura: 0, foodie: 0, festa: 0, cultura: 0 };

function updateQuiz() {
  const questionEl = document.getElementById('quizQuestion');
  const imagesEl = document.getElementById('quizImages');
  const progressEl = document.getElementById('quizProgress');
  const progressText = document.getElementById('quizProgressText');
  
  if (currentQuestion < quizQuestions.length) {
    const q = quizQuestions[currentQuestion];
    questionEl.textContent = q.question;
    progressEl.style.width = ((currentQuestion + 1) / quizQuestions.length * 100) + '%';
    progressText.textContent = `${currentQuestion + 1}/${quizQuestions.length}`;
    
    imagesEl.innerHTML = '';
    q.options.forEach((opt, index) => {
      const card = document.createElement('div');
      card.className = 'quiz-image-card';
      card.innerHTML = `
        <img src="${opt.img}" alt="${opt.label}">
        <span class="quiz-image-label">${opt.label}</span>
      `;
      card.addEventListener('click', () => selectOption(opt.category));
      imagesEl.appendChild(card);
    });
  } else {
    showResult();
  }
}

function selectOption(category) {
  scores[category]++;
  currentQuestion++;
  
  const imagesEl = document.getElementById('quizImages');
  imagesEl.style.opacity = '0';
  imagesEl.style.transform = 'translateX(-20px)';
  
  setTimeout(() => {
    imagesEl.style.transition = 'none';
    imagesEl.style.transform = 'translateX(20px)';
    updateQuiz();
    setTimeout(() => {
      imagesEl.style.transition = 'opacity 0.3s, transform 0.3s';
      imagesEl.style.opacity = '1';
      imagesEl.style.transform = 'translateX(0)';
    }, 50);
  }, 300);
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
  
  const percentage = Math.round((maxScore / quizQuestions.length) * 100);
  const data = quizResults[topCategory];
  
  document.getElementById('resultIcon').textContent = data.icon;
  document.getElementById('resultTitle').textContent = data.title;
  document.getElementById('resultText').textContent = data.text;
  document.getElementById('resultPercent').textContent = `${percentage}% di affinità con questo tipo di vacanza`;
  
  const carouselEl = document.getElementById('quizCarousel');
  carouselEl.innerHTML = data.suggestions.map(s => `
    <div class="quiz-carousel-card">
      <img src="${s.img}" alt="${s.title}">
      <h4>${s.title}</h4>
      <p>${s.desc}</p>
    </div>
  `).join('');
  
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