// Delirium OS — módulos de la versión 1.3: evaluaciones, órdenes de compra y bóveda de contraseñas.
(function (D) {
  const users = () => (D.directory || []).map(p => ({ value: p.id, label: `${p.nombre} · ${p.rol_label}` }));
  const ref = (mod) => () => (D.refs[mod] || []).map(r => ({ value: r.id, label: r.nombre }));
  const nota = (k, l) => ({ key: k, label: l, type: 'select', options: [{ value: 5, label: '5 · Excelente' }, { value: 4, label: '4 · Muy bien' }, { value: 3, label: '3 · Bien' }, { value: 2, label: '2 · Por mejorar' }, { value: 1, label: '1 · Necesita apoyo' }] });
  const estrellas = (n) => n ? `<span class="stars" title="${n} de 5">${'★'.repeat(Math.round(n))}${'☆'.repeat(5 - Math.round(n))}</span> <b>${n}</b>` : '—';
  Object.assign(D.SCHEMA, {
    evaluaciones: {
      singular: 'evaluación', plural: 'evaluaciones', nuevo: 'Nueva evaluación', help: 'Evaluaciones del equipo por período: puntajes, fortalezas, qué mejorar y objetivos. La persona la ve cuando la compartes y puede responder.',
      vacio: ['Sin evaluaciones', 'Evalúa a las personas de tu equipo cada semestre o al terminar un proyecto grande.'],
      filtro: { key: 'estado', values: ['Borrador', 'Compartida', 'Conversada'] },
      columns: [
        { key: '_usuario_id', label: 'Persona', render: r => `${D.esc(r._usuario_id || '')}<span class="sub">${D.esc(r.periodo || '')}</span>` },
        { key: '_promedio', label: 'Promedio', render: r => estrellas(r._promedio) },
        { key: 'evaluador', label: 'Evaluó' }, { key: 'estado', label: 'Estado', render: r => D.badge(r.estado) },
      ],
      fields: [
        { key: 'usuario_id', label: 'Persona evaluada', type: 'select', options: users, required: true },
        { key: 'periodo', label: 'Período', required: true, placeholder: 'Ej.: 2026 · 2do semestre' },
        nota('calidad', 'Calidad del trabajo'), nota('puntualidad', 'Puntualidad y entregas'), nota('comunicacion', 'Comunicación'), nota('creatividad', 'Creatividad e iniciativa'), nota('equipo', 'Trabajo en equipo'),
        { key: 'fortalezas', label: 'Fortalezas', type: 'textarea' }, { key: 'mejorar', label: 'Qué puede mejorar', type: 'textarea' },
        { key: 'objetivos', label: 'Objetivos para el próximo período', type: 'textarea' },
        { key: 'estado', label: 'Estado', type: 'select', options: ['Borrador', 'Compartida', 'Conversada'], default: 'Borrador', hint: 'En borrador solo la ves tú. "Compartida" hace que la persona la vea.' },
      ],
    },
    compras: {
      singular: 'orden', plural: 'órdenes', nuevo: 'Nueva orden de compra', help: 'Pedidos a proveedores (serigrafía, bordados, pines…). Al recibir la mercancía, el stock sube solo y, si quieres, se registra el gasto.',
      vacio: ['Sin órdenes de compra', 'Crea una orden para pedirle productos a un proveedor, o usa "Sugerir por stock bajo".'],
      filtro: { key: 'estado', values: ['Borrador', 'Enviada', 'Recibida', 'Cancelada'] },
      columns: [
        { key: 'codigo', label: 'N°', render: r => `<span class="mono">${D.esc(r.codigo || '')}</span>` },
        { key: '_proveedor', label: 'Proveedor', render: r => `${D.esc(r._proveedor || '')}<span class="sub">${(r.lineas || []).length} productos</span>` },
        { key: '_total', label: 'Total', num: true, render: r => D.money(r._total) },
        { key: 'estado', label: 'Estado', render: r => D.badge(r.estado) },
        { key: 'entrega', label: 'Llega', render: r => r.entrega ? `${D.date(r.entrega)}<span class="sub">${D.rel(r.entrega)}</span>` : '—' },
      ],
      fields: [
        { key: 'supplier_id', label: 'Proveedor', type: 'select', options: ref('proveedores'), required: true },
        { key: 'estado', label: 'Estado', type: 'select', options: ['Borrador', 'Enviada', 'Cancelada'], default: 'Borrador' },
        { key: 'fecha', label: 'Fecha', type: 'date', default: () => D.today() }, { key: 'entrega', label: 'Llega aproximadamente', type: 'date' },
        { key: 'lineas', label: 'Productos', type: 'lines', source: 'productos' },
        { key: 'nota', label: 'Indicaciones para el proveedor', type: 'textarea', placeholder: 'Pantone, gramaje, tallas, empaque…' },
        { key: 'notas_internas', label: 'Notas internas', type: 'textarea' },
      ],
    },
    boveda: {
      singular: 'acceso', nuevo: 'Nuevo acceso', help: 'Contraseñas del estudio y de las cuentas de clientes, cifradas en tu equipo con la clave maestra: ni la nube ni Supabase pueden leerlas. Solo las ve quien tenga la clave maestra y el acceso compartido.',
      vacio: ['La bóveda está vacía', 'Guarda aquí las contraseñas de redes, herramientas y clientes en vez de mandarlas por chat.'],
      filtro: { key: 'categoria', values: ['Redes de clientes', 'Herramientas', 'Correo', 'Bancos y pagos', 'Hosting y dominios', 'Juegos y tiendas', 'Otro'] },
      columns: [
        { key: 'nombre', label: 'Acceso', render: r => `${D.esc(r.nombre)}<span class="sub">${D.esc(r.url || '')}</span>` },
        { key: 'usuario', label: 'Usuario' }, { key: 'categoria', label: 'Categoría' },
        { key: '_compartido', label: 'Lo ven', render: r => (r.compartido_con || []).length ? `Dirección + ${(r.compartido_con || []).length}` : 'Solo Dirección' },
      ],
      fields: [
        { key: 'nombre', label: 'Nombre', required: true, full: true, placeholder: 'Ej.: Instagram Café Nocturno' },
        { key: 'categoria', label: 'Categoría', type: 'select', options: ['Redes de clientes', 'Herramientas', 'Correo', 'Bancos y pagos', 'Hosting y dominios', 'Juegos y tiendas', 'Otro'], default: 'Herramientas' },
        { key: 'url', label: 'Página de acceso' }, { key: 'usuario', label: 'Usuario o correo' },
        { key: 'client_id', label: 'Cliente', type: 'select', options: ref('clientes') },
        { key: 'compartido_con', label: 'Compartir con', type: 'users', hint: 'Dirección siempre lo ve. Las demás personas necesitan además la clave maestra.' },
      ],
    },
  });
  D.estrellas = estrellas;
  // campos nuevos en módulos existentes
  const add = (mod, after, ...fields) => { const fs = D.SCHEMA[mod].fields; const i = fs.findIndex(f => f.key === after); fs.splice(i + 1, 0, ...fields); };
  add('contratos', 'estado', { key: 'pedir_firma', label: 'Pedir firma al cliente en su portal', type: 'checkbox', show: () => !['cliente', 'cliente_eq'].includes(D.me.rol) });
  add('productos', 'stock_minimo', { key: 'publicar_tienda', label: 'Mostrar en la tienda online', type: 'checkbox' }, { key: 'imagen', label: 'Foto para la tienda', type: 'file', hint: 'Una foto clara del producto (JPG o PNG).' });
})(window.DOS);
