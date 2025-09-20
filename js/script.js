const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');
const sidebar = document.querySelector('aside');

tabLinks.forEach(link => {
  link.addEventListener('click', () => {
    const tab = link.getAttribute('data-tab');

    tabContents.forEach(c => {
      c.classList.add('hidden');
      c.classList.remove('fancy-fade-in');
    });

    const activeTab = document.getElementById(tab);
    activeTab.classList.remove('hidden');
    void activeTab.offsetWidth;
    activeTab.classList.add('fancy-fade-in');

    void sidebar.offsetWidth;
    sidebar.classList.add('fancy-fade-in');

    tabLinks.forEach(l => l.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg', 'scale-105'));
    link.classList.add('bg-indigo-600', 'text-white', 'shadow-lg', 'scale-105');
  });
});

document.querySelector('.tab-link').click();
lucide.createIcons();

// Sidebar tlačítko aktivace karty
const sidebarPortfolio = document.getElementById('sidebar-portfolio');
sidebarPortfolio.addEventListener('click', () => {
  const tabEvent = new Event('click');
  document.querySelector('.tab-link[data-tab="portfolio"]').dispatchEvent(tabEvent);
});

