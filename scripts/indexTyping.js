const roles = ["Software Engineer", "Data Analyst", "Data Enthusiast"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const dynamicText = document.getElementById("dynamic-text");
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        dynamicText.innerHTML = `<span style="color: #ff79c6;">${currentRole.substring(0, charIndex)}</span>|`;
        charIndex--;
    } else {
        dynamicText.innerHTML = `<span style="color: #ff79c6;">${currentRole.substring(0, charIndex)}</span>|`;
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => isDeleting = true, 1000); // Wait before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; // Switch to next role
    }

    setTimeout(typeEffect, isDeleting ? 100 : 150); // Typing speed
}

document.addEventListener("DOMContentLoaded", typeEffect);