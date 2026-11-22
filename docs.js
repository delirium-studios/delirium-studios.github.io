// Delirium OS — documentos PDF (cotización, factura, recibo de pago) con la marca Delirium.
(function (D) {
  const esc = D.esc;
  let assets = null;
  const toDataUrl = async (url, mime) => { const b = await (await fetch(url)).arrayBuffer(); let s = ''; const u = new Uint8Array(b); for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return `data:${mime};base64,${btoa(s)}`; };
  async function loadAssets() {
    if (assets) return assets;
    try {
      assets = {
        logo: await toDataUrl('spiro.png', 'image/png'),
        sora: await toDataUrl('Sora-Bold.ttf', 'font/ttf'),
        body: await toDataUrl('SpaceGrotesk-Regular.ttf', 'font/ttf'),
        bodyB: await toDataUrl('SpaceGrotesk-Bold.ttf', 'font/ttf'),
        mono: await toDataUrl('SpaceMono-Regular.ttf', 'font/ttf'),
      };
    } catch (e) { assets = { logo: '', sora: '', body: '', bodyB: '', mono: '' }; }
    return assets;
  }

  function shell(a, { tipo, codigo, fecha, extra = '' }, inner) {
    const s = D.settings;
    return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>
      ${a.sora ? `@font-face{font-family:Sora;src:url(${a.sora});font-weight:700}` : ''}
      ${a.body ? `@font-face{font-family:SG;src:url(${a.body});font-weight:400}` : ''}
      ${a.bodyB ? `@font-face{font-family:SG;src:url(${a.bodyB});font-weight:700}` : ''}
      ${a.mono ? `@font-face{font-family:SM;src:url(${a.mono})}` : ''}
      @page{size:Letter;margin:0} *{box-sizing:border-box} body{margin:0;font:400 11.5pt/1.5 SG,Arial,sans-serif;color:#111}
      .top{background:#0b0b0d;color:#fff;padding:26px 40px;display:flex;align-items:center;gap:16px;border-bottom:6px solid #7d39eb}
      .top img{width:58px;height:58px} .top .n{font:700 20pt Sora,Arial;letter-spacing:-.02em} .top .w{font:9pt SM,monospace;letter-spacing:.12em;color:#c6ff33}
      .top .doc{margin-left:auto;text-align:right} .top .doc b{display:block;font:700 18pt Sora,Arial} .top .doc span{font:9.5pt SM,monospace;color:#cfcfd8}
      .wrap{padding:28px 40px} .row{display:flex;gap:30px;margin-bottom:22px} .row>div{flex:1}
      .lab{font:8.5pt SM,monospace;letter-spacing:.1em;text-transform:uppercase;color:#6a28d9;margin-bottom:4px}
      table{width:100%;border-collapse:collapse;margin-top:6px} th{font:8.5pt SM,monospace;letter-spacing:.08em;text-transform:uppercase;text-align:left;border-bottom:2px solid #111;padding:8px 6px}
      td{padding:9px 6px;border-bottom:1px solid #ddd;vertical-align:top} .r{text-align:right;white-space:nowrap}
      .tot{width:290px;margin-left:auto;margin-top:14px} .tot div{display:flex;justify-content:space-between;padding:4px 0} .tot .big{border-top:2px solid #111;margin-top:6px;padding-top:8px;font:700 15pt Sora,Arial}
      .box{background:#f3f0fb;border-left:4px solid #7d39eb;padding:12px 14px;border-radius:4px;white-space:pre-wrap;margin-top:18px}
      .foot{position:fixed;bottom:0;left:0;right:0;padding:14px 40px;font:8.5pt SM,monospace;color:#555;border-top:1px solid #ddd;display:flex;justify-content:space-between}
      .firmas{display:flex;gap:24px;margin-top:30px;flex-wrap:wrap} .firma{flex:1;min-width:200px;border-top:1px solid #111;padding-top:6px;font-size:9.5pt}
      .firma img{height:70px;display:block;margin-bottom:-6px} .firma b{display:block;font-size:11pt} .firma .h{font:7.5pt SM,monospace;color:#666;word-break:break-all}
      .kpis{display:flex;gap:12px;margin:10px 0 18px} .kpis div{flex:1;background:#f3f0fb;border-radius:6px;padding:10px 12px} .kpis b{display:block;font:700 16pt Sora,Arial}
      h3{font:700 12.5pt Sora,Arial;margin:16px 0 4px}
      .stamp{display:inline-block;border:2px solid #0f8a57;color:#0f8a57;font:700 11pt Sora,Arial;padding:4px 12px;border-radius:6px;transform:rotate(-4deg)}
    </style></head><body>
      <div class="top">${a.logo ? `<img src="${a.logo}">` : ''}<div><div class="n">${esc(s.empresa || 'Delirium Studios')}</div><div class="w">${esc((s.web || 'staydelirious.com').toUpperCase())}</div></div>
        <div class="doc"><b>${esc(tipo)}</b><span>${esc(codigo || '')} · ${esc(D.date(fecha))}</span>${extra}</div></div>
      <div class="wrap">${inner}</div>
      <div class="foot"><span>${esc(s.correo_general || 'hola@staydelirious.com')} · ${esc(s.web || 'staydelirious.com')}${s.redes ? ' · ' + esc(s.redes) : ''}${s.telefono ? ' · ' + esc(s.telefono) : ''}${s.rif ? ' · RIF ' + esc(s.rif) : ''}</span><span>Stay delirious. ✦</span></div>
    </body></html>`;
  }
  const linesTable = (r) => `<table><thead><tr><th>Descripción</th><th class="r">Cant.</th><th class="r">Precio</th><th class="r">Subtotal</th></tr></thead><tbody>
    ${(r.lineas || []).map(l => `<tr><td>${esc(l.descripcion)}</td><td class="r">${l.cantidad}</td><td class="r">${D.money(l.precio)}</td><td class="r">${D.money(l.cantidad * l.precio)}</td></tr>`).join('')}</tbody></table>
    <div class="tot"><div><span>Subtotal</span><span>${D.money(r._subtotal)}</span></div>
    ${r._descuento ? `<div><span>Descuento (${r.descuento_pct}%)</span><span>− ${D.money(r._descuento)}</span></div>` : ''}
    ${r._impuesto ? `<div><span>${esc(D.settings.impuesto_nombre || 'Impuesto')} (${r.impuesto_pct}%)</span><span>${D.money(r._impuesto)}</span></div>` : ''}
    <div class="big"><span>Total</span><span>${D.money(r._total)}</span></div></div>`;
  const clientBlock = (r) => { const c = (D.refsFull.clientes || []).find(x => x.id === r.client_id) || {}; return `<div class="lab">Para</div><b>${esc(r._cliente || c.nombre || '')}</b>${c.empresa ? `<br>${esc(c.empresa)}` : ''}${c.rif ? `<br>RIF ${esc(c.rif)}` : ''}${c.email ? `<br>${esc(c.email)}` : ''}`; };

  const PARTE = { cliente: 'Por el cliente', estudio: 'Por Delirium Studios', contraparte: 'Contraparte' };
  const firmasHtml = (r) => (r.firmas || []).length ? `<div class="firmas">${r.firmas.map(f => `<div class="firma">${f.imagen ? `<img src="${f.imagen}">` : ''}<b>${esc(f.nombre)}</b>${PARTE[f.parte] || ''} · ${esc(D.datetime(f.fecha))}<div class="h">Huella del documento: ${esc(f.hash || '')}${f._valida === false ? ' · ATENCIÓN: el documento cambió después de esta firma' : ''}</div></div>`).join('')}</div>` : '';
  D._pdf = { loadAssets, shell, firmasHtml, linesTable };
  D.pdfCotizacion = async (r) => {
    const a = await loadAssets();
    const html = shell(a, { tipo: 'Cotización', codigo: r.codigo, fecha: r.fecha }, `
      <div class="row"><div>${clientBlock(r)}</div><div><div class="lab">Proyecto</div><b>${esc(r.titulo || '')}</b><br>Válida hasta: ${esc(D.date(r.vence))}<br>Rondas de cambios incluidas: ${esc(r.rondas_incluidas ?? '—')}</div></div>
      ${linesTable(r)}${r.notas ? `<div class="box"><div class="lab">Condiciones</div>${esc(r.notas)}</div>` : ''}${firmasHtml(r)}`);
    return D.try(() => window.dos.pdf(html, `${r.codigo} - ${r._cliente || 'cotizacion'}`).then(x => { if (x.error) throw new Error(x.error); return x.data; }));
  };
  D.pdfFactura = async (r) => {
    const a = await loadAssets();
    const pagos = (r.pagos || []).filter(p => p.estado === 'Verificado');
    const html = shell(a, { tipo: 'Factura', codigo: r.codigo, fecha: r.fecha, extra: r._estado === 'Cancelada' ? '<div style="margin-top:6px"><span class="stamp">CANCELADA</span></div>' : '' }, `
      <div class="row"><div>${clientBlock(r)}</div><div><div class="lab">Concepto</div><b>${esc(r.concepto || '')}</b>${r._proyecto ? `<br>Proyecto: ${esc(r._proyecto)}` : ''}<br>Vence: ${esc(D.date(r.vence))}</div></div>
      ${linesTable(r)}
      ${pagos.length ? `<div style="margin-top:18px"><div class="lab">Pagos recibidos</div><table><tbody>${pagos.map(p => `<tr><td>${esc(D.date(p.fecha))}</td><td>${esc(p.metodo)}${p.referencia ? ' · ref. ' + esc(p.referencia) : ''}</td><td class="r">${D.money(p.monto)}</td></tr>`).join('')}</tbody></table>
        <div class="tot"><div class="big"><span>Saldo pendiente</span><span>${D.money(r._saldo)}</span></div></div></div>` : ''}
      ${r.notas ? `<div class="box"><div class="lab">Datos de pago y condiciones</div>${esc(r.notas)}</div>` : ''}`);
    return D.try(() => window.dos.pdf(html, `${r.codigo} - ${r._cliente || 'factura'}`).then(x => { if (x.error) throw new Error(x.error); return x.data; }));
  };
  D.pdfRecibo = async (r) => {
    const a = await loadAssets();
    const html = shell(a, { tipo: 'Recibo de pago', codigo: r.periodo, fecha: r.fecha_pago || D.today() }, `
      <div class="row"><div><div class="lab">Trabajador</div><b>${esc(r._usuario_id || '')}</b></div><div><div class="lab">Período</div><b>${esc(r.periodo)}</b><br>Estado: ${esc(r.estado)}${r.metodo ? `<br>Método: ${esc(r.metodo)}` : ''}</div></div>
      <table><tbody><tr><td>Salario base del período</td><td class="r">${D.money(r.base)}</td></tr><tr><td>Bonos</td><td class="r">${D.money(r.bonos)}</td></tr><tr><td>Deducciones</td><td class="r">− ${D.money(r.deducciones)}</td></tr></tbody></table>
      <div class="tot"><div class="big"><span>Neto a pagar</span><span>${D.money(r.neto)}</span></div></div>
      ${r.nota ? `<div class="box">${esc(r.nota)}</div>` : ''}
      <div class="row" style="margin-top:70px"><div style="border-top:1px solid #111;padding-top:6px">Firma del trabajador</div><div style="border-top:1px solid #111;padding-top:6px">Por Delirium Studios</div></div>`);
    return D.try(() => window.dos.pdf(html, `Recibo ${r.periodo} - ${r._usuario_id || ''}`).then(x => { if (x.error) throw new Error(x.error); return x.data; }));
  };
  D.pdfConstancia = async (r) => {
    const a = await loadAssets();
    const html = shell(a, { tipo: 'Constancia de firma', codigo: r.tipo || 'Contrato', fecha: r.fecha_firma || D.today() }, `
      <div class="row"><div><div class="lab">Documento</div><b>${esc(r.titulo)}</b><br>Tipo: ${esc(r.tipo || '—')}${r.inicio ? `<br>Inicio: ${esc(D.date(r.inicio))}` : ''}${r.vence ? `<br>Vence: ${esc(D.date(r.vence))}` : ''}</div>
        <div><div class="lab">Partes</div><b>${esc(D.settings.empresa || 'Delirium Studios')}</b><br>${esc(r._cliente || r.contraparte || '')}</div></div>
      ${r.notas ? `<div class="box"><div class="lab">Cláusulas</div>${esc(r.notas)}</div>` : ''}
      ${r.enlace ? `<p style="margin-top:14px">Documento completo: ${esc(r.enlace)}</p>` : ''}
      <p style="font-size:9.5pt;color:#444;margin-top:18px">Las partes firmaron electrónicamente en Delirium OS dibujando su firma y aceptando el contenido. La huella (SHA-256) identifica el texto exacto que se firmó: si el documento cambia, la huella deja de coincidir.</p>
      ${firmasHtml(r)}`);
    return D.try(() => window.dos.pdf(html, `Constancia de firma - ${r.titulo}`).then(x => { if (x.error) throw new Error(x.error); return x.data; }));
  };
  D.pdfReporte = async (d) => {
    const a = await loadAssets(); const [y, m] = d.mes.split('-');
    const mesTxt = `${D.MESES_LARGOS[Number(m) - 1]} ${y}`;
    const fila = (cols, der = []) => `<tr>${cols.map((c, i) => `<td class="${der.includes(i) ? 'r' : ''}">${typeof c === 'number' ? D.num(c) : c}</td>`).join('')}</tr>`;
    const html = shell(a, { tipo: 'Reporte mensual', codigo: mesTxt, fecha: d.generado }, `
      <div class="row"><div><div class="lab">Cliente</div><b style="font-size:15pt">${esc(d.cliente)}</b></div><div><div class="lab">Período</div><b style="text-transform:capitalize">${esc(mesTxt)}</b></div></div>
      <div class="kpis"><div>Piezas aprobadas<b>${d.piezas.length}</b></div><div>Publicaciones<b>${d.publicaciones.publicadas} / ${d.publicaciones.planificadas}</b></div><div>Alcance orgánico<b>${D.num(d.publicaciones.alcance)}</b></div><div>Inversión en anuncios<b>${D.money(d.gasto_anuncios)}</b></div></div>
      ${d.proyectos.length ? `<h3>Proyectos</h3><table><thead><tr><th>Proyecto</th><th>Estado</th><th class="r">Avance</th><th>Rondas</th><th>Entrega</th></tr></thead><tbody>${d.proyectos.map(p => fila([esc(p.nombre), esc(p.estado), `${p.avance}%`, esc(p.rondas), esc(D.date(p.entrega))], [2])).join('')}</tbody></table>` : ''}
      ${d.publicaciones.lista.length ? `<h3>Publicaciones del mes</h3><table><thead><tr><th>Publicación</th><th>Fecha</th><th>Redes</th><th class="r">Alcance</th><th class="r">Interacciones</th></tr></thead><tbody>${d.publicaciones.lista.map(p => fila([esc(p.titulo), esc(D.datetime(p.fecha)), esc(p.redes), p.alcance, p.interacciones], [3, 4])).join('')}</tbody></table>` : ''}
      ${d.campanas.length ? `<h3>Campañas de anuncios</h3><table><thead><tr><th>Campaña</th><th>Plataforma</th><th class="r">Inversión</th><th class="r">Resultados</th><th class="r">Costo por resultado</th></tr></thead><tbody>${d.campanas.map(c => fila([esc(c.nombre), esc(c.plataforma), D.money(c.gastado), `${D.num(c.resultados)} ${esc(c.tipo_resultado)}`, c.cpr !== null && c.cpr !== undefined ? D.money(c.cpr) : '—'], [2, 3, 4])).join('')}</tbody></table>` : ''}
      ${d.piezas.length ? `<h3>Piezas aprobadas</h3><table><tbody>${d.piezas.map(p => fila([esc(p.titulo), esc(p.tipo || ''), `v${p.version || 1}`], [2])).join('')}</tbody></table>` : ''}
      <h3>Pagos y solicitudes</h3><div class="kpis"><div>Pagos recibidos en el mes<b>${D.money(d.facturas.pagado_mes)}</b></div><div>Saldo pendiente<b>${D.money(d.facturas.saldo)}</b></div><div>Solicitudes del mes<b>${d.solicitudes.abiertas}</b>${d.solicitudes.resueltas} resueltas</div></div>`);
    return D.try(() => window.dos.pdf(html, `Reporte ${d.mes} - ${d.cliente}`).then(x => { if (x.error) throw new Error(x.error); return x.data; }));
  };
})(window.DOS);
