let allCards = [];

async function fetchAndRenderCSV() {
  const response = await fetch('michelle_projects.csv');
  const csvText = await response.text();

  const rows = csvText.split('\n').map(row => row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
  const headers = rows.shift();

  allCards = rows
    .filter(columns => columns.length >= 5)
    .map(columns => {
      const [category, title, whatIDid, skills, link, notes] = columns.map(c => c.replace(/^"|"$/g, ''));
      return { category, title, whatIDid, skills, link, notes };
    });

  renderCards('All');
}

function renderCards(selectedCategory) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  const filtered = selectedCategory === 'All'
    ? allCards
    : allCards.filter(card => card.category.toLowerCase() === selectedCategory.toLowerCase());

  filtered.forEach(({ category, title, whatIDid, skills, link, notes }) => {
    const card = document.createElement('div');
    card.className = 'font-serif bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition';

    card.innerHTML = `
      <h3 class="text-xl font-bold mb-2">${title}</h3>
      <p class="text-sm text-gray-600 mb-2"><strong>Category:</strong> ${category}</p>
      <p class="mb-3">${whatIDid}</p>
      <p class="text-sm mb-3"><strong>Skills:</strong> ${skills}</p>
      ${link && link !== '0' ? `<a href="${link}" target="_blank" class="text-pink-500 underline">View Project</a>` : ''}
      ${notes ? `<p class="text-xs mt-2 text-gray-500">${notes}</p>` : ''}
    `;

    outputDiv.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderCSV();

  document.getElementById('filters').addEventListener('click', (e) => {
    if (e.target.matches('.filter-btn')) {
      const selected = e.target.getAttribute('data-category');
      renderCards(selected);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderCSV();

  const filterContainer = document.getElementById('filters');

  filterContainer.addEventListener('click', (e) => {
    if (e.target.matches('.filter-btn')) {
      const selected = e.target.getAttribute('data-category');
      renderCards(selected);

      // Remove active style from all buttons
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active-filter', 'bg-pink-500', 'text-white');
        btn.classList.add('bg-pink-200', 'text-black');
      });

      // Add active style to clicked button
      e.target.classList.add('active-filter', 'bg-pink-500', 'text-white');
      e.target.classList.remove('bg-pink-200', 'text-black');
    }
  });
});
