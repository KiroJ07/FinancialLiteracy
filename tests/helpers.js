const fs = require('fs');
const path = require('path');

/**
 * Load an HTML file and parse it into a DOM document.
 * @param {string} filename - The HTML file name relative to the project root.
 * @returns {Document} The parsed DOM document.
 */
function loadPage(filename) {
  const filePath = path.resolve(__dirname, '..', filename);
  const html = fs.readFileSync(filePath, 'utf-8');
  document.documentElement.innerHTML = '';
  document.write(html);
  document.close();
  return document;
}

/**
 * Get all navigation links from a page.
 * @param {Document} doc - The DOM document.
 * @returns {Array<{href: string, text: string}>}
 */
function getNavLinks(doc) {
  const nav = doc.querySelector('nav');
  if (!nav) return [];
  return Array.from(nav.querySelectorAll('a')).map(a => ({
    href: a.getAttribute('href'),
    text: a.textContent.trim()
  }));
}

/**
 * Get all images from a page.
 * @param {Document} doc - The DOM document.
 * @returns {Array<{src: string, alt: string}>}
 */
function getImages(doc) {
  return Array.from(doc.querySelectorAll('img')).map(img => ({
    src: img.getAttribute('src'),
    alt: img.getAttribute('alt')
  }));
}

/**
 * Get all external links from a page (excluding nav links).
 * @param {Document} doc - The DOM document.
 * @returns {Array<{href: string, text: string}>}
 */
function getExternalLinks(doc) {
  const container = doc.querySelector('.container');
  if (!container) return [];
  return Array.from(container.querySelectorAll('a[href^="http"]')).map(a => ({
    href: a.getAttribute('href'),
    text: a.textContent.trim()
  }));
}

module.exports = {
  loadPage,
  getNavLinks,
  getImages,
  getExternalLinks
};
