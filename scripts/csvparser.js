
  // Load and parse CSV from file in same directory
  Papa.parse('michelle_projects.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      displayData(results.data);
    },
    error: function(err) {
      console.error('Error loading CSV:', err);
      const container = document.getElementById('output');
      container.innerHTML = `<p class="text-red-600">Failed to load project data.</p>`;
    }
  });

  function displayData(data) {
    const container = document.getElementById('output');
    if (!data.length) {
      container.innerHTML = '<p class="text-red-600">No data found in CSV.</p>';
      return;
    }

    const table = document.createElement('table');
    table.className = 'min-w-full border-collapse border border-gray-300 font-serif';

    // Create header row
    const headerRow = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
      const th = document.createElement('th');
      th.textContent = key;
      th.className = 'border border-gray-300 px-4 py-2 bg-pink-200 text-left sticky top-0';
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create data rows
    data.forEach(row => {
      const tr = document.createElement('tr');
      Object.entries(row).forEach(([key, val]) => {
        const td = document.createElement('td');
        // If the column is Link and value is a URL, make it clickable
        if (key.toLowerCase() === 'link' && val && val !== '0') {
          const a = document.createElement('a');
          a.href = val;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = val;
          a.className = 'text-pink-600 hover:underline';
          td.appendChild(a);
        } else {
          td.textContent = val;
        }
        td.className = 'border border-gray-300 px-4 py-2';
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });

    container.appendChild(table);
  }