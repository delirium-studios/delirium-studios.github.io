// @ts-nocheck
// Delirium OS · servidor en línea v1.4.0 · generado automáticamente, no editar.
// Pégalo completo en Supabase > Edge Functions > Deploy a new function > Via Editor, con el nombre "delirium".
import { Buffer } from "node:buffer";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server/shim-crypto.js
var shim_crypto_exports = {};
import * as node_crypto_star from "node:crypto";
var init_shim_crypto = __esm({
  "server/shim-crypto.js"() {
    __reExport(shim_crypto_exports, node_crypto_star);
  }
});

// server/shim-buffer.js
var shim_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_shim_buffer = __esm({
  "server/shim-buffer.js"() {
    __reExport(shim_buffer_exports, node_buffer_star);
  }
});

// server/shim-vacio.js
var shim_vacio_exports = {};
var init_shim_vacio = __esm({
  "server/shim-vacio.js"() {
  }
});

// src/main/config.js
var require_config = __commonJS({
  "src/main/config.js"(exports, module) {
    var ROLES = {
      founder: { label: "Founder / CEO", group: "Direcci\xF3n", staff: true, admin: true },
      coo: { label: "Director de Operaciones (COO)", group: "Direcci\xF3n", staff: true, admin: true },
      creativo_dir: { label: "Director Creativo", group: "Direcciones de \xE1rea", staff: true },
      productor: { label: "Productor Ejecutivo", group: "Direcciones de \xE1rea", staff: true },
      finanzas: { label: "Finanzas / Contabilidad", group: "Direcciones de \xE1rea", staff: true },
      rrhh: { label: "Recursos Humanos", group: "Direcciones de \xE1rea", staff: true },
      legal: { label: "Legal / Propiedad Intelectual", group: "Direcciones de \xE1rea", staff: true },
      pm: { label: "Project / Account Manager", group: "Equipo operativo", staff: true },
      ventas: { label: "Ventas / Estratega", group: "Equipo operativo", staff: true },
      social: { label: "Social Media / Community Manager", group: "Equipo operativo", staff: true },
      mediabuyer: { label: "Media Buyer", group: "Equipo operativo", staff: true },
      creativo: { label: "Creativo / T\xE9cnico", group: "Equipo operativo", staff: true },
      freelancer: { label: "Freelancer / Temporal", group: "Equipo operativo", staff: true },
      cliente: { label: "Cliente (due\xF1o de la cuenta)", group: "Clientes", staff: false },
      cliente_eq: { label: "Equipo del cliente", group: "Clientes", staff: false }
    };
    var MODULES = [
      { key: "inicio", label: "Inicio", group: "", col: null },
      { key: "clientes", label: "Clientes", group: "Comercial", col: "clients" },
      { key: "recordatorios", label: "Recordatorios", group: "Comercial", col: "reminders" },
      { key: "cotizaciones", label: "Cotizaciones", group: "Comercial", col: "quotes" },
      { key: "catalogo", label: "Cat\xE1logo de servicios", group: "Comercial", col: "services" },
      { key: "soporte", label: "Soporte y solicitudes", group: "Comercial", col: "tickets" },
      { key: "proyectos", label: "Proyectos", group: "Operaci\xF3n", col: "projects" },
      { key: "tareas", label: "Tareas", group: "Operaci\xF3n", col: "tasks" },
      { key: "piezas", label: "Piezas y aprobaciones", group: "Operaci\xF3n", col: "pieces" },
      { key: "calendario", label: "Calendario", group: "Operaci\xF3n", col: "events" },
      { key: "horas", label: "Registro de horas", group: "Operaci\xF3n", col: "timesheets" },
      { key: "redes", label: "Calendario de redes", group: "Marketing y redes", col: "posts" },
      { key: "anuncios", label: "Campa\xF1as de anuncios", group: "Marketing y redes", col: "campaigns" },
      { key: "cuentas", label: "Redes conectadas", group: "Marketing y redes", col: "socials" },
      { key: "juegos", label: "Juegos", group: "Juegos", col: "games" },
      { key: "bugs", label: "Bugs y QA", group: "Juegos", col: "bugs" },
      { key: "llaves", label: "Llaves y creadores", group: "Juegos", col: "keys" },
      { key: "facturas", label: "Facturas y pagos", group: "Finanzas", col: "invoices" },
      { key: "planes", label: "Planes y alquileres", group: "Finanzas", col: "subscriptions" },
      { key: "gastos", label: "Gastos", group: "Finanzas", col: "expenses" },
      { key: "reportes", label: "Reportes", group: "Finanzas", col: null },
      { key: "pedidos", label: "Pedidos de merch", group: "Merch e inventario", col: "orders" },
      { key: "productos", label: "Productos y stock", group: "Merch e inventario", col: "products" },
      { key: "movimientos", label: "Movimientos", group: "Merch e inventario", col: "stock_moves" },
      { key: "proveedores", label: "Proveedores", group: "Merch e inventario", col: "suppliers" },
      { key: "compras", label: "\xD3rdenes de compra", group: "Merch e inventario", col: "purchases" },
      { key: "empleados", label: "Fichas del personal", group: "Personas", col: "employees" },
      { key: "ausencias", label: "Ausencias y vacaciones", group: "Personas", col: "leaves" },
      { key: "nomina", label: "N\xF3mina", group: "Personas", col: "payslips" },
      { key: "candidatos", label: "Reclutamiento", group: "Personas", col: "candidates" },
      { key: "evaluaciones", label: "Evaluaciones", group: "Personas", col: "reviews" },
      { key: "contratos", label: "Contratos y permisos", group: "Legal", col: "contracts" },
      { key: "licencias", label: "Licencias", group: "Legal", col: "licenses" },
      { key: "manuales", label: "Manuales y procesos", group: "Equipo y sistema", col: "docs" },
      { key: "boveda", label: "B\xF3veda de contrase\xF1as", group: "Equipo y sistema", col: "vault" },
      { key: "equipo", label: "Usuarios y roles", group: "Equipo y sistema", col: "users" },
      { key: "actividad", label: "Registro de actividad", group: "Equipo y sistema", col: "audit" },
      { key: "mapa", label: "Mapa de herramientas", group: "Equipo y sistema", col: null },
      { key: "ajustes", label: "Ajustes", group: "Equipo y sistema", col: "settings" }
    ];
    var STAFF = ["founder", "coo", "creativo_dir", "productor", "finanzas", "rrhh", "legal", "pm", "ventas", "social", "mediabuyer", "creativo", "freelancer"];
    var allStaff = (v) => Object.fromEntries(STAFF.map((r) => [r, v]));
    var PERMS = {
      inicio: { ...allStaff("R:self"), cliente: "R:self", cliente_eq: "R:self" },
      clientes: { founder: "W:all", coo: "W:all", creativo_dir: "R:all", productor: "R:all", finanzas: "R:all", legal: "R:all", pm: "W:assigned", ventas: "W:all", social: "R:assigned", mediabuyer: "R:assigned" },
      recordatorios: { ...allStaff("W:self"), founder: "W:all", coo: "W:all" },
      catalogo: { founder: "W:all", coo: "W:all", ventas: "W:all", pm: "R:all", finanzas: "R:all", creativo_dir: "R:all", productor: "R:all" },
      cotizaciones: { founder: "W:all", coo: "W:all", ventas: "W:all", pm: "W:assigned", finanzas: "R:all", creativo_dir: "R:all", cliente: "R:client", cliente_eq: "R:client" },
      proyectos: { founder: "W:all", coo: "W:all", creativo_dir: "W:all", productor: "W:all", pm: "W:assigned", ventas: "R:all", finanzas: "R:all", legal: "R:all", social: "R:assigned", mediabuyer: "R:assigned", creativo: "R:assigned", freelancer: "R:assigned", cliente: "R:client", cliente_eq: "R:client" },
      tareas: { founder: "W:all", coo: "W:all", creativo_dir: "W:all", productor: "W:all", pm: "W:assigned", social: "W:assigned", mediabuyer: "W:assigned", creativo: "W:assigned", freelancer: "W:assigned", ventas: "R:assigned", finanzas: "R:assigned", legal: "R:assigned", rrhh: "R:assigned" },
      calendario: { ...allStaff("W:self"), founder: "W:all", coo: "W:all" },
      horas: { ...allStaff("W:self"), founder: "W:all", coo: "W:all", finanzas: "R:all", rrhh: "R:all", creativo_dir: "R:all", productor: "R:all" },
      facturas: { founder: "W:all", coo: "W:all", finanzas: "W:all", ventas: "R:all", pm: "R:assigned", cliente: "R:client" },
      gastos: { ...allStaff("W:self"), founder: "W:all", coo: "W:all", finanzas: "W:all" },
      reportes: { founder: "R:all", coo: "R:all", finanzas: "R:all" },
      productos: { founder: "W:all", coo: "W:all", finanzas: "W:all", productor: "W:all", creativo_dir: "R:all", ventas: "R:all", social: "R:all" },
      movimientos: { founder: "W:all", coo: "W:all", finanzas: "W:all", productor: "W:all" },
      proveedores: { founder: "W:all", coo: "W:all", finanzas: "W:all", productor: "W:all", creativo_dir: "R:all" },
      empleados: { ...allStaff("R:self"), founder: "W:all", coo: "W:all", rrhh: "W:all", finanzas: "R:all" },
      ausencias: { ...allStaff("W:self"), founder: "W:all", coo: "W:all", rrhh: "W:all" },
      nomina: { ...allStaff("R:self"), founder: "W:all", coo: "W:all", finanzas: "W:all", rrhh: "R:all" },
      contratos: { founder: "W:all", coo: "W:all", legal: "W:all", finanzas: "R:all", ventas: "R:all", pm: "R:assigned", cliente: "R:client" },
      licencias: { founder: "W:all", coo: "W:all", legal: "W:all", creativo_dir: "R:all", productor: "R:all", pm: "R:all", social: "R:all", creativo: "R:all", freelancer: "R:all", mediabuyer: "R:all" },
      equipo: { founder: "W:all", coo: "W:all", rrhh: "R:all" },
      actividad: { founder: "R:all", coo: "R:all" },
      mapa: { ...allStaff("R:all") },
      ajustes: { founder: "W:all", coo: "W:all" },
      soporte: { founder: "W:all", coo: "W:all", pm: "W:assigned", ventas: "W:assigned", social: "W:assigned", creativo_dir: "R:all", productor: "R:all", cliente: "W:client", cliente_eq: "W:client" },
      piezas: { founder: "W:all", coo: "W:all", creativo_dir: "W:all", productor: "W:all", pm: "W:assigned", social: "W:assigned", mediabuyer: "W:assigned", creativo: "W:assigned", freelancer: "W:assigned", cliente: "R:client", cliente_eq: "R:client" },
      redes: { founder: "W:all", coo: "W:all", creativo_dir: "W:all", social: "W:assigned", pm: "W:assigned", mediabuyer: "R:assigned", creativo: "R:assigned", freelancer: "R:assigned", cliente: "R:client", cliente_eq: "R:client" },
      cuentas: { founder: "W:all", coo: "W:all", creativo_dir: "W:all", social: "W:all", pm: "R:all", mediabuyer: "R:all", cliente: "W:client", cliente_eq: "R:client" },
      anuncios: { founder: "W:all", coo: "W:all", mediabuyer: "W:assigned", social: "R:assigned", pm: "R:assigned", finanzas: "R:all", ventas: "R:all", creativo_dir: "R:all", cliente: "R:client", cliente_eq: "R:client" },
      juegos: { founder: "W:all", coo: "W:all", productor: "W:all", creativo_dir: "W:all", pm: "W:assigned", creativo: "R:assigned", freelancer: "R:assigned", social: "R:all", mediabuyer: "R:all", legal: "R:all", ventas: "R:all", cliente: "R:client", cliente_eq: "R:client" },
      bugs: { founder: "W:all", coo: "W:all", productor: "W:all", creativo_dir: "W:all", pm: "W:assigned", creativo: "W:assigned", freelancer: "W:assigned", social: "W:assigned" },
      llaves: { founder: "W:all", coo: "W:all", productor: "W:all", social: "W:all", creativo_dir: "R:all", legal: "R:all" },
      planes: { founder: "W:all", coo: "W:all", finanzas: "W:all", ventas: "R:all", pm: "R:assigned", cliente: "R:client" },
      pedidos: { founder: "W:all", coo: "W:all", finanzas: "W:all", productor: "W:all", ventas: "W:all", social: "W:all" },
      candidatos: { founder: "W:all", coo: "W:all", rrhh: "W:all", creativo_dir: "R:all", productor: "R:all" },
      evaluaciones: { ...allStaff("R:self"), founder: "W:all", coo: "W:all", rrhh: "W:all", creativo_dir: "W:assigned", productor: "W:assigned", pm: "W:assigned" },
      compras: { founder: "W:all", coo: "W:all", finanzas: "W:all", productor: "W:all", creativo_dir: "R:all" },
      boveda: { ...allStaff("R:assigned"), founder: "W:all", coo: "W:all" },
      manuales: { ...allStaff("R:all"), founder: "W:all", coo: "W:all", rrhh: "W:all", legal: "W:all", creativo_dir: "W:all", productor: "W:all", cliente: "R:all", cliente_eq: "R:all" }
    };
    var FIELD_VIS = {
      clients: { notas_internas: ["founder", "coo", "ventas", "pm", "creativo_dir"] },
      projects: {
        precio: ["founder", "coo", "finanzas", "pm", "ventas", "productor", "creativo_dir", "cliente", "cliente_eq"],
        costo_interno: ["founder", "coo", "finanzas", "pm", "productor", "creativo_dir"],
        notas_internas: ["founder", "coo", "finanzas", "pm", "ventas", "productor", "creativo_dir", "legal"],
        costo_ronda_extra: ["founder", "coo", "finanzas", "pm", "ventas", "productor", "creativo_dir", "cliente", "cliente_eq"]
      },
      tasks: { horas_estimadas: STAFF },
      employees: {
        salario: ["founder", "coo", "rrhh", "finanzas", "self"],
        cuenta_bancaria: ["founder", "coo", "rrhh", "finanzas", "self"],
        documento: ["founder", "coo", "rrhh", "self"],
        contacto_emergencia: ["founder", "coo", "rrhh", "self"],
        notas_rrhh: ["founder", "coo", "rrhh"]
      },
      timesheets: { costo_hora: ["founder", "coo", "finanzas"] },
      quotes: { notas_internas: ["founder", "coo", "ventas", "pm", "finanzas", "creativo_dir"] },
      invoices: { notas_internas: ["founder", "coo", "finanzas", "ventas"] },
      keys: { llave: ["founder", "coo", "productor", "social"] },
      campaigns: { notas_internas: ["founder", "coo", "mediabuyer", "pm", "social", "creativo_dir"] },
      candidates: { salario_pedido: ["founder", "coo", "rrhh"] },
      purchases: { notas_internas: ["founder", "coo", "finanzas", "productor"] }
    };
    var CLIENT_ROLES = ["cliente", "cliente_eq"];
    module.exports = { ROLES, MODULES, PERMS, FIELD_VIS, STAFF, CLIENT_ROLES };
  }
});

// src/main/manuales.js
var require_manuales = __commonJS({
  "src/main/manuales.js"(exports, module) {
    module.exports = [
      // v: versión en la que se agregó el manual (los nuevos se suman solos al actualizar)
      {
        titulo: "C\xF3mo usar Delirium OS (gu\xEDa r\xE1pida)",
        categoria: "Bienvenida",
        visibilidad: "Todo el equipo",
        contenido: `Delirium OS re\xFAne en un solo lugar lo que antes estaba en varias apps.

1. Inicio: lo importante de hoy. Tus tareas, alertas, entregas de la semana y recordatorios.
2. Bot\xF3n "Crear" (arriba en el men\xFA): crea cualquier cosa sin buscar la secci\xF3n.
3. Ctrl + K: busca clientes, proyectos, facturas o una secci\xF3n por su nombre.
4. Cada lista tiene dos vistas: "Lista" y "Tablero". En el tablero arrastras las tarjetas para cambiar su estado.
5. Al hacer clic en un registro se abre su panel con todo el detalle y los botones de acci\xF3n.
6. Cron\xF3metro (abajo en el men\xFA): in\xEDcialo cuando empieces a trabajar en un proyecto; al detenerlo se guardan tus horas.
7. Solo ves lo que corresponde a tu rol. Si necesitas ver algo m\xE1s, p\xEDdeselo a Direcci\xF3n.

Los campos con * son obligatorios. Si algo falta, la app te dice exactamente qu\xE9.`
      },
      {
        titulo: "Flujo de aprobaci\xF3n de piezas",
        categoria: "Proceso",
        visibilidad: "Todo el equipo",
        contenido: `Toda pieza (dise\xF1o, video, audio, PDF, web) sigue este camino en "Piezas y aprobaciones":

1. En producci\xF3n: el creativo trabaja la pieza y adjunta el archivo o el enlace.
2. Revisi\xF3n interna: Direcci\xF3n Creativa, Producci\xF3n o el Project Manager la revisan. Pueden aprobarla o pedir cambios internos (los cambios internos NO cuentan como ronda del cliente).
3. Revisi\xF3n del cliente: al aprobarse internamente, el cliente la ve en su portal. Puede aprobarla o pedir cambios.
4. Cambios pedidos: cada pedido de cambios del cliente suma una ronda al proyecto. Si se pasa de las rondas incluidas, se crea una orden de cambio con costo extra.
5. Nueva versi\xF3n: el creativo sube la v2, v3\u2026 y la pieza vuelve a revisi\xF3n interna.
6. Aprobada: queda registrada la fecha y qui\xE9n aprob\xF3.

En videos, anota el segundo exacto del comentario (por ejemplo 00:42) para evitar "en el minuto 1 y algo".`
      },
      {
        titulo: "Protocolo de crisis en redes",
        categoria: "Protocolo",
        visibilidad: "Todo el equipo",
        contenido: `Cu\xE1ndo aplica: un comentario negativo que crece r\xE1pido, una queja p\xFAblica, un error en una publicaci\xF3n o algo que se vuelve viral para mal.

1. No borres ni respondas en caliente. Toma captura de pantalla con fecha y hora.
2. Abre una solicitud en "Soporte y solicitudes" con tipo "Crisis en redes" y prioridad "Urgente". Adjunta las capturas o enlaces.
3. Avisa al Project Manager del cliente y a Direcci\xF3n en menos de 30 minutos.
4. Si fue un error nuestro: pausa las publicaciones programadas y los anuncios activos del cliente.
5. Direcci\xF3n y el cliente aprueban la respuesta p\xFAblica antes de publicarla.
6. Responde con calma, sin discutir, y lleva la conversaci\xF3n a mensaje privado cuando haga falta.
7. Al cerrar, anota en la solicitud qu\xE9 pas\xF3, qu\xE9 se respondi\xF3 y qu\xE9 se aprende para la pr\xF3xima vez.`
      },
      {
        titulo: "Permisos de contenido de seguidores (UGC y fan art)",
        categoria: "Protocolo",
        visibilidad: "Todo el equipo",
        contenido: `Antes de repostear una foto, video o dibujo de un seguidor:

1. Pide permiso por mensaje privado y guarda la captura de su respuesta.
2. Reg\xEDstralo en "Contratos y permisos" con tipo "Permiso UGC / fan art": usuario del autor, obra, d\xF3nde se usar\xE1 y la fecha.
3. Da cr\xE9dito siempre con su usuario (@autor), como pide el manual de marca de Delirium.
4. Si la obra se usar\xE1 en publicidad pagada o en merch, hace falta un permiso m\xE1s formal o un contrato.
5. Si el autor pide retirarla, se retira ese mismo d\xEDa.`
      },
      {
        titulo: "Plantilla: cl\xE1usula de rondas de cambios",
        categoria: "Plantilla legal",
        visibilidad: "Todo el equipo",
        contenido: `Texto base para cotizaciones y contratos (rev\xEDsalo con un abogado antes de usarlo):

"El precio incluye [N] rondas de cambios sobre cada entregable. Una ronda es un conjunto de ajustes solicitados en una sola comunicaci\xF3n. Las rondas adicionales tienen un costo de [MONTO] cada una y se facturan aparte mediante una orden de cambio. Los cambios que alteren el alcance original (nuevas piezas, nuevos formatos o un concepto distinto) se cotizan por separado."

En Delirium OS: las rondas incluidas se configuran en el proyecto y el sistema crea la orden de cambio solo cuando se pasan.`
      },
      {
        titulo: "Plantilla: cl\xE1usula de uso de IA",
        categoria: "Plantilla legal",
        visibilidad: "Todo el equipo",
        contenido: `Texto base (rev\xEDsalo con un abogado antes de usarlo):

"Delirium Studios puede utilizar herramientas de inteligencia artificial como apoyo en etapas como la exploraci\xF3n de ideas, bocetos, transcripci\xF3n o mejora de resoluci\xF3n. El resultado final es revisado y terminado por el equipo del estudio. Delirium Studios informar\xE1 al cliente cuando un entregable final incluya elementos generados principalmente con IA. La cesi\xF3n de derechos sobre los entregables se rige por lo establecido en este contrato."

Recomendaci\xF3n: anota en la pieza o el proyecto qu\xE9 partes se hicieron con IA.`
      },
      {
        titulo: "Bienvenida al equipo: primeros d\xEDas",
        categoria: "Bienvenida",
        visibilidad: "Todo el equipo",
        contenido: `Lista para cada persona nueva:

1. Cuenta en Delirium OS creada por Direcci\xF3n (rol correcto y, si es temporal, fecha de vencimiento).
2. Cambiar la contrase\xF1a desde "Mi cuenta".
3. Leer el manual de marca de Delirium y estos manuales.
4. Completar su ficha en "Fichas del personal" con RR.HH.
5. Recibir sus licencias de programas (ver "Licencias").
6. Conocer a su Project Manager y los proyectos donde va a participar.
7. Primer registro de horas y primera tarea asignada.`
      },
      {
        titulo: "Ciclo de un juego: qu\xE9 se hace en cada etapa",
        categoria: "Proceso",
        visibilidad: "Todo el equipo",
        contenido: `En la secci\xF3n "Juegos" cada juego avanza por 6 etapas, cada una con su lista de pendientes:

1. Concepto y preproducci\xF3n: idea, pilares, documento de dise\xF1o (GDD), arte conceptual, prototipo y pitch.
2. Producci\xF3n: programaci\xF3n, arte, animaci\xF3n, niveles, m\xFAsica y sonido, por sprints e hitos.
3. Pruebas: QA interno, playtests, reporte de bugs y m\xE9tricas de d\xF3nde se atascan los jugadores.
4. Prelanzamiento: p\xE1gina de tienda y wishlists, trailer, demo, festivales, press kit, llaves para creadores y clasificaci\xF3n por edad.
5. Lanzamiento: publicar, certificaci\xF3n de consolas, precio y comunicaci\xF3n.
6. Poslanzamiento: parches, contenido nuevo, traducciones, rese\xF1as, comunidad y merch del juego.

Bugs: se registran en "Bugs y QA" (de QA interno, Discord, Steam o clientes).
Llaves para streamers: se cargan y reparten en "Llaves y creadores".`
      },
      {
        titulo: "C\xF3mo trabajar con Delirium Studios",
        categoria: "Para clientes",
        visibilidad: "Clientes tambi\xE9n",
        contenido: `Bienvenido a tu portal de Delirium Studios. Aqu\xED puedes:

\u2022 Ver el avance de tus proyectos y cu\xE1ntas rondas de cambios te quedan.
\u2022 Revisar y aprobar piezas (dise\xF1os, videos y m\xE1s) o pedir cambios. En videos, indica el segundo exacto (por ejemplo 00:42).
\u2022 Aprobar las publicaciones de tus redes antes de que salgan.
\u2022 Aceptar o rechazar cotizaciones.
\u2022 Ver tus facturas y reportar tus pagos (Pago M\xF3vil, Zelle, etc.). Tu pago queda "por verificar" hasta que Finanzas lo confirme.
\u2022 Abrir una solicitud de soporte cuando necesites algo. Te respondemos dentro de la misma solicitud.

Sobre las rondas de cambios: cada vez que pides cambios sobre una pieza se usa una ronda. Las rondas incluidas est\xE1n en tu contrato; las adicionales tienen costo extra y siempre te avisamos antes.

Stay delirious. \u2726`
      },
      {
        v: 2,
        titulo: "C\xF3mo poner Delirium OS en l\xEDnea y conectar Discord, Meta y GitHub",
        categoria: "Proceso",
        visibilidad: "Solo direcci\xF3n",
        contenido: `Todo se hace desde Ajustes. Solo Direcci\xF3n (Founder / COO) ve estas opciones.

EN L\xCDNEA (Supabase, gratis y sin dominio) \xB7 Ajustes \u2192 Trabajar en l\xEDnea
1. Crea una cuenta en supabase.com y un proyecto nuevo.
2. SQL Editor: pega el SQL (bot\xF3n "Copiar SQL") y pulsa Run.
3. Edge Functions \u2192 Deploy a new function \u2192 Via Editor \u2192 nombre "delirium" \u2192 pega el c\xF3digo del servidor \u2192 Deploy. En los detalles de la funci\xF3n desactiva "Verify JWT".
4. Project Settings \u2192 API Keys: copia la Project URL y la Publishable key, p\xE9galas en la app y pulsa "Probar conexi\xF3n".
5. "Subir mis datos y pasar a modo en l\xEDnea". La app se reinicia y entras con tu mismo usuario.
6. Copia el "c\xF3digo de conexi\xF3n" y comp\xE1rtelo con el equipo y los clientes por un canal privado. Cada persona lo pega una sola vez en "Conectar a la nube de mi estudio".

DISCORD \xB7 Ajustes \u2192 Conexiones
\u2022 Avisos: en el canal del equipo, Editar canal \u2192 Integraciones \u2192 Webhooks \u2192 Nuevo webhook \u2192 Copiar URL. P\xE9gala y elige qu\xE9 avisos quieres.
\u2022 Bugs de la comunidad: crea un bot en discord.com/developers, activa "Message Content Intent", inv\xEDtalo al servidor con permiso de leer el canal de bugs y pega su token y el ID del canal.

META (Facebook e Instagram Ads) \xB7 Ajustes \u2192 Conexiones
\u2022 No hace falta p\xE1gina de Delirium. Con tu Facebook personal crea una app en developers.facebook.com (tipo Empresa), agrega Marketing API y genera un token con permiso ads_read.
\u2022 Tu cuenta debe tener acceso a la cuenta publicitaria de cada cliente (como socio en su Business Manager).
\u2022 En cada cliente escribe su cuenta publicitaria (act_\u2026) o en cada campa\xF1a su ID de Meta.

GITHUB (actualizaciones autom\xE1ticas) \xB7 Ajustes \u2192 Conexiones
\u2022 Crea un repositorio p\xFAblico solo para las versiones, por ejemplo delirium-os-versiones (el c\xF3digo del programa no va ah\xED).
\u2022 En cada versi\xF3n nueva: Releases \u2192 Draft a new release \u2192 etiqueta v1.4.0 (la versi\xF3n) \u2192 adjunta el instalador .exe y su archivo .sha256 \u2192 Publish.
\u2022 Cada PC ver\xE1 el aviso "Actualizar ahora" y se actualizar\xE1 sola, conservando los datos.`
      },
      {
        v: 2,
        titulo: "Reportes de fallos de los juegos (nuestro propio Sentry)",
        categoria: "Proceso",
        visibilidad: "Todo el equipo",
        contenido: `Cada juego tiene una clave de reportes (Juegos \u2192 abre el juego \u2192 Reportes de fallos). Funciona cuando el estudio trabaja en l\xEDnea.

1. Copia el c\xF3digo para tu motor (Godot, Unity, Roblox o Web) y agr\xE9galo al juego.
2. Cuando el juego falla, el error llega solo a Bugs y QA con: mensaje, rastro del c\xF3digo, versi\xF3n, plataforma y equipo del jugador.
3. Los errores iguales se agrupan: ver\xE1s cu\xE1ntas veces pas\xF3 y en qu\xE9 versiones.
4. Si marcas un bug como Arreglado y vuelve a pasar, se reabre solo y avisa en Discord.
5. En Godot puedes llamar Delirium.paso("Entr\xF3 al nivel 2") para saber qu\xE9 hizo el jugador antes del fallo.

Los errores de la propia app Delirium OS tambi\xE9n llegan solos a Bugs y QA (origen "Reporte autom\xE1tico").`
      },
      {
        v: 3,
        titulo: "Firmar documentos y tu reporte del mes",
        categoria: "Para clientes",
        visibilidad: "Clientes tambi\xE9n",
        contenido: `Firmar un contrato o aceptar una cotizaci\xF3n
1. Cuando te enviemos algo para firmar, aparece en tu portal, en "Esperan tu respuesta".
2. \xC1brelo, l\xE9elo y pulsa "Firmar" (en cotizaciones: "Firmar y aceptar").
3. Escribe tu nombre completo, dibuja tu firma con el mouse o el dedo y marca la casilla de aceptaci\xF3n.
4. Listo: la firma queda guardada con la fecha y una huella del documento. Si alguien lo cambiara despu\xE9s, la app lo marca.
5. Puedes descargar la constancia de firma en PDF cuando quieras.

Tu reporte del mes
En tu portal pulsa "Mi reporte del mes" y elige el mes: recibes un PDF con tus proyectos, piezas aprobadas, publicaciones, anuncios y pagos.`
      },
      {
        v: 3,
        titulo: "Tienda online, app del celular y b\xF3veda de contrase\xF1as",
        categoria: "Proceso",
        visibilidad: "Solo direcci\xF3n",
        contenido: `Tienda online de merch (gratis)
1. En Productos marca "Mostrar en la tienda online" y sube una foto clara.
2. En Ajustes \u2192 Tienda y app web activa la tienda y escribe tus datos de pago y de env\xEDos.
3. Pulsa "Generar archivos de la web" y sube todo el contenido de la carpeta a un repositorio p\xFAblico de GitHub con Pages activado.
4. Los pedidos llegan a Pedidos con el canal "Tienda online". Confirma el pago y m\xE1rcalo como Pagado: el stock baja solo.

App del celular
La misma carpeta trae la app web (carpeta app/). \xC1brela en el tel\xE9fono, entra con tu usuario y elige "Agregar a pantalla de inicio". Cada persona ve solo lo de su rol, igual que en la PC.
Cuando actualices Delirium OS, vuelve a generar la carpeta y s\xFAbela de nuevo.

B\xF3veda de contrase\xF1as
1. En B\xF3veda pulsa "Crear clave maestra" (m\xEDnimo 12 caracteres). Gu\xE1rdala en un lugar seguro: si se pierde, nadie puede recuperar las contrase\xF1as.
2. Cada acceso se cifra en tu equipo antes de guardarse: ni Supabase ni nosotros podemos leerlo.
3. Comparte la clave maestra solo con quien deba usar la b\xF3veda y marca en cada acceso con qui\xE9n se comparte.
4. Si alguien deja el equipo, cambia la clave maestra (la app vuelve a cifrar todo) y cambia las contrase\xF1as que conoc\xEDa.`
      },
      {
        v: 3,
        titulo: "M\xE9tricas de jugadores: qu\xE9 medir y c\xF3mo leerlas",
        categoria: "Proceso",
        visibilidad: "Todo el equipo",
        contenido: `El c\xF3digo de "Reportes de fallos y m\xE9tricas" del juego tambi\xE9n env\xEDa m\xE9tricas (necesita el modo en l\xEDnea).

Qu\xE9 enviar
- La sesi\xF3n se cuenta sola al abrir el juego.
- Al empezar, terminar o perder un nivel: evento "nivel_inicio", "nivel_fin" o "nivel_fallo" con el n\xFAmero de nivel.
- Compras dentro del juego: evento "compra" con el monto.
- Cualquier otra cosa que quieras contar: un evento con nombre (por ejemplo "encontro_espiral_secreta").

C\xF3mo leerlas (Juegos \u2192 abre el juego \u2192 M\xE9tricas de jugadores)
- Vuelven al d\xEDa siguiente (D1): por encima de 35% es buena se\xF1al; por debajo de 20%, el inicio no engancha.
- Vuelven a la semana (D7): por encima de 10% es sano para un juego indie.
- Niveles: si un nivel tiene mucho "Empezaron" y poco "Terminaron", ah\xED se atascan. Revisa dificultad o claridad.
No se guarda ning\xFAn dato personal: cada jugador es un n\xFAmero an\xF3nimo.`
      }
    ];
  }
});

