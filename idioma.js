// Delirium OS · idioma de la app del equipo (español, English, Português).
// La interfaz se escribe en español; esta capa traduce lo que se ve en pantalla con diccionarios (i18n-en.js, i18n-pt.js).
// Los datos que escribe el equipo (nombres de clientes, notas, mensajes) no se traducen.
(function (D) {
  D.IDIOMAS = [{ code: 'es', label: 'Español' }, { code: 'en', label: 'English' }, { code: 'pt', label: 'Português' }];
  const DIC = window.DOS_I18N || {};
  const EXTRA = {
    en: { 'ayer': 'yesterday', 'hoy': 'today', 'mañana': 'tomorrow', 'Idioma de la app': 'App language', 'Idioma del equipo por defecto': 'Default team language', 'Cada persona puede cambiarlo en Mi cuenta.': 'Each person can change it in My account.', 'Idioma guardado.': 'Language saved.', 'Los datos que escribe el equipo (clientes, notas, mensajes) no se traducen.': 'Data the team writes (clients, notes, messages) is not translated.', 'Esta app es solo para el equipo de Delirium Studios. Los clientes entran a su portal desde la página web, con el enlace que les envió el estudio.': 'This app is only for the Delirium Studios team. Clients sign in to their portal from the website, with the link the studio sent them.', 'Entrar a Delirium OS': 'Sign in to Delirium OS', 'Usa el correo y la contraseña que te dio Dirección.': 'Use the email and password Dirección gave you.', 'Contraseña': 'Password', 'Cuentas de ejemplo': 'Sample accounts', 'Entra con cada rol para ver qué ve cada persona:': 'Sign in with each role to see what each person sees:', 'contraseña:': 'password:', 'Código de verificación': 'Verification code', '{n} de {n}': '{n} of {n}', '· contraseña:': '· password:', '¿Olvidaste tu contraseña o es tu primera vez? Pide a Dirección una invitación y': 'Forgot your password or is it your first time? Ask Dirección for an invitation and', 'pega aquí tu código': 'paste your code here', '¿Tu estudio ya trabaja en línea? Conectar a la nube de mi estudio': 'Does your studio already work online? Connect to my studio cloud', 'Lista': 'List' },
    pt: { 'ayer': 'ontem', 'hoy': 'hoje', 'mañana': 'amanhã', 'Idioma de la app': 'Idioma do app', 'Idioma del equipo por defecto': 'Idioma padrão da equipe', 'Cada persona puede cambiarlo en Mi cuenta.': 'Cada pessoa pode mudar em Minha conta.', 'Idioma guardado.': 'Idioma salvo.', 'Los datos que escribe el equipo (clientes, notas, mensajes) no se traducen.': 'Os dados que a equipe escreve (clientes, notas, mensagens) não são traduzidos.', 'Esta app es solo para el equipo de Delirium Studios. Los clientes entran a su portal desde la página web, con el enlace que les envió el estudio.': 'Este app é só para a equipe da Delirium Studios. Os clientes entram no portal pelo site, com o link que o estúdio enviou.', 'Entrar a Delirium OS': 'Entrar no Delirium OS', 'Usa el correo y la contraseña que te dio Dirección.': 'Use o e-mail e a senha que a Direção te deu.', 'Contraseña': 'Senha', 'Cuentas de ejemplo': 'Contas de exemplo', 'Entra con cada rol para ver qué ve cada persona:': 'Entre com cada função para ver o que cada pessoa vê:', 'contraseña:': 'senha:', 'Código de verificación': 'Código de verificação', '{n} de {n}': '{n} de {n}', '· contraseña:': '· senha:', '¿Olvidaste tu contraseña o es tu primera vez? Pide a Dirección una invitación y': 'Esqueceu a senha ou é sua primeira vez? Peça um convite à Direção e', 'pega aquí tu código': 'cole aqui seu código', '¿Tu estudio ya trabaja en línea? Conectar a la nube de mi estudio': 'Seu estúdio já trabalha online? Conectar à nuvem do meu estúdio', 'Lista': 'Lista' },
  };
  for (const l of Object.keys(EXTRA)) DIC[l] = Object.assign({}, DIC[l] || {}, EXTRA[l]);
  const NUM = /\d+(?:[.,]\d+)*/g;
  const MESES = { es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'], en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'] };
  let lang = 'es';
  const originales = new WeakMap(); const attrsOrig = new WeakMap();
  const ATTRS = ['placeholder', 'title', 'aria-label'];
  const SALTAR = 'SCRIPT,STYLE,TEXTAREA,CODE,PRE,.mono,[data-sin-traducir],[contenteditable]';

  // fechas "22 nov 2026" → mes en el idioma elegido
  const fecha = new RegExp(`^(\\d{1,2}) (${MESES.es.join('|')}) (\\d{4})(.*)$`);
  function traducir(t) {
    const d = DIC[lang]; if (!d) return null;
    const limpio = t.replace(/\s+/g, ' ').trim(); if (!limpio) return null;
    if (d[limpio] !== undefined) return d[limpio];
    const nums = limpio.match(NUM);
    if (nums) { const k = limpio.replace(NUM, '{n}'); if (d[k] !== undefined) { let i = 0; return d[k].replace(/\{n\}/g, () => nums[i++] ?? ''); } }
    const fd = limpio.match(/^(.*?)(\d{1,2}) (ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic) (\d{4})(.*)$/);
    if (fd && (fd[1] || fd[5])) { const t1 = fd[1].trim() ? (traducir(fd[1]) ?? fd[1]) : fd[1]; const m = MESES[lang][MESES.es.indexOf(fd[3])]; const dd = lang === 'en' ? `${m} ${fd[2]}, ${fd[4]}` : `${fd[2]} ${m} ${fd[4]}`; const t2 = fd[5].trim() ? (traducir(fd[5]) ?? fd[5]) : fd[5]; return `${t1}${/\s$/.test(fd[1]) || !fd[1] ? '' : ' '}${dd}${t2.startsWith(' ') || !t2 ? '' : ' '}${t2}`.replace(/\s+/g, ' ').trim(); }
    const por = limpio.match(/^(·\s*)?por (.+)$/); if (por) return `${por[1] || ''}${lang === 'en' ? 'by' : 'por'} ${por[2]}`;
    const f = limpio.match(fecha); if (f) { const m = MESES[lang][MESES.es.indexOf(f[2])]; const resto = f[4] ? (traducir(f[4]) ?? f[4]) : ''; return lang === 'en' ? `${m} ${f[1]}, ${f[3]}${resto}` : `${f[1]} ${m} ${f[3]}${resto}`; }
    // "Texto: valor" o "Texto · valor": traducir la parte fija
    const sep = limpio.match(/^([^:·]{3,60})([:·])\s*(.*)$/); if (sep && d[sep[1].trim()] !== undefined) return `${d[sep[1].trim()]}${sep[2]} ${sep[3] ? (traducir(sep[3]) ?? sep[3]) : ''}`.trim();
    return null;
  }
  D.tr = (t) => (lang === 'es' ? t : (traducir(t) ?? t));

  function nodoTexto(n) {
    const p = n.parentElement; if (!p || p.closest(SALTAR)) return;
    const orig = originales.has(n) ? originales.get(n) : n.nodeValue;
    if (lang === 'es') { if (originales.has(n) && n.nodeValue !== orig) n.nodeValue = orig; return; }
    const x = traducir(orig); if (x === null) return;
    if (!originales.has(n)) originales.set(n, orig);
    const pre = orig.match(/^\s*/)[0], post = orig.match(/\s*$/)[0]; const nuevo = pre + x + post;
    if (n.nodeValue !== nuevo) n.nodeValue = nuevo;
  }
  function elemento(el) {
    if (el.closest && el.closest('SCRIPT,STYLE')) return;
    let o = attrsOrig.get(el); for (const a of ATTRS) { if (!el.hasAttribute || !el.hasAttribute(a)) continue; const v = el.getAttribute(a);
      if (!o) { o = {}; attrsOrig.set(el, o); } if (!(a in o) || (v !== o[a] && v !== o['_' + a])) o[a] = v;
      const x = lang === 'es' ? o[a] : (traducir(o[a]) ?? o[a]); o['_' + a] = x; if (v !== x) el.setAttribute(a, x); }
  }
  function recorrer(raiz) {
    if (!raiz) return; if (raiz.nodeType === 3) return nodoTexto(raiz);
    if (raiz.nodeType !== 1 && raiz.nodeType !== 9 && raiz.nodeType !== 11) return;
    if (raiz.nodeType === 1) elemento(raiz);
    const tw = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT); let n;
    while ((n = tw.nextNode())) { if (n.nodeType === 3) nodoTexto(n); else elemento(n); }
  }
  let obs = null; let ocupado = false;
  function observar() {
    if (obs) obs.disconnect(); if (lang === 'es') return;
    obs = new MutationObserver((ms) => { if (ocupado) return; ocupado = true; try { for (const m of ms) { if (m.type === 'characterData') { originales.delete(m.target); nodoTexto(m.target); } else if (m.type === 'attributes') elemento(m.target); else m.addedNodes.forEach(recorrer); } } finally { ocupado = false; } });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
  D.idioma = () => lang;
  D.aplicarIdioma = (l) => {
    l = D.IDIOMAS.some(x => x.code === l) ? l : 'es'; lang = l; document.documentElement.lang = l === 'es' ? 'es' : l;
    try { localStorage.setItem('dos-idioma', l); } catch (e) {}
    if (document.body) { ocupado = true; try { recorrer(document.body); } finally { ocupado = false; } observar(); }
  };
  // fechas y números con el formato del idioma
  const loc = () => ({ es: 'es-VE', en: 'en-US', pt: 'pt-BR' }[lang]);
  const prevDate = D.date; D.date = (v) => { const x = prevDate(v); if (lang === 'es' || !x || x === '—') return x; const f = x.match(/^(\d{1,2}) (\w{3}) (\d{4})$/); if (!f) return x; const m = MESES[lang][MESES.es.indexOf(f[2])] || f[2]; return lang === 'en' ? `${m} ${f[1]}, ${f[3]}` : `${f[1]} ${m} ${f[3]}`; };
  const prevRel = D.rel; D.rel = (v) => { const x = prevRel(v); return lang === 'es' ? x : (traducir(x) ?? x); };
  const prevNum = D.num; D.num = (n) => lang === 'es' && prevNum ? prevNum(n) : Number(n || 0).toLocaleString(loc());
  // idioma inicial: el de esta persona, el que eligió en el instalador o el del equipo
  D.idiomaInicial = (me, settings, info) => (me && me.idioma_app) || (() => { try { return localStorage.getItem('dos-idioma'); } catch (e) { return null; } })() || (info && info.idioma) || (settings && settings.idioma_defecto) || 'es';
  document.addEventListener('DOMContentLoaded', async () => {
    let l = null; try { l = localStorage.getItem('dos-idioma'); } catch (e) {}
    if (!l && window.dos && window.dos.info) { try { const i = await window.dos.info(); l = i && i.data && i.data.idioma; } catch (e) {} }
    if (l && l !== 'es') D.aplicarIdioma(l);
  });
})(window.DOS);
