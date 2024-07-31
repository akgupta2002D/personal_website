const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.scroll_animate').forEach(item => {
    observer.observe(item);
});

// Get the toggle switch element
const toggleSwitch = document.querySelector('.toggle-switch input[type="checkbox"]');
const heropage = document.querySelector('.s1_hero_section');
const go_crazy_switch = document.querySelector('.go_crazy_switch');




// Function to switch theme
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.classList.add('dark_mode');
        heropage.classList.remove("s1_hero_section")
        heropage.classList.add("s1_hero_section_white")
        go_crazy_switch.classList.remove("hidden")

        // You can add more classes or change other attributes here
    } else {
        document.documentElement.classList.remove('dark_mode');
        heropage.classList.remove("s1_hero_section_white")
        heropage.classList.add("s1_hero_section")
        go_crazy_switch.classList.add("hidden")
        // You can remove classes or revert other attributes here
    }    
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener('change', switchTheme, false);

