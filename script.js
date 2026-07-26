const CATEGORIES = [
  { id: 'brincadeiras', title: 'Brincadeiras do Casal' },
  { id: 'luademel', title: 'Lua de Mel' },
  { id: 'novolar', title: 'Novo Lar' },
];

const ITEMS = [
  ['🍝','cota Rolo de macarrão para a noiva utilizar quando necessário','R$ 30','brincadeiras'],
  ['⛑️','Cota Capacete contra rolo de macarrão','R$ 30','brincadeiras'],
  ['🧰','Cota Marido Faz-Tudo – "Para equipar o noivo nas pequenas manutenções da casa."','R$ 40','brincadeiras'],
  ['💄','Cota Batom da Noiva','R$ 30','brincadeiras'],
  ['☕','Cota Café da Manhã dos Recém-Casados','R$ 50','brincadeiras'],
  ['🍕','Cota Noite da Pizza','R$ 80','brincadeiras'],
  ['🍷','Cota Vinho para Comemorar','R$ 100','brincadeiras'],
  ['🐷','Cota Uma ajudinha para realizar os sonhos do casal','R$ 100','brincadeiras'],

  ['🍦','Cota Sorvete na Praia','R$ 20','luademel'],
  ['🥂','Cota Drink da Lua de Mel','R$ 50','luademel'],
  ['🍽️','Cota Jantar Romântico','R$ 150','luademel'],
  ['⛽','Cota Combustível da Viagem','R$ 100','luademel'],
  ['📸','Cota Fotos da Lua de Mel','R$ 100','luademel'],
  ['❤️','Cota Passeio Romântico','R$ 200','luademel'],
  ['✈️','Cota Lua de Mel','Valor livre','luademel'],

  ['🧹','Cota Faxina do Noivo','R$ 30','novolar'],
  ['🍽️','Cota Lavar a Louça','R$ 40','novolar'],
  ['💐','Cota Flores para a Noiva','R$ 60','novolar'],
  ['🛒','Cota Mercado do Mês','R$ 100','novolar'],
  ['🏠','Cota Construindo Nosso Lar','Valor livre','novolar'],
  ['💞','Cota Amor sem Limites','Valor livre','novolar'],
  ['🎁','Presente do Coração','Valor livre','novolar'],
].map(([icon,name,value,cat])=>({icon,name,value,category:cat}));

function render(){
  const app = document.getElementById('app');
  let html = '';
  CATEGORIES.forEach(cat=>{
    const items = ITEMS.filter(i=>i.category===cat.id);
    html += `
      <div class="category">
        <div class="category-head"><span class="category-title">${cat.title}</span></div>
        <div class="list">
          ${items.map(i=>`
            <div class="item">
              <span class="item-left"><span class="item-icon">${i.icon}</span>${i.name}</span>
              <span class="item-value">${i.value}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });
  app.innerHTML = html;
}
render();

const WHATSAPP_NUMBER = '5528999453745';

function getGuestData(){
  const name = document.getElementById('guestNameInput').value.trim();
  const cota = document.getElementById('guestCotaSelect').value;
  if(!name){ alert('Por favor, digite seu nome.'); return null; }
  if(!cota){ alert('Selecione a cota que você escolheu.'); return null; }
  return { name, cota };
}

function setupConfirmForm(){
  const select = document.getElementById('guestCotaSelect');
  CATEGORIES.forEach(cat=>{
    const group = document.createElement('optgroup');
    group.label = cat.title;
    ITEMS.filter(i=>i.category===cat.id).forEach(i=>{
      const opt = document.createElement('option');
      opt.value = `${i.icon} ${i.name} (${i.value})`;
      opt.textContent = `${i.icon} ${i.name} — ${i.value}`;
      group.appendChild(opt);
    });
    select.appendChild(group);
  });

  document.getElementById('sendConfirmBtn').addEventListener('click', ()=>{
    const data = getGuestData();
    if(!data) return;
    const message = `Olá! Me chamo ${data.name} e acabei de fazer o Pix da: ${data.cota} 🎁`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });
}

setupConfirmForm();
