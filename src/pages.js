import * as C from './content.js';
import { icon } from './icons.js';
import { page, breadcrumbs, breadcrumbLd, esc, tel } from './layout.js';
import { SITE_URL } from './config.js';

const { brand, services } = C;
const svc = (slug) => services.find((s) => s.slug === slug);
const pad = (n) => String(n).padStart(2, '0');

/* ---------- shared pieces ---------- */

const img = (file, alt, { w = 600, h = 460, eager = false, cls = '' } = {}) =>
  `<img class="${cls}" src="/assets/img/${file}" alt="${esc(alt)}" width="${w}" height="${h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

const eyebrow = (t) => `<p class="eyebrow">${t}</p>`;

const ctaBlock = (text, primary, secondary) => `
<section class="section cta-block" aria-labelledby="cta-h">
  <div class="container">
    <div class="cta-card reveal">
      <div class="cta-glow" aria-hidden="true"></div>
      <h2 id="cta-h" class="cta-text">${text}</h2>
      <div class="btn-row">
        <a class="btn btn-primary btn-lg" href="${primary.href}">${primary.label} ${icon('arrow')}</a>
        ${secondary ? `<a class="btn btn-ghost btn-lg" href="${secondary.href}">${secondary.label}</a>` : ''}
      </div>
    </div>
  </div>
</section>`;

const faqItems = (ids) =>
  C.faqs.items
    .filter((f) => !ids || ids.includes(f.id))
    .map(
      (f) => `<details class="acc" id="faq-${f.id}">
  <summary class="acc-q"><h3>${f.q}</h3><span class="acc-icon" aria-hidden="true">${icon('plus', 'ico')}</span></summary>
  <div class="acc-a"><p>${f.a}</p></div>
</details>`
    )
    .join('');

const faqSection = (ids, title = 'Frequently Asked Questions') => `
<section class="section" aria-labelledby="faq-h">
  <div class="container split-faq">
    <div class="reveal">
      ${eyebrow('FAQs')}
      <h2 id="faq-h" class="h2">${title}</h2>
      <a class="link-arrow" href="/faqs/">View all FAQs ${icon('arrow')}</a>
    </div>
    <div class="acc-group reveal">${faqItems(ids)}</div>
  </div>
</section>`;

const pageHero = ({ trail, label, h1, intro, visual, cls = '' }) => `
<section class="page-hero ${cls}">
  <div class="hero-bg" aria-hidden="true"><span class="orb orb-1"></span><span class="orb orb-2"></span><span class="grid-lines"></span></div>
  <div class="container page-hero-inner${visual ? ' has-visual' : ''}">
    <div class="page-hero-copy">
      ${breadcrumbs(trail)}
      ${label ? eyebrow(label) : ''}
      <h1 class="h1">${h1}</h1>
      ${intro ? `<p class="lead">${intro}</p>` : ''}
    </div>
    ${visual ? `<div class="page-hero-visual">${visual}</div>` : ''}
  </div>
</section>`;

const serviceLd = (s, description) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  description,
  provider: { '@type': 'Organization', name: brand.name, url: SITE_URL + '/' },
  url: `${SITE_URL}/${s.slug}/`,
});

const iconList = (items, cls = '') =>
  `<ul class="icon-list ${cls}" role="list">${items
    .map(([t, ic], i) => `<li class="reveal" style="--i:${i}"><span class="il-ico">${icon(ic)}</span><span>${t}</span></li>`)
    .join('')}</ul>`;

const relatedServices = (current) => `
<section class="section related" aria-labelledby="rel-h">
  <div class="container">
    <div class="section-head reveal"><h2 id="rel-h" class="h3">Other services</h2><a class="link-arrow" href="/services/">View All Services ${icon('arrow')}</a></div>
    <ul class="related-grid" role="list">
      ${services
        .filter((s) => s.slug !== current)
        .map(
          (s) => `<li class="reveal"><a class="related-card" href="/${s.slug}/"><span class="rc-ico">${icon(s.icon)}</span><span class="rc-name">${s.name}</span><span class="rc-desc">${s.short}</span>${icon('arrow-ur', 'ico rc-arrow')}</a></li>`
        )
        .join('')}
    </ul>
  </div>
</section>`;

/* ---------- HOME ---------- */

const marqueeItems = [
  C.webDev.offer[0][0],
  C.ecommerce.offer[0][0],
  C.graphic.offer[0][0],
  C.video.offer[0][0],
  C.webDev.offer[4][0],
  C.graphic.offer[1][0],
  C.video.offer[1][0],
  C.ecommerce.offer[6][0],
];

// Service names split into the two-line rotating hero words ("Graphic" / "Design").
const rotWords = services.map((s) => {
  const i = s.name.lastIndexOf(' ');
  return [s.name.slice(0, i), s.name.slice(i + 1)];
});

const lineHead = (id, title, link) => `
<div class="line-head reveal">
  <h2 id="${id}" class="lh-title">${title}</h2><span class="lh-bar" aria-hidden="true"></span>
  ${link ? `<a class="link-arrow" href="${link.href}">${link.label} ${icon('arrow')}</a>` : ''}
</div>`;

// Wraps each word so the scroll-driven fill can light them up one by one.
const fillWords = (text) => {
  const words = text.split(' ');
  return `<p class="fill-text" style="--n:${words.length}">${words.map((w, i) => `<span style="--i:${i}">${w}</span>`).join(' ')}</p>`;
};

const home = () => {
  const h = C.home;
  const body = `
