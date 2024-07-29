// Select the checkbox
const goCrazySwitch = document.querySelector('.go_crazy_switch_chk');

// Function to generate a random color
function getRandomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

// Function to generate a random position
function getRandomPosition() {
    return `${Math.random() * 100}%`;
}

// Function to create blur overlay
function createBlurOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'blur-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.backdropFilter = 'blur(10px)';
    overlay.style.zIndex = '9999';
    document.body.appendChild(overlay);
    return overlay;
}

// Function to create and animate countdown and message
function createCountdownAndMessage() {
    return new Promise((resolve) => {
        const countdownElement = document.createElement('div');
        countdownElement.id = 'countdown';
        countdownElement.style.position = 'fixed';
        countdownElement.style.top = '50%';
        countdownElement.style.left = '50%';
        countdownElement.style.transform = 'translate(-50%, -50%)';
        countdownElement.style.fontSize = '100px';
        countdownElement.style.color = 'white';
        countdownElement.style.zIndex = '10001';
        document.body.appendChild(countdownElement);

        let count = 3;
        const countInterval = setInterval(() => {
            if (count > 0) {
                countdownElement.textContent = count;
                count--;
            } else {
                clearInterval(countInterval);
                countdownElement.style.fontSize = '50px';
                const message = "Be careful of what you ask for!";
                let charIndex = 0;
                const typeInterval = setInterval(() => {
                    if (charIndex < message.length) {
                        countdownElement.textContent += message[charIndex];
                        charIndex++;
                    } else {
                        clearInterval(typeInterval);
                        setTimeout(() => {
                            countdownElement.remove();
                            resolve();
                        }, 2000);
                    }
                }, 50);
            }
        }, 1000);
    });
}

// Function to create and animate a crazy element
function createCrazyElement() {
    const element = document.createElement('div');
    element.classList.add('crazy-element');
    element.style.position = 'fixed';
    element.style.width = `${Math.random() * 100 + 20}px`;
    element.style.height = `${Math.random() * 100 + 20}px`;
    element.style.backgroundColor = getRandomColor();
    element.style.borderRadius = '50%';
    element.style.left = getRandomPosition();
    element.style.top = getRandomPosition();
    element.style.zIndex = '9998';
    document.body.appendChild(element);

    function animate() {
        if (!goCrazySwitch.checked) {
            element.remove();
            return;
        }
        element.style.left = getRandomPosition();
        element.style.top = getRandomPosition();
        element.style.backgroundColor = getRandomColor();
        element.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() + 0.5})`;
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

// Function to create warning message
function createWarningMessage() {
    const warning = document.createElement('div');
    warning.id = 'crazy-warning';
    warning.style.position = 'fixed';
    warning.style.top = '20px';
    warning.style.left = '50%';
    warning.style.transform = 'translateX(-50%)';
    warning.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    warning.style.color = 'white';
    warning.style.padding = '10px';
    warning.style.borderRadius = '5px';
    warning.style.zIndex = '10000';
    warning.innerHTML = 'Be careful of what you ask for <span id="close-warning" style="cursor:pointer;margin-left:10px;">&times;</span>';
    document.body.appendChild(warning);

    document.getElementById('close-warning').addEventListener('click', stopCraziness);
}

// Function to create and animate flying broom
function createFlyingBroom() {
    const broom = document.createElement('img');
    broom.src = 'https://example.com/harry-potter-broom.png'; // Replace with actual broom image URL
    broom.style.position = 'fixed';
    broom.style.width = '100px';
    broom.style.top = `${Math.random() * 80}%`;
    broom.style.left = '100%';
    broom.style.zIndex = '9999';
    broom.style.transform = 'scaleX(-1)'; // Flip horizontally
    document.body.appendChild(broom);

    function animateBroom() {
        if (!goCrazySwitch.checked) {
            broom.remove();
            return;
        }
        let left = parseFloat(broom.style.left);
        left -= 2; // Adjust speed as needed
        if (left < -100) {
            left = 100;
            broom.style.top = `${Math.random() * 80}%`;
        }
        broom.style.left = `${left}%`;
        requestAnimationFrame(animateBroom);
    }

    requestAnimationFrame(animateBroom);
}

// Function to start the craziness
async function startCraziness() {
    const blurOverlay = createBlurOverlay();
    await createCountdownAndMessage();
    blurOverlay.remove();
    createWarningMessage();
    // Create 20 crazy elements
    for (let i = 0; i < 20; i++) {
        createCrazyElement();
    }
    // Make text crazy
    document.body.style.animation = 'crazyText 0.5s infinite';
    // Create flying broom
    createFlyingBroom();
}

// Function to stop the craziness
function stopCraziness() {
    // Remove all crazy elements
    document.querySelectorAll('.crazy-element').forEach(el => el.remove());
    // Reset text animation
    document.body.style.animation = 'none';
    // Remove warning message
    const warning = document.getElementById('crazy-warning');
    if (warning) warning.remove();
    // Remove flying broom
    const broom = document.querySelector('img[src*="harry-potter-broom"]');
    if (broom) broom.remove();
    // Uncheck the switch
    goCrazySwitch.checked = false;
}

// Event listener for the switch
goCrazySwitch.addEventListener('change', function() {
    if (this.checked) {
        startCraziness();
    } else {
        stopCraziness();
    }
});

// Event listener for the Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        stopCraziness();
    }
});

// Add necessary styles
const style = document.createElement('style');
style.textContent = `
    @keyframes crazyText {
        0% { transform: skew(0deg, 0deg); }
        25% { transform: skew(5deg, 5deg); }
        50% { transform: skew(-5deg, -5deg); }
        75% { transform: skew(-5deg, 5px); }
        100% { transform: skew(5deg, -5deg); }
    }
`;
document.head.appendChild(style);