/**
 * Script injected synchronously into the HTML <head> to initialize the theme.
 * Resolves the theme from localStorage first, or defaults to local timezone hour
 * (light mode during daytime: 6:00 AM - 6:00 PM, dark mode otherwise).
 * This runs before the page is parsed or rendered to prevent FOUC (Flash of Unstyled Content).
 */
export const themeInitScript = `
  (function() {
    try {
      const savedTheme = localStorage.getItem('theme');
      let theme = savedTheme;
      if (!theme) {
        const hour = new Date().getHours();
        theme = (hour >= 6 && hour < 18) ? 'light' : 'dark';
      }
      if (theme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })()
`;
