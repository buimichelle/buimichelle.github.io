// Reference to containers where projects will be displayed
const projectContainer = document.getElementById('projects-container');
const websiteContainer = document.getElementById('websites-container');
const dataContainer = document.getElementById('data-container');

function createProjectHTML(project) {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col');

    const title = document.createElement('h2');
    title.innerHTML = `${project.title}<br>`;

    const linkHTML = project.link === "0" 
        ? "Please Reach Out For Link." 
        : `<a href="${project.link}" target="_blank">${project.link}</a>`;

    const description = document.createElement('p');
    description.innerHTML = `
        <p>${project.note}</p>
        <strong>Skills Used:</strong><br>${project.skillsUsed}<br>
        <strong>Link*:</strong><br>${linkHTML}
    `;

    colDiv.appendChild(title);
    colDiv.appendChild(description);
    return colDiv;
}


// Function to fetch and display projects from JSON
fetch('json/projects.json')
    .then(response => response.json())
    .then(data => {
        let rowDiv;

        // Display Websites
        data.websites.forEach((website, index) => {
            if (index % 2 === 0) {
                rowDiv = document.createElement('div');
                rowDiv.classList.add('row');
                websiteContainer.appendChild(rowDiv);
            }
            rowDiv.appendChild(createProjectHTML(website));
        });

        // Display Projects
        data.projects.forEach((project, index) => {
            if (index % 2 === 0) {
                rowDiv = document.createElement('div');
                rowDiv.classList.add('row');
                projectContainer.appendChild(rowDiv);
            }
            rowDiv.appendChild(createProjectHTML(project));
        });

        // Display Projects
        data.dataAnalytics.forEach((thisData, index) => {
            if (index % 2 === 0) {
                rowDiv = document.createElement('div');
                rowDiv.classList.add('row');
                dataContainer.appendChild(rowDiv);
            }
            rowDiv.appendChild(createProjectHTML(thisData));
        });
    })
    .catch(error => console.error('Error loading JSON:', error));