// src/main/demo.js
var require_demo = __commonJS({
  "src/main/demo.js"(exports, module) {
    var DEMO_PASSWORD = "delirium2026";
    function load(core, { hashPw, uid, now, today }) {
      const db = core.db;
      const d = (offset) => {
        const t2 = new Date(Date.now() + offset * 864e5);
        return `${t2.getFullYear()}-${String(t2.getMonth() + 1).padStart(2, "0")}-${String(t2.getDate()).padStart(2, "0")}`;
      };
      const pw = hashPw(DEMO_PASSWORD);
      const founder = db.users[0];
      const mk = (nombre, email, rol, extra = {}) => {
        const u = { id: uid(), nombre, email, rol, activo: true, password: pw, creado: now(), creado_por: founder.id, client_id: null, expira: null, tema: "oscuro", demo: true, ...extra };
        db.users.push(u);
        return u;
      };
      const coo = mk("Valentina R\xEDos (ejemplo)", "valentina@staydelirious.com", "coo", { puesto: "Directora de Operaciones" });
      const dirc = mk("Andr\xE9s Molina (ejemplo)", "andres@staydelirious.com", "creativo_dir", { puesto: "Director Creativo" });
      const fin = mk("Carla P\xE9rez (ejemplo)", "carla@staydelirious.com", "finanzas", { puesto: "Finanzas" });
      const rrhh = mk("Luis Herrera (ejemplo)", "luis@staydelirious.com", "rrhh", { puesto: "Recursos Humanos" });
      const pm = mk("Sof\xEDa M\xE9ndez (ejemplo)", "sofia@staydelirious.com", "pm", { puesto: "Project Manager" });
      const ventas = mk("Diego Castro (ejemplo)", "diego@staydelirious.com", "ventas", { puesto: "Ventas" });
      const social = mk("Mariana L\xF3pez (ejemplo)", "mariana@staydelirious.com", "social", { puesto: "Community Manager" });
      const dis = mk("Gabriel Rojas (ejemplo)", "gabriel@staydelirious.com", "creativo", { puesto: "Dise\xF1ador gr\xE1fico" });
      const edit = mk("Camila Torres (ejemplo)", "camila@staydelirious.com", "creativo", { puesto: "Editora de video" });
      const prod_ = mk("Rafael N\xFA\xF1ez (ejemplo)", "rafael@staydelirious.com", "productor", { puesto: "Productor Ejecutivo" });
      const mb = mk("Paola Vera (ejemplo)", "paola@staydelirious.com", "mediabuyer", { puesto: "Media Buyer" });
      const free = mk("Iv\xE1n Su\xE1rez (ejemplo)", "ivan@freelance.com", "freelancer", { puesto: "Ilustrador freelance", expira: d(60) });
      const base = (extra) => ({ id: uid(), creado: now(), creado_por: founder.id, ...extra });
      const c1 = base({
        nombre: "Caf\xE9 Nocturno (ejemplo)",
        empresa: "Caf\xE9 Nocturno C.A.",
        email: "contacto@cafenocturno.example",
        telefono: "+58 412-000-0001",
        estado: "Actual",
        origen: "Instagram",
        temperatura: "Caliente",
        categoria: "Restaurante / comida",
        valor_estimado: 5400,
        asignados: [pm.id, social.id, mb.id],
        marca_colores: "#1B1B1F (negro caf\xE9), #E8C07D (crema), #8C3B2E (ladrillo)",
        marca_tipografias: "Fraunces (t\xEDtulos) \xB7 Inter (texto)",
        marca_logos: "https://drive.example/cafenocturno/logos",
        marca_tono: "Cercano, nocturno y con humor suave. Nunca usar jerga agresiva.",
        link_bio: "https://linktr.ee/cafenocturno",
        notas_internas: "Paga puntual. Prefiere reuniones los martes.",
        historial: [{ fecha: now(), tipo: "Reuni\xF3n", nota: "Arrancamos manejo de redes de diciembre.", por: pm.nombre }],
        ultimo_contacto: d(-3)
      });
      const c2 = base({ nombre: "Arcade 2:17 (ejemplo)", empresa: "Arcade 217 LLC", email: "hello@arcade217.example", estado: "Contactado", origen: "Referido", temperatura: "Tibio", categoria: "Juegos / gaming", valor_estimado: 3750, asignados: [ventas.id], historial: [{ fecha: now(), tipo: "Llamada", nota: "Interesados en un juego promocional para su apertura.", por: ventas.nombre }], ultimo_contacto: d(-1) });
      const c3 = base({ nombre: "Moonfruit Records (ejemplo)", empresa: "Moonfruit Records", email: "info@moonfruit.example", estado: "Por contactar", origen: "Evento", temperatura: "Fr\xEDo", categoria: "M\xFAsica / entretenimiento", asignados: [ventas.id], historial: [] });
      db.clients.push(c1, c2, c3);
      const cliUser = mk("Elena Duarte (ejemplo)", "elena@cafenocturno.example", "cliente", { client_id: c1.id, puesto: "Due\xF1a de Caf\xE9 Nocturno" });
      const s = (nombre, categoria, precio, rondas, plazo, entregables) => base({ nombre, categoria, precio, rondas_incluidas: rondas, plazo_dias: plazo, entregables });
      db.services.push(
        s("Identidad de marca completa", "Dise\xF1o y arte", 1200, 3, 21, "Logo, paleta, tipograf\xEDas, manual de marca en PDF"),
        s("Manejo de redes \xB7 plan mensual", "Marketing y contenido", 450, 2, 30, "12 posts, 4 reels, calendario y reporte mensual"),
        s("Reel / video corto", "Audiovisual", 120, 2, 5, "Video 9:16 de hasta 60 s con subt\xEDtulos y m\xFAsica licenciada"),
        s("Animaci\xF3n de logo (motion)", "Audiovisual", 250, 2, 7, "Logo animado 5 s en MP4 y versi\xF3n transparente"),
        s("P\xE1gina web (landing)", "Digital", 900, 2, 20, "Dise\xF1o UI + desarrollo + publicaci\xF3n"),
        s("Juego promocional", "Digital", 3500, 2, 45, "Mini juego web o Roblox con la marca del cliente")
      );
      const p1 = base({ codigo: core.nextCode("PRY"), nombre: "Redes de diciembre \xB7 Caf\xE9 Nocturno (ejemplo)", client_id: c1.id, servicio: "Manejo de redes \xB7 plan mensual", estado: "En curso", pm: pm.id, equipo: [social.id, dis.id, edit.id], inicio: d(-5), entrega: d(10), precio: 450, costo_interno: 220, rondas_incluidas: 2, rondas_usadas: 2, costo_ronda_extra: 40, rondas_log: [{ n: 2, fecha: now(), nota: "Cambio de colores en 3 posts", por: pm.nombre }, { n: 1, fecha: now(), nota: "Ajuste de copy", por: pm.nombre }], ordenes_cambio: [], notas_internas: "Ojo: ya usaron sus 2 rondas." });
      const p2 = base({ codigo: core.nextCode("PRY"), nombre: "Juego promocional Arcade 2:17 (ejemplo)", client_id: c2.id, servicio: "Juego promocional", estado: "Por iniciar", pm: pm.id, equipo: [dirc.id, free.id, prod_.id], inicio: d(7), entrega: d(50), precio: 3500, costo_interno: 1600, rondas_incluidas: 2, rondas_usadas: 0, costo_ronda_extra: 150, rondas_log: [], ordenes_cambio: [] });
      db.projects.push(p1, p2);
      const t = (titulo, project_id, asignado, vence, estado, prioridad) => base({ titulo, project_id, asignado, vence, estado, prioridad, creado_por: pm.id });
      db.tasks.push(
        t("Dise\xF1ar 4 posts de la semana 1", p1.id, dis.id, d(1), "En curso", "Alta"),
        t("Editar reel de lanzamiento de postres", p1.id, edit.id, d(2), "Por hacer", "Alta"),
        t("Programar publicaciones de la semana", p1.id, social.id, d(0), "Por hacer", "Media"),
        t("Responder comentarios y mensajes", p1.id, social.id, d(-1), "Por hacer", "Media"),
        t("Bocetos del personaje del juego", p2.id, free.id, d(12), "Por hacer", "Media"),
        t("Documento de dise\xF1o del juego (GDD)", p2.id, dirc.id, d(9), "Por hacer", "Alta"),
        t("Moodboard aprobado por el cliente", p1.id, dis.id, d(-4), "Hecha", "Media")
      );
      const q = base({
        codigo: core.nextCode("COT"),
        titulo: "Juego promocional para la apertura (ejemplo)",
        client_id: c2.id,
        estado: "Enviada",
        fecha: d(-2),
        vence: d(13),
        rondas_incluidas: 2,
        descuento_pct: 5,
        impuesto_pct: 0,
        creado_por: ventas.id,
        lineas: [{ descripcion: "Juego promocional (web)", cantidad: 1, precio: 3500 }, { descripcion: "Animaci\xF3n de logo (motion)", cantidad: 1, precio: 250 }],
        notas: "Incluye 2 rondas de cambios. Cada ronda extra: 150 USD."
      });
      db.quotes.push(q);
      const f = base({
        codigo: core.nextCode("FAC"),
        client_id: c1.id,
        project_id: p1.id,
        concepto: "Manejo de redes \xB7 diciembre (ejemplo)",
        fecha: d(-5),
        vence: d(10),
        impuesto_pct: 0,
        lineas: [{ descripcion: "Manejo de redes \xB7 plan mensual", cantidad: 1, precio: 450 }],
        pagos: [{ id: uid(), fecha: d(-4), monto: 200, metodo: "Zelle", referencia: "ZL-88213", estado: "Verificado", reportado_por: fin.nombre, verificado_por: fin.nombre }, { id: uid(), fecha: d(-1), monto: 250, metodo: "Pago M\xF3vil", referencia: "0102-554433", estado: "Por verificar", reportado_por: cliUser.nombre }]
      });
      db.invoices.push(f);
      db.expenses.push(
        base({ concepto: "M\xFAsica licenciada (Artlist) (ejemplo)", monto: 16.6, fecha: d(-6), categoria: "Licencias y software", estado: "Aprobado", usuario_id: edit.id, project_id: p1.id }),
        base({ concepto: "Transporte a sesi\xF3n de fotos (ejemplo)", monto: 12, fecha: d(-2), categoria: "Transporte", estado: "Pendiente", usuario_id: dis.id, project_id: p1.id })
      );
      const sup = base({ nombre: "Serigraf\xEDa Caracas (ejemplo)", contacto: "Pedro", telefono: "+58 414-000-0002", email: "ventas@serigrafia.example", rubro: "Serigraf\xEDa y bordado", tiempo_entrega: "10 d\xEDas", minimo: "24 piezas" });
      db.suppliers.push(sup);
      const prod = (nombre, categoria, precio, costo, stock, min) => base({ nombre, categoria, precio, costo, stock, stock_minimo: min, sku: core.nextCode("SKU"), supplier_id: sup.id });
      db.products.push(prod("Tee #01 \xB7 Black \xB7 M (ejemplo)", "Ropa", 28, 11, 14, 5), prod("Hypno Hoodie \xB7 Violet \xB7 L (ejemplo)", "Ropa", 65, 27, 3, 4), prod("Sticker sheet (ejemplo)", "Papeler\xEDa", 6, 1.2, 120, 30));
      db.products[db.products.length - 3].publicar_tienda = true;
      db.products[db.products.length - 3].descripcion = "Algod\xF3n peinado 220 g, estampado en serigraf\xEDa.";
      db.products[db.products.length - 2].publicar_tienda = true;
      db.products[db.products.length - 2].descripcion = "Hoodie oversize con Spiro bordado.";
      const hoodie = db.products[db.products.length - 2];
      db.purchases.push(base({ codigo: core.nextCode("OC"), supplier_id: sup.id, estado: "Borrador", fecha: d(-1), entrega: d(9), lineas: [{ descripcion: hoodie.nombre, product_id: hoodie.id, cantidad: 24, precio: 27 }], notas: "Bordado de Spiro en el pecho, etiqueta tejida." }));
      const emp = (u, puesto, salario, ingreso, extra = {}) => base({ usuario_id: u.id, puesto, departamento: extra.departamento || "Operaci\xF3n", tipo_contrato: extra.tipo_contrato || "Tiempo completo", ingreso, salario, frecuencia_pago: "Quincenal", estado: "Activo" });
      db.employees.push(emp(pm, "Project Manager", 700, d(-400)), emp(dis, "Dise\xF1ador gr\xE1fico", 550, d(-200), { departamento: "Dise\xF1o" }), emp(edit, "Editora de video", 550, d(-150), { departamento: "Audiovisual" }), emp(social, "Community Manager", 500, d(-90), { departamento: "Marketing" }));
      db.leaves.push(base({ usuario_id: dis.id, tipo: "Vacaciones", desde: d(20), hasta: d(24), motivo: "Viaje familiar", estado: "Pendiente" }));
      db.licenses.push(
        base({ nombre: "Artlist \xB7 plan anual (ejemplo)", tipo: "M\xFAsica", proveedor: "Artlist", alcance: "Uso comercial en redes de clientes", vence: d(25), costo: 199 }),
        base({ nombre: "Sora / Space Grotesk / Space Mono", tipo: "Tipograf\xEDa", proveedor: "Google Fonts (SIL OFL)", alcance: "Libre, incluso comercial", vence: "" })
      );
      db.contracts.push(base({ titulo: "Anexo: campa\xF1a de Navidad \xB7 Caf\xE9 Nocturno (ejemplo)", tipo: "Servicios", client_id: c1.id, estado: "Enviado", pedir_firma: true, inicio: d(5), vence: d(45), notas: "12 piezas para redes y 2 reels. Entrega escalonada en 3 semanas. 2 rondas de cambios por pieza; cada ronda extra 40 USD. Pago 50% al firmar y 50% a la entrega." }));
      db.reviews.push(base({ usuario_id: dis.id, periodo: `Trimestre ${Math.floor((/* @__PURE__ */ new Date()).getMonth() / 3) + 1} ${(/* @__PURE__ */ new Date()).getFullYear()}`, estado: "Compartida", calidad: 5, puntualidad: 3, comunicacion: 4, creatividad: 5, equipo: 4, evaluador: dirc.nombre, creado_por: dirc.id, fortalezas: "Propuestas visuales muy fuertes; el kit de Caf\xE9 Nocturno qued\xF3 impecable.", mejorar: "Avisar antes cuando una entrega se va a retrasar.", objetivos: "Entregar a tiempo el 90% de las piezas del pr\xF3ximo trimestre." }));
      db.contracts.push(base({ titulo: "Contrato de manejo de redes \xB7 Caf\xE9 Nocturno (ejemplo)", tipo: "Servicios", client_id: c1.id, estado: "Firmado", inicio: d(-30), vence: d(335), rondas_clausula: "2 rondas por pieza; ronda extra 40 USD" }));
      db.reminders.push(
        base({ titulo: "Llamar a Moonfruit Records para presentar el estudio (ejemplo)", fecha: `${d(0)}T15:00`, usuario_id: ventas.id, client_id: c3.id }),
        base({ titulo: "Confirmar pago m\xF3vil de Caf\xE9 Nocturno (ejemplo)", fecha: `${d(0)}T10:00`, usuario_id: founder.id, client_id: c1.id }),
        base({ titulo: "Enviar reporte mensual a Caf\xE9 Nocturno (ejemplo)", fecha: `${d(3)}T09:00`, usuario_id: pm.id, client_id: c1.id })
      );
      db.events.push(base({ titulo: "Reuni\xF3n semanal del equipo (ejemplo)", fecha: `${d(1)}T10:00`, lugar: "Discord \xB7 #general", usuario_id: founder.id }));
      db.timesheets.push(base({ usuario_id: dis.id, project_id: p1.id, fecha: d(-1), horas: 4, nota: "Posts semana 1", costo_hora: 4 }), base({ usuario_id: edit.id, project_id: p1.id, fecha: d(-1), horas: 3, nota: "Edici\xF3n reel", costo_hora: 4 }));
      const pz1 = base({
        codigo: core.nextCode("PZ"),
        titulo: "Post: lanzamiento de postres (ejemplo)",
        project_id: p1.id,
        tipo: "Imagen",
        version: 2,
        estado: "Revisi\xF3n del cliente",
        asignado: dis.id,
        fecha_limite: d(2),
        enlace: "https://drive.example/cafenocturno/post-postres-v2",
        rondas_cliente: 0,
        enviada_cliente: now(),
        versiones: [{ version: 1, enlace: "https://drive.example/cafenocturno/post-postres-v1", fecha: now() }],
        comentarios: [{ id: uid(), fecha: now(), por: dirc.nombre, texto: "Cambios internos: subir el contraste del t\xEDtulo.", interno: true, version: 1 }, { id: uid(), fecha: now(), por: dirc.nombre, texto: "Aprobada internamente. Lista para el cliente.", interno: true, version: 2 }]
      });
      const pz2 = base({ codigo: core.nextCode("PZ"), titulo: "Reel: lanzamiento de postres (ejemplo)", project_id: p1.id, tipo: "Video", version: 1, estado: "Revisi\xF3n interna", asignado: edit.id, fecha_limite: d(3), enlace: "https://drive.example/cafenocturno/reel-v1", versiones: [], comentarios: [], rondas_cliente: 0 });
      const pz3 = base({ codigo: core.nextCode("PZ"), titulo: "Moodboard de diciembre (ejemplo)", project_id: p1.id, tipo: "PDF", version: 1, estado: "Aprobada", asignado: dis.id, aprobada: now(), aprobada_por: cliUser.nombre, versiones: [], comentarios: [{ id: uid(), fecha: now(), por: cliUser.nombre, texto: "\u2714 Aprobada. \xA1Nos encanta!", cliente: true, version: 1 }], rondas_cliente: 0 });
      db.pieces.push(pz1, pz2, pz3);
      const post = (titulo, fecha, estado, formato, redes, extra = {}) => base({ titulo, client_id: c1.id, fecha, estado, formato, redes, responsable: social.id, comentarios: [], ...extra });
      db.posts.push(
        post("Lanzamiento de postres (ejemplo)", `${d(2)}T18:00`, "Por aprobar", "Carrusel", ["Instagram", "Facebook"], { piece_id: pz1.id, copy: "Lleg\xF3 la noche m\xE1s dulce \u{1F319} Nuevos postres desde este viernes.", hashtags: "#Caf\xE9Nocturno #Postres" }),
        post("Reel detr\xE1s de c\xE1maras (ejemplo)", `${d(4)}T19:30`, "En dise\xF1o", "Reel", ["Instagram", "TikTok"], { piece_id: pz2.id }),
        post("Horario de diciembre (ejemplo)", `${d(-2)}T12:00`, "Publicado", "Post", ["Instagram"], { alcance: 2150, interacciones: 184 }),
        post("Encuesta: \xBFqu\xE9 postre quieres? (ejemplo)", `${d(6)}T17:00`, "Idea", "Story", ["Instagram"])
      );
      db.campaigns.push(
        base({ nombre: "Postres de diciembre \xB7 alcance (ejemplo)", client_id: c1.id, plataforma: "Meta (Facebook / Instagram)", objetivo: "Mensajes", estado: "Activa", inicio: d(-6), fin: d(8), presupuesto: 120, gastado: 104, resultados: 37, tipo_resultado: "Conversaciones por WhatsApp", alcance: 18400, clics: 520, responsable: mb.id }),
        base({ nombre: "Seguidores TikTok (ejemplo)", client_id: c1.id, plataforma: "TikTok", objetivo: "Seguidores", estado: "Planeada", inicio: d(5), fin: d(20), presupuesto: 80, gastado: 0, responsable: mb.id })
      );
      const g1 = base({ nombre: "Mothlight (ejemplo)", motor: "Godot", plataformas: ["PC / Steam", "Nintendo Switch"], etapa: "2. Producci\xF3n", hito: "Demo para Steam Next Fest", fecha_hito: d(40), lanzamiento: "", wishlists: 1240, enlace_steam: "https://store.steampowered.com/", pilares: "Exploraci\xF3n nocturna \xB7 luz como recurso \xB7 Spiro como gu\xEDa", checklist: { "Idea y pilares": true, "GDD": true, "Arte conceptual": true, "Prototipo jugable": true, "Sprints e hitos definidos": true, "Control de versiones (Git LFS)": true } });
      const g2 = base({ nombre: "Juego promocional Arcade 2:17 (ejemplo)", client_id: c2.id, project_id: p2.id, motor: "Web / Three.js", plataformas: ["Web"], etapa: "1. Concepto y preproducci\xF3n", hito: "Prototipo jugable", fecha_hito: d(20), checklist: {} });
      db.games.push(g1, g2);
      db.tasks.push(t("Animaci\xF3n de vuelo de Spiro", p2.id, free.id, d(15), "Por hacer", "Media"));
      db.bugs.push(
        base({ codigo: core.nextCode("BUG"), titulo: "El juego se cierra al pausar en el nivel 2 (ejemplo)", game_id: g1.id, severidad: "Bloqueante", estado: "Confirmado", plataforma: "PC / Steam", version: "0.4.1", origen: "Playtest", pasos: "1. Entrar al nivel 2\n2. Pausar con ESC durante la animaci\xF3n de las alas\n3. El juego se cierra", asignado: dirc.id, votos: 6 }),
        base({ codigo: core.nextCode("BUG"), titulo: "Texto cortado en el men\xFA en espa\xF1ol (ejemplo)", game_id: g1.id, severidad: "Baja", estado: "Nuevo", plataforma: "PC / Steam", version: "0.4.1", origen: "Discord", votos: 2, creado_por: social.id })
      );
      db.keys.push(
        base({ game_id: g1.id, plataforma: "Steam", llave: "XXXXX-DEMO1-ABCDE", estado: "Cubierta", creador: "NocheIndie (ejemplo)", red: "YouTube", canal: "https://youtube.com/", seguidores: 48e3, fecha_envio: d(-10), cobertura: "https://youtube.com/" }),
        base({ game_id: g1.id, plataforma: "Steam", llave: "XXXXX-DEMO2-FGHIJ", estado: "Enviada", creador: "polilla_streams (ejemplo)", red: "Twitch", canal: "https://twitch.tv/", seguidores: 12500, fecha_envio: d(-2) }),
        base({ game_id: g1.id, plataforma: "Steam", llave: "XXXXX-DEMO3-KLMNO", estado: "Disponible" }),
        base({ game_id: g1.id, plataforma: "Steam", llave: "XXXXX-DEMO4-PQRST", estado: "Disponible" })
      );
      db.subscriptions.push(
        base({ nombre: "Manejo de redes \xB7 Caf\xE9 Nocturno (ejemplo)", client_id: c1.id, project_id: p1.id, tipo: "Plan mensual", frecuencia: "Mensual", monto: 450, inicio: d(-35), proximo_cobro: d(2), estado: "Activo" }),
        base({ nombre: "Bot de reservas por WhatsApp (ejemplo)", client_id: c1.id, tipo: "Alquiler", frecuencia: "Mensual", monto: 35, inicio: d(-60), proximo_cobro: d(12), fin: d(120), estado: "Activo", nota: "Sistema propio rentado: incluye mantenimiento." })
      );
      const tee = db.products[0], stk = db.products[2];
      db.orders.push(
        base({ codigo: core.nextCode("PED"), comprador: "Mar\xEDa G. (ejemplo)", contacto: "@maria.g", canal: "Instagram", fecha: d(0), estado: "Nuevo", metodo: "Pago M\xF3vil", lineas: [{ descripcion: tee.nombre, product_id: tee.id, cantidad: 1, precio: 28 }, { descripcion: stk.nombre, product_id: stk.id, cantidad: 2, precio: 6 }], stock_aplicado: false, entrega: "Delivery en Caracas" })
      );
      db.tickets.push(
        base({
          codigo: core.nextCode("SOP"),
          asunto: "\xBFPueden cambiar el horario del post del viernes? (ejemplo)",
          client_id: c1.id,
          project_id: p1.id,
          tipo: "Solicitud de cambio",
          prioridad: "Media",
          canal: "Portal",
          estado: "Nuevo",
          creado_por: cliUser.id,
          respuestas: [{ id: uid(), fecha: now(), por: cliUser.nombre, texto: "Hola, \xBFse puede mover el post del viernes a las 8 pm? Ese d\xEDa tenemos m\xFAsica en vivo.", cliente: true }]
        })
      );
      db.candidates.push(
        base({ nombre: "Luc\xEDa Paredes (ejemplo)", puesto: "Motion Graphics", email: "lucia@ejemplo.com", portafolio: "https://behance.net/", etapa: "Prueba t\xE9cnica", fuente: "Instagram", fecha: d(-4), salario_pedido: 600, notas: "Muy buena en animaci\xF3n de logos. Prueba: animar a Spiro 5 s." }),
        base({ nombre: "Tom\xE1s Ibarra (ejemplo)", puesto: "Desarrollador de juegos (Godot)", email: "tomas@ejemplo.com", portafolio: "https://itch.io/", etapa: "Recibido", fuente: "Discord", fecha: d(-1) })
      );
      db.meta.demo = true;
      db.meta.demo_password = DEMO_PASSWORD;
      core.audit("crear", "sistema", null, "Datos de ejemplo cargados");
    }
    module.exports = { load, DEMO_PASSWORD };
  }
});

