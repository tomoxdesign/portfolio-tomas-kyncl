const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks.forEach(link => {
  link.addEventListener('click', () => {
    const tab = link.getAttribute('data-tab');

    tabContents.forEach(c => {
      c.classList.add('hidden');
      c.classList.remove('fancy-fade-in'); // odstraníme starou animaci
    });

    const activeTab = document.getElementById(tab);
    activeTab.classList.remove('hidden');

    // přidáme fancy animaci
    void activeTab.offsetWidth; // force reflow, aby animace fungovala znovu
    activeTab.classList.add('fancy-fade-in');

    tabLinks.forEach(l => l.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg', 'scale-105'));
    link.classList.add('bg-indigo-600', 'text-white', 'shadow-lg', 'scale-105');
  });
});

// defaultně první záložka
document.querySelector('.tab-link').click();
lucide.createIcons();
