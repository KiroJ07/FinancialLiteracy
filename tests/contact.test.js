const { loadPage, getNavLinks, getImages, getExternalLinks } = require('./helpers');

describe('contact.html', () => {
  let doc;

  beforeEach(() => {
    doc = loadPage('contact.html');
  });

  describe('Document Structure', () => {
    test('has correct DOCTYPE and lang attribute', () => {
      expect(doc.documentElement.getAttribute('lang')).toBe('en');
    });

    test('has correct title', () => {
      expect(doc.title).toBe('Contact Us');
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

    test('loads Google Fonts Merriweather', () => {
      const fontLink = doc.querySelector('link[href*="fonts.googleapis.com"]');
      expect(fontLink).not.toBeNull();
      expect(fontLink.getAttribute('href')).toContain('Merriweather');
    });
  });

  describe('Header', () => {
    test('has header element with correct text', () => {
      const header = doc.querySelector('header');
      expect(header).not.toBeNull();
      expect(header.textContent).toBe('Contact Us');
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

    test('has contact heading', () => {
      const h2 = doc.querySelector('.container h2');
      expect(h2).not.toBeNull();
      expect(h2.textContent).toContain('love to hear from you');
    });

    test('has descriptive paragraph about contacting', () => {
      const paragraphs = doc.querySelectorAll('.container p');
      expect(paragraphs.length).toBeGreaterThanOrEqual(1);
      const text = Array.from(paragraphs).map(p => p.textContent).join(' ');
      expect(text).toContain('questions');
      expect(text).toContain('feedback');
    });
  });

  describe('Contact Information', () => {
    test('has primary email link', () => {
      const emailLink = doc.querySelector('a[href="mailto:info@financialliteracy.com"]');
      expect(emailLink).not.toBeNull();
      expect(emailLink.textContent).toBe('info@financialliteracy.com');
    });

    test('has secondary email link', () => {
      const emailLink = doc.querySelector('a[href="mailto:financial-literacy@mail.com"]');
      expect(emailLink).not.toBeNull();
      expect(emailLink.textContent).toBe('financial-literacy@mail.com');
    });

    test('has phone number', () => {
      const container = doc.querySelector('.container');
      expect(container.textContent).toContain('012-000-0000');
    });

    test('email links use mailto protocol', () => {
      const mailtoLinks = doc.querySelectorAll('a[href^="mailto:"]');
      expect(mailtoLinks.length).toBe(2);
      mailtoLinks.forEach(link => {
        expect(link.getAttribute('href')).toMatch(/^mailto:/);
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

    test('style defines body font-family as Merriweather', () => {
      const style = doc.querySelector('style');
      expect(style.textContent).toContain("font-family: 'Merriweather'");
    });

    test('style defines header background color', () => {
      const style = doc.querySelector('style');
      expect(style.textContent).toContain('#0f4ab4');
    });

    test('style defines nav background color', () => {
      const style = doc.querySelector('style');
      expect(style.textContent).toContain('#1a5df0');
    });

    test('style defines container max-width', () => {
      const style = doc.querySelector('style');
      expect(style.textContent).toContain('max-width: 1100px');
    });
  });

  describe('Accessibility', () => {
    test('has no images (no alt text needed)', () => {
      const imgs = getImages(doc);
      expect(imgs).toHaveLength(0);
    });

    test('contact info is within a paragraph element', () => {
      const container = doc.querySelector('.container');
      const paragraphs = container.querySelectorAll('p');
      const contactParagraph = Array.from(paragraphs).find(p =>
        p.textContent.includes('Email')
      );
      expect(contactParagraph).toBeDefined();
    });
  });
});
