function animateWave() {
    const letters = document.querySelectorAll(".wave-text span");

    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.transform = "translateY(-15px)";
            setTimeout(() => {
                letter.style.transform = "translateY(0px)";
            }, 300);
        }, index * 100);
    });

    setTimeout(animateWave, 1500); // Repeat animation
}

animateWave();