// src/main/core.js
var require_core = __commonJS({
  "src/main/core.js"(exports, module) {
    var fs = (init_shim_vacio(), __toCommonJS(shim_vacio_exports));
    var path = (init_shim_vacio(), __toCommonJS(shim_vacio_exports));
    var crypto = (init_shim_crypto(), __toCommonJS(shim_crypto_exports));
    var { ROLES, MODULES, PERMS, FIELD_VIS, STAFF, CLIENT_ROLES } = require_config();
    var REDES_SOCIALES = ["Instagram", "Facebook", "TikTok", "YouTube", "X"];
    var REDES_AUTO = { Instagram: "Instagram", Facebook: "Facebook", TikTok: "TikTok", YouTube: "YouTube", X: "X" };
    var MANUALES_V = Math.max(...require_manuales().map((d) => d.v || 1));
    var COLLECTIONS = [
      "users",
      "clients",
      "reminders",
      "services",
      "quotes",
      "projects",
      "tasks",
      "events",
      "timesheets",
      "invoices",
      "expenses",
      "products",
      "stock_moves",
      "suppliers",
      "employees",
      "leaves",
      "payslips",
      "contracts",
      "licenses",
      "audit",
      "tickets",
      "pieces",
      "posts",
      "campaigns",
      "games",
      "bugs",
      "keys",
      "subscriptions",
      "orders",
      "candidates",
      "docs",
      "reviews",
      "purchases",
      "vault",
      "socials",
      "social_tokens"
    ];
    var PIECE_CLIENT_STATES = ["Revisi\xF3n del cliente", "Cambios pedidos", "Aprobada"];
    var POST_HIDDEN_FOR_CLIENT = ["Idea", "En dise\xF1o"];
    var ORDER_STOCK_STATES = ["Pagado", "Enviado", "Entregado"];
    var GAME_STAGES = ["1. Concepto y preproducci\xF3n", "2. Producci\xF3n", "3. Pruebas", "4. Prelanzamiento", "5. Lanzamiento", "6. Poslanzamiento"];
    var MOD_BY_COL = Object.fromEntries(MODULES.filter((m) => m.col).map((m) => [m.col, m.key]));
    var COL_BY_MOD = Object.fromEntries(MODULES.filter((m) => m.col).map((m) => [m.key, m.col]));
    var DEFAULT_SETTINGS = {
      empresa: "Delirium Studios",
      web: "staydelirious.com",
      redes: "@DeliriumCoven",
      rif: "",
      direccion: "",
      telefono: "",
      correo_general: "hola@staydelirious.com",
      correo_soporte: "soporte@staydelirious.com",
      correo_ventas: "ventas@staydelirious.com",
      correo_prensa: "prensa@staydelirious.com",
      moneda: "USD",
      simbolo: "$",
      impuesto_nombre: "IVA",
      impuesto_pct: 0,
      rondas_incluidas_defecto: 2,
      costo_ronda_extra_defecto: 0,
      stock_minimo_defecto: 5,
      metodos_pago: ["Pago M\xF3vil", "Zelle", "Transferencia", "Binance", "Efectivo", "PayPal", "Otro"],
      actualizaciones_url: "",
      actualizaciones_repo: "",
      tema: "oscuro",
      discord_webhook: "",
      discord_avisos: ["soporte", "piezas", "pagos", "bugs", "redes", "cotizaciones", "pedidos"],
      discord_bot_token: "",
      discord_canal_bugs: "",
      discord_juego_id: "",
      meta_token: "",
      meta_version: "v26.0",
      web_publica: "https://delirium-studios.github.io",
      correo_privacidad: "",
      zona_horaria: "America/Caracas",
      meta_app_id: "",
      meta_app_secret: "",
      ig_config_id: "",
      fb_config_id: "",
      ig_app_id: "",
      ig_app_secret: "",
      tiktok_client_key: "",
      tiktok_client_secret: "",
      tiktok_auditada: false,
      google_client_id: "",
      google_client_secret: "",
      youtube_auditada: false,
      x_client_id: "",
      x_client_secret: "",
      x_activo: false,
      cron_secreto: "",
      redes_ultima_sync: null,
      boveda_verificador: null,
      tienda_activa: false,
      tienda_titulo: "Delirium Merch",
      tienda_datos_pago: "",
      tienda_envios: "Delivery en Caracas y env\xEDos a toda Venezuela por MRW o Zoom."
    };
    var SECRET_SETTINGS = ["actualizaciones_url", "discord_webhook", "discord_bot_token", "meta_token", "meta_app_secret", "ig_app_secret", "tiktok_client_secret", "google_client_secret", "x_client_secret", "cron_secreto"];
    var now = () => (/* @__PURE__ */ new Date()).toISOString();
    var uid = () => crypto.randomUUID();
    var ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    var today = () => ymd(/* @__PURE__ */ new Date());
    var num = (v) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };
    var round2 = (n) => Math.round(num(n) * 100) / 100;
    var AccessError = class extends Error {
      constructor(msg) {
        super(msg);
        this.code = "ACCESS";
      }
    };
    var InputError = class extends Error {
      constructor(msg) {
        super(msg);
        this.code = "INPUT";
      }
    };
    function hashPw(pw) {
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto.scryptSync(String(pw), salt, 64, { N: 16384 }).toString("hex");
      return `scrypt$${salt}$${hash}`;
    }
    function verifyPw(pw, stored) {
      if (!stored || !stored.startsWith("scrypt$")) return false;
      const [, salt, hash] = stored.split("$");
      const test = crypto.scryptSync(String(pw), salt, 64, { N: 16384 });
      return crypto.timingSafeEqual(test, Buffer.from(hash, "hex"));
    }
    var Core = class _Core {
      constructor(dataDir, opts = {}) {
        this.user = null;
        this.timer = null;
        this.events = [];
        if (opts.db) {
          this.memory = true;
          this.db = opts.db;
          this.normalize();
          return;
        }
        this.dir = dataDir;
        this.file = path.join(dataDir, "delirium-os.json");
        this.backupDir = path.join(dataDir, "copias");
        fs.mkdirSync(this.backupDir, { recursive: true });
        this.load();
      }
      normalize() {
        const db = this.db;
        db.meta = db.meta || { version: 1, creado: now() };
        for (const c of COLLECTIONS) if (!Array.isArray(db[c])) db[c] = [];
        db.settings = { ...DEFAULT_SETTINGS, ...db.settings || {} };
        db.counters = db.counters || {};
        if (!db.settings.cron_secreto) db.settings.cron_secreto = crypto.randomBytes(24).toString("hex");
        if (db.users.length && Number(db.meta.manuales || 0) < MANUALES_V) this.seedDocs(db.users[0].id);
      }
      emit(tipo, titulo, detalle = "", extra = {}) {
        this.events.push({ tipo, titulo, detalle, fecha: now(), ...extra });
      }
      takeEvents() {
        const e = this.events;
        this.events = [];
        return e;
      }
      // ───────────── almacenamiento ─────────────
      load() {
        let db = null;
        if (fs.existsSync(this.file)) {
          try {
            db = JSON.parse(fs.readFileSync(this.file, "utf8"));
          } catch (e) {
            const bad = this.file + ".da\xF1ado-" + Date.now();
            fs.copyFileSync(this.file, bad);
            db = this.latestBackup();
          }
        }
        this.db = db || { meta: { version: 1, creado: now() }, counters: {}, settings: {} };
        for (const c of COLLECTIONS) if (!Array.isArray(this.db[c])) this.db[c] = [];
        this.db.settings = { ...DEFAULT_SETTINGS, ...this.db.settings || {} };
        this.db.counters = this.db.counters || {};
        if (this.db.users.length && Number(this.db.meta && this.db.meta.manuales || 0) < MANUALES_V) {
          this.seedDocs(this.db.users[0].id);
          try {
            this.flush();
          } catch (e) {
          }
        }
      }
      seedDocs(by) {
        this.db.meta = this.db.meta || {};
        const lista = require_manuales();
        const actual = Number(this.db.meta.manuales || 0);
        const maxV = Math.max(...lista.map((d) => d.v || 1));
        if (actual >= maxV) return;
        for (const { v, ...d } of lista) if ((v || 1) > actual && !this.db.docs.some((x) => x.titulo === d.titulo)) this.db.docs.push({ id: uid(), creado: now(), creado_por: by, sistema: true, ...d });
        this.db.meta.manuales = maxV;
      }
      latestBackup() {
        const files = fs.readdirSync(this.backupDir).filter((f) => f.endsWith(".json")).sort().reverse();
        for (const f of files) {
          try {
            return JSON.parse(fs.readFileSync(path.join(this.backupDir, f), "utf8"));
          } catch (e) {
          }
        }
        return null;
      }
      persist() {
        if (this.memory) return;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.flush(), 250);
      }
      flush() {
        if (this.memory) return;
        clearTimeout(this.timer);
        const tmp = this.file + ".tmp";
        fs.writeFileSync(tmp, JSON.stringify(this.db));
        fs.renameSync(tmp, this.file);
        const day = path.join(this.backupDir, `copia-${today()}.json`);
        if (!fs.existsSync(day)) {
          fs.copyFileSync(this.file, day);
          const all = fs.readdirSync(this.backupDir).filter((f) => /^copia-.*\.json$/.test(f)).sort();
          while (all.length > 30) fs.unlinkSync(path.join(this.backupDir, all.shift()));
        }
      }
      nextCode(prefix) {
        this.db.counters[prefix] = (this.db.counters[prefix] || 0) + 1;
        return `${prefix}-${String(this.db.counters[prefix]).padStart(4, "0")}`;
      }
      audit(action, modulo, id, detalle) {
        this.db.audit.unshift({
          id: uid(),
          fecha: now(),
          usuario_id: this.user ? this.user.id : null,
          usuario: this.user ? this.user.nombre : "Sistema",
          accion: action,
          modulo,
          registro_id: id || null,
          detalle: detalle || ""
        });
        if (this.db.audit.length > 5e3) this.db.audit.length = 5e3;
      }
      // ───────────── cuentas ─────────────
      hasUsers() {
        return this.db.users.length > 0;
      }
      demoAccounts() {
        if (!this.db.meta || !this.db.meta.demo) return null;
        return { password: this.db.meta.demo_password, cuentas: this.db.users.filter((u) => u.demo && u.activo).map((u) => ({ email: u.email, nombre: u.nombre, rol: ROLES[u.rol].label })) };
      }
      publicUser(u) {
        if (!u) return null;
        const { password, intentos, bloqueado_hasta, ...rest } = u;
        return rest;
      }
      setup({ nombre, email, password, demo }) {
        if (this.hasUsers()) throw new AccessError("El sistema ya tiene una cuenta principal.");
        this.validatePassword(password);
        if (!nombre || !email) throw new InputError("Escribe tu nombre y tu correo.");
        const u = {
          id: uid(),
          nombre: String(nombre).trim(),
          email: String(email).trim().toLowerCase(),
          rol: "founder",
          activo: true,
          password: hashPw(password),
          creado: now(),
          client_id: null,
          expira: null,
          tema: "oscuro"
        };
        this.db.users.push(u);
        this.user = u;
        this.audit("crear", "equipo", u.id, "Cuenta principal (Founder / CEO) creada");
        this.seedDocs(u.id);
        if (demo) require_demo().load(this, { hashPw, uid, now, today });
        this.flush();
        return this.publicUser(u);
      }
      validatePassword(pw) {
        if (!pw || String(pw).length < 8) throw new InputError("La contrase\xF1a debe tener al menos 8 caracteres.");
      }
      login(email, password) {
        const u = this.db.users.find((x) => x.email === String(email || "").trim().toLowerCase());
        const fail = "Correo o contrase\xF1a incorrectos.";
        if (!u) throw new AccessError(fail);
        if (u.bloqueado_hasta && new Date(u.bloqueado_hasta) > /* @__PURE__ */ new Date()) {
          const min = Math.ceil((new Date(u.bloqueado_hasta) - /* @__PURE__ */ new Date()) / 6e4);
          throw new AccessError(`Demasiados intentos. Vuelve a intentar en ${min} min.`);
        }
        if (!verifyPw(password, u.password)) {
          u.intentos = (u.intentos || 0) + 1;
          if (u.intentos >= 5) {
            u.bloqueado_hasta = new Date(Date.now() + 5 * 6e4).toISOString();
            u.intentos = 0;
          }
          this.persist();
          throw new AccessError(fail);
        }
        if (!u.activo) throw new AccessError("Esta cuenta est\xE1 desactivada. Habla con direcci\xF3n.");
        if (u.expira && u.expira < today()) throw new AccessError("El acceso de esta cuenta venci\xF3. Habla con tu Project Manager.");
        u.intentos = 0;
        u.bloqueado_hasta = null;
        u.ultimo_acceso = now();
        this.user = u;
        this.audit("entrar", "sistema", u.id, "Inicio de sesi\xF3n");
        this.persist();
        return this.publicUser(u);
      }
      logout() {
        if (this.user) this.audit("salir", "sistema", this.user.id, "Cierre de sesi\xF3n");
        this.user = null;
        this.persist();
      }
      me() {
        return this.publicUser(this.user);
      }
      requireUser() {
        if (!this.user) throw new AccessError("Tu sesi\xF3n termin\xF3. Vuelve a entrar.");
        return this.user;
      }
      changeOwnPassword(oldPw, newPw) {
        const u = this.requireUser();
        if (!verifyPw(oldPw, u.password)) throw new AccessError("La contrase\xF1a actual no es correcta.");
        this.validatePassword(newPw);
        u.password = hashPw(newPw);
        this.audit("editar", "equipo", u.id, "Cambi\xF3 su contrase\xF1a");
        this.persist();
        return true;
      }
      setTheme(tema) {
        const u = this.requireUser();
        u.tema = tema === "claro" ? "claro" : "oscuro";
        this.persist();
        return u.tema;
      }
      // ───────────── permisos ─────────────
      perm(moduleKey, user = this.user) {
        if (!user) return { level: null, scope: null };
        const p = (PERMS[moduleKey] || {})[user.rol];
        if (!p) return { level: null, scope: null };
        const [level, scope] = p.split(":");
        return { level, scope };
      }
      canRead(m) {
        return !!this.perm(m).level;
      }
      canWrite(m) {
        return this.perm(m).level === "W";
      }
      isAdmin() {
        return !!(this.user && ROLES[this.user.rol] && ROLES[this.user.rol].admin);
      }
      isClient() {
        return !!(this.user && CLIENT_ROLES.includes(this.user.rol));
      }
      fieldAllowed(col, field, rec) {
        const rules = FIELD_VIS[col];
        if (!rules || !rules[field]) return true;
        const allow = rules[field];
        if (allow.includes(this.user.rol)) return true;
        if (allow.includes("self") && rec && this.isOwnRecord(col, rec)) return true;
        return false;
      }
      isOwnRecord(col, rec) {
        const me = this.user.id;
        if (col === "employees" || col === "payslips" || col === "timesheets" || col === "leaves" || col === "expenses" || col === "reviews") return rec.usuario_id === me;
        if (col === "reminders" || col === "events") return rec.usuario_id === me || rec.creado_por === me;
        return rec.creado_por === me;
      }
      projectAssigned(p, me) {
        return !!p && (p.pm === me || (p.equipo || []).includes(me) || p.creado_por === me);
      }
      clientAssigned(c, me) {
        return !!c && ((c.asignados || []).includes(me) || c.creado_por === me);
      }
      inScope(col, rec, scope) {
        const me = this.user.id;
        if (col === "docs") {
          if (this.isClient()) return rec.visibilidad === "Clientes tambi\xE9n";
          if (rec.visibilidad === "Solo direcci\xF3n" && !this.isAdmin()) return rec.creado_por === me;
          return scope === "all" || rec.creado_por === me;
        }
        if (col === "reviews" && scope !== "all") return rec.creado_por === me || rec.usuario_id === me && rec.estado !== "Borrador";
        if (col === "vault" && scope !== "all") return rec.creado_por === me || (rec.compartido_con || []).includes(me);
        if (scope === "all") return true;
        if (scope === "self") return this.isOwnRecord(col, rec);
        if (scope === "client") {
          const cid = this.user.client_id;
          if (!cid) return false;
          if (col === "tasks") {
            const p = this.db.projects.find((x) => x.id === rec.project_id);
            return !!p && p.client_id === cid;
          }
          if (col === "pieces") {
            const p = this.db.projects.find((x) => x.id === rec.project_id);
            return !!p && p.client_id === cid && PIECE_CLIENT_STATES.includes(rec.estado);
          }
          if (col === "posts") return rec.client_id === cid && !POST_HIDDEN_FOR_CLIENT.includes(rec.estado);
          return rec.client_id === cid;
        }
        if (scope === "assigned") {
          switch (col) {
            case "clients":
              return this.clientAssigned(rec, me);
            case "projects":
              return this.projectAssigned(rec, me);
            case "tasks": {
              if (rec.asignado === me || rec.creado_por === me) return true;
              if (this.user.rol === "pm") return this.projectAssigned(this.db.projects.find((x) => x.id === rec.project_id), me);
              return false;
            }
            case "quotes":
            case "invoices":
            case "contracts": {
              if (rec.creado_por === me) return true;
              const p = rec.project_id && this.db.projects.find((x) => x.id === rec.project_id);
              if (p && this.projectAssigned(p, me)) return true;
              return this.clientAssigned(this.db.clients.find((x) => x.id === rec.client_id), me);
            }
            case "tickets": {
              if (rec.asignado === me || rec.creado_por === me) return true;
              const p = rec.project_id && this.db.projects.find((x) => x.id === rec.project_id);
              if (p && this.projectAssigned(p, me)) return true;
              return this.clientAssigned(this.db.clients.find((x) => x.id === rec.client_id), me);
            }
            case "pieces":
              return rec.asignado === me || rec.creado_por === me || this.projectAssigned(this.db.projects.find((x) => x.id === rec.project_id), me);
            case "posts":
            case "campaigns":
            case "subscriptions":
              return rec.responsable === me || rec.creado_por === me || this.clientAssigned(this.db.clients.find((x) => x.id === rec.client_id), me);
            case "games":
              return rec.creado_por === me || this.projectAssigned(this.db.projects.find((x) => x.id === rec.project_id), me);
            case "bugs": {
              if (rec.asignado === me || rec.creado_por === me) return true;
              const g = rec.game_id && this.db.games.find((x) => x.id === rec.game_id);
              const pid = rec.project_id || g && g.project_id;
              return this.user.rol === "pm" && this.projectAssigned(this.db.projects.find((x) => x.id === pid), me);
            }
            default:
              return rec.creado_por === me;
          }
        }
        return false;
      }
      strip(col, rec) {
        const out = { ...rec };
        if (col === "users") {
          delete out.password;
          delete out.intentos;
          delete out.bloqueado_hasta;
        }
        const rules = FIELD_VIS[col] || {};
        for (const f of Object.keys(rules)) if (!this.fieldAllowed(col, f, rec)) delete out[f];
        if (this.isClient()) {
          delete out.notas_internas;
          delete out.costo_interno;
          delete out.creado_por;
          delete out.actualizado_por;
          if (Array.isArray(out.pagos)) out.pagos = out.pagos.map((p) => ({ ...p, reportado_por: p.reportado_por === this.user.nombre ? p.reportado_por : "Delirium Studios", verificado_por: p.verificado_por ? "Delirium Studios" : null }));
          if (Array.isArray(out.rondas_log)) out.rondas_log = out.rondas_log.map((x) => ({ ...x, por: "Delirium Studios" }));
          for (const k of ["respuestas", "comentarios"]) if (Array.isArray(out[k])) out[k] = out[k].filter((x) => !x.interno);
          if (col === "pieces") {
            delete out.versiones;
            delete out.asignado;
          }
        }
        return this.decorate(col, out);
      }
      nameOf(col, id) {
        const r = id && this.db[col].find((x) => x.id === id);
        return r ? r.nombre || r.titulo || r.codigo || "" : "";
      }
      decorate(col, r) {
        if (r.client_id) r._cliente = this.nameOf("clients", r.client_id);
        if (col === "socials") {
          if (!r.client_id) r._cliente = "Delirium Studios";
          r._vence_dias = r.vence ? Math.ceil((Date.parse(r.vence) - Date.now()) / 864e5) : null;
        }
        if (col === "posts" && (r.publicaciones || []).length) {
          r._auto_publicadas = r.publicaciones.filter((x) => x.estado === "Publicado").length;
          r._auto_errores = r.publicaciones.filter((x) => x.estado === "Error").length;
        }
        if (r.project_id) r._proyecto = this.nameOf("projects", r.project_id);
        if (r.supplier_id) r._proveedor = this.nameOf("suppliers", r.supplier_id);
        if (r.product_id) r._producto = this.nameOf("products", r.product_id);
        for (const f of ["pm", "asignado", "usuario_id", "creado_por"]) if (r[f]) r["_" + f] = this.nameOf("users", r[f]);
        if (Array.isArray(r.equipo)) r._equipo = r.equipo.map((id) => this.nameOf("users", id)).filter(Boolean);
        if (Array.isArray(r.asignados)) r._asignados = r.asignados.map((id) => this.nameOf("users", id)).filter(Boolean);
        if (col === "invoices") Object.assign(r, this.invoiceTotals(r));
        if (col === "quotes") Object.assign(r, this.quoteTotals(r));
        if (col === "projects") {
          const tasks = this.db.tasks.filter((t) => t.project_id === r.id);
          r._tareas = tasks.length;
          r._tareas_hechas = tasks.filter((t) => t.estado === "Hecha").length;
          r._progreso = tasks.length ? Math.round(r._tareas_hechas / tasks.length * 100) : 0;
          r._rondas_restantes = Math.max(0, num(r.rondas_incluidas) - num(r.rondas_usadas));
        }
        if (col === "products") r._stock_bajo = num(r.stock) <= num(r.stock_minimo);
        if (r.game_id) r._juego = this.nameOf("games", r.game_id);
        if (r.piece_id) r._pieza = this.nameOf("pieces", r.piece_id);
        if (r.responsable) r._responsable = this.nameOf("users", r.responsable);
        if (col === "campaigns") {
          const pres = num(r.presupuesto), gas = num(r.gastado), res = num(r.resultados);
          r._uso_pct = pres ? Math.round(gas / pres * 100) : 0;
          r._cpr = res ? round2(gas / res) : null;
          r._alerta = pres > 0 && r.estado === "Activa" && r._uso_pct >= 80;
        }
        if (col === "subscriptions") {
          r._por_facturar = r.estado === "Activo" && !!r.proximo_cobro && r.proximo_cobro <= ymd(new Date(Date.now() + 3 * 864e5));
          r._por_devolver = r.tipo === "Alquiler" && r.estado === "Activo" && !!r.fin && r.fin <= ymd(new Date(Date.now() + 3 * 864e5));
        }
        if (col === "orders" || col === "purchases") Object.assign(r, this.linesTotal(r));
        if (col === "reviews") {
          const ps = ["calidad", "puntualidad", "comunicacion", "creatividad", "equipo"].map((k) => num(r[k])).filter(Boolean);
          r._promedio = ps.length ? Math.round(ps.reduce((a, b) => a + b, 0) / ps.length * 10) / 10 : null;
        }
        if ((col === "contracts" || col === "quotes") && Array.isArray(r.firmas) && r.firmas.length) {
          const h = this.docHash(col, r);
          r.firmas = r.firmas.map((f) => ({ ...f, _valida: f.hash === h }));
          r._firmado_cliente = r.firmas.some((f) => f.parte === "cliente");
          r._firmado_estudio = r.firmas.some((f) => f.parte === "estudio");
        }
        if (col === "tickets") {
          const rs = r.respuestas || [];
          r._respuestas = rs.length;
          r._ultima = rs.length ? rs[rs.length - 1] : null;
          r._espera_equipo = !["Resuelto", "Cerrado", "Esperando cliente"].includes(r.estado) && (!rs.length || rs[rs.length - 1].cliente);
        }
        if (col === "games") {
          r._bugs_abiertos = this.db.bugs.filter((b) => b.game_id === r.id && !["Arreglado", "Verificado", "No se arregla"].includes(b.estado)).length;
          const ks = this.db.keys.filter((k) => k.game_id === r.id);
          r._llaves = { total: ks.length, disponibles: ks.filter((k) => k.estado === "Disponible").length, cubiertas: ks.filter((k) => k.estado === "Cubierta").length };
          r._etapa_n = Math.max(1, GAME_STAGES.indexOf(r.etapa) + 1);
        }
        return r;
      }
      // ───────────── lectura / escritura genérica ─────────────
      colOf(m) {
        const c = COL_BY_MOD[m];
        if (!c) throw new InputError("M\xF3dulo desconocido.");
        return c;
      }
      list(m) {
        this.requireUser();
        const { level, scope } = this.perm(m);
        if (!level) throw new AccessError("No tienes acceso a esta secci\xF3n.");
        const col = this.colOf(m);
        return this.db[col].filter((r) => this.inScope(col, r, scope)).map((r) => this.strip(col, r));
      }
      get(m, id) {
        const col = this.colOf(m);
        const { level, scope } = this.perm(m);
        if (!level) throw new AccessError("No tienes acceso a esta secci\xF3n.");
        const r = this.db[col].find((x) => x.id === id);
        if (!r || !this.inScope(col, r, scope)) throw new AccessError("No encontramos este registro o no tienes acceso.");
        return this.strip(col, r);
      }
      save(m, data) {
        const u = this.requireUser();
        const { level, scope } = this.perm(m);
        if (level !== "W") throw new AccessError("Tu rol puede ver esta secci\xF3n, pero no modificarla.");
        const col = this.colOf(m);
        if (col === "users") return this.saveUser(data);
        const clean = {};
        for (const [k, v] of Object.entries(data || {})) {
          if (!k.startsWith("_") && k !== "id") clean[k] = v;
        }
        let rec;
        if (data && data.id) {
          rec = this.db[col].find((x) => x.id === data.id);
          if (!rec || !this.inScope(col, rec, scope)) throw new AccessError("No puedes modificar este registro.");
          for (const k of Object.keys(clean)) if (!this.fieldAllowed(col, k, rec)) delete clean[k];
          this.validate(col, { ...rec, ...clean });
          this.beforeSave(col, clean, rec);
          Object.assign(rec, clean, { actualizado: now(), actualizado_por: u.id });
          this.audit("editar", m, rec.id, this.label(col, rec));
        } else {
          for (const k of Object.keys(clean)) if (!this.fieldAllowed(col, k, { ...clean, creado_por: u.id, usuario_id: clean.usuario_id || u.id })) delete clean[k];
          rec = { id: uid(), creado: now(), creado_por: u.id, ...clean };
          if (scope === "self" && ["reminders", "events", "timesheets", "expenses", "leaves"].includes(col)) rec.usuario_id = rec.usuario_id && this.isAdmin() ? rec.usuario_id : u.id;
          if (scope === "assigned" && col === "clients") rec.asignados = Array.from(/* @__PURE__ */ new Set([...rec.asignados || [], u.id]));
          if (scope === "assigned" && col === "projects" && !rec.pm) rec.pm = u.id;
          this.validate(col, rec);
          this.beforeSave(col, rec, null);
          this.db[col].unshift(rec);
          this.audit("crear", m, rec.id, this.label(col, rec));
          if (col === "tickets" && this.isClient()) this.emit("soporte", `Nueva solicitud de ${this.nameOf("clients", rec.client_id)}`, `${rec.codigo} \xB7 ${rec.asunto}`, { prioridad: rec.prioridad });
          if (col === "bugs" && rec.severidad === "Bloqueante") this.emit("bugs", `Bug bloqueante: ${rec.titulo}`, `${rec.codigo}${rec.game_id ? " \xB7 " + this.nameOf("games", rec.game_id) : ""}`);
        }
        this.afterSave(col, rec);
        this.persist();
        return this.strip(col, rec);
      }
      remove(m, id) {
        this.requireUser();
        const { level, scope } = this.perm(m);
        if (level !== "W") throw new AccessError("Tu rol no puede borrar en esta secci\xF3n.");
        const col = this.colOf(m);
        if (col === "users") throw new InputError("Las cuentas no se borran: desact\xEDvalas para conservar su historial.");
        const i = this.db[col].findIndex((x) => x.id === id);
        if (i < 0 || !this.inScope(col, this.db[col][i], scope)) throw new AccessError("No puedes borrar este registro.");
        const rec = this.db[col][i];
        if (this.isClient()) throw new AccessError("Para borrar algo, escr\xEDbele al equipo de Delirium.");
        if (col === "orders" && rec.stock_aplicado) throw new InputError('Este pedido ya descont\xF3 stock. C\xE1mbialo a "Cancelado" para devolver el stock.');
        if (col === "games" && (this.db.bugs.some((b) => b.game_id === id) || this.db.keys.some((k) => k.game_id === id))) throw new InputError("Este juego tiene bugs o llaves registrados. B\xF3rralos primero o m\xE1rcalo como pausado.");
        if (col === "clients" && this.db.projects.some((p) => p.client_id === id)) throw new InputError("Este cliente tiene proyectos. B\xF3rralos o c\xE1mbialos de cliente primero.");
        if (col === "projects" && this.db.invoices.some((f) => f.project_id === id)) throw new InputError('Este proyecto tiene facturas asociadas y no se puede borrar. C\xE1mbialo a "Cancelado".');
        if (col === "stock_moves") {
          const p = this.db.products.find((x) => x.id === rec.product_id);
          if (p) p.stock = num(p.stock) - this.moveDelta(rec);
        }
        this.db[col].splice(i, 1);
        if (col === "socials") this.db.social_tokens = this.db.social_tokens.filter((t) => t.id !== id);
        if (col === "projects") this.db.tasks = this.db.tasks.filter((t) => t.project_id !== id);
        this.audit("borrar", m, id, this.label(col, rec));
        this.persist();
        return true;
      }
      label(col, r) {
        return r.codigo ? `${r.codigo} \xB7 ${r.nombre || r.titulo || r.asunto || r.comprador || r._cliente || ""}` : r.nombre || r.titulo || r.asunto || r.creador || r.descripcion || r.concepto || "";
      }
      validate(col, r) {
        const req = {
          clients: ["nombre"],
          reminders: ["titulo", "fecha"],
          services: ["nombre"],
          quotes: ["client_id"],
          projects: ["nombre", "client_id"],
          tasks: ["titulo"],
          events: ["titulo", "fecha"],
          timesheets: ["fecha", "horas"],
          invoices: ["client_id"],
          expenses: ["concepto", "monto", "fecha"],
          products: ["nombre"],
          stock_moves: ["product_id", "tipo", "cantidad"],
          suppliers: ["nombre"],
          employees: ["usuario_id"],
          leaves: ["tipo", "desde", "hasta"],
          payslips: ["usuario_id", "periodo"],
          contracts: ["titulo"],
          licenses: ["nombre", "tipo"],
          tickets: ["asunto"],
          pieces: ["titulo", "project_id"],
          posts: ["titulo", "client_id", "fecha"],
          campaigns: ["nombre", "client_id", "plataforma"],
          games: ["nombre"],
          bugs: ["titulo"],
          keys: ["game_id"],
          subscriptions: ["nombre", "client_id", "monto", "proximo_cobro"],
          orders: ["comprador"],
          candidates: ["nombre", "puesto"],
          docs: ["titulo"],
          reviews: ["usuario_id", "periodo"],
          purchases: ["supplier_id"],
          vault: ["nombre"]
        }[col] || [];
        const names = { supplier_id: "proveedor", client_id: "cliente", product_id: "producto", usuario_id: "persona", project_id: "proyecto", game_id: "juego", proximo_cobro: "pr\xF3ximo cobro", asunto: "asunto" };
        for (const f of req) if (r[f] === void 0 || r[f] === null || r[f] === "") throw new InputError(`Falta completar: ${names[f] || f.replace(/_/g, " ")}.`);
        if (col === "leaves" && r.hasta < r.desde) throw new InputError("La fecha final no puede ser antes de la inicial.");
        if (col === "timesheets" && (num(r.horas) <= 0 || num(r.horas) > 24)) throw new InputError("Las horas deben estar entre 0 y 24.");
        if (col === "stock_moves" && num(r.cantidad) <= 0) throw new InputError("La cantidad debe ser mayor que cero.");
        if (col === "subscriptions" && num(r.monto) <= 0) throw new InputError("El monto del plan debe ser mayor que cero.");
        if (col === "campaigns" && r.inicio && r.fin && r.fin < r.inicio) throw new InputError("La fecha final no puede ser antes de la inicial.");
        if (col === "orders" && !(r.lineas || []).some((l) => l.descripcion)) throw new InputError("Agrega al menos un producto al pedido.");
      }
      beforeSave(col, data, existing) {
        const s = this.db.settings;
        if (col === "socials") {
          if (existing) {
            for (const k of Object.keys(data)) if (!["client_id", "red", "nombre", "notas"].includes(k)) delete data[k];
            if (data.red && data.red !== existing.red && existing.estado !== "Sin conectar") throw new InputError("Desconecta la cuenta antes de cambiarle la red.");
          } else {
            for (const k of ["estado", "cuenta_ext", "seguidores", "historial", "vence", "paginas", "ultimo_error", "conectada_el", "enlace_perfil"]) delete data[k];
            data.estado = "Sin conectar";
          }
          if (this.isClient()) {
            if (existing && "client_id" in data && data.client_id !== existing.client_id) delete data.client_id;
            if (!existing) data.client_id = this.user.client_id;
          }
          const red = data.red || existing && existing.red;
          if (!REDES_SOCIALES.includes(red)) throw new InputError("Elige una red: Instagram, Facebook, TikTok, YouTube o X.");
        }
        if (col === "posts") {
          delete data.publicaciones;
          if (data.publicar_auto && !(data.redes || existing && existing.redes || []).some((x) => REDES_AUTO[x])) throw new InputError("Para publicar autom\xE1ticamente, marca al menos una red: Instagram, Facebook, TikTok, YouTube o X.");
        }
        if (!existing) {
          if (col === "projects") {
            data.codigo = data.codigo || this.nextCode("PRY");
            data.rondas_usadas = num(data.rondas_usadas);
            if (data.rondas_incluidas === void 0 || data.rondas_incluidas === "") data.rondas_incluidas = s.rondas_incluidas_defecto;
            data.rondas_log = data.rondas_log || [];
            data.ordenes_cambio = data.ordenes_cambio || [];
            data.estado = data.estado || "Por iniciar";
          }
          if (col === "quotes") {
            data.codigo = this.nextCode("COT");
            data.estado = data.estado || "Borrador";
            data.lineas = data.lineas || [];
            data.fecha = data.fecha || today();
          }
          if (col === "invoices") {
            data.codigo = this.nextCode("FAC");
            data.lineas = data.lineas || [];
            data.pagos = [];
            data.fecha = data.fecha || today();
          }
          if (col === "clients") {
            data.estado = data.estado || "Por contactar";
            data.historial = data.historial || [];
          }
          if (col === "tasks") data.estado = data.estado || "Por hacer";
          if (col === "leaves") data.estado = "Pendiente";
          if (col === "expenses") data.estado = this.canApprove("gastos") ? data.estado || "Aprobado" : "Pendiente";
          if (col === "products") {
            data.stock = num(data.stock);
            data.stock_minimo = data.stock_minimo === void 0 || data.stock_minimo === "" ? s.stock_minimo_defecto : num(data.stock_minimo);
            data.sku = data.sku || this.nextCode("SKU");
          }
          if (col === "reminders") data.hecho = !!data.hecho;
          if (col === "tickets") {
            if (this.isClient()) {
              const keep = { id: data.id, creado: data.creado, creado_por: data.creado_por, asunto: data.asunto, descripcion: data.descripcion, tipo: data.tipo, prioridad: data.prioridad, project_id: data.project_id };
              for (const k of Object.keys(data)) delete data[k];
              Object.assign(data, keep, { client_id: this.user.client_id, canal: "Portal" });
              if (data.project_id) {
                const pr = this.db.projects.find((x) => x.id === data.project_id);
                if (!pr || pr.client_id !== this.user.client_id) data.project_id = null;
              }
              if (!["Baja", "Media", "Alta", "Urgente"].includes(data.prioridad)) data.prioridad = "Media";
            }
            data.codigo = this.nextCode("SOP");
            data.estado = this.isClient() ? "Nuevo" : data.estado || "Nuevo";
            data.respuestas = [];
            if (data.descripcion) data.respuestas.push({ id: uid(), fecha: now(), por: this.isClient() ? this.user.nombre : this.nameOf("clients", data.client_id) || "Cliente", texto: String(data.descripcion), cliente: true, registrado_por: this.isClient() ? null : this.user.nombre });
          }
          if (col === "pieces") {
            data.codigo = this.nextCode("PZ");
            data.version = 1;
            data.versiones = [];
            data.comentarios = [];
            data.estado = data.estado || "En producci\xF3n";
            data.rondas_cliente = 0;
          }
          if (col === "posts") {
            data.estado = data.estado || "Idea";
            data.comentarios = [];
          }
          if (col === "games") {
            data.etapa = data.etapa || GAME_STAGES[0];
            data.checklist = {};
            data.clave_reportes = crypto.randomBytes(12).toString("hex");
          }
          if (col === "bugs") {
            data.codigo = this.nextCode("BUG");
            data.estado = data.estado || "Nuevo";
          }
          if (col === "keys") data.estado = data.estado || "Disponible";
          if (col === "subscriptions") data.estado = data.estado || "Activo";
          if (col === "orders") {
            data.codigo = this.nextCode("PED");
            data.estado = data.estado || "Nuevo";
            data.fecha = data.fecha || today();
            data.stock_aplicado = false;
          }
          if (col === "candidates") {
            data.etapa = data.etapa || "Recibido";
            data.fecha = data.fecha || today();
          }
          if (col === "campaigns") data.estado = data.estado || "Planeada";
          if (col === "reviews") {
            data.estado = data.estado || "Borrador";
            data.evaluador = this.user.nombre;
            if (data.usuario_id === this.user.id && !this.isAdmin()) throw new InputError("No puedes evaluarte a ti mismo.");
          }
          if (col === "purchases") {
            data.codigo = this.nextCode("OC");
            data.estado = data.estado || "Borrador";
            data.fecha = data.fecha || today();
          }
          if (col === "vault" && data.cifrado && (typeof data.cifrado !== "object" || !data.cifrado.ct || !data.cifrado.iv)) throw new InputError("El secreto debe ir cifrado.");
          if (col === "stock_moves") {
            const p = this.db.products.find((x) => x.id === data.product_id);
            if (!p) throw new InputError("El producto no existe.");
            if (num(p.stock) + this.moveDelta(data) < 0) throw new InputError(`No hay suficiente stock de ${p.nombre}. Disponible: ${num(p.stock)}.`);
          }
        } else {
          if (col === "leaves" && "estado" in data && !this.canApprove("ausencias")) delete data.estado;
          if (col === "expenses" && "estado" in data && !this.canApprove("gastos")) delete data.estado;
          if (col === "products" && "stock" in data) delete data.stock;
          if (col === "stock_moves") throw new InputError("Los movimientos no se editan. Borra el movimiento y cr\xE9alo de nuevo.");
          if (this.isClient()) throw new AccessError("Para cambiar algo, responde en la solicitud o escr\xEDbele al equipo.");
          if (col === "reviews" && existing.usuario_id === this.user.id && existing.creado_por !== this.user.id && !this.isAdmin()) throw new AccessError("Puedes responder tu evaluaci\xF3n, pero no editarla.");
          if (col === "purchases" && ["Recibida", "Cancelada"].includes(existing.estado) && "lineas" in data) throw new InputError("Esta orden ya se recibi\xF3: no se pueden cambiar los productos.");
          if ((col === "contracts" || col === "quotes") && "firmas" in data) delete data.firmas;
          for (const k of ["respuestas", "comentarios", "versiones", "checklist", "codigo", "stock_aplicado", "rondas_cliente", "clave_reportes", "eventos", "fingerprint", "ocurrencias", "discord_msg_id"]) delete data[k];
          if (col === "orders" && existing.stock_aplicado && "lineas" in data && JSON.stringify(this.normLines(data.lineas)) !== JSON.stringify(this.normLines(existing.lineas))) throw new InputError("Este pedido ya descont\xF3 stock: no se pueden cambiar los productos. Canc\xE9lalo y crea otro.");
        }
        if (col === "orders") {
          data.lineas = data.lineas === void 0 ? void 0 : this.normLines(data.lineas).map((l) => {
            const pr = l.product_id ? this.db.products.find((x) => x.id === l.product_id) : this.db.products.find((x) => x.nombre.toLowerCase() === l.descripcion.toLowerCase());
            if (!pr) throw new InputError(`No existe el producto "${l.descripcion}". Cr\xE9alo primero en Productos y stock.`);
            return { ...l, descripcion: pr.nombre, product_id: pr.id };
          });
          if (data.lineas === void 0) delete data.lineas;
          const m = { ...existing || {}, ...data };
          this._orderStock = null;
          if (ORDER_STOCK_STATES.includes(m.estado) && !m.stock_aplicado) {
            for (const l of m.lineas || []) {
              const pr = this.db.products.find((x) => x.id === l.product_id);
              if (num(pr.stock) < num(l.cantidad)) throw new InputError(`No hay suficiente stock de ${pr.nombre}. Disponible: ${num(pr.stock)}.`);
            }
            data.stock_aplicado = true;
            this._orderStock = "out";
            if (!m.fecha_pago && m.estado !== "Nuevo") data.fecha_pago = today();
          } else if (m.estado === "Cancelado" && m.stock_aplicado) {
            data.stock_aplicado = false;
            this._orderStock = "in";
          }
        }
        if (col === "payslips") {
          const m = { ...existing || {}, ...data };
          data.neto = round2(num(m.base) + num(m.bonos) - num(m.deducciones));
        }
        if (col === "quotes" || col === "invoices") data.lineas = (data.lineas || []).map((l) => ({ descripcion: String(l.descripcion || ""), cantidad: num(l.cantidad) || 1, precio: round2(l.precio), service_id: l.service_id || null }));
        if (col === "campaigns") {
          for (const k of ["presupuesto", "gastado", "resultados", "alcance", "clics"]) if (k in data && data[k] !== "") data[k] = num(data[k]);
        }
        if (col === "purchases" && data.lineas !== void 0) data.lineas = this.normLines(data.lineas).map((l) => {
          const pr = l.product_id ? this.db.products.find((x) => x.id === l.product_id) : this.db.products.find((x) => x.nombre.toLowerCase() === l.descripcion.toLowerCase());
          return { ...l, product_id: pr ? pr.id : null };
        });
        if (col === "reviews") {
          for (const k of ["calidad", "puntualidad", "comunicacion", "creatividad", "equipo"]) if (k in data && data[k] !== "") data[k] = Math.min(5, Math.max(1, Math.round(num(data[k]))));
        }
      }
      normLines(lines) {
        return (lines || []).filter((l) => l && (l.descripcion || l.product_id)).map((l) => ({ descripcion: String(l.descripcion || "").trim(), cantidad: Math.max(1, Math.round(num(l.cantidad) || 1)), precio: round2(l.precio), product_id: l.product_id || null }));
      }
      afterSave(col, rec) {
        if (col === "stock_moves" && !rec._applied) {
          const p = this.db.products.find((x) => x.id === rec.product_id);
          const d = this.moveDelta(rec);
          p.stock = num(p.stock) + d;
          rec._applied = true;
          rec.stock_resultante = p.stock;
        }
        if (col === "orders" && this._orderStock) {
          const dir = this._orderStock;
          this._orderStock = null;
          for (const l of rec.lineas || []) {
            const p = this.db.products.find((x) => x.id === l.product_id);
            if (!p) continue;
            const mv = {
              id: uid(),
              creado: now(),
              creado_por: this.user.id,
              product_id: p.id,
              tipo: dir === "out" ? "Salida" : "Entrada",
              cantidad: num(l.cantidad),
              motivo: dir === "out" ? "Venta" : "Otro",
              fecha: today(),
              nota: `${dir === "out" ? "Pedido" : "Pedido cancelado"} ${rec.codigo}`,
              order_id: rec.id
            };
            p.stock = num(p.stock) + this.moveDelta(mv);
            mv._applied = true;
            mv.stock_resultante = p.stock;
            this.db.stock_moves.unshift(mv);
          }
        }
      }
      moveDelta(m) {
        const q = num(m.cantidad);
        return m.tipo === "Entrada" ? q : m.tipo === "Salida" ? -q : m.tipo === "Ajuste (+)" ? q : -q;
      }
      canApprove(m) {
        return this.isAdmin() || m === "ausencias" && this.user.rol === "rrhh" || m === "gastos" && this.user.rol === "finanzas";
      }
      // ───────────── totales ─────────────
      linesTotal(r) {
        const sub = round2((r.lineas || []).reduce((a, l) => a + num(l.cantidad) * num(l.precio), 0));
        const desc = round2(sub * num(r.descuento_pct) / 100);
        const base = round2(sub - desc);
        const imp = round2(base * num(r.impuesto_pct) / 100);
        return { _subtotal: sub, _descuento: desc, _impuesto: imp, _total: round2(base + imp) };
      }
      quoteTotals(r) {
        return this.linesTotal(r);
      }
      invoiceTotals(r) {
        const t = this.linesTotal(r);
        const pagado = round2((r.pagos || []).filter((p) => p.estado === "Verificado").reduce((a, p) => a + num(p.monto), 0));
        const por_verificar = round2((r.pagos || []).filter((p) => p.estado === "Por verificar").reduce((a, p) => a + num(p.monto), 0));
        const saldo = round2(t._total - pagado);
        let estado = r.anulada ? "Anulada" : saldo <= 0 && t._total > 0 ? "Cancelada" : pagado > 0 ? "Abono parcial" : "Por cancelar";
        if (estado === "Por cancelar" && r.vence && r.vence < today()) estado = "Vencida";
        return { ...t, _pagado: pagado, _por_verificar: por_verificar, _saldo: Math.max(0, saldo), _estado: estado };
      }
      // ───────────── acciones especiales ─────────────
      action(name, p = {}) {
        const u = this.requireUser();
        const fn = {
          "cliente.historial": () => {
            if (!this.canWrite("clientes")) throw new AccessError("No puedes agregar notas a este cliente.");
            const c = this.rawScoped("clientes", p.id);
            c.historial = c.historial || [];
            c.historial.unshift({ fecha: now(), tipo: p.tipo || "Nota", nota: String(p.nota || ""), por: u.nombre });
            if (p.tipo === "Llamada" || p.tipo === "Mensaje" || p.tipo === "Reuni\xF3n") {
              if (c.estado === "Por contactar") c.estado = "Contactado";
              c.ultimo_contacto = today();
            }
            this.audit("editar", "clientes", c.id, `Historial: ${p.tipo}`);
            return this.strip("clients", c);
          },
          "proyecto.ronda": () => {
            if (!this.canWrite("proyectos")) throw new AccessError("Tu rol no puede registrar rondas.");
            const pr = this.rawScoped("proyectos", p.id);
            const extra = this.addRound(pr, p.nota, u.nombre);
            this.persist();
            return { proyecto: this.strip("projects", pr), extra };
          },
          "proyecto.aprobar": () => {
            const pr = this.rawScoped("proyectos", p.id);
            if (!(this.user.rol === "cliente" || this.canWrite("proyectos"))) throw new AccessError("Solo el cliente due\xF1o o el equipo pueden aprobar.");
            pr.aprobado_cliente = now();
            pr.aprobado_por = u.nombre;
            this.audit("aprobar", "proyectos", pr.id, "Entrega aprobada");
            this.persist();
            return this.strip("projects", pr);
          },
          "cotizacion.estado": () => {
            const q = this.rawScoped("cotizaciones", p.id);
            const allowedClient = ["Aceptada", "Rechazada"];
            if (this.isClient()) {
              if (this.user.rol !== "cliente" || !allowedClient.includes(p.estado) || q.estado !== "Enviada") throw new AccessError("Solo puedes aceptar o rechazar cotizaciones enviadas.");
            } else if (!this.canWrite("cotizaciones")) throw new AccessError("No puedes cambiar el estado.");
            q.estado = p.estado;
            q["fecha_" + p.estado.toLowerCase()] = now();
            if (this.isClient()) this.emit("cotizaciones", `${this.nameOf("clients", q.client_id)} ${p.estado === "Aceptada" ? "acept\xF3" : "rechaz\xF3"} la cotizaci\xF3n ${q.codigo}`, q.titulo || "");
            this.audit("editar", "cotizaciones", q.id, `Estado: ${p.estado}`);
            this.persist();
            return this.strip("quotes", q);
          },
          "cotizacion.convertir": () => {
            if (!this.canWrite("cotizaciones")) throw new AccessError("No puedes convertir cotizaciones.");
            const q = this.rawScoped("cotizaciones", p.id);
            const res = {};
            if (p.proyecto && this.canWrite("proyectos")) {
              const pr = this.save("proyectos", { nombre: q.titulo || `Proyecto ${q.codigo}`, client_id: q.client_id, precio: this.quoteTotals(q)._total, estado: "Por iniciar", pm: u.id, rondas_incluidas: q.rondas_incluidas || this.db.settings.rondas_incluidas_defecto, desde_cotizacion: q.codigo });
              q.project_id = pr.id;
              res.proyecto = pr;
            }
            if (p.factura && this.canWrite("facturas")) {
              const f = this.save("facturas", { client_id: q.client_id, project_id: q.project_id || null, lineas: q.lineas, descuento_pct: q.descuento_pct, impuesto_pct: q.impuesto_pct, concepto: q.titulo, desde_cotizacion: q.codigo });
              res.factura = f;
            }
            this.persist();
            return res;
          },
          "factura.pago": () => {
            const f = this.rawScoped("facturas", p.id);
            const isClientOwner = this.user.rol === "cliente" && f.client_id === this.user.client_id;
            if (!(this.canWrite("facturas") || isClientOwner)) throw new AccessError("No puedes registrar pagos en esta factura.");
            if (num(p.monto) <= 0) throw new InputError("El monto debe ser mayor que cero.");
            f.pagos = f.pagos || [];
            const verified = this.canWrite("facturas") && p.verificado;
            f.pagos.unshift({
              id: uid(),
              fecha: p.fecha || today(),
              monto: round2(p.monto),
              metodo: p.metodo || "Otro",
              referencia: String(p.referencia || ""),
              estado: verified ? "Verificado" : "Por verificar",
              reportado_por: u.nombre,
              reportado: now(),
              verificado_por: verified ? u.nombre : null
            });
            this.audit("editar", "facturas", f.id, `${verified ? "Pago registrado" : "Pago reportado"}: ${p.monto} (${p.metodo})`);
            if (isClientOwner && !this.canWrite("facturas")) this.emit("pagos", `${this.nameOf("clients", f.client_id)} report\xF3 un pago`, `${f.codigo} \xB7 ${round2(p.monto)} por ${p.metodo || "Otro"} \xB7 ref. ${p.referencia || "\u2014"}. Hay que verificarlo.`);
            this.persist();
            return this.strip("invoices", f);
          },
          "factura.verificar": () => {
            if (!this.canWrite("facturas")) throw new AccessError("Solo Finanzas o Direcci\xF3n verifican pagos.");
            const f = this.rawScoped("facturas", p.id);
            const pg = (f.pagos || []).find((x) => x.id === p.pago_id);
            if (!pg) throw new InputError("Pago no encontrado.");
            pg.estado = p.rechazar ? "Rechazado" : "Verificado";
            pg.verificado_por = u.nombre;
            pg.verificado = now();
            this.audit("editar", "facturas", f.id, `Pago ${pg.estado.toLowerCase()}: ${pg.monto}`);
            this.persist();
            return this.strip("invoices", f);
          },
          "ausencia.decidir": () => {
            if (!this.canApprove("ausencias")) throw new AccessError("Solo RR.HH. o Direcci\xF3n aprueban ausencias.");
            const l = this.db.leaves.find((x) => x.id === p.id);
            if (!l) throw new InputError("No encontrada.");
            l.estado = p.aprobar ? "Aprobada" : "Rechazada";
            l.decidido_por = u.nombre;
            l.decidido = now();
            this.audit("aprobar", "ausencias", l.id, l.estado);
            this.persist();
            return this.strip("leaves", l);
          },
          "gasto.decidir": () => {
            if (!this.canApprove("gastos")) throw new AccessError("Solo Finanzas o Direcci\xF3n aprueban gastos.");
            const g = this.db.expenses.find((x) => x.id === p.id);
            if (!g) throw new InputError("No encontrado.");
            g.estado = p.aprobar ? "Aprobado" : "Rechazado";
            g.decidido_por = u.nombre;
            this.audit("aprobar", "gastos", g.id, g.estado);
            this.persist();
            return this.strip("expenses", g);
          },
          "nomina.generar": () => {
            if (!this.canWrite("nomina")) throw new AccessError("Tu rol no puede generar n\xF3mina.");
            if (!p.periodo) throw new InputError("Indica el per\xEDodo (por ejemplo: 2026-11 1ra quincena).");
            const emps = this.db.employees.filter((e) => num(e.salario) > 0 && e.estado !== "Inactivo");
            if (!emps.length) throw new InputError("No hay fichas de personal con salario cargado.");
            const created = [];
            for (const e of emps) {
              if (this.db.payslips.some((s2) => s2.usuario_id === e.usuario_id && s2.periodo === p.periodo)) continue;
              const factor = e.frecuencia_pago === "Quincenal" ? 0.5 : 1;
              const base = round2(num(e.salario) * factor);
              const s = { id: uid(), creado: now(), creado_por: u.id, usuario_id: e.usuario_id, periodo: p.periodo, base, bonos: 0, deducciones: 0, neto: base, estado: "Borrador" };
              this.db.payslips.unshift(s);
              created.push(s);
            }
            this.audit("crear", "nomina", null, `N\xF3mina ${p.periodo}: ${created.length} recibos`);
            this.persist();
            return created.map((s) => this.strip("payslips", s));
          },
          "usuario.password": () => {
            if (!this.canWrite("equipo")) throw new AccessError("Solo Direcci\xF3n restablece contrase\xF1as.");
            const t = this.db.users.find((x) => x.id === p.id);
            if (!t) throw new InputError("Cuenta no encontrada.");
            if (t.rol === "founder" && this.user.rol !== "founder") throw new AccessError("Solo el Founder puede cambiar la contrase\xF1a del Founder.");
            this.validatePassword(p.password);
            t.password = hashPw(p.password);
            t.intentos = 0;
            t.bloqueado_hasta = null;
            this.audit("editar", "equipo", t.id, "Contrase\xF1a restablecida");
            this.persist();
            return true;
          },
          "recordatorio.hecho": () => {
            const r2 = this.rawScoped("recordatorios", p.id);
            r2.hecho = !!p.hecho;
            r2.hecho_fecha = p.hecho ? now() : null;
            this.persist();
            return this.strip("reminders", r2);
          },
          "ticket.responder": () => {
            const t = this.rawScoped("soporte", p.id);
            const texto = String(p.texto || "").trim();
            if (!texto) throw new InputError("Escribe un mensaje.");
            const cli = this.isClient();
            if (!cli && !this.canWrite("soporte")) throw new AccessError("Tu rol solo puede leer estas solicitudes.");
            t.respuestas = t.respuestas || [];
            t.respuestas.push({ id: uid(), fecha: now(), por: u.nombre, texto, cliente: cli, interno: !cli && !!p.interno });
            if (cli) {
              if (["Esperando cliente", "Resuelto"].includes(t.estado)) t.estado = "En atenci\xF3n";
              this.emit("soporte", `${this.nameOf("clients", t.client_id)} respondi\xF3 en ${t.codigo}`, texto.slice(0, 300));
            } else if (!p.interno) {
              if (!t.primera_respuesta) t.primera_respuesta = now();
              t.estado = p.estado || (t.estado === "Nuevo" ? "En atenci\xF3n" : t.estado);
            } else if (p.estado) t.estado = p.estado;
            if (!cli && !t.asignado) t.asignado = u.id;
            this.audit("editar", "soporte", t.id, cli ? "Respuesta del cliente" : p.interno ? "Nota interna" : "Respuesta al cliente");
            return this.strip("tickets", t);
          },
          "pieza.enviar": () => {
            if (!this.canWrite("piezas")) throw new AccessError("Tu rol no puede enviar piezas a revisi\xF3n.");
            const pz = this.rawScoped("piezas", p.id);
            pz.estado = p.a === "cliente" ? "Revisi\xF3n del cliente" : "Revisi\xF3n interna";
            if (p.a === "cliente") pz.enviada_cliente = now();
            if (p.nota) (pz.comentarios ||= []).push({ id: uid(), fecha: now(), por: u.nombre, texto: String(p.nota), interno: p.a !== "cliente", version: pz.version });
            this.audit("editar", "piezas", pz.id, `Enviada a ${pz.estado.toLowerCase()} (v${pz.version})`);
            return this.strip("pieces", pz);
          },
          "pieza.decidir": () => {
            const pz = this.rawScoped("piezas", p.id);
            const nota = String(p.nota || "").trim();
            let extra = false;
            if (pz.estado === "Revisi\xF3n interna") {
              if (!this.canReviewPieces()) throw new AccessError("La revisi\xF3n interna la hacen Direcci\xF3n Creativa, Producci\xF3n o el Project Manager.");
              (pz.comentarios ||= []).push({ id: uid(), fecha: now(), por: u.nombre, texto: (p.aprobar ? "Aprobada internamente. " : "Cambios internos: ") + nota, momento: p.momento || "", interno: true, version: pz.version });
              pz.estado = p.aprobar ? "Revisi\xF3n del cliente" : "Cambios pedidos";
              if (p.aprobar) pz.enviada_cliente = now();
            } else if (pz.estado === "Revisi\xF3n del cliente") {
              const owner = this.user.rol === "cliente";
              if (!owner && !this.canWrite("piezas")) throw new AccessError("Solo el due\xF1o de la cuenta puede aprobar o pedir cambios.");
              if (!p.aprobar && !nota) throw new InputError("Cu\xE9ntanos qu\xE9 cambios necesitas.");
              (pz.comentarios ||= []).push({ id: uid(), fecha: now(), por: u.nombre, texto: (p.aprobar ? "\u2714 Aprobada. " : "") + nota, momento: p.momento || "", interno: false, cliente: owner, version: pz.version });
              if (p.aprobar) {
                pz.estado = "Aprobada";
                pz.aprobada = now();
                pz.aprobada_por = u.nombre;
              } else {
                pz.estado = "Cambios pedidos";
                pz.rondas_cliente = num(pz.rondas_cliente) + 1;
                const pr = this.db.projects.find((x) => x.id === pz.project_id);
                if (pr) extra = this.addRound(pr, `${pz.titulo} (v${pz.version}): ${nota}`, u.nombre);
              }
              if (owner) this.emit("piezas", p.aprobar ? `\u2714 El cliente aprob\xF3: ${pz.titulo}` : `El cliente pidi\xF3 cambios: ${pz.titulo}`, `${pz.codigo} v${pz.version}${nota ? " \xB7 " + nota.slice(0, 300) : ""}${extra ? " \xB7 Ronda extra: se cre\xF3 una orden de cambio" : ""}`);
            } else throw new InputError("Esta pieza no est\xE1 esperando revisi\xF3n.");
            this.audit("aprobar", "piezas", pz.id, `${pz.titulo} v${pz.version}: ${pz.estado}`);
            return { pieza: this.strip("pieces", pz), extra };
          },
          "pieza.comentar": () => {
            const pz = this.rawScoped("piezas", p.id);
            const texto = String(p.texto || "").trim();
            if (!texto) throw new InputError("Escribe un comentario.");
            const cli = this.isClient();
            if (!cli && !this.canWrite("piezas")) throw new AccessError("Tu rol solo puede ver esta pieza.");
            (pz.comentarios ||= []).push({ id: uid(), fecha: now(), por: u.nombre, texto, momento: String(p.momento || ""), interno: !cli && !!p.interno, cliente: cli, version: pz.version });
            return this.strip("pieces", pz);
          },
          "pieza.version": () => {
            if (!this.canWrite("piezas")) throw new AccessError("Tu rol no puede subir versiones.");
            const pz = this.rawScoped("piezas", p.id);
            pz.versiones = pz.versiones || [];
            pz.versiones.unshift({ version: pz.version, archivo: pz.archivo || null, enlace: pz.enlace || "", fecha: pz.actualizado || pz.creado });
            pz.version = num(pz.version) + 1;
            pz.archivo = p.archivo || null;
            pz.enlace = p.enlace || pz.enlace || "";
            pz.estado = "Revisi\xF3n interna";
            if (p.nota) (pz.comentarios ||= []).push({ id: uid(), fecha: now(), por: u.nombre, texto: `Versi\xF3n ${pz.version}: ${p.nota}`, interno: true, version: pz.version });
            pz.actualizado = now();
            pz.actualizado_por = u.id;
            this.audit("editar", "piezas", pz.id, `Nueva versi\xF3n v${pz.version}`);
            return this.strip("pieces", pz);
          },
          "post.decidir": () => {
            const po = this.rawScoped("redes", p.id);
            if (po.estado !== "Por aprobar") throw new InputError("Esta publicaci\xF3n no est\xE1 esperando aprobaci\xF3n.");
            const owner = this.user.rol === "cliente";
            if (!owner && !this.canWrite("redes")) throw new AccessError("Solo el due\xF1o de la cuenta puede aprobar publicaciones.");
            const nota = String(p.nota || "").trim();
            if (!p.aprobar && !nota) throw new InputError("Cu\xE9ntanos qu\xE9 hay que cambiar.");
            po.comentarios = po.comentarios || [];
            po.comentarios.push({ id: uid(), fecha: now(), por: u.nombre, texto: (p.aprobar ? "\u2714 Aprobada. " : "Cambios: ") + nota, cliente: owner });
            po.estado = p.aprobar ? "Aprobado" : "En dise\xF1o";
            if (owner) this.emit("redes", p.aprobar ? `\u2714 Publicaci\xF3n aprobada: ${po.titulo}` : `Cambios en publicaci\xF3n: ${po.titulo}`, `${this.nameOf("clients", po.client_id)} \xB7 ${String(po.fecha || "").replace("T", " ")}${nota ? " \xB7 " + nota.slice(0, 300) : ""}`);
            if (p.aprobar) {
              po.aprobado = now();
              po.aprobado_por = u.nombre;
            }
            this.audit("aprobar", "redes", po.id, `${po.titulo}: ${po.estado}`);
            return this.strip("posts", po);
          },
          "juego.check": () => {
            if (!this.canWrite("juegos")) throw new AccessError("Tu rol no puede editar este juego.");
            const g = this.rawScoped("juegos", p.id);
            g.checklist = g.checklist || {};
            g.checklist[String(p.item)] = !!p.hecho;
            return this.strip("games", g);
          },
          "llaves.cargar": () => {
            if (!this.canWrite("llaves")) throw new AccessError("Tu rol no puede cargar llaves.");
            const g = this.db.games.find((x) => x.id === p.game_id);
            if (!g) throw new InputError("Elige el juego.");
            const codes = String(p.llaves || "").split(/[\s,;]+/).map((x) => x.trim()).filter(Boolean);
            if (!codes.length) throw new InputError("Pega al menos una llave.");
            const existing = new Set(this.db.keys.map((k) => k.llave));
            let n = 0;
            for (const c of codes) {
              if (existing.has(c)) continue;
              existing.add(c);
              this.db.keys.unshift({ id: uid(), creado: now(), creado_por: u.id, game_id: g.id, plataforma: p.plataforma || "Steam", llave: c, estado: "Disponible" });
              n++;
            }
            this.audit("crear", "llaves", g.id, `${n} llaves cargadas para ${g.nombre}`);
            return { creadas: n, repetidas: codes.length - n };
          },
          "planes.facturar": () => {
            if (!this.canWrite("planes") || !this.canWrite("facturas")) throw new AccessError("Solo Finanzas o Direcci\xF3n facturan los planes.");
            const limite = ymd(new Date(Date.now() + 3 * 864e5));
            const creadas = [];
            const meses = { Mensual: 1, Trimestral: 3, Semestral: 6, Anual: 12 };
            for (const sb of this.db.subscriptions) {
              if (sb.estado !== "Activo" || !sb.proximo_cobro || sb.proximo_cobro > limite) continue;
              const f = this.save("facturas", {
                client_id: sb.client_id,
                project_id: sb.project_id || null,
                concepto: `${sb.nombre} \xB7 ${sb.proximo_cobro.slice(0, 7)}`,
                fecha: today(),
                vence: sb.proximo_cobro < today() ? today() : sb.proximo_cobro,
                lineas: [{ descripcion: `${sb.nombre} (${sb.tipo || "Plan"} ${String(sb.frecuencia || "Mensual").toLowerCase()})`, cantidad: 1, precio: num(sb.monto) }],
                impuesto_pct: this.db.settings.impuesto_pct,
                desde_plan: sb.id
              });
              sb.ultima_factura = f.codigo;
              sb.proximo_cobro = this.addMonths(sb.proximo_cobro, meses[sb.frecuencia] || 1);
              creadas.push(f.codigo);
            }
            this.audit("crear", "planes", null, `Facturaci\xF3n de planes: ${creadas.length}`);
            return creadas;
          },
          "firmar": () => {
            const mod = p.modulo === "cotizaciones" ? "cotizaciones" : "contratos";
            const col = mod === "cotizaciones" ? "quotes" : "contracts";
            const r2 = this.rawScoped(mod, p.id);
            if (!p.acepto) throw new InputError("Marca la casilla para confirmar que aceptas el documento.");
            const nombre = String(p.nombre || "").trim();
            if (nombre.length < 3) throw new InputError("Escribe tu nombre completo.");
            const img = String(p.imagen || "");
            if (!/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(img) || img.length > 4e5) throw new InputError("Dibuja tu firma en el recuadro.");
            let parte;
            if (this.isClient()) {
              if (this.user.rol !== "cliente") throw new AccessError("Solo el due\xF1o de la cuenta puede firmar.");
              parte = "cliente";
              if (col === "quotes" && r2.estado !== "Enviada") throw new InputError("Solo se firman cotizaciones enviadas.");
            } else {
              if (!this.canWrite(mod)) throw new AccessError("Tu rol no puede firmar este documento.");
              parte = p.parte === "contraparte" ? "contraparte" : "estudio";
            }
            r2.firmas = (r2.firmas || []).filter((f) => f.parte !== parte);
            r2.firmas.push({ parte, nombre: nombre.slice(0, 120), imagen: img, fecha: now(), hash: this.docHash(col, r2), por: u.nombre, por_id: u.id });
            if (col === "quotes" && parte === "cliente") {
              r2.estado = "Aceptada";
              r2.fecha_aceptada = now();
              this.emit("cotizaciones", `${this.nameOf("clients", r2.client_id)} firm\xF3 y acept\xF3 la cotizaci\xF3n ${r2.codigo}`, r2.titulo || "");
            }
            if (col === "contracts") {
              const partes = new Set(r2.firmas.map((f) => f.parte));
              if (partes.has("estudio") && (partes.has("cliente") || partes.has("contraparte") || !r2.client_id)) {
                r2.estado = "Firmado";
                r2.fecha_firma = now();
              }
              if (parte === "cliente") this.emit("cotizaciones", `${this.nameOf("clients", r2.client_id)} firm\xF3 el contrato`, r2.titulo);
            }
            this.audit("aprobar", mod, r2.id, `Firmado por ${nombre} (${parte})`);
            return this.strip(col, r2);
          },
          "evaluacion.responder": () => {
            const r2 = this.rawScoped("evaluaciones", p.id);
            if (r2.usuario_id !== u.id) throw new AccessError("Solo la persona evaluada responde su evaluaci\xF3n.");
            r2.respuesta = String(p.texto || "").slice(0, 3e3);
            r2.respondida = now();
            if (r2.estado === "Compartida") r2.estado = "Conversada";
            this.audit("editar", "evaluaciones", r2.id, "Respuesta a la evaluaci\xF3n");
            return this.strip("reviews", r2);
          },
          "compra.recibir": () => {
            if (!this.canWrite("compras")) throw new AccessError("Tu rol no puede recibir compras.");
            const oc = this.rawScoped("compras", p.id);
            if (["Recibida", "Cancelada"].includes(oc.estado)) throw new InputError("Esta orden ya est\xE1 cerrada.");
            let piezas = 0;
            for (const l of oc.lineas || []) {
              const pr = l.product_id && this.db.products.find((x) => x.id === l.product_id);
              if (!pr) continue;
              const mv = { id: uid(), creado: now(), creado_por: u.id, product_id: pr.id, tipo: "Entrada", cantidad: num(l.cantidad), motivo: "Compra a proveedor", fecha: today(), nota: `Orden ${oc.codigo}`, purchase_id: oc.id };
              pr.stock = num(pr.stock) + num(l.cantidad);
              mv._applied = true;
              mv.stock_resultante = pr.stock;
              this.db.stock_moves.unshift(mv);
              if (num(l.precio) > 0) pr.costo = round2(l.precio);
              piezas += num(l.cantidad);
            }
            oc.estado = "Recibida";
            oc.fecha_recibida = today();
            let gasto = null;
            if (p.gasto) {
              const t = this.linesTotal(oc)._total;
              gasto = { id: uid(), creado: now(), creado_por: u.id, concepto: `Compra ${oc.codigo} \xB7 ${this.nameOf("suppliers", oc.supplier_id)}`, monto: t, fecha: today(), categoria: "Merch", proveedor: this.nameOf("suppliers", oc.supplier_id), comprobante: oc.codigo, usuario_id: u.id, estado: this.canApprove("gastos") ? "Aprobado" : "Pendiente", purchase_id: oc.id };
              this.db.expenses.unshift(gasto);
            }
            this.audit("editar", "compras", oc.id, `Recibida: ${piezas} unidades${gasto ? " \xB7 gasto registrado" : ""}`);
            return { orden: this.strip("purchases", oc), piezas, gasto: !!gasto };
          },
          "compra.sugerir": () => {
            if (!this.canWrite("compras")) throw new AccessError("Tu rol no puede crear \xF3rdenes de compra.");
            const bajos = this.db.products.filter((x) => num(x.stock) <= num(x.stock_minimo) && x.supplier_id);
            const porProv = {};
            for (const x of bajos) (porProv[x.supplier_id] = porProv[x.supplier_id] || []).push(x);
            const creadas = [];
            for (const [sid, prods] of Object.entries(porProv)) {
              if (this.db.purchases.some((o) => o.supplier_id === sid && ["Borrador", "Enviada"].includes(o.estado) && (o.lineas || []).some((l) => prods.some((x) => x.id === l.product_id)))) continue;
              const oc = {
                id: uid(),
                creado: now(),
                creado_por: u.id,
                codigo: this.nextCode("OC"),
                supplier_id: sid,
                estado: "Borrador",
                fecha: today(),
                nota: "Creada desde el aviso de stock bajo.",
                lineas: prods.map((x) => ({ descripcion: x.nombre, product_id: x.id, cantidad: Math.max(1, num(x.stock_minimo) * 2 - num(x.stock)), precio: round2(x.costo) }))
              };
              this.db.purchases.unshift(oc);
              creadas.push(oc.codigo);
            }
            if (creadas.length) this.audit("crear", "compras", null, `\xD3rdenes sugeridas por stock bajo: ${creadas.join(", ")}`);
            return creadas;
          },
          "juego.clave": () => {
            if (!this.canWrite("juegos")) throw new AccessError("Tu rol no puede cambiar la clave de reportes.");
            const g = this.rawScoped("juegos", p.id);
            g.clave_reportes = crypto.randomBytes(12).toString("hex");
            this.audit("editar", "juegos", g.id, "Nueva clave de reportes de fallos");
            return this.strip("games", g);
          },
          "discord.importar": () => {
            if (!this.isAdmin()) throw new AccessError("Solo Direcci\xF3n conecta Discord.");
            let nuevos = 0, actualizados = 0;
            for (const m of p.mensajes || []) {
              if (!m || !m.id || !String(m.contenido || "").trim()) continue;
              const ex = this.db.bugs.find((b) => b.discord_msg_id === m.id);
              if (ex) {
                if (num(m.votos) !== num(ex.votos)) {
                  ex.votos = num(m.votos);
                  actualizados++;
                }
                continue;
              }
              const texto = String(m.contenido).trim();
              const titulo = texto.split("\n")[0].replace(/^!bug\s*/i, "").slice(0, 120) || "Reporte desde Discord";
              this.db.bugs.unshift({
                id: uid(),
                creado: m.fecha || now(),
                creado_por: u.id,
                codigo: this.nextCode("BUG"),
                titulo,
                pasos: texto + ((m.adjuntos || []).length ? "\n\nAdjuntos:\n" + m.adjuntos.join("\n") : ""),
                origen: "Discord",
                reportado_por: String(m.autor || ""),
                enlace: m.enlace || "",
                votos: num(m.votos),
                game_id: p.game_id || this.db.settings.discord_juego_id || null,
                estado: "Nuevo",
                severidad: "Media",
                discord_msg_id: m.id
              });
              nuevos++;
            }
            if (nuevos || actualizados) this.audit("crear", "bugs", null, `Discord: ${nuevos} bugs nuevos, ${actualizados} votos actualizados`);
            return { nuevos, actualizados };
          },
          "anuncios.meta": () => {
            if (!this.canWrite("anuncios")) throw new AccessError("Tu rol no puede actualizar campa\xF1as.");
            let actualizadas = 0, creadas = 0;
            for (const r2 of p.resultados || []) {
              if (!r2 || !r2.meta_id) continue;
              let c = this.db.campaigns.find((x) => String(x.meta_id) === String(r2.meta_id));
              const datos = {};
              for (const k of ["presupuesto", "gastado", "alcance", "clics", "resultados"]) if (r2[k] !== void 0 && r2[k] !== null && r2[k] !== "") datos[k] = round2(r2[k]);
              if (r2.tipo_resultado) datos.tipo_resultado = r2.tipo_resultado;
              if (r2.estado) datos.estado = r2.estado;
              if (r2.inicio) datos.inicio = r2.inicio;
              if (r2.fin) datos.fin = r2.fin;
              if (c) {
                Object.assign(c, datos, { meta_sync: now() });
                actualizadas++;
              } else if (p.client_id) {
                this.db.campaigns.unshift({ id: uid(), creado: now(), creado_por: u.id, nombre: r2.nombre || `Campa\xF1a ${r2.meta_id}`, client_id: p.client_id, plataforma: "Meta (Facebook / Instagram)", objetivo: r2.objetivo || "", meta_id: String(r2.meta_id), responsable: u.id, meta_sync: now(), ...datos, estado: datos.estado || "Activa" });
                creadas++;
              }
            }
            this.audit("editar", "anuncios", null, `Meta: ${actualizadas} actualizadas, ${creadas} nuevas`);
            return { actualizadas, creadas };
          },
          "cuenta.preparar": () => {
            if (!this.canWrite("cuentas") || this.user.rol === "cliente_eq") throw new AccessError("Tu rol no puede conectar redes.");
            if (p.id) {
              const c = this.rawScoped("cuentas", p.id);
              return this.strip("socials", c);
            }
            const client_id = this.isClient() ? this.user.client_id : p.client_id || null;
            const ya = this.db.socials.find((x) => x.red === p.red && (x.client_id || null) === client_id && x.estado !== "Conectada");
            if (ya) return this.strip("socials", ya);
            return this.save("cuentas", { red: p.red, client_id, nombre: p.nombre || "" });
          },
          "cuenta.desconectar": () => {
            const c = this.rawScoped("cuentas", p.id);
            if (!this.canWrite("cuentas")) throw new AccessError("Tu rol no puede desconectar redes.");
            this.db.social_tokens = this.db.social_tokens.filter((t) => t.id !== c.id);
            Object.assign(c, { estado: "Sin conectar", vence: null, paginas: null, ultimo_error: "" });
            this.audit("editar", "cuentas", c.id, `${c.red} desconectada`);
            this.persist();
            return this.strip("socials", c);
          },
          "cuenta.pagina": () => {
            const c = this.rawScoped("cuentas", p.id);
            if (!this.canWrite("cuentas")) throw new AccessError("Tu rol no puede cambiar esta cuenta.");
            const t = this.db.social_tokens.find((x) => x.id === c.id);
            const pg = t && t.extra && (t.extra.paginas || []).find((x) => x.id === String(p.pagina_id));
            if (!pg) throw new InputError("Esa p\xE1gina ya no est\xE1 disponible. Vuelve a conectar Facebook.");
            t.access = pg.token;
            Object.assign(c, { estado: "Conectada", cuenta_ext: pg.id, nombre: pg.name, enlace_perfil: pg.link, seguidores: pg.seguidores || 0, paginas: null, ultimo_error: "" });
            this.audit("editar", "cuentas", c.id, `P\xE1gina elegida: ${pg.name}`);
            this.persist();
            return this.strip("socials", c);
          },
          "ajustes.guardar": () => {
            if (!this.canWrite("ajustes")) throw new AccessError("Solo Direcci\xF3n cambia los ajustes.");
            const allowed = Object.keys(DEFAULT_SETTINGS);
            for (const [k, v] of Object.entries(p)) if (allowed.includes(k)) this.db.settings[k] = v;
            this.db.settings.impuesto_pct = num(this.db.settings.impuesto_pct);
            this.audit("editar", "ajustes", null, "Ajustes actualizados");
            this.persist();
            return this.db.settings;
          }
        }[name];
        if (!fn) throw new InputError("Acci\xF3n desconocida.");
        const r = fn();
        this.persist();
        return r;
      }
      addRound(pr, nota, por) {
        pr.rondas_usadas = num(pr.rondas_usadas) + 1;
        pr.rondas_log = pr.rondas_log || [];
        pr.rondas_log.unshift({ n: pr.rondas_usadas, fecha: now(), nota: String(nota || ""), por });
        let extra = false;
        if (pr.rondas_usadas > num(pr.rondas_incluidas)) {
          extra = true;
          const costo = num(pr.costo_ronda_extra) || num(this.db.settings.costo_ronda_extra_defecto);
          pr.ordenes_cambio = pr.ordenes_cambio || [];
          pr.ordenes_cambio.unshift({ id: uid(), fecha: now(), ronda: pr.rondas_usadas, costo, estado: "Por cobrar", nota: String(nota || "") });
        }
        this.audit("editar", "proyectos", pr.id, `Ronda de cambios #${pr.rondas_usadas}${extra ? " (extra, fuera de contrato)" : ""}`);
        return extra;
      }
      docHash(col, r) {
        const pick = col === "quotes" ? { titulo: r.titulo, client_id: r.client_id, lineas: (r.lineas || []).map((l) => [l.descripcion, num(l.cantidad), num(l.precio)]), descuento: num(r.descuento_pct), impuesto: num(r.impuesto_pct), notas: r.notas || "", vence: r.vence || "", rondas: r.rondas_incluidas ?? "" } : { titulo: r.titulo, tipo: r.tipo || "", client_id: r.client_id || "", contraparte: r.contraparte || "", inicio: r.inicio || "", vence: r.vence || "", notas: r.notas || "", enlace: r.enlace || "", archivo: r.archivo && r.archivo.ruta || "" };
        return crypto.createHash("sha256").update(JSON.stringify(pick)).digest("hex");
      }
      reporteCliente(clientId, mes) {
        this.requireUser();
        if (this.isClient()) clientId = this.user.client_id;
        else if (!this.canRead("clientes") && !this.canRead("proyectos")) throw new AccessError("Tu rol no puede generar reportes de clientes.");
        const c = this.db.clients.find((x) => x.id === clientId);
        if (!c) throw new InputError("Elige un cliente.");
        if (!this.isClient() && this.canRead("clientes") && !this.inScope("clients", c, this.perm("clientes").scope)) throw new AccessError("No tienes acceso a este cliente.");
        mes = /^\d{4}-\d{2}$/.test(String(mes)) ? mes : today().slice(0, 7);
        const enMes = (f) => String(f || "").slice(0, 7) === mes;
        const proyectos = this.db.projects.filter((p) => p.client_id === clientId && p.estado !== "Cancelado").map((p) => {
          const d = this.decorate("projects", { ...p });
          return { nombre: p.nombre, estado: p.estado, avance: d._progreso, entrega: p.entrega || "", rondas: `${num(p.rondas_usadas)} de ${num(p.rondas_incluidas)}` };
        });
        const pids = new Set(this.db.projects.filter((p) => p.client_id === clientId).map((p) => p.id));
        const piezas = this.db.pieces.filter((x) => pids.has(x.project_id) && x.estado === "Aprobada" && enMes(x.aprobada)).map((x) => ({ titulo: x.titulo, tipo: x.tipo, version: x.version }));
        const posts = this.db.posts.filter((x) => x.client_id === clientId && enMes(x.fecha));
        const publicadas = posts.filter((x) => x.estado === "Publicado");
        const campanas = this.db.campaigns.filter((x) => x.client_id === clientId && (enMes(x.inicio) || enMes(x.fin) || x.estado === "Activa" || x.inicio && x.inicio.slice(0, 7) <= mes && (!x.fin || x.fin.slice(0, 7) >= mes))).map((x) => {
          const d = this.decorate("campaigns", { ...x });
          return { nombre: x.nombre, plataforma: x.plataforma, gastado: num(x.gastado), presupuesto: num(x.presupuesto), resultados: num(x.resultados), tipo_resultado: x.tipo_resultado || "", alcance: num(x.alcance), cpr: d._cpr };
        });
        const facturas = this.db.invoices.filter((f) => f.client_id === clientId && !f.anulada).map((f) => ({ codigo: f.codigo, concepto: f.concepto || "", ...this.invoiceTotals(f) }));
        const pagado_mes = round2(this.db.invoices.filter((f) => f.client_id === clientId).reduce((a, f) => a + (f.pagos || []).filter((pg) => pg.estado === "Verificado" && enMes(pg.fecha)).reduce((b, pg) => b + num(pg.monto), 0), 0));
        const solicitudes = this.db.tickets.filter((t) => t.client_id === clientId && enMes(t.creado));
        return {
          cliente: c.nombre,
          mes,
          generado: now(),
          proyectos,
          piezas,
          publicaciones: { planificadas: posts.length, publicadas: publicadas.length, alcance: publicadas.reduce((a, x) => a + num(x.alcance), 0), interacciones: publicadas.reduce((a, x) => a + num(x.interacciones), 0), lista: publicadas.map((x) => ({ titulo: x.titulo, fecha: x.fecha, redes: (x.redes || []).join(", "), alcance: num(x.alcance), interacciones: num(x.interacciones) })) },
          campanas,
          gasto_anuncios: round2(campanas.reduce((a, x) => a + x.gastado, 0)),
          facturas: { pagado_mes, saldo: round2(facturas.reduce((a, f) => a + f._saldo, 0)) },
          solicitudes: { abiertas: solicitudes.length, resueltas: solicitudes.filter((t) => ["Resuelto", "Cerrado"].includes(t.estado)).length }
        };
      }
      canReviewPieces() {
        return this.isAdmin() || ["creativo_dir", "productor", "pm"].includes(this.user.rol);
      }
      addMonths(dateStr, n) {
        const [y, m, d] = dateStr.split("-").map(Number);
        const dt = new Date(y, m - 1 + n, 1);
        const last = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
        dt.setDate(Math.min(d, last));
        return ymd(dt);
      }
      // ───── redes sociales: métodos internos que usa el servidor (no se exponen en la API) ─────
      static fechaEnZona(local, zona = "America/Caracas") {
        if (!local) return NaN;
        const str = String(local);
        if (/[zZ]|[+-]\d\d:\d\d$/.test(str)) return Date.parse(str);
        const guess = Date.parse(str.length <= 10 ? str + "T00:00:00Z" : str.slice(0, 16) + ":00Z");
        if (!Number.isFinite(guess)) return NaN;
        try {
          const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: zona, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(new Date(guess)).map((x) => [x.type, x.value]));
          const enZona = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour % 24, +parts.minute);
          return guess + (guess - enZona);
        } catch (e) {
          return guess;
        }
      }
      redesConectar(cuentaId, cuenta, token) {
        const c = this.db.socials.find((x) => x.id === cuentaId);
        if (!c) throw new InputError("La cuenta ya no existe en Delirium OS.");
        const eleg = !!cuenta.paginas;
        Object.assign(
          c,
          { estado: eleg ? "Elegir p\xE1gina" : "Conectada", conectada_el: now(), ultimo_error: "", vence: token.expira && c.red === "Instagram" ? new Date(token.expira).toISOString() : token.extra && token.extra.refresh_expira ? new Date(token.extra.refresh_expira).toISOString() : null },
          eleg ? { paginas: cuenta.paginas } : { cuenta_ext: cuenta.cuenta_ext, nombre: cuenta.nombre || c.nombre, enlace_perfil: cuenta.enlace_perfil || "", seguidores: cuenta.seguidores || 0, publicaciones_total: cuenta.publicaciones_total || 0, paginas: null }
        );
        if (!eleg) this.redesSeguidores(c, cuenta.seguidores);
        this.db.social_tokens = this.db.social_tokens.filter((t) => t.id !== c.id);
        this.db.social_tokens.push({ id: c.id, red: c.red, ...token, actualizado: now() });
        this.emit("redes", `${c.red} conectada: ${c.nombre || ""}`, c.client_id ? this.nameOf("clients", c.client_id) : "Delirium Studios");
        this.db.audit.unshift({ id: uid(), fecha: now(), usuario: "Conexi\xF3n de redes", accion: "editar", modulo: "cuentas", registro: c.id, detalle: `${c.red} conectada` });
        return c;
      }
      redesSeguidores(c, n) {
        if (n === void 0 || n === null) return;
        c.seguidores = Number(n) || 0;
        const d = today();
        c.historial = (c.historial || []).filter((h) => h.fecha !== d);
        c.historial.push({ fecha: d, seguidores: c.seguidores });
        c.historial = c.historial.slice(-120);
      }
      redesFallo(cuentaId, e) {
        const c = this.db.socials.find((x) => x.id === cuentaId);
        if (!c) return;
        const vencida = e && e.code === "VENCIDO";
        if (vencida && c.estado !== "Vencida") this.emit("redes", `Reconecta ${c.red} \xB7 ${c.nombre || ""}`, `${c.client_id ? this.nameOf("clients", c.client_id) : "Delirium"}: la conexi\xF3n venci\xF3.`);
        Object.assign(c, { estado: vencida ? "Vencida" : c.estado, ultimo_error: String(e && e.message || e).slice(0, 300) });
      }
      // Publicaciones pendientes: [{ post, red, cuenta }] (cuenta null si el cliente no tiene esa red conectada)
      redesPorPublicar(ahora = Date.now(), postId = null) {
        const zona = this.db.settings.zona_horaria || "America/Caracas";
        const out = [];
        for (const post of this.db.posts) {
          if (postId ? post.id !== postId : !(post.publicar_auto && ["Aprobado", "Programado"].includes(post.estado) && _Core.fechaEnZona(post.fecha, zona) <= ahora)) continue;
          for (const red of (post.redes || []).filter((x) => REDES_AUTO[x])) {
            const prev = (post.publicaciones || []).find((x) => x.red === red);
            if (prev && (prev.estado === "Publicado" || prev.estado === "Procesando" || !postId && prev.estado === "Error" && (prev.intentos || 0) >= 3)) continue;
            if (prev && prev.estado === "Error" && !postId && prev.siguiente && Date.parse(prev.siguiente) > ahora) continue;
            const cuenta = this.db.socials.find((x) => x.red === red && x.estado === "Conectada" && (x.client_id || null) === (post.client_id || null)) || null;
            out.push({ post, red, cuenta });
          }
        }
        return out;
      }
      redesResultado(post, red, cuenta, res, error) {
        post.publicaciones = post.publicaciones || [];
        let pub = post.publicaciones.find((x) => x.red === red);
        if (!pub) {
          pub = { red, intentos: 0 };
          post.publicaciones.push(pub);
        }
        pub.cuenta_id = cuenta ? cuenta.id : null;
        pub.cuenta = cuenta ? cuenta.nombre : "";
        pub.fecha = now();
        if (error) {
          pub.intentos = (pub.intentos || 0) + 1;
          Object.assign(pub, { estado: "Error", error: String(error.message || error).slice(0, 300), siguiente: new Date(Date.now() + 15 * 6e4 * pub.intentos).toISOString() });
          if (pub.intentos === 1 || pub.intentos >= 3) this.emit("redes", `No se public\xF3 en ${red}: ${post.titulo}`, pub.error);
        } else {
          Object.assign(pub, { estado: res.estado, id: res.id || pub.id || null, enlace: res.enlace || pub.enlace || "", privado: !!res.privado, pendiente: res.pendiente || null, error: "" });
          delete pub.siguiente;
        }
        const objetivo = (post.redes || []).filter((x) => REDES_AUTO[x]);
        const listas = objetivo.filter((r) => (post.publicaciones.find((x) => x.red === r) || {}).estado === "Publicado");
        if (objetivo.length && listas.length === objetivo.length && post.estado !== "Publicado") {
          post.estado = "Publicado";
          post.publicado_el = now();
          if (!post.enlace) post.enlace = (post.publicaciones.find((x) => x.enlace) || {}).enlace || "";
          this.emit("redes", `Publicado: ${post.titulo}`, `${objetivo.join(", ")} \xB7 ${this.nameOf("clients", post.client_id)}`);
        } else if (!error && post.estado === "Aprobado") post.estado = "Programado";
        post.actualizado = now();
        return pub;
      }
      redesMetricas(post, red, m) {
        const pub = (post.publicaciones || []).find((x) => x.red === red);
        if (!pub || !m) return;
        pub.metricas = { ...m, fecha: now() };
        const conM = post.publicaciones.filter((x) => x.metricas);
        post.alcance = conM.reduce((a, x) => a + (Number(x.metricas.alcance) || 0), 0);
        post.interacciones = conM.reduce((a, x) => a + (Number(x.metricas.interacciones) || 0), 0);
      }
      rawScoped(m, id) {
        const col = this.colOf(m);
        const { level, scope } = this.perm(m);
        const r = this.db[col].find((x) => x.id === id);
        if (!level || !r || !this.inScope(col, r, scope)) throw new AccessError("No encontramos este registro o no tienes acceso.");
        return r;
      }
      saveUser(data) {
        const me = this.user;
        if (!ROLES[data.rol]) throw new InputError("Elige un rol v\xE1lido.");
        if (!data.nombre || !data.email) throw new InputError("Escribe nombre y correo.");
        const email = String(data.email).trim().toLowerCase();
        if (this.db.users.some((x) => x.email === email && x.id !== data.id)) throw new InputError("Ya existe una cuenta con ese correo.");
        if (CLIENT_ROLES.includes(data.rol) && !data.client_id) throw new InputError("Las cuentas de cliente deben estar vinculadas a un cliente.");
        let u;
        if (data.id) {
          u = this.db.users.find((x) => x.id === data.id);
          if (!u) throw new InputError("Cuenta no encontrada.");
          if (u.rol === "founder" && me.rol !== "founder") throw new AccessError("Solo el Founder puede modificar la cuenta del Founder.");
          if (data.rol === "founder" && me.rol !== "founder") throw new AccessError("Solo el Founder puede asignar el rol de Founder.");
          if (u.id === me.id && data.rol !== u.rol) throw new InputError("No puedes cambiar tu propio rol.");
          if (u.id === me.id && data.activo === false) throw new InputError("No puedes desactivar tu propia cuenta.");
          if (u.rol === "founder" && data.activo === false && this.db.users.filter((x) => x.rol === "founder" && x.activo).length <= 1) throw new InputError("Debe quedar al menos un Founder activo.");
          Object.assign(u, { nombre: data.nombre, email, rol: data.rol, activo: data.activo !== false, client_id: CLIENT_ROLES.includes(data.rol) ? data.client_id : null, expira: data.expira || null, puesto: data.puesto || "" });
          this.audit("editar", "equipo", u.id, `${u.nombre} \xB7 ${ROLES[u.rol].label}${u.activo ? "" : " (desactivada)"}`);
        } else {
          if (data.rol === "founder" && me.rol !== "founder") throw new AccessError("Solo el Founder puede crear otro Founder.");
          this.validatePassword(data.password);
          u = {
            id: uid(),
            nombre: data.nombre,
            email,
            rol: data.rol,
            activo: true,
            client_id: CLIENT_ROLES.includes(data.rol) ? data.client_id : null,
            expira: data.expira || null,
            puesto: data.puesto || "",
            password: hashPw(data.password),
            creado: now(),
            creado_por: me.id,
            tema: "oscuro"
          };
          this.db.users.push(u);
          this.audit("crear", "equipo", u.id, `${u.nombre} \xB7 ${ROLES[u.rol].label}`);
        }
        this.persist();
        return this.strip("users", u);
      }
      // ───────────── reportes de fallos (como Sentry, pero propio) ─────────────
      static fingerprint(msg, stack) {
        const norm = (x) => String(x || "").replace(/0x[0-9a-f]+/gi, "?").replace(/[0-9a-f]{8}-[0-9a-f-]{27,}/gi, "?").replace(/\d+/g, "?").trim().slice(0, 300);
        const frame = String(stack || "").split("\n").map((l) => l.trim()).find((l) => /(at |\.gd|\.cs|\.lua|\.js|\.ts|Script|:\d)/.test(l)) || "";
        return crypto.createHash("sha1").update(norm(msg) + "|" + norm(frame)).digest("hex").slice(0, 16);
      }
      ingestCrash(ev, { gameId = null, app = null } = {}) {
        const mensaje = String(ev.mensaje || ev.message || "Error sin mensaje").slice(0, 500);
        const fp = (gameId || app || "x") + ":" + _Core.fingerprint(mensaje, ev.stack);
        const evento = {
          fecha: now(),
          version: String(ev.version || "").slice(0, 40),
          plataforma: String(ev.plataforma || "").slice(0, 80),
          dispositivo: String(ev.dispositivo || "").slice(0, 160),
          stack: String(ev.stack || "").slice(0, 4e3),
          rastro: String(ev.rastro || ev.breadcrumbs || "").slice(0, 2e3),
          usuario: String(ev.usuario || "").slice(0, 80)
        };
        let b = this.db.bugs.find((x) => x.fingerprint === fp);
        const fatal = /fatal|crash|cierre/i.test(String(ev.nivel || ""));
        if (b) {
          b.ocurrencias = num(b.ocurrencias) + 1;
          b.ultima_vez = evento.fecha;
          b.eventos = [evento, ...b.eventos || []].slice(0, 15);
          b.versiones_afectadas = Array.from(new Set([...b.versiones_afectadas || [], evento.version].filter(Boolean)));
          if (["Arreglado", "Verificado"].includes(b.estado)) {
            b.estado = "Confirmado";
            b.regresion = true;
            this.emit("bugs", `Volvi\xF3 a fallar: ${b.titulo}`, `${b.codigo} \xB7 ${b.app || this.nameOf("games", b.game_id)} \xB7 versi\xF3n ${evento.version || "?"}`);
          }
          return { id: b.id, nuevo: false };
        }
        b = {
          id: uid(),
          creado: now(),
          creado_por: null,
          codigo: this.nextCode("BUG"),
          titulo: mensaje.split("\n")[0].slice(0, 140),
          game_id: gameId,
          app: app || null,
          severidad: fatal ? "Bloqueante" : "Alta",
          estado: "Nuevo",
          origen: "Reporte autom\xE1tico",
          plataforma: evento.plataforma,
          version: evento.version,
          pasos: evento.stack ? `Error autom\xE1tico.

${evento.stack.slice(0, 1500)}` : "Error autom\xE1tico.",
          automatico: true,
          fingerprint: fp,
          ocurrencias: 1,
          primera_vez: evento.fecha,
          ultima_vez: evento.fecha,
          eventos: [evento],
          versiones_afectadas: evento.version ? [evento.version] : []
        };
        this.db.bugs.unshift(b);
        this.audit("crear", "bugs", b.id, `Fallo autom\xE1tico: ${b.titulo}`);
        this.emit("bugs", `Nuevo fallo en ${app || this.nameOf("games", gameId) || "un juego"}`, `${b.codigo} \xB7 ${b.titulo}${evento.version ? " \xB7 v" + evento.version : ""}`);
        return { id: b.id, nuevo: true };
      }
      metricasJuego() {
        throw new InputError("Las m\xE9tricas de jugadores funcionan cuando el estudio trabaja en l\xEDnea (Ajustes \u2192 Trabajar en l\xEDnea).");
      }
      static claveEvento(e) {
        const t = String(e.tipo || e.evento || "").toLowerCase();
        const lim = (x) => String(x || "").replace(/[^\w .:-]/g, "").slice(0, 60);
        if (t === "sesion" || t === "inicio_sesion") return [["sesiones", 1]];
        if (t === "nivel_inicio") return [[`nivel_inicio:${lim(e.nivel)}`, 1]];
        if (t === "nivel_fin") return [[`nivel_fin:${lim(e.nivel)}`, 1]];
        if (t === "nivel_fallo") return [[`nivel_fallo:${lim(e.nivel)}`, 1]];
        if (t === "compra") return [["compras", 1], ["ingresos", Math.max(0, Number(e.monto || e.valor) || 0)]];
        return [[`evento:${lim(e.nombre || t || "otro")}`, Number.isFinite(Number(e.valor)) && e.valor !== void 0 ? Number(e.valor) : 1]];
      }
      reportarError(ev) {
        return this.ingestCrash(ev || {}, { app: "Delirium OS" });
      }
      // ───── tienda online (pública: sin sesión) ─────
      tiendaCatalogo() {
        const s = this.db.settings;
        if (!s.tienda_activa) return { activa: false };
        const productos = this.db.products.filter((p) => p.publicar_tienda && num(p.stock) > 0).map((p) => ({ id: p.id, nombre: p.nombre, precio: round2(p.precio), categoria: p.categoria || "Otro", descripcion: String(p.descripcion || "").slice(0, 600), disponibles: Math.min(num(p.stock), 20), imagen: p.imagen && p.imagen.ruta ? p.imagen.ruta : null }));
        return { activa: true, titulo: s.tienda_titulo || "Tienda", empresa: s.empresa, redes: s.redes, moneda: s.moneda, simbolo: s.simbolo, metodos: s.metodos_pago || [], datos_pago: s.tienda_datos_pago || "", envios: s.tienda_envios || "", productos };
      }
      tiendaPedido(d) {
        const s = this.db.settings;
        if (!s.tienda_activa) throw new InputError("La tienda est\xE1 cerrada por ahora.");
        const comprador = String(d.comprador || d.nombre || "").trim().slice(0, 120);
        const contacto = String(d.contacto || d.telefono || d.email || "").trim().slice(0, 160);
        if (!comprador || !contacto) throw new InputError("Escribe tu nombre y un tel\xE9fono o correo.");
        const lineas = [];
        for (const l of (Array.isArray(d.lineas) ? d.lineas : []).slice(0, 20)) {
          const p = this.db.products.find((x) => x.id === l.product_id && x.publicar_tienda);
          const q = Math.max(1, Math.min(20, Math.round(num(l.cantidad) || 1)));
          if (!p) throw new InputError("Uno de los productos ya no est\xE1 disponible.");
          if (num(p.stock) < q) throw new InputError(`Solo quedan ${num(p.stock)} de ${p.nombre}.`);
          lineas.push({ descripcion: p.nombre, product_id: p.id, cantidad: q, precio: round2(p.precio) });
        }
        if (!lineas.length) throw new InputError("Tu carrito est\xE1 vac\xEDo.");
        const metodo = (s.metodos_pago || []).includes(d.metodo) ? d.metodo : "Otro";
        const o = {
          id: uid(),
          creado: now(),
          creado_por: null,
          codigo: this.nextCode("PED"),
          comprador,
          contacto,
          email: String(d.email || "").slice(0, 160),
          canal: "Tienda online",
          estado: "Nuevo",
          fecha: today(),
          metodo,
          referencia: String(d.referencia || "").slice(0, 80),
          entrega: String(d.entrega || "").slice(0, 300),
          nota: String(d.nota || "").slice(0, 500),
          lineas,
          stock_aplicado: false
        };
        this.db.orders.unshift(o);
        this.audit("crear", "pedidos", o.id, `Pedido web ${o.codigo} \xB7 ${comprador}`);
        const total = this.linesTotal(o)._total;
        this.emit("pedidos", `Nuevo pedido en la tienda: ${o.codigo}`, `${comprador} \xB7 ${s.simbolo || "$"}${total} por ${metodo}${o.referencia ? " \xB7 ref. " + o.referencia : ""}. Verifica el pago y m\xE1rcalo como pagado.`);
        return { codigo: o.codigo, total };
      }
      contactoWeb(d) {
        const nombre = String(d.nombre || "").trim().slice(0, 120);
        const email = String(d.email || "").trim().slice(0, 160);
        if (!nombre || !(email || d.telefono)) throw new InputError("Escribe tu nombre y un correo o tel\xE9fono.");
        const texto = String(d.mensaje || "").slice(0, 3e3);
        const ex = email && this.db.clients.find((c2) => (c2.email || "").toLowerCase() === email.toLowerCase());
        const nota = { fecha: now(), tipo: "Formulario web", nota: texto || "Llen\xF3 el formulario de contacto.", por: "Web" };
        if (ex) {
          ex.historial = [nota, ...ex.historial || []];
          this.emit("soporte", `${ex.nombre} volvi\xF3 a escribir desde la web`, texto.slice(0, 300));
          return { ok: true };
        }
        const c = {
          id: uid(),
          creado: now(),
          creado_por: null,
          nombre,
          empresa: String(d.empresa || "").slice(0, 120),
          email,
          telefono: String(d.telefono || "").slice(0, 40),
          estado: "Por contactar",
          origen: "Web",
          temperatura: "Tibio",
          historial: [nota],
          asignados: []
        };
        this.db.clients.unshift(c);
        this.audit("crear", "clientes", c.id, `Contacto desde la web: ${nombre}`);
        this.emit("soporte", `Nuevo contacto desde la web: ${nombre}`, `${email || d.telefono}${texto ? " \xB7 " + texto.slice(0, 300) : ""}`);
        return { ok: true };
      }
      gameByKey(clave2) {
        return clave2 ? this.db.games.find((g) => g.clave_reportes && g.clave_reportes === String(clave2)) : null;
      }
      archivoPermitido(ruta) {
        this.requireUser();
        ruta = String(ruta || "");
        if (!ruta) return false;
        const needle = JSON.stringify(ruta);
        for (const m of MODULES.filter((x) => x.col && !["audit", "settings"].includes(x.col))) for (const r of this.safeList(m.key)) if (JSON.stringify(r).includes(needle)) return true;
        return false;
      }
      // ───────────── vistas calculadas ─────────────
      directory() {
        this.requireUser();
        if (this.isClient()) return [];
        return this.db.users.filter((u) => u.activo && ROLES[u.rol].staff).map((u) => ({ id: u.id, nombre: u.nombre, rol: u.rol, rol_label: ROLES[u.rol].label }));
      }
      options(m) {
        if (!this.canRead(m)) return [];
        const col = this.colOf(m);
        const { scope } = this.perm(m);
        return this.db[col].filter((r) => this.inScope(col, r, scope)).map((r) => ({ id: r.id, nombre: r.nombre || r.titulo || r.codigo, client_id: r.client_id || null, precio: r.precio, stock: r.stock }));
      }
      safeList(m) {
        try {
          return this.canRead(m) ? this.list(m) : [];
        } catch (e) {
          return [];
        }
      }
      dashboard() {
        const u = this.requireUser();
        const t = today();
        const week = ymd(new Date(Date.now() + 7 * 864e5));
        const d = { rol: u.rol, cliente: this.isClient() };
        const projects = this.safeList("proyectos");
        const tasks = this.safeList("tareas");
        const reminders = this.safeList("recordatorios").filter((r) => !r.hecho && r.usuario_id === u.id);
        d.proyectos_activos = projects.filter((p) => !["Entregado", "Cancelado"].includes(p.estado));
        d.mis_tareas = tasks.filter((x) => x.asignado === u.id && x.estado !== "Hecha").sort((a, b) => (a.vence || "9") < (b.vence || "9") ? -1 : 1);
        d.entregas_semana = [
          ...projects.filter((p) => p.entrega && p.entrega >= t && p.entrega <= week && p.estado !== "Entregado"),
          ...tasks.filter((x) => x.vence && x.vence >= t && x.vence <= week && x.estado !== "Hecha")
        ];
        d.atrasadas = tasks.filter((x) => x.vence && x.vence < t && x.estado !== "Hecha").length;
        d.recordatorios_hoy = reminders.filter((r) => (r.fecha || "").slice(0, 10) <= t);
        d.rondas_alerta = projects.filter((p) => p._rondas_restantes !== void 0 && num(p.rondas_usadas) >= num(p.rondas_incluidas) && p.estado !== "Entregado");
        if (this.canRead("clientes")) {
          const cl = this.safeList("clientes");
          d.clientes = { total: cl.length, por_contactar: cl.filter((c) => c.estado === "Por contactar").length, actuales: cl.filter((c) => c.estado === "Actual").length };
        }
        if (this.canRead("facturas")) {
          const f = this.safeList("facturas").filter((x) => x._estado !== "Anulada");
          d.por_cobrar = round2(f.reduce((a, x) => a + x._saldo, 0));
          d.pagos_por_verificar = f.filter((x) => x._por_verificar > 0).length;
          d.facturas_pendientes = f.filter((x) => x._saldo > 0);
        }
        if (this.canRead("cotizaciones")) d.cotizaciones_enviadas = this.safeList("cotizaciones").filter((q) => q.estado === "Enviada");
        if (this.canRead("productos")) d.stock_bajo = this.safeList("productos").filter((p) => p._stock_bajo);
        if (this.canRead("licencias")) d.licencias_vencen = this.safeList("licencias").filter((l) => l.vence && l.vence <= ymd(new Date(Date.now() + 30 * 864e5)));
        if (this.canApprove("ausencias")) d.ausencias_pendientes = this.db.leaves.filter((l) => l.estado === "Pendiente").length;
        if (this.canApprove("gastos")) d.gastos_pendientes = this.db.expenses.filter((g) => g.estado === "Pendiente").length;
        if (this.canRead("soporte")) {
          const tk = this.safeList("soporte");
          d.soporte_esperando = tk.filter((t2) => t2._espera_equipo).length;
          d.mis_solicitudes = tk.filter((t2) => !["Cerrado"].includes(t2.estado));
        }
        if (this.canRead("piezas")) {
          const pz = this.safeList("piezas");
          d.piezas_cliente = pz.filter((x) => x.estado === "Revisi\xF3n del cliente");
          d.piezas_internas = this.canReviewPieces() ? pz.filter((x) => x.estado === "Revisi\xF3n interna") : [];
          d.piezas_cambios = pz.filter((x) => x.estado === "Cambios pedidos" && (x.asignado === u.id || this.canReviewPieces()));
        }
        if (this.canRead("redes")) {
          const po = this.safeList("redes");
          d.posts_por_aprobar = po.filter((x) => x.estado === "Por aprobar");
          d.posts_hoy = po.filter((x) => (x.fecha || "").slice(0, 10) === t && !["Publicado"].includes(x.estado));
        }
        if (this.canRead("anuncios")) d.campanas_alerta = this.safeList("anuncios").filter((c) => c._alerta);
        if (this.canRead("planes")) {
          const pl = this.safeList("planes");
          d.planes_por_facturar = pl.filter((x) => x._por_facturar).length;
          d.alquileres_devolver = pl.filter((x) => x._por_devolver);
        }
        if (this.canRead("bugs")) d.bugs_bloqueantes = this.safeList("bugs").filter((b) => b.severidad === "Bloqueante" && !["Arreglado", "Verificado", "No se arregla"].includes(b.estado));
        if (this.canRead("pedidos")) {
          const pe = this.safeList("pedidos");
          d.pedidos_pendientes = pe.filter((x) => ["Nuevo", "Pagado"].includes(x.estado)).length;
        }
        if (this.isClient()) d.contratos_por_firmar = this.safeList("contratos").filter((c) => c.pedir_firma && !(c.firmas || []).some((f) => f.parte === "cliente") && c.estado !== "Cancelado");
        if (this.canRead("compras")) d.compras_por_recibir = this.safeList("compras").filter((o) => o.estado === "Enviada").length;
        if (this.canRead("evaluaciones")) d.evaluaciones_nuevas = this.safeList("evaluaciones").filter((r) => r.usuario_id === u.id && r.estado === "Compartida" && !r.respuesta).length;
        if (this.canRead("candidatos")) d.candidatos_nuevos = this.safeList("candidatos").filter((c) => c.etapa === "Recibido").length;
        if (this.isAdmin()) d.primeros_pasos = { ajustes: !!(this.db.settings.rif || this.db.settings.telefono || this.db.settings.direccion), catalogo: this.db.services.length > 0, equipo: this.db.users.length > 1, clientes: this.db.clients.length > 0, proyectos: this.db.projects.length > 0 };
        return d;
      }
      calendar(from, to) {
        this.requireUser();
        const items = [];
        const inRange = (dt) => dt && dt.slice(0, 10) >= from && dt.slice(0, 10) <= to;
        for (const e of this.safeList("calendario")) if (inRange(e.fecha)) items.push({ tipo: "Evento", id: e.id, titulo: e.titulo, fecha: e.fecha, quien: e._usuario_id || e._creado_por, modulo: "calendario" });
        for (const x of this.safeList("tareas")) if (inRange(x.vence)) items.push({ tipo: "Tarea", id: x.id, titulo: x.titulo, fecha: x.vence, quien: x._asignado, estado: x.estado, modulo: "tareas" });
        for (const p of this.safeList("proyectos")) if (inRange(p.entrega)) items.push({ tipo: "Entrega", id: p.id, titulo: p.nombre, fecha: p.entrega, modulo: "proyectos" });
        for (const r of this.safeList("recordatorios")) if (inRange(r.fecha) && !r.hecho) items.push({ tipo: "Recordatorio", id: r.id, titulo: r.titulo, fecha: r.fecha, quien: r._usuario_id, modulo: "recordatorios" });
        for (const l of this.safeList("ausencias")) if (l.estado === "Aprobada" && l.desde <= to && l.hasta >= from) items.push({ tipo: "Ausencia", id: l.id, titulo: `${l._usuario_id || ""} \xB7 ${l.tipo}`, fecha: l.desde, hasta: l.hasta, modulo: "ausencias" });
        for (const x of this.safeList("redes")) if (inRange(x.fecha)) items.push({ tipo: "Publicaci\xF3n", id: x.id, titulo: `${x._cliente ? x._cliente.replace(/ \(ejemplo\)/, "") + ": " : ""}${x.titulo}`, fecha: x.fecha, quien: x._responsable, modulo: "redes" });
        for (const x of this.safeList("piezas")) if (inRange(x.fecha_limite) && x.estado !== "Aprobada") items.push({ tipo: "Pieza", id: x.id, titulo: x.titulo, fecha: x.fecha_limite, quien: x._asignado, modulo: "piezas" });
        for (const g of this.safeList("juegos")) {
          if (inRange(g.fecha_hito)) items.push({ tipo: "Hito", id: g.id, titulo: `${g.nombre}: ${g.hito || "hito"}`, fecha: g.fecha_hito, modulo: "juegos" });
          if (inRange(g.lanzamiento)) items.push({ tipo: "Hito", id: g.id, titulo: `Lanzamiento de ${g.nombre}`, fecha: g.lanzamiento, modulo: "juegos" });
        }
        if (this.canWrite("planes")) {
          for (const x of this.safeList("planes")) if (x.estado === "Activo" && inRange(x.proximo_cobro)) items.push({ tipo: "Cobro", id: x.id, titulo: `Cobrar ${x.nombre}`, fecha: x.proximo_cobro, modulo: "planes" });
        }
        return items;
      }
      report(year) {
        if (!this.canRead("reportes")) throw new AccessError("Solo Direcci\xF3n y Finanzas ven los reportes.");
        const y = String(year || (/* @__PURE__ */ new Date()).getFullYear());
        const months = Array.from({ length: 12 }, (_, i) => ({ mes: i + 1, ingresos: 0, merch: 0, gastos: 0, nomina: 0 }));
        for (const o of this.db.orders) if (o.stock_aplicado && (o.fecha_pago || o.fecha || "").startsWith(y)) months[Number((o.fecha_pago || o.fecha).slice(5, 7)) - 1].merch += this.linesTotal(o)._total;
        for (const f of this.db.invoices) for (const pg of f.pagos || []) if (pg.estado === "Verificado" && (pg.fecha || "").startsWith(y)) months[Number(pg.fecha.slice(5, 7)) - 1].ingresos += num(pg.monto);
        for (const g of this.db.expenses) if (g.estado === "Aprobado" && (g.fecha || "").startsWith(y)) months[Number(g.fecha.slice(5, 7)) - 1].gastos += num(g.monto);
        for (const s of this.db.payslips) if (s.estado === "Pagado" && (s.fecha_pago || "").startsWith(y)) months[Number(s.fecha_pago.slice(5, 7)) - 1].nomina += num(s.neto);
        months.forEach((m) => {
          m.ingresos = round2(m.ingresos);
          m.merch = round2(m.merch);
          m.gastos = round2(m.gastos);
          m.nomina = round2(m.nomina);
          m.resultado = round2(m.ingresos + m.merch - m.gastos - m.nomina);
        });
        const proyectos = this.db.projects.map((p) => {
          const cobrado = round2(this.db.invoices.filter((f) => f.project_id === p.id).reduce((a, f) => a + this.invoiceTotals(f)._pagado, 0));
          const gastos = round2(this.db.expenses.filter((g) => g.project_id === p.id && g.estado === "Aprobado").reduce((a, g) => a + num(g.monto), 0));
          const horas = round2(this.db.timesheets.filter((h) => h.project_id === p.id).reduce((a, h) => a + num(h.horas), 0));
          const costo_horas = round2(this.db.timesheets.filter((h) => h.project_id === p.id).reduce((a, h) => a + num(h.horas) * num(h.costo_hora), 0));
          return { id: p.id, codigo: p.codigo, nombre: p.nombre, cliente: this.nameOf("clients", p.client_id), precio: num(p.precio), cobrado, gastos, horas, costo_horas, margen: round2(cobrado - gastos - costo_horas) };
        });
        const tot = months.reduce((a, m) => ({ ingresos: a.ingresos + m.ingresos, merch: a.merch + m.merch, gastos: a.gastos + m.gastos, nomina: a.nomina + m.nomina }), { ingresos: 0, merch: 0, gastos: 0, nomina: 0 });
        return { year: y, months, proyectos, totales: { ...tot, merch: round2(tot.merch), resultado: round2(tot.ingresos + tot.merch - tot.gastos - tot.nomina) } };
      }
      search(q) {
        this.requireUser();
        q = String(q || "").trim().toLowerCase();
        if (q.length < 2) return [];
        const out = [];
        for (const m of MODULES.filter((x) => x.col && x.col !== "audit" && x.col !== "settings")) {
          for (const r of this.safeList(m.key)) {
            const hay = [r.nombre, r.titulo, r.asunto, r.comprador, r.creador, r.puesto, r.codigo, r.email, r.empresa, r.concepto, r.descripcion, r._cliente, r._juego].filter(Boolean).join(" ").toLowerCase();
            if (hay.includes(q)) out.push({ modulo: m.key, modulo_label: m.label, id: r.id, titulo: r.codigo ? `${r.codigo} \xB7 ${r.nombre || r.titulo || r.asunto || r.comprador || r._cliente || ""}` : r.nombre || r.titulo || r.creador || r.concepto || r.descripcion || r._juego });
            if (out.length > 40) return out;
          }
        }
        return out;
      }
      auditList() {
        if (!this.canRead("actividad")) throw new AccessError("Solo Direcci\xF3n ve el registro de actividad.");
        return this.db.audit.slice(0, 1e3);
      }
      settings() {
        this.requireUser();
        const s = { ...this.db.settings };
        if (!this.isAdmin()) for (const k of SECRET_SETTINGS) delete s[k];
        else s._secretos = SECRET_SETTINGS;
        return s;
      }
      meta() {
        const u = this.user;
        const optional = ["cotizaciones", "piezas", "redes", "anuncios", "juegos", "planes", "contratos"];
        const modules = MODULES.filter((m) => u && this.perm(m.key, u).level).filter((m) => !(this.isClient() && optional.includes(m.key) && !this.safeList(m.key).length)).map((m) => ({ ...m, ...this.perm(m.key, u) }));
        const hidden = {};
        if (u) {
          for (const [col, rules] of Object.entries(FIELD_VIS)) for (const f of Object.keys(rules)) if (!rules[f].includes(u.rol)) (hidden[col] = hidden[col] || []).push(f);
        }
        return { roles: ROLES, modules, hidden, gameStages: GAME_STAGES, canApprove: u ? { ausencias: this.canApprove("ausencias"), gastos: this.canApprove("gastos"), piezas: this.canReviewPieces() } : {} };
      }
      exportData() {
        if (!this.isAdmin()) throw new AccessError("Solo Direcci\xF3n exporta copias completas.");
        this.audit("exportar", "ajustes", null, "Copia completa exportada");
        this.flush();
        return JSON.stringify(this.db, null, 1);
      }
      importData(text) {
        if (!this.isAdmin()) throw new AccessError("Solo Direcci\xF3n restaura copias.");
        let d;
        try {
          d = JSON.parse(text);
        } catch (e) {
          throw new InputError("El archivo no es una copia v\xE1lida de Delirium OS.");
        }
        if (!d || !Array.isArray(d.users) || !d.users.length) throw new InputError("El archivo no es una copia v\xE1lida de Delirium OS.");
        if (!this.memory) fs.copyFileSync(this.file, path.join(this.backupDir, `antes-de-restaurar-${Date.now()}.json`));
        this.db = d;
        for (const c of COLLECTIONS) if (!Array.isArray(this.db[c])) this.db[c] = [];
        this.db.counters = this.db.counters || {};
        this.db.settings = { ...DEFAULT_SETTINGS, ...this.db.settings || {} };
        this.user = null;
        this.flush();
        return true;
      }
    };
    module.exports = { Core, AccessError, InputError, hashPw, verifyPw, COLLECTIONS, DEFAULT_SETTINGS };
  }
});

