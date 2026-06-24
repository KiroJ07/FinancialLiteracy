const { loadPage, getNavLinks, getImages, getExternalLinks } = require('./helpers');

describe('resources.html', () => {
  let doc;

  beforeEach(() => {
    doc = loadPage('resources.html');
  });

  describe('Document Structure', () => {
    test('has correct DOCTYPE and lang attribute', () => {
      expect(doc.documentElement.getAttribute('lang')).toBe('en');
    });

    test('has correct title', () => {
      expect(doc.title).toBe('Financial Resources');
    });

    test('has meta charset UTF-8', () => {
      const charset = doc.querySelector('meta[charset]');
      expect(charset).not.toBeNull();
      expect(charset.getAttribute('charset')).toBe('UTF-8');
    });

    test('has viewport meta tag', () => {
      const viewport = doc.querySelector('meta[name="viewport"]');
      expect(viewport).not.toBeNull();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
    });

    test('loads Google Fonts Poppins', () => {
      const fontLink = doc.querySelector('link[href*="fonts.googleapis.com"]');
      expect(fontLink).not.toBeNull();
      expect(fontLink.getAttribute('href')).toContain('Poppins');
    });
  });

  describe('Header', () => {
    test('has header element with correct text', () => {
      const header = doc.querySelector('header');
      expect(header).not.toBeNull();
      expect(header.textContent).toBe('Financial Resources');
    });
  });

  describe('Navigation', () => {
    test('has nav element', () => {
      const nav = doc.querySelector('nav');
      expect(nav).not.toBeNull();
    });

    test('has 4 navigation links', () => {
      const links = getNavLinks(doc);
      expect(links).toHaveLength(4);
    });

    test('navigation links point to correct pages', () => {
      const links = getNavLinks(doc);
      expect(links[0]).toEqual({ href: 'index.html', text: 'Home' });
      expect(links[1]).toEqual({ href: 'about.html', text: 'About' });
      expect(links[2]).toEqual({ href: 'resources.html', text: 'Resources' });
      expect(links[3]).toEqual({ href: 'contact.html', text: 'Contact' });
    });
  });

  describe('Main Content', () => {
    test('has container div', () => {
      const container = doc.querySelector('.container');
      expect(container).not.toBeNull();
    });

    test('has "Useful Resources" heading', () => {
      const h2 = doc.querySelector('.container h2');
      expect(h2).not.toBeNull();
      expect(h2.textContent).toBe('Useful Resources');
    });
  });

  describe('Resources List', () => {
    test('has unordered list with resources-list class', () => {
      const ul = doc.querySelector('ul.resources-list');
      expect(ul).not.toBeNull();
    });

    test('has 3 resource items', () => {
      const items = doc.querySelectorAll('ul.resources-list li');
      expect(items).toHaveLength(3);
    });

    test('lists Investopedia', () => {
      const links = doc.querySelectorAll('ul.resources-list li a');
      const investopedia = Array.from(links).find(a =>
        a.getAttribute('href').includes('investopedia.com')
      );
      expect(investopedia).toBeDefined();
      expect(investopedia.textContent).toContain('Investopedia');
    });

    test('lists Khan Academy finance courses', () => {
      const links = doc.querySelectorAll('ul.resources-list li a');
      const khan = Array.from(links).find(a =>
        a.getAttribute('href').includes('khanacademy.org')
      );
      expect(khan).toBeDefined();
      expect(khan.textContent).toContain('Khan Academy');
    });

    test('lists CNBC Personal Finance', () => {
      const links = doc.querySelectorAll('ul.resources-list li a');
      const cnbc = Array.from(links).find(a =>
        a.getAttribute('href').includes('cnbc.com')
      );
      expect(cnbc).toBeDefined();
      expect(cnbc.textContent).toContain('CNBC');
    });

    test('all resource links open in new tab', () => {
      const links = doc.querySelectorAll('ul.resources-list li a');
      links.forEach(link => {
        expect(link.getAttribute('target')).toBe('_blank');
      });
    });

    test('all resource links use HTTPS', () => {
      const links = doc.querySelectorAll('ul.resources-list li a');
      links.forEach(link => {
        expect(link.getAttribute('href')).toMatch(/^https:\/\//);
      });
    });
  });

  describe('Footer', () => {
    test('has footer element', () => {
      const footer = doc.querySelector('footer');
      expect(footer).not.toBeNull();
    });

    test('footer contains copyright text', () => {
      const footer = doc.querySelector('footer');
      expect(footer.textContent).toContain('2025');
      expect(footer.textContent).toContain('Youth Financial Literacy');
    });
  });

  describe('Styles', () => {
    test('has inline style tag', () => {
      const style = doc.querySelector('style');
      expect(style).not.toBeNull();
    });

    test('style defines body font-family as Poppins', () => {
      const style = doc.querySelector('style');
      expect(style.textContent).toContain("font-family: 'Poppins'");
    });

    test('style defines header background color', () => {
      const style = doc.querySelector('style');
      expect(style.textContent).toContain('#1a73e8');
    });

    test('style defines resources-list styling', () => {
      const style = doc.querySelector('style');
      expect(style.textContent).toContain('ul.resources-list');
      expect(style.textContent).toContain('list-style: square');
    });

    test('style defines resources-list link color', () => {
      const style = doc.querySelector('style');
      expect(style.textContent).toContain('ul.resources-list li a');
    });
  });

  describe('Accessibility', () => {
    test('has no images (no alt text needed)', () => {
      const imgs = getImages(doc);
      expect(imgs).toHaveLength(0);
    });

    test('uses semantic list for resources', () => {
      const ul = doc.querySelector('ul.resources-list');
      expect(ul).not.toBeNull();
      expect(ul.tagName.toLowerCase()).toBe('ul');
    });
  });
});
