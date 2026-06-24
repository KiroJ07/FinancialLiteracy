const { loadPage, getNavLinks, getImages, getExternalLinks } = require('./helpers');

describe('about.html', () => {
  let doc;

  beforeEach(() => {
    doc = loadPage('about.html');
  });

  describe('Document Structure', () => {
    test('has correct DOCTYPE and lang attribute', () => {
      expect(doc.documentElement.getAttribute('lang')).toBe('en');
    });

    test('has correct title', () => {
      expect(doc.title).toBe('About Financial Literacy');
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
      expect(header.textContent).toBe('About Financial Literacy');
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

    test('has "What is Financial Literacy?" heading', () => {
      const h2 = doc.querySelector('.container h2');
      expect(h2).not.toBeNull();
      expect(h2.textContent).toBe('What is Financial Literacy?');
    });

    test('has descriptive paragraphs about financial literacy', () => {
      const paragraphs = doc.querySelectorAll('.container p');
      expect(paragraphs.length).toBeGreaterThanOrEqual(2);
      const text = Array.from(paragraphs).map(p => p.textContent).join(' ');
      expect(text).toContain('budgeting');
      expect(text).toContain('saving');
      expect(text).toContain('investing');
    });

    test('mentions empowering young people', () => {
      const paragraphs = doc.querySelectorAll('.container p');
      const text = Array.from(paragraphs).map(p => p.textContent).join(' ');
      expect(text).toContain('young people');
    });
  });

  describe('Money Personality Test Section', () => {
    test('has link to money personality test', () => {
      const links = getExternalLinks(doc);
      const testLink = links.find(l => l.href.includes('idrlabs.com/money-personality'));
      expect(testLink).toBeDefined();
    });

    test('mentions money personality', () => {
      const container = doc.querySelector('.container');
      expect(container.textContent).toContain('money personality');
    });

    test('has short link text', () => {
      const container = doc.querySelector('.container');
      expect(container.textContent).toContain('bit.ly');
    });
  });

  describe('Images', () => {
    test('has QR code image', () => {
      const imgs = getImages(doc);
      const qr = imgs.find(i => i.src === 'qr.png');
      expect(qr).toBeDefined();
    });

    test('QR code has "qr" class', () => {
      const qrImg = doc.querySelector('img.qr');
      expect(qrImg).not.toBeNull();
      expect(qrImg.getAttribute('src')).toBe('qr.png');
    });

    test('has test result image', () => {
      const imgs = getImages(doc);
      const testResult = imgs.find(i => i.src === 'test-result.png');
      expect(testResult).toBeDefined();
    });

    test('test result image has "test" class', () => {
      const testImg = doc.querySelector('img.test');
      expect(testImg).not.toBeNull();
      expect(testImg.getAttribute('src')).toBe('test-result.png');
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

    test('style defines qr class width', () => {
      const style = doc.querySelector('style');
      expect(style.textContent).toContain('.qr');
      expect(style.textContent).toContain('width: 15%');
    });

    test('style defines test class width', () => {
      const style = doc.querySelector('style');
      expect(style.textContent).toContain('.test');
      expect(style.textContent).toContain('width: 50%');
    });
  });
});