// src/main/integraciones.js
var require_integraciones = __commonJS({
  "src/main/integraciones.js"(exports, module) {
    var BASE = {
      discord: () => typeof process !== "undefined" && process.env && process.env.DOS_DISCORD_API || "https://discord.com/api/v10",
      graph: () => typeof process !== "undefined" && process.env && process.env.DOS_GRAPH_API || "https://graph.facebook.com",
      github: () => typeof process !== "undefined" && process.env && process.env.DOS_GITHUB_API || "https://api.github.com"
    };
    var COLORES = { soporte: 8369407, piezas: 8206827, pagos: 4054167, bugs: 16739205, redes: 13041459, cotizaciones: 16758087, pedidos: 4054167 };
    var ETIQUETAS = { soporte: "Soporte", piezas: "Piezas", pagos: "Pagos", bugs: "Bugs", redes: "Redes", cotizaciones: "Cotizaciones", pedidos: "Tienda" };
    var conTiempo = (ms) => {
      const c = new AbortController();
      const t = setTimeout(() => c.abort(), ms);
      return { signal: c.signal, done: () => clearTimeout(t) };
    };
    async function pedir(fetchImpl, url, opts = {}, ms = 15e3) {
      const t = conTiempo(ms);
      try {
        return await fetchImpl(url, { ...opts, signal: t.signal });
      } finally {
        t.done();
      }
    }
    function webhookValido(url) {
      return /^https:\/\/(discord\.com|discordapp\.com|ptb\.discord\.com|canary\.discord\.com)\/api\/webhooks\/\d+\/[\w-]+$/.test(String(url || "").trim()) || typeof process !== "undefined" && process.env && process.env.DOS_DISCORD_API && String(url).startsWith(process.env.DOS_DISCORD_API);
    }
    async function enviarDiscord(settings, eventos, fetchImpl = fetch) {
      const url = String(settings.discord_webhook || "").trim();
      if (!url || !eventos || !eventos.length || !webhookValido(url)) return 0;
      const permitidos = settings.discord_avisos || [];
      const lista = eventos.filter((e) => permitidos.includes(e.tipo)).slice(0, 10);
      if (!lista.length) return 0;
      const body = { username: "Delirium OS", embeds: lista.map((e) => ({ title: String(e.titulo).slice(0, 250), description: String(e.detalle || "").slice(0, 1500), color: COLORES[e.tipo] || 8206827, footer: { text: `Delirium OS \xB7 ${ETIQUETAS[e.tipo] || e.tipo}` }, timestamp: e.fecha })) };
      try {
        const r = await pedir(fetchImpl, url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        return r.ok ? lista.length : 0;
      } catch (e) {
        return 0;
      }
    }
    async function probarDiscord(settings, fetchImpl = fetch) {
      const url = String(settings.discord_webhook || "").trim();
      if (!webhookValido(url)) throw new Error("El enlace del webhook no es v\xE1lido. Debe empezar con https://discord.com/api/webhooks/\u2026");
      const r = await pedir(fetchImpl, url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "Delirium OS", embeds: [{ title: "\u2726 Delirium OS est\xE1 conectado", description: "Aqu\xED llegar\xE1n los avisos del estudio. Stay delirious.", color: 13041459 }] }) });
      if (!r.ok) throw new Error(`Discord respondi\xF3 ${r.status}. Revisa el enlace del webhook.`);
      return true;
    }
    async function leerDiscord(settings, fetchImpl = fetch) {
      const token = String(settings.discord_bot_token || "").trim();
      const canal = String(settings.discord_canal_bugs || "").trim();
      if (!token || !/^\d{5,25}$/.test(canal)) throw new Error("Falta el token del bot o el ID del canal de bugs.");
      const h = { Authorization: `Bot ${token}` };
      const rc = await pedir(fetchImpl, `${BASE.discord()}/channels/${canal}`, { headers: h });
      if (rc.status === 401) throw new Error("Discord rechaz\xF3 el token del bot.");
      if (rc.status === 403 || rc.status === 404) throw new Error("El bot no puede ver ese canal. Inv\xEDtalo al servidor y dale permiso de leer el canal.");
      if (!rc.ok) throw new Error(`Discord respondi\xF3 ${rc.status}.`);
      const ch = await rc.json();
      const rm = await pedir(fetchImpl, `${BASE.discord()}/channels/${canal}/messages?limit=50`, { headers: h });
      if (!rm.ok) throw new Error(`No se pudieron leer los mensajes (${rm.status}).`);
      const msgs = await rm.json();
      return msgs.filter((m) => !(m.author && m.author.bot) && (m.content || "").trim()).map((m) => ({
        id: m.id,
        contenido: m.content,
        autor: m.author ? m.author.global_name || m.author.username : "",
        fecha: m.timestamp,
        enlace: `https://discord.com/channels/${ch.guild_id || "@me"}/${canal}/${m.id}`,
        votos: (m.reactions || []).filter((x) => x.emoji && ["\u{1F44D}", "\u2B06\uFE0F", "\u{1F525}", "+1"].includes(x.emoji.name)).reduce((a, x) => a + (x.count || 0), 0),
        adjuntos: (m.attachments || []).map((a) => a.url)
      }));
    }
    var ACCION_POR_OBJETIVO = {
      Mensajes: ["onsite_conversion.messaging_conversation_started_7d", "onsite_conversion.total_messaging_connection"],
      Leads: ["lead", "onsite_conversion.lead_grouped", "offsite_conversion.fb_pixel_lead"],
      Tr\u00E1fico: ["link_click", "landing_page_view"],
      Ventas: ["offsite_conversion.fb_pixel_purchase", "purchase", "omni_purchase"],
      Seguidores: ["onsite_conversion.follow", "like", "page_like"],
      Instalaciones: ["mobile_app_install", "app_install"],
      Wishlists: ["link_click"]
    };
    var NOMBRE_ACCION = { Mensajes: "Conversaciones iniciadas", Leads: "Clientes potenciales", Tr\u00E1fico: "Clics en el enlace", Ventas: "Compras", Seguidores: "Seguidores", Instalaciones: "Instalaciones", Wishlists: "Clics hacia la tienda", Alcance: "Personas alcanzadas" };
    var OBJETIVO_META = { OUTCOME_ENGAGEMENT: "Mensajes", MESSAGES: "Mensajes", OUTCOME_LEADS: "Leads", LEAD_GENERATION: "Leads", OUTCOME_TRAFFIC: "Tr\xE1fico", LINK_CLICKS: "Tr\xE1fico", OUTCOME_SALES: "Ventas", CONVERSIONS: "Ventas", OUTCOME_AWARENESS: "Alcance", REACH: "Alcance", BRAND_AWARENESS: "Alcance", OUTCOME_APP_PROMOTION: "Instalaciones", APP_INSTALLS: "Instalaciones", PAGE_LIKES: "Seguidores" };
    var ESTADO_META = { ACTIVE: "Activa", PAUSED: "Pausada", ARCHIVED: "Terminada", DELETED: "Terminada", CAMPAIGN_PAUSED: "Pausada", IN_PROCESS: "Activa", WITH_ISSUES: "Activa" };
    async function graph(settings, ruta, params, fetchImpl) {
      const token = String(settings.meta_token || "").trim();
      if (!token) throw new Error("Falta el token de Meta en Ajustes > Conexiones.");
      const v = /^v\d+\.\d$/.test(settings.meta_version || "") ? settings.meta_version : "v26.0";
      const qs = new URLSearchParams({ ...params, access_token: token }).toString();
      const r = await pedir(fetchImpl, `${BASE.graph()}/${v}/${ruta}?${qs}`, {}, 2e4);
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.error) {
        const m = j.error ? j.error.message : `Meta respondi\xF3 ${r.status}`;
        throw new Error(/expired|session/i.test(m) ? "El token de Meta venci\xF3. Genera uno nuevo." : `Meta: ${m}`);
      }
      return j;
    }
    function resumirInsights(camp, ins, objetivo) {
      const obj = objetivo || OBJETIVO_META[camp.objective] || "";
      const acciones = ins && ins.actions || [];
      let resultados = null;
      if (obj === "Alcance") resultados = Number(ins && ins.reach || 0);
      else for (const tipo of ACCION_POR_OBJETIVO[obj] || []) {
        const a = acciones.find((x) => x.action_type === tipo);
        if (a) {
          resultados = Number(a.value);
          break;
        }
      }
      const fecha = (x) => x ? String(x).slice(0, 10) : "";
      const presupuesto = camp.lifetime_budget ? Number(camp.lifetime_budget) / 100 : null;
      return {
        meta_id: camp.id,
        nombre: camp.name,
        objetivo: obj,
        estado: ESTADO_META[camp.effective_status || camp.status] || "",
        presupuesto,
        gastado: ins ? Number(ins.spend || 0) : 0,
        alcance: ins ? Number(ins.reach || 0) : 0,
        clics: ins ? Number(ins.clicks || 0) : 0,
        resultados,
        tipo_resultado: NOMBRE_ACCION[obj] || "",
        inicio: fecha(camp.start_time),
        fin: fecha(camp.stop_time)
      };
    }
    async function leerCampanaMeta(settings, metaId, objetivo, fetchImpl = fetch) {
      const camp = await graph(settings, metaId, { fields: "id,name,status,effective_status,objective,lifetime_budget,daily_budget,start_time,stop_time" }, fetchImpl);
      const ins = await graph(settings, `${metaId}/insights`, { fields: "spend,reach,impressions,clicks,actions", date_preset: "maximum" }, fetchImpl);
      return resumirInsights(camp, (ins.data || [])[0], objetivo);
    }
    async function leerCuentaMeta(settings, cuenta, fetchImpl = fetch) {
      const id = String(cuenta).startsWith("act_") ? cuenta : `act_${cuenta}`;
      const lista = await graph(settings, `${id}/campaigns`, { fields: "id,name,status,effective_status,objective,lifetime_budget,start_time,stop_time", limit: "50", effective_status: '["ACTIVE","PAUSED"]' }, fetchImpl);
      const out = [];
      for (const c of (lista.data || []).slice(0, 25)) {
        const ins = await graph(settings, `${c.id}/insights`, { fields: "spend,reach,impressions,clicks,actions", date_preset: "maximum" }, fetchImpl).catch(() => ({ data: [] }));
        out.push(resumirInsights(c, (ins.data || [])[0]));
      }
      return out;
    }
    var mayor = (a, b) => {
      const pa = String(a).replace(/^v/, "").split(".").map(Number);
      const pb = String(b).replace(/^v/, "").split(".").map(Number);
      for (let i = 0; i < 3; i++) {
        if ((pa[i] || 0) > (pb[i] || 0)) return true;
        if ((pa[i] || 0) < (pb[i] || 0)) return false;
      }
      return false;
    };
    async function buscarActualizacion(repo, actual, fetchImpl = fetch) {
      repo = String(repo || "").trim().replace(/^https?:\/\/github\.com\//, "").replace(/\/$/, "");
      if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) return null;
      const r = await pedir(fetchImpl, `${BASE.github()}/repos/${repo}/releases/latest`, { headers: { Accept: "application/vnd.github+json", "User-Agent": "Delirium-OS" } });
      if (r.status === 404) throw new Error("No hay versiones publicadas en ese repositorio (o es privado).");
      if (!r.ok) throw new Error(`GitHub respondi\xF3 ${r.status}.`);
      const rel = await r.json();
      if (!rel.tag_name || !mayor(rel.tag_name, actual)) return { nueva: false, version: String(rel.tag_name || "").replace(/^v/, "") };
      const exe = (rel.assets || []).find((a) => /\.exe$/i.test(a.name) && /setup/i.test(a.name));
      if (!exe) return { nueva: false, version: rel.tag_name };
      const sha = (rel.assets || []).find((a) => a.name === `${exe.name}.sha256`);
      return { nueva: true, version: rel.tag_name.replace(/^v/, ""), nombre: exe.name, url: exe.browser_download_url, peso: exe.size, sha256url: sha ? sha.browser_download_url : null, notas: String(rel.body || "").slice(0, 2e3) };
    }
    module.exports = { enviarDiscord, probarDiscord, leerDiscord, leerCampanaMeta, leerCuentaMeta, resumirInsights, buscarActualizacion, mayor };
  }
});

