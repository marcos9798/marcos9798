const textOrEmpty = (value) => (value == null ? '' : String(value));

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = textOrEmpty(value);
}

function setLink(id, href, text) {
  const el = document.getElementById(id);
  if (!el) return;
  el.href = href;
  el.textContent = text;
}

function renderList(containerId, items, renderItem) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(items)) return;
  container.innerHTML = '';
  items.forEach((item) => container.appendChild(renderItem(item)));
}

async function loadContent() {
  const response = await fetch('content.json');
  if (!response.ok) throw new Error('Failed to load content.json');
  return response.json();
}

function buildPage(data) {
  const clinic = data.clinic || {};
  const contact = data.contact || {};

  setText('clinicName', clinic.name);
  setText('footerClinicName', clinic.name);
  setText('clinicTagline', clinic.tagline);
  setText('heroEyebrow', clinic.heroEyebrow);
  setText('heroTitle', clinic.heroTitle);
  setText('heroDescription', clinic.heroDescription);
  setText('contactText', clinic.contactText);

  setText('addressInline', contact.address);
  setText('contactAddress', contact.address);

  setLink('phoneInline', `tel:${textOrEmpty(contact.phone)}`, contact.phone || '');
  setLink('contactPhone', `tel:${textOrEmpty(contact.phone)}`, contact.phone || '');
  setLink('emailInline', `mailto:${textOrEmpty(contact.email)}`, contact.email || '');
  setLink('contactEmail', `mailto:${textOrEmpty(contact.email)}`, contact.email || '');

  const heroPrimaryCta = document.getElementById('heroPrimaryCta');
  if (heroPrimaryCta) heroPrimaryCta.textContent = clinic.heroPrimaryCtaText || 'Book Appointment';
  const heroSecondaryCta = document.getElementById('heroSecondaryCta');
  if (heroSecondaryCta) heroSecondaryCta.textContent = clinic.heroSecondaryCtaText || 'Our Services';

  renderList('statsList', data.stats, (stat) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${textOrEmpty(stat.value)}</strong><span>${textOrEmpty(stat.label)}</span>`;
    return li;
  });

  renderList('timingList', data.timings, (timing) => {
    const li = document.createElement('li');
    li.textContent = textOrEmpty(timing);
    return li;
  });

  renderList('servicesGrid', data.services, (service) => {
    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = `<h3>${textOrEmpty(service.title)}</h3><p>${textOrEmpty(service.description)}</p>`;
    return article;
  });

  setText('aboutText', data.about?.text);

  renderList('aboutHighlights', data.about?.highlights, (point) => {
    const li = document.createElement('li');
    li.textContent = textOrEmpty(point);
    return li;
  });

  renderList('conditionsList', data.conditions, (condition) => {
    const span = document.createElement('span');
    span.className = 'chip';
    span.textContent = textOrEmpty(condition);
    return span;
  });

  renderList('doctorGrid', data.doctors, (doctor) => {
    const article = document.createElement('article');
    article.className = 'doctor';
    article.innerHTML = `
      <h3>${textOrEmpty(doctor.name)}</h3>
      <small>${textOrEmpty(doctor.qualification)} • ${textOrEmpty(doctor.experience)}</small>
      <p>${textOrEmpty(doctor.specialization)}</p>
    `;
    return article;
  });

  renderList('testimonialGrid', data.testimonials, (testimonial) => {
    const article = document.createElement('article');
    article.className = 'testimonial';
    article.innerHTML = `<p>“${textOrEmpty(testimonial.quote)}”</p><footer>— ${textOrEmpty(testimonial.author)}</footer>`;
    return article;
  });
}

function setYear() {
  setText('year', new Date().getFullYear());
}

function setupNavToggle() {
  const button = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!button || !menu) return;

  button.addEventListener('click', () => {
    menu.classList.toggle('is-open');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => menu.classList.remove('is-open'));
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  setYear();
  setupNavToggle();

  try {
    const data = await loadContent();
    buildPage(data);
  } catch (error) {
    console.error(error);
    alert('Unable to load website content. Please verify content.json exists and is valid JSON.');
  }
});
