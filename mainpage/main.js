function scrollToSection(){
    const section = document.getElementById('games'); 
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}