// src/main/externos.js
var require_externos = __commonJS({
  "src/main/externos.js"(exports, module) {
    var I = require_integraciones();
    async function sincronizarMeta(core, p = {}, fetchImpl = fetch) {
      if (!core.canWrite("anuncios")) throw Object.assign(new Error("Tu rol no puede actualizar campa\xF1as."), { code: "ACCESS" });
      const st = core.db.settings;
      if (!st.meta_token) throw Object.assign(new Error("Direcci\xF3n todav\xEDa no conect\xF3 Meta (Ajustes > Conexiones)."), { code: "INPUT" });
      const visibles = core.list("anuncios").filter((c) => c.meta_id && (!p.client_id || c.client_id === p.client_id));
      const resultados = [];
      const errores = [];
      for (const c of visibles.slice(0, 40)) {
        try {
          resultados.push(await I.leerCampanaMeta(st, c.meta_id, c.objetivo, fetchImpl));
        } catch (e) {
          errores.push(`${c.nombre}: ${e.message}`);
        }
      }
      let creadas = 0;
      const clientes = core.canRead("clientes") ? core.list("clientes").filter((c) => c.meta_cuenta && (!p.client_id || c.id === p.client_id)) : [];
      for (const cl of clientes.slice(0, 10)) {
        try {
          const nuevas = (await I.leerCuentaMeta(st, cl.meta_cuenta, fetchImpl)).filter((r2) => !core.db.campaigns.some((x) => String(x.meta_id) === String(r2.meta_id)));
          if (nuevas.length) creadas += core.action("anuncios.meta", { resultados: nuevas, client_id: cl.id }).creadas;
        } catch (e) {
          errores.push(`${cl.nombre}: ${e.message}`);
        }
      }
      const r = resultados.length ? core.action("anuncios.meta", { resultados }) : { actualizadas: 0 };
      return { actualizadas: r.actualizadas, creadas, errores };
    }
    async function leerDiscord(core, fetchImpl = fetch) {
      if (!core.isAdmin()) throw Object.assign(new Error("Solo Direcci\xF3n conecta Discord."), { code: "ACCESS" });
      const mensajes = await I.leerDiscord(core.db.settings, fetchImpl);
      return core.action("discord.importar", { mensajes });
    }
    async function probarDiscord(core, fetchImpl = fetch) {
      if (!core.isAdmin()) throw Object.assign(new Error("Solo Direcci\xF3n conecta Discord."), { code: "ACCESS" });
      return I.probarDiscord(core.db.settings, fetchImpl);
    }
    module.exports = { sincronizarMeta, leerDiscord, probarDiscord };
  }
});

