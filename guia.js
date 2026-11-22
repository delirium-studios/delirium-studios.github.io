// Delirium OS — guía, recorrido de bienvenida y videos tutoriales.
// GUIA: para qué sirve cada sección, cómo se usa y un consejo. VIDEOS: tutoriales grabados del programa.
// D.tour(pasos): resalta una parte de la pantalla y la explica (se usa en el recorrido y en los videos).
(function (D) {
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const GUIA = {
    inicio: { para: 'Tu resumen del día: tus tareas, las entregas de la semana, lo que falta cobrar, las alertas y lo que espera tu respuesta.', pasos: ['Revísalo al empezar el día.', 'Pulsa cualquier tarjeta o alerta para ir directo a ella.', 'Las alertas en rojo son lo primero que hay que resolver.'], consejo: 'Si eres cliente, aquí está tu portal: lo que espera tu aprobación, tus proyectos y tus pagos.', video: 'bienvenida' },
    guia: { para: 'Esta guía: qué hace cada sección, dónde está y videos cortos para aprender a usar Delirium OS.', pasos: ['Mira primero el video de bienvenida.', 'Busca una sección por su nombre.', 'Pulsa "Hacer el recorrido" para repetir el tour de la primera vez.'], consejo: 'En cada pantalla, el botón ? de arriba a la derecha explica esa pantalla.' },
    clientes: { para: 'La libreta de clientes: a quién falta contactar, con quién ya se habló y quiénes son clientes actuales. Cada cliente tiene su ficha completa.', pasos: ['"Nuevo cliente" para agregar uno (solo el nombre es obligatorio).', 'Arrastra la tarjeta entre columnas para cambiar su estado: Por contactar → Contactado → Propuesta enviada → Actual.', 'Abre un cliente para ver todo lo suyo: servicios, redes y métricas, proyectos, calendario, anuncios, piezas, cobros, contratos y solicitudes.', 'En "Editar" marca los servicios que tiene con nosotros y su kit de marca.', '"Anotar contacto" guarda cada llamada, mensaje o reunión.'], consejo: 'La temperatura (caliente, tibio, frío) dice qué tan listo está para comprar. Las notas internas nunca las ve el cliente.', video: 'clientes' },
    recordatorios: { para: 'Avisos para no olvidar llamar, escribir o responder a alguien.', pasos: ['Crea un recordatorio con fecha y a quién va.', 'Márcalo como hecho cuando lo hagas.'], consejo: 'Los vencidos aparecen en tu Inicio.' },
    cotizaciones: { para: 'Propuestas de precio para clientes, con PDF, firma y conversión a proyecto y factura.', pasos: ['"Nueva cotización": elige el cliente y agrega líneas desde el catálogo.', 'Descarga el PDF o pide la firma del cliente.', 'Cuando la aprueban, conviértela en proyecto y factura con un clic.'], consejo: 'Las rondas de cambios incluidas pasan al proyecto: lo que exceda se cobra aparte.', video: 'finanzas' },
    catalogo: { para: 'Todos los servicios que vende el estudio, con precio, entregables, plazo y rondas incluidas.', pasos: ['Agrega cada servicio una vez.', 'Úsalo para cotizar en segundos.', 'Abre un servicio para ver qué clientes lo tienen.'], consejo: 'Si cambias un precio aquí, las cotizaciones viejas no cambian.', video: 'clientes' },
    soporte: { para: 'Las solicitudes de los clientes: cambios, dudas y pedidos. El cliente escribe desde su portal y el equipo responde aquí.', pasos: ['Abre la solicitud y responde abajo.', 'Usa "nota interna" para hablar con el equipo sin que el cliente lo vea.', 'Cambia el estado: Nuevo → En atención → Resuelto.'], consejo: 'Las que nadie ha respondido salen como alerta en el Inicio.' },
    proyectos: { para: 'Cada trabajo con su equipo, fechas, avance y rondas de cambios.', pasos: ['"Nuevo proyecto": cliente, servicio, fechas, equipo y rondas incluidas.', 'Agrega tareas y piezas desde el proyecto.', 'El avance se calcula solo con las tareas hechas.', 'El cliente aprueba la entrega desde su portal.'], consejo: 'Solo el equipo asignado y Dirección ven el proyecto.', video: 'proyectos' },
    tareas: { para: 'Lo que hay que hacer, de quién es y para cuándo.', pasos: ['Crea la tarea dentro de un proyecto o suelta.', 'Asígnala a una persona con fecha límite.', 'Muévela en el tablero: Por hacer → En curso → Hecha.'], consejo: 'Tus tareas pendientes salen en tu Inicio.', video: 'proyectos' },
    piezas: { para: 'Los diseños, videos y archivos que se entregan, con versiones y aprobación del cliente.', pasos: ['Sube la pieza con su enlace o archivo.', 'Revisión interna: Dirección creativa aprueba o pide cambios.', 'Luego pasa al cliente, que aprueba o pide cambios desde su portal.', 'Cada ronda de cambios cuenta contra las incluidas en el proyecto.'], consejo: 'Sube la versión nueva en la misma pieza: el número de versión sube solo.', video: 'proyectos' },
    calendario: { para: 'Tu calendario: eventos, entregas, publicaciones, cobros y ausencias en un solo lugar.', pasos: ['Cambia entre mes y semana.', 'Pulsa un día para crear un evento.', 'Pulsa un elemento para abrirlo.'], consejo: 'Cada persona ve solo lo que le toca.' },
    horas: { para: 'Las horas dedicadas a cada proyecto, para saber cuánto deja cada trabajo.', pasos: ['Usa el cronómetro de abajo a la izquierda mientras trabajas.', 'O registra las horas a mano con proyecto y descripción.'], consejo: 'Reportes usa estas horas para calcular el margen de cada proyecto.', video: 'proyectos' },
    redes: { para: 'El calendario de contenido de cada cliente: idea, diseño, aprobación, publicación automática y resultados.', pasos: ['"Nueva publicación": cliente, fecha, redes, copy y la pieza o el archivo.', '"Enviar al cliente para aprobar": el cliente aprueba o pide cambios desde su portal.', 'Marca "Publicar automáticamente" y Delirium OS la publica a la hora en Instagram, Facebook o TikTok.', 'Cuando sale, quedan el enlace y los resultados en la publicación.'], consejo: 'Si una publicación falla, se reintenta sola y avisa en Discord.', video: 'redes' },
    anuncios: { para: 'Las campañas pagadas de cada cliente con presupuesto, gasto y resultados.', pasos: ['Crea la campaña con presupuesto y fechas.', 'Si el cliente tiene su cuenta de Meta conectada, el gasto y los resultados llegan solos.'], consejo: 'Avisa cuando una campaña llega al 80 % del presupuesto.' },
    metricas: { para: 'Los resultados de las cuentas completas de cada cliente: alcance, vistas, interacciones, engagement, seguidores, audiencia y mejores publicaciones.', pasos: ['Filtra por cliente, red y período.', 'Las flechas comparan con el período anterior.', '"Exportar" baja los datos en CSV para Excel o Google Sheets.', 'Se actualiza sola cada 6 horas; "Actualizar ahora" la trae al momento.'], consejo: '"—" significa que esa red no da ese dato, no que sea cero.', video: 'metricas' },
    hoy: { para: 'La prospección del día: mensajes nuevos por enviar, seguimientos que tocan, meta diaria, embudo semanal e importación de listas.', pasos: ['"Copiar" pone el mensaje con el nombre, el negocio y el detalle del prospecto.', '"Abrir perfil" abre su Instagram (o WhatsApp). Envías tú el mensaje.', '"Enviado" suma al contador y agenda solo el seguimiento (+3 y +7 días).', '"Más…" para marcar que respondió, agendó llamada o descartarlo con su motivo.', 'Pestaña "Importar prospectos" para cargar un CSV o Excel sin duplicados.'], consejo: 'Nunca automatices mensajes directos: Instagram bloquea la cuenta. El campo "Detalle" personalizado sube mucho las respuestas.' },
    plantillas: { para: 'Los mensajes base de prospección por tipo de prospecto y paso, en español o inglés.', pasos: ['Escribe el mensaje con [nombre], [negocio], [ciudad] y [detalle].', 'Elige el paso (primer mensaje, seguimiento a 3 o 7 días) y para qué tipo.'], consejo: 'Mensajes cortos, en tono humano y con algo específico de su cuenta.' },
    pagos_equipo: { para: 'Lo que se le debe al equipo: pagos por pieza a freelancers y comisiones de quien trajo a cada cliente.', pasos: ['Los pagos por pieza aparecen cuando se aprueba una pieza con "Costo de producción".', 'Se habilitan cuando el cliente pagó ese mes.', 'Las comisiones salen solas de los pagos verificados de clientes con "Traído por".', '"Marcar pagado" cuando transfieras.'], consejo: 'Cada persona ve solo lo suyo; Finanzas y Dirección ven todo.' },
    margen: { para: 'Cuánto deja cada cliente cada mes: cobrado menos producción y comisiones.', pasos: ['Elige el mes arriba a la derecha.', 'Un margen en rojo es un cliente que cuesta más de lo que paga.'], consejo: 'Solo lo ven el CEO, el COO y Finanzas.' },
    metas: { para: 'Los objetivos de cada cliente en redes (seguidores, alcance, interacciones, engagement…) con el avance calculado solo con las métricas reales.', pasos: ['"Nueva meta": cliente, red, qué se mide, el número y las fechas.', 'La barra compara lo logrado con el tiempo que pasó: "En camino", "Atrasada" o "Cumplida".', 'Abre una meta para ver dónde terminaría si sigue al mismo ritmo.', 'Las metas atrasadas avisan en Inicio y salen en el reporte del cliente.'], consejo: 'Para engagement escribe el porcentaje (ej.: 4,5). Para seguidores, el total al que quieres llegar.' },
    bandeja: { para: 'Los comentarios y mensajes de Instagram y Facebook de todos los clientes en un solo lugar.', pasos: ['"Sin responder" es lo pendiente: responde ahí mismo y se publica en la red.', '"Ocultar" esconde un comentario ofensivo (solo lo ve quien lo escribió).', '"Marcar resuelto" cuando no hace falta responder.', 'Se revisa sola cada 20 minutos; "Actualizar ahora" la trae al momento.'], consejo: 'Los mensajes directos solo se pueden responder dentro de las 24 horas del último mensaje del cliente (regla de Meta). En TikTok llegan solo comentarios (máximo 150 caracteres por respuesta) una vez que conectas su bandeja. Los comentarios negativos salen marcados en rojo y avisan en Inicio.' },
    informes: { para: 'El PDF de resultados para cada cliente con todo: redes, métricas, mejores publicaciones, audiencia, mejor hora, metas, publicaciones, anuncios, proyectos y pagos en su moneda.', pasos: ['Elige cliente y período (mes pasado, últimos 30 días…).', 'Marca qué secciones incluir y escribe tus notas para el cliente.', '"Vista previa" para revisarlo; "Descargar PDF" para guardarlo.', 'A inicio de mes, "PDF de todos los clientes" crea todos en una carpeta.'], consejo: 'El cliente también puede bajar su reporte desde su portal (sin las notas internas).' },
    carga: { para: 'Cuánto trabajo tiene cada persona en las próximas semanas frente a sus horas disponibles.', pasos: ['Mira quién está "Saturado" y quién tiene espacio.', 'Pulsa una persona para ver sus tareas y reasignar.', 'Cambia entre 1 y 4 semanas.'], consejo: 'Para que sea exacto, pon horas estimadas en las tareas y las horas por semana en Fichas del personal.' },
    cuentas: { para: 'Las cuentas de Instagram, Facebook y TikTok de cada cliente conectadas a Delirium OS para publicar y medir.', pasos: ['"Conectar una red": elige la red y el cliente.', '"Conectar ahora" si tienes el acceso, o "Enlace para el cliente" para que la conecte él.', 'Abre la cuenta para ver sus últimos 30 días.'], consejo: 'Si una cuenta sale "Vencida", pulsa "Volver a conectar".', video: 'metricas' },
    juegos: { para: 'Los juegos del estudio por etapas, con hitos, wishlists, tareas por disciplina y métricas de jugadores.', pasos: ['Crea el juego y avanza por las 6 etapas.', 'Marca los pendientes de cada etapa.', 'Las métricas de jugadores llegan solas cuando el juego las envía.'], consejo: 'Los bugs y las llaves se ligan al juego.' },
    bugs: { para: 'Los errores de los juegos y apps, con gravedad, pasos para reproducir y origen.', pasos: ['Crea el bug con pasos claros.', 'Muévelo: Nuevo → Confirmado → En arreglo → Arreglado → Verificado.'], consejo: 'Los reportes de Discord entran solos con sus votos.' },
    llaves: { para: 'Las llaves de los juegos y a qué creador se entregaron.', pasos: ['Carga las llaves en bloque.', 'Asigna una llave a un streamer o creador.', 'Anota la cobertura que hizo.'], consejo: 'Cada llave se entrega una sola vez.' },
    facturas: { para: 'Las facturas de los clientes y sus pagos.', pasos: ['Crea la factura o conviértela desde una cotización.', 'El cliente reporta el pago (Pago Móvil, Zelle…) desde su portal.', 'Finanzas lo verifica y la factura se marca sola como pagada.'], consejo: 'Lo que falta cobrar sale en el Inicio y en la ficha de cada cliente.', video: 'finanzas' },
    planes: { para: 'Los cobros recurrentes: planes mensuales y alquileres de bots o sistemas.', pasos: ['Crea el plan con monto, frecuencia y próximo cobro.', 'Elige el servicio del catálogo al que corresponde.', 'Factura el mes con un clic.'], consejo: 'La ficha del cliente muestra cuánto deja al mes.', video: 'finanzas' },
    gastos: { para: 'Los gastos del estudio con su aprobación.', pasos: ['Cada persona sube su gasto con el comprobante.', 'Finanzas lo aprueba o lo rechaza.'], consejo: 'Los aprobados entran a Reportes.' },
    reportes: { para: 'Ingresos, merch, gastos, nómina y margen de cada proyecto, mes a mes.', pasos: ['Cambia el año con las flechas.', 'Pulsa un proyecto para ver su detalle.'], consejo: 'Solo lo ve Dirección y Finanzas.', video: 'finanzas' },
    pedidos: { para: 'Los pedidos de merch, también los que llegan de la tienda online.', pasos: ['Crea el pedido o recíbelo de la tienda.', 'Al marcarlo pagado se descuenta el stock.'], consejo: 'Los estados: Nuevo → Pagado → Enviado → Entregado.' },
    productos: { para: 'Los productos de merch con precio y stock.', pasos: ['Crea el producto con foto, precio y stock.', 'Marca "Publicar en la tienda" para venderlo online.'], consejo: 'Avisa cuando el stock baja del mínimo.' },
    movimientos: { para: 'Cada entrada y salida de stock, con su motivo.', pasos: ['Se registran solos con pedidos y compras.', 'Puedes hacer un ajuste a mano.'], consejo: 'Sirve para saber por qué cambió un stock.' },
    proveedores: { para: 'Los proveedores de merch e insumos.', pasos: ['Agrega el proveedor con su contacto.', 'Úsalo en las órdenes de compra.'], consejo: '' },
    compras: { para: 'Las órdenes de compra a proveedores.', pasos: ['Crea la orden (te sugiere lo que tiene stock bajo).', 'Al recibirla, sube el stock y se registra el gasto.'], consejo: '' },
    empleados: { para: 'La ficha de cada persona del equipo.', pasos: ['Datos personales, cargo, contrato y documentos.'], consejo: 'Solo lo ven Dirección y RR. HH.' },
    ausencias: { para: 'Vacaciones, permisos y ausencias con aprobación.', pasos: ['Pide la ausencia con fechas.', 'Tu responsable la aprueba o la rechaza.'], consejo: 'Las aprobadas salen en el calendario.' },
    nomina: { para: 'Los recibos de pago del equipo.', pasos: ['Crea el recibo del período.', 'Cada persona ve solo los suyos.'], consejo: '' },
    candidatos: { para: 'Reclutamiento: candidatos por etapa.', pasos: ['Agrega al candidato con su CV.', 'Muévelo por las etapas de la entrevista.'], consejo: '' },
    evaluaciones: { para: 'Las evaluaciones de desempeño del equipo.', pasos: ['Puntúa cada área y deja comentarios.', 'La persona la ve y responde.'], consejo: '' },
    contratos: { para: 'Contratos, autorizaciones de imagen y locación, permisos UGC y registros de marca, con firma electrónica.', pasos: ['Crea el contrato y adjunta el documento.', 'Pide la firma: el cliente firma en su portal.', 'Queda la constancia en PDF.'], consejo: 'Avisa antes de que venza.' },
    licencias: { para: 'Las licencias de software, música, fuentes y bancos de imágenes, con su vencimiento.', pasos: ['Registra cada licencia con su vencimiento.'], consejo: 'Avisa antes de que venza.' },
    manuales: { para: 'Protocolos, plantillas y guías del estudio. Algunos se pueden mostrar a los clientes.', pasos: ['Crea el manual con su contenido.', 'Elige quién lo ve: todos, solo dirección o también los clientes.'], consejo: '' },
    boveda: { para: 'Las contraseñas y accesos de los clientes y del estudio, cifradas.', pasos: ['Desbloquea con la clave maestra.', 'Comparte un acceso solo con quien lo necesita.'], consejo: 'Ni la nube puede leerlas: si se olvida la clave maestra no se recuperan.' },
    equipo: { para: 'Las cuentas del equipo y de los clientes, con su rol.', pasos: ['Crea la cuenta con su correo y rol.', 'El rol decide qué secciones ve.'], consejo: 'Un cliente solo ve lo de su empresa.' },
    actividad: { para: 'Quién hizo qué y cuándo: entradas, cambios, aprobaciones y borrados.', pasos: ['Busca por persona, sección o detalle.'], consejo: 'Solo lo ve Dirección.' },
    mapa: { para: 'Qué herramientas reemplaza Delirium OS, qué ya funciona y qué falta y por qué.', pasos: ['Revísalo para saber qué apps ya no hace falta pagar.'], consejo: '' },
    ajustes: { para: 'Datos del estudio, trabajo en línea, conexiones (Discord, Meta, GitHub), redes sociales, monedas y tasas, seguridad (verificación en dos pasos), tienda web y copias de seguridad.', pasos: ['Cambia lo necesario y pulsa "Guardar ajustes".'], consejo: 'Las claves secretas se pegan aquí, nunca en chats ni correos.' },
  };

  // Lo que lee un cliente en su portal (en vez del texto para el equipo)
  const GUIA_CLIENTE = {
    inicio: { para: 'Tu portal: lo que espera tu aprobación, tus proyectos, tus facturas y tus solicitudes.', pasos: ['Lo que está en naranja espera tu respuesta.', '"Mi reporte del mes" baja un PDF con todo lo del mes.', '"Pedir algo al equipo" para cualquier cambio o duda.'], consejo: 'Todo lo que apruebas queda registrado con fecha.', video: 'portal' },
    soporte: { para: 'Tus pedidos y dudas al equipo, con sus respuestas.', pasos: ['"Nueva" para escribir tu pedido.', 'Te avisamos aquí cuando respondemos.'], consejo: '' },
    proyectos: { para: 'Tus proyectos con su avance, la fecha de entrega y las rondas de cambios que quedan.', pasos: ['Abre un proyecto para ver su detalle.', 'Al terminar, pulsa "Aprobar entrega".'], consejo: 'Las rondas extra tienen costo adicional.' },
    piezas: { para: 'Los diseños y videos que esperan tu aprobación.', pasos: ['Abre la pieza y mírala.', '"Aprobar" o "Pedir cambios" con tus comentarios.'], consejo: 'Cada pedido de cambios usa una ronda.' },
    redes: { para: 'Tus publicaciones programadas en redes.', pasos: ['Revisa las que están "Por aprobar".', '"Aprobar publicación" o "Pedir cambios".'], consejo: 'Lo aprobado se publica solo a la hora indicada.' },
    metricas: { para: 'Los resultados de tus redes: alcance, interacciones, seguidores y tus mejores publicaciones.', pasos: ['Elige la red y el período.', '"Exportar" para bajar los datos.'], consejo: 'Se actualiza cada 6 horas.' },
    metas: { para: 'Los objetivos de tus redes que acordamos contigo y cuánto llevamos.', pasos: ['La barra muestra el avance frente al tiempo que pasó.'], consejo: 'Se calcula solo con los datos reales de tus cuentas.' },
    informes: { para: 'Tu reporte de resultados en PDF: redes, metas, publicaciones, anuncios, proyectos y pagos.', pasos: ['Elige el período.', '"Vista previa" o "Descargar PDF".'], consejo: '' },
    cuentas: { para: 'Tus redes conectadas con Delirium Studios.', pasos: ['Si te mandamos un enlace, ábrelo e inicia sesión en tu red para conectarla.'], consejo: 'Puedes desconectarla cuando quieras.' },
    anuncios: { para: 'Tus campañas pagadas: presupuesto, gasto y resultados.', pasos: ['Abre una campaña para ver su detalle.'], consejo: '' },
    facturas: { para: 'Tus facturas y pagos.', pasos: ['Abre la factura.', '"Reportar pago" con la referencia de tu Pago Móvil o Zelle.'], consejo: 'La marcamos pagada cuando lo verificamos.' },
    planes: { para: 'Tus planes mensuales con Delirium Studios.', pasos: ['Revisa el monto y la fecha del próximo cobro.'], consejo: '' },
    contratos: { para: 'Tus contratos y autorizaciones.', pasos: ['Abre el contrato y pulsa "Firmar" si te lo pedimos.'], consejo: 'Queda la constancia en PDF.' },
  };
  const VIDEOS = [
    { id: 'bienvenida', titulo: 'Bienvenida: dónde está cada cosa', para: 'Todos', modulos: ['inicio'], archivo: 'tutorial-bienvenida.mp4' },
    { id: 'clientes', titulo: 'Clientes, su ficha y los servicios', para: 'Ventas, cuentas y dirección', modulos: ['clientes', 'catalogo'], archivo: 'tutorial-clientes.mp4' },
    { id: 'proyectos', titulo: 'Proyectos, tareas, piezas y aprobaciones', para: 'Todo el equipo', modulos: ['proyectos', 'tareas', 'piezas'], archivo: 'tutorial-proyectos.mp4' },
    { id: 'redes', titulo: 'Calendario de redes y publicación automática', para: 'Social media y cuentas', modulos: ['redes'], archivo: 'tutorial-redes.mp4' },
    { id: 'metricas', titulo: 'Métricas de redes y cuentas conectadas', para: 'Marketing y social media', modulos: ['metricas', 'cuentas'], archivo: 'tutorial-metricas.mp4' },
    { id: 'finanzas', titulo: 'Cotizaciones, facturas y cobros', para: 'Finanzas, ventas y dirección', modulos: ['cotizaciones', 'facturas'], archivo: 'tutorial-finanzas.mp4' },
  ];
  const VIDEOS_CLIENTE = [{ id: 'portal', titulo: 'Tu portal de Delirium Studios', para: 'Clientes', modulos: ['inicio'], archivo: 'tutorial-portal.mp4' }];

  const esCliente = () => D.me && ['cliente', 'cliente_eq'].includes(D.me.rol);
  const visibles = () => (esCliente() ? VIDEOS_CLIENTE : VIDEOS).filter(v => v.modulos.some(m => D.canRead(m)));
  D.GUIA = GUIA; D.VIDEOS = VIDEOS;
  const G = (k) => (esCliente() && GUIA_CLIENTE[k]) || GUIA[k];
  D.ayudaCorta = (k) => (G(k) && G(k).para) || '';
  const videoSrc = (v) => `${v.archivo}`;
  const posterSrc = (v) => `${v.archivo.replace('.mp4', '.jpg')}`;

  D.verVideo = (id) => {
    const v = [...VIDEOS, ...VIDEOS_CLIENTE].find(x => x.id === id); if (!v) return;
    D.modal({ title: v.titulo, wide: true, body: `<video src="${videoSrc(v)}" poster="${posterSrc(v)}" controls autoplay playsinline style="width:100%;border-radius:12px;background:#000;display:block"></video><p class="small muted" style="margin:10px 0 0">Para: ${esc(v.para)}. Pausa cuando quieras; puedes verlo en pantalla completa.</p>` });
  };

  // ───── recorrido: resalta una parte de la pantalla y la explica ─────
  let TOUR = null;
  D.tour = (pasos, opts = {}) => new Promise((resolve) => {
    D.tourCerrar();
    const capa = document.createElement('div'); capa.className = 'tour'; capa.innerHTML = '<div class="tour-hueco"></div><div class="tour-card" role="dialog" aria-live="polite"></div>';
    document.body.appendChild(capa);
    const hueco = capa.querySelector('.tour-hueco'), card = capa.querySelector('.tour-card');
    let i = 0;
    const fin = (completo) => { D.tourCerrar(); if (opts.onFin) opts.onFin(completo); resolve(completo); };
    async function mostrar() {
      const p = pasos[i]; if (p.antes) { try { await p.antes(); } catch (e) {} await new Promise(r => setTimeout(r, p.espera || 350)); }
      const el = p.el ? (typeof p.el === 'function' ? p.el() : document.querySelector(p.el)) : null;
      if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
      const ultimo = i === pasos.length - 1;
      card.innerHTML = `<div class="tour-paso">${opts.etiqueta ? esc(opts.etiqueta) + ' · ' : ''}Paso ${opts.numero || i + 1} de ${opts.total || pasos.length}</div><h3>${esc(p.titulo)}</h3><p>${p.html || esc(p.texto)}</p>
        <div class="tour-acciones">${opts.sinBotones ? '' : `<button class="btn ghost sm" data-t="saltar">${ultimo ? '' : 'Saltar recorrido'}</button><span style="flex:1"></span>${i ? '<button class="btn sm" data-t="atras">Atrás</button>' : ''}<button class="btn violet sm" data-t="sig">${ultimo ? (opts.textoFin || 'Empezar') : 'Siguiente'}</button>`}</div>`;
      ubicar(el);
      card.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { if (b.dataset.t === 'saltar') fin(false); else if (b.dataset.t === 'atras') { i--; mostrar(); } else if (ultimo) fin(true); else { i++; mostrar(); } });
      const sig = card.querySelector('[data-t=sig]'); if (sig) sig.focus({ preventScroll: true });
      TOUR.el = el;
    }
    function ubicar(el) {
      const W = window.innerWidth, H = window.innerHeight; const cw = Math.min(360, W - 32);
      card.style.width = cw + 'px';
      if (!el) { hueco.style.cssText = `left:${W / 2}px;top:${H / 2}px;width:0;height:0`; const ch = card.offsetHeight; card.style.left = (W - cw) / 2 + 'px'; card.style.top = Math.max(16, (H - ch) / 2) + 'px'; return; }
      const r = el.getBoundingClientRect(); const m = 6;
      const x = Math.max(4, r.left - m), y = Math.max(4, r.top - m), w = Math.min(W - 8, r.width + m * 2), h = Math.min(H - 8, r.height + m * 2);
      hueco.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px`;
      const ch = card.offsetHeight; let left, top;
      if (x + w + 16 + cw < W) { left = x + w + 16; top = Math.min(Math.max(16, y), H - ch - 16); }
      else if (x - 16 - cw > 0) { left = x - 16 - cw; top = Math.min(Math.max(16, y), H - ch - 16); }
      else if (y + h + 16 + ch < H) { left = Math.min(Math.max(16, x), W - cw - 16); top = y + h + 16; }
      else { left = Math.min(Math.max(16, x), W - cw - 16); top = Math.max(16, y - ch - 16); }
      card.style.left = left + 'px'; card.style.top = top + 'px';
    }
    const onKey = (e) => { if (e.key === 'Escape') fin(false); else if (e.key === 'ArrowRight' || e.key === 'Enter') { const b = card.querySelector('[data-t=sig]'); if (b && document.activeElement && document.activeElement.tagName !== 'BUTTON') b.click(); } else if (e.key === 'ArrowLeft' && i) { i--; mostrar(); } };
    const onResize = () => ubicar(TOUR && TOUR.el);
    window.addEventListener('keydown', onKey); window.addEventListener('resize', onResize);
    TOUR = { capa, onKey, onResize, el: null, ir: (n) => { i = Math.max(0, Math.min(pasos.length - 1, n)); return mostrar(); } };
    mostrar();
  });
  D.tourCerrar = () => { if (!TOUR) return; window.removeEventListener('keydown', TOUR.onKey); window.removeEventListener('resize', TOUR.onResize); TOUR.capa.remove(); TOUR = null; };
  D.tourIr = (n) => TOUR && TOUR.ir(n);
  // Un solo paso sin botones: así se graban los videos tutoriales
  D.tourUno = (p, o = {}) => { const paso = p.bienvenida !== undefined ? D.pasosBienvenida()[p.bienvenida] : { el: p.el, titulo: p.titulo, texto: p.texto }; D.tour([paso], { sinBotones: true, ...o }); return String(paso.texto || paso.html || '').replace(/<[^>]+>/g, '').length; };

  const abrirGrupo = (nombre) => { const box = document.querySelector(`[data-gitems="${CSS.escape(nombre)}"]`); if (box && box.classList.contains('closed')) { box.classList.remove('closed'); const b = document.querySelector(`[data-group="${CSS.escape(nombre)}"]`); if (b) b.setAttribute('aria-expanded', 'true'); } if (box) box.scrollIntoView({ block: 'nearest' }); };
  const GRUPOS = {
    Comercial: 'Ventas y clientes: la libreta de clientes, recordatorios, cotizaciones, el catálogo de servicios y las solicitudes de los clientes.',
    'Operación': 'El trabajo del día: proyectos, tareas, piezas para aprobar, el calendario y las horas.',
    'Marketing y redes': 'Redes de los clientes: calendario de contenido, anuncios, métricas y cuentas conectadas.',
    Juegos: 'Los juegos del estudio: etapas, bugs y llaves para creadores.',
    Finanzas: 'Facturas y pagos, planes mensuales, gastos y reportes.',
    'Merch e inventario': 'Pedidos de merch, productos y stock, proveedores y compras.',
    Personas: 'El equipo: fichas, ausencias, nómina, reclutamiento y evaluaciones.',
    Legal: 'Contratos con firma electrónica y licencias.',
    'Equipo y sistema': 'Manuales, contraseñas, usuarios, actividad y ajustes.',
  };

  // El encabezado de un grupo del menú más sus secciones, como una sola zona a resaltar.
  const zonaGrupo = (g) => { const b = document.querySelector(`[data-group="${CSS.escape(g)}"]`), box = document.querySelector(`[data-gitems="${CSS.escape(g)}"]`); if (!b || !box) return null;
    return { getBoundingClientRect: () => { const a = b.getBoundingClientRect(), c = box.getBoundingClientRect(); const left = Math.min(a.left, c.left); return { left, top: a.top, width: Math.max(a.right, c.right) - left, height: Math.max(a.bottom, c.bottom) - a.top }; } }; };
  // Pasos del recorrido de bienvenida, según lo que ve cada rol.
  D.pasosBienvenida = () => {
    const cli = esCliente(); const nombre = (D.me.nombre || '').split(' ')[0];
    const grupos = [...new Set(D.meta.modules.map(m => m.group).filter(Boolean))];
    const pasos = [{ titulo: `¡Hola, ${nombre}! Bienvenido a Delirium OS`, texto: cli ? 'Este es tu portal con Delirium Studios. En un minuto te muestro dónde está todo.' : 'El sistema del estudio: clientes, proyectos, redes, cobros y más en un solo lugar. En un minuto te muestro dónde está cada cosa.' }];
    pasos.push({ el: '.sidebar .nav', titulo: 'El menú', texto: cli ? 'Aquí están las secciones de tu portal. Solo ves lo de tu empresa.' : 'Todas las secciones, agrupadas por área. Solo ves las que tu rol necesita: si te falta algo, pídelo a Dirección.' });
    for (const g of grupos) {
      const mods = D.meta.modules.filter(m => m.group === g).map(m => m.label);
      pasos.push({ el: () => zonaGrupo(g), antes: () => abrirGrupo(g), titulo: g, html: `${esc(GRUPOS[g] || '')}<span class="tour-lista">${mods.map(esc).join(' · ')}</span>` });
    }
    pasos.push({ el: '[data-palette]', titulo: 'Buscar', texto: 'Encuentra cualquier cliente, proyecto, factura o publicación escribiendo su nombre. Atajo: Ctrl + K.' });
    if (document.querySelector('[data-create]')) pasos.push({ el: '[data-create]', titulo: 'Crear', texto: 'El atajo para crear algo nuevo desde cualquier pantalla: un cliente, una tarea, una publicación…' });
    pasos.push({ el: '#view', antes: () => { if (location.hash !== '#/inicio') D.go('inicio'); }, espera: 700, titulo: cli ? 'Tu portal' : 'Tu inicio', texto: cli ? 'Lo que espera tu aprobación, tus proyectos, tus facturas y tus solicitudes. Lo que está en naranja espera tu respuesta.' : 'Tus tareas, las entregas de la semana, lo que falta cobrar y las alertas. Empieza el día aquí.' });
    if (document.querySelector('[data-timer]')) pasos.push({ el: '[data-timer]', titulo: 'Cronómetro de horas', texto: 'Inícialo cuando empieces a trabajar en un proyecto: las horas quedan registradas solas.' });
    pasos.push({ el: '.sidebar .me', titulo: 'Tu cuenta', texto: 'Cambia entre tema claro y oscuro, tu contraseña, o cierra la sesión.' });
    pasos.push({ el: '[data-nav="guia"]', antes: () => { const a = document.querySelector('[data-nav="guia"]'); if (a) a.scrollIntoView({ block: 'nearest' }); }, titulo: 'Guía y tutoriales', texto: 'Aquí están los videos y la explicación de cada sección. Y en cada pantalla, el botón ? de arriba a la derecha explica esa pantalla.' });
    pasos.push({ titulo: '¡Listo!', texto: 'Eso es todo. Puedes repetir este recorrido cuando quieras desde Guía y tutoriales.' });
    return pasos;
  };
  D.recorridoBienvenida = async (forzar) => {
    if (!D.me || (!forzar && D.me.tutorial)) return;
    const completo = await D.tour(D.pasosBienvenida(), { textoFin: 'Empezar' });
    try { await D.call('marcarTutorial', true); D.me.tutorial = new Date().toISOString(); } catch (e) {}
    return completo;
  };

  // ───── ayuda de cada pantalla (botón ?) ─────
  const ficha = (k) => { const g = G(k); if (!g) return ''; const v = g.video && visibles().find(x => x.id === g.video);
    return `<div class="guia-ficha"><p style="margin-top:0">${esc(g.para)}</p>${g.pasos && g.pasos.length ? `<div class="label" style="margin:10px 0 4px">Cómo se usa</div><ol class="guia-pasos">${g.pasos.map(p => `<li>${esc(p)}</li>`).join('')}</ol>` : ''}${g.consejo ? `<div class="note" style="margin-top:10px">💡 ${esc(g.consejo)}</div>` : ''}
      ${v ? `<button class="btn sm" data-video="${v.id}" style="margin-top:12px">${D.icon('play')} Ver el video: ${esc(v.titulo)}</button>` : ''}</div>`; };
  D.ayuda = (k) => {
    const m = D.meta.modules.find(x => x.key === k); if (!GUIA[k]) return;
    const root = D.drawer({ title: m ? m.label : 'Ayuda', subtitle: 'Cómo funciona esta pantalla', body: ficha(k) + `<div style="margin-top:18px"><button class="btn ghost sm" data-go-guia>Ver toda la guía</button></div>` });
    root.querySelectorAll('[data-video]').forEach(b => b.onclick = () => D.verVideo(b.dataset.video));
    const g = root.querySelector('[data-go-guia]'); if (g) g.onclick = () => { D.closeAll(); D.go('guia'); };
  };
  D.botonAyuda = (k) => {
    if (!GUIA[k] || k === 'guia') return; const acts = document.querySelector('#view .page-head .actions'); if (!acts || acts.querySelector('[data-ayuda]')) return;
    acts.insertAdjacentHTML('beforeend', `<button class="icon-btn ayuda-btn" data-ayuda title="¿Cómo funciona esta pantalla?" aria-label="Ayuda de esta pantalla">?</button>`);
    acts.querySelector('[data-ayuda]').onclick = () => D.ayuda(k);
  };

  // ───── página Guía y tutoriales ─────
  let GQ = '';
  D.views.guia = async (el) => {
    const vids = visibles(); const cli = esCliente();
    const grupos = []; for (const m of D.meta.modules.filter(x => GUIA[x.key] && x.key !== 'guia')) { let g = grupos.find(x => x.name === (m.group || 'General')); if (!g) grupos.push(g = { name: m.group || 'General', items: [] }); g.items.push(m); }
    const q = GQ.toLowerCase(); const coincide = (m) => !q || `${m.label} ${G(m.key).para} ${(G(m.key).pasos || []).join(' ')}`.toLowerCase().includes(q);
    const FAQ = cli ? [['¿Cómo apruebo una pieza o publicación?', 'En tu portal, en "Esperan tu respuesta", pulsa Revisar o Aprobar. Si quieres cambios, escríbelos y el equipo los recibe al instante.'], ['¿Cómo reporto un pago?', 'Abre la factura en Facturas y pagos y pulsa "Reportar pago" con la referencia.'], ['¿Cómo pido algo al equipo?', 'Botón "Pedir algo al equipo" en tu portal.']]
      : [['¿Por qué no veo una sección?', 'Cada rol ve solo lo que necesita. Si te hace falta una sección, pídela a Dirección.'], ['¿Se guarda solo?', 'Sí. Todo se guarda al pulsar Guardar, y en el modo en línea lo ve el resto del equipo al instante.'], ['¿Cómo cambio mi contraseña?', 'Abajo a la izquierda, el botón con tu silueta → Mi cuenta.'], ['¿Qué ve el cliente?', 'Solo lo de su empresa, en su portal: aprobaciones, proyectos, publicaciones, facturas y métricas. Nunca las notas internas.'], ['¿Dónde busco algo rápido?', 'Ctrl + K o el botón Buscar arriba del menú.']];
    el.innerHTML = `<div class="page">${D.pageHead('Guía y tutoriales', cli ? 'Cómo usar tu portal de Delirium Studios.' : 'Qué hace cada sección, dónde está y videos cortos para aprenderlo todo.', `<button class="btn violet" data-recorrido>${D.icon('play')} Hacer el recorrido</button>`)}
      ${vids.length ? `<h2 style="margin:4px 0 12px">Videos</h2><div class="guia-videos">${vids.map(v => `<button class="guia-video" data-video="${v.id}"><span class="guia-thumb"><img src="${posterSrc(v)}" alt=""><i>${D.icon('play')}</i></span><b>${esc(v.titulo)}</b><span class="small muted">Para: ${esc(v.para)}</span></button>`).join('')}</div>` : ''}
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin:26px 0 12px;flex-wrap:wrap"><h2 style="margin:0">Tus herramientas</h2><input class="input" type="search" placeholder="Buscar una sección o tarea…" value="${esc(GQ)}" data-gq style="max-width:320px"></div>
      ${grupos.map(g => { const items = g.items.filter(coincide); if (!items.length) return ''; return `<div class="guia-grupo"><div class="label" style="margin:14px 0 8px">${esc(g.name)}</div><div class="guia-grid">${items.map(m => { const g = G(m.key); const v = g.video && vids.find(x => x.id === g.video); return `<div class="card guia-item"><div style="display:flex;align-items:center;gap:10px"><span class="guia-ic">${D.icon(m.key)}</span><b>${esc(m.label)}</b></div><p>${esc(g.para)}</p><div class="guia-acc"><button class="btn sm" data-como="${m.key}">Cómo se usa</button>${v ? `<button class="btn sm ghost" data-video="${v.id}">${D.icon('play')} Video</button>` : ''}<span style="flex:1"></span><button class="btn sm ghost" data-ir="${m.key}">Ir ${D.icon('arrow')}</button></div></div>`; }).join('')}</div></div>`; }).join('') || '<p class="muted">No hay coincidencias.</p>'}
      <h2 style="margin:28px 0 10px">Preguntas frecuentes</h2><div class="card">${FAQ.map(([p, r]) => `<details class="guia-faq"><summary>${esc(p)}</summary><p>${esc(r)}</p></details>`).join('')}</div></div>`;
    el.querySelectorAll('.guia-thumb img').forEach(img => { img.onerror = () => { img.style.visibility = 'hidden'; }; if (img.complete && !img.naturalWidth) img.style.visibility = 'hidden'; });
    el.querySelectorAll('[data-video]').forEach(b => b.onclick = () => D.verVideo(b.dataset.video));
    el.querySelectorAll('[data-ir]').forEach(b => b.onclick = () => D.go(b.dataset.ir));
    el.querySelectorAll('[data-como]').forEach(b => b.onclick = () => D.ayuda(b.dataset.como));
    el.querySelector('[data-recorrido]').onclick = () => D.recorridoBienvenida(true);
    const gq = el.querySelector('[data-gq]'); gq.oninput = () => { GQ = gq.value; clearTimeout(gq.t); gq.t = setTimeout(() => D.views.guia(el).then(() => { const n = el.querySelector('[data-gq]'); n.focus(); n.setSelectionRange(n.value.length, n.value.length); }), 220); };
  };
})(window.DOS);
