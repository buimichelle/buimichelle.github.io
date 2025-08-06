        // JavaScript for making the draggable menu functional
        const dragMenu = document.getElementById('dragMenu');

        let isDragging = false;
        let offsetX, offsetY;

        dragMenu.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - dragMenu.getBoundingClientRect().left;
            offsetY = e.clientY - dragMenu.getBoundingClientRect().top;
            dragMenu.style.transition = 'none'; // Disable transition during drag
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                dragMenu.style.left = `${e.clientX - offsetX}px`;
                dragMenu.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            dragMenu.style.transition = 'left 0.1s ease, top 0.1s ease'; // Re-enable transition after drag
        });