const { loadPage, getNavLinks, getImages, getExternalLinks } = require('./helpers');

describe('index.html', () => {
  let doc;

  beforeEach(() => {
    doc = loadPage('index.html');
  });

  describe('Document Structure', () => {
    test('has correct DOCTYPE and lang attribute', () => {
      expect(doc.documentElement.getAttribute('lang')).toBe('en');
    });

    test('has correct title', () => {
      expect(doc.title).toBe('Youth Financial Literacy');
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
      expect(header.textContent).toBe('Youth Financial Literacy');
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

    test('has welcome heading', () => {
      const h2 = doc.querySelector('.container h2');
      expect(h2).not.toBeNull();
      expect(h2.textContent).toBe('Welcome!');
    });

    test('has compound interest section', () => {
      const headings = Array.from(doc.querySelectorAll('h1'));
      const compoundInterest = headings.find(h => h.textContent.includes('Compound Interest'));
      expect(compoundInterest).toBeDefined();
    });

    test('has Egyptian online courses section', () => {
      const headings = Array.from(doc.querySelectorAll('h1'));
      const courses = headings.find(h => h.textContent.includes('Egyptian online courses'));
      expect(courses).toBeDefined();
    });

    test('has global courses section', () => {
      const headings = Array.from(doc.querySelectorAll('h1'));
      const global = headings.find(h => h.textContent.includes('Free Global Courses'));
      expect(global).toBeDefined();
    });

    test('has spending apps section', () => {
      const headings = Array.from(doc.querySelectorAll('h1'));
      const apps = headings.find(h => h.textContent.includes('Apps'));
      expect(apps).toBeDefined();
    });
  });

  describe('Course Listings', () => {
    test('lists Thndr Learn', () => {
      const h3s = Array.from(doc.querySelectorAll('h3'));
      const thndr = h3s.find(h => h.textContent.includes('Thndr'));
      expect(thndr).toBeDefined();
    });

    test('lists Central Bank of Egypt Initiative', () => {
      const h3s = Array.from(doc.querySelectorAll('h3'));
      const cbe = h3s.find(h => h.textContent.includes('Central Bank'));
      expect(cbe).toBeDefined();
    });

    test('lists Edraak', () => {
      const h3s = Array.from(doc.querySelectorAll('h3'));
      const edraak = h3s.find(h => h.textContent.includes('Edraak'));
      expect(edraak).toBeDefined();
    });

    test('lists Khan Academy', () => {
      const h3s = Array.from(doc.querySelectorAll('h3'));
      const khan = h3s.find(h => h.textContent.includes('Khan Academy'));
      expect(khan).toBeDefined();
    });

    test('lists Coursera', () => {
      const h3s = Array.from(doc.querySelectorAll('h3'));
      const coursera = h3s.find(h => h.textContent.includes('Coursera'));
      expect(coursera).toBeDefined();
    });
  });

  describe('App Listings', () => {
    test('lists Masarifi app', () => {
      const h3s = Array.from(doc.querySelectorAll('h3'));
      const masarifi = h3s.find(h => h.textContent.includes('Masarifi'));
      expect(masarifi).toBeDefined();
    });

    test('lists Spendee app', () => {
      const h3s = Array.from(doc.querySelectorAll('h3'));
      const spendee = h3s.find(h => h.textContent.includes('Spendee'));
      expect(spendee).toBeDefined();
    });

    test('lists YNAB app', () => {
      const h3s = Array.from(doc.querySelectorAll('h3'));
      const ynab = h3s.find(h => h.textContent.includes('YNAB'));
      expect(ynab).toBeDefined();
    });

    test('lists Money Manager app', () => {
      const h3s = Array.from(doc.querySelectorAll('h3'));
      const mm = h3s.find(h => h.textContent.includes('Money Manager'));
      expect(mm).toBeDefined();
    });

    test('app sections have masarifi class divs with images', () => {
      const masarifiDivs = doc.querySelectorAll('.masarifi');
      expect(masarifiDivs.length).toBe(4);
      masarifiDivs.forEach(div => {
        const imgs = div.querySelectorAll('img');
        expect(imgs.length).toBeGreaterThanOrEqual(3);
      });
    });
  });

  describe('External Links', () => {
    test('has link to Thndr Learn', () => {
      const links = getExternalLinks(doc);
      const thndr = links.find(l => l.href.includes('learn.thndr.app'));
      expect(thndr).toBeDefined();
    });

    test('has link to Central Bank of Egypt', () => {
      const links = getExternalLinks(doc);
      const cbe = links.find(l => l.href.includes('ebi.gov.eg'));
      expect(cbe).toBeDefined();
    });

    test('has link to Edraak', () => {
      const links = getExternalLinks(doc);
      const edraak = links.find(l => l.href.includes('edraak.org'));
      expect(edraak).toBeDefined();
    });

    test('has link to Khan Academy', () => {
      const links = getExternalLinks(doc);
      const khan = links.find(l => l.href.includes('khanacademy.org'));
      expect(khan).toBeDefined();
    });

    test('has link to Coursera', () => {
      const links = getExternalLinks(doc);
      const coursera = links.find(l => l.href.includes('coursera.org'));
      expect(coursera).toBeDefined();
    });

    test('all external links open in new tab', () => {
      const container = doc.querySelector('.container');
      const externalLinks = container.querySelectorAll('a[href^="http"]');
      externalLinks.forEach(link => {
        if (!link.getAttribute('href').includes('play.google.com')) {
          expect(link.getAttribute('target')).toBe('_blank');
        }
      });
    });

    test('has Google Play links for apps', () => {
      const links = getExternalLinks(doc);
      const playLinks = links.filter(l => l.href.includes('play.google.com'));
      expect(playLinks.length).toBe(4);
    });
  });

  describe('Images', () => {
    test('has calculations image', () => {
      const imgs = getImages(doc);
      const calc = imgs.find(i => i.src === 'calculations.png');
      expect(calc).toBeDefined();
    });

    test('has thndr image', () => {
      const imgs = getImages(doc);
      const thndr = imgs.find(i => i.src === 'thndr.png');
      expect(thndr).toBeDefined();
    });

    test('has course-related images', () => {
      const imgs = getImages(doc);
      expect(imgs.find(i => i.src === 'cib1.png')).toBeDefined();
      expect(imgs.find(i => i.src === 'cib2.png')).toBeDefined();
      expect(imgs.find(i => i.src === 'edraak.png')).toBeDefined();
      expect(imgs.find(i => i.src === 'khan.png')).toBeDefined();
      expect(imgs.find(i => i.src === 'coursera.png')).toBeDefined();
    });

    test('has app screenshot images', () => {
      const imgs = getImages(doc);
      const webpImages = imgs.filter(i => i.src && i.src.endsWith('.webp'));
      expect(webpImages.length).toBe(12);
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

    test('style defines body font-family', () => {
      const style = doc.querySelector('style');
      expect(style.textContent).toContain("font-family: 'Poppins'");
    });

    test('style defines header background color', () => {
      const style = doc.querySelector('style');
      expect(style.textContent).toContain('#1a73e8');
    });

    test('style defines nav background color', () => {
      const style = doc.querySelector('style');
      expect(style.textContent).toContain('#2a8bf2');
    });

    test('style defines container max-width', () => {
      const style = doc.querySelector('style');
      expect(style.textContent).toContain('max-width: 1100px');
    });
  });
});