// src/main/redes.js
var require_redes = __commonJS({
  "src/main/redes.js"(exports, module) {
    var crypto = (init_shim_crypto(), __toCommonJS(shim_crypto_exports));
    var REDES = ["Instagram", "Facebook", "TikTok", "YouTube", "X"];
    var API = {
      ig: process.env.DOS_IG_API || "https://graph.instagram.com",
      igAuth: process.env.DOS_IG_AUTH || "https://api.instagram.com",
      fb: process.env.DOS_GRAPH_API || "https://graph.facebook.com",
      tt: process.env.DOS_TT_API || "https://open.tiktokapis.com",
      gAuth: process.env.DOS_G_AUTH || "https://oauth2.googleapis.com",
      yt: process.env.DOS_YT_API || "https://www.googleapis.com",
      x: process.env.DOS_X_API || "https://api.x.com"
    };
    var err = (m, code = "INPUT") => Object.assign(new Error(m), { code });
    var v = (s) => s.meta_version || "v26.0";
    var form = (o) => new URLSearchParams(Object.entries(o).filter(([, x]) => x !== void 0 && x !== null)).toString();
    async function pedir(f, url, opts = {}, quien = "La red") {
      let r;
      try {
        r = await f(url, opts);
      } catch (e2) {
        throw err(`${quien} no respondi\xF3. Revisa la conexi\xF3n e intenta de nuevo.`, "RED");
      }
      const txt = await r.text();
      let j = {};
      try {
        j = txt ? JSON.parse(txt) : {};
      } catch (e2) {
        j = { raw: txt };
      }
      const e = j.error && typeof j.error === "object" ? j.error : null;
      const malTT = j.error && j.error.code && j.error.code !== "ok";
      if (!r.ok || e && (e.message || e.code) && quien !== "TikTok" || quien === "TikTok" && malTT) {
        const msg = e && (e.error_user_msg || e.message || e.code) || j.error_description || j.detail || j.title || (typeof j.error === "string" ? j.error : "") || `error ${r.status}`;
        const vencido = r.status === 401 || e && (e.code === 190 || e.type === "OAuthException" && /expired|session/i.test(e.message || "")) || /invalid_grant|access_token_invalid|expired/i.test(JSON.stringify(j));
        throw Object.assign(err(`${quien}: ${String(msg).slice(0, 220)}`, vencido ? "VENCIDO" : "RED"), { status: r.status, respuesta: j });
      }
      return { j, r };
    }
    var verificadorDe = (estado, secreto) => crypto.createHmac("sha256", String(secreto)).update("pkce|" + estado).digest("base64url");
    var retoDe = (ver) => crypto.createHash("sha256").update(ver).digest("base64url");
    var igUnificado = (s) => !!s.ig_config_id || !s.ig_app_id;
    var igHost = (token) => token && token.extra && token.extra.modo === "unificado" ? API.fb : API.ig;
    function faltan(red, s) {
      const k = { Instagram: igUnificado(s) ? ["meta_app_id", "meta_app_secret", "ig_config_id"] : ["ig_app_id", "ig_app_secret"], Facebook: ["meta_app_id", "meta_app_secret"], TikTok: ["tiktok_client_key", "tiktok_client_secret"], YouTube: ["google_client_id", "google_client_secret"], X: ["x_client_id", "x_client_secret"] }[red];
      if (!k) throw err("Red no soportada.");
      if (red === "X" && !s.x_activo) throw err("La conexi\xF3n con X est\xE1 apagada: la API de X es de pago. Act\xEDvala en Ajustes > Conexiones cuando tengan cr\xE9ditos.");
      if (k.some((x) => !s[x])) throw err(`Direcci\xF3n todav\xEDa no configur\xF3 la app de ${red} (Ajustes > Conexiones > Redes sociales).`);
    }
    function urlAutorizar(red, s, { redirect, estado, secreto }) {
      faltan(red, s);
      if (red === "Instagram" && igUnificado(s)) return `https://www.facebook.com/dialog/oauth?${form({ client_id: s.meta_app_id, config_id: s.ig_config_id, override_default_response_type: "true", redirect_uri: redirect, response_type: "code", state: estado, prompt: "login" })}`;
      if (red === "Instagram") return `https://www.instagram.com/oauth/authorize?${form({ client_id: s.ig_app_id, redirect_uri: redirect, response_type: "code", state: estado, enable_fb_login: "0", force_reauth: "true", scope: "instagram_business_basic,instagram_business_content_publish,instagram_business_manage_insights" })}`;
      if (red === "Facebook" && s.fb_config_id) return `https://www.facebook.com/dialog/oauth?${form({ client_id: s.meta_app_id, config_id: s.fb_config_id, override_default_response_type: "true", redirect_uri: redirect, response_type: "code", state: estado })}`;
      if (red === "Facebook") return `https://www.facebook.com/${v(s)}/dialog/oauth?${form({ client_id: s.meta_app_id, redirect_uri: redirect, state: estado, response_type: "code", scope: "pages_show_list,pages_read_engagement,pages_manage_posts,read_insights" })}`;
      if (red === "TikTok") return `https://www.tiktok.com/v2/auth/authorize/?${form({ client_key: s.tiktok_client_key, redirect_uri: redirect, state: estado, response_type: "code", scope: "user.info.basic,user.info.profile,user.info.stats,video.list,video.publish,video.upload" })}`;
      if (red === "YouTube") return `https://accounts.google.com/o/oauth2/v2/auth?${form({ client_id: s.google_client_id, redirect_uri: redirect, state: estado, response_type: "code", access_type: "offline", prompt: "consent", include_granted_scopes: "true", scope: "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly" })}`;
      const ver = verificadorDe(estado, secreto);
      return `https://x.com/i/oauth2/authorize?${form({ response_type: "code", client_id: s.x_client_id, redirect_uri: redirect, state: estado, scope: "tweet.read tweet.write users.read media.write offline.access", code_challenge: retoDe(ver), code_challenge_method: "S256" })}`;
    }
    async function canjear(red, s, { code, redirect, estado, secreto }, f = fetch) {
      faltan(red, s);
      const ahora = Date.now();
      if (red === "Instagram" && igUnificado(s)) {
        const { j: j2 } = await pedir(f, `${API.fb}/${v(s)}/oauth/access_token?${form({ client_id: s.meta_app_id, client_secret: s.meta_app_secret, redirect_uri: redirect, code })}`, {}, "Instagram");
        const access = j2.access_token;
        const dura = Number(j2.expires_in) || 0;
        let empresa = null;
        try {
          const { j: me } = await pedir(f, `${API.fb}/${v(s)}/me?${form({ fields: "client_business_id", access_token: access })}`, {}, "Instagram");
          empresa = me.client_business_id || null;
        } catch (e) {
        }
        const { j: asig } = await pedir(f, `${API.fb}/${v(s)}/me/assigned_instagram_accounts?${form({ fields: "id,username", limit: 100, access_token: access })}`, {}, "Instagram");
        const lista = (asig.data || []).filter((a) => a && a.id);
        if (!lista.length) throw err("Instagram: no se comparti\xF3 ninguna cuenta profesional. Al conectar, marca la cuenta de Instagram del cliente (debe ser de empresa o creador).");
        const token2 = { access, expira: dura ? ahora + dura * 1e3 : null, extra: { modo: "unificado", empresa, config_id: s.ig_config_id } };
        const datos = async (id) => {
          try {
            return await perfil("Instagram", s, token2, f, id);
          } catch (e) {
            const a = lista.find((x) => x.id === id) || {};
            return { cuenta_ext: String(id), nombre: "@" + (a.username || id), enlace_perfil: a.username ? `https://www.instagram.com/${a.username}/` : "", seguidores: 0 };
          }
        };
        if (lista.length === 1) return { token: token2, cuenta: await datos(String(lista[0].id)) };
        const paginas = [];
        for (const a of lista) {
          const d = await datos(String(a.id));
          paginas.push({ id: d.cuenta_ext, name: d.nombre, token: access, link: d.enlace_perfil, seguidores: d.seguidores });
        }
        token2.extra.paginas = paginas;
        return { token: token2, cuenta: { paginas: paginas.map((p) => ({ id: p.id, name: p.name })) } };
      }
      if (red === "Instagram") {
        const { j: corto } = await pedir(f, `${API.igAuth}/oauth/access_token`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ client_id: s.ig_app_id, client_secret: s.ig_app_secret, grant_type: "authorization_code", redirect_uri: redirect, code: String(code).replace(/#_$/, "") }) }, "Instagram");
        const c = corto.data ? corto.data[0] : corto;
        const { j: largo } = await pedir(f, `${API.ig}/access_token?${form({ grant_type: "ig_exchange_token", client_secret: s.ig_app_secret, access_token: c.access_token })}`, {}, "Instagram");
        const token2 = { access: largo.access_token, expira: ahora + (Number(largo.expires_in) || 5184e3) * 1e3 };
        return { token: token2, cuenta: await perfil("Instagram", s, token2, f) };
      }
      if (red === "Facebook") {
        const { j: corto } = await pedir(f, `${API.fb}/${v(s)}/oauth/access_token?${form({ client_id: s.meta_app_id, client_secret: s.meta_app_secret, redirect_uri: redirect, code })}`, {}, "Facebook");
        const { j: largo } = await pedir(f, `${API.fb}/${v(s)}/oauth/access_token?${form({ grant_type: "fb_exchange_token", client_id: s.meta_app_id, client_secret: s.meta_app_secret, fb_exchange_token: corto.access_token })}`, {}, "Facebook");
        const { j: pags } = await pedir(f, `${API.fb}/${v(s)}/me/accounts?${form({ fields: "id,name,access_token,link,followers_count,fan_count", limit: 100, access_token: largo.access_token })}`, {}, "Facebook");
        const paginas = (pags.data || []).map((p) => ({ id: String(p.id), name: p.name, token: p.access_token, link: p.link || `https://www.facebook.com/${p.id}`, seguidores: Number(p.followers_count ?? p.fan_count) || 0 }));
        if (!paginas.length) throw err("Facebook: esa cuenta no administra ninguna p\xE1gina, o no se marc\xF3 ninguna al autorizar.");
        const token2 = { access: null, expira: null, extra: { usuario: largo.access_token, paginas } };
        const una = paginas.length === 1 ? paginas[0] : null;
        if (una) token2.access = una.token;
        return { token: token2, cuenta: una ? { cuenta_ext: una.id, nombre: una.name, enlace_perfil: una.link, seguidores: una.seguidores } : { paginas: paginas.map((p) => ({ id: p.id, name: p.name })) } };
      }
      if (red === "TikTok") {
        const { j: j2 } = await pedir(f, `${API.tt}/v2/oauth/token/`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ client_key: s.tiktok_client_key, client_secret: s.tiktok_client_secret, code: decodeURIComponent(code), grant_type: "authorization_code", redirect_uri: redirect }) }, "TikTok");
        if (!j2.access_token) throw err(`TikTok: ${j2.error_description || j2.error || "no entreg\xF3 el permiso"}`);
        const token2 = { access: j2.access_token, refresh: j2.refresh_token, expira: ahora + (Number(j2.expires_in) || 86400) * 1e3, extra: { open_id: j2.open_id, refresh_expira: ahora + (Number(j2.refresh_expires_in) || 31536e3) * 1e3, scope: j2.scope } };
        return { token: token2, cuenta: await perfil("TikTok", s, token2, f) };
      }
      if (red === "YouTube") {
        const { j: j2 } = await pedir(f, `${API.gAuth}/token`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ code, client_id: s.google_client_id, client_secret: s.google_client_secret, redirect_uri: redirect, grant_type: "authorization_code" }) }, "YouTube");
        if (!j2.refresh_token) throw err("YouTube no entreg\xF3 acceso permanente. Vuelve a conectar y acepta todos los permisos.");
        const token2 = { access: j2.access_token, refresh: j2.refresh_token, expira: ahora + (Number(j2.expires_in) || 3600) * 1e3 };
        return { token: token2, cuenta: await perfil("YouTube", s, token2, f) };
      }
      const basic = Buffer.from(`${s.x_client_id}:${s.x_client_secret}`).toString("base64");
      const { j } = await pedir(f, `${API.x}/2/oauth2/token`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Basic ${basic}` }, body: form({ code, grant_type: "authorization_code", redirect_uri: redirect, code_verifier: verificadorDe(estado, secreto), client_id: s.x_client_id }) }, "X");
      const token = { access: j.access_token, refresh: j.refresh_token, expira: ahora + (Number(j.expires_in) || 7200) * 1e3 };
      return { token, cuenta: await perfil("X", s, token, f) };
    }
    async function renovar(red, s, token, f = fetch) {
      const ahora = Date.now();
      if (red === "Facebook") return null;
      if (red === "Instagram" && token.extra && token.extra.modo === "unificado") {
        if (!token.expira || token.expira - ahora > 6e4) return null;
        throw err("Instagram: la conexi\xF3n venci\xF3. Vuelve a conectar la cuenta.", "VENCIDO");
      }
      if (red === "Instagram") {
        if (token.expira && token.expira - ahora > 10 * 864e5) return null;
        const { j: j2 } = await pedir(f, `${API.ig}/refresh_access_token?${form({ grant_type: "ig_refresh_token", access_token: token.access })}`, {}, "Instagram");
        return { ...token, access: j2.access_token, expira: ahora + (Number(j2.expires_in) || 5184e3) * 1e3 };
      }
      if (token.expira && token.expira - ahora > 5 * 6e4) return null;
      if (!token.refresh) throw err(`${red}: la conexi\xF3n venci\xF3. Vuelve a conectar la cuenta.`, "VENCIDO");
      if (red === "TikTok") {
        const { j: j2 } = await pedir(f, `${API.tt}/v2/oauth/token/`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ client_key: s.tiktok_client_key, client_secret: s.tiktok_client_secret, grant_type: "refresh_token", refresh_token: token.refresh }) }, "TikTok");
        if (!j2.access_token) throw err("TikTok: la conexi\xF3n venci\xF3. Vuelve a conectar la cuenta.", "VENCIDO");
        return { ...token, access: j2.access_token, refresh: j2.refresh_token || token.refresh, expira: ahora + (Number(j2.expires_in) || 86400) * 1e3 };
      }
      if (red === "YouTube") {
        const { j: j2 } = await pedir(f, `${API.gAuth}/token`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ client_id: s.google_client_id, client_secret: s.google_client_secret, refresh_token: token.refresh, grant_type: "refresh_token" }) }, "YouTube");
        return { ...token, access: j2.access_token, expira: ahora + (Number(j2.expires_in) || 3600) * 1e3 };
      }
      const basic = Buffer.from(`${s.x_client_id}:${s.x_client_secret}`).toString("base64");
      const { j } = await pedir(f, `${API.x}/2/oauth2/token`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Basic ${basic}` }, body: form({ grant_type: "refresh_token", refresh_token: token.refresh, client_id: s.x_client_id }) }, "X");
      return { ...token, access: j.access_token, refresh: j.refresh_token || token.refresh, expira: ahora + (Number(j.expires_in) || 7200) * 1e3 };
    }
    async function perfil(red, s, token, f = fetch, cuentaExt) {
      if (red === "Instagram" && token.extra && token.extra.modo === "unificado") {
        const id = cuentaExt || token.cuenta_ext;
        const { j: j2 } = await pedir(f, `${API.fb}/${v(s)}/${id}?${form({ fields: "id,username,name,followers_count,media_count", access_token: token.access })}`, {}, "Instagram");
        return { cuenta_ext: String(j2.id || id), nombre: "@" + j2.username, enlace_perfil: `https://www.instagram.com/${j2.username}/`, seguidores: Number(j2.followers_count) || 0, publicaciones_total: Number(j2.media_count) || 0 };
      }
      if (red === "Instagram") {
        const { j: j2 } = await pedir(f, `${API.ig}/${v(s)}/me?${form({ fields: "user_id,username,name,followers_count,media_count", access_token: token.access })}`, {}, "Instagram");
        return { cuenta_ext: String(j2.user_id || j2.id), nombre: "@" + j2.username, enlace_perfil: `https://www.instagram.com/${j2.username}/`, seguidores: Number(j2.followers_count) || 0, publicaciones_total: Number(j2.media_count) || 0 };
      }
      if (red === "Facebook") {
        const { j: j2 } = await pedir(f, `${API.fb}/${v(s)}/${cuentaExt}?${form({ fields: "id,name,link,followers_count,fan_count", access_token: token.access })}`, {}, "Facebook");
        return { cuenta_ext: String(j2.id), nombre: j2.name, enlace_perfil: j2.link || `https://www.facebook.com/${j2.id}`, seguidores: Number(j2.followers_count ?? j2.fan_count) || 0 };
      }
      if (red === "TikTok") {
        const { j: j2 } = await pedir(f, `${API.tt}/v2/user/info/?fields=open_id,display_name,username,follower_count,likes_count,video_count`, { headers: { Authorization: `Bearer ${token.access}` } }, "TikTok");
        const u2 = j2.data && j2.data.user || {};
        return { cuenta_ext: u2.open_id || token.extra && token.extra.open_id, nombre: u2.username ? "@" + u2.username : u2.display_name, enlace_perfil: u2.username ? `https://www.tiktok.com/@${u2.username}` : "", seguidores: Number(u2.follower_count) || 0, publicaciones_total: Number(u2.video_count) || 0, me_gusta_total: Number(u2.likes_count) || 0 };
      }
      if (red === "YouTube") {
        const { j: j2 } = await pedir(f, `${API.yt}/youtube/v3/channels?part=snippet,statistics&mine=true`, { headers: { Authorization: `Bearer ${token.access}` } }, "YouTube");
        const c = (j2.items || [])[0];
        if (!c) throw err("YouTube: esa cuenta de Google no tiene canal.");
        return { cuenta_ext: c.id, nombre: c.snippet.customUrl || c.snippet.title, enlace_perfil: `https://www.youtube.com/channel/${c.id}`, seguidores: Number(c.statistics.subscriberCount) || 0, publicaciones_total: Number(c.statistics.videoCount) || 0 };
      }
      const { j } = await pedir(f, `${API.x}/2/users/me?user.fields=public_metrics,username`, { headers: { Authorization: `Bearer ${token.access}` } }, "X");
      const u = j.data || {};
      return { cuenta_ext: u.id, nombre: "@" + u.username, enlace_perfil: `https://x.com/${u.username}`, seguidores: Number(u.public_metrics && u.public_metrics.followers_count) || 0, publicaciones_total: Number(u.public_metrics && u.public_metrics.tweet_count) || 0 };
    }
    var esVideo = (m) => m && m.tipo === "video";
    var texto = (post) => [post.copy, post.hashtags].filter(Boolean).join("\n\n").trim();
    async function publicar(red, s, token, cuenta, post, medio, f = fetch) {
      const caption = texto(post);
      if (red === "Instagram") {
        if (!medio) throw err("Instagram necesita una foto o un video en la publicaci\xF3n.");
        const p = { caption, access_token: token.access };
        if (esVideo(medio)) Object.assign(p, { media_type: post.formato === "Story" ? "STORIES" : "REELS", video_url: medio.url });
        else Object.assign(p, { image_url: medio.url }, post.formato === "Story" ? { media_type: "STORIES" } : {});
        const { j: j2 } = await pedir(f, `${igHost(token)}/${v(s)}/${cuenta.cuenta_ext}/media`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form(p) }, "Instagram");
        return revisar("Instagram", s, token, cuenta, { tipo: "contenedor", id: j2.id }, f);
      }
      if (red === "Facebook") {
        let j2;
        if (!medio) ({ j: j2 } = await pedir(f, `${API.fb}/${v(s)}/${cuenta.cuenta_ext}/feed`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ message: caption, link: post.enlace_destino || void 0, access_token: token.access }) }, "Facebook"));
        else if (esVideo(medio)) ({ j: j2 } = await pedir(f, `${API.fb}/${v(s)}/${cuenta.cuenta_ext}/videos`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ file_url: medio.url, description: caption, title: post.titulo, access_token: token.access }) }, "Facebook"));
        else ({ j: j2 } = await pedir(f, `${API.fb}/${v(s)}/${cuenta.cuenta_ext}/photos`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ url: medio.url, caption, published: "true", access_token: token.access }) }, "Facebook"));
        const id = String(j2.post_id || j2.id);
        let enlace = `https://www.facebook.com/${id}`;
        try {
          const { j: d } = await pedir(f, `${API.fb}/${v(s)}/${id}?${form({ fields: "permalink_url", access_token: token.access })}`, {}, "Facebook");
          if (d.permalink_url) enlace = d.permalink_url;
        } catch (e) {
        }
        return { estado: "Publicado", id, enlace, privado: false };
      }
      if (red === "TikTok") {
        if (!esVideo(medio)) throw err("TikTok: por ahora solo se publican videos desde Delirium OS.");
        const auth2 = { Authorization: `Bearer ${token.access}`, "Content-Type": "application/json; charset=UTF-8" };
        const { j: ci } = await pedir(f, `${API.tt}/v2/post/publish/creator_info/query/`, { method: "POST", headers: auth2, body: "{}" }, "TikTok");
        const opciones = ci.data && ci.data.privacy_level_options || [];
        const publico = s.tiktok_auditada && opciones.includes("PUBLIC_TO_EVERYONE");
        const bytes = await medio.bajar();
        const tam = bytes.length;
        const trozo = tam <= 64 * 1024 * 1024 ? tam : 10 * 1024 * 1024;
        const partes = Math.max(1, Math.floor(tam / trozo));
        const { j: ini } = await pedir(f, `${API.tt}/v2/post/publish/video/init/`, { method: "POST", headers: auth2, body: JSON.stringify({ post_info: { title: caption.slice(0, 2200), privacy_level: publico ? "PUBLIC_TO_EVERYONE" : "SELF_ONLY", disable_comment: false, disable_duet: false, disable_stitch: false }, source_info: { source: "FILE_UPLOAD", video_size: tam, chunk_size: trozo, total_chunk_count: partes } }) }, "TikTok");
        const { publish_id, upload_url } = ini.data || {};
        for (let i = 0; i < partes; i++) {
          const desde = i * trozo;
          const hasta = i === partes - 1 ? tam : desde + trozo;
          const r = await f(upload_url, { method: "PUT", headers: { "Content-Type": "video/mp4", "Content-Length": String(hasta - desde), "Content-Range": `bytes ${desde}-${hasta - 1}/${tam}` }, body: bytes.subarray(desde, hasta) });
          if (!r.ok && r.status !== 206) throw err(`TikTok no acept\xF3 el video (${r.status}).`, "RED");
        }
        return { ...await revisar("TikTok", s, token, cuenta, { tipo: "tiktok", id: publish_id }, f), privado: !publico };
      }
      if (red === "YouTube") {
        if (!esVideo(medio)) throw err("YouTube necesita un video en la publicaci\xF3n.");
        const bytes = await medio.bajar();
        const privado = !s.youtube_auditada;
        const meta = { snippet: { title: (post.titulo || "Video").slice(0, 100), description: caption.slice(0, 5e3), categoryId: "22", tags: String(post.hashtags || "").split(/[\s,]+/).map((t) => t.replace(/^#/, "")).filter(Boolean).slice(0, 15) }, status: { privacyStatus: privado ? "private" : "public", selfDeclaredMadeForKids: false } };
        const { r } = await pedir(f, `${API.yt}/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status`, { method: "POST", headers: { Authorization: `Bearer ${token.access}`, "Content-Type": "application/json; charset=UTF-8", "X-Upload-Content-Length": String(bytes.length), "X-Upload-Content-Type": "video/*" }, body: JSON.stringify(meta) }, "YouTube");
        const destino = r.headers.get("location");
        if (!destino) throw err("YouTube no abri\xF3 la subida.", "RED");
        const { j: j2 } = await pedir(f, destino, { method: "PUT", headers: { Authorization: `Bearer ${token.access}`, "Content-Type": "video/*" }, body: bytes }, "YouTube");
        return { estado: "Publicado", id: j2.id, enlace: `https://www.youtube.com/watch?v=${j2.id}`, privado };
      }
      const auth = { Authorization: `Bearer ${token.access}` };
      let media_ids;
      if (medio && !esVideo(medio)) {
        const bytes = await medio.bajar();
        const fd = new FormData();
        fd.append("media", new Blob([bytes]), medio.nombre || "imagen.jpg");
        fd.append("media_category", "tweet_image");
        const { j: j2 } = await pedir(f, `${API.x}/2/media/upload`, { method: "POST", headers: auth, body: fd }, "X");
        media_ids = [String(j2.data && j2.data.id || j2.media_id_string)];
      }
      const { j } = await pedir(f, `${API.x}/2/tweets`, { method: "POST", headers: { ...auth, "Content-Type": "application/json" }, body: JSON.stringify({ text: caption.slice(0, 280) || post.titulo, ...media_ids ? { media: { media_ids } } : {} }) }, "X");
      return { estado: "Publicado", id: j.data.id, enlace: `https://x.com/i/status/${j.data.id}`, privado: false };
    }
    async function revisar(red, s, token, cuenta, pendiente, f = fetch) {
      if (pendiente.tipo === "contenedor") {
        const { j } = await pedir(f, `${igHost(token)}/${v(s)}/${pendiente.id}?${form({ fields: "status_code,status", access_token: token.access })}`, {}, "Instagram");
        if (j.status_code === "ERROR" || j.status_code === "EXPIRED") throw err(`Instagram rechaz\xF3 el archivo: ${j.status || j.status_code}. Revisa formato y duraci\xF3n.`);
        if (j.status_code !== "FINISHED") return { estado: "Procesando", pendiente };
        const { j: pub } = await pedir(f, `${igHost(token)}/${v(s)}/${cuenta.cuenta_ext}/media_publish`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ creation_id: pendiente.id, access_token: token.access }) }, "Instagram");
        let enlace = cuenta.enlace_perfil || "";
        try {
          const { j: d } = await pedir(f, `${igHost(token)}/${v(s)}/${pub.id}?${form({ fields: "permalink", access_token: token.access })}`, {}, "Instagram");
          if (d.permalink) enlace = d.permalink;
        } catch (e) {
        }
        return { estado: "Publicado", id: String(pub.id), enlace, privado: false };
      }
      if (pendiente.tipo === "tiktok") {
        const { j } = await pedir(f, `${API.tt}/v2/post/publish/status/fetch/`, { method: "POST", headers: { Authorization: `Bearer ${token.access}`, "Content-Type": "application/json; charset=UTF-8" }, body: JSON.stringify({ publish_id: pendiente.id }) }, "TikTok");
        const d = j.data || {};
        if (d.status === "FAILED") throw err(`TikTok no public\xF3 el video: ${d.fail_reason || "motivo desconocido"}.`);
        if (d.status !== "PUBLISH_COMPLETE") return { estado: "Procesando", pendiente };
        const vid = (d.publicaly_available_post_id || d.publicly_available_post_id || [])[0];
        return { estado: "Publicado", id: vid ? String(vid) : pendiente.id, enlace: vid && cuenta.enlace_perfil ? `${cuenta.enlace_perfil}/video/${vid}` : cuenta.enlace_perfil || "", privado: !vid };
      }
      return { estado: "Publicado" };
    }
    async function metricas(red, s, token, pub, f = fetch) {
      const sum = (o) => ({ ...o, interacciones: (o.me_gusta || 0) + (o.comentarios || 0) + (o.compartidos || 0) + (o.guardados || 0) });
      if (red === "Instagram") {
        const out = {};
        const pedirIns = async (lista) => {
          const { j: j2 } = await pedir(f, `${igHost(token)}/${v(s)}/${pub.id}/insights?${form({ metric: lista, access_token: token.access })}`, {}, "Instagram");
          for (const m2 of j2.data || []) out[m2.name] = Number((m2.values && m2.values[0] && m2.values[0].value) ?? (m2.total_value && m2.total_value.value)) || 0;
        };
        try {
          await pedirIns("reach,likes,comments,shares,saved,views");
        } catch (e) {
          await pedirIns("reach,likes,comments,saved");
        }
        return sum({ alcance: out.reach || 0, vistas: out.views || 0, me_gusta: out.likes || 0, comentarios: out.comments || 0, compartidos: out.shares || 0, guardados: out.saved || 0 });
      }
      if (red === "Facebook") {
        const { j: j2 } = await pedir(f, `${API.fb}/${v(s)}/${pub.id}?${form({ fields: "shares,reactions.summary(total_count).limit(0),comments.summary(total_count).limit(0)", access_token: token.access })}`, {}, "Facebook");
        let alcance = 0;
        try {
          const { j: ins } = await pedir(f, `${API.fb}/${v(s)}/${pub.id}/insights?${form({ metric: "post_impressions_unique", access_token: token.access })}`, {}, "Facebook");
          alcance = Number(ins.data && ins.data[0] && ins.data[0].values && ins.data[0].values[0].value) || 0;
        } catch (e) {
        }
        return sum({ alcance, me_gusta: Number(j2.reactions && j2.reactions.summary && j2.reactions.summary.total_count) || 0, comentarios: Number(j2.comments && j2.comments.summary && j2.comments.summary.total_count) || 0, compartidos: Number(j2.shares && j2.shares.count) || 0 });
      }
      if (red === "TikTok") {
        if (!/^\d+$/.test(String(pub.id))) return null;
        const { j: j2 } = await pedir(f, `${API.tt}/v2/video/query/?fields=id,view_count,like_count,comment_count,share_count`, { method: "POST", headers: { Authorization: `Bearer ${token.access}`, "Content-Type": "application/json" }, body: JSON.stringify({ filters: { video_ids: [String(pub.id)] } }) }, "TikTok");
        const x = (j2.data && j2.data.videos || [])[0];
        if (!x) return null;
        return sum({ vistas: x.view_count || 0, alcance: x.view_count || 0, me_gusta: x.like_count || 0, comentarios: x.comment_count || 0, compartidos: x.share_count || 0 });
      }
      if (red === "YouTube") {
        const { j: j2 } = await pedir(f, `${API.yt}/youtube/v3/videos?part=statistics&id=${encodeURIComponent(pub.id)}`, { headers: { Authorization: `Bearer ${token.access}` } }, "YouTube");
        const st = ((j2.items || [])[0] || {}).statistics || {};
        return sum({ vistas: Number(st.viewCount) || 0, alcance: Number(st.viewCount) || 0, me_gusta: Number(st.likeCount) || 0, comentarios: Number(st.commentCount) || 0 });
      }
      const { j } = await pedir(f, `${API.x}/2/tweets/${pub.id}?tweet.fields=public_metrics`, { headers: { Authorization: `Bearer ${token.access}` } }, "X");
      const m = j.data && j.data.public_metrics || {};
      return sum({ vistas: m.impression_count || 0, alcance: m.impression_count || 0, me_gusta: m.like_count || 0, comentarios: m.reply_count || 0, compartidos: (m.retweet_count || 0) + (m.quote_count || 0), guardados: m.bookmark_count || 0 });
    }
    module.exports = { REDES, urlAutorizar, canjear, renovar, perfil, publicar, revisar, metricas, verificadorDe, retoDe, API };
  }
});

