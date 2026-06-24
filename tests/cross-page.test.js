const { loadPage, getNavLinks, getImages } = require('./helpers');

const pages = ['index.html', 'about.html', 'resources.html', 'contact.html'];

describe('Cross-Page Consistency', () => {
  describe('Navigation', () => {
    test.each(pages)('%s has exactly 4 nav links', (page) => {
      const doc = loadPage(page);
      const links = getNavLinks(doc);
      expect(links).toHaveLength(4);
    });

    test.each(pages)('%s has consistent navigation structure', (page) => {
      const doc = loadPage(page);
      const links = getNavLinks(doc);
      const expectedLinks = [
        { href: 'index.html', text: 'Home' },
        { href: 'about.html', text: 'About' },
        { href: 'resources.html', text: 'Resources' },
        { href: 'contact.html', text: 'Contact' }
      ];
      expect(links).toEqual(expectedLinks);
    });

    test.each(pages)('%s nav links do not have target="_blank"', (page) => {
      const doc = loadPage(page);
      const nav = doc.querySelector('nav');
      const links = nav.querySelectorAll('a');
      links.forEach(link => {
        expect(link.getAttribute('target')).toBeNull();
      });
    });
  });

  describe('Common Structure', () => {
    test.each(pages)('%s has a header element', (page) => {
      const doc = loadPage(page);
      expect(doc.querySelector('header')).not.toBeNull();
    });

    test.each(pages)('%s has a nav element', (page) => {
      const doc = loadPage(page);
      expect(doc.querySelector('nav')).not.toBeNull();
    });

    test.each(pages)('%s has a footer element', (page) => {
      const doc = loadPage(page);
      expect(doc.querySelector('footer')).not.toBeNull();
    });

    test.each(pages)('%s has a container div', (page) => {
      const doc = loadPage(page);
      expect(doc.querySelector('.container')).not.toBeNull();
    });

    test.each(pages)('%s has inline styles', (page) => {
      const doc = loadPage(page);
      expect(doc.querySelector('style')).not.toBeNull();
    });
  });

  describe('Meta Tags', () => {
    test.each(pages)('%s has charset meta tag', (page) => {
      const doc = loadPage(page);
      const charset = doc.querySelector('meta[charset]');
      expect(charset).not.toBeNull();
      expect(charset.getAttribute('charset')).toBe('UTF-8');
    });

    test.each(pages)('%s has viewport meta tag', (page) => {
      const doc = loadPage(page);
      const viewport = doc.querySelector('meta[name="viewport"]');
      expect(viewport).not.toBeNull();
    });

    test.each(pages)('%s has a title', (page) => {
      const doc = loadPage(page);
      expect(doc.title).toBeTruthy();
    });
  });

  describe('Footer Consistency', () => {
    test.each(pages)('%s footer has copyright 2025', (page) => {
      const doc = loadPage(page);
      const footer = doc.querySelector('footer');
      expect(footer.textContent).toContain('2025');
    });

    test.each(pages)('%s footer has site name', (page) => {
      const doc = loadPage(page);
      const footer = doc.querySelector('footer');
      expect(footer.textContent).toContain('Youth Financial Literacy');
    });
  });

  describe('Font Usage', () => {
    test.each(pages)('%s loads Google Fonts', (page) => {
      const doc = loadPage(page);
      const fontLink = doc.querySelector('link[href*="fonts.googleapis.com"]');
      expect(fontLink).not.toBeNull();
    });

    test('index.html and resources.html use Poppins font', () => {
      ['index.html', 'resources.html'].forEach(page => {
        const doc = loadPage(page);
        const fontLink = doc.querySelector('link[href*="fonts.googleapis.com"]');
        expect(fontLink.getAttribute('href')).toContain('Poppins');
      });
    });

    test('about.html and contact.html use Merriweather font', () => {
      ['about.html', 'contact.html'].forEach(page => {
        const doc = loadPage(page);
        const fontLink = doc.querySelector('link[href*="fonts.googleapis.com"]');
        expect(fontLink.getAttribute('href')).toContain('Merriweather');
      });
    });
  });

  describe('Image Alt Attributes', () => {
    test.each(pages)('%s all images have alt attribute defined', (page) => {
      const doc = loadPage(page);
      const images = doc.querySelectorAll('img');
      images.forEach(img => {
        expect(img.hasAttribute('alt')).toBe(true);
      });
    });
  });

  describe('Link Integrity', () => {
    test.each(pages)('%s all external links have valid href format', (page) => {
      const doc = loadPage(page);
      const externalLinks = doc.querySelectorAll('a[href^="http"]');
      externalLinks.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).toMatch(/^https?:\/\/.+/);
      });
    });

    test.each(pages)('%s internal nav links reference existing pages', (page) => {
      const doc = loadPage(page);
      const links = getNavLinks(doc);
      links.forEach(link => {
        expect(pages).toContain(link.href);
      });
    });
  });

  describe('Color Scheme Consistency', () => {
    test('index.html and resources.html share primary color #1a73e8', () => {
      ['index.html', 'resources.html'].forEach(page => {
        const doc = loadPage(page);
        const style = doc.querySelector('style');
        expect(style.textContent).toContain('#1a73e8');
      });
    });

    test('about.html and contact.html share primary color #0f4ab4', () => {
      ['about.html', 'contact.html'].forEach(page => {
        const doc = loadPage(page);
        const style = doc.querySelector('style');
        expect(style.textContent).toContain('#0f4ab4');
      });
    });
  });
});