<section class="hm-hero">
  <div class="hm-blob" aria-hidden="true"></div>
  <svg class="hm-mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="M35 10H20.5a7 7 0 0 0 0 14h7a7 7 0 0 1 0 14H13" fill="none" stroke="currentColor" stroke-width="4.6" stroke-linecap="round"/></svg>
  <div class="container">
    <p class="rotator" aria-hidden="true" data-rotator>
      <span class="rot-a">${rotWords.map(([w], i) => `<span class="rot-w${i === 0 ? ' is-on' : ''}">${w}</span>`).join('')}</span>
      <span class="rot-b">${rotWords.map(([, w], i) => `<span class="rot-w${i === 0 ? ' is-on' : ''}">${w}</span>`).join('')}</span>
      <span class="rot-bar"></span>
    </p>
    <div class="hm-bottom">
      <a class="hm-scroll" href="#svc-h" aria-label="Scroll to services">${icon('chevron', 'ico')}${icon('chevron', 'ico')}</a>
      <div class="hm-copy">
        <h1 class="hm-h1">${h.hero.title}</h1>
        <p>${h.hero.text}</p>
        <div class="btn-row">
          <a class="btn btn-primary btn-lg" href="/contact/">${h.hero.cta}</a>
          <a class="btn btn-ghost btn-lg" href="/services/">Explore Services</a>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true"><div class="marquee-track">
  ${[...marqueeItems, ...marqueeItems].map((t) => `<span>${t}</span>`).join('')}
</div></div>

<section class="section hm-services" aria-labelledby="svc-h">
  <div class="container">${lineHead('svc-h', 'Our Services', { href: '/services/', label: 'View All Services' })}</div>
  <ol class="big-rows" role="list">
    ${services
      .map(
        (s) => `<li class="reveal"><a class="big-row" href="/${s.slug}/">
      <span class="container br-inner"><span class="br-name">${s.name}</span><span class="br-desc">${s.short}</span></span>
    </a></li>`
      )
      .join('')}
  </ol>
</section>

<section class="section hm-mission" aria-labelledby="intro-h">
  <div class="container">
    <h2 id="intro-h" class="ms-label">Introduction</h2>
    <span class="ms-bar" aria-hidden="true"></span>
    ${fillWords(h.intro)}
  </div>
</section>

<section class="section hm-caps" aria-labelledby="why-h">
  <div class="container">
    ${lineHead('why-h', 'Why Systemic Solution?', { href: '/about/', label: 'About Us' })}
    <ul class="cap-grid" role="list">
      ${h.why
        .map((w, i) => `<li class="cap-card reveal" style="--i:${i}"><h3>${w.t}</h3><span class="cap-foot"><span class="cap-ico">${icon(w.icon)}</span><span class="cap-n" aria-hidden="true">${pad(i + 1)}</span></span></li>`)
        .join('')}
    </ul>
  </div>
</section>

