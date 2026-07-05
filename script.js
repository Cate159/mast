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
      { img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80", label: "Spiaggia tranquilla con lettini", category: "relax" },
      { img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80", label: "Spiaggia con sport e onde", category: "avventura" },
      { img: "https://images.unsplash.com/photo-1551652975-14b0d7778ef4?auto=format&fit=crop&w=400&q=80", label: "Spiaggia con chiosco gastronomico", category: "foodie" },
      { img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=400&q=80", label: "Spiaggia con musica e feste", category: "festa" }
    ]
  },
  {
    question: "Cosa ti piace fare la sera?",
    options: [
      { img: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=400&q=80", label: "Rilassarmi guardando il tramonto", category: "relax" },
      { img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=400&q=80", label: "Esplorare la città illuminata", category: "cultura" },
      { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80", label: "Cena gourmet con vista mare", category: "foodie" },
      { img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80", label: "Ballare fino all'alba", category: "festa" }
    ]
  },
  {
    question: "Quale attività pomeridiana preferisci?",
    options: [
      { img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80", label: "Yoga o meditazione", category: "relax" },
      { img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80", label: "Trekking o escursioni", category: "avventura" },
      { img: "https://images.unsplash.com/photo-1461360370896-922624d12a74?auto=format&fit=crop&w=400&q=80", label: "Visita a musei e monumenti", category: "cultura" },
      { img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", label: "Tour gastronomico", category: "foodie" }
    ]
  },
  {
    question: "Come immagini il tuo hotel ideale?",
    options: [
      { img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80", label: "Spa e centro benessere", category: "relax" },
      { img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80", label: "Sport e attività organizzate", category: "avventura" },
      { img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=400&q=80", label: "Ristorante stellato incluso", category: "foodie" },
      { img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80", label: "Vicino a locali e nightlife", category: "festa" }
    ]
  },
  {
    question: "Quale esperienza culturale ti affascina?",
    options: [
      { img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80", label: "Visita a luoghi storici", category: "cultura" },
      { img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80", label: "Passeggiate panoramiche", category: "relax" },
      { img: "https://images.unsplash.com/photo-1501555088652-0e70eb5df28e?auto=format&fit=crop&w=400&q=80", label: "Escursioni nella natura", category: "avventura" },
      { img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80", label: "Concerti ed eventi live", category: "festa" }
    ]
  },
  {
    question: "Quale souvenir porteresti a casa?",
    options: [
      { img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80", label: "Prodotti tipici locali", category: "foodie" },
      { img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80", label: "Foto di paesaggi mozzafiato", category: "avventura" },
      { img: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=400&q=80", label: "Oggetti artigianali storici", category: "cultura" },
      { img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=400&q=80", label: "Ricordi di serate indimenticabili", category: "festa" }
    ]
  }
];

const quizResults = {
  relax: {
    icon: "🏝️",
    title: "Sei un Rilassatore!",
    text: "La tua vacanza ideale è fatta di sole, mare e relax assoluto. A Bellaria: giornate in spiaggia con lettino e ombrellone, passeggiate sul lungomare al tramonto, aperitivo nei chioschi sulla spiaggia. Attività didattiche vicine: visite guidate alle saline di Cervia, centro visitatori delle oasi naturalistiche della Romagna, laboratori di yoga sulla spiaggia organizzati dagli hotel.",
    suggestions: [
      { img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80", title: "Spiaggia Bellaria", desc: "Relax totale sul mare" },
      { img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=300&q=80", title: "Yoga al mare", desc: "Laboratori sulla spiaggia" },
      { img: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=300&q=80", title: "Tramonto sul lungomare", desc: "Passeggiate indimenticabili" },
      { img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80", title: "Hotel con Spa", desc: "Centro benessere incluso" }
    ]
  },
  avventura: {
    icon: "🏄",
    title: "Sei un Avventuriero!",
    text: "Non stai mai fermo! A Bellaria: beach volley, windsurf, kitesurf, noleggio biciclette sul lungomare, escursioni in barca lungo la costa. Città vicine: parco avventura di San Marino, sport acquatici a Riccione, ciclismo sulle colline del Montefeltro, escursioni a cavallo nell'entroterra romagnolo, trekking nel Parco del Sasso Simone.",
    suggestions: [
      { img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=80", title: "Sport acquatici", desc: "Windsurf e kitesurf" },
      { img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=300&q=80", title: "Trekking Montefeltro", desc: "Sentieri panoramici" },
      { img: "https://images.unsplash.com/photo-1501555088652-0e70eb5df28e?auto=format&fit=crop&w=300&q=80", title: "Parco avventura", desc: "San Marino" },
      { img: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=300&q=80", title: "Ciclismo", desc: "Colline romagnole" }
    ]
  },
  foodie: {
    icon: "🍝",
    title: "Sei un Buongustaio!",
    text: "Per te la vacanza è un viaggio nei sapori! A Bellaria: ristoranti di pesce fresco sul porto canale, piadinerie artigianali, cantine con degustazione di Sangiovese. Attività didattiche: corsi di pasta fresca a Rimini, laboratori di piadina romagnola a Cesena, visite alle aziende vinicole dei Colli di Rimini, tour gastronomici a Santarcangelo, museo del Tartufo a Sant'Agata Feltria.",
    suggestions: [
      { img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80", title: "Piadina romagnola", desc: "Laboratori a Cesena" },
      { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=300&q=80", title: "Ristoranti sul porto", desc: "Pesce fresco a Bellaria" },
      { img: "https://images.unsplash.com/photo-1504376798147-1da06da64318?auto=format&fit=crop&w=300&q=80", title: "Degustazione vini", desc: "Colli di Rimini" },
      { img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80", title: "Tour gastronomico", desc: "Santarcangelo" }
    ]
  },
  festa: {
    icon: "🎉",
    title: "Sei un Festaiolo!",
    text: "La sera è il tuo momento! A Bellaria: Notte Rosa con eventi e concerti, locali sul lungomare, Notte Blu con mercatini e musica dal vivo, le Frecce Tricolori a giugno. Città vicine: discoteche e locali di Rimini e Riccione, festival estivi di Santarcangelo, Paganini e del Blues, eventi all'aperto a Cervia, Villaggio della Spensieratezza.",
    suggestions: [
      { img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=300&q=80", title: "Notte Rosa", desc: "L'evento dell'estate" },
      { img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=300&q=80", title: "Concerti live", desc: "Sul lungomare" },
      { img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80", title: "Discoteche Rimini", desc: "Nightlife famoso" },
      { img: "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=300&q=80", title: "Frecce Tricolori", desc: "Spettacolo a giugno" }
    ]
  },
  cultura: {
    icon: "🏛️",
    title: "Sei un Esploratore Culturale!",
    text: "Ami scoprire storia e tradizioni! A Bellaria: Museo della Conchiglia, Casa Rossa di Alfredo Panzini, centro storico con chiese storiche, parco Gelso. Attività didattiche: Arco di Augusto e Ponte di Tiberio a Rimini, musei di San Marino, visita alle Rocche Malatestiane di Rimini e Cesena, Biblioteca Malatestiana UNESCO di Cesena, Montebello con il Castello e il fantasma, Verucchio e il Museo Villanoviano.",
    suggestions: [
      { img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=300&q=80", title: "Arco di Augusto", desc: "Rimini storica" },
      { img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=300&q=80", title: "Biblioteca Malatestiana", desc: "UNESCO a Cesena" },
      { img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80", title: "Castello di Montebello", desc: "Con il fantasma Azzurrina" },
      { img: "https://images.unsplash.com/photo-1523531294919-4bcd7c32e0b2?auto=format&fit=crop&w=300&q=80", title: "San Marino", desc: "Musei e storia" }
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
  
  const data = quizResults[topCategory];
  
  document.getElementById('resultIcon').textContent = data.icon;
  document.getElementById('resultTitle').textContent = data.title;
  document.getElementById('resultText').textContent = data.text;
  
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