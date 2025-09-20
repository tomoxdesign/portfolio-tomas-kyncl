const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks.forEach(link => {
  link.addEventListener('click', () => {
    const tab = link.getAttribute('data-tab');
    tabContents.forEach(c => c.classList.add('hidden'));
    document.getElementById(tab).classList.remove('hidden');

    tabLinks.forEach(l => l.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg', 'scale-105'));
    link.classList.add('bg-indigo-600', 'text-white', 'shadow-lg', 'scale-105');
  });
});

// defaultně první záložka
document.querySelector('.tab-link').click();
lucide.createIcons();