<section class="hm-stack" aria-labelledby="pt-h">
  <div class="container">
    <div class="stack-head">
      <h2 id="pt-h" class="lh-title">${C.processPage.h1}</h2>
      <a class="link-arrow" href="/process/">Our Process ${icon('arrow')}</a>
    </div>
    <ol class="stack" role="list">
      ${C.processPage.steps
        .map(
          (st, i, all) => `<li class="stack-card" style="--i:${i}">
        <h3>${st.t}</h3>
        <span class="stack-count" aria-hidden="true">${pad(i + 1)}<span>/${pad(all.length)}</span></span>
        <span class="stack-ico">${icon(st.icon)}</span>
        <p>${st.d}</p>
      </li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="hm-dark" aria-labelledby="wt-h">
  <div class="container dark-grid">
    <div class="reveal">
      <h2 id="wt-h" class="lh-title">${C.portfolio.h1}</h2>
      <a class="link-arrow" href="/portfolio/">Portfolio ${icon('arrow')}</a>
    </div>
    <div class="reveal">
      <p class="dark-text">${C.portfolio.intro.replace('website design, e-commerce, branding, creative graphics and video content', '<strong>website design, e-commerce, branding, creative graphics and video content</strong>')}</p>
      <ul class="dark-cats" role="list">${C.portfolio.categories.map((c) => `<li><a href="/portfolio/#${slugify(c)}">${c}</a></li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section price-band" aria-labelledby="pb-h">
  <div class="container">
    <a class="pb-card reveal" href="/pricing/">
      <h2 id="pb-h" class="pb-title">${C.pricing.h1}</h2>
      <p class="pb-price"><span class="pb-from">1 Page Website — Starting from</span><span class="pb-amt">${C.pricing.websites[0].price}</span></p>
      <span class="pb-go" aria-hidden="true">${icon('arrow-ur')}</span>
    </a>
  </div>
</section>

${ctaBlock(h.closing, { href: '/contact/', label: 'Contact Us' }, { href: '/request-a-quote/', label: 'Request a Quote' })}`;
  return page({ path: '/', seo: h.seo, body, bodyClass: 'is-home' });
};

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/* ---------- ABOUT ---------- */

const about = () => {
  const a = C.about;
  const trail = [{ name: 'About Us', href: '/about/' }];
  const body = `
${pageHero({
  trail,
  label: 'About Us',
  h1: a.h1,
  intro: a.body[0],
  visual: img('illo-about.svg', 'Abstract illustration of connected web, e-commerce, design and video services around the Systemic Solution mark', { w: 600, h: 600, eager: true }),
  cls: 'about-hero',
})}

<section class="section" aria-label="Our focus">
  <div class="container about-focus">
    <p class="statement reveal">${a.body[1]}</p>
    <ul class="focus-pills reveal" role="list">
      <li>${icon('layout', 'ico ico-sm')} clean design</li>
      <li>${icon('devices', 'ico ico-sm')} responsive experiences</li>
      <li>${icon('message', 'ico ico-sm')} clear communication</li>
      <li>${icon('target', 'ico ico-sm')} business objectives</li>
    </ul>
  </div>
</section>

<section class="section approach" aria-labelledby="ap-h">
  <div class="container approach-grid">
    <div class="approach-head">
      <div class="sticky reveal">
        ${eyebrow('How we think')}
        <h2 id="ap-h" class="h2">Our Approach</h2>
        <a class="link-arrow" href="/process/">Our Process ${icon('arrow')}</a>
      </div>
    </div>
    <ol class="approach-list" role="list">
      ${a.approach
        .map(
          (s, i) => `<li class="approach-item reveal"><span class="ap-num">${pad(i + 1)}</span><span class="ap-ico">${icon(s.icon)}</span><div><h3 class="h4">${s.t}</h3><p>${s.d}</p></div></li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section mission" aria-labelledby="mi-h">
  <div class="container">
    <figure class="mission-card reveal">
      <h2 id="mi-h" class="eyebrow">Our Mission</h2>
      <blockquote><p>${a.mission}</p></blockquote>
    </figure>
  </div>
</section>

${ctaBlock(a.cta, { href: '/contact/', label: 'Contact Us' }, { href: '/services/', label: 'Our Services' })}`;
  return page({ path: '/about/', seo: a.seo, body, ld: [breadcrumbLd(trail)] });
};

/* ---------- SERVICES ---------- */

const offerFor = { 'web-development': C.webDev.offer, 'ecommerce-development': C.ecommerce.offer, 'graphic-design': C.graphic.offer, 'video-editing': C.video.offer };

const servicesOverview = () => {
  const p = C.servicesPage;
  const trail = [{ name: 'Services', href: '/services/' }];
  const body = `
${pageHero({ trail, label: 'Our Services', h1: p.h1, intro: p.intro, cls: 'center-hero' })}

<nav class="svc-jump container" aria-label="Services on this page">
  <ul role="list">${services.map((s, i) => `<li><a href="#${s.slug}"><span>${pad(i + 1)}</span>${s.name}</a></li>`).join('')}</ul>
</nav>

${services
  .map(
    (s, i) => `
<section class="section svc-feature${i % 2 ? ' flip' : ''}" id="${s.slug}" aria-labelledby="${s.slug}-h">
  <div class="container svc-feature-grid">
    <div class="svc-feature-media reveal">
      <span class="svc-feature-num" aria-hidden="true">${pad(i + 1)}</span>
      ${img(s.illo, `Illustration representing ${s.name.toLowerCase()} by Systemic Solution`)}
    </div>
    <div class="svc-feature-copy reveal">
      <span class="chip-ico">${icon(s.icon)}</span>
      <h2 id="${s.slug}-h" class="h2">${s.name}</h2>
      <p class="lead">${s.overview}</p>
      <ul class="check-list" role="list">${offerFor[s.slug].slice(0, 4).map(([t]) => `<li>${icon('check', 'ico ico-sm')}${t}</li>`).join('')}</ul>
      <a class="btn btn-ghost" href="/${s.slug}/">Explore ${s.name} ${icon('arrow')}</a>
    </div>
  </div>
</section>`
  )
  .join('')}

${ctaBlock(p.cta, { href: '/request-a-quote/', label: 'Request a Quote' }, { href: '/pricing/', label: 'View Pricing' })}`;
  return page({ path: '/services/', seo: p.seo, body, ld: [breadcrumbLd(trail)] });
};

/* ---------- WEB DEVELOPMENT ---------- */

const svcHero = (s, h1, intro, label) =>
  pageHero({
    trail: [{ name: 'Services', href: '/services/' }, { name: s.name, href: `/${s.slug}/` }],
    label: label || s.name,
    h1,
    intro,
    visual: img(s.illo, `Illustration representing ${s.name.toLowerCase()} services`, { eager: true }),
    cls: 'svc-hero',
  });

const svcTrail = (s) => [{ name: 'Services', href: '/services/' }, { name: s.name, href: `/${s.slug}/` }];

const webDevelopment = () => {
  const w = C.webDev;
  const s = svc('web-development');
  const body = `
${svcHero(s, w.h1, w.intro)}

<section class="section" aria-labelledby="wo-h">
  <div class="container offer-split">
    <div class="reveal">${eyebrow('Web Development')}<h2 id="wo-h" class="h2">What We Offer</h2></div>
    ${iconList(w.offer, 'two-col')}
  </div>
</section>

<section class="section flow-section" aria-labelledby="dp-h">
  <div class="container">
    <div class="section-head reveal"><div>${eyebrow('Workflow')}<h2 id="dp-h" class="h2">Our Development Process</h2></div><a class="link-arrow" href="/process/">Our Process ${icon('arrow')}</a></div>
    <ol class="flow" role="list">
      ${w.process.map((t, i) => `<li class="flow-step reveal" style="--i:${i}"><span class="flow-num">${pad(i + 1)}</span><span class="flow-t">${t}</span></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section" aria-labelledby="rd-h">
  <div class="container media-split">
    <div class="reveal">${img('illo-responsive.svg', 'The same website layout adapting across desktop, tablet and phone screens', { w: 600, h: 400 })}</div>
    <div class="reveal">
      ${eyebrow('Responsive')}
      <h2 id="rd-h" class="h2">Why Responsive Design Matters</h2>
      <p class="lead">${w.responsive}</p>
      <ul class="device-tags" role="list"><li>${icon('phone-v', 'ico ico-sm')} phones</li><li>${icon('layout', 'ico ico-sm')} tablets</li><li>${icon('devices', 'ico ico-sm')} desktops</li></ul>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="wp-h">
  <div class="container">
    <div class="section-head reveal"><div>${eyebrow('Pricing')}<h2 id="wp-h" class="h2">Website Packages</h2></div><a class="link-arrow" href="/pricing/">View Pricing ${icon('arrow')}</a></div>
    ${packageCards(true)}
  </div>
</section>

${faqSection(['website-cost', 'domain-hosting', 'revisions'])}
${relatedServices(s.slug)}
${ctaBlock(w.cta, { href: '/request-a-quote/', label: 'Request a Quote' }, { href: '/contact/', label: 'Contact Us' })}`;
  return page({ path: `/${s.slug}/`, seo: w.seo, body, ld: [breadcrumbLd(svcTrail(s)), serviceLd(s, w.seo.description)] });
};

const packageCards = (compact = false) => `
<ul class="pkg-grid${compact ? ' compact' : ''}" role="list">
  ${C.pricing.websites
    .map(
      (p, i) => `<li class="pkg reveal${i === 2 ? ' pkg-accent' : ''}" style="--i:${i}">
    <div class="pkg-top"><span class="pkg-pages" aria-hidden="true">${p.pages}</span><h3 class="pkg-name">${p.name}</h3></div>
    <p class="pkg-price"><span class="pkg-from">Starting from</span><span class="pkg-amt">${p.price}</span></p>
    <a class="pkg-link" href="/request-a-quote/?service=web-development&amp;package=${encodeURIComponent(p.name)}">Request a Quote ${icon('arrow', 'ico ico-sm')}<span class="sr-only"> for ${p.name}</span></a>
  </li>`
    )
    .join('')}
</ul>`;

/* ---------- E-COMMERCE ---------- */

const ecommerceDevelopment = () => {
  const e = C.ecommerce;
  const s = svc('ecommerce-development');
  const body = `
${svcHero(s, e.h1, e.intro)}

<section class="section" aria-labelledby="es-h">
  <div class="container">
    <div class="section-head reveal"><div>${eyebrow('E-Commerce Development')}<h2 id="es-h" class="h2">E-Commerce Services</h2></div></div>
    <ul class="tile-grid five" role="list">
      ${e.offer.map(([t, ic], i) => `<li class="tile reveal" style="--i:${i}"><span class="tile-ico">${icon(ic)}</span><span class="tile-n" aria-hidden="true">${pad(i + 1)}</span><h3 class="tile-t">${t}</h3></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section" aria-label="Store operations">
  <div class="container duo">
    <article class="panel panel-grad reveal" aria-labelledby="pu-h">
      <span class="chip-ico">${icon('repeat')}</span>
      <h2 id="pu-h" class="h3">Product Update Process</h2>
      <p>${e.updateProcess}</p>
      <ol class="mini-steps" role="list" aria-label="Product update handover">
        <li><span>${icon('box', 'ico ico-sm')}</span>Demo product setup</li>
        <li><span>${icon('file', 'ico ico-sm')}</span>Product update process documentation</li>
      </ol>
    </article>
    <article class="panel reveal" aria-labelledby="tp-h">
      <span class="chip-ico chip-muted">${icon('info')}</span>
      <h2 id="tp-h" class="h3">Third-Party Services</h2>
      <p>${e.thirdParty}</p>
    </article>
  </div>
</section>

<section class="section" aria-labelledby="ep-h">
  <div class="container">
    <div class="price-hero reveal">
      <div>${eyebrow('Pricing')}<h2 id="ep-h" class="h3">E-Commerce</h2></div>
      <p class="price-big"><span class="pkg-from">Starting from</span><span class="grad-text">${C.pricing.ecommerce.price}</span></p>
      <p class="muted">${C.pricing.ecommerce.rest.charAt(0).toUpperCase() + C.pricing.ecommerce.rest.slice(1)}</p>
      <a class="btn btn-ghost" href="/pricing/">View Pricing ${icon('arrow')}</a>
    </div>
  </div>
</section>

${faqSection(['ecommerce', 'product-updates', 'domain-hosting'])}
${relatedServices(s.slug)}
${ctaBlock(e.cta, { href: '/request-a-quote/?service=ecommerce-development', label: 'Request a Quote' }, { href: '/contact/', label: 'Contact Us' })}`;
  return page({ path: `/${s.slug}/`, seo: e.seo, body, ld: [breadcrumbLd(svcTrail(s)), serviceLd(s, e.seo.description)] });
};

/* ---------- GRAPHIC DESIGN ---------- */

const graphicDesign = () => {
  const g = C.graphic;
  const s = svc('graphic-design');
  const body = `
${svcHero(s, g.h1, g.intro)}

<section class="section" aria-labelledby="gs-h">
  <div class="container">
    <div class="section-head reveal"><div>${eyebrow('Graphic Design')}<h2 id="gs-h" class="h2">Graphic Design Services</h2></div></div>
    <ul class="bento-design" role="list">
      ${g.offer.map(([t, ic], i) => `<li class="bd-tile reveal bd-${i + 1}" style="--i:${i}"><span class="tile-ico">${icon(ic)}</span><h3 class="tile-t">${t}</h3></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="da-h">
  <div class="container approach-orbit">
    <div class="orbit reveal" aria-hidden="true">
      <span class="orbit-core">${icon('pen')}</span>
      ${g.approachTerms.map((t, i) => `<span class="orbit-term o-${i + 1}">${t}</span>`).join('')}
    </div>
    <div class="reveal">
      ${eyebrow('Process')}
      <h2 id="da-h" class="h2">Our Design Approach</h2>
      <p class="lead">${g.approach}</p>
      <ul class="focus-pills" role="list">${g.approachTerms.map((t) => `<li>${icon('check', 'ico ico-sm')} ${t}</li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="gp-h">
  <div class="container">
    <div class="note-band reveal">
      <span class="chip-ico">${icon('info')}</span>
      <div><h2 id="gp-h" class="h4">Graphic Design &amp; Video Editing pricing</h2><p>${C.pricing.creative}</p></div>
      <a class="btn btn-ghost btn-sm" href="/pricing/">View Pricing</a>
    </div>
  </div>
</section>

${faqSection(['graphic-design', 'revisions', 'client-provides'])}
${relatedServices(s.slug)}
${ctaBlock(g.cta, { href: '/request-a-quote/?service=graphic-design', label: 'Request a Quote' }, { href: '/portfolio/', label: 'Portfolio' })}`;
  return page({ path: `/${s.slug}/`, seo: g.seo, body, ld: [breadcrumbLd(svcTrail(s)), serviceLd(s, g.seo.description)] });
};

/* ---------- VIDEO EDITING ---------- */

const videoEditing = () => {
  const v = C.video;
  const s = svc('video-editing');
  const body = `
${svcHero(s, v.h1, v.intro)}

<section class="section" aria-labelledby="vs-h">
  <div class="container">
    <div class="section-head reveal"><div>${eyebrow('Video Editing')}<h2 id="vs-h" class="h2">Video Editing Services</h2></div></div>
    <ol class="tracks" role="list">
      ${v.offer
        .map(
          ([t, ic], i) => `<li class="track reveal" style="--i:${i}"><span class="track-tc" aria-hidden="true">00:${pad(i * 6)}</span><span class="track-ico">${icon(ic)}</span><h3 class="track-t">${t}</h3><span class="track-bar" aria-hidden="true" style="--w:${38 + ((i * 23) % 55)}%"></span></li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section" aria-labelledby="vp-h">
  <div class="container factors">
    <div class="reveal">
      ${eyebrow('Pricing')}
      <h2 id="vp-h" class="h2">What Affects Pricing?</h2>
      <p class="lead">${v.pricing}</p>
      <a class="link-arrow" href="/pricing/">View Pricing ${icon('arrow')}</a>
    </div>
    <ul class="factor-cloud reveal" role="list">
      ${v.pricingTerms.map((t, i) => `<li style="--i:${i}">${t}</li>`).join('')}
    </ul>
  </div>
</section>

${faqSection(['video-editing', 'revisions', 'quotation'])}
${relatedServices(s.slug)}
${ctaBlock(v.cta, { href: '/request-a-quote/?service=video-editing', label: 'Request a Quote' }, { href: '/contact/', label: 'Contact Us' })}`;
  return page({ path: `/${s.slug}/`, seo: v.seo, body, ld: [breadcrumbLd(svcTrail(s)), serviceLd(s, v.seo.description)] });
};

/* ---------- PORTFOLIO ---------- */

const catIcon = { Websites: 'layout', 'E-Commerce Stores': 'cart', 'Graphic Design': 'pen', Branding: 'spark', 'Social Media Creatives': 'image', 'Video Editing': 'film' };

const portfolioPage = () => {
  const p = C.portfolio;
  const trail = [{ name: 'Portfolio', href: '/portfolio/' }];
  const cards = p.projects.length
    ? p.projects
        .map(
          (pr) => `<li class="work-card" data-cat="${slugify(pr.category)}"><figure><div class="work-media"><img src="${pr.image}" alt="${esc(pr.alt)}" loading="lazy" decoding="async" width="800" height="600"></div><figcaption><span class="work-cat">${pr.category}</span><h3 class="h4">${pr.title}</h3>${pr.summary ? `<p>${pr.summary}</p>` : ''}</figcaption></figure></li>`
        )
        .join('')
    : p.categories
        .map(
          (c, i) => `<li class="work-card is-placeholder" data-cat="${slugify(c)}" id="${slugify(c)}">
      <div class="work-media ph-${(i % 4) + 1}" aria-hidden="true"><span class="ph-ico">${icon(catIcon[c])}</span><span class="ph-lines"></span></div>
      <div class="work-cap"><span class="work-cat">${c}</span><p class="ph-note">Project to be added</p></div>
    </li>`
        )
        .join('');
  const body = `
${pageHero({ trail, label: 'Portfolio', h1: p.h1, intro: p.intro, cls: 'center-hero' })}

<section class="section work" aria-labelledby="pc-h">
  <div class="container">
    <h2 id="pc-h" class="sr-only">Portfolio Categories</h2>
    <div class="filters reveal" role="group" aria-label="Filter projects by category" data-filters>
      <button type="button" class="filter" aria-pressed="true" data-filter="all">All</button>
      ${p.categories.map((c) => `<button type="button" class="filter" aria-pressed="false" data-filter="${slugify(c)}">${c}</button>`).join('')}
    </div>
    <p class="sr-only" aria-live="polite" data-filter-status></p>
    <ul class="work-grid" role="list" data-work-grid>${cards}</ul>
  </div>
</section>

<section class="section" aria-labelledby="cs-h">
  <div class="container cs-split">
    <div class="reveal">
      ${eyebrow('Case studies')}
      <h2 id="cs-h" class="h2">Project Case Study Template</h2>
    </div>
    <ol class="cs-list reveal" role="list">
      ${p.caseStudyTemplate.map((t, i) => `<li><span>${pad(i + 1)}</span>${t}</li>`).join('')}
    </ol>
  </div>
</section>

${ctaBlock(p.cta, { href: '/contact/', label: 'Contact Us' }, { href: '/request-a-quote/', label: 'Request a Quote' })}`;
  return page({ path: '/portfolio/', seo: p.seo, body, ld: [breadcrumbLd(trail)] });
};

/* ---------- PRICING ---------- */

const pricingPage = () => {
  const p = C.pricing;
  const trail = [{ name: 'Pricing', href: '/pricing/' }];
  const body = `
${pageHero({ trail, label: 'Pricing', h1: p.h1, intro: p.intro, cls: 'center-hero' })}

<section class="section" aria-labelledby="wpk-h">
  <div class="container">
    <div class="section-head reveal"><div>${eyebrow(`${icon('code', 'ico ico-sm')} Web Development`)}<h2 id="wpk-h" class="h2">Website Packages</h2></div><a class="link-arrow" href="/web-development/">Web Development ${icon('arrow')}</a></div>
    ${packageCards()}
  </div>
</section>

<section class="section" aria-labelledby="pec-h">
  <div class="container price-rows">
    <article class="price-row reveal" aria-labelledby="pec-h">
      <span class="chip-ico">${icon('cart')}</span>
      <div class="pr-body"><h2 id="pec-h" class="h3">E-Commerce</h2><p>${p.ecommerce.text}</p></div>
      <p class="pr-amt"><span class="pkg-from">Starting from</span><span class="grad-text">${p.ecommerce.price}</span></p>
      <a class="btn btn-ghost btn-sm" href="/ecommerce-development/">E-Commerce Development</a>
    </article>
    <article class="price-row reveal" aria-labelledby="pgv-h">
      <span class="chip-ico">${icon('palette')}</span>
      <div class="pr-body"><h2 id="pgv-h" class="h3">Graphic Design &amp; Video Editing</h2><p>${p.creative}</p></div>
      <p class="pr-amt pr-quote">Quoted per deliverable</p>
      <div class="pr-links"><a class="btn btn-ghost btn-sm" href="/graphic-design/">Graphic Design</a><a class="btn btn-ghost btn-sm" href="/video-editing/">Video Editing</a></div>
    </article>
  </div>
</section>

<section class="section" aria-labelledby="rv-h">
  <div class="container duo">
    <article class="panel reveal" aria-labelledby="rv-h">
      <h2 id="rv-h" class="h3">Revision Policy</h2>
      <ol class="rev-track" role="list">
        <li class="rev free"><span class="rev-dot">${icon('check', 'ico ico-sm')}</span><span class="rev-t">Round 1</span><span class="rev-s">Included free</span></li>
        <li class="rev free"><span class="rev-dot">${icon('check', 'ico ico-sm')}</span><span class="rev-t">Round 2</span><span class="rev-s">Included free</span></li>
        <li class="rev paid"><span class="rev-dot">${icon('plus', 'ico ico-sm')}</span><span class="rev-t">Round 3 onward</span><span class="rev-s">Payable</span></li>
      </ol>
      <p>${p.revision}</p>
    </article>
    <article class="panel panel-warn reveal" aria-labelledby="im-h">
      <span class="chip-ico chip-muted">${icon('info')}</span>
      <h2 id="im-h" class="h3">Important</h2>
      <p>${p.important}</p>
    </article>
  </div>
</section>

${faqSection(['website-cost', 'domain-hosting', 'revisions'])}
${ctaBlock(p.cta, { href: '/request-a-quote/', label: 'Request a Quote' }, { href: '/contact/', label: 'Contact Us' })}`;
  return page({ path: '/pricing/', seo: p.seo, body, ld: [breadcrumbLd(trail)] });
};

/* ---------- PROCESS ---------- */

const processPage = () => {
  const p = C.processPage;
  const trail = [{ name: 'Our Process', href: '/process/' }];
  const body = `
${pageHero({ trail, label: 'Our Process', h1: p.h1, cls: 'center-hero' })}

<section class="section timeline-section" aria-label="Process stages">
  <div class="container">
    <ol class="timeline" role="list">
      ${p.steps
        .map(
          (s, i) => `<li class="tl-step reveal" style="--i:${i}">
        <span class="tl-node"><span class="tl-num">${pad(i + 1)}</span></span>
        <div class="tl-body"><span class="tl-ico">${icon(s.icon)}</span><h2 class="h4">${s.t}</h2><p>${s.d}</p></div>
      </li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section" aria-labelledby="tm-h">
  <div class="container">
    <div class="note-band big reveal">
      <span class="chip-ico">${icon('clock')}</span>
      <div><h2 id="tm-h" class="h3">Timeline</h2><p>${p.timeline}</p></div>
    </div>
  </div>
</section>

${ctaBlock(p.cta, { href: '/request-a-quote/', label: 'Request a Quote' }, { href: '/contact/', label: 'Contact Us' })}`;
  return page({ path: '/process/', seo: p.seo, body, ld: [breadcrumbLd(trail)] });
};

/* ---------- FAQS ---------- */

const faqsPage = () => {
  const f = C.faqs;
  const trail = [{ name: 'FAQs', href: '/faqs/' }];
  const body = `
${pageHero({ trail, label: 'FAQs', h1: 'Frequently Asked Questions', cls: 'center-hero' })}

<section class="section" aria-label="Questions and answers">
  <div class="container faq-layout">
    <div class="acc-group">${faqItems()}</div>
    <aside class="faq-aside" aria-labelledby="fa-h">
      <div class="panel panel-grad sticky">
        <h2 id="fa-h" class="h4">${f.items.find((x) => x.id === 'quotation').q}</h2>
        <p>${f.items.find((x) => x.id === 'quotation').a}</p>
        <ul class="contact-mini" role="list">
          ${brand.phones.map((p) => `<li><a href="${tel(p)}">${icon('phone', 'ico ico-sm')} ${p}</a></li>`).join('')}
          <li><a href="mailto:${brand.email}">${icon('mail', 'ico ico-sm')} ${brand.email}</a></li>
        </ul>
        <a class="btn btn-primary" href="/request-a-quote/">Request a Quote ${icon('arrow')}</a>
      </div>
    </aside>
  </div>
</section>`;
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: f.items.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
  };
  return page({ path: '/faqs/', seo: f.seo, body, ld: [breadcrumbLd(trail), faqLd] });
};

/* ---------- FORMS ---------- */

const field = ({ id, label, type = 'text', required = false, auto, placeholder = '', err, hint, rows, attrs = '' }) => {
  const req = required ? ' required' : '';
  const described = [hint ? `${id}-hint` : '', `${id}-err`].filter(Boolean).join(' ');
  const control =
    type === 'textarea'
      ? `<textarea id="${id}" name="${id}" rows="${rows || 5}"${req} aria-describedby="${described}" placeholder="${placeholder}" ${attrs}></textarea>`
      : `<input id="${id}" name="${id}" type="${type}"${req}${auto ? ` autocomplete="${auto}"` : ''} aria-describedby="${described}" placeholder="${placeholder}" ${attrs}>`;
  return `<div class="field">
  <label for="${id}">${label}${required ? ' <span class="req" aria-hidden="true">*</span>' : ' <span class="opt">(Optional)</span>'}</label>
  ${hint ? `<p class="hint" id="${id}-hint">${hint}</p>` : ''}
  ${control}
  <p class="err" id="${id}-err">${icon('info', 'ico ico-sm')} ${err || 'This field is required.'}</p>
</div>`;
};

const serviceOptions = [...services.map((s) => [s.slug, s.name]), ['complete-package', 'Complete digital package']];

const formStatus = () => `
<div class="form-status" data-form-status tabindex="-1" hidden>
  <span class="chip-ico">${icon('send')}</span>
  <div>
    <p class="fs-title" data-fs-title></p>
    <p class="fs-text" data-fs-text></p>
    <div class="fs-actions" data-fs-actions hidden>
      <a class="btn btn-ghost btn-sm" data-fs-mailto href="mailto:${brand.email}">${icon('mail', 'ico ico-sm')} Open email again</a>
      <button class="btn btn-ghost btn-sm" type="button" data-fs-copy>${icon('copy', 'ico ico-sm')} Copy enquiry text</button>
    </div>
  </div>
</div>`;

// data-endpoint: set to a form backend URL (Formspree, Netlify, own API…) to
// POST submissions. While empty, the form opens a pre-filled email instead.
const contactForm = () => `
<form class="form" data-enquiry-form data-endpoint="" data-subject="Website enquiry" novalidate>
  <div class="form-grid">
    ${field({ id: 'name', label: 'Name', required: true, auto: 'name', err: 'Please enter your name.' })}
    ${field({ id: 'business', label: 'Business / Company Name', required: true, auto: 'organization', err: 'Please enter your business or company name.' })}
    ${field({ id: 'email', label: 'Email', type: 'email', required: true, auto: 'email', err: 'Please enter a valid email address.' })}
    ${field({ id: 'phone', label: 'Phone', type: 'tel', required: true, auto: 'tel', err: 'Please enter a phone number.', attrs: 'inputmode="tel" pattern="[0-9+()\\-\\s]{7,}"' })}
    <div class="field span-2">
      <label for="service">Service Required <span class="req" aria-hidden="true">*</span></label>
      <div class="select-wrap"><select id="service" name="service" required aria-describedby="service-err">
        <option value="">Select a service</option>
        ${serviceOptions.map(([v, n]) => `<option value="${v}">${n}</option>`).join('')}
      </select>${icon('chevron', 'ico ico-sm')}</div>
      <p class="err" id="service-err">${icon('info', 'ico ico-sm')} Please choose a service.</p>
    </div>
    <div class="span-2">${field({ id: 'details', label: 'Project Details', type: 'textarea', required: true, err: 'Please tell us a little about your project.' })}</div>
    ${field({ id: 'timeline', label: 'Expected Timeline', required: true, err: 'Please share your expected timeline.' })}
    ${field({ id: 'budget', label: 'Budget Range' })}
  </div>
  <p class="form-note">${C.contact.cta}</p>
  <button class="btn btn-primary btn-lg" type="submit">Send Enquiry ${icon('send')}</button>
  ${formStatus()}
</form>`;

/* ---------- CONTACT ---------- */

const contactPage = () => {
  const c = C.contact;
  const trail = [{ name: 'Contact Us', href: '/contact/' }];
  const body = `
<section class="page-hero contact-hero">
  <div class="hero-bg" aria-hidden="true"><span class="orb orb-1"></span><span class="orb orb-2"></span><span class="grid-lines"></span></div>
  <div class="container contact-grid">
    <div class="contact-copy">
      ${breadcrumbs(trail)}
      ${eyebrow('Contact Us')}
      <h1 class="h1">${c.h1}</h1>
      <p class="lead">${c.intro}</p>
      <h2 class="h4 cd-h">Contact Details</h2>
      <ul class="contact-cards" role="list">
        ${brand.phones.map((p, i) => `<li><a class="cc" href="${tel(p)}"><span class="cc-ico">${icon('phone')}</span><span><span class="cc-l">Phone ${i + 1}</span><span class="cc-v">${p}</span></span></a></li>`).join('')}
        <li class="cc-wide"><a class="cc" href="mailto:${brand.email}"><span class="cc-ico">${icon('mail')}</span><span><span class="cc-l">Email</span><span class="cc-v">${brand.email}</span></span></a></li>
      </ul>
    </div>
    <div class="form-card">
      <h2 class="h3">Send your requirements</h2>
      ${contactForm()}
    </div>
  </div>
</section>`;
  return page({ path: '/contact/', seo: c.seo, body, ld: [breadcrumbLd(trail)] });
};

/* ---------- REQUEST A QUOTE ---------- */

const quotePage = () => {
  const q = C.quote;
  const trail = [{ name: 'Request a Quote', href: '/request-a-quote/' }];
  const body = `
${pageHero({ trail, label: 'Request a Quote', h1: q.h1, intro: q.intro, cls: 'center-hero compact' })}

<section class="section quote-section" aria-label="Quotation request form">
  <div class="container quote-grid">
    <form class="form form-card" data-enquiry-form data-endpoint="" data-subject="Quotation request" novalidate>
      <fieldset class="q-step">
        <legend><span class="q-num">01</span> Your details</legend>
        <div class="form-grid">
          ${field({ id: 'name', label: 'Name', required: true, auto: 'name', err: 'Please enter your name.' })}
          ${field({ id: 'business', label: 'Business / Company Name', required: true, auto: 'organization', err: 'Please enter your business or company name.' })}
          ${field({ id: 'email', label: 'Email', type: 'email', required: true, auto: 'email', err: 'Please enter a valid email address.' })}
          ${field({ id: 'phone', label: 'Phone', type: 'tel', required: true, auto: 'tel', err: 'Please enter a phone number.', attrs: 'inputmode="tel" pattern="[0-9+()\\-\\s]{7,}"' })}
        </div>
      </fieldset>

      <fieldset class="q-step" aria-describedby="service-err">
        <legend><span class="q-num">02</span> Service Required <span class="req" aria-hidden="true">*</span></legend>
        <div class="svc-pick" data-svc-pick>
          ${serviceOptions
            .map(
              ([v, n], i) => `<label class="pick"><input type="radio" name="service" value="${v}" required${i === 0 ? ' aria-describedby="service-err"' : ''}><span class="pick-box">${icon(v === 'complete-package' ? 'layers' : svc(v).icon)}<span>${n}</span></span></label>`
            )
            .join('')}
        </div>
        <p class="err err-group" id="service-err">${icon('info', 'ico ico-sm')} Please choose a service.</p>

        <div class="cond" data-cond="web-development" hidden>
          <label for="package">Website package <span class="opt">(Optional)</span></label>
          <div class="select-wrap"><select id="package" name="package">
            <option value="">Not sure yet</option>
            ${C.pricing.websites.map((p) => `<option value="${p.name}">${p.name} — Starting from ${p.price}</option>`).join('')}
          </select>${icon('chevron', 'ico ico-sm')}</div>
          <p class="hint">Website pricing depends on the number of pages, features and integrations.</p>
        </div>
        <div class="cond" data-cond="ecommerce-development" hidden>
          ${field({ id: 'products', label: 'Product count', type: 'text', hint: 'Planning an online store? Contact us with your product count and requirements.' })}
        </div>
        <div class="cond" data-cond="graphic-design" hidden>
          ${field({ id: 'deliverables', label: 'Deliverables and quantity', hint: 'Graphic design is quoted according to the deliverable, complexity, quantity and revision requirements.' })}
        </div>
        <div class="cond" data-cond="video-editing" hidden>
          ${field({ id: 'footage', label: 'Footage requirements', hint: 'Pricing depends on raw footage length, final video duration, number of clips, subtitles, motion graphics, voice-over, thumbnail requirements and editing complexity.' })}
          ${field({ id: 'format', label: 'Expected output format' })}
        </div>
      </fieldset>

      <fieldset class="q-step">
        <legend><span class="q-num">03</span> Project</legend>
        ${field({ id: 'details', label: 'Project Details', type: 'textarea', required: true, rows: 6, err: 'Please describe your project requirements.', hint: 'Your project requirements and expected deliverables.' })}
        <div class="form-grid">
          ${field({ id: 'timeline', label: 'Expected Timeline', required: true, err: 'Please share your preferred timeline.' })}
          ${field({ id: 'budget', label: 'Budget Range' })}
        </div>
      </fieldset>

      <button class="btn btn-primary btn-lg" type="submit">Request a Quote ${icon('send')}</button>
      ${formStatus()}
    </form>

    <aside class="quote-aside" aria-label="Quotation information">
      <div class="panel">
        <h2 class="h4">How can I request a quotation?</h2>
        <p>${q.how}</p>
        <ul class="contact-mini" role="list">
          ${brand.phones.map((p) => `<li><a href="${tel(p)}">${icon('phone', 'ico ico-sm')} ${p}</a></li>`).join('')}
          <li><a href="mailto:${brand.email}">${icon('mail', 'ico ico-sm')} ${brand.email}</a></li>
        </ul>
      </div>
      <div class="panel">
        <h2 class="h4">Revision Policy</h2>
        <p>${C.pricing.revision}</p>
      </div>
      <div class="panel">
        <h2 class="h4">Important</h2>
        <p>${C.pricing.important}</p>
        <a class="link-arrow" href="/pricing/">View Pricing ${icon('arrow')}</a>
      </div>
    </aside>
  </div>
</section>`;
  return page({ path: '/request-a-quote/', seo: q.seo, body, ld: [breadcrumbLd(trail)] });
};

/* ---------- LEGAL ---------- */

const legalPage = (l) => {
  const trail = [{ name: l.title, href: `/${l.slug}/` }];
  const fill = (t) => t.replace('{email}', `<a href="mailto:${brand.email}">${brand.email}</a>`);
  const body = `
${pageHero({ trail, label: 'Legal', h1: l.title, cls: 'legal-hero compact' })}
<section class="section legal" aria-label="${l.title}">
  <div class="container legal-grid">
    <nav class="legal-toc" aria-label="On this page">
      <div class="sticky">
        <p class="toc-h">On this page</p>
        <ol role="list">${l.sections.map(([h], i) => `<li><a href="#s-${i + 1}">${i + 1}. ${h}</a></li>`).join('')}</ol>
      </div>
    </nav>
    <article class="prose">
      <p class="updated">${icon('clock', 'ico ico-sm')} Last Updated: ${l.updated}</p>
      ${l.sections
        .map(
          ([h, blocks], i) => `<section id="s-${i + 1}" aria-labelledby="s-${i + 1}-h"><h2 id="s-${i + 1}-h">${i + 1}. ${h}</h2>${blocks
            .map((b) => (Array.isArray(b) ? `<ul>${b.map((li) => `<li>${li}</li>`).join('')}</ul>` : `<p>${fill(b)}</p>`))
            .join('')}</section>`
        )
        .join('')}
    </article>
  </div>
</section>`;
  return page({ path: `/${l.slug}/`, seo: l.seo, body, ld: [breadcrumbLd(trail)] });
};

/* ---------- 404 ---------- */

const notFound = () =>
  page({
    path: '/404.html',
    seo: { title: 'Page not found | Systemic Solution', description: 'The page you are looking for could not be found.' },
    body: `<section class="page-hero center-hero nf"><div class="hero-bg" aria-hidden="true"><span class="orb orb-1"></span><span class="orb orb-2"></span></div>
  <div class="container"><p class="nf-code grad-text" aria-hidden="true">404</p><h1 class="h1">Page not found</h1>
  <div class="btn-row center"><a class="btn btn-primary" href="/">Home ${icon('arrow')}</a><a class="btn btn-ghost" href="/services/">Our Services</a><a class="btn btn-ghost" href="/contact/">Contact Us</a></div></div></section>`,
  }).replace('<link rel="canonical"', '<meta name="robots" content="noindex"><link rel="canonical"');

export const pages = [
  ['/', home],
  ['/about/', about],
  ['/services/', servicesOverview],
  ['/web-development/', webDevelopment],
  ['/ecommerce-development/', ecommerceDevelopment],
  ['/graphic-design/', graphicDesign],
  ['/video-editing/', videoEditing],
  ['/portfolio/', portfolioPage],
  ['/pricing/', pricingPage],
  ['/process/', processPage],
  ['/faqs/', faqsPage],
  ['/contact/', contactPage],
  ['/request-a-quote/', quotePage],
  ...C.legal.map((l) => [`/${l.slug}/`, () => legalPage(l)]),
];

export const extraPages = [['404.html', notFound]];
