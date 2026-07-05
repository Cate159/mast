const pulsante = document.getElementById('pulsanteInfo');
const boxInfo = document.getElementById('boxInfo');

pulsante.addEventListener('click', function() {
   
    boxInfo.classList.toggle('attivo');
    
    
    if (boxInfo.classList.contains('attivo')) {
        pulsante.textContent = 'Nascondi informazioni';
    } else {
        pulsante.textContent = 'Clicca qui per maggiori informazioni';
    }
});