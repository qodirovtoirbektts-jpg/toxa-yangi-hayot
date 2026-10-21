// Yangi Hayot Interactive Script
function showToast(msg) {
  const toast = document.getElementById('yhToast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function orderApt() {
  showToast('Xonadon siz uchun 48 soatga bepul band qilindi! Savdo ofisi bog\'lanadi.');
}

document.addEventListener('DOMContentLoaded', () => {
  // Apt Tabs
  const aptBtns = document.querySelectorAll('.apt-btn');
  const aptTitle = document.getElementById('aptTitle');
  const aptDesc = document.getElementById('aptDesc');
  const aptArea = document.getElementById('aptArea');
  const aptPrice = document.getElementById('aptPrice');

  const aptData = {
    '1': { title: '1 Xonali Smart Kvartira', desc: 'Yosh oila yoki investitsiya uchun ajoyib qulaylikka ega yorug\' xonadon.', area: '48 m²', price: '$40,800' },
    '2': { title: '2 Xonali Shinam Kvartira', desc: 'Keng panoramik derazalar, alohida kiyinish xonasi (garderob) va shinam terassa balkoni.', area: '68 m²', price: '$57,800' },
    '3': { title: '3 Xonali Oilaviy Kvartira', desc: 'Katta oila uchun ikki qavatli xavfsiz bolalar maydoni va sokin hovli manzarasi.', area: '95 m²', price: '$80,750' },
    '4': { title: 'Eksklyuziv Penthouse', desc: '14-qavatdagi panoramik shahar manzarasi, shaxsiy ochiq terassa va vitrina oynalar.', area: '160 m²', price: '$144,000' }
  };

  aptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      aptBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const r = btn.getAttribute('data-rooms');
      if (aptData[r]) {
        aptTitle.textContent = aptData[r].title;
        aptDesc.textContent = aptData[r].desc;
        aptArea.textContent = aptData[r].area;
        aptPrice.textContent = aptData[r].price;
      }
    });
  });

  // Mortgage Calculator
  const rngPrice = document.getElementById('rngPrice');
  const rngDown = document.getElementById('rngDown');
  const selTerm = document.getElementById('selTerm');
  const lblPrice = document.getElementById('lblPrice');
  const lblDown = document.getElementById('lblDown');
  const resMonthly = document.getElementById('resMonthly');

  function updateMortgage() {
    const price = parseInt(rngPrice.value);
    const downPercent = parseInt(rngDown.value);
    const years = parseInt(selTerm.value);

    const downAmount = Math.round(price * (downPercent / 100));
    lblPrice.textContent = '$' + price.toLocaleString();
    lblDown.textContent = '$' + downAmount.toLocaleString() + ' (' + downPercent + '%)';

    const loan = price - downAmount;
    const months = years * 12;
    const monthlyRate = 0.17 / 12;
    const monthlyPayment = Math.round((loan * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1));

    resMonthly.textContent = '$' + monthlyPayment.toLocaleString() + ' / oy';
  }

  if (rngPrice && rngDown && selTerm) {
    rngPrice.addEventListener('input', updateMortgage);
    rngDown.addEventListener('input', updateMortgage);
    selTerm.addEventListener('change', updateMortgage);
    updateMortgage();
  }

  const btnApply = document.getElementById('btnApplyMortgage');
  if (btnApply) {
    btnApply.addEventListener('click', () => {
      showToast('Ipoteka maslahati uchun so\'rovingiz qabul qilindi!');
    });
  }
});