// server/servidor.js
var require_servidor = __commonJS({
  "server/servidor.js"(exports, module) {
    var crypto = (init_shim_crypto(), __toCommonJS(shim_crypto_exports));
    var { Buffer: Buffer2 } = (init_shim_buffer(), __toCommonJS(shim_buffer_exports));
    var { Core, COLLECTIONS } = require_core();
    var I = require_integraciones();
    var X = require_externos();
    var R = require_redes();
    var METODOS = [
      "hasUsers",
      "demoAccounts",
      "setup",
      "login",
      "logout",
      "me",
      "changeOwnPassword",
      "setTheme",
      "meta",
      "list",
      "get",
      "save",
      "remove",
      "action",
      "directory",
      "options",
      "dashboard",
      "calendar",
      "report",
      "search",
      "auditList",
      "settings",
      "exportData",
      "reportarError",
      "reporteCliente"
    ];
    var SOLO_LECTURA = /* @__PURE__ */ new Set(["reporteCliente", "metricasJuego", "hasUsers", "demoAccounts", "me", "meta", "list", "get", "directory", "options", "dashboard", "calendar", "report", "search", "auditList", "settings", "ping", "urlArchivo", "exportData"]);
    var META_KEYS = ["settings", "counters", "meta"];
    var TOPICO = "delirium-os";
    function crearServidor2({ url, clave: clave2, secreto, fetchImpl = fetch }) {
      url = String(url || "").replace(/\/$/, "");
      const firmaSecreta = crypto.createHash("sha256").update("delirium-os|" + (secreto || clave2)).digest();
      const h = (extra = {}) => ({ apikey: clave2, ...String(clave2).startsWith("eyJ") ? { Authorization: `Bearer ${clave2}` } : {}, ...extra });
      let cache = null;
      const limites = /* @__PURE__ */ new Map();
      const limitar = (k, max, ms) => {
        const t = Date.now();
        const l = (limites.get(k) || []).filter((x) => t - x < ms);
        l.push(t);
        limites.set(k, l);
        return l.length <= max;
      };
      async function rest(ruta, opts = {}) {
        const r = await fetchImpl(`${url}/rest/v1/${ruta}`, { ...opts, headers: h({ "Content-Type": "application/json", ...opts.headers || {} }) });
        if (!r.ok) {
          const t = await r.text().catch(() => "");
          throw new Error(`Base de datos (${r.status}): ${t.slice(0, 200)}`);
        }
        return r;
      }
      async function leerVersion() {
        const r = await rest("dos_meta?select=valor&clave=eq.version");
        const j = await r.json();
        return j.length ? j[0].valor : null;
      }
      async function cargarTodo() {
        const db = {};
        for (const c of COLLECTIONS) db[c] = [];
        const paso = 1e3;
        for (let desde = 0; ; desde += paso) {
          const r = await rest(`dos_registros?select=col,id,data&order=col.asc,id.asc`, { headers: { "Range-Unit": "items", Range: `${desde}-${desde + paso - 1}` } });
          const filas = await r.json();
          for (const f of filas) if (db[f.col]) db[f.col].push(f.data);
          if (filas.length < paso) break;
        }
        const meta = await (await rest("dos_meta?select=clave,valor")).json();
        for (const m of meta) if (META_KEYS.includes(m.clave)) db[m.clave] = m.valor;
        for (const c of COLLECTIONS) if (c === "audit") db[c].sort((a, b) => a.fecha < b.fecha ? 1 : -1);
        else db[c].sort((a, b) => a.creado < b.creado ? 1 : a.creado > b.creado ? -1 : 0);
        return db;
      }
      async function obtenerDb() {
        const v = await leerVersion();
        if (cache && cache.version === v) return cache.db;
        cache = { version: v, db: await cargarTodo() };
        return cache.db;
      }
      const foto = (db) => {
        const m = /* @__PURE__ */ new Map();
        for (const c of COLLECTIONS) for (const r of db[c] || []) m.set(c + "\0" + r.id, JSON.stringify(r));
        for (const k of META_KEYS) m.set("#" + k, JSON.stringify(db[k] || null));
        return m;
      };
      async function guardarCambios(db, antes) {
        const altas = [];
        const vistos = /* @__PURE__ */ new Set();
        const metas = [];
        for (const c of COLLECTIONS) for (const r of db[c] || []) {
          const k = c + "\0" + r.id;
          vistos.add(k);
          const j = JSON.stringify(r);
          if (antes.get(k) !== j) altas.push({ col: c, id: r.id, data: r, actualizado: (/* @__PURE__ */ new Date()).toISOString() });
        }
        for (const k of META_KEYS) if (antes.get("#" + k) !== JSON.stringify(db[k] || null)) metas.push({ clave: k, valor: db[k] });
        const bajas = {};
        for (const k of antes.keys()) if (!k.startsWith("#") && !vistos.has(k)) {
          const [c, id] = k.split("\0");
          (bajas[c] = bajas[c] || []).push(id);
        }
        const cols = /* @__PURE__ */ new Set([...altas.map((a) => a.col), ...Object.keys(bajas)]);
        if (!altas.length && !metas.length && !cols.size) return null;
        for (let i = 0; i < altas.length; i += 400) await rest("dos_registros?on_conflict=col,id", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(altas.slice(i, i + 400)) });
        for (const [c, ids] of Object.entries(bajas)) for (let i = 0; i < ids.length; i += 100) await rest(`dos_registros?col=eq.${encodeURIComponent(c)}&id=in.(${ids.slice(i, i + 100).map((x) => `"${String(x).replace(/"/g, "")}"`).join(",")})`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
        const version = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
        metas.push({ clave: "version", valor: version });
        await rest("dos_meta?on_conflict=clave", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(metas.map((m) => ({ ...m, actualizado: (/* @__PURE__ */ new Date()).toISOString() }))) });
        cache = { version, db };
        const modulos = [...cols];
        try {
          await fetchImpl(`${url}/realtime/v1/api/broadcast`, { method: "POST", headers: h({ "Content-Type": "application/json" }), body: JSON.stringify({ messages: [{ topic: TOPICO, event: "cambio", payload: { cols: modulos, version } }] }) });
        } catch (e) {
        }
        return modulos;
      }
      const b64 = (b) => Buffer2.from(b).toString("base64url");
      const firmar = (uid) => {
        const exp = Date.now() + 30 * 864e5;
        const base = `${uid}.${exp}`;
        return `${b64(base)}.${crypto.createHmac("sha256", firmaSecreta).update(base).digest("base64url")}`;
      };
      function leerToken(tok, db) {
        if (!tok) return null;
        const [p, s] = String(tok).split(".");
        if (!p || !s) return null;
        const base = Buffer2.from(p, "base64url").toString();
        const esperado = crypto.createHmac("sha256", firmaSecreta).update(base).digest("base64url");
        if (esperado.length !== s.length || !crypto.timingSafeEqual(Buffer2.from(esperado), Buffer2.from(s))) return null;
        const [uid, exp] = base.split(".");
        if (Number(exp) < Date.now()) return null;
        const u = db.users.find((x) => x.id === uid);
        return u && u.activo ? u : null;
      }
      const rutaSegura = (r) => String(r || "").replace(/\.\./g, "").replace(/^\/+/, "").split("/").map(encodeURIComponent).join("/");
      async function firmarSubida(ruta) {
        const r = await fetchImpl(`${url}/storage/v1/object/upload/sign/archivos/${rutaSegura(ruta)}`, { method: "POST", headers: h({ "Content-Type": "application/json" }), body: "{}" });
        if (!r.ok) throw new Error(`No se pudo preparar la subida (${r.status}).`);
        const j = await r.json();
        return `${url}/storage/v1${j.url}`;
      }
      async function firmarDescarga(ruta, segundos = 600) {
        const r = await fetchImpl(`${url}/storage/v1/object/sign/archivos/${rutaSegura(ruta)}`, { method: "POST", headers: h({ "Content-Type": "application/json" }), body: JSON.stringify({ expiresIn: segundos }) });
        if (!r.ok) throw new Error("No encontramos el archivo en la nube.");
        const j = await r.json();
        return `${url}/storage/v1${j.signedURL || j.signedUrl}`;
      }
      const firmadas = /* @__PURE__ */ new Map();
      async function imagenPublica(ruta) {
        const c = firmadas.get(ruta);
        if (c && c.hasta > Date.now()) return c.url;
        const r = await fetchImpl(`${url}/storage/v1/object/sign/archivos/${rutaSegura(ruta)}`, { method: "POST", headers: h({ "Content-Type": "application/json" }), body: JSON.stringify({ expiresIn: 86400 }) });
        if (!r.ok) throw new Error("sin imagen");
        const j = await r.json();
        const u = `${url}/storage/v1${j.signedURL || j.signedUrl}`;
        firmadas.set(ruta, { url: u, hasta: Date.now() + 12 * 3600 * 1e3 });
        return u;
      }
      const responder = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type, apikey, authorization", "Access-Control-Allow-Methods": "POST, OPTIONS" } });
      const vuelta = () => `${url}/functions/v1/delirium/oauth/vuelta`;
      const firmarEstado = (o) => {
        const base = b64(JSON.stringify(o));
        return `${base}.${crypto.createHmac("sha256", firmaSecreta).update("oauth|" + base).digest("base64url")}`;
      };
      function leerEstado(e) {
        const [base, sig] = String(e || "").split(".");
        if (!base || !sig) return null;
        const ok = crypto.createHmac("sha256", firmaSecreta).update("oauth|" + base).digest("base64url");
        if (ok.length !== sig.length || !crypto.timingSafeEqual(Buffer2.from(ok), Buffer2.from(sig))) return null;
        try {
          const o = JSON.parse(Buffer2.from(base, "base64url").toString());
          return o.e > Date.now() ? o : null;
        } catch (x) {
          return null;
        }
      }
      const secretoPkce = () => firmaSecreta.toString("hex");
      const ir = (destino) => new Response(null, { status: 302, headers: { Location: destino, "Cache-Control": "no-store" } });
      const pagina = (s, q) => `${String(s.web_publica || "https://delirium-studios.github.io").replace(/\/$/, "")}/conectado.html?${new URLSearchParams(q)}`;
      async function oauthInicio(u) {
        const db = await obtenerDb();
        const s = db.settings;
        const st = leerEstado(u.searchParams.get("s"));
        if (!st) return ir(pagina(s, { error: "El enlace venci\xF3 o no es v\xE1lido. Pide uno nuevo a Delirium." }));
        const c = db.socials.find((x) => x.id === st.c);
        if (!c) return ir(pagina(s, { error: "Esta conexi\xF3n ya no existe en Delirium OS." }));
        try {
          return ir(R.urlAutorizar(c.red, s, { redirect: vuelta(), estado: u.searchParams.get("s"), secreto: secretoPkce() }));
        } catch (e) {
          return ir(pagina(s, { error: e.message, red: c.red }));
        }
      }
      async function oauthVuelta(u) {
        const db = await obtenerDb();
        const s = db.settings;
        const estado = u.searchParams.get("state");
        const st = leerEstado(estado);
        if (!st) return ir(pagina(s, { error: "La autorizaci\xF3n venci\xF3. Vuelve a abrir el enlace de conexi\xF3n." }));
        const c = db.socials.find((x) => x.id === st.c);
        if (!c) return ir(pagina(s, { error: "Esta conexi\xF3n ya no existe en Delirium OS." }));
        const negado = u.searchParams.get("error_description") || u.searchParams.get("error_reason") || u.searchParams.get("error");
        if (negado || !u.searchParams.get("code")) return ir(pagina(s, { error: `No se dio el permiso${negado ? ": " + String(negado).slice(0, 150) : "."}`, red: c.red }));
        const core = new Core(null, { db });
        const antes = foto(db);
        let fin;
        try {
          const { token, cuenta } = await R.canjear(c.red, s, { code: u.searchParams.get("code"), redirect: vuelta(), estado, secreto: secretoPkce() }, fetchImpl);
          const r = core.redesConectar(c.id, cuenta, token);
          fin = pagina(s, { ok: "1", red: c.red, nombre: r.nombre || "", paginas: r.paginas ? String(r.paginas.length) : "" });
        } catch (e) {
          core.redesFallo(c.id, e);
          fin = pagina(s, { error: e.message, red: c.red });
        }
        await guardarCambios(db, antes);
        await avisar(core, db);
        return ir(fin);
      }
      const VIDEO = /\.(mp4|mov|m4v|webm|avi|mkv)$/i;
      async function medioDe(post) {
        let enlace, nombre;
        if (post.medio && post.medio.ruta) {
          enlace = await firmarDescarga(post.medio.ruta, 7200);
          nombre = post.medio.nombre || post.medio.ruta;
        } else if (post.medio_url && /^https:\/\//.test(post.medio_url)) {
          enlace = post.medio_url;
          nombre = post.medio_url.split("?")[0];
        } else return null;
        return { url: enlace, nombre, tipo: VIDEO.test(nombre) ? "video" : "imagen", bajar: async () => {
          const r = await fetchImpl(enlace);
          if (!r.ok) throw new Error("No se pudo leer el archivo de la publicaci\xF3n.");
          return new Uint8Array(await r.arrayBuffer());
        } };
      }
      async function tokenListo(db, cuenta) {
        const t = db.social_tokens.find((x) => x.id === cuenta.id);
        if (!t || !t.access) throw Object.assign(new Error(`${cuenta.red}: la cuenta no est\xE1 conectada.`), { code: "VENCIDO" });
        const nuevo = await R.renovar(cuenta.red, db.settings, t, fetchImpl);
        if (nuevo) {
          Object.assign(t, nuevo, { actualizado: (/* @__PURE__ */ new Date()).toISOString() });
          if (cuenta.red === "Instagram" && nuevo.expira) cuenta.vence = new Date(nuevo.expira).toISOString();
        }
        return t;
      }
      async function tareasRedes(core, db, { postId = null, metricas = false, limite = 6 } = {}) {
        const s = db.settings;
        const res = { publicadas: 0, procesando: 0, errores: [], metricas: 0, cuentas: 0 };
        for (const post of db.posts) for (const pub of (post.publicaciones || []).filter((x) => x.estado === "Procesando" && x.pendiente)) {
          if (postId && post.id !== postId) continue;
          const cuenta = db.socials.find((x) => x.id === pub.cuenta_id);
          if (!cuenta) continue;
          try {
            const t = await tokenListo(db, cuenta);
            const r = await R.revisar(pub.red, s, t, cuenta, pub.pendiente, fetchImpl);
            core.redesResultado(post, pub.red, cuenta, r);
            if (r.estado === "Publicado") res.publicadas++;
            else res.procesando++;
          } catch (e) {
            core.redesResultado(post, pub.red, cuenta, null, e);
            res.errores.push(`${post.titulo} \xB7 ${pub.red}: ${e.message}`);
          }
        }
        for (const { post, red, cuenta } of core.redesPorPublicar(Date.now(), postId).slice(0, limite)) {
          if (!cuenta) {
            core.redesResultado(post, red, null, null, new Error(`${core.nameOf("clients", post.client_id)} no tiene ${red} conectado en Redes conectadas.`));
            res.errores.push(`${post.titulo} \xB7 ${red}: sin cuenta conectada`);
            continue;
          }
          try {
            const t = await tokenListo(db, cuenta);
            const medio = await medioDe(post);
            const r = await R.publicar(red, s, t, cuenta, post, medio, fetchImpl);
            core.redesResultado(post, red, cuenta, r);
            if (r.estado === "Publicado") res.publicadas++;
            else res.procesando++;
          } catch (e) {
            if (e.code === "VENCIDO") core.redesFallo(cuenta.id, e);
            core.redesResultado(post, red, cuenta, null, e);
            res.errores.push(`${post.titulo} \xB7 ${red}: ${e.message}`);
          }
        }
        const ultima = Date.parse(s.redes_ultima_sync || 0) || 0;
        if (metricas || Date.now() - ultima > 6 * 3600 * 1e3) {
          s.redes_ultima_sync = (/* @__PURE__ */ new Date()).toISOString();
          const hace30 = Date.now() - 30 * 864e5;
          for (const cuenta of db.socials.filter((x) => x.estado === "Conectada")) {
            try {
              const t = await tokenListo(db, cuenta);
              const p = await R.perfil(cuenta.red, s, t, fetchImpl, cuenta.cuenta_ext);
              core.redesSeguidores(cuenta, p.seguidores);
              if (p.publicaciones_total !== void 0) cuenta.publicaciones_total = p.publicaciones_total;
              cuenta.ultimo_error = "";
              res.cuentas++;
            } catch (e) {
              core.redesFallo(cuenta.id, e);
              res.errores.push(`${cuenta.red} ${cuenta.nombre}: ${e.message}`);
            }
          }
          for (const post of db.posts.filter((x) => Date.parse(x.publicado_el || x.fecha || 0) > hace30)) for (const pub of (post.publicaciones || []).filter((x) => x.estado === "Publicado" && x.id)) {
            const cuenta = db.socials.find((x) => x.id === pub.cuenta_id && x.estado === "Conectada");
            if (!cuenta) continue;
            try {
              const t = await tokenListo(db, cuenta);
              const m = await R.metricas(pub.red, s, t, pub, fetchImpl);
              if (m) {
                core.redesMetricas(post, pub.red, m);
                res.metricas++;
              }
            } catch (e) {
              if (e.code === "VENCIDO") core.redesFallo(cuenta.id, e);
            }
          }
        }
        return res;
      }
      async function avisar(core, db) {
        const ev = core.takeEvents();
        if (ev.length) await I.enviarDiscord(db.settings, ev, fetchImpl).catch(() => 0);
      }
      async function api(body) {
        const metodo = String(body.metodo || "");
        const args = Array.isArray(body.args) ? body.args : [];
        const db = await obtenerDb();
        if (metodo === "ping") return { data: { nube: true, version: cache.version, usuarios: db.users.length > 0 } };
        if (metodo === "importInicial") {
          if (db.users.length) return { error: "La nube ya tiene datos. Con\xE9ctate con tu usuario en vez de subir otra copia.", code: "INPUT" };
          let nuevo;
          try {
            nuevo = JSON.parse(args[0]);
          } catch (e) {
            return { error: "La copia no es v\xE1lida.", code: "INPUT" };
          }
          if (!nuevo || !Array.isArray(nuevo.users) || !nuevo.users.length) return { error: "La copia no tiene usuarios.", code: "INPUT" };
          const antes2 = foto(db);
          const core2 = new Core(null, { db: nuevo });
          await guardarCambios(core2.db, antes2);
          const quien = core2.db.users.find((u) => u.id === args[1] && ["founder", "coo"].includes(u.rol));
          return { data: { ok: true, registros: COLLECTIONS.reduce((a, c) => a + core2.db[c].length, 0), token: quien ? firmar(quien.id) : null } };
        }
        const core = new Core(null, { db });
        core.user = leerToken(body.token, db);
        const antes = SOLO_LECTURA.has(metodo) ? null : foto(db);
        let data, token;
        try {
          if (metodo === "subirArchivo") {
            if (!core.user) throw Object.assign(new Error("Tu sesi\xF3n termin\xF3."), { code: "ACCESS" });
            const ruta = `${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}-${crypto.randomUUID().slice(0, 8)}-${String(args[0] || "archivo").replace(/[^\w.\- ()]/g, "_").slice(0, 120)}`;
            data = { ruta, url: await firmarSubida(ruta) };
          } else if (metodo === "subirArchivoExistente") {
            if (!core.isAdmin()) throw Object.assign(new Error("Solo Direcci\xF3n."), { code: "ACCESS" });
            data = { url: await firmarSubida(args[0]) };
          } else if (metodo === "urlArchivo") {
            if (!core.archivoPermitido(args[0])) throw Object.assign(new Error("No tienes acceso a este archivo."), { code: "ACCESS" });
            data = { url: await firmarDescarga(args[0]) };
          } else if (metodo === "metricasJuego") {
            const g = core.rawScoped("juegos", args[0]);
            const dias = Math.max(7, Math.min(90, Number(args[1]) || 30));
            const r = await rest("rpc/dos_resumen_juego", { method: "POST", body: JSON.stringify({ p_juego: g.id, p_dias: dias }) });
            data = await r.json();
          } else if (metodo === "enlaceConexion") {
            core.requireUser();
            const c = core.action("cuenta.preparar", args[0] || {});
            const est = firmarEstado({ c: c.id, r: c.red, u: core.user.id, e: Date.now() + 7 * 864e5, n: crypto.randomBytes(6).toString("hex") });
            data = { url: `${url}/functions/v1/delirium/oauth/conectar?s=${est}`, cuenta: c, vuelta: vuelta() };
          } else if (metodo === "publicarAhora") {
            const post = core.rawScoped("redes", args[0]);
            if (!core.canWrite("redes") || core.isClient()) throw Object.assign(new Error("Tu rol no puede publicar."), { code: "ACCESS" });
            if (!(post.redes || []).length) throw Object.assign(new Error("Marca en qu\xE9 redes se publica."), { code: "INPUT" });
            const r = await tareasRedes(core, db, { postId: post.id, limite: 6 });
            data = { ...r, post: core.get("redes", post.id) };
          } else if (metodo === "sincronizarRedes") {
            core.requireUser();
            if (!core.canWrite("cuentas") || core.isClient()) throw Object.assign(new Error("Tu rol no puede actualizar las redes."), { code: "ACCESS" });
            data = await tareasRedes(core, db, { metricas: true, limite: 0 });
          } else if (metodo === "datosRedes") {
            if (!core.isAdmin()) throw Object.assign(new Error("Solo Direcci\xF3n."), { code: "ACCESS" });
            data = { vuelta: vuelta(), tareas: `${url}/functions/v1/delirium/tareas`, cron: db.settings.cron_secreto };
          } else if (metodo === "sincronizarMeta") {
            core.requireUser();
            data = await X.sincronizarMeta(core, args[0] || {}, fetchImpl);
          } else if (metodo === "leerDiscord") {
            core.requireUser();
            data = await X.leerDiscord(core, fetchImpl);
          } else if (metodo === "probarDiscord") {
            core.requireUser();
            data = await X.probarDiscord(core, fetchImpl);
          } else if (METODOS.includes(metodo)) {
            if (metodo === "reportarError") {
              if (!core.user) throw Object.assign(new Error("Sin sesi\xF3n."), { code: "ACCESS" });
            }
            data = core[metodo](...args);
            if ((metodo === "login" || metodo === "setup") && core.user) token = firmar(core.user.id);
            if (metodo === "logout") data = true;
          } else return { error: "Operaci\xF3n no permitida.", code: "ACCESS" };
        } catch (err) {
          if (antes) {
            cache = null;
          }
          if (antes && metodo === "login" && err.code === "ACCESS") {
            try {
              await guardarCambios(db, antes);
            } catch (e) {
            }
          }
          return { error: err.code ? err.message : "Algo sali\xF3 mal en el servidor. Intenta de nuevo.", code: err.code || "ERROR", detail: err.code ? void 0 : String(err && err.message) };
        }
        if (antes) {
          await guardarCambios(db, antes);
          await avisar(core, db);
        }
        return { data, token };
      }
      return async function manejar(req) {
        if (req.method === "OPTIONS") return responder({ ok: true });
        if (req.method === "GET") {
          const u = new URL(req.url);
          const rg = u.pathname.replace(/\/$/, "");
          try {
            if (rg.endsWith("/oauth/conectar")) return await oauthInicio(u);
            if (rg.endsWith("/oauth/vuelta")) return await oauthVuelta(u);
          } catch (e) {
            cache = null;
            return ir(pagina({}, { error: "Algo sali\xF3 mal al conectar. Intenta de nuevo." }));
          }
          return responder({ ok: true, servicio: "Delirium OS" });
        }
        if (req.method !== "POST") return responder({ error: "Delirium OS \xB7 usa POST." }, 405);
        const ruta = new URL(req.url).pathname.replace(/\/$/, "");
        let body = {};
        try {
          body = await req.json();
        } catch (e) {
          return responder({ error: "Cuerpo inv\xE1lido." }, 400);
        }
        try {
          if (ruta.endsWith("/reportar")) {
            const db = await obtenerDb();
            const core = new Core(null, { db });
            const g = core.gameByKey(body.clave || req.headers.get("x-delirium-clave"));
            if (!g) return responder({ error: "Clave de reportes inv\xE1lida." }, 401);
            if (!limitar("r:" + g.id, 120, 6e4)) return responder({ error: "Demasiados reportes por minuto." }, 429);
            const antes = foto(db);
            const r = core.ingestCrash(body, { gameId: g.id });
            await guardarCambios(db, antes);
            await avisar(core, db);
            return responder({ ok: true, id: r.id, nuevo: r.nuevo });
          }
          if (ruta.endsWith("/evento") || ruta.endsWith("/eventos")) {
            const db = await obtenerDb();
            const core = new Core(null, { db });
            const g = core.gameByKey(body.clave || req.headers.get("x-delirium-clave"));
            if (!g) return responder({ error: "Clave inv\xE1lida." }, 401);
            if (!limitar("e:" + g.id, 600, 6e4)) return responder({ error: "Demasiados eventos por minuto." }, 429);
            const lista = (Array.isArray(body.eventos) ? body.eventos : [body]).slice(0, 100);
            const hoy = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
            const filas = [];
            for (const e of lista) {
              const dia = /^\d{4}-\d{2}-\d{2}$/.test(String(e.dia || "")) && e.dia <= hoy ? e.dia : hoy;
              const jugador = String(e.jugador || body.jugador || "").replace(/[^\w-]/g, "").slice(0, 64);
              Core.claveEvento(e).forEach(([clave3, valor], i) => filas.push({ dia, jugador: i === 0 ? jugador : "", clave: clave3, valor }));
            }
            if (filas.length) await rest("rpc/dos_registrar_eventos", { method: "POST", body: JSON.stringify({ p_juego: g.id, p_eventos: filas }) });
            return responder({ ok: true, recibidos: lista.length });
          }
          if (ruta.endsWith("/tareas")) {
            const db = await obtenerDb();
            const dado = String(req.headers.get("x-delirium-cron") || "");
            const esp = String(db.settings.cron_secreto || "");
            if (!esp || dado.length !== esp.length || !crypto.timingSafeEqual(Buffer2.from(dado), Buffer2.from(esp))) return responder({ error: "No autorizado." }, 401);
            if (!limitar("cron", 30, 6e4)) return responder({ error: "Demasiado seguido." }, 429);
            const core = new Core(null, { db });
            const antes = foto(db);
            let r;
            try {
              r = await tareasRedes(core, db);
            } catch (e) {
              r = { error: e.message };
            }
            await guardarCambios(db, antes);
            await avisar(core, db);
            return responder({ ok: true, ...r });
          }
          if (ruta.endsWith("/tienda")) {
            const db = await obtenerDb();
            const core = new Core(null, { db });
            if (body.accion === "pedido") {
              if (body.website) return responder({ ok: true });
              const ip = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "x";
              if (!limitar("t:" + ip, 10, 36e5)) return responder({ error: "Recibimos varios pedidos desde tu conexi\xF3n. Escr\xEDbenos por redes para continuar." }, 429);
              const antes = foto(db);
              let r;
              try {
                r = core.tiendaPedido(body);
              } catch (e) {
                cache = null;
                return responder({ error: e.message }, 400);
              }
              await guardarCambios(db, antes);
              await avisar(core, db);
              return responder({ ok: true, ...r, datos_pago: db.settings.tienda_datos_pago || "" });
            }
            const cat = core.tiendaCatalogo();
            if (cat.activa) {
              for (const p of cat.productos) if (p.imagen) {
                try {
                  p.imagen = await imagenPublica(p.imagen);
                } catch (e) {
                  p.imagen = null;
                }
              }
            }
            return responder(cat);
          }
          if (ruta.endsWith("/formulario")) {
            if (body.website || body.sitio) return responder({ ok: true });
            const ip = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "x";
            if (!limitar("f:" + ip, 5, 36e5)) return responder({ error: "Ya recibimos tu mensaje. Intenta m\xE1s tarde." }, 429);
            const db = await obtenerDb();
            if (!db.users.length) return responder({ error: "Formulario no disponible." }, 503);
            const core = new Core(null, { db });
            const antes = foto(db);
            try {
              core.contactoWeb(body);
            } catch (e) {
              return responder({ error: e.message }, 400);
            }
            await guardarCambios(db, antes);
            await avisar(core, db);
            return responder({ ok: true, mensaje: "\xA1Gracias! Te escribiremos pronto." });
          }
          return responder(await api(body));
        } catch (err) {
          cache = null;
          return responder({ error: "No se pudo conectar con la base de datos del estudio. Revisa que ejecutaste el SQL de instalaci\xF3n.", code: "ERROR", detail: String(err && err.message) }, 500);
        }
      };
    }
    module.exports = { crearServidor: crearServidor2, TOPICO };
  }
});

// server/deno-entry.js
var { crearServidor } = require_servidor();
var claves = (() => {
  try {
    return JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}");
  } catch (e) {
    return {};
  }
})();
var clave = claves.default || Object.values(claves)[0] || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
Deno.serve(crearServidor({ url: Deno.env.get("SUPABASE_URL"), clave, secreto: Deno.env.get("DELIRIUM_SECRETO") || clave }));
