(()=>{'use strict';
const qs=(s,root=document)=>root.querySelector(s),qsa=(s,root=document)=>[...root.querySelectorAll(s)];
const header=qs('.site-header'),menuButton=qs('.menu-toggle'),mobileMenu=qs('.mobile-menu'),mobileServices=qs('.mobile-service-toggle'),mobileSubmenu=qs('.mobile-service-links');
function setMenu(open){if(!menuButton||!mobileMenu)return;mobileMenu.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.body.classList.toggle('menu-open',open);}
menuButton?.addEventListener('click',()=>setMenu(!mobileMenu.classList.contains('open')));
mobileServices?.addEventListener('click',()=>{const open=mobileServices.getAttribute('aria-expanded')!=='true';mobileServices.setAttribute('aria-expanded',String(open));mobileSubmenu?.classList.toggle('open',open)});
qsa('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
qsa('.nav-drop-button').forEach(b=>b.addEventListener('click',()=>{const group=b.closest('.nav-drop'),open=!group.classList.contains('open');group.classList.toggle('open',open);b.setAttribute('aria-expanded',String(open))}));
document.addEventListener('click',e=>{if(!e.target.closest('.nav-drop'))qsa('.nav-drop.open').forEach(d=>{d.classList.remove('open');d.querySelector('button').setAttribute('aria-expanded','false')})});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){setMenu(false);qsa('.nav-drop.open').forEach(d=>{d.classList.remove('open');d.querySelector('button').setAttribute('aria-expanded','false')})}});
window.addEventListener('resize',()=>{if(window.innerWidth>760)setMenu(false)},{passive:true});
window.addEventListener('scroll',()=>header?.classList.toggle('is-scrolled',window.scrollY>8),{passive:true});
if('IntersectionObserver' in window){const ob=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');ob.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -15px 0px'});qsa('.reveal').forEach(el=>ob.observe(el));}else qsa('.reveal').forEach(el=>el.classList.add('in-view'));
const problemContent=[
{eyebrow:'01 / ACQUISITION',title:'Make every marketing click count.',body:'We can evaluate where visitors come from, tighten campaign-to-page relevance, and implement useful conversion tracking so your next decision is based on evidence—not guesswork.',services:['Google Ads','Meta Ads','Landing pages','GA4 & GTM'],url:'services/digital-marketing.html'},
{eyebrow:'02 / EXPERIENCE',title:'Turn an outdated website into a better first impression.',body:'From UX and content structure to fast responsive builds, we help create websites that tell the right story and make it easier for prospective customers to take action.',services:['Website redesign','WordPress','Shopify','Webflow & Framer'],url:'services/website-design-development.html'},
{eyebrow:'03 / MEASUREMENT',title:'Understand what is working—and what is not.',body:'We implement meaningful events, organize tags, test funnels, and connect analytics tools to your marketing goals. Clear measurement helps you improve with confidence.',services:['GA4','Google Tag Manager','Meta Pixel','Conversion events'],url:'services/tracking-analytics.html'},
{eyebrow:'04 / CREATIVE',title:'Give the right message a visual people remember.',body:'We support your marketing and website needs with cohesive creative, design systems, engaging graphics and landing page visuals built around your brand.',services:['UI/UX design','Ad creatives','Campaign graphics','Brand identity'],url:'services/creative-brand-solutions.html'}];
const panel=qs('#problem-panel'),problemButtons=qsa('[data-problem]');
function showProblem(index){if(!panel)return;const d=problemContent[index];if(!d)return;problemButtons.forEach((b,i)=>{const active=i===index;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1});qs('#problem-label').textContent=d.eyebrow;qs('#problem-title').textContent=d.title;qs('#problem-description').textContent=d.body;qs('#problem-tags').replaceChildren(...d.services.map(v=>{const s=document.createElement('span');s.textContent=v;return s}));qs('#problem-link').href=d.url;panel.setAttribute('aria-labelledby',problemButtons[index].id);}
problemButtons.forEach((b,i)=>{b.addEventListener('click',()=>showProblem(i));b.addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();let next=e.key==='Home'?0:e.key==='End'?problemButtons.length-1:(i+(e.key==='ArrowDown'?1:-1)+problemButtons.length)%problemButtons.length;problemButtons[next].focus();showProblem(next)})});
qsa('.faq-question').forEach(button=>{button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';qsa('.faq-question').forEach(b=>{b.setAttribute('aria-expanded','false');const answer=qs('#'+b.getAttribute('aria-controls'));answer?.classList.remove('open');answer?.setAttribute('inert','')});if(open){button.setAttribute('aria-expanded','true');const ans=qs('#'+button.getAttribute('aria-controls'));ans?.classList.add('open');ans?.removeAttribute('inert')}})});
qsa('[data-filter]').forEach(b=>b.addEventListener('click',()=>{qsa('[data-filter]').forEach(el=>{const active=el===b;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active))});qsa('[data-category]').forEach(card=>{card.hidden=b.dataset.filter!=='all'&&card.dataset.category!==b.dataset.filter})}));
// Project inquiry form. The site works as a static frontend; EmailJS keys are PUBLIC identifiers.
// Email addresses are fixed in the EmailJS template, never taken from visitor input.
const emailForm = qs('#contact-form');
const formStatus = qs('#form-status');
if (emailForm && formStatus) {
  const config = window.NEXTIER_EMAILJS || {};
  const configured = ['publicKey','serviceId','templateId'].every(key =>
    typeof config[key] === 'string' && config[key].trim() &&
    !/^YOUR_/i.test(config[key].trim())
  );
  const submit = qs('[type="submit"]', emailForm);
  const submitLabel = qs('.submit-label', submit);
  const originalLabel = submitLabel?.textContent || 'Send project inquiry';
  let sending = false;
  let lastAttempt = 0;

  function notify(message, type = 'info') {
    formStatus.textContent = message;
    formStatus.dataset.state = type;
    formStatus.setAttribute('role', type === 'error' ? 'alert' : 'status');
  }

  function setLoading(loading) {
    sending = loading;
    submit.disabled = loading;
    submit.classList.toggle('is-loading', loading);
    emailForm.setAttribute('aria-busy', String(loading));
    if (submitLabel) submitLabel.textContent = loading ? 'Sending your inquiry…' : originalLabel;
  }

  function openMailClient(data) {
    const to = config.contactEmail || 'nextier.studio@gmail.com';
    const subject = encodeURIComponent('Nextier Studio inquiry — ' + data.service);
    const body = encodeURIComponent([
      'Name: ' + data.name,
      'Email: ' + data.email,
      'Company: ' + (data.company || 'Not provided'),
      'Service: ' + data.service,
      'Budget: ' + (data.budget || 'Not specified'),
      '',
      'Project details:',
      data.message
    ].join('\n'));
    notify('Your email app will open with a prepared message. Press Send there to complete your inquiry. Online submission is not yet activated.', 'info');
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  emailForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending || !emailForm.reportValidity()) return;
    const data = Object.fromEntries(new FormData(emailForm).entries());
    // Honeypot: genuine users will not see or fill this field.
    if (data.company_website) return;
    if (!configured) return openMailClient(data);

    // Simple UX throttle. Use EmailJS domain restrictions and optional CAPTCHA for stronger abuse protection.
    if (Date.now() - lastAttempt < 10000) {
      notify('Please allow a few seconds before sending another inquiry.', 'error');
      return;
    }
    lastAttempt = Date.now();
    setLoading(true);
    notify('Sending your project inquiry…', 'info');

    const templateParams = {
      // Both naming conventions are supported ({{name}}/{{email}} and {{from_name}}/{{reply_to}}).
      name: data.name.trim(),
      email: data.email.trim(),
      from_name: data.name.trim(),
      reply_to: data.email.trim(),
      company: (data.company || '').trim() || 'Not specified',
      service: data.service,
      budget: data.budget || 'Not specified',
      message: data.message.trim(),
      page_url: window.location.href,
      subject: 'New Nextier Studio inquiry — ' + data.service,
      title: 'New Nextier Studio inquiry — ' + data.service,
      time: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
    };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: config.serviceId,
          template_id: config.templateId,
          user_id: config.publicKey,
          template_params: templateParams
        }),
        signal: controller.signal
      });
      if (!response.ok) {
        // The previous version discarded EmailJS's actual error message.
        // Preserve it for debugging WITHOUT sending visitor form data to logs.
        const providerMessage = (await response.text().catch(() => '')).slice(0, 500);
        const deliveryError = new Error(`EmailJS HTTP ${response.status}: ${providerMessage || response.statusText}`);
        deliveryError.httpStatus = response.status;
        deliveryError.providerMessage = providerMessage;
        throw deliveryError;
      }
      emailForm.reset();
      notify('Thank you! Your inquiry has been accepted. We will get in touch by email.', 'success');
      // Only count a genuine successful delivery as a lead conversion.
      if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: 'nextier_contact_success', form_name: 'project_inquiry' });
    } catch (error) {
      // Do not expose raw provider diagnostics to site visitors; log them for developers.
      // HTTP responses may identify a Gmail permission, template, allowlist, or quota issue.
      const status = Number(error?.httpStatus) || 0;
      let message = 'We could not confirm delivery. Please email nextier.studio@gmail.com directly.';
      if (status) {
        message = `Email service error (HTTP ${status}). Please email nextier.studio@gmail.com directly.`;
      } else if (error?.name === 'AbortError') {
        message = 'The request timed out. Please check your inbox or EmailJS history before trying again.';
      } else if (error instanceof TypeError) {
        message = 'A network or browser restriction prevented the request. Please try again or email nextier.studio@gmail.com.';
      }
      notify(message, 'error');
      console.error('[Nextier EmailJS] HTTP status:', status || '(no HTTP response)');
      console.error('[Nextier EmailJS] Provider response:', error?.providerMessage || error?.message || String(error));
      console.info('[Nextier EmailJS] Verify Email Services → Test Service, Templates → To Email, and Account → Security → Allowed Domains.');
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  });
}
qs('#year')&&(qs('#year').textContent=new Date().getFullYear());
})();
