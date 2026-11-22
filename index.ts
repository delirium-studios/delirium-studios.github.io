// @ts-nocheck
// Delirium OS · servidor en línea v1.10.1 · generado automáticamente, no editar.
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
      { key: "guia", label: "Gu\xEDa y tutoriales", group: "", col: null },
      { key: "clientes", label: "Clientes", group: "Comercial", col: "clients" },
      { key: "recordatorios", label: "Recordatorios", group: "Comercial", col: "reminders" },
      { key: "hoy", label: "Hoy \xB7 prospecci\xF3n", group: "Comercial", col: null },
      { key: "plantillas", label: "Plantillas de mensajes", group: "Comercial", col: "templates" },
      { key: "cotizaciones", label: "Cotizaciones", group: "Comercial", col: "quotes" },
      { key: "catalogo", label: "Cat\xE1logo de servicios", group: "Comercial", col: "services" },
      { key: "soporte", label: "Soporte y solicitudes", group: "Comercial", col: "tickets" },
      { key: "respuestas", label: "Respuestas guardadas", group: "Comercial", col: "replies" },
      { key: "riesgo", label: "Clientes en riesgo", group: "Comercial", col: null },
      { key: "encuestas", label: "Encuestas (del 1 al 10)", group: "Comercial", col: null },
      { key: "proyectos", label: "Proyectos", group: "Operaci\xF3n", col: "projects" },
      { key: "tareas", label: "Tareas", group: "Operaci\xF3n", col: "tasks" },
      { key: "piezas", label: "Piezas y aprobaciones", group: "Operaci\xF3n", col: "pieces" },
      { key: "ideas", label: "Banco de ideas", group: "Operaci\xF3n", col: "ideas" },
      { key: "calendario", label: "Calendario", group: "Operaci\xF3n", col: "events" },
      { key: "horas", label: "Registro de horas", group: "Operaci\xF3n", col: "timesheets" },
      { key: "carga", label: "Carga del equipo", group: "Operaci\xF3n", col: null },
      { key: "redes", label: "Calendario de redes", group: "Marketing y redes", col: "posts" },
      { key: "anuncios", label: "Campa\xF1as de anuncios", group: "Marketing y redes", col: "campaigns" },
      { key: "metricas", label: "M\xE9tricas de redes", group: "Marketing y redes", col: null },
      { key: "metas", label: "Metas por cliente", group: "Marketing y redes", col: "goals" },
      { key: "bandeja", label: "Bandeja de redes", group: "Marketing y redes", col: null },
      { key: "informes", label: "Reportes para clientes", group: "Marketing y redes", col: null },
      { key: "cuentas", label: "Redes conectadas", group: "Marketing y redes", col: "socials" },
      { key: "juegos", label: "Juegos", group: "Juegos", col: "games" },
      { key: "bugs", label: "Bugs y QA", group: "Juegos", col: "bugs" },
      { key: "llaves", label: "Llaves y creadores", group: "Juegos", col: "keys" },
      { key: "facturas", label: "Facturas y pagos", group: "Finanzas", col: "invoices" },
      { key: "planes", label: "Planes y alquileres", group: "Finanzas", col: "subscriptions" },
      { key: "gastos", label: "Gastos", group: "Finanzas", col: "expenses" },
      { key: "pagos_equipo", label: "Comisiones y pagos por pieza", group: "Finanzas", col: null },
      { key: "margen", label: "Margen por cliente", group: "Finanzas", col: null },
      { key: "cobranza", label: "Renovaciones y cobranza", group: "Finanzas", col: null },
      { key: "panel_meta", label: "Panel de la meta", group: "Finanzas", col: null },
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
      guia: { ...allStaff("R:all"), cliente: "R:all", cliente_eq: "R:all" },
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
      pagos_equipo: { ...allStaff("R:self"), founder: "W:all", coo: "W:all", finanzas: "W:all" },
      margen: { founder: "R:all", coo: "R:all", finanzas: "R:all" },
      respuestas: { founder: "W:all", coo: "W:all", ventas: "W:all", pm: "W:all", social: "W:all", finanzas: "W:all", creativo_dir: "R:all", productor: "R:all" },
      riesgo: { founder: "R:all", coo: "R:all" },
      encuestas: { founder: "R:all", coo: "R:all", ventas: "R:all", pm: "R:all", finanzas: "R:all" },
      ideas: { founder: "W:all", coo: "W:all", creativo_dir: "W:all", productor: "W:all", pm: "W:all", social: "W:all", creativo: "W:all", mediabuyer: "R:all", ventas: "R:all" },
      cobranza: { founder: "W:all", coo: "W:all", finanzas: "W:all" },
      panel_meta: { founder: "R:all", coo: "R:all", finanzas: "R:all" },
      hoy: { founder: "W:all", coo: "W:all", ventas: "W:all", pm: "R:all" },
      plantillas: { founder: "W:all", coo: "W:all", ventas: "W:all", pm: "R:all", social: "R:all" },
      metas: { founder: "W:all", coo: "W:all", creativo_dir: "W:all", social: "W:all", pm: "W:all", mediabuyer: "R:all", ventas: "R:all", cliente: "R:client", cliente_eq: "R:client" },
      bandeja: { founder: "W:all", coo: "W:all", creativo_dir: "W:all", social: "W:all", pm: "R:all", mediabuyer: "R:all" },
      informes: { founder: "R:all", coo: "R:all", creativo_dir: "R:all", social: "R:all", pm: "R:all", mediabuyer: "R:all", ventas: "R:all", finanzas: "R:all", cliente: "R:client", cliente_eq: "R:client" },
      carga: { ...allStaff("R:self"), founder: "R:all", coo: "R:all", creativo_dir: "R:all", productor: "R:all", pm: "R:all", rrhh: "R:all" },
      metricas: { founder: "R:all", coo: "R:all", creativo_dir: "R:all", social: "R:all", pm: "R:all", mediabuyer: "R:all", ventas: "R:all", cliente: "R:client", cliente_eq: "R:client" },
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
      projects: {
        precio: ["founder", "coo", "finanzas", "pm", "ventas", "productor", "creativo_dir", "cliente", "cliente_eq"],
        costo_interno: ["founder", "coo", "finanzas", "pm", "productor", "creativo_dir"],
        notas_internas: ["founder", "coo", "finanzas", "pm", "ventas", "productor", "creativo_dir", "legal"],
        costo_ronda_extra: ["founder", "coo", "finanzas", "pm", "ventas", "productor", "creativo_dir", "cliente", "cliente_eq"]
      },
      tasks: { horas_estimadas: STAFF },
      pieces: { costo_produccion: ["founder", "coo", "finanzas", "productor", "creativo_dir", "pm"], checklist: STAFF },
      subscriptions: { costo_pieza: ["founder", "coo", "finanzas", "productor", "pm"] },
      clients: { notas_internas: ["founder", "coo", "ventas", "pm", "creativo_dir"], comision_pct: ["founder", "coo", "finanzas"] },
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

// src/main/core17.js
var require_core17 = __commonJS({
  "src/main/core17.js"(exports, module) {
    var crypto = (init_shim_crypto(), __toCommonJS(shim_crypto_exports));
    var { STAFF, CLIENT_ROLES } = require_config();
    var now = () => (/* @__PURE__ */ new Date()).toISOString();
    var num = (v) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };
    var err = (code, msg) => Object.assign(new Error(msg), { code });
    var acceso = (msg) => err("ACCESS", msg);
    var entrada = (msg) => err("INPUT", msg);
    var ZONA_VE = "America/Caracas";
    var enZona = (t = Date.now(), zona = ZONA_VE) => {
      const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: zona, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", weekday: "short" }).formatToParts(new Date(t)).map((x) => [x.type, x.value]));
      return { dia: `${p.year}-${p.month}-${p.day}`, hora: `${String(+p.hour % 24).padStart(2, "0")}:${p.minute}`, semana: { Mon: "lun", Tue: "mar", Wed: "mie", Thu: "jue", Fri: "vie", Sat: "sab", Sun: "dom" }[p.weekday] };
    };
    var sumarDias = (dia, n) => new Date(Date.parse(dia + "T12:00:00Z") + n * 864e5).toISOString().slice(0, 10);
    var DIAS_LAB = ["lun", "mar", "mie", "jue", "vie"];
    var HORARIO_BASE = Object.fromEntries(DIAS_LAB.map((d) => [d, [{ d: "08:00", h: "12:00" }, { d: "13:00", h: "17:00" }]]));
    var min = (t) => {
      const [h, m] = String(t).split(":").map(Number);
      return h * 60 + m;
    };
    var horasDe = (horario) => Math.round(DIAS_LAB.reduce((a, d) => a + (horario[d] || []).reduce((b, x) => b + (min(x.h) - min(x.d)), 0), 0) / 6) / 10;
    var ETAPAS = ["Por contactar", "Mensaje 1", "Seguimiento 3 d\xEDas", "Seguimiento 7 d\xEDas", "Respondi\xF3", "Llamada agendada", "Prueba", "Plan mensual", "Descartado"];
    var TIPOS_PROSPECTO = ["Negocio", "Agencia (marca blanca)", "Streamer o creador", "Estudio de juegos", "Socio que recomienda"];
    var CANALES = ["DM de Instagram", "Correo", "WhatsApp", "Recomendaci\xF3n"];
    var SIGUIENTE = { "Por contactar": ["Mensaje 1", 3], "Mensaje 1": ["Seguimiento 3 d\xEDas", 4], "Seguimiento 3 d\xEDas": ["Seguimiento 7 d\xEDas", 7] };
    var MOTIVOS_PERDIDA = ["No respondi\xF3", "Precio", "Ya tiene agencia", "No es buen momento", "No le interesa", "Fuera de nuestro perfil", "Otro"];
    var limpiarIg = (v) => String(v || "").trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/[/?#].*$/, "").replace(/^@/, "").toLowerCase();
    var limpiarTel = (v) => String(v || "").replace(/[^\d]/g, "").replace(/^0+/, "");
    var norm = (v) => String(v || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    var VIDEO = /\.(mp4|mov|m4v|webm|avi|mkv|wmv|mpg|mpeg)$/i;
    function driveId(url) {
      const s = String(url || "");
      const m = s.match(/drive\.google\.com\/file\/d\/([\w-]{20,})/) || s.match(/[?&]id=([\w-]{20,})/) || s.match(/docs\.google\.com\/.*\/d\/([\w-]{20,})/);
      return m ? m[1] : null;
    }
    var miniaturaDe = (url) => {
      const id = driveId(url);
      return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w480` : null;
    };
    var vistaDe = (url) => {
      const id = driveId(url);
      return id ? `https://drive.google.com/file/d/${id}/preview` : null;
    };
    var NEGATIVAS = ["malo", "mala", "pesimo", "pesima", "horrible", "terrible", "estafa", "estafadores", "nunca mas", "no vuelvo", "asco", "asqueroso", "frio", "tarde", "tardaron", "demoraron", "mal servicio", "mala atencion", "groseros", "grosero", "caro", "carisimo", "robo", "decepcion", "decepcionado", "decepcionada", "queja", "reclamo", "no sirve", "no responden", "nadie responde", "sucio", "cucaracha", "intoxic", "worst", "terrible", "awful", "scam", "never again", "disgusting", "rude", "refund", "bad service", "cold food", "disappointed"];
    var esNegativo = (t) => {
      const s = ` ${norm(t)} `;
      return NEGATIVAS.some((p) => s.includes(` ${p}`)) || /👎|😡|🤬|😤/.test(String(t || ""));
    };
    var metodos = {
      // ══════════════ horarios flexibles (lunes a viernes, hora de Venezuela) ══════════════
      horarioDe(u) {
        return u && u.horario ? u.horario : this.db.settings.horario_base || HORARIO_BASE;
      },
      horarios() {
        const u = this.requireUser();
        if (this.isClient()) throw acceso("Los horarios del equipo no se muestran en el portal.");
        const ahora = enZona();
        const minutos = min(ahora.hora);
        const lista = this.db.users.filter((x) => x.activo && STAFF.includes(x.rol)).map((x) => {
          const h = this.horarioDe(x);
          const hoy = DIAS_LAB.includes(ahora.semana) ? h[ahora.semana] || [] : [];
          const fuera = this.db.leaves.find((l) => l.usuario_id === x.id && l.estado === "Aprobada" && l.desde <= ahora.dia && l.hasta >= ahora.dia);
          return { id: x.id, nombre: x.nombre, rol: x.rol, propio: !!x.horario, horario: h, horas_semana: horasDe(h), hoy, ausente: fuera ? fuera.tipo || "Ausencia" : "", trabajando: !fuera && hoy.some((b) => minutos >= min(b.d) && minutos < min(b.h)), yo: x.id === u.id };
        });
        return { zona: ZONA_VE, ahora: ahora.hora, dia: ahora.semana, base: this.db.settings.horario_base || HORARIO_BASE, nucleo: this.db.settings.horario_nucleo || null, personas: lista };
      },
      guardarHorario(p = {}) {
        const u = this.requireUser();
        const id = p.usuario_id || u.id;
        if (id !== u.id && !(this.isAdmin() || this.canWrite("empleados"))) throw acceso("Solo puedes cambiar tu propio horario.");
        const t = this.db.users.find((x) => x.id === id && STAFF.includes(x.rol));
        if (!t) throw entrada("Persona no encontrada.");
        if (p.horario === null) {
          delete t.horario;
          this.audit("editar", "equipo", t.id, "Horario: vuelve al horario base");
          this.persist();
          return this.horarioDe(t);
        }
        const h = {};
        const nucleo = this.db.settings.horario_nucleo;
        for (const d of DIAS_LAB) {
          const bloques = (Array.isArray((p.horario || {})[d]) ? p.horario[d] : []).filter((b) => b && b.d && b.h).map((b) => ({ d: String(b.d).slice(0, 5), h: String(b.h).slice(0, 5) }));
          if (bloques.length > 3) throw entrada("M\xE1ximo 3 bloques por d\xEDa.");
          for (const b of bloques) {
            if (!/^\d\d:\d\d$/.test(b.d) || !/^\d\d:\d\d$/.test(b.h) || min(b.d) >= min(b.h)) throw entrada(`Revisa el horario del ${d}: la hora de inicio debe ser antes que la de fin.`);
            if (min(b.d) < 6 * 60 || min(b.h) > 22 * 60) throw entrada("El horario va de 6:00 a. m. a 10:00 p. m.");
          }
          bloques.sort((a, b) => min(a.d) - min(b.d));
          for (let i = 1; i < bloques.length; i++) if (min(bloques[i].d) < min(bloques[i - 1].h)) throw entrada(`Hay bloques que se cruzan el ${d}.`);
          if (nucleo && bloques.length && !bloques.some((b) => min(b.d) <= min(nucleo.d) && min(b.h) >= min(nucleo.h))) throw entrada(`Cada d\xEDa trabajado debe cubrir las horas n\xFAcleo del equipo (${nucleo.d} a ${nucleo.h}).`);
          h[d] = bloques;
        }
        const total = horasDe(h);
        if (total < 4) throw entrada("El horario tiene muy pocas horas a la semana.");
        t.horario = h;
        this.audit("editar", "equipo", t.id, `Horario flexible: ${total} h por semana`);
        this.persist();
        return { horario: h, horas_semana: total };
      },
      // ══════════════ invitación de un solo uso (sin correo) ══════════════
      crearInvitacion(p = {}) {
        const u = this.requireUser();
        if (!this.canWrite("equipo")) throw acceso("Solo Direcci\xF3n crea invitaciones.");
        const t = this.db.users.find((x) => x.id === p.id);
        if (!t) throw entrada("Cuenta no encontrada.");
        if (t.rol === "founder" && u.rol !== "founder") throw acceso("Solo el Founder puede invitar al Founder.");
        const token = crypto.randomBytes(24).toString("base64url");
        const horas = Math.min(168, Math.max(1, num(p.horas) || 72));
        t.invitacion = { hash: crypto.createHash("sha256").update(token).digest("hex"), vence: new Date(Date.now() + horas * 36e5).toISOString(), creada: now(), por: u.nombre };
        this.audit("editar", "equipo", t.id, `Invitaci\xF3n de acceso creada (vence en ${horas} h)`);
        this.persist();
        const web = String(this.db.settings.web_publica || "https://delirium-studios.github.io").replace(/\/$/, "");
        return { codigo: token, enlace: `${web}/app.html#invitacion=${token}`, vence: t.invitacion.vence, nombre: t.nombre, email: t.email };
      },
      verInvitacion(token) {
        const t = this.usuarioDeInvitacion(token);
        return { nombre: t.nombre, email: t.email, empresa: this.db.settings.empresa };
      },
      usuarioDeInvitacion(token) {
        const h = crypto.createHash("sha256").update(String(token || "")).digest("hex");
        const t = this.db.users.find((x) => x.invitacion && x.invitacion.hash && x.invitacion.hash.length === h.length && crypto.timingSafeEqual(Buffer.from(x.invitacion.hash), Buffer.from(h)));
        if (!t) throw acceso("Esta invitaci\xF3n no es v\xE1lida o ya se us\xF3. Pide una nueva a Direcci\xF3n.");
        if (Date.parse(t.invitacion.vence) < Date.now()) throw acceso("Esta invitaci\xF3n venci\xF3. Pide una nueva a Direcci\xF3n.");
        if (!t.activo) throw acceso("Esta cuenta est\xE1 desactivada. Habla con Direcci\xF3n.");
        return t;
      },
      canjearInvitacion(token, password) {
        const t = this.usuarioDeInvitacion(token);
        this.validatePassword(password);
        const { hashPw } = require_core();
        t.password = hashPw(password);
        t.intentos = 0;
        t.bloqueado_hasta = null;
        delete t.invitacion;
        t.ultimo_acceso = now();
        this.user = t;
        this.audit("editar", "equipo", t.id, "Entr\xF3 con su invitaci\xF3n y eligi\xF3 su contrase\xF1a");
        this.persist();
        return this.publicUser(t);
      },
      // ══════════════ primer uso real ══════════════
      tieneDatosEjemplo() {
        return this.db.users.some((u) => u.demo) || this.db.clients.some((c) => /\(ejemplo\)/.test(c.nombre || ""));
      },
      primerUsoReal(p = {}) {
        const u = this.requireUser();
        if (u.rol !== "founder") throw acceso("Solo el Founder empieza el uso real.");
        if (p.confirmar !== "BORRAR") throw entrada("Escribe BORRAR para confirmar.");
        const guardar = /* @__PURE__ */ new Set(["users", "docs", "audit", "social_tokens"]);
        let borrados = 0;
        const { COLLECTIONS } = require_core();
        for (const c of COLLECTIONS) {
          if (guardar.has(c)) continue;
          borrados += (this.db[c] || []).length;
          this.db[c] = [];
        }
        const demo = this.db.users.filter((x) => x.demo || x.id !== u.id && /\(ejemplo\)/.test(x.nombre || ""));
        borrados += demo.length;
        this.db.users = this.db.users.filter((x) => !demo.includes(x));
        this.db.social_tokens = [];
        this.db.counters = {};
        this.db.meta = { ...this.db.meta || {}, demo_password: null, uso_real: now() };
        Object.assign(this.db.settings, { empresa: p.empresa || this.db.settings.empresa, rif: p.rif ?? this.db.settings.rif, telefono: p.telefono ?? this.db.settings.telefono, correo_general: p.correo || this.db.settings.correo_general });
        this.audit("borrar", "ajustes", null, `Primer uso real: se borraron ${borrados} registros de ejemplo`);
        this.persist();
        return { borrados };
      },
      // ══════════════ reportar problema (sin datos sensibles) ══════════════
      limpiarReporte(texto) {
        return String(texto || "").slice(0, 1500).replace(/\b(?:\d[ -]?){13,19}\b/g, "[n\xFAmero oculto]").replace(/\b\d{20}\b/g, "[n\xFAmero oculto]").replace(/(contraseña|clave|password|pin|cvv)\s*[:=]?\s*\S+/gi, "$1: [oculto]");
      },
      prepararReporte(p = {}) {
        const u = this.requireUser();
        const bloqueadas = ["boveda", "nomina", "empleados"];
        const pantalla = String(p.pantalla || "").slice(0, 60);
        const sinCaptura = bloqueadas.some((b) => pantalla.startsWith(b));
        const texto = this.limpiarReporte(p.texto);
        if (!texto.trim()) throw entrada("Cu\xE9ntanos qu\xE9 pas\xF3.");
        const bug = { id: crypto.randomUUID(), creado: now(), creado_por: u.id, titulo: `Reporte: ${texto.slice(0, 70)}`, descripcion: texto, severidad: "Media", estado: "Nuevo", plataforma: String(p.plataforma || "").slice(0, 60), version: String(p.version || "").slice(0, 20), origen: "Reportar problema", pantalla };
        this.db.bugs.unshift(bug);
        this.audit("crear", "bugs", bug.id, `Problema reportado desde ${pantalla || "la app"}`);
        this.persist();
        return { bug, sinCaptura, mensaje: `\u{1F41E} **Problema reportado** por ${u.nombre} (${u.rol})
**Pantalla:** ${pantalla || "\u2014"} \xB7 **Versi\xF3n:** ${bug.version || "\u2014"} \xB7 ${bug.plataforma || ""}
> ${texto.replace(/\n/g, "\n> ")}` };
      },
      // ══════════════ videos por enlace ══════════════
      esVideo(nombre) {
        return VIDEO.test(String(nombre || ""));
      },
      // ══════════════ prospección ══════════════
      claveDuplicado(c) {
        return { ig: limpiarIg(c.instagram), tel: limpiarTel(c.telefono), mail: String(c.email || "").trim().toLowerCase(), nc: c.nombre && c.ciudad ? `${norm(c.nombre)}|${norm(c.ciudad)}` : "" };
      },
      buscarDuplicado(c, lista = this.db.clients, excluir = null) {
        const k = this.claveDuplicado(c);
        for (const x of lista) {
          if (x.id && x.id === excluir) continue;
          const o = this.claveDuplicado(x);
          if (k.ig && k.ig === o.ig) return { por: "usuario de Instagram", con: x };
          if (k.tel && k.tel.length >= 7 && o.tel && (k.tel.endsWith(o.tel.slice(-9)) || o.tel.endsWith(k.tel.slice(-9)))) return { por: "tel\xE9fono", con: x };
          if (k.mail && k.mail === o.mail) return { por: "correo", con: x };
          if (k.nc && k.nc === o.nc) return { por: "nombre y ciudad", con: x };
        }
        return null;
      },
      importarProspectos(filas = [], { aplicar = false, duplicados = "saltar" } = {}) {
        const u = this.requireUser();
        if (!this.canWrite("clientes")) throw acceso("Tu rol no puede importar prospectos.");
        if (!Array.isArray(filas) || !filas.length) throw entrada("El archivo no tiene filas.");
        if (filas.length > 2e3) throw entrada("M\xE1ximo 2.000 filas por importaci\xF3n.");
        const CAMPOS = ["nombre", "instagram", "telefono", "email", "rubro", "ciudad", "pais", "zona_horaria", "tipo_prospecto", "canal", "loom", "detalle", "notas", "web"];
        const vistos = [];
        const res = { nuevos: 0, duplicados: 0, actualizados: 0, errores: 0, filas: [] };
        for (const [i, f0] of filas.entries()) {
          const f = {};
          for (const k of CAMPOS) if (f0[k] !== void 0 && f0[k] !== null && String(f0[k]).trim() !== "") f[k] = String(f0[k]).trim().slice(0, 500);
          if (f.instagram) f.instagram = "@" + limpiarIg(f.instagram);
          if (f.tipo_prospecto && !TIPOS_PROSPECTO.includes(f.tipo_prospecto)) {
            const t = TIPOS_PROSPECTO.find((x) => norm(x).startsWith(norm(f.tipo_prospecto).split(" ")[0]));
            f.tipo_prospecto = t || "Negocio";
          }
          if (!f.nombre && f.instagram) f.nombre = f.instagram;
          if (!f.nombre) {
            res.errores++;
            res.filas.push({ fila: i + 2, estado: "error", motivo: "Falta el nombre o el usuario de Instagram" });
            continue;
          }
          const dup = this.buscarDuplicado(f) || (() => {
            const d = this.buscarDuplicado(f, vistos);
            return d ? { ...d, en_archivo: true } : null;
          })();
          if (dup) {
            res.duplicados++;
            res.filas.push({ fila: i + 2, estado: "duplicado", nombre: f.nombre, motivo: dup.en_archivo ? `Repetido en el archivo: mismo ${dup.por} que ${dup.con.nombre}` : `Ya existe por ${dup.por}: ${dup.con.nombre}` });
            if (aplicar && duplicados === "actualizar" && !dup.en_archivo && dup.con.id) {
              const x = this.db.clients.find((c) => c.id === dup.con.id);
              for (const [k, v] of Object.entries(f)) if (!x[k]) x[k] = v;
              x.actualizado = now();
              res.actualizados++;
            }
            continue;
          }
          vistos.push(f);
          res.nuevos++;
          res.filas.push({ fila: i + 2, estado: "nuevo", nombre: f.nombre });
          if (aplicar) this.db.clients.unshift({ id: crypto.randomUUID(), creado: now(), creado_por: u.id, estado: "Por contactar", etapa: "Por contactar", origen: f.canal === "Recomendaci\xF3n" ? "Referido" : "Prospecci\xF3n", tipo_prospecto: f.tipo_prospecto || "Negocio", canal: f.canal || "DM de Instagram", asignados: [u.id], historial: [], ...f });
        }
        if (aplicar) {
          this.audit("crear", "clientes", null, `Import\xF3 ${res.nuevos} prospectos (${res.duplicados} duplicados${res.actualizados ? `, ${res.actualizados} completados` : ""})`);
          this.persist();
        }
        res.filas = res.filas.slice(0, 500);
        return res;
      },
      etapaHistorial(c, etapa, por) {
        c.historial = c.historial || [];
        c.historial.unshift({ fecha: now(), tipo: "Etapa", etapa, nota: `Etapa: ${etapa}`, por });
      },
      marcarMensaje(p = {}) {
        const u = this.requireUser();
        if (!this.canWrite("clientes")) throw acceso("Tu rol no puede registrar mensajes.");
        const c = this.rawScoped("clientes", p.id);
        const hoy = enZona().dia;
        const antes = c.etapa || "Por contactar";
        if (p.accion === "respondio") {
          c.etapa = "Respondi\xF3";
          c.proximo_seguimiento = null;
          c.estado = c.estado === "Por contactar" ? "Contactado" : c.estado;
          this.etapaHistorial(c, c.etapa, u.nombre);
        } else if (p.accion === "llamada") {
          c.etapa = "Llamada agendada";
          c.proximo_seguimiento = p.fecha || null;
          c.llamada = p.fecha || null;
          this.etapaHistorial(c, c.etapa, u.nombre);
        } else if (p.accion === "descartar") {
          if (!MOTIVOS_PERDIDA.includes(p.motivo)) throw entrada("Elige por qu\xE9 se descarta.");
          c.etapa = "Descartado";
          c.motivo_descartado = p.motivo;
          c.proximo_seguimiento = null;
          this.etapaHistorial(c, c.etapa, u.nombre);
        } else if (p.accion === "posponer") {
          c.proximo_seguimiento = sumarDias(hoy, Math.max(1, num(p.dias) || 1));
        } else {
          if (!SIGUIENTE[antes]) throw entrada(`Este prospecto est\xE1 en "${antes}": ya no toca mensaje de prospecci\xF3n.`);
          const [sig, dias] = SIGUIENTE[antes];
          const paso = antes === "Por contactar" ? "Mensaje 1" : antes === "Mensaje 1" ? "Seguimiento 3 d\xEDas" : "Seguimiento 7 d\xEDas";
          c.etapa = sig;
          c.ultimo_mensaje = hoy;
          c.proximo_seguimiento = dias ? sumarDias(hoy, dias) : null;
          c.ultimo_contacto = hoy;
          if (c.estado === "Por contactar") c.estado = "Contactado";
          c.historial = c.historial || [];
          c.historial.unshift({ fecha: now(), tipo: "Mensaje", paso, nota: `${paso} enviado${p.plantilla ? ` (plantilla: ${String(p.plantilla).slice(0, 60)})` : ""}`, por: u.nombre, por_id: u.id });
          if (antes === "Seguimiento 3 d\xEDas") c.proximo_seguimiento = null;
        }
        c.actualizado = now();
        this.persist();
        return this.strip("clients", c);
      },
      mensajesHoy(userId) {
        const hoy = enZona().dia;
        let n = 0;
        for (const c of this.db.clients) for (const h of c.historial || []) {
          if (h.tipo !== "Mensaje") continue;
          if (enZona(Date.parse(h.fecha)).dia !== hoy) break;
          if (!userId || h.por_id === userId) n++;
        }
        return n;
      },
      hoyProspeccion(p = {}) {
        const u = this.requireUser();
        if (!this.canRead("hoy")) throw acceso("No tienes acceso a la prospecci\xF3n.");
        const hoy = enZona().dia;
        const meta = Math.max(1, num(u.meta_mensajes) || num(this.db.settings.meta_mensajes_dia) || 50);
        const mios = (c) => !p.solo_mios || (c.asignados || []).includes(u.id);
        const lista = this.safeList("clientes").filter((c) => c.etapa && mios(c) && (!p.tipo || c.tipo_prospecto === p.tipo));
        const seguimientos = lista.filter((c) => ["Mensaje 1", "Seguimiento 3 d\xEDas", "Llamada agendada"].includes(c.etapa) && c.proximo_seguimiento && c.proximo_seguimiento <= hoy).sort((a, b) => a.proximo_seguimiento < b.proximo_seguimiento ? -1 : 1);
        const hechosHoy = this.mensajesHoy(p.todos ? null : u.id);
        const nuevos = lista.filter((c) => c.etapa === "Por contactar").sort((a, b) => a.creado < b.creado ? -1 : 1).slice(0, Math.max(0, meta - hechosHoy) + 5);
        const ver = (c) => ({ id: c.id, nombre: c.nombre, instagram: c.instagram || "", telefono: c.telefono || "", email: c.email || "", rubro: c.rubro || "", ciudad: c.ciudad || "", pais: c.pais || "", zona_horaria: c.zona_horaria || "", tipo_prospecto: c.tipo_prospecto || "Negocio", canal: c.canal || "", etapa: c.etapa, detalle: c.detalle || "", loom: c.loom || "", proximo_seguimiento: c.proximo_seguimiento || null, ultimo_mensaje: c.ultimo_mensaje || null, atrasado: !!(c.proximo_seguimiento && c.proximo_seguimiento < hoy) });
        return { hoy, meta, hechos: hechosHoy, nuevos: nuevos.map(ver), seguimientos: seguimientos.map(ver), plantillas: this.safeList("plantillas").filter((x) => x.activa !== false), etapas: ETAPAS, tipos: TIPOS_PROSPECTO, motivos: MOTIVOS_PERDIDA };
      },
      embudo(p = {}) {
        this.requireUser();
        if (!this.canRead("hoy")) throw acceso("No tienes acceso a la prospecci\xF3n.");
        const sem = (offset) => {
          const hoy = enZona().dia;
          const d = /* @__PURE__ */ new Date(hoy + "T12:00:00Z");
          const lunes = sumarDias(hoy, -((d.getUTCDay() + 6) % 7) - offset * 7);
          return [lunes, sumarDias(lunes, 6)];
        };
        const contar = ([ini, fin]) => {
          const o = { mensajes: 0, respuestas: 0, llamadas: 0, pruebas: 0, planes: 0, descartados: 0, motivos: {} };
          for (const c of this.db.clients) {
            if (p.tipo && c.tipo_prospecto !== p.tipo) continue;
            for (const h of c.historial || []) {
              const dia = enZona(Date.parse(h.fecha)).dia;
              if (dia < ini || dia > fin) continue;
              if (h.tipo === "Mensaje" && h.paso === "Mensaje 1") o.mensajes++;
              if (h.tipo === "Etapa") {
                if (h.etapa === "Respondi\xF3") o.respuestas++;
                if (h.etapa === "Llamada agendada") o.llamadas++;
                if (h.etapa === "Prueba") o.pruebas++;
                if (h.etapa === "Plan mensual") o.planes++;
                if (h.etapa === "Descartado") {
                  o.descartados++;
                  o.motivos[c.motivo_descartado || "Otro"] = (o.motivos[c.motivo_descartado || "Otro"] || 0) + 1;
                }
              }
            }
          }
          const pct = (a, b) => b ? Math.round(a / b * 1e3) / 10 : null;
          o.conversion = { respuesta: pct(o.respuestas, o.mensajes), llamada: pct(o.llamadas, o.respuestas), prueba: pct(o.pruebas, o.llamadas), plan: pct(o.planes, o.pruebas), total: pct(o.planes, o.mensajes) };
          return { desde: ini, hasta: fin, ...o };
        };
        const semanas = Math.min(12, Math.max(1, num(p.semanas) || 6));
        return { actual: contar(sem(0)), anterior: contar(sem(1)), historia: Array.from({ length: semanas }, (_, i) => contar(sem(semanas - 1 - i))), tipos: TIPOS_PROSPECTO };
      },
      crearPlantillasBase() {
        const u = this.requireUser();
        if (!this.canWrite("plantillas")) throw acceso("Tu rol no puede crear plantillas.");
        const base = [
          ["Negocio \xB7 primer mensaje", "Mensaje 1", "Negocio", "Espa\xF1ol", "Hola [nombre], vi [detalle] y me encant\xF3 lo que hacen en [negocio]. Hacemos reels para negocios latinos en [ciudad]: te grab\xE9 un video corto con 2 ideas para tu cuenta. \xBFTe lo mando?"],
          ["Negocio \xB7 seguimiento 3 d\xEDas", "Seguimiento 3 d\xEDas", "Negocio", "Espa\xF1ol", "Hola [nombre], \xBFpudiste ver mi mensaje? Te dejo las 2 ideas de reels para [negocio] por si te sirven, sin compromiso."],
          ["Negocio \xB7 seguimiento 7 d\xEDas", "Seguimiento 7 d\xEDas", "Negocio", "Espa\xF1ol", "Hola [nombre], \xFAltimo mensaje para no molestar \u{1F64C} Si este mes quieres probar 4 reels para [negocio], tenemos una prueba corta. Me avisas."],
          ["Business \xB7 first message", "Mensaje 1", "Negocio", "Ingl\xE9s", "Hi [nombre]! I saw [detalle] and loved what you do at [negocio]. We make reels for Latino businesses in [ciudad] \u2014 I recorded a short video with 2 ideas for your account. Want me to send it?"],
          ["Agencia \xB7 marca blanca", "Mensaje 1", "Agencia (marca blanca)", "Espa\xF1ol", "Hola [nombre], vi el trabajo de [negocio]. Somos un estudio que produce reels en marca blanca para agencias: precio por pieza, entregas semanales y sin nuestro logo. \xBFTe muestro ejemplos?"],
          ["Creador \xB7 primer mensaje", "Mensaje 1", "Streamer o creador", "Espa\xF1ol", "Hola [nombre], sigo tu contenido ([detalle]). Editamos clips y reels para creadores: t\xFA grabas y nosotros lo convertimos en piezas cortas. \xBFHablamos?"],
          ["Socio \xB7 recomendaci\xF3n", "Mensaje 1", "Socio que recomienda", "Espa\xF1ol", "Hola [nombre], \xBFte interesa ganar una comisi\xF3n por recomendar negocios que necesiten reels? Te pagamos el 10% del primer mes de cada cliente que nos refieras."]
        ];
        let n = 0;
        for (const [nombre, paso, tipo, idioma, texto] of base) if (!this.db.templates.some((x) => x.nombre === nombre)) {
          this.db.templates.push({ id: crypto.randomUUID(), creado: now(), creado_por: u.id, nombre, paso, tipo_prospecto: tipo, idioma, texto, activa: true });
          n++;
        }
        this.persist();
        return { creadas: n };
      },
      // ══════════════ alerta de comentarios negativos ══════════════
      marcarNegativos() {
        let n = 0;
        for (const x of this.db.inbox) {
          const neg = x.tipo === "comentario" ? esNegativo(x.texto) : esNegativo((x.mensajes || []).filter((m) => !m.nuestro).slice(-1)[0]?.texto || x.texto);
          if (neg && !x.negativo && x.estado === "Nuevo") {
            x.negativo = true;
            n++;
          } else if (!neg) x.negativo = false;
        }
        return n;
      }
    };
    module.exports = { metodos, ETAPAS, TIPOS_PROSPECTO, CANALES, MOTIVOS_PERDIDA, HORARIO_BASE, DIAS_LAB, horasDe, enZona, driveId, miniaturaDe, vistaDe, esNegativo, VIDEO };
  }
});

// src/main/core16.js
var require_core16 = __commonJS({
  "src/main/core16.js"(exports, module) {
    var crypto = (init_shim_crypto(), __toCommonJS(shim_crypto_exports));
    var { STAFF, CLIENT_ROLES } = require_config();
    var now = () => (/* @__PURE__ */ new Date()).toISOString();
    var ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    var today = () => ymd(/* @__PURE__ */ new Date());
    var num = (v) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };
    var round2 = (n) => Math.round(num(n) * 100) / 100;
    var dStr = (t) => new Date(t).toISOString().slice(0, 10);
    var masDias = (dia, n) => dStr(Date.parse(dia + "T00:00:00Z") + n * 864e5);
    var err = (code, msg) => Object.assign(new Error(msg), { code });
    var acceso = (msg) => err("ACCESS", msg);
    var entrada = (msg) => err("INPUT", msg);
    var MONEDAS_BASE = [
      { codigo: "USD", nombre: "D\xF3lar estadounidense", simbolo: "$", tasa: 1, auto: false, mostrar: true },
      { codigo: "VES", nombre: "Bol\xEDvar", simbolo: "Bs", tasa: 0, auto: true, mostrar: true },
      { codigo: "EUR", nombre: "Euro", simbolo: "\u20AC", tasa: 0, auto: true, mostrar: true },
      { codigo: "COP", nombre: "Peso colombiano", simbolo: "COL$", tasa: 0, auto: true, mostrar: true },
      { codigo: "MXN", nombre: "Peso mexicano", simbolo: "MX$", tasa: 0, auto: true, mostrar: false },
      { codigo: "USDT", nombre: "Tether (USDT)", simbolo: "USDT", tasa: 1, auto: false, mostrar: true }
    ];
    var METRICAS_META = {
      seguidores: { label: "Seguidores (total a alcanzar)", corto: "seguidores" },
      nuevos_seguidores: { label: "Seguidores nuevos (netos) en el per\xEDodo", corto: "seguidores nuevos" },
      alcance: { label: "Alcance en el per\xEDodo", corto: "de alcance" },
      vistas: { label: "Vistas en el per\xEDodo", corto: "vistas" },
      interacciones: { label: "Interacciones en el per\xEDodo", corto: "interacciones" },
      er_alcance: { label: "Engagement (% interacciones / alcance)", corto: "% de engagement", pct: true },
      publicaciones: { label: "Publicaciones en el per\xEDodo", corto: "publicaciones" },
      visitas_perfil: { label: "Visitas al perfil", corto: "visitas al perfil" },
      clics_web: { label: "Clics al enlace / web", corto: "clics" }
    };
    var B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    var b32enc = (buf) => {
      let bits = 0, val = 0, out = "";
      for (const b of buf) {
        val = val << 8 | b;
        bits += 8;
        while (bits >= 5) {
          out += B32[val >>> bits - 5 & 31];
          bits -= 5;
        }
      }
      if (bits > 0) out += B32[val << 5 - bits & 31];
      return out;
    };
    var b32dec = (s) => {
      const c = String(s).toUpperCase().replace(/[^A-Z2-7]/g, "");
      let bits = 0, val = 0;
      const out = [];
      for (const ch of c) {
        val = val << 5 | B32.indexOf(ch);
        bits += 5;
        if (bits >= 8) {
          out.push(val >>> bits - 8 & 255);
          bits -= 8;
        }
      }
      return Buffer.from(out);
    };
    function totp(secreto, paso) {
      const msg = Buffer.alloc(8);
      msg.writeUInt32BE(Math.floor(paso / 4294967296), 0);
      msg.writeUInt32BE(paso >>> 0, 4);
      const h = crypto.createHmac("sha1", b32dec(secreto)).update(msg).digest();
      const o = h[h.length - 1] & 15;
      return String((h.readUInt32BE(o) & 2147483647) % 1e6).padStart(6, "0");
    }
    var hashCodigo = (c) => crypto.createHash("sha256").update("dos-pasos|" + String(c).toUpperCase().replace(/[^A-Z0-9]/g, "")).digest("hex");
    var nuevosCodigos = () => Array.from({ length: 10 }, () => {
      const r = crypto.randomBytes(5).toString("hex").toUpperCase();
      return `${r.slice(0, 5)}-${r.slice(5)}`;
    });
    var metodos = {
      // ══════════════ monedas ══════════════
      monedas() {
        const s = this.db.settings;
        const lista = Array.isArray(s.monedas) && s.monedas.length ? s.monedas : MONEDAS_BASE;
        const base = s.moneda || "USD";
        return lista.map((m) => ({ ...m, codigo: String(m.codigo || "").toUpperCase(), tasa: m.codigo === base ? 1 : num(m.tasa) }));
      },
      convertir(monto, codigo) {
        const m = this.monedas().find((x) => x.codigo === codigo);
        return m && m.tasa ? round2(num(monto) * m.tasa) : null;
      },
      // rates: { CODIGO: unidades por 1 de la moneda base } (lo que devuelve open.er-api.com/v6/latest/<base>)
      guardarTasasAuto(rates, fuente = "ExchangeRate-API") {
        const s = this.db.settings;
        const base = s.moneda || "USD";
        let n = 0;
        const lista = this.monedas().map((m) => {
          if (m.codigo === base || !m.auto) return m;
          const k = m.codigo === "USDT" ? "USD" : m.codigo;
          const r = num(rates && rates[k]);
          if (r > 0) {
            n++;
            return { ...m, tasa: Math.round(r * 1e6) / 1e6, actualizada: now() };
          }
          return m;
        });
        s.monedas = lista;
        s.tasas_al = now();
        s.tasas_fuente = fuente;
        this.persist();
        return { actualizadas: n, tasas_al: s.tasas_al };
      },
      tasasViejas() {
        const t = Date.parse(this.db.settings.tasas_al || 0) || 0;
        return Date.now() - t > 20 * 3600 * 1e3;
      },
      puedeTasas() {
        return this.isAdmin() || this.canWrite("facturas") || this.canWrite("ajustes");
      },
      // ══════════════ metas por cliente ══════════════
      metricasMeta() {
        return Object.entries(METRICAS_META).map(([k, v]) => ({ value: k, label: v.label }));
      },
      calcularMeta(g) {
        const out = { _actual: null, _inicio: null, _avance: 0, _esperado: 0, _ritmo: "Sin datos", _proyeccion: null };
        const def = METRICAS_META[g.metrica];
        if (!def || !g.desde || !g.hasta || !num(g.objetivo)) return out;
        const hoy = today();
        const corte = g.hasta < hoy ? g.hasta : hoy;
        const total = Math.max(1, Math.round((Date.parse(g.hasta) - Date.parse(g.desde)) / 864e5) + 1);
        const pasados = g.desde > hoy ? 0 : Math.min(total, Math.round((Date.parse(corte) - Date.parse(g.desde)) / 864e5) + 1);
        out._esperado = Math.round(pasados / total * 100);
        let cuentas = this.db.socials.filter((c) => c.client_id === g.client_id && c.cuenta_ext);
        if (g.red && g.red !== "Todas") cuentas = cuentas.filter((c) => c.red === g.red);
        if (!cuentas.length) {
          out._ritmo = "Sin redes conectadas";
          return out;
        }
        if (g.desde > hoy) {
          out._ritmo = "Por empezar";
          return out;
        }
        const r = this.calcularRedes(cuentas, { desde: g.desde, hasta: corte }).actual;
        const obj = num(g.objetivo);
        let actual;
        if (g.metrica === "seguidores") {
          actual = r.seguidores;
          const inicio = r.seguidores - (r.crecimiento || 0);
          out._inicio = inicio;
          out._avance = obj > inicio ? Math.round((actual - inicio) / (obj - inicio) * 100) : actual >= obj ? 100 : 0;
          out._proyeccion = pasados ? Math.round(inicio + (actual - inicio) / pasados * total) : null;
        } else {
          actual = g.metrica === "nuevos_seguidores" ? r.crecimiento : r[g.metrica];
          if (actual === null || actual === void 0) {
            out._ritmo = "Sin datos";
            return out;
          }
          out._avance = Math.round(actual / obj * 100);
          out._proyeccion = def.pct ? actual : pasados ? Math.round(actual / pasados * total) : null;
        }
        out._actual = actual;
        out._avance = Math.max(0, out._avance);
        if (g.hasta < hoy) out._ritmo = out._avance >= 100 ? "Cumplida" : "No se cumpli\xF3";
        else if (out._avance >= 100) out._ritmo = "Cumplida";
        else if (def.pct) out._ritmo = out._avance >= 90 ? "En camino" : "Atrasada";
        else out._ritmo = out._avance >= out._esperado * 0.9 ? "En camino" : "Atrasada";
        return out;
      },
      // ══════════════ mejor hora para publicar ══════════════
      // Rendimiento de cada publicación comparado con lo normal de su cuenta (así las cuentas grandes no tapan a las chicas),
      // agrupado por día de la semana y hora (en la zona horaria del estudio). Más las horas en que los seguidores de Instagram están conectados.
      calcularHoras(cuentas, dias = 120) {
        const zona = this.db.settings.zona_horaria || "America/Caracas";
        const ids = new Set(cuentas.map((c) => c.id));
        const desde = Date.now() - dias * 864e5;
        const posts = this.db.social_posts.filter((x) => ids.has(x.cuenta_id) && Date.parse(x.fecha || 0) > desde && x.interacciones !== null && x.interacciones !== void 0);
        const fmt = new Intl.DateTimeFormat("en-US", { timeZone: zona, weekday: "short", hour: "2-digit", hourCycle: "h23" });
        const DIAS = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
        const mediana = {};
        for (const c of cuentas) {
          const v = posts.filter((x) => x.cuenta_id === c.id).map((x) => num(x.interacciones)).sort((a, b) => a - b);
          mediana[c.id] = v.length ? Math.max(1, v[Math.floor(v.length / 2)]) : 1;
        }
        const matriz = Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => ({ n: 0, score: 0, inter: 0 })));
        for (const x of posts) {
          let p;
          try {
            p = Object.fromEntries(fmt.formatToParts(new Date(x.fecha)).map((y) => [y.type, y.value]));
          } catch (e) {
            continue;
          }
          const d = DIAS[p.weekday];
          const h = Number(p.hour) % 24;
          if (d === void 0 || !Number.isFinite(h)) continue;
          const c = matriz[d][h];
          c.n++;
          c.score += num(x.interacciones) / mediana[x.cuenta_id];
          c.inter += num(x.interacciones);
        }
        const celdas = [];
        for (let d = 0; d < 7; d++) for (let h = 0; h < 24; h++) {
          const c = matriz[d][h];
          if (c.n) {
            c.score = Math.round(c.score / c.n * 100) / 100;
            c.inter = Math.round(c.inter / c.n);
            celdas.push({ dia: d, hora: h, ...c });
          }
        }
        const porHora = Array.from({ length: 24 }, (_, h) => {
          const cs = celdas.filter((c) => c.hora === h);
          const n = cs.reduce((a, c) => a + c.n, 0);
          return { hora: h, n, score: n ? Math.round(cs.reduce((a, c) => a + c.score * c.n, 0) / n * 100) / 100 : 0 };
        });
        const porDia = Array.from({ length: 7 }, (_, d) => {
          const cs = celdas.filter((c) => c.dia === d);
          const n = cs.reduce((a, c) => a + c.n, 0);
          return { dia: d, n, score: n ? Math.round(cs.reduce((a, c) => a + c.score * c.n, 0) / n * 100) / 100 : 0 };
        });
        const minimo = posts.length >= 30 ? 2 : 1;
        const mejores = celdas.filter((c) => c.n >= minimo).sort((a, b) => b.score - a.score || b.n - a.n).slice(0, 5);
        let enLinea = null;
        const conDatos = cuentas.filter((c) => c.audiencia && Array.isArray(c.audiencia.en_linea) && c.audiencia.en_linea.length === 24);
        const desfase = (z) => {
          try {
            const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: z, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit" }).formatToParts(/* @__PURE__ */ new Date()).map((x) => [x.type, x.value]));
            return Math.round((Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24) - Date.now()) / 36e5);
          } catch (e) {
            return 0;
          }
        };
        if (conDatos.length) {
          enLinea = Array(24).fill(0);
          for (const c of conDatos) {
            const d = c.audiencia.en_linea_zona ? desfase(zona) - desfase(c.audiencia.en_linea_zona) : 0;
            c.audiencia.en_linea.forEach((v, h) => {
              enLinea[((h + d) % 24 + 24) % 24] += num(v);
            });
          }
        }
        const horasActivas = enLinea ? enLinea.map((v, h) => ({ hora: h, v })).sort((a, b) => b.v - a.v).slice(0, 3).map((x) => x.hora).sort((a, b) => a - b) : [];
        return { zona, dias, publicaciones: posts.length, matriz, porHora, porDia, mejores, en_linea: enLinea, horas_activas: horasActivas, poco: posts.length < 12 };
      },
      mejorHora(p = {}) {
        this.requireUser();
        return this.calcularHoras(this.cuentasMetricas(p), Math.min(365, Math.max(30, num(p.dias) || 120)));
      },
      // ══════════════ reporte completo del cliente (para el PDF) ══════════════
      informeCliente(p = {}) {
        const u = this.requireUser();
        let clientId = p.client_id;
        if (this.isClient()) clientId = u.client_id;
        else if (!this.canRead("clientes") && !this.canRead("metricas")) throw acceso("Tu rol no puede generar reportes de clientes.");
        const c = this.db.clients.find((x) => x.id === clientId);
        if (!c) throw entrada("Elige un cliente.");
        if (!this.isClient() && this.canRead("clientes") && !this.inScope("clients", c, this.perm("clientes").scope)) throw acceso("No tienes acceso a este cliente.");
        const hoy = today();
        let hasta = /^\d{4}-\d{2}-\d{2}$/.test(String(p.hasta || "")) ? p.hasta : hoy;
        let desde = /^\d{4}-\d{2}-\d{2}$/.test(String(p.desde || "")) ? p.desde : masDias(hasta, -29);
        if (desde > hasta) [desde, hasta] = [hasta, desde];
        if ((Date.parse(hasta) - Date.parse(desde)) / 864e5 > 366) desde = masDias(hasta, -365);
        const en = (f) => {
          const x = String(f || "").slice(0, 10);
          return x >= desde && x <= hasta;
        };
        const dias = Math.round((Date.parse(hasta) - Date.parse(desde)) / 864e5) + 1;
        const nombreCuenta = (x) => (this.db.socials.find((s) => s.id === x.cuenta_id) || {}).nombre || "";
        const cuentas = this.db.socials.filter((s) => s.client_id === clientId && s.cuenta_ext);
        const m = cuentas.length ? this.calcularRedes(cuentas, { desde, hasta }) : null;
        const redes = this.db.socials.filter((s) => s.client_id === clientId).map((s) => {
          const r = m ? m.porRed.find((x) => x.red === s.red) : null;
          return {
            red: s.red,
            nombre: s.nombre,
            estado: s.estado,
            enlace: s.enlace_perfil || "",
            seguidores: s.seguidores || 0,
            conectada: !!s.cuenta_ext,
            ...m && s.cuenta_ext ? (() => {
              const x = this.calcularRedes([s], { desde, hasta }).actual;
              return { crecimiento: x.crecimiento, crecimiento_pct: x.crecimiento_pct, alcance: x.alcance, vistas: x.vistas, interacciones: x.interacciones, er: x.er_alcance, publicaciones: x.publicaciones, visitas_perfil: x.visitas_perfil, clics_web: x.clics_web };
            })() : {},
            _red: r ? r.red : s.red
          };
        });
        const pubs = m ? m.publicaciones.map((x) => ({ red: x.red, cuenta: nombreCuenta(x), fecha: x.fecha, tipo: x.tipo || "", texto: String(x.texto || "").slice(0, 140), enlace: x.enlace || "", imagen: x.imagen || "", alcance: x.alcance ?? null, vistas: x.vistas ?? null, interacciones: x.interacciones || 0, me_gusta: x.me_gusta ?? null, comentarios: x.comentarios ?? null, compartidos: x.compartidos ?? null, guardados: x.guardados ?? null, er: x.er })) : [];
        const horas = cuentas.length ? this.calcularHoras(cuentas, Math.max(90, dias)) : null;
        const metas = this.db.goals.filter((g) => g.client_id === clientId && g.estado !== "Archivada" && !(g.hasta < desde) && !(g.desde > hasta)).map((g) => ({ titulo: g.titulo || "", red: g.red || "Todas", metrica: g.metrica, metrica_txt: (METRICAS_META[g.metrica] || {}).label || g.metrica, objetivo: num(g.objetivo), desde: g.desde, hasta: g.hasta, ...this.calcularMeta(g) }));
        const visibles = (x) => !["Idea", "En dise\xF1o"].includes(x.estado);
        const calendario = this.db.posts.filter((x) => x.client_id === clientId && en(x.fecha) && visibles(x)).sort((a, b) => a.fecha < b.fecha ? -1 : 1).map((x) => ({ titulo: x.titulo, fecha: x.fecha, estado: x.estado, formato: x.formato || "", redes: (x.redes || []).join(", "), alcance: x.alcance || null, interacciones: x.interacciones || null, enlace: x.enlace || "" }));
        const proximas = this.db.posts.filter((x) => x.client_id === clientId && String(x.fecha || "").slice(0, 10) > hoy && String(x.fecha || "").slice(0, 10) <= masDias(hoy, 30) && visibles(x) && x.estado !== "Publicado").sort((a, b) => a.fecha < b.fecha ? -1 : 1).slice(0, 25).map((x) => ({ titulo: x.titulo, fecha: x.fecha, estado: x.estado, formato: x.formato || "", redes: (x.redes || []).join(", ") }));
        const campanas = this.db.campaigns.filter((x) => x.client_id === clientId && (x.inicio || "0") <= hasta && (!x.fin || x.fin >= desde)).map((x) => {
          const g = num(x.gastado), r = num(x.resultados);
          return { nombre: x.nombre, plataforma: x.plataforma || "", estado: x.estado, objetivo: x.objetivo || "", inicio: x.inicio || "", fin: x.fin || "", presupuesto: num(x.presupuesto), gastado: g, resultados: r, tipo_resultado: x.tipo_resultado || "", alcance: num(x.alcance), clics: num(x.clics), cpr: r ? round2(g / r) : null, ctr: num(x.alcance) ? Math.round(num(x.clics) / num(x.alcance) * 1e4) / 100 : null };
        });
        const ads = { gasto: round2(campanas.reduce((a, x) => a + x.gastado, 0)), resultados: campanas.reduce((a, x) => a + x.resultados, 0), alcance: campanas.reduce((a, x) => a + x.alcance, 0), clics: campanas.reduce((a, x) => a + x.clics, 0) };
        ads.cpr = ads.resultados ? round2(ads.gasto / ads.resultados) : null;
        const proys = this.db.projects.filter((x) => x.client_id === clientId && x.estado !== "Cancelado" && (!["Entregado"].includes(x.estado) || en(x.entregado || x.entrega)));
        const proyectos = proys.map((x) => {
          const d = this.decorate("projects", { ...x });
          return { nombre: x.nombre, estado: x.estado, avance: d._progreso || 0, entrega: x.entrega || "", rondas: `${num(x.rondas_usadas)} de ${num(x.rondas_incluidas)}` };
        });
        const pids = new Set(this.db.projects.filter((x) => x.client_id === clientId).map((x) => x.id));
        const piezas = this.db.pieces.filter((x) => pids.has(x.project_id) && x.estado === "Aprobada" && en(x.aprobada)).map((x) => ({ titulo: x.titulo, tipo: x.tipo || "", version: x.version || 1, aprobada: x.aprobada }));
        const piezasRevision = this.db.pieces.filter((x) => pids.has(x.project_id) && x.estado === "Revisi\xF3n del cliente").map((x) => ({ titulo: x.titulo, tipo: x.tipo || "" }));
        const servicios = (c.servicios || []).map((id) => (this.db.services.find((s) => s.id === id) || {}).nombre).filter(Boolean);
        const planes = this.db.subscriptions.filter((x) => x.client_id === clientId && !["Cancelado", "Terminado"].includes(x.estado)).map((x) => ({ nombre: x.nombre || x.titulo || this.nameOf("services", x.service_id) || "Plan", monto: num(x.monto || x.precio), frecuencia: x.frecuencia || x.periodicidad || "", proximo: x.proximo_cobro || x.proxima_factura || "" }));
        const facturas = this.db.invoices.filter((f) => f.client_id === clientId && !f.anulada).map((f) => ({ codigo: f.codigo, fecha: f.fecha, vence: f.vence || "", concepto: f.concepto || "", ...this.invoiceTotals(f) }));
        const pagos = [];
        for (const f of this.db.invoices.filter((x) => x.client_id === clientId)) for (const pg of (f.pagos || []).filter((y) => y.estado === "Verificado" && en(y.fecha))) pagos.push({ factura: f.codigo, fecha: pg.fecha, metodo: pg.metodo || "", monto: num(pg.monto) });
        const pendientes = facturas.filter((f) => f._saldo > 5e-3).map((f) => ({ codigo: f.codigo, concepto: f.concepto, vence: f.vence, total: f._total, saldo: f._saldo, vencida: !!(f.vence && f.vence < hoy) }));
        const facturacion = { emitidas: facturas.filter((f) => en(f.fecha)).map((f) => ({ codigo: f.codigo, fecha: f.fecha, concepto: f.concepto, total: f._total, saldo: f._saldo })), pagos, pagado: round2(pagos.reduce((a, x) => a + x.monto, 0)), saldo: round2(pendientes.reduce((a, x) => a + x.saldo, 0)), pendientes };
        const tks = this.db.tickets.filter((t) => t.client_id === clientId);
        const solicitudes = { nuevas: tks.filter((t) => en(t.creado)).length, resueltas: tks.filter((t) => en(t.creado) && ["Resuelto", "Cerrado"].includes(t.estado)).length, abiertas: tks.filter((t) => !["Resuelto", "Cerrado"].includes(t.estado)).map((t) => ({ titulo: t.titulo || t.asunto || "Solicitud", estado: t.estado, creado: t.creado })) };
        const DIAS = ["lunes", "martes", "mi\xE9rcoles", "jueves", "viernes", "s\xE1bado", "domingo"];
        const hh = (h) => `${h % 12 || 12} ${h < 12 ? "a. m." : "p. m."}`;
        const ideas = [];
        if (m) {
          const a = m.actual, ca = m.cambio;
          if (a.crecimiento) ideas.push(`La comunidad ${a.crecimiento > 0 ? "creci\xF3" : "baj\xF3"} ${Math.abs(a.crecimiento).toLocaleString("es-VE")} seguidores en el per\xEDodo${a.crecimiento_pct !== null ? ` (${a.crecimiento_pct > 0 ? "+" : ""}${String(a.crecimiento_pct).replace(".", ",")}%)` : ""}.`);
          if (ca.interacciones !== null && ca.interacciones !== void 0) ideas.push(`Las interacciones ${ca.interacciones >= 0 ? "subieron" : "bajaron"} ${String(Math.abs(ca.interacciones)).replace(".", ",")}% frente al per\xEDodo anterior.`);
          if (m.formatos.length > 1) ideas.push(`El formato que mejor funcion\xF3 fue ${m.formatos[0].formato} (${m.formatos[0].promedio.toLocaleString("es-VE")} interacciones en promedio). Conviene darle m\xE1s espacio.`);
          if (pubs.length) ideas.push(`La publicaci\xF3n con m\xE1s interacciones fue \xAB${(pubs[0].texto || pubs[0].tipo || "sin texto").slice(0, 60)}\xBB en ${pubs[0].red}.`);
        }
        if (horas && horas.mejores.length && !horas.poco) ideas.push(`Mejores momentos para publicar: ${horas.mejores.slice(0, 3).map((x) => `${DIAS[x.dia]} ${hh(x.hora)}`).join(", ")}`);
        if (horas && horas.horas_activas.length) ideas.push(`Los seguidores de Instagram est\xE1n m\xE1s conectados cerca de las ${horas.horas_activas.map(hh).join(", ")}`);
        for (const g of metas.filter((x) => x._ritmo === "Atrasada")) ideas.push(`La meta de ${(METRICAS_META[g.metrica] || {}).corto || g.metrica} va atrasada (${g._avance}% con ${g._esperado}% del tiempo).`);
        const estudio = { empresa: this.db.settings.empresa, web: this.db.settings.web, correo: this.db.settings.correo_general, telefono: this.db.settings.telefono, rif: this.db.settings.rif };
        return {
          cliente: { id: c.id, nombre: c.nombre, empresa: c.empresa || "", moneda: c.moneda || "", email: c.email || "" },
          estudio,
          desde,
          hasta,
          dias,
          generado: now(),
          por: u.nombre,
          redes,
          metricas: m ? { actual: m.actual, previo: m.previo, cambio: m.cambio, serie: m.serie, porRed: m.porRed, formatos: m.formatos.slice(0, 8), audiencia: m.audiencia } : null,
          publicaciones: pubs.slice(0, 12),
          total_publicaciones: pubs.length,
          horas,
          metas,
          calendario,
          proximas,
          campanas,
          ads,
          proyectos,
          piezas,
          piezas_revision: piezasRevision,
          servicios,
          planes,
          facturacion,
          solicitudes,
          recomendaciones: ideas,
          nota: this.isClient() ? "" : String(p.nota || "").slice(0, 4e3),
          monedas: this.monedas().filter((x) => x.tasa > 0),
          tasas_al: this.db.settings.tasas_al || null
        };
      },
      // ══════════════ carga de trabajo del equipo ══════════════
      cargaEquipo(p = {}) {
        const u = this.requireUser();
        const { level, scope } = this.perm("carga");
        if (!level) throw acceso("No tienes acceso a la carga del equipo.");
        const semanas = Math.min(4, Math.max(1, Math.round(num(p.semanas) || 2)));
        const hoy = today();
        const fin = masDias(hoy, semanas * 7 - 1);
        const hace7 = masDias(hoy, -6);
        const habiles = (a, b) => {
          let n = 0;
          for (let t = Date.parse(a); t <= Date.parse(b); t += 864e5) {
            const d = new Date(t).getUTCDay();
            if (d !== 0 && d !== 6) n++;
          }
          return n;
        };
        const totalHabiles = habiles(hoy, fin);
        let gente = this.db.users.filter((x) => x.activo && STAFF.includes(x.rol) && (!x.expira || x.expira >= hoy));
        if (scope !== "all") gente = gente.filter((x) => x.id === u.id);
        const ESTADOS_ABIERTOS = (e) => e !== "Hecha";
        const personas = gente.map((x) => {
          const emp = this.db.employees.find((e) => e.usuario_id === x.id && e.estado !== "Inactivo");
          const hSemana = (x.horario ? require_core17().horasDe(x.horario) : 0) || num(emp && emp.horas_semana) || (emp && emp.tipo_contrato === "Medio tiempo" ? 20 : emp && /proyecto|freelance|pasant/i.test(emp.tipo_contrato || "") ? 20 : x.rol === "freelancer" ? 20 : 40);
          const ausencias = this.db.leaves.filter((l) => l.usuario_id === x.id && l.estado === "Aprobada" && l.hasta >= hoy && l.desde <= fin);
          let diasFuera = 0;
          for (const l of ausencias) diasFuera += habiles(l.desde > hoy ? l.desde : hoy, l.hasta < fin ? l.hasta : fin);
          const dePermiso = emp && emp.estado === "De permiso";
          const capacidad = dePermiso ? 0 : Math.max(0, Math.round(hSemana / 5 * Math.max(0, totalHabiles - diasFuera)));
          const tareas = this.db.tasks.filter((t) => t.asignado === x.id && ESTADOS_ABIERTOS(t.estado));
          const enVentana = tareas.filter((t) => !t.vence || t.vence <= fin);
          const atrasadas = tareas.filter((t) => t.vence && t.vence < hoy);
          const sinEstimar = enVentana.filter((t) => !num(t.horas_estimadas)).length;
          const hTareas = enVentana.reduce((a, t) => a + (num(t.horas_estimadas) || (t.prioridad === "Urgente" || t.prioridad === "Alta" ? 3 : 2)), 0);
          const piezas = this.db.pieces.filter((z) => z.asignado === x.id && !["Aprobada", "Revisi\xF3n del cliente"].includes(z.estado));
          const hPiezas = piezas.filter((z) => !z.fecha_limite || z.fecha_limite <= fin).length * 2;
          const posts = this.db.posts.filter((z) => z.responsable === x.id && !["Publicado"].includes(z.estado) && String(z.fecha || "").slice(0, 10) >= hoy && String(z.fecha || "").slice(0, 10) <= fin);
          const hPosts = posts.length * 0.5;
          const horas = Math.round((hTareas + hPiezas + hPosts) * 10) / 10;
          const registradas = round2(this.db.timesheets.filter((h) => h.usuario_id === x.id && h.fecha >= hace7 && h.fecha <= hoy).reduce((a, h) => a + num(h.horas), 0));
          const pct = capacidad ? Math.round(horas / capacidad * 100) : horas ? 999 : 0;
          const nivel = capacidad === 0 ? "Ausente" : pct > 100 ? "Saturado" : pct > 85 ? "Lleno" : pct >= 40 ? "Normal" : "Libre";
          const hoyFuera = ausencias.find((l) => l.desde <= hoy && l.hasta >= hoy);
          const proyectos = this.db.projects.filter((z) => !["Entregado", "Cancelado"].includes(z.estado) && (z.pm === x.id || (z.equipo || []).includes(x.id))).length;
          return {
            id: x.id,
            nombre: x.nombre,
            rol: x.rol,
            puesto: x.puesto || emp && emp.puesto || "",
            horas_semana: hSemana,
            capacidad,
            horas,
            pct,
            nivel,
            tareas: tareas.length,
            en_ventana: enVentana.length,
            atrasadas: atrasadas.length,
            sin_estimar: sinEstimar,
            vencen_semana: tareas.filter((t) => t.vence && t.vence >= hoy && t.vence <= masDias(hoy, 6)).length,
            piezas: piezas.length,
            publicaciones: posts.length,
            proyectos,
            registradas,
            ausente_hoy: hoyFuera ? hoyFuera.tipo || "Ausencia" : "",
            ausencias: ausencias.map((l) => ({ tipo: l.tipo, desde: l.desde, hasta: l.hasta })),
            lista: [...atrasadas, ...enVentana.filter((t) => !atrasadas.includes(t))].slice(0, 12).map((t) => ({ id: t.id, titulo: t.titulo, vence: t.vence || "", estado: t.estado, prioridad: t.prioridad || "", horas: num(t.horas_estimadas) || null, proyecto: this.nameOf("projects", t.project_id), atrasada: !!(t.vence && t.vence < hoy) }))
          };
        }).sort((a, b) => b.pct - a.pct);
        const sinAsignar = this.db.tasks.filter((t) => !t.asignado && t.estado !== "Hecha").length;
        return { desde: hoy, hasta: fin, semanas, dias_habiles: totalHabiles, personas, resumen: { saturados: personas.filter((x) => x.nivel === "Saturado").length, llenos: personas.filter((x) => x.nivel === "Lleno").length, libres: personas.filter((x) => x.nivel === "Libre").length, ausentes: personas.filter((x) => x.nivel === "Ausente" || x.ausente_hoy).length, sin_asignar: sinAsignar, horas: Math.round(personas.reduce((a, x) => a + x.horas, 0)), capacidad: personas.reduce((a, x) => a + x.capacidad, 0) } };
      },
      // ══════════════ verificación en dos pasos ══════════════
      debeActivar2fa(u = this.user) {
        return !!(u && (this.db.settings.exigir_2fa ? !CLIENT_ROLES.includes(u.rol) : this.roles2fa().includes(u.rol)) && !(u.totp && u.totp.activo));
      },
      verificarTotp(u, codigo) {
        const t = u.totp;
        if (!t || !t.activo) return false;
        const c = String(codigo || "").replace(/\s/g, "");
        if (/^\d{6}$/.test(c)) {
          const paso = Math.floor(Date.now() / 3e4);
          for (const d of [0, -1, 1]) if (totp(t.secreto, paso + d) === c && (t.ultimo_paso || 0) < paso + d) {
            t.ultimo_paso = paso + d;
            return true;
          }
          return false;
        }
        const h = hashCodigo(c);
        const i = (t.codigos || []).indexOf(h);
        if (i >= 0 && c.length >= 10) {
          t.codigos.splice(i, 1);
          t.usado_respaldo = now();
          return true;
        }
        return false;
      },
      dosPasosPreparar() {
        const u = this.user;
        if (!u) throw acceso("Tu sesi\xF3n termin\xF3. Vuelve a entrar.");
        if (u.totp && u.totp.activo) throw entrada("La verificaci\xF3n en dos pasos ya est\xE1 activa.");
        const secreto = b32enc(crypto.randomBytes(20));
        u.totp_pendiente = { secreto, creado: now() };
        this.persist();
        const emisor = encodeURIComponent(this.db.settings.empresa ? `${this.db.settings.empresa} OS` : "Delirium OS");
        return { secreto: secreto.match(/.{1,4}/g).join(" "), uri: `otpauth://totp/${emisor}:${encodeURIComponent(u.email)}?secret=${secreto}&issuer=${emisor}&algorithm=SHA1&digits=6&period=30` };
      },
      dosPasosActivar(codigo) {
        const u = this.user;
        if (!u) throw acceso("Tu sesi\xF3n termin\xF3. Vuelve a entrar.");
        const pend = u.totp_pendiente;
        if (!pend || Date.now() - Date.parse(pend.creado) > 30 * 6e4) throw entrada("Empieza de nuevo: el c\xF3digo QR venci\xF3.");
        const c = String(codigo || "").replace(/\s/g, "");
        const paso = Math.floor(Date.now() / 3e4);
        if (![0, -1, 1].some((d) => totp(pend.secreto, paso + d) === c)) throw entrada("El c\xF3digo no coincide. Revisa que la hora del tel\xE9fono est\xE9 en autom\xE1tico y escribe el c\xF3digo que aparece ahora.");
        const codigos = nuevosCodigos();
        u.totp = { secreto: pend.secreto, activo: true, desde: now(), ultimo_paso: paso, codigos: codigos.map(hashCodigo) };
        delete u.totp_pendiente;
        this.audit("editar", "equipo", u.id, "Activ\xF3 la verificaci\xF3n en dos pasos");
        this.persist();
        return { codigos };
      },
      dosPasosDesactivar(password) {
        const u = this.requireUser();
        const { verifyPw } = require_core();
        if (!verifyPw(password, u.password)) throw acceso("La contrase\xF1a no es correcta.");
        if (this.db.settings.exigir_2fa && !CLIENT_ROLES.includes(u.rol) || this.roles2fa().includes(u.rol)) throw entrada("La verificaci\xF3n en dos pasos es obligatoria para tu rol. No se puede desactivar.");
        delete u.totp;
        delete u.totp_pendiente;
        this.audit("editar", "equipo", u.id, "Desactiv\xF3 la verificaci\xF3n en dos pasos");
        this.persist();
        return true;
      },
      dosPasosCodigos(password) {
        const u = this.requireUser();
        const { verifyPw } = require_core();
        if (!verifyPw(password, u.password)) throw acceso("La contrase\xF1a no es correcta.");
        if (!u.totp || !u.totp.activo) throw entrada("Primero activa la verificaci\xF3n en dos pasos.");
        const codigos = nuevosCodigos();
        u.totp.codigos = codigos.map(hashCodigo);
        this.audit("editar", "equipo", u.id, "Gener\xF3 nuevos c\xF3digos de respaldo");
        this.persist();
        return { codigos };
      },
      // ══════════════ bandeja de comentarios y mensajes ══════════════
      bandeja(p = {}) {
        this.requireUser();
        const { level } = this.perm("bandeja");
        if (!level) throw acceso("No tienes acceso a la bandeja de redes.");
        const cuentas = this.db.socials.filter((c) => ["Instagram", "Facebook"].includes(c.red) || c.red === "TikTok" && c.tiktok_bandeja);
        let items = this.db.inbox.slice();
        if (p.client_id) items = items.filter((x) => (x.client_id || "estudio") === p.client_id);
        if (p.red) items = items.filter((x) => x.red === p.red);
        if (p.tipo) items = items.filter((x) => x.tipo === p.tipo);
        const conteo = { Nuevo: 0, Respondido: 0, Resuelto: 0, Oculto: 0 };
        for (const x of items) conteo[x.estado] = (conteo[x.estado] || 0) + 1;
        conteo.negativos = items.filter((x) => x.negativo && x.estado === "Nuevo").length;
        if (p.negativo) items = items.filter((x) => x.negativo);
        if (p.estado) items = items.filter((x) => x.estado === p.estado);
        if (p.q) {
          const q = String(p.q).toLowerCase();
          items = items.filter((x) => `${x.autor} ${x.texto} ${x.post_texto || ""} ${(x.mensajes || []).map((y) => y.texto).join(" ")}`.toLowerCase().includes(q));
        }
        items.sort((a, b) => (b.fecha || "") < (a.fecha || "") ? -1 : 1);
        const nombre = (id) => id ? this.nameOf("clients", id) : "Delirium Studios";
        return {
          conteo,
          total: items.length,
          puede: this.canWrite("bandeja") && !this.isClient(),
          items: items.slice(0, Math.min(400, num(p.max) || 200)).map((x) => ({ ...x, cliente: nombre(x.client_id), cuenta: (cuentas.find((c) => c.id === x.cuenta_id) || {}).nombre || "" })),
          cuentas: cuentas.filter((c) => c.cuenta_ext).map((c) => ({ id: c.id, red: c.red, nombre: c.nombre, cliente: nombre(c.client_id), bandeja_al: c.bandeja_al || null, aviso: c.bandeja_aviso || "" })),
          tiktok: this.db.socials.some((c) => c.red === "TikTok" && c.cuenta_ext && !c.tiktok_bandeja)
        };
      },
      bandejaGuardar(c, r) {
        if (!c || !r) return 0;
        let nuevos = 0;
        const hace = dStr(Date.now() - 120 * 864e5);
        const upsert = (x, tipo) => {
          const id = `${c.id}:${tipo}:${x.ext_id}`;
          let it = this.db.inbox.find((y) => y.id === id);
          if (!it) {
            it = { id, cuenta_id: c.id, client_id: c.client_id || null, red: c.red, tipo, estado: x.nuestro ? "Respondido" : "Nuevo", creado: now(), respuestas: [] };
            this.db.inbox.push(it);
            if (!x.nuestro) nuevos++;
          }
          const antes = it.ultimo_cliente;
          Object.assign(it, { ...x, respuestas: it.respuestas || [] });
          delete it.nuestro;
          if (tipo === "mensaje" && antes && x.ultimo_cliente && x.ultimo_cliente > antes && ["Respondido", "Resuelto"].includes(it.estado)) {
            it.estado = "Nuevo";
            nuevos++;
          }
          if (x.oculto) it.estado = "Oculto";
          else if (it.estado === "Oculto") it.estado = "Nuevo";
          if (tipo === "comentario" && (x.respuestas_red || []).some((y) => y.nuestro) && it.estado === "Nuevo") it.estado = "Respondido";
        };
        for (const x of r.comentarios || []) upsert(x, "comentario");
        for (const x of r.mensajes || []) upsert(x, "mensaje");
        this.db.inbox = this.db.inbox.filter((x) => (x.fecha || x.creado || "") >= hace || x.estado === "Nuevo");
        const deCuenta = this.db.inbox.filter((x) => x.cuenta_id === c.id);
        if (deCuenta.length > 1500) {
          const fuera = new Set(deCuenta.sort((a, b) => a.fecha < b.fecha ? -1 : 1).slice(0, deCuenta.length - 1500).map((x) => x.id));
          this.db.inbox = this.db.inbox.filter((x) => !fuera.has(x.id));
        }
        c.bandeja_al = now();
        c.bandeja_aviso = (r.avisos || []).filter((x) => !/no deja leer mensajes directos/.test(x)).join(" ").slice(0, 400);
        const negativos = this.marcarNegativos();
        if (negativos) this.emit("redes", `\u26A0\uFE0F ${negativos} comentario${negativos === 1 ? "" : "s"} negativo${negativos === 1 ? "" : "s"} en ${c.red}`, `${c.nombre} \xB7 ${this.nameOf("clients", c.client_id) || "Delirium Studios"}: revisa la bandeja.`);
        if (nuevos) this.emit("redes", `${nuevos} comentario${nuevos === 1 ? "" : "s"} o mensaje${nuevos === 1 ? "" : "s"} nuevo${nuevos === 1 ? "" : "s"} en ${c.red}`, `${c.nombre} \xB7 ${this.nameOf("clients", c.client_id) || "Delirium Studios"}`);
        return nuevos;
      },
      bandejaItem(id, escribir = true) {
        this.requireUser();
        if (this.isClient() || !(escribir ? this.canWrite("bandeja") : this.canRead("bandeja"))) throw acceso("Tu rol no puede responder en la bandeja.");
        const it = this.db.inbox.find((x) => x.id === id);
        if (!it) throw entrada("Este comentario ya no est\xE1 en la bandeja.");
        const c = this.db.socials.find((x) => x.id === it.cuenta_id);
        if (!c) throw entrada("La cuenta de este comentario ya no est\xE1 conectada.");
        return { it, c };
      },
      bandejaRespondida(it, texto, res = {}) {
        it.respuestas = it.respuestas || [];
        it.respuestas.push({ texto: String(texto).slice(0, 2e3), fecha: now(), por: this.user ? this.user.nombre : "", id: res.id || null, privada: !!res.privada });
        if (it.tipo === "mensaje") {
          it.mensajes = it.mensajes || [];
          it.mensajes.push({ texto: String(texto).slice(0, 2e3), fecha: now(), nuestro: true });
        }
        it.estado = "Respondido";
        it.respondido = now();
        this.audit("editar", "bandeja", it.id, `Respondi\xF3 en ${it.red}: ${String(texto).slice(0, 60)}`);
      },
      bandejaMarcar(id, estado) {
        const { it } = this.bandejaItem(id);
        if (!["Nuevo", "Resuelto", "Respondido"].includes(estado)) throw entrada("Estado no v\xE1lido.");
        it.estado = estado;
        it.marcado_por = this.user.nombre;
        this.persist();
        return { id: it.id, estado: it.estado };
      }
    };
    module.exports = { metodos, METRICAS_META, MONEDAS_BASE, totp, b32dec };
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
\u2022 En cada versi\xF3n nueva: Releases \u2192 Draft a new release \u2192 etiqueta v1.5.0 (la versi\xF3n) \u2192 adjunta el instalador .exe y su archivo .sha256 \u2192 Publish.
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
      },
      {
        v: 4,
        titulo: "Prospecci\xF3n diaria: de 40 a 50 mensajes sin perder seguimientos",
        categoria: "Proceso",
        visibilidad: "Todo el equipo",
        contenido: `Todo pasa en Hoy \xB7 prospecci\xF3n.

1. Cargar la lista: pesta\xF1a "Importar prospectos" \u2192 sube un CSV o Excel (.xlsx) \u2192 elige qu\xE9 es cada columna \u2192 vista previa \u2192 importar. La app salta los duplicados (mismo Instagram, tel\xE9fono, correo o nombre + ciudad).
2. Cada ma\xF1ana abre "Hoy": arriba los seguimientos que tocan, abajo los mensajes nuevos. El contador dice cu\xE1ntos llevas de la meta (por ejemplo 23 de 50).
3. Por cada prospecto: "Copiar" (el mensaje sale con su nombre, negocio, ciudad y detalle), "Abrir perfil", lo env\xEDas t\xFA desde Instagram o WhatsApp y pulsas "Enviado".
4. La app agenda sola: seguimiento a los 3 d\xEDas y el \xFAltimo a los 7 d\xEDas.
5. Si responde: "M\xE1s\u2026 \u2192 Respondi\xF3". Si agenda llamada: con fecha. Si no va: "Descartar" con el motivo (sirve para el embudo).
6. El viernes revisa "Embudo semanal": mensajes, respuestas, llamadas, pruebas y planes, con el % entre cada paso y la semana anterior.

Reglas
- Nunca se automatizan mensajes directos en Instagram: se env\xEDan a mano (si no, Instagram bloquea la cuenta).
- Personaliza el campo "Detalle" (algo real de su cuenta): sube mucho la respuesta.
- Las plantillas se editan en Plantillas de mensajes, por tipo de prospecto y en espa\xF1ol o ingl\xE9s.`
      },
      {
        v: 4,
        titulo: "Videos, invitaciones, horarios y reportar problemas",
        categoria: "Proceso",
        visibilidad: "Todo el equipo",
        contenido: `Videos
- Los videos NUNCA se suben a Delirium OS: la nube gratis tiene 1 GB en total y 50 MB por archivo.
- S\xFAbelos a Google Drive \u2192 Compartir \u2192 "Cualquier persona con el enlace" \u2192 pega el enlace en la pieza. El cliente lo ve en su portal con miniatura y reproductor.

Accesos sin correo
- Usuarios y roles \u2192 abre la persona \u2192 "Copiar invitaci\xF3n": sale un mensaje listo para WhatsApp con un enlace que sirve una sola vez y vence en 3 d\xEDas.
- Sirve tambi\xE9n para quien olvid\xF3 su contrase\xF1a.

Horarios
- Trabajamos lunes a viernes con horario flexible en hora de Venezuela. Cada quien arma el suyo en Mi cuenta \u2192 Mi horario (o Carga del equipo \u2192 Horarios del equipo).
- La carga de trabajo usa esas horas como capacidad.

Reportar un problema
- En cada pantalla, el bot\xF3n del bichito (arriba a la derecha) manda a Direcci\xF3n por Discord lo que escribas, la pantalla, la versi\xF3n y una captura.
- Las contrase\xF1as y datos privados salen tapados; en la b\xF3veda, n\xF3mina y fichas del personal no se manda captura.`
      },
      {
        v: 4,
        titulo: "Plan gratis de Supabase: l\xEDmites, respaldos y qu\xE9 vigilar",
        categoria: "Proceso",
        visibilidad: "Solo direcci\xF3n",
        contenido: `L\xEDmites del plan gratis: base de datos 500 MB, archivos 1 GB (50 MB por archivo) y 5 GB de tr\xE1fico al mes. Se ven en Ajustes \u2192 Copias y versi\xF3n, con aviso al 70% y al 90% en Inicio.

Qu\xE9 hace la nube sola
- Cada 5 minutos la tarea programada revisa publicaciones, m\xE9tricas y la bandeja, y mantiene el proyecto activo (Supabase pausa los proyectos gratis despu\xE9s de 7 d\xEDas sin actividad).
- Una vez al d\xEDa guarda una copia completa de los datos en los archivos privados (se conservan las \xFAltimas 7). Se descarga desde Ajustes.
- La app de escritorio de Direcci\xF3n guarda adem\xE1s una copia diaria en la PC (30 d\xEDas).

Si algo se acerca al l\xEDmite
- Archivos: borra adjuntos viejos o p\xE1salos a Drive; los videos siempre por enlace.
- Tr\xE1fico: evita adjuntar im\xE1genes pesadas; usa enlaces de Drive.
- Si el "\xFAltimo ping" tiene m\xE1s de 2 d\xEDas, revisa en Supabase \u2192 Integrations \u2192 Cron que la tarea "delirium-redes" siga activa.`
      },
      {
        v: 5,
        titulo: "Cobrar a clientes de EE. UU., Espa\xF1a y Panam\xE1",
        categoria: "Proceso",
        visibilidad: "Solo direcci\xF3n",
        contenido: `Moneda y m\xE9todos
- Los clientes fuera de Venezuela quedan en USD. En Ajustes \u2192 Cobros pon los datos de Zelle, PayPal, Payoneer, Binance y Pago M\xF3vil: el cliente ve solo los de su moneda, en su factura y en su portal.

Sin pago, no se empieza
- Un proyecto no pasa a "En curso" hasta que Finanzas verifica el adelanto (50%; 100% en Prueba y Plan mensual).
- Solo el CEO puede empezar sin el adelanto: la app pide el motivo y lo guarda en el Registro de actividad.

Prueba de 4 reels (400 a 600 USD)
- Crea el proyecto con tipo "Prueba": cierra a los 7 d\xEDas. El d\xEDa 5 Inicio avisa: "Proponer plan" crea la cotizaci\xF3n del plan mensual (1.500 USD) con la opci\xF3n de 3 meses por adelantado con 10% de descuento.

Marca blanca para agencias
- Plan de tipo "Marca blanca (por pieza)" con precio por reel. A fin de mes, "Facturar lo entregado" cobra las piezas aprobadas. En la ficha del cliente marca "Marca blanca" para que su portal y sus PDF no muestren Delirium.

Idioma y hora
- En la ficha: idioma (espa\xF1ol o ingl\xE9s) y zona horaria. Las publicaciones se programan en la hora del cliente y se ve tambi\xE9n la de Caracas.`
      },
      {
        v: 5,
        titulo: "Pagar a freelancers y vendedores",
        categoria: "Proceso",
        visibilidad: "Solo direcci\xF3n",
        contenido: `Freelancers por pieza
- Pon "Costo de producci\xF3n" y el responsable en cada pieza. Al aprobarse queda un pago pendiente, que se habilita cuando el cliente pag\xF3 ese mes (as\xED no adelantas dinero).
- Comisiones y pagos por pieza \u2192 "Marcar pagado" cuando transfieras.

Vendedores y socios
- En la ficha del cliente: "Tra\xEDdo por". Vendedores: 10\u201315% de cada pago verificado durante los primeros 3 meses. Socios o clientes que recomiendan: 10% del primer mes. Se configura en Ajustes \u2192 Cobros.

Margen
- Margen por cliente: cobrado del mes menos producci\xF3n y comisiones. Solo CEO, COO y Finanzas.

Alta y baja
- Usuarios y roles \u2192 "Alta de freelancer": acceso con vencimiento, proyecto e invitaci\xF3n por WhatsApp.
- "Dar de baja": quita el acceso, lo saca de los proyectos, deja sus tareas sin responsable y te dice qu\xE9 contrase\xF1as de la b\xF3veda cambiar. Qu\xEDtale tambi\xE9n Drive y las cuentas de los clientes.
- La verificaci\xF3n en dos pasos es obligatoria para CEO, COO y Finanzas.`
      },
      {
        v: 6,
        titulo: "Cuando entra un cliente nuevo",
        categoria: "Proceso",
        visibilidad: "Todo el equipo",
        contenido: `1. Bienvenida: el cliente entra a su portal y llena una vez el formulario (marca, tono, p\xFAblico, competidores, horarios, fotos, colores, lo que NO quiere ver y c\xF3mo nos da acceso). En su ficha ves el % y en Inicio sale un aviso si falta.
2. Acceso como socio: en el portal hay una gu\xEDa paso a paso para que nos agregue como socio en Meta Business Suite. Nunca pedimos contrase\xF1as. Cuando lo veas en Meta \u2192 Configuraci\xF3n \u2192 Socios, abre su ficha \u2192 "Acceso en Meta" \u2192 Listo. Pon el ID del negocio del estudio en Ajustes \u2192 Atenci\xF3n y producci\xF3n.
3. Kit de marca: en la ficha del cliente llena colores, tipograf\xEDas, logos, tono, ejemplos y prohibiciones. Lo abre cualquiera que trabaje en ese cliente desde el proyecto o la pieza ("Kit de marca"), sin ver precios.
4. Si el cliente quiere aprobar guiones, marca "El cliente aprueba el guion antes de editar".`
      },
      {
        v: 6,
        titulo: "Producir el mes de un cliente",
        categoria: "Proceso",
        visibilidad: "Todo el equipo",
        contenido: `- Plan que se crea solo: al renovarse un plan (factura autom\xE1tica 3 d\xEDas antes) la app crea las piezas del mes (12 por defecto, se cambia en el plan) con fechas repartidas y responsables seg\xFAn la carga. Tambi\xE9n puedes usar "Crear piezas del mes" en el plan.
- Guion para aprobar: si el cliente aprueba guiones, la pieza empieza en "Guion para aprobar". El cliente lo aprueba o comenta desde su portal y pasa sola a "En producci\xF3n".
- Banco de ideas (Operaci\xF3n \u2192 Banco de ideas): ideas, tendencias, referencias y carpetas de material con etiquetas. "Convertir en pieza" la manda al proyecto abierto del cliente.
- Lista de revisi\xF3n: antes de "Revisi\xF3n del cliente" marca 9:16, duraci\xF3n, subt\xEDtulos, m\xFAsica con licencia registrada, logo, ortograf\xEDa y portada. Sin la lista completa no se puede enviar. Se edita por tipo en Ajustes \u2192 Atenci\xF3n y producci\xF3n.
- Carga del equipo: piezas y horas por persona esta semana y la pr\xF3xima, aviso cuando alguien pasa su tope y cu\xE1ntos clientes m\xE1s caben antes de vender.`
      },
      {
        v: 6,
        titulo: "Atender y retener clientes",
        categoria: "Proceso",
        visibilidad: "Todo el equipo",
        contenido: `- 24 horas: si un mensaje o solicitud de un cliente pasa 24 h h\xE1biles (lunes a viernes 9 a 18, hora de Venezuela; se cambia en Ajustes) sin respuesta, avisamos a su responsable; a las 48 h tambi\xE9n a Direcci\xF3n.
- Respuestas guardadas (Comercial): "Ya estamos en ello", "Aqu\xED est\xE1 la versi\xF3n 2", "Recordatorio de pago"\u2026 en espa\xF1ol e ingl\xE9s, con variables. En una solicitud usa "Usar respuesta guardada". Siempre se env\xEDan a mano.
- Avisos al celular: Mi cuenta \u2192 Avisos al celular, desde la versi\xF3n web en el tel\xE9fono. En iPhone primero "Agregar a inicio". Cada persona elige qu\xE9 avisos recibe.
- Encuesta: cada mes el portal pregunta "Del 1 al 10, \xBFnos recomendar\xEDas?". 9-10 van a la lista para pedir referidos; 6 o menos avisa a Direcci\xF3n.
- Caso de \xE9xito: ficha del cliente \u2192 "Caso de \xE9xito" (con o sin su nombre). La frase del cliente solo aparece si la aprob\xF3.`
      },
      {
        v: 6,
        titulo: "Renovaciones, cobranza y cierre de clientes",
        categoria: "Proceso",
        visibilidad: "Solo direcci\xF3n",
        contenido: `- 5 d\xEDas antes de renovar avisamos; 3 d\xEDas antes se crea la factura sola (Ajustes \u2192 Atenci\xF3n y producci\xF3n \u2192 "Facturar los planes solos").
- Recordatorios el d\xEDa del vencimiento, a los 3 y a los 7 d\xEDas con el mensaje listo en Finanzas \u2192 Renovaciones y cobranza (botones Copiar y WhatsApp; los env\xEDas t\xFA).
- Si no paga, Direcci\xF3n pausa el servicio con un clic: los planes quedan en pausa y no se crean piezas nuevas hasta reactivarlo.
- Clientes en riesgo (solo Direcci\xF3n): puntaje por pagos atrasados, rondas agotadas, aprobaciones lentas, mensajes sin contestar, ca\xEDda de interacciones y la encuesta, con la acci\xF3n sugerida.
- Cierre ordenado: ficha del cliente \u2192 "Cerrar cliente": archivos finales, quitar accesos (Meta, b\xF3veda, portal), facturas pendientes, motivo y mensaje de despedida. Pasa a "Antiguo cliente" y puede volver.
- Panel de la meta (CEO, COO y Finanzas): ingreso recurrente, lo que falta para la meta (15.000 USD por defecto), ingresos por l\xEDnea, por cobrar, margen y caja del mes.
- Exportar: Ajustes \u2192 Copias \u2192 "Exportar todo" (solo el CEO) o, para un cliente, su ficha \u2192 "Exportar sus datos" (sin costos ni notas internas).`
      },
      {
        v: 7,
        titulo: "Idioma de la app e instalaci\xF3n",
        categoria: "Gu\xEDa",
        visibilidad: "Todo el equipo",
        contenido: `Idioma
- La app del equipo est\xE1 en espa\xF1ol, English y Portugu\xEAs. Cada persona lo cambia en Mi cuenta \u2192 Idioma de la app; tambi\xE9n se puede elegir en la pantalla de entrada.
- Direcci\xF3n pone el idioma por defecto del equipo en Ajustes \u2192 Estudio \u2192 Valores por defecto.
- Se traduce la interfaz (men\xFAs, botones, formularios, avisos). Lo que escribe el equipo (nombres de clientes, notas, mensajes) y los manuales quedan como se escribieron.

Instalaci\xF3n
- El instalador detecta el idioma de Windows y muestra la ventana de Delirium: Bienvenida, Opciones (carpeta y accesos directos), Instalando y Listo. No pide permisos de administrador ni contrase\xF1as.
- Las actualizaciones autom\xE1ticas se instalan solas en segundo plano, como siempre.

Solo para el equipo
- La app de escritorio es solo para los trabajadores. Los clientes entran a su portal desde la p\xE1gina web, con el enlace que les env\xEDa el estudio.`
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

// src/main/core18.js
var require_core18 = __commonJS({
  "src/main/core18.js"(exports, module) {
    var crypto = (init_shim_crypto(), __toCommonJS(shim_crypto_exports));
    var now = () => (/* @__PURE__ */ new Date()).toISOString();
    var ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    var today = () => ymd(/* @__PURE__ */ new Date());
    var num = (v) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };
    var round2 = (n) => Math.round(num(n) * 100) / 100;
    var err = (code, msg) => Object.assign(new Error(msg), { code });
    var acceso = (msg) => err("ACCESS", msg);
    var entrada = (msg) => err("INPUT", msg);
    var masDias = (dia, n) => new Date(Date.parse(dia + "T12:00:00Z") + n * 864e5).toISOString().slice(0, 10);
    var mesDe = (f) => String(f || "").slice(0, 7);
    var sumarMeses = (dia, n) => {
      const d = /* @__PURE__ */ new Date(dia + "T12:00:00Z");
      d.setUTCMonth(d.getUTCMonth() + n);
      return d.toISOString().slice(0, 10);
    };
    var METODOS_BASE = [
      { metodo: "Zelle", monedas: ["USD"], datos: "", instrucciones: "Env\xEDa el pago al correo o tel\xE9fono indicado y reporta la referencia en tu portal.", activo: true },
      { metodo: "PayPal", monedas: ["USD", "EUR"], datos: "", instrucciones: 'Paga como "Amigos y familiares" o con la factura de PayPal; la comisi\xF3n de PayPal corre por cuenta del cliente.', activo: true },
      { metodo: "Payoneer", monedas: ["USD", "EUR"], datos: "", instrucciones: "Paga con la solicitud de pago de Payoneer que te enviamos o al correo indicado.", activo: true },
      { metodo: "Binance", monedas: ["USDT", "USD"], datos: "", instrucciones: "Binance Pay o USDT por la red indicada. Revisa la red antes de enviar.", activo: true },
      { metodo: "Pago M\xF3vil", monedas: ["VES"], datos: "", instrucciones: "Al cambio del d\xEDa. Reporta la referencia en tu portal.", activo: true }
    ];
    var ROLES_2FA = ["founder", "coo", "finanzas"];
    var metodos = {
      // ══════════════ métodos de pago ══════════════
      metodosPago() {
        const s = this.db.settings;
        return Array.isArray(s.metodos_info) && s.metodos_info.length ? s.metodos_info : METODOS_BASE;
      },
      metodosPara(clientId) {
        const c = this.db.clients.find((x) => x.id === clientId) || {};
        const mon = c.moneda || (c.pais && c.pais !== "Venezuela" ? "USD" : "");
        return this.metodosPago().filter((m) => m.activo !== false && (!mon || !(m.monedas || []).length || m.monedas.includes(mon))).map((m) => ({ metodo: m.metodo, datos: m.datos || "", instrucciones: m.instrucciones || "" }));
      },
      // ══════════════ sin pago, no se empieza ══════════════
      adelantoRequerido(p) {
        if (!num(p.precio) && !num(p.adelanto_monto)) return 0;
        const pct = p.tipo_proyecto === "Prueba" || p.tipo_proyecto === "Plan mensual" ? 100 : num(this.db.settings.adelanto_pct ?? 50);
        return round2(num(p.adelanto_monto) || num(p.precio) * pct / 100);
      },
      adelantoVerificado(p) {
        return round2(this.db.invoices.filter((f) => f.project_id === p.id && !f.anulada).reduce((a, f) => a + (f.pagos || []).filter((x) => x.estado === "Verificado").reduce((b, x) => b + num(x.monto), 0), 0));
      },
      revisarAdelanto(data, existing) {
        const p = { ...existing || {}, ...data };
        const entra = p.estado === "En curso" && (!existing || existing.estado !== "En curso");
        if (!entra) {
          delete data.saltar_adelanto;
          return;
        }
        const req = this.adelantoRequerido(p);
        const pagado = existing ? this.adelantoVerificado(existing) : 0;
        if (!req || pagado >= req) {
          delete data.saltar_adelanto;
          return;
        }
        if (data.saltar_adelanto) {
          if (!this.user || this.user.rol !== "founder") throw acceso("Solo el CEO puede empezar un proyecto sin el adelanto verificado.");
          data.adelanto_saltado = { por: this.user.nombre, fecha: now(), motivo: String(data.saltar_adelanto === true ? "" : data.saltar_adelanto).slice(0, 300), faltaba: round2(req - pagado) };
          delete data.saltar_adelanto;
          this._auditarSalto = { nombre: p.nombre, faltaba: round2(req - pagado) };
          return;
        }
        throw entrada(`Sin pago, no se empieza: falta que Finanzas verifique el adelanto de ${p.nombre} (${round2(req - pagado)} de ${req}). Solo el CEO puede saltarse esta regla.`);
      },
      // ══════════════ paquete Prueba ══════════════
      pruebasPorProponer() {
        const hoy = today();
        return this.db.projects.filter((p) => p.tipo_proyecto === "Prueba" && !["Entregado", "Cancelado"].includes(p.estado) && !p.plan_propuesto && p.inicio && masDias(p.inicio, 4) <= hoy).map((p) => ({ id: p.id, nombre: p.nombre, cliente: this.nameOf("clients", p.client_id), cierre: p.entrega || masDias(p.inicio, 7), pm: p.pm || null }));
      },
      proponerPlan(id) {
        const u = this.requireUser();
        if (!this.canWrite("cotizaciones")) throw acceso("Tu rol no puede crear cotizaciones.");
        const p = this.rawScoped("proyectos", id);
        if (p.tipo_proyecto !== "Prueba") throw entrada("Esto es para proyectos de tipo Prueba.");
        const s = this.db.settings;
        const precio = num(s.precio_plan_mensual) || 1500;
        const desc = num(s.descuento_3_meses ?? 10);
        const tres = round2(precio * 3 * (1 - desc / 100));
        const en = (this.db.clients.find((c) => c.id === p.client_id) || {}).idioma === "en";
        const q = this.save("cotizaciones", {
          client_id: p.client_id,
          titulo: en ? "Monthly reels plan" : "Plan mensual de reels",
          estado: "Borrador",
          fecha: today(),
          vence: masDias(today(), 7),
          lineas: [{ descripcion: en ? `Monthly plan: ${num(s.reels_plan_mensual) || 12} reels, paid in advance` : `Plan mensual: ${num(s.reels_plan_mensual) || 12} reels, cobrado por adelantado`, cantidad: 1, precio }],
          notas: en ? `Option B \u2014 3 months paid in advance with ${desc}% off: ${tres} (instead of ${precio * 3}).
Work starts once the payment is confirmed.` : `Opci\xF3n B \u2014 3 meses por adelantado con ${desc}% de descuento: ${tres} (en vez de ${precio * 3}).
El trabajo empieza cuando se confirma el pago.`,
          opcion_trimestral: { meses: 3, descuento: desc, total: tres },
          de_prueba: p.id
        });
        p.plan_propuesto = q.codigo;
        this.audit("crear", "cotizaciones", q.id, `Plan propuesto al cerrar la prueba ${p.nombre}`);
        this.persist();
        return q;
      },
      // ══════════════ marca blanca: precio por pieza ══════════════
      entregadosMes(sb, mes = today().slice(0, 7)) {
        const pids = new Set(this.db.projects.filter((p) => p.client_id === sb.client_id && (!sb.project_id || p.id === sb.project_id)).map((p) => p.id));
        return this.db.pieces.filter((z) => pids.has(z.project_id) && z.estado === "Aprobada" && mesDe(z.aprobada) === mes);
      },
      facturarEntregado(id, mes) {
        this.requireUser();
        if (!this.canWrite("facturas")) throw acceso("Solo Finanzas o Direcci\xF3n facturan.");
        const sb = this.rawScoped("planes", id);
        if (!/marca blanca/i.test(sb.tipo || "")) throw entrada("Este plan no es de marca blanca por pieza.");
        mes = /^\d{4}-\d{2}$/.test(String(mes || "")) ? mes : today().slice(0, 7);
        sb.facturado_meses = sb.facturado_meses || {};
        if (sb.facturado_meses[mes]) throw entrada(`El mes ${mes} ya se factur\xF3 (${sb.facturado_meses[mes]}).`);
        const n = this.entregadosMes(sb, mes).length;
        if (!n) throw entrada("No hay piezas aprobadas en ese mes.");
        const en = (this.db.clients.find((c) => c.id === sb.client_id) || {}).idioma === "en";
        const f = this.save("facturas", {
          client_id: sb.client_id,
          project_id: sb.project_id || null,
          concepto: `${sb.nombre} \xB7 ${mes}`,
          fecha: today(),
          vence: masDias(today(), 7),
          lineas: [{ descripcion: en ? `Reels delivered in ${mes}` : `Reels entregados en ${mes}`, cantidad: n, precio: num(sb.precio_reel) }],
          impuesto_pct: 0,
          desde_plan: sb.id
        });
        sb.facturado_meses[mes] = f.codigo;
        this.persist();
        return f;
      },
      // ══════════════ pago por pieza a freelancers ══════════════
      clientePagoMes(clientId, mes) {
        return this.db.invoices.some((f) => f.client_id === clientId && (f.pagos || []).some((x) => x.estado === "Verificado" && mesDe(x.fecha) === mes));
      },
      pagosFreelance(p = {}) {
        const u = this.requireUser();
        const ver = this.isAdmin() || ["finanzas"].includes(u.rol);
        const lista = this.db.pieces.filter((z) => z.estado === "Aprobada" && num(z.costo_produccion) > 0 && z.asignado && (ver || z.asignado === u.id)).map((z) => {
          const pr = this.db.projects.find((x) => x.id === z.project_id) || {};
          const mes = mesDe(z.aprobada);
          const hab = this.clientePagoMes(pr.client_id, mes);
          return {
            piece_id: z.id,
            pieza: z.titulo,
            freelancer: this.nameOf("users", z.asignado),
            usuario_id: z.asignado,
            cliente: this.nameOf("clients", pr.client_id),
            client_id: pr.client_id,
            mes,
            aprobada: z.aprobada,
            monto: round2(z.costo_produccion),
            estado: (z.pago_freelance || {}).estado === "Pagado" ? "Pagado" : hab ? "Por pagar" : "Esperando pago del cliente",
            pagado_el: (z.pago_freelance || {}).fecha || null
          };
        }).filter((x) => !p.mes || x.mes === p.mes).sort((a, b) => a.aprobada < b.aprobada ? 1 : -1);
        return { lista, por_pagar: round2(lista.filter((x) => x.estado === "Por pagar").reduce((a, x) => a + x.monto, 0)), esperando: round2(lista.filter((x) => x.estado === "Esperando pago del cliente").reduce((a, x) => a + x.monto, 0)) };
      },
      pagarFreelance(pieceId, nota) {
        const u = this.requireUser();
        if (!(this.isAdmin() || u.rol === "finanzas")) throw acceso("Solo Finanzas o Direcci\xF3n pagan a freelancers.");
        const z = this.db.pieces.find((x) => x.id === pieceId);
        if (!z) throw entrada("Pieza no encontrada.");
        const row = this.pagosFreelance({}).lista.find((x) => x.piece_id === pieceId);
        if (!row) throw entrada("Esta pieza no tiene pago pendiente.");
        if (row.estado === "Pagado") throw entrada("Ya est\xE1 pagada.");
        if (row.estado !== "Por pagar" && u.rol !== "founder") throw entrada("El cliente todav\xEDa no pag\xF3 ese mes: el pago al freelancer se habilita cuando pague.");
        z.pago_freelance = { estado: "Pagado", fecha: today(), por: u.nombre, monto: row.monto, nota: String(nota || "").slice(0, 200) };
        this.audit("editar", "piezas", z.id, `Pago al freelancer ${row.freelancer}: ${row.monto}`);
        this.persist();
        return z.pago_freelance;
      },
      // ══════════════ comisiones ══════════════
      comisiones(p = {}) {
        const u = this.requireUser();
        const ver = this.isAdmin() || u.rol === "finanzas";
        const s = this.db.settings;
        const meses = Math.max(1, num(s.comision_meses) || 3);
        const pagadas = this.db.meta && this.db.meta.comisiones_pagadas || {};
        const out = [];
        for (const c of this.db.clients.filter((x) => x.traido_por_tipo && (x.traido_por || x.traido_por_nombre))) {
          const pagos = [];
          for (const f of this.db.invoices.filter((x) => x.client_id === c.id && !x.anulada)) for (const pg of (f.pagos || []).filter((x) => x.estado === "Verificado")) pagos.push({ ...pg, factura: f.codigo });
          if (!pagos.length) continue;
          pagos.sort((a, b) => a.fecha < b.fecha ? -1 : 1);
          const primero = pagos[0].fecha;
          const tipo = c.traido_por_tipo;
          const pct = num(c.comision_pct) || (tipo === "Vendedor" ? num(s.comision_vendedor_pct) || 10 : num(s.comision_socio_pct) || 10);
          const hasta = tipo === "Vendedor" ? sumarMeses(primero, meses) : sumarMeses(primero, 1);
          const benef = c.traido_por ? this.nameOf("users", c.traido_por) || c.traido_por_nombre : c.traido_por_nombre;
          if (!ver && c.traido_por !== u.id) continue;
          for (const pg of pagos.filter((x) => x.fecha < hasta)) out.push({ pago_id: pg.id, client_id: c.id, cliente: c.nombre, tipo, beneficiario: benef || "\u2014", usuario_id: c.traido_por || null, factura: pg.factura, fecha: pg.fecha, base: round2(pg.monto), pct, monto: round2(pg.monto * pct / 100), hasta, estado: pagadas[pg.id] ? "Pagada" : "Por pagar", pagada_el: pagadas[pg.id] ? pagadas[pg.id].fecha : null });
        }
        const lista = out.filter((x) => !p.estado || x.estado === p.estado).sort((a, b) => a.fecha < b.fecha ? 1 : -1);
        return { lista, por_pagar: round2(lista.filter((x) => x.estado === "Por pagar").reduce((a, x) => a + x.monto, 0)) };
      },
      pagarComision(pagoId) {
        const u = this.requireUser();
        if (!(this.isAdmin() || u.rol === "finanzas")) throw acceso("Solo Finanzas o Direcci\xF3n pagan comisiones.");
        const row = this.comisiones({}).lista.find((x) => x.pago_id === pagoId);
        if (!row) throw entrada("Comisi\xF3n no encontrada.");
        if (row.estado === "Pagada") throw entrada("Ya est\xE1 pagada.");
        this.db.meta = this.db.meta || {};
        this.db.meta.comisiones_pagadas = { ...this.db.meta.comisiones_pagadas || {}, [pagoId]: { fecha: today(), por: u.nombre, monto: row.monto } };
        this.audit("editar", "facturas", null, `Comisi\xF3n pagada a ${row.beneficiario}: ${row.monto} (${row.cliente})`);
        this.persist();
        return row;
      },
      // ══════════════ margen por cliente y por mes ══════════════
      margen(p = {}) {
        const u = this.requireUser();
        if (!["founder", "coo", "finanzas"].includes(u.rol)) throw acceso("El margen solo lo ven el CEO, el COO y Finanzas.");
        const mes = /^\d{4}-\d{2}$/.test(String(p.mes || "")) ? p.mes : today().slice(0, 7);
        const com = this.comisiones({}).lista.filter((x) => mesDe(x.fecha) === mes);
        const filas = this.db.clients.map((c) => {
          const cobrado = round2(this.db.invoices.filter((f) => f.client_id === c.id).reduce((a, f) => a + (f.pagos || []).filter((x) => x.estado === "Verificado" && mesDe(x.fecha) === mes).reduce((b, x) => b + num(x.monto), 0), 0));
          const pids = new Set(this.db.projects.filter((x) => x.client_id === c.id).map((x) => x.id));
          const costo = round2(this.db.pieces.filter((z) => pids.has(z.project_id) && z.estado === "Aprobada" && mesDe(z.aprobada) === mes).reduce((a, z) => a + num(z.costo_produccion), 0));
          const comision = round2(com.filter((x) => x.client_id === c.id).reduce((a, x) => a + x.monto, 0));
          const margen = round2(cobrado - costo - comision);
          return { client_id: c.id, cliente: c.nombre, cobrado, costo, comision, margen, margen_pct: cobrado ? Math.round(margen / cobrado * 1e3) / 10 : null };
        }).filter((x) => x.cobrado || x.costo || x.comision);
        const t = filas.reduce((a, x) => ({ cobrado: a.cobrado + x.cobrado, costo: a.costo + x.costo, comision: a.comision + x.comision, margen: a.margen + x.margen }), { cobrado: 0, costo: 0, comision: 0, margen: 0 });
        return { mes, filas: filas.sort((a, b) => b.cobrado - a.cobrado), total: { ...Object.fromEntries(Object.entries(t).map(([k, v]) => [k, round2(v)])), margen_pct: t.cobrado ? Math.round(t.margen / t.cobrado * 1e3) / 10 : null } };
      },
      // ══════════════ seguridad: alta y baja de freelancers ══════════════
      roles2fa() {
        const s = this.db.settings;
        if (Array.isArray(s.exigir_2fa_roles)) return s.exigir_2fa_roles;
        return typeof process !== "undefined" && process.env && process.env.DOS_SIN_2FA ? [] : ROLES_2FA;
      },
      bajaUsuario(id, p = {}) {
        const u = this.requireUser();
        if (!this.canWrite("equipo")) throw acceso("Solo Direcci\xF3n da de baja.");
        const t = this.db.users.find((x) => x.id === id);
        if (!t) throw entrada("Cuenta no encontrada.");
        if (t.id === u.id) throw entrada("No puedes darte de baja a ti mismo.");
        if (t.rol === "founder") throw acceso("El Founder no se da de baja desde aqu\xED.");
        const pasos = [];
        t.activo = false;
        delete t.invitacion;
        pasos.push("Acceso a Delirium OS desactivado (se cierra su sesi\xF3n).");
        let pr = 0;
        for (const p2 of this.db.projects) if ((p2.equipo || []).includes(id)) {
          p2.equipo = p2.equipo.filter((x) => x !== id);
          pr++;
        }
        if (pr) pasos.push(`Quitado del equipo de ${pr} proyecto(s).`);
        let ta = 0;
        for (const x of this.db.tasks) if (x.asignado === id && x.estado !== "Hecha") {
          x.asignado = null;
          x.nota_baja = `Era de ${t.nombre}`;
          ta++;
        }
        if (ta) pasos.push(`${ta} tarea(s) abiertas quedaron sin responsable: reas\xEDgnalas.`);
        let pz = 0;
        for (const x of this.db.pieces) if (x.asignado === id && x.estado !== "Aprobada") {
          x.asignado = null;
          pz++;
        }
        if (pz) pasos.push(`${pz} pieza(s) en curso quedaron sin responsable.`);
        const boveda = this.db.vault.filter((v) => (v.compartido_con || []).includes(id));
        for (const v of boveda) v.compartido_con = v.compartido_con.filter((x) => x !== id);
        const cambiar = boveda.map((v) => ({ id: v.id, nombre: v.nombre || v.titulo || "Sin nombre", servicio: v.servicio || v.url || "" }));
        if (cambiar.length) pasos.push(`Cambia estas ${cambiar.length} contrase\xF1as de la b\xF3veda: la persona las conoc\xEDa.`);
        const pend = this.pagosFreelance({}).lista.filter((x) => x.usuario_id === id && x.estado !== "Pagado");
        if (pend.length) pasos.push(`Tiene ${pend.length} pago(s) por pieza pendientes (${round2(pend.reduce((a, x) => a + x.monto, 0))}).`);
        t.baja = { fecha: now(), por: u.nombre, motivo: String(p.motivo || "").slice(0, 200) };
        this.audit("editar", "equipo", t.id, `Baja de ${t.nombre}: ${pasos.length} pasos`);
        this.persist();
        return { pasos, cambiar_contrasenas: cambiar, pagos_pendientes: pend };
      }
    };
    module.exports = { metodos, METODOS_BASE, ROLES_2FA };
  }
});

// src/main/core19.js
var require_core19 = __commonJS({
  "src/main/core19.js"(exports, module) {
    var crypto = (init_shim_crypto(), __toCommonJS(shim_crypto_exports));
    var { STAFF, CLIENT_ROLES } = require_config();
    var now = () => (/* @__PURE__ */ new Date()).toISOString();
    var ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    var today = () => ymd(/* @__PURE__ */ new Date());
    var num = (v) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };
    var round2 = (n) => Math.round(num(n) * 100) / 100;
    var err = (code, msg) => Object.assign(new Error(msg), { code });
    var acceso = (msg) => err("ACCESS", msg);
    var entrada = (msg) => err("INPUT", msg);
    var masDias = (dia, n) => new Date(Date.parse(dia + "T12:00:00Z") + n * 864e5).toISOString().slice(0, 10);
    var mesDe = (f) => String(f || "").slice(0, 7);
    var DIREC = ["founder", "coo", "finanzas"];
    var BIENVENIDA = [["marca", "Tu marca en una frase"], ["tono", "Tono de voz"], ["publico", "P\xFAblico al que le hablas"], ["competidores", "Competidores o cuentas que admiras"], ["horarios", "Horarios del negocio"], ["fotos", "Fotos y material (enlace de Drive)"], ["colores", "Colores y tipograf\xEDas"], ["no_quiere", "Lo que NO quieres ver"], ["accesos", "Accesos (sin contrase\xF1as: c\xF3mo nos das acceso)"]];
    var CHECKLIST_BASE = { Video: ["Formato vertical 9:16", "Duraci\xF3n correcta", "Subt\xEDtulos", "M\xFAsica con licencia registrada", "Logo correcto", "Ortograf\xEDa revisada", "Portada"], Imagen: ["Medidas correctas", "Logo correcto", "Ortograf\xEDa revisada", "Colores de la marca"] };
    var LINEAS = ["Reels", "Marca blanca", "Streamers", "Juegos", "Extras"];
    var MOTIVOS_BAJA = ["Precio", "Resultados", "Cerr\xF3 o paus\xF3 el negocio", "Lo hace internamente", "Se fue con otra agencia", "Atenci\xF3n o tiempos", "Otro"];
    function horasHabiles(desde, hasta, cfg = {}) {
      const ini = Date.parse(desde), fin = Date.parse(hasta);
      if (!(fin > ini)) return 0;
      const dias = cfg.dias || [1, 2, 3, 4, 5];
      const hD = num(cfg.desde ?? 9), hH = num(cfg.hasta ?? 18);
      const off = -4;
      let h = 0;
      for (let t = ini; t < fin; t += 15 * 6e4) {
        const local = new Date(t + off * 36e5);
        const dw = local.getUTCDay();
        const hr = local.getUTCHours() + local.getUTCMinutes() / 60;
        if (dias.includes(dw) && hr >= hD && hr < hH) h += 0.25;
      }
      return h;
    }
    var metodos = {
      // ══════════════ idioma de la app (por persona) ══════════════
      setIdioma(code) {
        const u = this.requireUser();
        if (!["es", "en", "pt"].includes(code)) throw entrada("Idioma no v\xE1lido.");
        u.idioma_app = code;
        this.persist();
        return code;
      },
      // ══════════════ 21 · bienvenida del cliente ══════════════
      camposBienvenida() {
        return BIENVENIDA.map(([k, l]) => ({ key: k, label: l }));
      },
      completitudBienvenida(c) {
        const b = c.bienvenida || {};
        const llenos = BIENVENIDA.filter(([k]) => String(b[k] || "").trim().length >= 2).length;
        return Math.round(llenos / BIENVENIDA.length * 100);
      },
      guardarBienvenida(datos = {}, clientId) {
        const u = this.requireUser();
        const id = this.isClient() ? u.client_id : clientId;
        if (!this.isClient() && !this.canWrite("clientes")) throw acceso("No puedes editar la bienvenida de este cliente.");
        const c = this.isClient() ? this.db.clients.find((x) => x.id === id) : this.rawScoped("clientes", id);
        if (!c) throw entrada("Cliente no encontrado.");
        const b = { ...c.bienvenida || {} };
        for (const [k] of BIENVENIDA) if (k in datos) b[k] = String(datos[k] || "").slice(0, 2e3);
        if (/contraseñ|password|clave\s*[:=]/i.test(b.accesos || "")) throw entrada("No escribas contrase\xF1as aqu\xED: usa la gu\xEDa para darnos acceso como socio en Meta Business Suite.");
        b.actualizada = now();
        b.por = u.nombre;
        c.bienvenida = b;
        c.bienvenida_pct = this.completitudBienvenida(c);
        if (this.isClient() && c.bienvenida_pct === 100) this.emit("soporte", `${c.nombre} complet\xF3 su formulario de bienvenida`, "Revisa la ficha del cliente.");
        this.audit("editar", "clientes", c.id, `Bienvenida ${c.bienvenida_pct}%`);
        this.persist();
        return { pct: c.bienvenida_pct, bienvenida: b };
      },
      // ══════════════ 22 · acceso como socio en Meta Business Suite ══════════════
      marcarAccesoSocio(estado, clientId) {
        const u = this.requireUser();
        const est = ["Pendiente", "Cliente dice listo", "Listo"];
        const c = this.isClient() ? this.db.clients.find((x) => x.id === u.client_id) : this.rawScoped("clientes", clientId);
        if (!c) throw entrada("Cliente no encontrado.");
        if (this.isClient()) {
          c.acceso_socio = { estado: "Cliente dice listo", fecha: now() };
          this.emit("soporte", `${c.nombre} dice que ya agreg\xF3 al estudio como socio en Meta`, "Verif\xEDcalo en Meta Business Suite y m\xE1rcalo como listo.");
        } else {
          if (!this.canWrite("clientes")) throw acceso("No puedes cambiar este estado.");
          if (!est.includes(estado)) throw entrada("Estado no v\xE1lido.");
          c.acceso_socio = { estado, fecha: now(), por: u.nombre };
        }
        this.persist();
        return c.acceso_socio;
      },
      // ══════════════ 23 · kit de marca (lo ve quien trabaja en el cliente) ══════════════
      kitMarca(p = {}) {
        const u = this.requireUser();
        let clientId = p.client_id;
        if (p.project_id) {
          const pr = this.rawScoped("proyectos", p.project_id);
          clientId = pr.client_id;
        } else if (p.piece_id) {
          const z = this.rawScoped("piezas", p.piece_id);
          clientId = (this.db.projects.find((x) => x.id === z.project_id) || {}).client_id;
        } else if (this.isClient()) clientId = u.client_id;
        else if (!this.canRead("clientes")) throw acceso("Abre el kit desde un proyecto o una pieza.");
        const c = this.db.clients.find((x) => x.id === clientId);
        if (!c) throw entrada("Cliente no encontrado.");
        if (!this.isClient() && !p.project_id && !p.piece_id && !this.inScope("clients", c, this.perm("clientes").scope)) throw acceso("No tienes acceso a este cliente.");
        return { cliente: c.nombre, colores: c.marca_colores || "", tipografias: c.marca_tipografias || "", logos: c.marca_logos || "", tono: c.marca_tono || "", ejemplos: c.marca_ejemplos || "", prohibiciones: c.marca_prohibiciones || "", no_quiere: (c.bienvenida || {}).no_quiere || "", link_bio: c.link_bio || "" };
      },
      // ══════════════ 24 · plan mensual que se crea solo ══════════════
      responsablePorCarga(candidatos) {
        if (!candidatos.length) return null;
        let carga = {};
        try {
          for (const x of this.cargaEquipo({ semanas: 4 }).personas) carga[x.id] = x.pct;
        } catch (e) {
        }
        const extra = this._repartoMes || {};
        return candidatos.slice().sort((a, b) => (carga[a] || 0) + (extra[a] || 0) * 10 - ((carga[b] || 0) + (extra[b] || 0) * 10))[0];
      },
      generarPiezasPlan(sbId, mes) {
        const u = this.requireUser();
        if (!this.canWrite("piezas") || !(this.canWrite("planes") || this.canWrite("proyectos"))) throw acceso("Tu rol no puede generar el plan del mes.");
        const sb = this.db.subscriptions.find((x) => x.id === sbId);
        if (!sb) throw entrada("Plan no encontrado.");
        if (sb.estado !== "Activo") throw entrada(sb.estado === "Pausado" ? "El servicio est\xE1 pausado: no se crean piezas nuevas." : "El plan no est\xE1 activo.");
        mes = /^\d{4}-\d{2}$/.test(String(mes || "")) ? mes : today().slice(0, 7);
        sb.piezas_generadas = sb.piezas_generadas || {};
        if (sb.piezas_generadas[mes]) throw entrada(`Las piezas de ${mes} ya se crearon.`);
        const n = Math.min(60, Math.max(1, num(sb.piezas_mes) || 12));
        let pr = sb.project_id ? this.db.projects.find((x) => x.id === sb.project_id) : null;
        if (!pr) {
          pr = this.save("proyectos", { nombre: `${sb.nombre} \xB7 ${mes}`, client_id: sb.client_id, estado: "Por iniciar", tipo_proyecto: "Plan mensual", inicio: `${mes}-01` });
          pr = this.db.projects.find((x) => x.id === pr.id);
        }
        const equipo = [...new Set([...pr.equipo || [], pr.pm].filter(Boolean))].filter((id) => {
          const x = this.db.users.find((y2) => y2.id === id);
          return x && x.activo && ["creativo", "freelancer", "productor", "creativo_dir", "social"].includes(x.rol);
        });
        const candidatos = equipo.length ? equipo : this.db.users.filter((x) => x.activo && ["creativo", "freelancer"].includes(x.rol)).map((x) => x.id);
        const cli = this.db.clients.find((x) => x.id === sb.client_id) || {};
        const guion = !!cli.aprobar_guion;
        const [y, m] = mes.split("-").map(Number);
        const diasMes = new Date(Date.UTC(y, m, 0)).getUTCDate();
        const creadas = [];
        this._repartoMes = {};
        for (let i = 0; i < n; i++) {
          const dia = Math.min(diasMes, Math.max(1, Math.round((i + 0.5) * diasMes / n)));
          const resp = this.responsablePorCarga(candidatos);
          if (resp) this._repartoMes[resp] = (this._repartoMes[resp] || 0) + 1;
          const z = this.save("piezas", { titulo: `${sb.tipo_pieza || "Reel"} ${i + 1} \xB7 ${mes}`, project_id: pr.id, tipo: "Video", asignado: resp, fecha_limite: `${mes}-${String(dia).padStart(2, "0")}`, estado: guion ? "Guion para aprobar" : "En producci\xF3n", costo_produccion: num(sb.costo_pieza) || void 0, del_plan: sb.id });
          creadas.push(z.id);
        }
        this._repartoMes = null;
        sb.piezas_generadas[mes] = { fecha: now(), n, por: u.nombre };
        this.audit("crear", "piezas", null, `Plan ${sb.nombre}: ${n} piezas de ${mes}`);
        this.persist();
        return { creadas: creadas.length, proyecto: pr.id };
      },
      // ══════════════ 25 · guion para aprobar ══════════════
      decidirGuion(id, aprobar, nota) {
        const u = this.requireUser();
        const z = this.rawScoped("piezas", id);
        if (z.estado !== "Guion para aprobar") throw entrada("Esta pieza no espera aprobaci\xF3n de guion.");
        if (!this.isClient() && !this.canWrite("piezas")) throw acceso("No puedes decidir este guion.");
        (z.comentarios ||= []).push({ id: crypto.randomUUID(), fecha: now(), por: u.nombre, texto: (aprobar ? "Guion aprobado. " : "Cambios al guion: ") + String(nota || ""), interno: false, version: z.version || 1, guion: true });
        if (aprobar) {
          z.estado = "En producci\xF3n";
          z.guion_aprobado = now();
        }
        if (this.isClient()) this.emit("piezas", `${this.nameOf("clients", (this.db.projects.find((x) => x.id === z.project_id) || {}).client_id)} ${aprobar ? "aprob\xF3" : "pidi\xF3 cambios en"} el guion: ${z.titulo}`, String(nota || "").slice(0, 200));
        this.persist();
        return this.strip("pieces", z);
      },
      // ══════════════ 27 · lista de revisión antes de enviar al cliente ══════════════
      checklistDe(tipo) {
        const s = this.db.settings.checklist_revision || CHECKLIST_BASE;
        return s[tipo] || s.Video || [];
      },
      marcarChecklist(id, item, si) {
        this.requireUser();
        if (!this.canWrite("piezas") || this.isClient()) throw acceso("No puedes revisar esta pieza.");
        const z = this.rawScoped("piezas", id);
        const items = this.checklistDe(z.tipo);
        if (!items.includes(item)) throw entrada("Ese punto no est\xE1 en la lista.");
        z.checklist = { ...z.checklist || {}, [item]: si ? { por: this.user.nombre, fecha: now() } : void 0 };
        if (!si) delete z.checklist[item];
        this.persist();
        return { checklist: z.checklist, completa: items.every((i) => z.checklist[i]) };
      },
      // ══════════════ 29 · tiempo de respuesta ══════════════
      sinRespuesta() {
        const cfg = this.db.settings.horario_atencion || {};
        const ahora = now();
        const out = [];
        for (const t of this.db.tickets.filter((x) => !["Resuelto", "Cerrado", "Esperando cliente"].includes(x.estado))) {
          const rs = (t.respuestas || []).filter((r) => !r.interno);
          const ult = rs[rs.length - 1];
          if (ult && !ult.cliente) continue;
          const desde = ult ? ult.fecha : t.creado;
          const h = horasHabiles(desde, ahora, cfg);
          if (h >= 24) out.push({ id: t.id, codigo: t.codigo, asunto: t.asunto || t.titulo || "", cliente: this.nameOf("clients", t.client_id), asignado: t.asignado || null, horas: Math.round(h), escalar: h >= 48, tipo: "solicitud" });
        }
        for (const x of this.db.inbox.filter((i) => i.estado === "Nuevo")) {
          const h = horasHabiles(x.fecha || x.creado, ahora, cfg);
          if (h >= 24) out.push({ id: x.id, codigo: x.red, asunto: String(x.texto || "").slice(0, 60), cliente: this.nameOf("clients", x.client_id), asignado: null, horas: Math.round(h), escalar: h >= 48, tipo: "redes" });
        }
        return out.sort((a, b) => b.horas - a.horas);
      },
      // ══════════════ 31 · avisos (push) por persona ══════════════
      prefsAvisos(p) {
        const u = this.requireUser();
        if (p) {
          const ok = ["aprobaciones", "pagos", "mensajes", "bugs", "redes"];
          u.avisos_push = (Array.isArray(p) ? p : []).filter((x) => ok.includes(x));
          this.persist();
        }
        return u.avisos_push || ["aprobaciones", "pagos", "mensajes", "bugs"];
      },
      destinatariosAviso(ev) {
        const tipo = { piezas: "aprobaciones", redes: "aprobaciones", pagos: "pagos", soporte: "mensajes", bugs: "bugs", cotizaciones: "aprobaciones", pedidos: "pagos" }[ev.tipo] || null;
        if (!tipo) return [];
        const roles = { aprobaciones: ["founder", "coo", "creativo_dir", "pm", "social", "productor"], pagos: ["founder", "coo", "finanzas"], mensajes: ["founder", "coo", "pm", "ventas", "social"], bugs: ["founder", "coo", "productor"] }[tipo];
        const base = Array.isArray(ev.para) ? this.db.users.filter((x) => ev.para.includes(x.id)) : this.db.users.filter((x) => roles.includes(x.rol));
        return base.filter((x) => x.activo && (x.avisos_push || ["aprobaciones", "pagos", "mensajes", "bugs"]).includes(tipo) && (x.push || []).length).map((x) => x.id);
      },
      guardarSuscripcionPush(sub) {
        const u = this.requireUser();
        if (!sub || !/^https:\/\//.test(String(sub.endpoint || ""))) throw entrada("Suscripci\xF3n no v\xE1lida.");
        u.push = (u.push || []).filter((x) => x.endpoint !== sub.endpoint).concat([{ endpoint: String(sub.endpoint).slice(0, 600), creado: now() }]).slice(-5);
        this.persist();
        return true;
      },
      quitarSuscripcionPush(endpoint) {
        const u = this.requireUser();
        u.push = (u.push || []).filter((x) => x.endpoint !== endpoint);
        this.persist();
        return true;
      },
      misAvisos() {
        const u = this.requireUser();
        const l = (this.db.meta && this.db.meta.avisos || {})[u.id] || [];
        return l.slice(-10).reverse();
      },
      encolarAviso(usuarios, ev) {
        this.db.meta = this.db.meta || {};
        const a = this.db.meta.avisos = this.db.meta.avisos || {};
        for (const id of usuarios) a[id] = [...a[id] || [], { titulo: String(ev.titulo).slice(0, 120), cuerpo: String(ev.detalle || "").slice(0, 200), fecha: now(), tipo: ev.tipo }].slice(-20);
      },
      // ══════════════ 32 · renovaciones y cobranza ══════════════
      cobranza() {
        this.requireUser();
        if (!this.canRead("facturas") || this.isClient()) throw acceso("Solo Finanzas o Direcci\xF3n.");
        const hoy = today();
        const out = [];
        for (const f of this.db.invoices.filter((x) => !x.anulada)) {
          const t = this.invoiceTotals(f);
          if (t._saldo <= 0 || !f.vence) continue;
          const d = Math.round((Date.parse(hoy) - Date.parse(f.vence)) / 864e5);
          const etapa = d >= 7 ? "A los 7 d\xEDas" : d >= 3 ? "A los 3 d\xEDas" : d >= 0 ? "Vence hoy" : null;
          if (!etapa) continue;
          const c = this.db.clients.find((x) => x.id === f.client_id) || {};
          const en = c.idioma === "en";
          const nombre = (c.contacto || c.nombre || "").split(" ")[0];
          const mon = c.moneda || this.db.settings.moneda || "USD";
          const monto = en ? `${mon} ${t._saldo.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `${t._saldo.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${mon}`;
          const msg = en ? { "Vence hoy": `Hi ${nombre}! Friendly reminder: invoice ${f.codigo} (${monto}) is due today. You can pay and report it from your portal. Thanks!`, "A los 3 d\xEDas": `Hi ${nombre}, invoice ${f.codigo} is 3 days past due (${monto}). Could you let us know when you'll send the payment?`, "A los 7 d\xEDas": `Hi ${nombre}, invoice ${f.codigo} is now 7 days past due (${monto}). To keep your monthly content on schedule we need to settle it this week.` }[etapa] : { "Vence hoy": `\xA1Hola ${nombre}! Te recordamos que la factura ${f.codigo} (${monto}) vence hoy. Puedes pagar y reportarlo desde tu portal. \xA1Gracias!`, "A los 3 d\xEDas": `Hola ${nombre}, la factura ${f.codigo} tiene 3 d\xEDas vencida (${monto}). \xBFNos confirmas cu\xE1ndo env\xEDas el pago?`, "A los 7 d\xEDas": `Hola ${nombre}, la factura ${f.codigo} ya tiene 7 d\xEDas vencida (${monto}). Para mantener tu contenido del mes al d\xEDa necesitamos regularizarla esta semana.` }[etapa];
          const planes = this.db.subscriptions.filter((s) => s.client_id === f.client_id && s.estado === "Activo");
          out.push({ factura_id: f.id, codigo: f.codigo, client_id: f.client_id, cliente: c.nombre, telefono: c.telefono || "", saldo: t._saldo, vence: f.vence, dias: d, etapa, mensaje: msg, puede_pausar: d >= 7 && planes.length > 0, planes: planes.map((s) => s.id) });
        }
        const renovar = this.db.subscriptions.filter((s) => s.estado === "Activo" && s.proximo_cobro && s.proximo_cobro <= masDias(hoy, 5) && s.proximo_cobro >= hoy).map((s) => ({ id: s.id, nombre: s.nombre, cliente: this.nameOf("clients", s.client_id), proximo_cobro: s.proximo_cobro, monto: num(s.monto) }));
        return { recordatorios: out.sort((a, b) => b.dias - a.dias), renovar };
      },
      pausarServicio(clientId, pausar = true) {
        const u = this.requireUser();
        if (!["founder", "coo"].includes(u.rol)) throw acceso("Solo Direcci\xF3n pausa el servicio.");
        const c = this.rawScoped("clientes", clientId);
        let n = 0;
        for (const s of this.db.subscriptions.filter((x) => x.client_id === c.id && x.estado === (pausar ? "Activo" : "Pausado"))) {
          s.estado = pausar ? "Pausado" : "Activo";
          s.pausa = pausar ? { fecha: now(), por: u.nombre } : null;
          n++;
        }
        c.servicio_pausado = pausar ? now() : null;
        this.audit("editar", "clientes", c.id, `${pausar ? "Servicio pausado por falta de pago" : "Servicio reactivado"} (${n} plan(es))`);
        this.persist();
        return { planes: n, pausado: pausar };
      },
      // ══════════════ 33 · clientes en riesgo ══════════════
      riesgoClientes() {
        const u = this.requireUser();
        if (!["founder", "coo"].includes(u.rol) && !this.isAdmin()) throw acceso("Solo Direcci\xF3n ve el riesgo de clientes.");
        const hoy = today();
        const out = [];
        for (const c of this.db.clients.filter((x) => x.estado === "Actual")) {
          const motivos = [];
          let p = 0;
          const vencidas = this.db.invoices.filter((f) => f.client_id === c.id && !f.anulada && f.vence && f.vence < hoy && this.invoiceTotals(f)._saldo > 0);
          if (vencidas.length) {
            const d = Math.max(...vencidas.map((f) => Math.round((Date.parse(hoy) - Date.parse(f.vence)) / 864e5)));
            p += Math.min(35, 18 + d);
            motivos.push(`${vencidas.length} factura(s) vencida(s), hasta ${d} d\xEDas`);
          }
          const prs = this.db.projects.filter((x) => x.client_id === c.id && !["Cancelado"].includes(x.estado));
          const rondas = prs.filter((x) => num(x.rondas_incluidas) && num(x.rondas_usadas) >= num(x.rondas_incluidas));
          if (rondas.length) {
            p += 15;
            motivos.push("Rondas de cambios agotadas");
          }
          const pids = new Set(prs.map((x) => x.id));
          const lentas = this.db.pieces.filter((z) => pids.has(z.project_id) && z.estado === "Revisi\xF3n del cliente" && z.enviada_cliente && Date.parse(z.enviada_cliente) < Date.now() - 4 * 864e5);
          if (lentas.length) {
            p += Math.min(20, lentas.length * 7);
            motivos.push(`${lentas.length} pieza(s) sin aprobar hace m\xE1s de 4 d\xEDas`);
          }
          const esperando = this.db.tickets.filter((t) => t.client_id === c.id && t.estado === "Esperando cliente" && Date.parse((t.respuestas || []).slice(-1)[0]?.fecha || t.creado) < Date.now() - 5 * 864e5);
          if (esperando.length) {
            p += 10;
            motivos.push("No responde mensajes del equipo hace m\xE1s de 5 d\xEDas");
          }
          const nps = this.db.surveys.filter((s) => s.client_id === c.id).sort((a, b) => a.fecha < b.fecha ? 1 : -1)[0];
          if (nps && nps.puntaje <= 6) {
            p += 20;
            motivos.push(`Calific\xF3 ${nps.puntaje}/10 en la encuesta`);
          }
          const cuentas = this.db.socials.filter((s) => s.client_id === c.id && s.cuenta_ext);
          if (cuentas.length) {
            try {
              const m = this.calcularRedes(cuentas, { dias: 30 });
              if (m.cambio.interacciones !== null && m.cambio.interacciones <= -20) {
                p += 15;
                motivos.push(`Interacciones ${m.cambio.interacciones}% vs el mes anterior`);
              }
            } catch (e) {
            }
          }
          if (c.servicio_pausado) {
            p += 15;
            motivos.push("Servicio pausado");
          }
          const puntaje = Math.min(100, p);
          if (!puntaje) continue;
          const maxVenc = vencidas.length ? Math.max(...vencidas.map((f) => Math.round((Date.parse(hoy) - Date.parse(f.vence)) / 864e5))) : 0;
          const accion = maxVenc >= 7 ? "Llamarlo esta semana para acordar el pago" : vencidas.length ? "Escribirle para recordarle el pago" : lentas.length ? "Escribirle para destrabar las aprobaciones" : motivos.some((m) => /Interacciones/.test(m)) ? "Proponer un cambio de estrategia de contenido" : nps && nps.puntaje <= 6 ? "Llamarlo esta semana para escuchar qu\xE9 falla" : "Hacer una llamada de seguimiento";
          out.push({ client_id: c.id, cliente: c.nombre, puntaje, nivel: puntaje >= 50 ? "Alto" : puntaje >= 25 ? "Medio" : "Bajo", motivos, accion });
        }
        return out.sort((a, b) => b.puntaje - a.puntaje);
      },
      // ══════════════ 34 · encuesta mensual (NPS) ══════════════
      encuestaPendiente() {
        const u = this.requireUser();
        if (!this.isClient()) return null;
        const mes = today().slice(0, 7);
        return this.db.surveys.some((s) => s.client_id === u.client_id && s.mes === mes) ? null : { mes };
      },
      responderEncuesta(puntaje, comentario, citaOk) {
        const u = this.requireUser();
        if (!this.isClient()) throw acceso("La encuesta la responde el cliente.");
        const n = Math.round(num(puntaje));
        if (n < 1 || n > 10) throw entrada("Elige un n\xFAmero del 1 al 10.");
        const mes = today().slice(0, 7);
        if (this.db.surveys.some((s2) => s2.client_id === u.client_id && s2.mes === mes)) throw entrada("Ya respondiste este mes. \xA1Gracias!");
        const s = { id: crypto.randomUUID(), client_id: u.client_id, usuario_id: u.id, mes, fecha: now(), puntaje: n, comentario: String(comentario || "").slice(0, 1e3), cita_aprobada: !!citaOk };
        this.db.surveys.push(s);
        if (n <= 6) this.emit("soporte", `\u26A0\uFE0F ${this.nameOf("clients", u.client_id)} calific\xF3 ${n}/10`, s.comentario || "Sin comentario. Llamarlo esta semana.");
        this.persist();
        return { ok: true };
      },
      resultadosEncuesta() {
        this.requireUser();
        if (!this.isAdmin() && !["finanzas", "ventas", "pm"].includes(this.user.rol)) throw acceso("No tienes acceso a las encuestas.");
        const ult = {};
        for (const s of this.db.surveys.slice().sort((a, b) => a.fecha < b.fecha ? -1 : 1)) ult[s.client_id] = s;
        const lista = Object.values(ult).map((s) => ({ ...s, cliente: this.nameOf("clients", s.client_id) }));
        const prom = lista.filter((s) => s.puntaje >= 9).length, det = lista.filter((s) => s.puntaje <= 6).length;
        return { lista, promotores: lista.filter((s) => s.puntaje >= 9), detractores: lista.filter((s) => s.puntaje <= 6), nps: lista.length ? Math.round((prom - det) / lista.length * 100) : null };
      },
      // ══════════════ 35 · caso de éxito ══════════════
      casoExito(clientId, p = {}) {
        const u = this.requireUser();
        if (this.isClient() || !this.canRead("metricas")) throw acceso("No tienes acceso a los casos de \xE9xito.");
        const c = this.rawScoped("clientes", clientId);
        const cuentas = this.db.socials.filter((s) => s.client_id === c.id && s.cuenta_ext);
        let antes = null, despues = null;
        if (cuentas.length) {
          const inicio = this.db.projects.filter((x) => x.client_id === c.id).map((x) => x.inicio).filter(Boolean).sort()[0] || masDias(today(), -90);
          antes = this.calcularRedes(cuentas, { desde: inicio, hasta: masDias(inicio, 29) }).actual;
          despues = this.calcularRedes(cuentas, { dias: 30 }).actual;
        }
        const pids = new Set(this.db.projects.filter((x) => x.client_id === c.id).map((x) => x.id));
        const piezas = this.db.pieces.filter((z) => pids.has(z.project_id) && z.estado === "Aprobada" && z.enlace).slice(-6).map((z) => ({ titulo: z.titulo, enlace: z.enlace }));
        const mejor = this.db.social_posts.filter((x) => cuentas.some((s) => s.id === x.cuenta_id)).sort((a, b) => num(b.interacciones) - num(a.interacciones)).slice(0, 3).map((x) => ({ red: x.red, texto: String(x.texto || "").slice(0, 120), interacciones: x.interacciones, enlace: x.enlace }));
        const cita = this.db.surveys.filter((s) => s.client_id === c.id && s.cita_aprobada && s.comentario && s.puntaje >= 9).sort((a, b) => a.fecha < b.fecha ? 1 : -1)[0];
        const anon = !!p.anonimo;
        const rubro = c.rubro || "negocio";
        const lugar = [c.ciudad, c.pais].filter(Boolean).join(", ");
        return { nombre: anon ? `${rubro[0].toUpperCase() + rubro.slice(1)}${lugar ? " en " + lugar : ""}` : c.nombre, anonimo: anon, antes, despues, piezas, mejores: mejor, cita: cita ? cita.comentario : null, estudio: this.db.settings.empresa, generado: now(), por: u.nombre };
      },
      // ══════════════ 36 · cierre ordenado ══════════════
      prepararCierre(clientId) {
        this.requireUser();
        if (!["founder", "coo"].includes(this.user.rol)) throw acceso("Solo Direcci\xF3n cierra clientes.");
        const c = this.rawScoped("clientes", clientId);
        const pids = new Set(this.db.projects.filter((x) => x.client_id === c.id).map((x) => x.id));
        const archivos = this.db.pieces.filter((z) => pids.has(z.project_id) && z.estado === "Aprobada").map((z) => ({ titulo: z.titulo, enlace: z.enlace || (z.archivo ? "Archivo adjunto en la pieza" : "") }));
        const facturas = this.db.invoices.filter((f) => f.client_id === c.id && !f.anulada).map((f) => ({ codigo: f.codigo, saldo: this.invoiceTotals(f)._saldo })).filter((f) => f.saldo > 0);
        const usuarios = this.db.users.filter((x) => x.client_id === c.id && x.activo).map((x) => ({ id: x.id, nombre: x.nombre, email: x.email }));
        const boveda = this.db.vault.filter((v) => v.client_id === c.id).map((v) => ({ id: v.id, nombre: v.nombre }));
        const cuentas = this.db.socials.filter((s) => s.client_id === c.id).map((s) => ({ id: s.id, red: s.red, nombre: s.nombre }));
        const en = c.idioma === "en";
        const n = (c.contacto || c.nombre || "").split(" ")[0];
        const despedida = en ? `Hi ${n}, it was a pleasure working with you. Here are all your final files: [link]. Your portal stays open for 7 days so you can download everything. If you ever want to come back, we'll be here. Thank you for trusting ${this.db.settings.empresa}!` : `Hola ${n}, fue un gusto trabajar contigo. Aqu\xED tienes todos los archivos finales: [enlace]. Tu portal queda abierto 7 d\xEDas para que descargues todo. Si alg\xFAn d\xEDa quieres volver, aqu\xED estaremos. \xA1Gracias por confiar en ${this.db.settings.empresa}!`;
        return { cliente: c.nombre, archivos, facturas, usuarios, boveda, cuentas, despedida, motivos: MOTIVOS_BAJA };
      },
      cerrarCliente(clientId, p = {}) {
        const u = this.requireUser();
        if (!["founder", "coo"].includes(u.rol)) throw acceso("Solo Direcci\xF3n cierra clientes.");
        if (!MOTIVOS_BAJA.includes(p.motivo)) throw entrada("Elige el motivo de la baja.");
        const c = this.rawScoped("clientes", clientId);
        for (const s of this.db.subscriptions.filter((x) => x.client_id === c.id && x.estado !== "Terminado")) {
          s.estado = "Terminado";
          s.fin = s.fin || today();
        }
        const dias = Math.max(0, num(p.dias_portal ?? 7));
        for (const x of this.db.users.filter((y) => y.client_id === c.id && y.activo)) {
          if (dias) x.expira = masDias(today(), dias);
          else x.activo = false;
        }
        if (p.desconectar_redes) for (const s of this.db.socials.filter((x) => x.client_id === c.id)) {
          this.db.social_tokens = this.db.social_tokens.filter((t) => t.id !== s.id && t.id !== s.id + ":negocio");
          s.estado = "Sin conectar";
        }
        c.estado_anterior = c.estado;
        c.estado = "Antiguo cliente";
        c.baja = { fecha: now(), por: u.nombre, motivo: p.motivo, nota: String(p.nota || "").slice(0, 500) };
        this.audit("editar", "clientes", c.id, `Cierre del cliente: ${p.motivo}`);
        this.persist();
        return this.strip("clients", c);
      },
      reactivarCliente(clientId) {
        const u = this.requireUser();
        if (!["founder", "coo", "ventas"].includes(u.rol)) throw acceso("No puedes reactivar clientes.");
        const c = this.rawScoped("clientes", clientId);
        if (c.estado !== "Antiguo cliente") throw entrada("Este cliente no est\xE1 dado de baja.");
        c.estado = "Actual";
        c.vuelve = { fecha: now(), por: u.nombre };
        for (const x of this.db.users.filter((y) => y.client_id === c.id)) {
          x.activo = true;
          x.expira = null;
        }
        this.audit("editar", "clientes", c.id, "El cliente volvi\xF3");
        this.persist();
        return this.strip("clients", c);
      },
      // ══════════════ 37 · panel de la meta ══════════════
      lineaDe(f) {
        if (f.linea && LINEAS.includes(f.linea)) return f.linea;
        const sb = f.desde_plan && this.db.subscriptions.find((s) => s.id === f.desde_plan);
        if (sb && /marca blanca/i.test(sb.tipo || "")) return "Marca blanca";
        const c = this.db.clients.find((x) => x.id === f.client_id) || {};
        if (/agencia/i.test(c.tipo_prospecto || "")) return "Marca blanca";
        if (/streamer|creador/i.test(c.tipo_prospecto || "")) return "Streamers";
        if (/juego/i.test(c.tipo_prospecto || c.categoria || "")) return "Juegos";
        const pr = f.project_id && this.db.projects.find((x) => x.id === f.project_id);
        if (pr && /juego/i.test(pr.servicio || "")) return "Juegos";
        return sb || pr && ["Plan mensual", "Prueba"].includes(pr.tipo_proyecto) || /reel|redes|plan/i.test(f.concepto || "") ? "Reels" : "Extras";
      },
      panelMeta(p = {}) {
        const u = this.requireUser();
        if (!DIREC.includes(u.rol)) throw acceso("El panel de la meta solo lo ven el CEO, el COO y Finanzas.");
        const mes = /^\d{4}-\d{2}$/.test(String(p.mes || "")) ? p.mes : today().slice(0, 7);
        const s = this.db.settings;
        const meta = num(s.meta_mensual) || 15e3;
        const factor = { Mensual: 1, Trimestral: 1 / 3, Semestral: 1 / 6, Anual: 1 / 12 };
        const mrr = round2(this.db.subscriptions.filter((x) => x.estado === "Activo").reduce((a, x) => a + (/marca blanca/i.test(x.tipo || "") ? num(x.precio_reel) * num(x.reels_mes) : num(x.monto) * (factor[x.frecuencia] ?? 1)), 0));
        const lineas = Object.fromEntries(LINEAS.map((l) => [l, 0]));
        let cobrado = 0;
        for (const f of this.db.invoices.filter((x) => !x.anulada)) {
          const m = (f.pagos || []).filter((x) => x.estado === "Verificado" && mesDe(x.fecha) === mes).reduce((a, x) => a + num(x.monto), 0);
          if (m) {
            lineas[this.lineaDe(f)] += m;
            cobrado += m;
          }
        }
        const por_cobrar = round2(this.db.invoices.filter((x) => !x.anulada).reduce((a, f) => a + Math.max(0, this.invoiceTotals(f)._saldo), 0));
        const gastos = round2(this.db.expenses.filter((g) => mesDe(g.fecha) === mes && ["Aprobado", "Pagado", "Aprobada"].includes(g.estado)).reduce((a, g) => a + num(g.monto), 0));
        const nomina = round2(this.db.payslips.filter((x) => x.estado === "Pagado" && mesDe(x.fecha_pago) === mes).reduce((a, x) => a + num(x.neto ?? num(x.base) + num(x.bonos) - num(x.deducciones)), 0));
        const freelance = round2(this.db.pieces.filter((z) => z.pago_freelance && z.pago_freelance.estado === "Pagado" && mesDe(z.pago_freelance.fecha) === mes).reduce((a, z) => a + num(z.pago_freelance.monto), 0));
        const comPag = Object.values(this.db.meta && this.db.meta.comisiones_pagadas || {}).filter((x) => mesDe(x.fecha) === mes).reduce((a, x) => a + num(x.monto), 0);
        const salidas = round2(gastos + nomina + freelance + comPag);
        const margen = this.margen({ mes });
        return {
          mes,
          meta,
          mrr,
          falta_mrr: round2(Math.max(0, meta - mrr)),
          avance_mrr: Math.round(mrr / meta * 100),
          cobrado: round2(cobrado),
          falta_mes: round2(Math.max(0, meta - cobrado)),
          lineas: Object.entries(lineas).map(([linea, monto]) => ({ linea, monto: round2(monto) })),
          por_cobrar,
          caja: { entradas: round2(cobrado), gastos, nomina, freelance, comisiones: round2(comPag), salidas, neto: round2(cobrado - salidas) },
          margen: margen.filas.slice(0, 15),
          riesgo: ["founder", "coo"].includes(u.rol) ? this.riesgoClientes().filter((x) => x.nivel !== "Bajo").slice(0, 5) : []
        };
      },
      // ══════════════ 28 · ¿podemos tomar más clientes? ══════════════
      capacidadClientes() {
        const cg = this.cargaEquipo({ semanas: 4 });
        const horasCliente = num(this.db.settings.horas_por_cliente) || 20;
        const produccion = cg.personas.filter((x) => ["creativo", "freelancer", "productor", "creativo_dir", "social"].includes(x.rol));
        const libres = Math.max(0, produccion.reduce((a, x) => a + Math.max(0, x.capacidad - x.horas), 0));
        return { horas_libres: Math.round(libres), horas_por_cliente: horasCliente, caben: Math.floor(libres / horasCliente), saturados: produccion.filter((x) => x.nivel === "Saturado").map((x) => x.nombre) };
      },
      // ══════════════ 38 · exportaciones ══════════════
      exportarCliente(clientId) {
        const u = this.requireUser();
        if (!["founder", "coo"].includes(u.rol)) throw acceso("Solo Direcci\xF3n exporta los datos de un cliente.");
        const c = this.rawScoped("clientes", clientId);
        const pids = new Set(this.db.projects.filter((x) => x.client_id === c.id).map((x) => x.id));
        const limpia = (o) => {
          const x = { ...o };
          for (const k of ["notas_internas", "costo_interno", "costo_produccion", "pago_freelance", "adelanto_saltado", "comision_pct", "riesgo"]) delete x[k];
          return x;
        };
        const datos = {
          exportado: now(),
          por: u.nombre,
          cliente: limpia(c),
          proyectos: this.db.projects.filter((x) => pids.has(x.id)).map(limpia),
          piezas: this.db.pieces.filter((x) => pids.has(x.project_id)).map(limpia),
          publicaciones: this.db.posts.filter((x) => x.client_id === c.id).map(limpia),
          cotizaciones: this.db.quotes.filter((x) => x.client_id === c.id).map(limpia),
          facturas: this.db.invoices.filter((x) => x.client_id === c.id).map(limpia),
          contratos: this.db.contracts.filter((x) => x.client_id === c.id).map(limpia),
          solicitudes: this.db.tickets.filter((x) => x.client_id === c.id).map((t) => ({ ...limpia(t), respuestas: (t.respuestas || []).filter((r) => !r.interno) })),
          planes: this.db.subscriptions.filter((x) => x.client_id === c.id).map(limpia),
          metas: this.db.goals.filter((x) => x.client_id === c.id),
          cuentas_redes: this.db.socials.filter((x) => x.client_id === c.id).map((s) => ({ red: s.red, nombre: s.nombre, seguidores: s.seguidores, historial: s.historial })),
          metricas_diarias: this.db.social_stats.filter((x) => x.client_id === c.id),
          publicaciones_redes: this.db.social_posts.filter((x) => x.client_id === c.id)
        };
        this.audit("exportar", "clientes", c.id, "Export\xF3 los datos del cliente");
        return datos;
      },
      enlacesDeTodo() {
        const out = [];
        const re = /https?:\/\/[^\s"'<>]+/g;
        const recorrer = (col, r) => {
          for (const [k, v] of Object.entries(r)) {
            if (typeof v === "string" && /^https?:\/\//.test(v)) out.push({ col, id: r.id, campo: k, enlace: v });
            else if (v && typeof v === "object" && v.ruta && v.nombre) out.push({ col, id: r.id, campo: k, archivo: v.ruta, nombre: v.nombre });
          }
        };
        for (const col of ["clients", "projects", "pieces", "posts", "contracts", "docs", "licenses", "products", "expenses", "candidates", "ideas"]) for (const r of this.db[col] || []) recorrer(col, r);
        void re;
        return out;
      },
      extraDash19(d) {
        if (this.isClient()) {
          d.portal19 = this.miPortal19();
          return d;
        }
        const r = this.user.rol;
        if (this.canRead("soporte")) {
          const l = this.sinRespuesta();
          d.sin_respuesta = l.filter((x) => ["founder", "coo"].includes(r) || x.asignado === this.user.id || !x.asignado).slice(0, 6);
        }
        if (this.canRead("clientes")) {
          const act = this.safeList("clientes").filter((c) => c.estado === "Actual");
          d.bienvenida_incompleta = act.map((c) => ({ id: c.id, nombre: c.nombre, pct: this.completitudBienvenida(this.db.clients.find((x) => x.id === c.id) || {}) })).filter((x) => x.pct < 100).slice(0, 8);
          d.acceso_pendiente = act.filter((c) => {
            const raw = this.db.clients.find((x) => x.id === c.id) || {};
            return (raw.acceso_socio || {}).estado !== "Listo";
          }).length;
        }
        if (["founder", "coo"].includes(r)) {
          d.riesgo = this.riesgoClientes().filter((x) => x.nivel !== "Bajo").slice(0, 5);
        }
        if (["founder", "coo", "finanzas"].includes(r)) {
          const cb = this.cobranza();
          d.cobranza = { recordatorios: cb.recordatorios.length, renovar: cb.renovar.length, pausar: cb.recordatorios.filter((x) => x.puede_pausar).length };
        }
        if (this.canRead("piezas")) d.guiones_esperando = this.safeList("piezas").filter((z) => z.estado === "Guion para aprobar").length;
        return d;
      },
      // ══════════════ reglas de las piezas (guion, lista de revisión, servicio pausado) ══════════════
      clienteDePieza(z) {
        const pr = this.db.projects.find((x) => x.id === z.project_id);
        return pr ? this.db.clients.find((x) => x.id === pr.client_id) : null;
      },
      exigirChecklist(z) {
        if (this.db.settings.checklist_obligatoria === false) return;
        const items = this.checklistDe(z.tipo);
        const hechos = z.checklist || {};
        const faltan = items.filter((i) => !hechos[i]);
        if (faltan.length) throw entrada(`Antes de enviarla al cliente completa la lista de revisi\xF3n. Falta: ${faltan.join(", ")}.`);
      },
      reglasPieza(data, existing) {
        const z = { ...existing || {}, ...data };
        const c = this.clienteDePieza(z) || {};
        if (!existing) {
          if (c.servicio_pausado && !this._sistema) throw entrada(`El servicio de ${c.nombre} est\xE1 pausado por falta de pago: no se crean piezas nuevas hasta reactivarlo.`);
          if (c.aprobar_guion && (!data.estado || data.estado === "En producci\xF3n")) data.estado = "Guion para aprobar";
          return;
        }
        if (!("estado" in data) || data.estado === existing.estado) return;
        if (data.estado === "Revisi\xF3n del cliente") this.exigirChecklist({ ...existing, ...data });
        if (existing.estado === "Guion para aprobar" && data.estado !== "Guion para aprobar" && !existing.guion_aprobado) {
          if (!["founder", "coo", "creativo_dir"].includes(this.user.rol)) throw entrada("El guion lo aprueba el cliente desde su portal. Si lo aprob\xF3 por otro medio, p\xEDdele a Direcci\xF3n que la pase a producci\xF3n.");
          data.guion_aprobado = now();
          (existing.comentarios ||= []).push({ id: crypto.randomUUID(), fecha: now(), por: this.user.nombre, texto: "Guion aprobado por otro medio (lo pas\xF3 Direcci\xF3n).", interno: true, version: existing.version || 1 });
        }
      },
      // ══════════════ 26 · idea → pieza ══════════════
      ideaAPieza(id, projectId) {
        this.requireUser();
        if (!this.canWrite("ideas") || !this.canWrite("piezas")) throw acceso("Tu rol no puede convertir ideas en piezas.");
        const i = this.rawScoped("ideas", id);
        if (i.pieza_id) throw entrada("Esta idea ya es una pieza.");
        const prs = this.db.projects.filter((x) => x.client_id === i.client_id && !["Entregado", "Cancelado"].includes(x.estado));
        const pr = projectId ? prs.find((x) => x.id === projectId) : prs.sort((a, b) => a.creado < b.creado ? 1 : -1)[0];
        if (!pr) throw entrada("Este cliente no tiene un proyecto abierto. Crea el proyecto primero.");
        const z = this.save("piezas", { titulo: i.titulo, project_id: pr.id, tipo: i.tipo || "Video", guion: [i.descripcion, i.referencia ? "Referencia: " + i.referencia : "", i.material ? "Material: " + i.material : ""].filter(Boolean).join("\n\n") });
        i.pieza_id = z.id;
        i.estado = "Usada";
        this.persist();
        return z;
      },
      // ══════════════ 30 · respuestas guardadas ══════════════
      aplicarRespuesta(id, vars = {}) {
        this.requireUser();
        if (this.isClient() || !this.canRead("respuestas")) throw acceso("No tienes acceso a las respuestas guardadas.");
        const r = this.rawScoped("respuestas", id);
        const v = { estudio: this.db.settings.empresa, yo: this.user.nombre.split(" ")[0], ...vars };
        if (vars.client_id) {
          const c = this.db.clients.find((x) => x.id === vars.client_id);
          if (c) {
            v.cliente = v.cliente || c.nombre;
            v.contacto = v.contacto || (c.contacto || c.nombre).split(" ")[0];
          }
        }
        const texto = String(r.texto).replace(/\{(\w+)\}/g, (m, k) => v[k] !== void 0 && v[k] !== "" ? String(v[k]) : m);
        r.usos = num(r.usos) + 1;
        this.persist();
        return { texto, faltan: [...texto.matchAll(/\{(\w+)\}/g)].map((x) => x[1]) };
      },
      crearRespuestasBase() {
        this.requireUser();
        if (!this.canWrite("respuestas")) throw acceso("Tu rol no puede crear respuestas.");
        const base = [
          ["Ya estamos en ello", "es", "Seguimiento", "\xA1Hola {contacto}! Ya estamos trabajando en tu pedido. Te escribo apenas lo tengamos listo. \u2014 {yo}, {estudio}"],
          ["On it", "en", "Seguimiento", "Hi {contacto}! We're already working on it. I'll message you as soon as it's ready. \u2014 {yo}, {estudio}"],
          ["Aqu\xED est\xE1 la versi\xF3n 2", "es", "Entregas", 'Hola {contacto}, aqu\xED tienes la versi\xF3n {version} de "{pieza}" con los cambios que pediste. Puedes aprobarla o comentar desde tu portal.'],
          ["Here is version 2", "en", "Entregas", 'Hi {contacto}, here is version {version} of "{pieza}" with the changes you asked for. You can approve it or leave comments in your portal.'],
          ["Recordatorio de pago", "es", "Cobros", "Hola {contacto}, te recordamos que la factura {factura} por {monto} vence el {fecha}. Puedes pagar y reportarlo desde tu portal. \xA1Gracias!"],
          ["Payment reminder", "en", "Cobros", "Hi {contacto}, friendly reminder that invoice {factura} for {monto} is due on {fecha}. You can pay and report it from your portal. Thank you!"],
          ["Material recibido", "es", "Seguimiento", "\xA1Recibido, {contacto}! Ya tenemos el material. Te avisamos cuando est\xE9 el primer corte."],
          ["Material received", "en", "Seguimiento", "Got it, {contacto}! We have the material. We will let you know when the first cut is ready."]
        ];
        let n = 0;
        for (const [titulo, idioma, categoria, texto] of base) {
          if (this.db.replies.some((x) => x.titulo === titulo)) continue;
          this.save("respuestas", { titulo, idioma, categoria, texto });
          n++;
        }
        return { creadas: n };
      },
      // ══════════════ portal del cliente (bienvenida, socio, encuesta, guiones) ══════════════
      miPortal19() {
        const u = this.requireUser();
        if (!this.isClient()) throw acceso("Esto es del portal del cliente.");
        const c = this.db.clients.find((x) => x.id === u.client_id) || {};
        const b = c.bienvenida || {};
        const pids = new Set(this.db.projects.filter((x) => x.client_id === c.id).map((x) => x.id));
        return {
          campos: BIENVENIDA.map(([key, label]) => ({ key, label, valor: b[key] || "" })),
          pct: this.completitudBienvenida(c),
          acceso_socio: (c.acceso_socio || { estado: "Pendiente" }).estado,
          meta_business_id: this.db.settings.meta_business_id || "",
          estudio: this.db.settings.empresa,
          encuesta: this.encuestaPendiente(),
          guiones: this.db.pieces.filter((z) => pids.has(z.project_id) && z.estado === "Guion para aprobar").map((z) => ({ id: z.id, titulo: z.titulo, guion: z.guion || "", fecha_limite: z.fecha_limite || "" }))
        };
      },
      // ══════════════ 28 · carga por semanas (esta y la próxima) ══════════════
      cargaSemanas() {
        const cg = this.cargaEquipo({ semanas: 2 });
        const hoy = today();
        const dw = ((/* @__PURE__ */ new Date(hoy + "T12:00:00Z")).getUTCDay() + 6) % 7;
        const lunes = masDias(hoy, -dw);
        const sem = [[lunes, masDias(lunes, 6)], [masDias(lunes, 7), masDias(lunes, 13)]];
        const capP = num(this.db.settings.capacidad_piezas_semana) || 8;
        const personas = cg.personas.map((x) => {
          const u = this.db.users.find((y) => y.id === x.id) || {};
          const tope = num(u.capacidad_piezas) || capP;
          const hSem = x.horas_semana || 40;
          const semanas = sem.map(([a, b]) => {
            const piezas = this.db.pieces.filter((z) => z.asignado === x.id && !["Aprobada"].includes(z.estado) && z.fecha_limite && z.fecha_limite >= (a < hoy ? "0000" : a) && z.fecha_limite <= b).length;
            const horas = round2(this.db.tasks.filter((t) => t.asignado === x.id && t.estado !== "Hecha" && t.vence && t.vence >= (a < hoy ? "0000" : a) && t.vence <= b).reduce((s2, t) => s2 + (num(t.horas_estimadas) || 2), 0) + piezas * 2);
            return { desde: a, hasta: b, piezas, horas, tope_piezas: tope, horas_semana: hSem, pasado: piezas > tope || horas > hSem };
          });
          return { id: x.id, nombre: x.nombre, rol: x.rol, semanas, alerta: semanas.some((s2) => s2.pasado) };
        }).filter((x) => ["creativo", "freelancer", "productor", "creativo_dir", "social", "pm"].includes(x.rol) || x.semanas.some((s2) => s2.piezas || s2.horas));
        let cap = null;
        try {
          cap = this.capacidadClientes();
        } catch (e) {
        }
        return { personas, alertas: personas.filter((x) => x.alerta).map((x) => x.nombre), capacidad: cap };
      },
      // ══════════════ tareas automáticas (cada 5 min desde la nube o la app; lo diario, una vez al día) ══════════════
      tareasAutomaticas(ahora = Date.now()) {
        const previo = this.user;
        const sis = this.db.users.find((x) => x.activo && x.rol === "founder") || this.db.users.find((x) => x.activo && x.rol === "coo");
        if (!sis) return { ok: false };
        this.user = sis;
        this._sistema = true;
        const res = { facturas: [], piezas: 0, renovar: 0, recordatorios: 0, sin_respuesta: 0 };
        try {
          const hoy = ymd(new Date(ahora));
          const m = this.db.meta = this.db.meta || {};
          if (m.auto_dia !== hoy) {
            m.auto_dia = hoy;
            for (const sb of this.db.subscriptions.filter((x) => x.estado === "Activo" && x.proximo_cobro === masDias(hoy, 5) && x.aviso_renovacion !== x.proximo_cobro)) {
              sb.aviso_renovacion = sb.proximo_cobro;
              res.renovar++;
              this.emit("pagos", `El plan ${sb.nombre} se renueva en 5 d\xEDas`, `${this.nameOf("clients", sb.client_id)} \xB7 ${sb.proximo_cobro}. La factura se crea sola 3 d\xEDas antes.`);
            }
            if (this.db.settings.facturar_auto !== false) {
              const antes = new Map(this.db.subscriptions.map((x) => [x.id, x.proximo_cobro]));
              try {
                res.facturas = this.action("planes.facturar", {});
              } catch (e) {
                res.error_facturas = e.message;
              }
              for (const sb of this.db.subscriptions.filter((x) => antes.get(x.id) && antes.get(x.id) !== x.proximo_cobro)) {
                if (sb.piezas_auto === false || !(num(sb.piezas_mes) || /plan mensual|redes|reels/i.test(`${sb.tipo} ${sb.nombre}`))) continue;
                try {
                  res.piezas += this.generarPiezasPlan(sb.id, mesDe(antes.get(sb.id))).creadas;
                } catch (e) {
                }
              }
            }
            for (const r of this.cobranza().recordatorios) {
              const f = this.db.invoices.find((x) => x.id === r.factura_id);
              f.recordatorios = f.recordatorios || {};
              if (f.recordatorios[r.etapa]) continue;
              f.recordatorios[r.etapa] = now();
              res.recordatorios++;
              this.emit("pagos", `Cobro: ${r.codigo} de ${r.cliente} \xB7 ${r.etapa.toLowerCase()}`, `Mensaje listo para copiar en Renovaciones y cobranza.${r.puede_pausar ? " Ya puedes pausar el servicio." : ""}`);
            }
          }
          for (const x of this.sinRespuesta()) {
            const rec = x.tipo === "solicitud" ? this.db.tickets.find((t) => t.id === x.id) : this.db.inbox.find((t) => t.id === x.id);
            if (!rec) continue;
            const marca = x.escalar ? "alerta_48" : "alerta_24";
            const desde = (x.tipo === "solicitud" ? ((rec.respuestas || []).filter((r) => !r.interno).slice(-1)[0] || {}).fecha : rec.fecha) || rec.creado;
            if (rec[marca] === desde) continue;
            rec[marca] = desde;
            res.sin_respuesta++;
            const c = this.db.clients.find((y) => y.id === rec.client_id) || {};
            const duenos = rec.asignado ? [rec.asignado] : c.asignados || [];
            const para = x.escalar ? [.../* @__PURE__ */ new Set([...duenos, ...this.db.users.filter((u) => u.activo && ["founder", "coo"].includes(u.rol)).map((u) => u.id)])] : duenos;
            this.emit("soporte", `${x.escalar ? "\u26A0\uFE0F Sin respuesta 48 h" : "Sin respuesta 24 h"}: ${x.cliente || "cliente"}${x.codigo ? " \xB7 " + x.codigo : ""}`, x.asunto, { para });
          }
          this.persist();
        } finally {
          this.user = previo;
          this._sistema = false;
        }
        return res;
      }
    };
    module.exports = { metodos, BIENVENIDA, CHECKLIST_BASE, LINEAS, MOTIVOS_BAJA, horasHabiles };
  }
});

// src/main/core.js
var require_core = __commonJS({
  "src/main/core.js"(exports, module) {
    var fs = (init_shim_vacio(), __toCommonJS(shim_vacio_exports));
    var path = (init_shim_vacio(), __toCommonJS(shim_vacio_exports));
    var crypto = (init_shim_crypto(), __toCommonJS(shim_crypto_exports));
    var { ROLES, MODULES, PERMS, FIELD_VIS, STAFF, CLIENT_ROLES } = require_config();
    var REDES_SOCIALES = ["Instagram", "Facebook", "TikTok", "YouTube"];
    var REDES_AUTO = { Instagram: "Instagram", Facebook: "Facebook", TikTok: "TikTok", YouTube: "YouTube" };
    var { METRICAS_META } = require_core16();
    var C17 = require_core17();
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
      "social_tokens",
      "social_stats",
      "social_posts",
      "goals",
      "inbox",
      "templates",
      "ideas",
      "replies",
      "surveys"
    ];
    var PIECE_CLIENT_STATES = ["Guion para aprobar", "Revisi\xF3n del cliente", "Cambios pedidos", "Aprobada"];
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
      metodos_pago: ["Pago M\xF3vil", "Zelle", "Transferencia", "Binance", "Efectivo", "PayPal", "Payoneer", "Otro"],
      metodos_info: null,
      idioma_defecto: "es",
      meta_mensual: 15e3,
      meta_business_id: "",
      checklist_revision: null,
      checklist_obligatoria: true,
      horario_atencion: { dias: [1, 2, 3, 4, 5], desde: 9, hasta: 18 },
      horas_por_cliente: 20,
      capacidad_piezas_semana: 8,
      facturar_auto: true,
      vapid_publica: "",
      vapid_privada: "",
      push_contacto: "",
      adelanto_pct: 50,
      precio_plan_mensual: 1500,
      descuento_3_meses: 10,
      reels_plan_mensual: 12,
      comision_vendedor_pct: 10,
      comision_socio_pct: 10,
      comision_meses: 3,
      exigir_2fa_roles: null,
      marca_blanca_nombre: "Estudio de producci\xF3n",
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
      ttb_app_id: "",
      ttb_app_secret: "",
      ttb_auth_url: "",
      google_client_id: "",
      google_client_secret: "",
      youtube_auditada: false,
      cron_secreto: "",
      redes_ultima_sync: null,
      monedas: require_core16().MONEDAS_BASE.map((m) => ({ ...m })),
      tasas_al: null,
      tasas_fuente: "",
      exigir_2fa: false,
      horario_base: null,
      horario_nucleo: null,
      meta_mensajes_dia: 50,
      boveda_verificador: null,
      tienda_activa: false,
      tienda_titulo: "Delirium Merch",
      tienda_datos_pago: "",
      tienda_envios: "Delivery en Caracas y env\xEDos a toda Venezuela por MRW o Zoom."
    };
    var SECRET_SETTINGS = ["actualizaciones_url", "discord_webhook", "discord_bot_token", "meta_token", "meta_app_secret", "ig_app_secret", "tiktok_client_secret", "ttb_app_secret", "google_client_secret", "cron_secreto", "vapid_privada"];
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
        if (Array.isArray(this.db.settings.metodos_pago) && !this.db.settings.metodos_pago.includes("Payoneer")) this.db.settings.metodos_pago = [...this.db.settings.metodos_pago.filter((x) => x !== "Otro"), "Payoneer", "Otro"];
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
        return { password: this.db.meta.demo_password, cuentas: this.db.users.filter((u) => u.demo && u.activo).map((u) => ({ email: u.email, nombre: u.nombre, rol: ROLES[u.rol].label, cliente: CLIENT_ROLES.includes(u.rol) })) };
      }
      publicUser(u) {
        if (!u) return null;
        const { password, intentos, bloqueado_hasta, totp, totp_pendiente, invitacion, ...rest } = u;
        return { ...rest, ...CLIENT_ROLES.includes(u.rol) ? (() => {
          const c = this.db.clients.find((x) => x.id === u.client_id) || {};
          return { moneda_cliente: c.moneda || "", idioma_cliente: c.idioma || "es", sin_marca: !!c.sin_marca, zona_cliente: c.zona_horaria || "" };
        })() : {}, dos_pasos: !!(totp && totp.activo), codigos_restantes: totp && totp.activo ? (totp.codigos || []).length : 0, debe_activar_2fa: this.debeActivar2fa(u) };
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
      login(email, password, codigo) {
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
        if (u.totp && u.totp.activo) {
          if (!codigo) throw Object.assign(new Error("Escribe el c\xF3digo de 6 d\xEDgitos de tu app de verificaci\xF3n."), { code: "TOTP" });
          if (!this.verificarTotp(u, codigo)) {
            u.intentos = (u.intentos || 0) + 1;
            if (u.intentos >= 5) {
              u.bloqueado_hasta = new Date(Date.now() + 5 * 6e4).toISOString();
              u.intentos = 0;
            }
            this.persist();
            throw new AccessError("El c\xF3digo no es correcto o ya se us\xF3. Escribe el que aparece ahora en tu app.");
          }
        }
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
        if (this.debeActivar2fa(this.user)) throw new AccessError("Direcci\xF3n pide activar la verificaci\xF3n en dos pasos. Act\xEDvala para continuar.");
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
      marcarTutorial(visto = true) {
        const u = this.requireUser();
        u.tutorial = visto ? now() : null;
        this.persist();
        return u.tutorial;
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
          out.dos_pasos = !!(out.totp && out.totp.activo);
          delete out.password;
          delete out.intentos;
          delete out.bloqueado_hasta;
          out.invitacion_vence = out.invitacion && Date.parse(out.invitacion.vence) > Date.now() ? out.invitacion.vence : null;
          delete out.totp;
          delete out.totp_pendiente;
          delete out.invitacion;
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
            delete out.pago_freelance;
          }
          if (col === "projects") delete out.adelanto_saltado;
        }
        return this.decorate(col, out);
      }
      nameOf(col, id) {
        const r = id && this.db[col].find((x) => x.id === id);
        return r ? r.nombre || r.titulo || r.codigo || "" : "";
      }
      decorate(col, r) {
        if (r.client_id) r._cliente = this.nameOf("clients", r.client_id);
        if (col === "pieces" && r.enlace) {
          r._miniatura = C17.miniaturaDe(r.enlace);
          r._vista = C17.vistaDe(r.enlace);
        }
        if (col === "goals") {
          Object.assign(r, this.calcularMeta(r));
          r._cliente = this.nameOf("clients", r.client_id);
          r._metrica = (METRICAS_META[r.metrica] || {}).label || r.metrica;
        }
        if (col === "socials") {
          if (!r.client_id) r._cliente = "Delirium Studios";
          r._vence_dias = r.vence ? Math.ceil((Date.parse(r.vence) - Date.now()) / 864e5) : null;
          r._m30 = this.resumenCuenta(r, 30);
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
        if (col === "invoices") {
          Object.assign(r, this.invoiceTotals(r));
          if (r._saldo > 0) r._metodos = this.metodosPara(r.client_id);
        }
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
        if (col === "services") {
          const cs = this.db.clients.filter((x) => Array.isArray(x.servicios) && x.servicios.includes(r.id));
          r._clientes = cs.map((x) => x.nombre);
          r._clientes_ids = cs.map((x) => x.id);
          r._ingreso_planes = round2(this.db.subscriptions.filter((x) => x.estado === "Activo" && cs.some((cl) => cl.id === x.client_id) && x.service_id === r.id).reduce((a, x) => a + num(x.monto), 0));
        }
        if (col === "subscriptions" && /marca blanca/i.test(r.tipo || "")) {
          const n = this.entregadosMes(r).length;
          r._entregados_mes = n;
          r._a_facturar = round2(n * num(r.precio_reel));
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
        if (col === "socials") {
          this.db.inbox = this.db.inbox.filter((x) => x.cuenta_id !== id);
          this.db.social_tokens = this.db.social_tokens.filter((t) => t.id !== id);
          this.db.social_stats = this.db.social_stats.filter((x) => x.cuenta_id !== id);
          this.db.social_posts = this.db.social_posts.filter((x) => x.cuenta_id !== id);
        }
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
          vault: ["nombre"],
          ideas: ["titulo", "client_id"],
          replies: ["titulo", "texto"]
        }[col] || [];
        const names = { supplier_id: "proveedor", client_id: "cliente", product_id: "producto", usuario_id: "persona", project_id: "proyecto", game_id: "juego", proximo_cobro: "pr\xF3ximo cobro", asunto: "asunto" };
        for (const f of req) if (r[f] === void 0 || r[f] === null || r[f] === "") throw new InputError(`Falta completar: ${names[f] || f.replace(/_/g, " ")}.`);
        if (col === "leaves" && r.hasta < r.desde) throw new InputError("La fecha final no puede ser antes de la inicial.");
        if (col === "timesheets" && (num(r.horas) <= 0 || num(r.horas) > 24)) throw new InputError("Las horas deben estar entre 0 y 24.");
        if (col === "stock_moves" && num(r.cantidad) <= 0) throw new InputError("La cantidad debe ser mayor que cero.");
        if (col === "subscriptions" && num(r.monto) <= 0 && !(/marca blanca/i.test(r.tipo || "") && num(r.precio_reel) > 0)) throw new InputError("El monto del plan debe ser mayor que cero.");
        if (col === "campaigns" && r.inicio && r.fin && r.fin < r.inicio) throw new InputError("La fecha final no puede ser antes de la inicial.");
        if (col === "orders" && !(r.lineas || []).some((l) => l.descripcion)) throw new InputError("Agrega al menos un producto al pedido.");
      }
      beforeSave(col, data, existing) {
        const s = this.db.settings;
        if (col === "clients") {
          const pais = data.pais || existing && existing.pais;
          if (pais && pais !== "Venezuela" && !data.moneda && !(existing && existing.moneda)) data.moneda = "USD";
          if (data.traido_por_tipo === "Vendedor" && data.traido_por && !this.db.users.some((x) => x.id === data.traido_por)) throw new InputError("Elige el vendedor que trajo al cliente.");
          if (data.instagram) data.instagram = "@" + String(data.instagram).trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/[/?#].*$/, "").replace(/^@/, "");
          if (data.etapa && !C17.ETAPAS.includes(data.etapa)) throw new InputError("Etapa no v\xE1lida.");
          if (data.etapa === "Descartado" && !(data.motivo_descartado || existing && existing.motivo_descartado)) throw new InputError("Elige por qu\xE9 se descarta este prospecto.");
          if (data.etapa && (!existing || existing.etapa !== data.etapa)) {
            data.historial = data.historial || existing && existing.historial || [];
            data.historial.unshift({ fecha: now(), tipo: "Etapa", etapa: data.etapa, nota: `Etapa: ${data.etapa}`, por: this.user ? this.user.nombre : "" });
            if (["Prueba", "Plan mensual"].includes(data.etapa)) data.estado = "Actual";
          }
          if (!existing && !data.forzar_duplicado) {
            const d = this.buscarDuplicado(data);
            if (d) throw new InputError(`Ya existe "${d.con.nombre}" con el mismo ${d.por}. \xC1brelo en vez de crear otro.`);
          }
          delete data.forzar_duplicado;
        }
        if (col === "projects") {
          if (data.tipo_proyecto === "Prueba" && !data.entrega && !(existing && existing.entrega)) data.entrega = ymd(new Date(Date.parse((data.inicio || existing && existing.inicio || today()) + "T12:00:00Z") + 7 * 864e5));
          this._auditarSalto = null;
          this.revisarAdelanto(data, existing);
          if (this._auditarSalto && existing) this.audit("editar", "proyectos", existing.id, `\u26A0\uFE0F El CEO empez\xF3 "${this._auditarSalto.nombre}" sin el adelanto verificado (faltaban ${this._auditarSalto.faltaba})`);
        }
        if (col === "pieces") this.reglasPieza(data, existing);
        if (col === "ideas" && !existing) {
          data.estado = data.estado || "Nueva";
          data.etiquetas = Array.isArray(data.etiquetas) ? data.etiquetas.slice(0, 12) : [];
        }
        if (col === "pieces") {
          if (this.memory && data.archivo && C17.VIDEO.test(data.archivo.nombre || data.archivo.ruta || "")) throw new InputError('Los videos no se suben a la nube gratis (1 GB en total): sube el video a Google Drive, comp\xE1rtelo con "cualquiera con el enlace" y pega el enlace.');
        }
        if (col === "goals") {
          const g = { ...existing || {}, ...data };
          if (!g.client_id) throw new InputError("Elige el cliente de la meta.");
          if (!METRICAS_META[g.metrica]) throw new InputError("Elige qu\xE9 se va a medir.");
          if (!(num(g.objetivo) > 0)) throw new InputError("Escribe el n\xFAmero a alcanzar.");
          if (!g.desde || !g.hasta || g.desde > g.hasta) throw new InputError("Revisa las fechas: el inicio debe ser antes del final.");
          if (g.red && !["Todas", ...REDES_SOCIALES].includes(g.red)) throw new InputError("Red no v\xE1lida.");
          if ("objetivo" in data) data.objetivo = num(data.objetivo);
          if (!g.titulo) data.titulo = `${num(g.objetivo).toLocaleString("es-VE")}${(METRICAS_META[g.metrica] || {}).pct ? "" : " "}${(METRICAS_META[g.metrica] || {}).corto || ""}${g.red && g.red !== "Todas" ? " en " + g.red : ""}`.trim();
        }
        if (col === "socials") {
          if (existing) {
            for (const k of Object.keys(data)) if (!["client_id", "red", "nombre", "notas"].includes(k)) delete data[k];
            if (data.red && data.red !== existing.red && existing.estado !== "Sin conectar") throw new InputError("Desconecta la cuenta antes de cambiarle la red.");
          } else {
            for (const k of ["estado", "cuenta_ext", "seguidores", "historial", "vence", "paginas", "ultimo_error", "conectada_el", "enlace_perfil", "tiktok_bandeja"]) delete data[k];
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
          "usuario.reiniciar2fa": () => {
            if (!this.canWrite("equipo")) throw new AccessError("Solo Direcci\xF3n quita la verificaci\xF3n en dos pasos.");
            const t = this.db.users.find((x) => x.id === p.id);
            if (!t) throw new InputError("Cuenta no encontrada.");
            if (t.rol === "founder" && this.user.rol !== "founder") throw new AccessError("Solo el Founder puede cambiar la cuenta del Founder.");
            delete t.totp;
            delete t.totp_pendiente;
            this.audit("editar", "equipo", t.id, "Verificaci\xF3n en dos pasos quitada por Direcci\xF3n (deber\xE1 activarla de nuevo)");
            this.persist();
            return true;
          },
          "tasas.guardar": () => {
            if (!this.puedeTasas()) throw new AccessError("Solo Direcci\xF3n o Finanzas cambian las tasas.");
            const lista = this.monedas();
            const m = lista.find((x) => x.codigo === String(p.codigo || "").toUpperCase());
            if (!m) throw new InputError("Esa moneda no est\xE1 en la lista.");
            m.tasa = Math.max(0, num(p.tasa));
            m.auto = !!p.auto;
            m.actualizada = now();
            this.db.settings.monedas = lista;
            this.audit("editar", "ajustes", null, `Tasa ${m.codigo}: ${m.tasa}${m.auto ? " (autom\xE1tica)" : " (manual)"}`);
            this.persist();
            return this.monedas();
          },
          "bandeja.marcar": () => this.bandejaMarcar(p.id, p.estado),
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
            if (p.a === "cliente") this.exigirChecklist(pz);
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
            if (p.solo_bandeja) {
              this.db.social_tokens = this.db.social_tokens.filter((t) => t.id !== c.id + ":negocio");
              c.tiktok_bandeja = null;
              this.audit("editar", "cuentas", c.id, "Bandeja de TikTok desconectada");
              this.persist();
              return this.strip("socials", c);
            }
            this.db.social_tokens = this.db.social_tokens.filter((t) => t.id !== c.id && t.id !== c.id + ":negocio");
            Object.assign(c, { estado: "Sin conectar", vence: null, paginas: null, ultimo_error: "", tiktok_bandeja: null });
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
            const allowed = Object.keys(DEFAULT_SETTINGS).filter((k) => !k.startsWith("vapid_"));
            if (p.exigir_2fa && !this.db.settings.exigir_2fa && !(u.totp && u.totp.activo)) throw new InputError("Activa primero tu propia verificaci\xF3n en dos pasos (Mi cuenta) y luego ex\xEDgela al equipo.");
            if ("monedas" in p) p.monedas = (Array.isArray(p.monedas) ? p.monedas : []).filter((m) => m && /^[A-Za-z]{2,6}$/.test(String(m.codigo || ""))).map((m) => ({ codigo: String(m.codigo).toUpperCase(), nombre: String(m.nombre || m.codigo).slice(0, 40), simbolo: String(m.simbolo || m.codigo).slice(0, 6), tasa: Math.max(0, num(m.tasa)), auto: !!m.auto, mostrar: m.mostrar !== false, actualizada: m.actualizada || null })).slice(0, 15);
            for (const [k, v] of Object.entries(p)) if (allowed.includes(k)) this.db.settings[k] = v;
            this.db.settings.exigir_2fa = !!this.db.settings.exigir_2fa;
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
      redesConectarNegocio(cuentaId, token) {
        const c = this.db.socials.find((x) => x.id === cuentaId && x.red === "TikTok");
        if (!c) throw new InputError("La cuenta de TikTok ya no existe en Delirium OS.");
        this.db.social_tokens = this.db.social_tokens.filter((t) => t.id !== c.id + ":negocio");
        this.db.social_tokens.push({ id: c.id + ":negocio", red: "TikTok", ...token, actualizado: now() });
        c.tiktok_bandeja = { conectada_el: now(), open_id: (token.extra || {}).open_id || null };
        c.bandeja_aviso = "";
        c.bandeja_al = null;
        this.db.audit.unshift({ id: uid(), fecha: now(), usuario: "Conexi\xF3n de redes", accion: "editar", modulo: "cuentas", registro: c.id, detalle: "Bandeja de TikTok conectada" });
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
          const zc = (this.db.clients.find((c) => c.id === post.client_id) || {}).zona_horaria || zona;
          if (postId ? post.id !== postId : !(post.publicar_auto && ["Aprobado", "Programado"].includes(post.estado) && _Core.fechaEnZona(post.fecha, zc) <= ahora)) continue;
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
      // ───── métricas de la cuenta completa ─────
      // social_stats: un registro por cuenta y mes, con los días dentro (pocos registros aunque pasen años).
      redesGuardarDia(c, dia, m) {
        if (!c || !m) return;
        const id = `${c.id}:${dia.slice(0, 7)}`;
        let r = this.db.social_stats.find((x) => x.id === id);
        if (!r) {
          r = { id, cuenta_id: c.id, client_id: c.client_id || null, red: c.red, mes: dia.slice(0, 7), dias: {} };
          this.db.social_stats.push(r);
        }
        const limpio = Object.fromEntries(Object.entries(m).filter(([, x]) => x !== null && x !== void 0 && Number.isFinite(Number(x))).map(([k, x]) => [k, Number(x)]));
        r.dias[dia.slice(8, 10)] = { ...r.dias[dia.slice(8, 10)] || {}, ...limpio };
        r.actualizado = now();
      }
      redesDiaGuardado(c, dia) {
        const r = this.db.social_stats.find((x) => x.id === `${c.id}:${dia.slice(0, 7)}`);
        const d = r && r.dias[dia.slice(8, 10)];
        return !!(d && (d.alcance !== void 0 || d.vistas !== void 0 || d.interacciones !== void 0));
      }
      redesGuardarContenido(c, lista) {
        const ahora = now();
        const vivos = new Map(this.db.social_posts.map((x) => [x.id, x]));
        for (const x of lista || []) {
          const id = `${c.id}:${x.post_id}`;
          const r = vivos.get(id);
          const datos = { ...x, id, cuenta_id: c.id, client_id: c.client_id || null, red: c.red, cuenta: c.nombre || "", actualizado: ahora };
          if (r) Object.assign(r, datos);
          else {
            this.db.social_posts.push(datos);
            vivos.set(id, datos);
          }
          for (const post of this.db.posts) {
            const pub = (post.publicaciones || []).find((p) => p.cuenta_id === c.id && String(p.id) === String(x.post_id));
            if (pub) this.redesMetricas(post, c.red, { alcance: x.alcance || 0, vistas: x.vistas || 0, me_gusta: x.me_gusta || 0, comentarios: x.comentarios || 0, compartidos: x.compartidos || 0, guardados: x.guardados || 0, interacciones: x.interacciones || 0 });
          }
        }
        const limite = Date.now() - 400 * 864e5;
        this.db.social_posts = this.db.social_posts.filter((x) => x.cuenta_id !== c.id || Date.parse(x.fecha || 0) >= limite);
      }
      // Vista completa de un cliente: servicios, redes que manejamos y sus métricas, proyectos, calendario, anuncios, piezas, cobros, contratos y solicitudes.
      // Cada parte sale solo si el rol puede ver ese módulo, y con el mismo alcance que en su sección.
      fichaCliente(id) {
        this.requireUser();
        const c = this.isClient() ? this.db.clients.find((x) => x.id === this.user.client_id) : this.rawScoped("clientes", id);
        if (!c) throw new AccessError("No encontramos este cliente o no tienes acceso.");
        const de = (m) => this.safeList(m).filter((r) => r.client_id === c.id);
        const hoy = today();
        const out = { id: c.id, nombre: c.nombre, estado: c.estado, categoria: c.categoria || "", puede: {} };
        const sv = (Array.isArray(c.servicios) ? c.servicios : []).map((sid) => this.db.services.find((x) => x.id === sid)).filter(Boolean);
        out.servicios = sv.map((x) => ({ id: x.id, nombre: x.nombre, categoria: x.categoria || "", precio: this.isClient() ? void 0 : num(x.precio), entregables: x.entregables || "" }));
        if (this.canRead("planes")) {
          out.puede.planes = true;
          out.planes = de("planes").map((x) => ({ id: x.id, nombre: x.nombre, tipo: x.tipo, frecuencia: x.frecuencia, monto: num(x.monto), estado: x.estado, proximo_cobro: x.proximo_cobro || "" }));
        }
        if (this.canRead("proyectos")) {
          out.puede.proyectos = true;
          out.proyectos = de("proyectos").map((x) => ({ id: x.id, nombre: x.nombre, servicio: x.servicio || "", estado: x.estado, entrega: x.entrega || "", avance: x._progreso ?? null }));
        }
        if (this.canRead("cuentas")) {
          out.puede.cuentas = true;
          out.redes = de("cuentas").map((x) => ({ id: x.id, red: x.red, nombre: x.nombre || "", estado: x.estado, seguidores: x.seguidores || 0, enlace_perfil: x.enlace_perfil || "", m30: x._m30 || null }));
        }
        if (this.canRead("metricas")) {
          try {
            const m = this.metricasRedes({ client_id: c.id, dias: 30 });
            out.puede.metricas = true;
            out.metricas = { actual: m.actual, cambio: m.cambio, mejor: m.publicaciones[0] || null };
          } catch (e) {
          }
        }
        if (this.canRead("redes")) {
          out.puede.redes = true;
          const ps = de("redes");
          out.publicaciones = { proximas: ps.filter((x) => x.estado !== "Publicado" && String(x.fecha || "") >= hoy).sort((a, b) => a.fecha < b.fecha ? -1 : 1).slice(0, 6).map((x) => ({ id: x.id, titulo: x.titulo, fecha: x.fecha, estado: x.estado, redes: x.redes || [] })), por_aprobar: ps.filter((x) => x.estado === "Por aprobar").length, publicadas_mes: ps.filter((x) => x.estado === "Publicado" && String(x.publicado_el || x.fecha || "").slice(0, 7) === hoy.slice(0, 7)).length };
        }
        if (this.canRead("anuncios")) {
          out.puede.anuncios = true;
          out.campanas = de("anuncios").filter((x) => x.estado === "Activa" || x.estado === "Pausada").map((x) => ({ id: x.id, nombre: x.nombre, plataforma: x.plataforma, estado: x.estado, gastado: num(x.gastado), presupuesto: num(x.presupuesto), resultados: num(x.resultados), tipo_resultado: x.tipo_resultado || "" }));
        }
        if (this.canRead("piezas")) {
          out.puede.piezas = true;
          const pids = new Set((out.proyectos || this.db.projects.filter((p) => p.client_id === c.id)).map((p) => p.id));
          out.piezas = this.safeList("piezas").filter((x) => pids.has(x.project_id) && !["Aprobada", "Entregada"].includes(x.estado)).map((x) => ({ id: x.id, titulo: x.titulo, estado: x.estado, fecha_limite: x.fecha_limite || "" }));
        }
        if (this.canRead("facturas")) {
          out.puede.facturas = true;
          const fs_ = de("facturas").filter((x) => !x.anulada);
          out.cobros = { saldo: round2(fs_.reduce((a, x) => a + (x._saldo || 0), 0)), por_verificar: round2(fs_.reduce((a, x) => a + (x._por_verificar || 0), 0)), pendientes: fs_.filter((x) => (x._saldo || 0) > 0).map((x) => ({ id: x.id, codigo: x.codigo, concepto: x.concepto, saldo: x._saldo, vence: x.vence || "", estado: x._estado })) };
        }
        if (this.canRead("cotizaciones")) {
          out.puede.cotizaciones = true;
          out.cotizaciones = de("cotizaciones").filter((x) => ["Borrador", "Enviada"].includes(x.estado)).map((x) => ({ id: x.id, codigo: x.codigo, titulo: x.titulo, estado: x.estado, total: x._total, vence: x.vence || "" }));
        }
        if (this.canRead("contratos")) {
          out.puede.contratos = true;
          out.contratos = de("contratos").map((x) => ({ id: x.id, titulo: x.titulo, tipo: x.tipo, estado: x.estado, vence: x.vence || "" }));
        }
        if (this.canRead("metas")) {
          out.puede.metas = true;
          out.metas = de("metas").filter((g) => g.estado !== "Archivada").map((g) => ({ id: g.id, titulo: g.titulo, red: g.red, desde: g.desde, hasta: g.hasta, objetivo: g.objetivo, _actual: g._actual, _avance: g._avance, _esperado: g._esperado, _ritmo: g._ritmo }));
        }
        if (this.canRead("metricas")) {
          try {
            const h = this.mejorHora({ client_id: c.id, dias: 120 });
            out.horas = { mejores: h.mejores.slice(0, 3), horas_activas: h.horas_activas, publicaciones: h.publicaciones, poco: h.poco };
          } catch (e) {
          }
        }
        if (this.canRead("soporte")) {
          out.puede.soporte = true;
          out.solicitudes = de("soporte").filter((x) => !["Resuelto", "Cerrado"].includes(x.estado)).map((x) => ({ id: x.id, codigo: x.codigo, asunto: x.asunto, estado: x.estado, prioridad: x.prioridad || "" }));
        }
        return out;
      }
      // Resumen corto de una cuenta para su ficha: últimos N días.
      resumenCuenta(c, dias = 30) {
        if (!c || !c.cuenta_ext) return null;
        const desde = new Date(Date.now() - (dias - 1) * 864e5).toISOString().slice(0, 10);
        const antes = new Date(Date.now() - dias * 864e5).toISOString().slice(0, 10);
        const ds = [];
        for (const r of this.db.social_stats.filter((x) => x.cuenta_id === c.id)) for (const [d, v] of Object.entries(r.dias || {})) ds.push({ fecha: `${r.mes}-${d}`, ...v });
        ds.sort((a, b) => a.fecha < b.fecha ? -1 : 1);
        const en = ds.filter((x) => x.fecha >= desde);
        const pubs = this.db.social_posts.filter((x) => x.cuenta_id === c.id && String(x.fecha || "").slice(0, 10) >= desde);
        const diarias = en.some((x) => x.alcance !== void 0 || x.interacciones !== void 0);
        const suma = (k) => {
          const fuente = diarias ? en : pubs;
          const v = fuente.filter((x) => x[k] !== null && x[k] !== void 0);
          return v.length ? v.reduce((a, x) => a + (Number(x[k]) || 0), 0) : null;
        };
        const segAntes = [...ds].reverse().find((x) => x.fecha <= antes && x.seguidores !== void 0) || [...c.historial || []].reverse().find((x) => x.fecha <= antes) || ds.find((x) => x.seguidores !== void 0) || (c.historial || [])[0];
        const o = { dias, alcance: suma("alcance"), vistas: suma("vistas"), interacciones: suma("interacciones"), publicaciones: pubs.length, crecimiento: segAntes ? (c.seguidores || 0) - (segAntes.seguidores || 0) : null, metricas_al: c.metricas_al || null };
        const base = o.alcance || o.vistas;
        o.er = base && o.interacciones !== null ? Math.round(o.interacciones / base * 1e4) / 100 : null;
        return o.alcance === null && o.vistas === null && o.interacciones === null && !pubs.length ? { ...o, vacio: true } : o;
      }
      redesAudiencia(c, a) {
        if (c && a) c.audiencia = { ...a, fecha: now() };
      }
      // Panel de métricas: { client_id, red, dias (7–365), hasta 'AAAA-MM-DD' } → totales, comparación con el período anterior, serie diaria, por red, por cliente, mejores publicaciones y audiencia.
      metricasRedes(p = {}) {
        this.requireUser();
        return this.calcularRedes(this.cuentasMetricas(p), p);
      }
      cuentasMetricas(p = {}) {
        const { level, scope } = this.perm("metricas");
        if (!level) throw new AccessError("No tienes acceso a las m\xE9tricas de redes.");
        let cuentas = this.db.socials.filter((c) => this.inScope("socials", c, scope) && c.cuenta_ext);
        if (p.client_id) cuentas = cuentas.filter((c) => (c.client_id || "") === (p.client_id === "estudio" ? "" : p.client_id));
        if (p.red) cuentas = cuentas.filter((c) => c.red === p.red);
        return cuentas;
      }
      // cálculo sin permisos: lo usan las métricas, las metas y los reportes (siempre con cuentas ya filtradas por permisos)
      calcularRedes(cuentas, p = {}) {
        const dStr = (t) => new Date(t).toISOString().slice(0, 10);
        let dias = Math.min(366, Math.max(1, Math.round(Number(p.dias) || 30)));
        if (p.desde && /^\d{4}-\d{2}-\d{2}$/.test(p.desde) && p.hasta) dias = Math.min(366, Math.max(1, Math.round((Date.parse(p.hasta) - Date.parse(p.desde)) / 864e5) + 1));
        const finT = p.hasta && /^\d{4}-\d{2}-\d{2}$/.test(p.hasta) ? Date.parse(p.hasta + "T00:00:00Z") : Date.parse(dStr(Date.now()) + "T00:00:00Z");
        const ini = dStr(finT - (dias - 1) * 864e5), fin = dStr(finT), pIni = dStr(finT - (2 * dias - 1) * 864e5), pFin = dStr(finT - dias * 864e5);
        const ids = new Set(cuentas.map((c) => c.id));
        const CAMPOS = ["alcance", "vistas", "interacciones", "me_gusta", "comentarios", "compartidos", "guardados", "visitas_perfil", "clics_web", "toques_enlaces", "nuevos_seguidores", "dejaron", "cuentas_interactuaron"];
        const diasDe = (cid) => {
          const out = [];
          for (const r of this.db.social_stats.filter((x) => x.cuenta_id === cid)) for (const [d, v] of Object.entries(r.dias || {})) out.push({ fecha: `${r.mes}-${d}`, ...v });
          return out.sort((a, b) => a.fecha < b.fecha ? -1 : 1);
        };
        const postsDe = (desde, hasta) => this.db.social_posts.filter((x) => ids.has(x.cuenta_id) && String(x.fecha || "").slice(0, 10) >= desde && String(x.fecha || "").slice(0, 10) <= hasta);
        const segEn = (c, fecha) => {
          const ds = diasDe(c.id).filter((x) => x.fecha <= fecha && x.seguidores !== void 0);
          if (ds.length) return ds[ds.length - 1].seguidores;
          const h = (c.historial || []).filter((x) => x.fecha <= fecha);
          return h.length ? h[h.length - 1].seguidores : null;
        };
        const resumen = (lista, desde, hasta) => {
          const t = Object.fromEntries(CAMPOS.map((k) => [k, 0]));
          const tiene = {};
          for (const c of lista) for (const d of diasDe(c.id).filter((x) => x.fecha >= desde && x.fecha <= hasta)) for (const k of CAMPOS) if (d[k] !== void 0) {
            t[k] += d[k];
            tiene[k] = true;
          }
          const pubs2 = this.db.social_posts.filter((x) => lista.some((c) => c.id === x.cuenta_id) && String(x.fecha || "").slice(0, 10) >= desde && String(x.fecha || "").slice(0, 10) <= hasta);
          for (const c of lista) {
            if (diasDe(c.id).some((x) => x.fecha >= desde && x.fecha <= hasta && (x.alcance !== void 0 || x.interacciones !== void 0))) continue;
            for (const x of pubs2.filter((y) => y.cuenta_id === c.id)) for (const k of ["vistas", "interacciones", "me_gusta", "comentarios", "compartidos", "guardados", "alcance"]) if (x[k] !== null && x[k] !== void 0) {
              t[k] += Number(x[k]) || 0;
              tiene[k] = true;
            }
          }
          for (const k of CAMPOS) if (!tiene[k]) t[k] = null;
          const segFin = lista.reduce((a, c) => a + (segEn(c, hasta) ?? 0), 0);
          const segIni = lista.reduce((a, c) => a + (segEn(c, dStr(Date.parse(desde) - 864e5)) ?? segEn(c, desde) ?? 0), 0);
          const nPub = pubs2.length;
          const base = t.alcance || t.vistas || 0;
          return {
            ...t,
            seguidores: segFin,
            crecimiento: segFin - segIni,
            crecimiento_pct: segIni ? Math.round((segFin - segIni) / segIni * 1e3) / 10 : null,
            publicaciones: nPub,
            er_alcance: base && t.interacciones !== null ? Math.round(t.interacciones / base * 1e4) / 100 : null,
            er_seguidores: segFin && nPub && t.interacciones !== null ? Math.round(t.interacciones / nPub / segFin * 1e4) / 100 : null
          };
        };
        const actual = resumen(cuentas, ini, fin), previo = resumen(cuentas, pIni, pFin);
        const cambio = {};
        for (const k of [...CAMPOS, "seguidores", "publicaciones", "er_alcance"]) cambio[k] = actual[k] !== null && previo[k] ? Math.round((actual[k] - previo[k]) / previo[k] * 1e3) / 10 : null;
        const serie = [];
        for (let t = Date.parse(ini); t <= finT; t += 864e5) {
          const f = dStr(t);
          const o = { fecha: f, alcance: 0, vistas: 0, interacciones: 0, seguidores: 0 };
          for (const c of cuentas) {
            const d = diasDe(c.id).find((x) => x.fecha === f) || {};
            o.alcance += d.alcance || 0;
            o.vistas += d.vistas || 0;
            o.interacciones += d.interacciones || 0;
            o.seguidores += segEn(c, f) ?? 0;
          }
          for (const x of postsDe(f, f)) if (!diasDe(x.cuenta_id).some((d) => d.fecha === f && d.interacciones !== void 0)) {
            o.interacciones += x.interacciones || 0;
            o.vistas += x.vistas || 0;
          }
          serie.push(o);
        }
        const porRed = [...new Set(cuentas.map((c) => c.red))].map((red) => ({ red, cuentas: cuentas.filter((c) => c.red === red).length, ...resumen(cuentas.filter((c) => c.red === red), ini, fin) }));
        const porCliente = p.client_id || this.isClient() ? [] : [...new Set(cuentas.map((c) => c.client_id || ""))].map((cid) => ({ client_id: cid || "estudio", cliente: cid ? this.nameOf("clients", cid) : "Delirium Studios", redes: [...new Set(cuentas.filter((c) => (c.client_id || "") === cid).map((c) => c.red))], ...resumen(cuentas.filter((c) => (c.client_id || "") === cid), ini, fin) })).sort((a, b) => (b.interacciones || 0) - (a.interacciones || 0));
        const pubs = postsDe(ini, fin).map((x) => ({ ...x, er: x.alcance || x.vistas ? Math.round((x.interacciones || 0) / (x.alcance || x.vistas) * 1e4) / 100 : null, cliente: x.client_id ? this.nameOf("clients", x.client_id) : "Delirium Studios" })).sort((a, b) => (b.interacciones || 0) - (a.interacciones || 0));
        const tipos = {};
        for (const x of pubs) {
          const k = `${x.red} \xB7 ${x.tipo || "Otro"}`;
          tipos[k] = tipos[k] || { formato: k, publicaciones: 0, interacciones: 0, alcance: 0 };
          tipos[k].publicaciones++;
          tipos[k].interacciones += x.interacciones || 0;
          tipos[k].alcance += x.alcance || x.vistas || 0;
        }
        return {
          desde: ini,
          hasta: fin,
          dias,
          actual,
          previo,
          cambio,
          serie,
          porRed,
          porCliente,
          publicaciones: pubs.slice(0, 200),
          formatos: Object.values(tipos).map((t) => ({ ...t, promedio: Math.round(t.interacciones / t.publicaciones) })).sort((a, b) => b.promedio - a.promedio),
          audiencia: cuentas.filter((c) => c.audiencia).map((c) => ({ cuenta: c.nombre, red: c.red, cliente: c.client_id ? this.nameOf("clients", c.client_id) : "Delirium Studios", ...c.audiencia })),
          cuentas: cuentas.map((c) => ({ id: c.id, client_id: c.client_id || "estudio", red: c.red, nombre: c.nombre, estado: c.estado, cliente: c.client_id ? this.nameOf("clients", c.client_id) : "Delirium Studios", seguidores: c.seguidores || 0, metricas_al: c.metricas_al || null, ultimo_error: c.ultimo_error || "" }))
        };
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
        if (this.canRead("metas")) d.metas_atrasadas = this.safeList("metas").filter((g) => g._ritmo === "Atrasada" && g.estado !== "Archivada").map((g) => ({ id: g.id, titulo: g.titulo, _cliente: g._cliente, _avance: g._avance, _esperado: g._esperado, hasta: g.hasta }));
        if (this.perm("carga").scope === "all") {
          try {
            const cg = this.cargaEquipo({ semanas: 2 });
            d.carga = { saturados: cg.personas.filter((x) => x.nivel === "Saturado").map((x) => ({ nombre: x.nombre, pct: x.pct })), libres: cg.resumen.libres, sin_asignar: cg.resumen.sin_asignar };
          } catch (e) {
          }
        }
        if (this.canRead("bandeja") && !this.isClient()) {
          d.bandeja_nuevos = this.db.inbox.filter((x) => x.estado === "Nuevo").length;
          d.bandeja_negativos = this.db.inbox.filter((x) => x.estado === "Nuevo" && x.negativo).length;
        }
        if (u.rol === "founder" && this.tieneDatosEjemplo()) d.datos_ejemplo = true;
        if (this.canWrite("cotizaciones") && !this.isClient()) d.pruebas_por_proponer = this.pruebasPorProponer().filter((p) => this.isAdmin() || p.pm === u.id || this.canWrite("proyectos"));
        if (this.isAdmin() || u.rol === "finanzas") {
          try {
            d.comisiones_por_pagar = this.comisiones({ estado: "Por pagar" }).por_pagar;
            d.freelance_por_pagar = this.pagosFreelance({}).por_pagar;
          } catch (e) {
          }
        } else if (!this.isClient()) {
          try {
            const pf = this.pagosFreelance({});
            if (pf.lista.length) d.mis_pagos = { por_pagar: pf.por_pagar, esperando: pf.esperando };
            const cm = this.comisiones({});
            if (cm.lista.length) d.mis_comisiones = cm.por_pagar;
          } catch (e) {
          }
        }
        if (this.canRead("hoy") && !this.isClient()) {
          try {
            const h = this.hoyProspeccion({});
            d.prospeccion = { hechos: h.hechos, meta: h.meta, seguimientos: h.seguimientos.length };
          } catch (e) {
          }
        }
        if (this.canRead("informes") && !this.isClient() && Number(t.slice(8, 10)) <= 5) d.reportes_mes = true;
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
        const optional = ["cotizaciones", "piezas", "redes", "anuncios", "juegos", "planes", "contratos", "metas"];
        const PORTAL = { informes: "Mis reportes", metas: "Mis metas" };
        const modules = MODULES.filter((m) => u && this.perm(m.key, u).level).filter((m) => !(this.isClient() && optional.includes(m.key) && !this.safeList(m.key).length)).map((m) => ({ ...m, ...this.isClient() && PORTAL[m.key] ? { label: PORTAL[m.key] } : {}, ...this.perm(m.key, u) }));
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
    Object.assign(Core.prototype, require_core16().metodos);
    Object.assign(Core.prototype, require_core17().metodos);
    Object.assign(Core.prototype, require_core18().metodos);
    Object.assign(Core.prototype, require_core19().metodos);
    {
      const base = Core.prototype.dashboard;
      Core.prototype.dashboard = function(...a) {
        const d = base.apply(this, a);
        try {
          this.extraDash19(d);
        } catch (e) {
        }
        return d;
      };
    }
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
    var URL_TASAS = process.env.DOS_TASAS_API || "https://open.er-api.com/v6/latest";
    async function actualizarTasas(core, fetchImpl = fetch, { forzar = false, sinPermiso = false } = {}) {
      if (!sinPermiso && !core.puedeTasas()) throw Object.assign(new Error("Solo Direcci\xF3n o Finanzas actualizan las tasas."), { code: "ACCESS" });
      if (!forzar && !core.tasasViejas()) return { actualizadas: 0, tasas_al: core.db.settings.tasas_al, al_dia: true };
      const base = core.db.settings.moneda || "USD";
      let j;
      try {
        const r = await fetchImpl(`${URL_TASAS}/${encodeURIComponent(base)}`);
        j = await r.json();
      } catch (e) {
        throw Object.assign(new Error("No se pudo consultar las tasas de cambio. Intenta m\xE1s tarde o escr\xEDbelas a mano."), { code: "RED" });
      }
      if (!j || j.result !== "success" || !j.rates) throw Object.assign(new Error("El servicio de tasas no respondi\xF3 bien. Intenta m\xE1s tarde o escr\xEDbelas a mano."), { code: "RED" });
      return core.guardarTasasAuto(j.rates, "ExchangeRate-API");
    }
    async function reportarProblema(core, p = {}, fetchImpl = fetch) {
      const r = core.prepararReporte(p);
      const url = String(core.db.settings.discord_webhook || "").trim();
      let discord = false;
      if (url && /^https:\/\/(discord|discordapp)\.com\/api\/webhooks\//.test(url)) {
        try {
          const fd = new FormData();
          fd.append("payload_json", JSON.stringify({ username: "Delirium OS", content: r.mensaje.slice(0, 1900) }));
          const img = String(p.imagen || "");
          const m = img.match(/^data:image\/(jpeg|png);base64,([A-Za-z0-9+/=]+)$/);
          if (m && !r.sinCaptura && m[2].length < 4 * 1024 * 1024) {
            const bin = Uint8Array.from(atob(m[2]), (ch) => ch.charCodeAt(0));
            fd.append("files[0]", new Blob([bin], { type: `image/${m[1]}` }), `captura.${m[1] === "png" ? "png" : "jpg"}`);
          }
          const res = await fetchImpl(url, { method: "POST", body: fd });
          discord = res.ok;
        } catch (e) {
          discord = false;
        }
      }
      return { id: r.bug.id, discord, captura: !r.sinCaptura && !!p.imagen };
    }
    module.exports = { sincronizarMeta, leerDiscord, probarDiscord, actualizarTasas, reportarProblema };
  }
});

// src/main/redes.js
var require_redes = __commonJS({
  "src/main/redes.js"(exports, module) {
    var crypto = (init_shim_crypto(), __toCommonJS(shim_crypto_exports));
    var REDES = ["Instagram", "Facebook", "TikTok", "YouTube"];
    var API = {
      ig: process.env.DOS_IG_API || "https://graph.instagram.com",
      igAuth: process.env.DOS_IG_AUTH || "https://api.instagram.com",
      fb: process.env.DOS_GRAPH_API || "https://graph.facebook.com",
      tt: process.env.DOS_TT_API || "https://open.tiktokapis.com",
      gAuth: process.env.DOS_G_AUTH || "https://oauth2.googleapis.com",
      yt: process.env.DOS_YT_API || "https://www.googleapis.com",
      ttb: process.env.DOS_TTB_API || "https://business-api.tiktok.com/open_api/v1.3"
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
    var igUnificado = (s) => !!s.ig_config_id || !s.ig_app_id;
    var igHost = (token) => token && token.extra && token.extra.modo === "unificado" ? API.fb : API.ig;
    function faltan(red, s) {
      const k = { Instagram: igUnificado(s) ? ["meta_app_id", "meta_app_secret", "ig_config_id"] : ["ig_app_id", "ig_app_secret"], Facebook: ["meta_app_id", "meta_app_secret"], TikTok: ["tiktok_client_key", "tiktok_client_secret"], YouTube: ["google_client_id", "google_client_secret"] }[red];
      if (!k) throw err("Red no soportada.");
      if (k.some((x) => !s[x])) throw err(`Direcci\xF3n todav\xEDa no configur\xF3 la app de ${red} (Ajustes > Conexiones > Redes sociales).`);
    }
    function urlAutorizar(red, s, { redirect, estado }) {
      faltan(red, s);
      if (red === "Instagram" && igUnificado(s)) return `https://www.facebook.com/dialog/oauth?${form({ client_id: s.meta_app_id, config_id: s.ig_config_id, override_default_response_type: "true", redirect_uri: redirect, response_type: "code", state: estado, prompt: "login" })}`;
      if (red === "Instagram") return `https://www.instagram.com/oauth/authorize?${form({ client_id: s.ig_app_id, redirect_uri: redirect, response_type: "code", state: estado, enable_fb_login: "0", force_reauth: "true", scope: "instagram_business_basic,instagram_business_content_publish,instagram_business_manage_insights" })}`;
      if (red === "Facebook" && s.fb_config_id) return `https://www.facebook.com/dialog/oauth?${form({ client_id: s.meta_app_id, config_id: s.fb_config_id, override_default_response_type: "true", redirect_uri: redirect, response_type: "code", state: estado })}`;
      if (red === "Facebook") return `https://www.facebook.com/${v(s)}/dialog/oauth?${form({ client_id: s.meta_app_id, redirect_uri: redirect, state: estado, response_type: "code", scope: "pages_show_list,pages_read_engagement,pages_manage_posts,read_insights" })}`;
      if (red === "TikTok") return `https://www.tiktok.com/v2/auth/authorize/?${form({ client_key: s.tiktok_client_key, redirect_uri: redirect, state: estado, response_type: "code", scope: "user.info.basic,user.info.profile,user.info.stats,video.list,video.publish,video.upload" })}`;
      if (red === "YouTube") return `https://accounts.google.com/o/oauth2/v2/auth?${form({ client_id: s.google_client_id, redirect_uri: redirect, state: estado, response_type: "code", access_type: "offline", prompt: "consent", include_granted_scopes: "true", scope: "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly" })}`;
      throw err("Red no soportada.");
    }
    async function canjear(red, s, { code, redirect }, f = fetch) {
      faltan(red, s);
      const ahora = Date.now();
      if (red === "Instagram" && igUnificado(s)) {
        const { j } = await pedir(f, `${API.fb}/${v(s)}/oauth/access_token?${form({ client_id: s.meta_app_id, client_secret: s.meta_app_secret, redirect_uri: redirect, code })}`, {}, "Instagram");
        const access = j.access_token;
        const dura = Number(j.expires_in) || 0;
        let empresa = null;
        try {
          const { j: me } = await pedir(f, `${API.fb}/${v(s)}/me?${form({ fields: "client_business_id", access_token: access })}`, {}, "Instagram");
          empresa = me.client_business_id || null;
        } catch (e) {
        }
        const { j: asig } = await pedir(f, `${API.fb}/${v(s)}/me/assigned_instagram_accounts?${form({ fields: "id,username", limit: 100, access_token: access })}`, {}, "Instagram");
        const lista = (asig.data || []).filter((a) => a && a.id);
        if (!lista.length) throw err("Instagram: no se comparti\xF3 ninguna cuenta profesional. Al conectar, marca la cuenta de Instagram del cliente (debe ser de empresa o creador).");
        const token = { access, expira: dura ? ahora + dura * 1e3 : null, extra: { modo: "unificado", empresa, config_id: s.ig_config_id } };
        const datos = async (id) => {
          try {
            return await perfil("Instagram", s, token, f, id);
          } catch (e) {
            const a = lista.find((x) => x.id === id) || {};
            return { cuenta_ext: String(id), nombre: "@" + (a.username || id), enlace_perfil: a.username ? `https://www.instagram.com/${a.username}/` : "", seguidores: 0 };
          }
        };
        if (lista.length === 1) return { token, cuenta: await datos(String(lista[0].id)) };
        const paginas = [];
        for (const a of lista) {
          const d = await datos(String(a.id));
          paginas.push({ id: d.cuenta_ext, name: d.nombre, token: access, link: d.enlace_perfil, seguidores: d.seguidores });
        }
        token.extra.paginas = paginas;
        return { token, cuenta: { paginas: paginas.map((p) => ({ id: p.id, name: p.name })) } };
      }
      if (red === "Instagram") {
        const { j: corto } = await pedir(f, `${API.igAuth}/oauth/access_token`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ client_id: s.ig_app_id, client_secret: s.ig_app_secret, grant_type: "authorization_code", redirect_uri: redirect, code: String(code).replace(/#_$/, "") }) }, "Instagram");
        const c = corto.data ? corto.data[0] : corto;
        const { j: largo } = await pedir(f, `${API.ig}/access_token?${form({ grant_type: "ig_exchange_token", client_secret: s.ig_app_secret, access_token: c.access_token })}`, {}, "Instagram");
        const token = { access: largo.access_token, expira: ahora + (Number(largo.expires_in) || 5184e3) * 1e3 };
        return { token, cuenta: await perfil("Instagram", s, token, f) };
      }
      if (red === "Facebook") {
        const { j: corto } = await pedir(f, `${API.fb}/${v(s)}/oauth/access_token?${form({ client_id: s.meta_app_id, client_secret: s.meta_app_secret, redirect_uri: redirect, code })}`, {}, "Facebook");
        const { j: largo } = await pedir(f, `${API.fb}/${v(s)}/oauth/access_token?${form({ grant_type: "fb_exchange_token", client_id: s.meta_app_id, client_secret: s.meta_app_secret, fb_exchange_token: corto.access_token })}`, {}, "Facebook");
        const { j: pags } = await pedir(f, `${API.fb}/${v(s)}/me/accounts?${form({ fields: "id,name,access_token,link,followers_count,fan_count", limit: 100, access_token: largo.access_token })}`, {}, "Facebook");
        const paginas = (pags.data || []).map((p) => ({ id: String(p.id), name: p.name, token: p.access_token, link: p.link || `https://www.facebook.com/${p.id}`, seguidores: Number(p.followers_count ?? p.fan_count) || 0 }));
        if (!paginas.length) throw err("Facebook: esa cuenta no administra ninguna p\xE1gina, o no se marc\xF3 ninguna al autorizar.");
        const token = { access: null, expira: null, extra: { usuario: largo.access_token, paginas } };
        const una = paginas.length === 1 ? paginas[0] : null;
        if (una) token.access = una.token;
        return { token, cuenta: una ? { cuenta_ext: una.id, nombre: una.name, enlace_perfil: una.link, seguidores: una.seguidores } : { paginas: paginas.map((p) => ({ id: p.id, name: p.name })) } };
      }
      if (red === "TikTok") {
        const { j } = await pedir(f, `${API.tt}/v2/oauth/token/`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ client_key: s.tiktok_client_key, client_secret: s.tiktok_client_secret, code: decodeURIComponent(code), grant_type: "authorization_code", redirect_uri: redirect }) }, "TikTok");
        if (!j.access_token) throw err(`TikTok: ${j.error_description || j.error || "no entreg\xF3 el permiso"}`);
        const token = { access: j.access_token, refresh: j.refresh_token, expira: ahora + (Number(j.expires_in) || 86400) * 1e3, extra: { open_id: j.open_id, refresh_expira: ahora + (Number(j.refresh_expires_in) || 31536e3) * 1e3, scope: j.scope } };
        return { token, cuenta: await perfil("TikTok", s, token, f) };
      }
      if (red === "YouTube") {
        const { j } = await pedir(f, `${API.gAuth}/token`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ code, client_id: s.google_client_id, client_secret: s.google_client_secret, redirect_uri: redirect, grant_type: "authorization_code" }) }, "YouTube");
        if (!j.refresh_token) throw err("YouTube no entreg\xF3 acceso permanente. Vuelve a conectar y acepta todos los permisos.");
        const token = { access: j.access_token, refresh: j.refresh_token, expira: ahora + (Number(j.expires_in) || 3600) * 1e3 };
        return { token, cuenta: await perfil("YouTube", s, token, f) };
      }
      throw err("Red no soportada.");
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
        const { j } = await pedir(f, `${API.ig}/refresh_access_token?${form({ grant_type: "ig_refresh_token", access_token: token.access })}`, {}, "Instagram");
        return { ...token, access: j.access_token, expira: ahora + (Number(j.expires_in) || 5184e3) * 1e3 };
      }
      if (token.expira && token.expira - ahora > 5 * 6e4) return null;
      if (!token.refresh) throw err(`${red}: la conexi\xF3n venci\xF3. Vuelve a conectar la cuenta.`, "VENCIDO");
      if (red === "TikTok") {
        const { j } = await pedir(f, `${API.tt}/v2/oauth/token/`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ client_key: s.tiktok_client_key, client_secret: s.tiktok_client_secret, grant_type: "refresh_token", refresh_token: token.refresh }) }, "TikTok");
        if (!j.access_token) throw err("TikTok: la conexi\xF3n venci\xF3. Vuelve a conectar la cuenta.", "VENCIDO");
        return { ...token, access: j.access_token, refresh: j.refresh_token || token.refresh, expira: ahora + (Number(j.expires_in) || 86400) * 1e3 };
      }
      if (red === "YouTube") {
        const { j } = await pedir(f, `${API.gAuth}/token`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ client_id: s.google_client_id, client_secret: s.google_client_secret, refresh_token: token.refresh, grant_type: "refresh_token" }) }, "YouTube");
        return { ...token, access: j.access_token, expira: ahora + (Number(j.expires_in) || 3600) * 1e3 };
      }
      return null;
    }
    async function perfil(red, s, token, f = fetch, cuentaExt) {
      if (red === "Instagram" && token.extra && token.extra.modo === "unificado") {
        const id = cuentaExt || token.cuenta_ext;
        const { j } = await pedir(f, `${API.fb}/${v(s)}/${id}?${form({ fields: "id,username,name,followers_count,media_count", access_token: token.access })}`, {}, "Instagram");
        return { cuenta_ext: String(j.id || id), nombre: "@" + j.username, enlace_perfil: `https://www.instagram.com/${j.username}/`, seguidores: Number(j.followers_count) || 0, publicaciones_total: Number(j.media_count) || 0 };
      }
      if (red === "Instagram") {
        const { j } = await pedir(f, `${API.ig}/${v(s)}/me?${form({ fields: "user_id,username,name,followers_count,media_count", access_token: token.access })}`, {}, "Instagram");
        return { cuenta_ext: String(j.user_id || j.id), nombre: "@" + j.username, enlace_perfil: `https://www.instagram.com/${j.username}/`, seguidores: Number(j.followers_count) || 0, publicaciones_total: Number(j.media_count) || 0 };
      }
      if (red === "Facebook") {
        const { j } = await pedir(f, `${API.fb}/${v(s)}/${cuentaExt}?${form({ fields: "id,name,link,followers_count,fan_count", access_token: token.access })}`, {}, "Facebook");
        return { cuenta_ext: String(j.id), nombre: j.name, enlace_perfil: j.link || `https://www.facebook.com/${j.id}`, seguidores: Number(j.followers_count ?? j.fan_count) || 0 };
      }
      if (red === "TikTok") {
        const { j } = await pedir(f, `${API.tt}/v2/user/info/?fields=open_id,display_name,username,follower_count,likes_count,video_count`, { headers: { Authorization: `Bearer ${token.access}` } }, "TikTok");
        const u = j.data && j.data.user || {};
        return { cuenta_ext: u.open_id || token.extra && token.extra.open_id, nombre: u.username ? "@" + u.username : u.display_name, enlace_perfil: u.username ? `https://www.tiktok.com/@${u.username}` : "", seguidores: Number(u.follower_count) || 0, publicaciones_total: Number(u.video_count) || 0, me_gusta_total: Number(u.likes_count) || 0 };
      }
      if (red === "YouTube") {
        const { j } = await pedir(f, `${API.yt}/youtube/v3/channels?part=snippet,statistics&mine=true`, { headers: { Authorization: `Bearer ${token.access}` } }, "YouTube");
        const c = (j.items || [])[0];
        if (!c) throw err("YouTube: esa cuenta de Google no tiene canal.");
        return { cuenta_ext: c.id, nombre: c.snippet.customUrl || c.snippet.title, enlace_perfil: `https://www.youtube.com/channel/${c.id}`, seguidores: Number(c.statistics.subscriberCount) || 0, publicaciones_total: Number(c.statistics.videoCount) || 0 };
      }
      throw err("Red no soportada.");
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
        const { j } = await pedir(f, `${igHost(token)}/${v(s)}/${cuenta.cuenta_ext}/media`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form(p) }, "Instagram");
        return revisar("Instagram", s, token, cuenta, { tipo: "contenedor", id: j.id }, f);
      }
      if (red === "Facebook") {
        let j;
        if (!medio) ({ j } = await pedir(f, `${API.fb}/${v(s)}/${cuenta.cuenta_ext}/feed`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ message: caption, link: post.enlace_destino || void 0, access_token: token.access }) }, "Facebook"));
        else if (esVideo(medio)) ({ j } = await pedir(f, `${API.fb}/${v(s)}/${cuenta.cuenta_ext}/videos`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ file_url: medio.url, description: caption, title: post.titulo, access_token: token.access }) }, "Facebook"));
        else ({ j } = await pedir(f, `${API.fb}/${v(s)}/${cuenta.cuenta_ext}/photos`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ url: medio.url, caption, published: "true", access_token: token.access }) }, "Facebook"));
        const id = String(j.post_id || j.id);
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
        const auth = { Authorization: `Bearer ${token.access}`, "Content-Type": "application/json; charset=UTF-8" };
        const { j: ci } = await pedir(f, `${API.tt}/v2/post/publish/creator_info/query/`, { method: "POST", headers: auth, body: "{}" }, "TikTok");
        const opciones = ci.data && ci.data.privacy_level_options || [];
        const publico = s.tiktok_auditada && opciones.includes("PUBLIC_TO_EVERYONE");
        const bytes = await medio.bajar();
        const tam = bytes.length;
        const trozo = tam <= 64 * 1024 * 1024 ? tam : 10 * 1024 * 1024;
        const partes = Math.max(1, Math.floor(tam / trozo));
        const { j: ini } = await pedir(f, `${API.tt}/v2/post/publish/video/init/`, { method: "POST", headers: auth, body: JSON.stringify({ post_info: { title: caption.slice(0, 2200), privacy_level: publico ? "PUBLIC_TO_EVERYONE" : "SELF_ONLY", disable_comment: false, disable_duet: false, disable_stitch: false }, source_info: { source: "FILE_UPLOAD", video_size: tam, chunk_size: trozo, total_chunk_count: partes } }) }, "TikTok");
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
        const { j } = await pedir(f, destino, { method: "PUT", headers: { Authorization: `Bearer ${token.access}`, "Content-Type": "video/*" }, body: bytes }, "YouTube");
        return { estado: "Publicado", id: j.id, enlace: `https://www.youtube.com/watch?v=${j.id}`, privado };
      }
      throw err("Red no soportada.");
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
          const { j } = await pedir(f, `${igHost(token)}/${v(s)}/${pub.id}/insights?${form({ metric: lista, access_token: token.access })}`, {}, "Instagram");
          for (const m of j.data || []) out[m.name] = Number((m.values && m.values[0] && m.values[0].value) ?? (m.total_value && m.total_value.value)) || 0;
        };
        try {
          await pedirIns("reach,likes,comments,shares,saved,views");
        } catch (e) {
          await pedirIns("reach,likes,comments,saved");
        }
        return sum({ alcance: out.reach || 0, vistas: out.views || 0, me_gusta: out.likes || 0, comentarios: out.comments || 0, compartidos: out.shares || 0, guardados: out.saved || 0 });
      }
      if (red === "Facebook") {
        const { j } = await pedir(f, `${API.fb}/${v(s)}/${pub.id}?${form({ fields: "shares,reactions.summary(total_count).limit(0),comments.summary(total_count).limit(0)", access_token: token.access })}`, {}, "Facebook");
        let alcance = 0;
        try {
          const { j: ins } = await pedir(f, `${API.fb}/${v(s)}/${pub.id}/insights?${form({ metric: "post_total_media_view_unique", access_token: token.access })}`, {}, "Facebook");
          alcance = Number(ins.data && ins.data[0] && ins.data[0].values && ins.data[0].values[0].value) || 0;
        } catch (e) {
        }
        return sum({ alcance, me_gusta: Number(j.reactions && j.reactions.summary && j.reactions.summary.total_count) || 0, comentarios: Number(j.comments && j.comments.summary && j.comments.summary.total_count) || 0, compartidos: Number(j.shares && j.shares.count) || 0 });
      }
      if (red === "TikTok") {
        if (!/^\d+$/.test(String(pub.id))) return null;
        const { j } = await pedir(f, `${API.tt}/v2/video/query/?fields=id,view_count,like_count,comment_count,share_count`, { method: "POST", headers: { Authorization: `Bearer ${token.access}`, "Content-Type": "application/json" }, body: JSON.stringify({ filters: { video_ids: [String(pub.id)] } }) }, "TikTok");
        const x = (j.data && j.data.videos || [])[0];
        if (!x) return null;
        return sum({ vistas: x.view_count || 0, alcance: x.view_count || 0, me_gusta: x.like_count || 0, comentarios: x.comment_count || 0, compartidos: x.share_count || 0 });
      }
      if (red === "YouTube") {
        const { j } = await pedir(f, `${API.yt}/youtube/v3/videos?part=statistics&id=${encodeURIComponent(pub.id)}`, { headers: { Authorization: `Bearer ${token.access}` } }, "YouTube");
        const st = ((j.items || [])[0] || {}).statistics || {};
        return sum({ vistas: Number(st.viewCount) || 0, alcance: Number(st.viewCount) || 0, me_gusta: Number(st.likeCount) || 0, comentarios: Number(st.commentCount) || 0 });
      }
      return null;
    }
    var numero = (x) => {
      if (x === null || x === void 0) return null;
      if (typeof x === "object") return Object.values(x).reduce((a, y) => a + (Number(y) || 0), 0);
      const n = Number(x);
      return Number.isFinite(n) ? n : null;
    };
    var sumaInt = (o) => ["me_gusta", "comentarios", "compartidos", "guardados"].reduce((a, k) => a + (o[k] || 0), 0);
    var diaUTC = (dia) => Math.floor(Date.parse(dia + "T00:00:00Z") / 1e3);
    async function insightsSeguro(f, base, lista, extra, quien) {
      const leer = (j, out2) => {
        for (const m of j.data || []) {
          const tv = m.total_value;
          let val = tv ? tv.breakdowns ? tv.breakdowns : tv.value : (m.values || []).reduce((a, x) => a + (numero(x.value) || 0), 0);
          out2[m.name] = val;
        }
      };
      const out = {};
      try {
        const { j } = await pedir(f, `${base}?${form({ metric: lista.join(","), ...extra })}`, {}, quien);
        leer(j, out);
        return out;
      } catch (e) {
        if (e.code === "VENCIDO") throw e;
      }
      for (const m of lista) {
        try {
          const { j } = await pedir(f, `${base}?${form({ metric: m, ...extra })}`, {}, quien);
          leer(j, out);
        } catch (e) {
          if (e.code === "VENCIDO") throw e;
        }
      }
      return out;
    }
    var desglose = (bd) => {
      const o = {};
      for (const b of Array.isArray(bd) ? bd : []) for (const r of b.results || []) o[(r.dimension_values || []).join(" \xB7 ") || "\u2014"] = Number(r.value) || 0;
      return o;
    };
    async function diaria(red, s, token, cuenta, dia, f = fetch) {
      const since = diaUTC(dia), until = since + 86400;
      if (red === "Instagram") {
        const base = `${igHost(token)}/${v(s)}/${cuenta.cuenta_ext}/insights`;
        const m = await insightsSeguro(f, base, ["reach", "views", "accounts_engaged", "total_interactions", "likes", "comments", "shares", "saves", "profile_views", "website_clicks", "profile_links_taps"], { period: "day", metric_type: "total_value", since, until, access_token: token.access }, "Instagram");
        const fu = await insightsSeguro(f, base, ["follows_and_unfollows"], { period: "day", metric_type: "total_value", breakdown: "follow_type", since, until, access_token: token.access }, "Instagram");
        const seg = desglose(fu.follows_and_unfollows);
        const o = {
          alcance: numero(m.reach),
          vistas: numero(m.views),
          cuentas_interactuaron: numero(m.accounts_engaged),
          me_gusta: numero(m.likes),
          comentarios: numero(m.comments),
          compartidos: numero(m.shares),
          guardados: numero(m.saves),
          visitas_perfil: numero(m.profile_views),
          clics_web: numero(m.website_clicks),
          toques_enlaces: numero(m.profile_links_taps),
          nuevos_seguidores: seg.FOLLOWER ?? null,
          dejaron: seg.NON_FOLLOWER ?? null
        };
        o.interacciones = numero(m.total_interactions) ?? sumaInt(o);
        return o;
      }
      if (red === "Facebook") {
        const m = await insightsSeguro(f, `${API.fb}/${v(s)}/${cuenta.cuenta_ext}/insights`, ["page_total_media_view_unique", "page_media_view", "page_post_engagements", "page_daily_follows_unique", "page_daily_unfollows_unique"], { period: "day", since, until, access_token: token.access }, "Facebook");
        return { alcance: numero(m.page_total_media_view_unique), vistas: numero(m.page_media_view), interacciones: numero(m.page_post_engagements), nuevos_seguidores: numero(m.page_daily_follows_unique), dejaron: numero(m.page_daily_unfollows_unique) };
      }
      return null;
    }
    async function audiencia(red, s, token, cuenta, f = fetch) {
      if (red !== "Instagram") return null;
      const base = `${igHost(token)}/${v(s)}/${cuenta.cuenta_ext}/insights`;
      const out = {};
      for (const [k, b] of [["edad", "age"], ["genero", "gender"], ["pais", "country"], ["ciudad", "city"]]) {
        try {
          const m = await insightsSeguro(f, base, ["follower_demographics"], { period: "lifetime", metric_type: "total_value", timeframe: "this_month", breakdown: b, access_token: token.access }, "Instagram");
          const d = desglose(m.follower_demographics);
          if (Object.keys(d).length) out[k] = d;
        } catch (e) {
          if (e.code === "VENCIDO") throw e;
        }
      }
      try {
        const hasta = Math.floor(Date.now() / 1e3) - 3600;
        const desde = hasta - 6 * 86400;
        const { j } = await pedir(f, `${base}?${form({ metric: "online_followers", period: "lifetime", since: desde, until: hasta, access_token: token.access })}`, {}, "Instagram");
        const vals = ((j.data || [])[0] || {}).values || [];
        const suma = Array(24).fill(0);
        let dias = 0;
        for (const x of vals) if (x && x.value && typeof x.value === "object" && Object.keys(x.value).length) {
          dias++;
          for (const [h, n] of Object.entries(x.value)) if (Number(h) >= 0 && Number(h) < 24) suma[Number(h)] += Number(n) || 0;
        }
        if (dias) out.en_linea = suma.map((n) => Math.round(n / dias));
        if (dias) out.en_linea_zona = "America/Los_Angeles";
      } catch (e) {
        if (e.code === "VENCIDO") throw e;
      }
      return Object.keys(out).length ? out : null;
    }
    async function competidor(s, token, cuenta, usuario, f = fetch) {
      const u = String(usuario || "").trim().replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/[/?#].*$/, "");
      if (!/^[\w.]{1,30}$/.test(u)) throw err(`Usuario de Instagram no v\xE1lido: ${usuario}`);
      const campos = `business_discovery.username(${u}){username,name,followers_count,media_count,media.limit(12){like_count,comments_count,timestamp,media_type}}`;
      const { j } = await pedir(f, `${igHost(token)}/${v(s)}/${cuenta.cuenta_ext}?${form({ fields: campos, access_token: token.access })}`, {}, "Instagram");
      const b = j.business_discovery || {};
      const media = (b.media || {}).data || [];
      const inter = media.map((m) => (Number(m.like_count) || 0) + (Number(m.comments_count) || 0));
      const fechas = media.map((m) => Date.parse(m.timestamp)).filter(Number.isFinite).sort((a, c) => a - c);
      const semanas = fechas.length > 1 ? Math.max(1, (fechas[fechas.length - 1] - fechas[0]) / (7 * 864e5)) : 1;
      const prom = inter.length ? Math.round(inter.reduce((a, x) => a + x, 0) / inter.length) : 0;
      return {
        usuario: b.username || u,
        nombre: b.name || "",
        seguidores: Number(b.followers_count) || 0,
        publicaciones: Number(b.media_count) || 0,
        interacciones_promedio: prom,
        engagement: b.followers_count ? Math.round(prom / b.followers_count * 1e4) / 100 : null,
        por_semana: media.length > 1 ? Math.round(media.length / semanas * 10) / 10 : null,
        reels: media.filter((m) => m.media_type === "VIDEO").length,
        muestra: media.length
      };
    }
    async function pedirTTB(f, ruta, { metodo = "GET", q = {}, cuerpo = null, token = "" } = {}) {
      let r;
      const url = `${API.ttb}${ruta}${Object.keys(q).length ? "?" + form(q) : ""}`;
      try {
        r = await f(url, { method: metodo, headers: { "Content-Type": "application/json", ...token ? { "Access-Token": token } : {} }, ...cuerpo ? { body: JSON.stringify(cuerpo) } : {} });
      } catch (e) {
        throw err("TikTok no respondi\xF3. Revisa la conexi\xF3n e intenta de nuevo.", "RED");
      }
      let j = {};
      try {
        j = await r.json();
      } catch (e) {
      }
      if (!r.ok || j.code !== void 0 && Number(j.code) !== 0) {
        const vencido = r.status === 401 || [40100, 40102, 40104, 40105, 40106].includes(Number(j.code)) || /token/i.test(j.message || "") && /expir|invalid/i.test(j.message || "");
        throw err(`TikTok: ${String(j.message || `error ${r.status}`).slice(0, 200)}`, vencido ? "VENCIDO" : "RED");
      }
      return j.data || {};
    }
    function urlNegocioTikTok(s, { redirect, estado }) {
      if (!s.ttb_app_id || !s.ttb_app_secret || !s.ttb_auth_url) throw err("Direcci\xF3n todav\xEDa no configur\xF3 la app de TikTok para empresas (Ajustes > Redes sociales > Bandeja de TikTok).");
      let u;
      try {
        u = new URL(s.ttb_auth_url);
      } catch (e) {
        throw err("El enlace de autorizaci\xF3n de TikTok para empresas no es v\xE1lido. C\xF3pialo de nuevo del portal.");
      }
      u.searchParams.set("redirect_uri", redirect);
      u.searchParams.set("state", estado);
      return u.toString();
    }
    async function canjearNegocioTikTok(s, { code, redirect }, f = fetch) {
      const d = await pedirTTB(f, "/tt_user/oauth2/token/", { metodo: "POST", cuerpo: { client_id: s.ttb_app_id, client_secret: s.ttb_app_secret, grant_type: "authorization_code", auth_code: code, redirect_uri: redirect } });
      if (!d.access_token || !d.open_id) throw err("TikTok no entreg\xF3 el permiso de la cuenta.");
      return { access: d.access_token, refresh: d.refresh_token || null, expira: Date.now() + (Number(d.expires_in) || 86400) * 1e3, extra: { open_id: d.open_id, scope: d.scope || "", refresh_expira: d.refresh_token_expires_in ? Date.now() + Number(d.refresh_token_expires_in) * 1e3 : null } };
    }
    async function renovarNegocioTikTok(s, t, f = fetch) {
      if (t.expira && t.expira - Date.now() > 10 * 6e4) return null;
      if (!t.refresh) throw err("TikTok: la bandeja venci\xF3. Vuelve a conectarla.", "VENCIDO");
      const d = await pedirTTB(f, "/tt_user/oauth2/refresh_token/", { metodo: "POST", cuerpo: { client_id: s.ttb_app_id, client_secret: s.ttb_app_secret, grant_type: "refresh_token", refresh_token: t.refresh } });
      if (!d.access_token) throw err("TikTok: la bandeja venci\xF3. Vuelve a conectarla.", "VENCIDO");
      return { access: d.access_token, refresh: d.refresh_token || t.refresh, expira: Date.now() + (Number(d.expires_in) || 86400) * 1e3 };
    }
    async function bandejaTikTok(s, t, cuenta, f = fetch, { desde = Date.now() - 30 * 864e5, maxVideos = 12 } = {}) {
      const out = { comentarios: [], mensajes: [], avisos: [] };
      const bid = (t.extra || {}).open_id;
      const tok = t.access;
      const yo = String(cuenta.nombre || "").replace(/^@/, "").toLowerCase();
      try {
        const v2 = await pedirTTB(f, "/business/video/list/", { q: { business_id: bid, fields: JSON.stringify(["item_id", "create_time", "caption", "share_url", "comments"]), max_count: 20 }, token: tok });
        const videos = (v2.videos || v2.list || []).filter((x) => Number(x.create_time) * 1e3 >= desde && Number(x.comments) > 0).slice(0, maxVideos);
        for (const x of videos) {
          const c = await pedirTTB(f, "/business/comment/list/", { q: { business_id: bid, video_id: x.item_id, sort_field: "create_time", sort_order: "desc", max_count: 50, include_replies: false }, token: tok });
          for (const k of c.comments || []) {
            const autor = k.username || k.unique_identifier || k.display_name || "Alguien en TikTok";
            if (k.owner || String(autor).toLowerCase() === yo) continue;
            let resp = [];
            if (Number(k.replies) > 0) {
              try {
                const rr = await pedirTTB(f, "/business/comment/reply/list/", { q: { business_id: bid, video_id: x.item_id, comment_id: k.comment_id, max_count: 20 }, token: tok });
                resp = (rr.comments || []).map((y) => ({ autor: y.username || y.display_name || "", texto: String(y.text || "").slice(0, 1e3), fecha: new Date(Number(y.create_time) * 1e3).toISOString(), nuestro: !!y.owner }));
              } catch (e) {
                if (e.code === "VENCIDO") throw e;
              }
            }
            out.comentarios.push({
              ext_id: k.comment_id,
              post_ext_id: x.item_id,
              post_texto: String(x.caption || "").slice(0, 160),
              post_enlace: x.share_url || "",
              enlace: x.share_url || "",
              autor,
              autor_id: k.user_id || null,
              texto: String(k.text || "").slice(0, 2200),
              fecha: new Date(Number(k.create_time) * 1e3).toISOString(),
              me_gusta: Number(k.likes) || 0,
              oculto: String(k.status || "").toUpperCase() === "HIDDEN",
              respuestas_red: resp
            });
          }
        }
      } catch (e) {
        if (e.code === "VENCIDO") throw e;
        out.avisos.push(/scope|permission|permiso/i.test(e.message) ? 'Comentarios de TikTok: la app de TikTok para empresas no tiene el permiso "Account Comment" o la cuenta no lo acept\xF3.' : `Comentarios de TikTok: ${e.message}`);
      }
      out.avisos.push("TikTok no deja leer mensajes directos de la cuenta con esta API: solo comentarios.");
      return out;
    }
    async function responderTikTok(s, t, item, texto2, f = fetch) {
      const txt = String(texto2 || "").trim();
      if (!txt) throw err("Escribe la respuesta.");
      if (txt.length > 150) throw err("TikTok acepta respuestas de hasta 150 caracteres.");
      const d = await pedirTTB(f, "/business/comment/reply/create/", { metodo: "POST", cuerpo: { business_id: (t.extra || {}).open_id, video_id: item.post_ext_id, comment_id: item.ext_id, text: txt }, token: t.access });
      return { id: d.comment_id || null };
    }
    async function ocultarTikTok(s, t, item, si = true, f = fetch) {
      await pedirTTB(f, "/business/comment/hide/", { metodo: "POST", cuerpo: { business_id: (t.extra || {}).open_id, video_id: item.post_ext_id, comment_id: item.ext_id, action: si ? "HIDE" : "UNHIDE" }, token: t.access });
      return { oculto: !!si };
    }
    var PERMISO = {
      Instagram: { comentarios: "instagram_manage_comments", mensajes: "instagram_manage_messages" },
      Facebook: { comentarios: "pages_read_user_content y pages_manage_engagement", mensajes: "pages_messaging" }
    };
    var sinPermiso = (e) => /permission|permiso|\(#10\)|\(#200\)|\(#230\)|\(#3\)|not authorized|requires|capability/i.test(e.message || "");
    async function bandeja(red, s, token, cuenta, f = fetch, { desde = Date.now() - 30 * 864e5, maxPosts = 15 } = {}) {
      const out = { comentarios: [], mensajes: [], avisos: [] };
      if (red === "TikTok" || red === "YouTube") {
        out.avisos.push(`${red} no permite leer ni responder comentarios o mensajes con su API p\xFAblica.`);
        return out;
      }
      if (red !== "Instagram" && red !== "Facebook") return out;
      const host = red === "Instagram" ? igHost(token) : API.fb;
      const id = cuenta.cuenta_ext;
      const yo = String(cuenta.nombre || "").replace(/^@/, "").toLowerCase();
      const esNuestro = (autor, fromId) => fromId && String(fromId) === String(id) || autor && String(autor).replace(/^@/, "").toLowerCase() === yo;
      try {
        let posts = [];
        if (red === "Instagram") {
          const { j } = await pedir(f, `${host}/${v(s)}/${id}/media?${form({ fields: "id,caption,permalink,timestamp,comments_count", limit: 40, access_token: token.access })}`, {}, "Instagram");
          posts = (j.data || []).filter((x) => Date.parse(x.timestamp) >= desde && x.comments_count > 0).map((x) => ({ id: x.id, texto: x.caption || "", enlace: x.permalink || "", fecha: x.timestamp }));
        } else {
          const { j } = await pedir(f, `${host}/${v(s)}/${id}/published_posts?${form({ fields: "id,message,permalink_url,created_time,comments.summary(total_count).limit(0)", since: Math.floor(desde / 1e3), limit: 40, access_token: token.access })}`, {}, "Facebook");
          posts = (j.data || []).filter((x) => ((x.comments || {}).summary || {}).total_count > 0).map((x) => ({ id: x.id, texto: x.message || "", enlace: x.permalink_url || "", fecha: x.created_time }));
        }
        for (const p of posts.slice(0, maxPosts)) {
          const campos = red === "Instagram" ? "id,text,username,timestamp,like_count,hidden,from,replies{id,text,username,timestamp,from}" : "id,message,from,created_time,like_count,is_hidden,permalink_url,comments{id,message,from,created_time}";
          const { j } = await pedir(f, `${host}/${v(s)}/${p.id}/comments?${form({ fields: campos, limit: 50, ...red === "Facebook" ? { filter: "toplevel", order: "reverse_chronological" } : {}, access_token: token.access })}`, {}, red);
          for (const c of j.data || []) {
            const autor = red === "Instagram" ? c.username || (c.from || {}).username || "" : (c.from || {}).name || "Alguien en Facebook";
            const fromId = (c.from || {}).id;
            if (esNuestro(autor, fromId)) continue;
            const resp = (red === "Instagram" ? (c.replies || {}).data : (c.comments || {}).data) || [];
            out.comentarios.push({
              ext_id: c.id,
              post_ext_id: p.id,
              post_texto: String(p.texto).slice(0, 160),
              post_enlace: p.enlace,
              enlace: c.permalink_url || p.enlace,
              autor,
              autor_id: fromId || null,
              texto: String(red === "Instagram" ? c.text : c.message || "").slice(0, 2200),
              fecha: c.timestamp || c.created_time,
              me_gusta: c.like_count || 0,
              oculto: !!(c.hidden || c.is_hidden),
              respuestas_red: resp.map((r) => {
                const a = red === "Instagram" ? r.username || (r.from || {}).username || "" : (r.from || {}).name || "";
                return { autor: a, texto: String(red === "Instagram" ? r.text : r.message || "").slice(0, 1e3), fecha: r.timestamp || r.created_time, nuestro: esNuestro(a, (r.from || {}).id) };
              })
            });
          }
        }
      } catch (e) {
        if (e.code === "VENCIDO") throw e;
        out.avisos.push(sinPermiso(e) ? `Comentarios de ${red}: falta el permiso ${PERMISO[red].comentarios} en la app de Meta (o la cuenta no lo acept\xF3 al conectar).` : `Comentarios de ${red}: ${e.message}`);
      }
      try {
        const q = { fields: "id,updated_time,participants,messages.limit(15){id,message,from,created_time}", limit: 20, access_token: token.access, ...red === "Instagram" ? { platform: "instagram" } : {} };
        const { j } = await pedir(f, `${host}/${v(s)}/${id}/conversations?${form(q)}`, {}, red);
        for (const cv of j.data || []) {
          if (Date.parse(cv.updated_time || 0) < desde) continue;
          const msgs = ((cv.messages || {}).data || []).slice().reverse();
          const otro = ((cv.participants || {}).data || []).find((x) => !esNuestro(x.username || x.name, x.id)) || {};
          const lista = msgs.map((m) => ({ texto: String(m.message || "(adjunto)").slice(0, 2e3), fecha: m.created_time, nuestro: esNuestro((m.from || {}).username || (m.from || {}).name, (m.from || {}).id) }));
          const deCliente = lista.filter((m) => !m.nuestro);
          const ultimo = lista[lista.length - 1] || {};
          out.mensajes.push({
            ext_id: cv.id,
            conversacion_id: cv.id,
            autor: otro.username || otro.name || "Conversaci\xF3n",
            autor_id: otro.id || null,
            texto: (deCliente[deCliente.length - 1] || ultimo).texto || "",
            fecha: cv.updated_time,
            mensajes: lista,
            ultimo_cliente: (deCliente[deCliente.length - 1] || {}).fecha || null,
            nuestro: !!ultimo.nuestro
          });
        }
      } catch (e) {
        if (e.code === "VENCIDO") throw e;
        out.avisos.push(sinPermiso(e) ? `Mensajes de ${red}: falta el permiso ${PERMISO[red].mensajes} en la app de Meta (o la cuenta no lo acept\xF3 al conectar).` : `Mensajes de ${red}: ${e.message}`);
      }
      return out;
    }
    async function responder(red, s, token, cuenta, item, texto2, f = fetch) {
      const t = String(texto2 || "").trim();
      if (!t) throw err("Escribe la respuesta.");
      if (t.length > 2e3) throw err("La respuesta es muy larga (m\xE1ximo 2000 caracteres).");
      const host = red === "Instagram" ? igHost(token) : API.fb;
      if (item.tipo === "comentario") {
        const ruta = red === "Instagram" ? `${item.ext_id}/replies` : `${item.ext_id}/comments`;
        const { j: j2 } = await pedir(f, `${host}/${v(s)}/${ruta}`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ message: t, access_token: token.access }) }, red);
        return { id: j2.id || null };
      }
      if (!item.autor_id) throw err("No se puede responder: la red no dio el identificador de la persona.");
      if (item.ultimo_cliente && Date.now() - Date.parse(item.ultimo_cliente) > 24 * 3600 * 1e3) throw err(`${red} solo deja responder mensajes dentro de las 24 horas del \xFAltimo mensaje de la persona. Resp\xF3ndele desde la app.`);
      const cuerpo = { recipient: { id: item.autor_id }, message: { text: t }, ...red === "Facebook" ? { messaging_type: "RESPONSE" } : {} };
      const { j } = await pedir(f, `${host}/${v(s)}/${cuenta.cuenta_ext}/messages?${form({ access_token: token.access })}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo) }, red);
      return { id: j.message_id || j.id || null };
    }
    async function ocultar(red, s, token, cuenta, item, si = true, f = fetch) {
      if (item.tipo !== "comentario") throw err("Solo los comentarios se pueden ocultar.");
      const host = red === "Instagram" ? igHost(token) : API.fb;
      await pedir(f, `${host}/${v(s)}/${item.ext_id}`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form({ [red === "Instagram" ? "hide" : "is_hidden"]: si ? "true" : "false", access_token: token.access }) }, red);
      return { oculto: !!si };
    }
    async function contenido(red, s, token, cuenta, f = fetch, { desde = Date.now() - 30 * 864e5, max = 40 } = {}) {
      const out = [];
      const corto = (t) => String(t || "").slice(0, 280);
      if (red === "Instagram") {
        let url = `${igHost(token)}/${v(s)}/${cuenta.cuenta_ext}/media?${form({ fields: "id,caption,media_type,media_product_type,timestamp,permalink,thumbnail_url,media_url,like_count,comments_count", limit: 50, access_token: token.access })}`;
        while (url && out.length < max) {
          const { j } = await pedir(f, url, {}, "Instagram");
          let viejo = false;
          for (const x of j.data || []) {
            if (Date.parse(x.timestamp) < desde) {
              viejo = true;
              break;
            }
            if (out.length >= max) break;
            const tipo = x.media_product_type === "REELS" ? "Reel" : x.media_type === "CAROUSEL_ALBUM" ? "Carrusel" : x.media_type === "VIDEO" ? "Video" : "Foto";
            const m = await insightsSeguro(f, `${igHost(token)}/${v(s)}/${x.id}/insights`, ["reach", "views", "likes", "comments", "shares", "saved", "total_interactions"], { access_token: token.access }, "Instagram");
            const o = {
              post_id: String(x.id),
              fecha: x.timestamp,
              tipo,
              texto: corto(x.caption),
              enlace: x.permalink || "",
              imagen: x.thumbnail_url || (x.media_type !== "VIDEO" ? x.media_url : "") || "",
              alcance: numero(m.reach),
              vistas: numero(m.views),
              me_gusta: numero(m.likes) ?? numero(x.like_count),
              comentarios: numero(m.comments) ?? numero(x.comments_count),
              compartidos: numero(m.shares),
              guardados: numero(m.saved)
            };
            o.interacciones = numero(m.total_interactions) ?? sumaInt(o);
            out.push(o);
          }
          url = !viejo && j.paging && j.paging.next ? j.paging.next : null;
        }
        return out;
      }
      if (red === "Facebook") {
        const { j } = await pedir(f, `${API.fb}/${v(s)}/${cuenta.cuenta_ext}/published_posts?${form({ fields: "id,message,created_time,permalink_url,full_picture,status_type,shares,reactions.summary(total_count).limit(0),comments.summary(total_count).limit(0)", since: Math.floor(desde / 1e3), limit: Math.min(max, 50), access_token: token.access })}`, {}, "Facebook");
        for (const x of (j.data || []).slice(0, max)) {
          const m = await insightsSeguro(f, `${API.fb}/${v(s)}/${x.id}/insights`, ["post_total_media_view_unique", "post_media_view"], { access_token: token.access }, "Facebook");
          const o = {
            post_id: String(x.id),
            fecha: x.created_time,
            tipo: /video/.test(x.status_type || "") ? "Video" : x.full_picture ? "Foto" : "Texto",
            texto: corto(x.message),
            enlace: x.permalink_url || "",
            imagen: x.full_picture || "",
            alcance: numero(m.post_total_media_view_unique),
            vistas: numero(m.post_media_view),
            me_gusta: Number(x.reactions && x.reactions.summary && x.reactions.summary.total_count) || 0,
            comentarios: Number(x.comments && x.comments.summary && x.comments.summary.total_count) || 0,
            compartidos: Number(x.shares && x.shares.count) || 0,
            guardados: null
          };
          o.interacciones = sumaInt(o);
          out.push(o);
        }
        return out;
      }
      if (red === "TikTok") {
        let cursor = null;
        let mas = true;
        while (mas && out.length < max) {
          const { j } = await pedir(f, `${API.tt}/v2/video/list/?fields=id,create_time,title,video_description,share_url,cover_image_url,view_count,like_count,comment_count,share_count`, { method: "POST", headers: { Authorization: `Bearer ${token.access}`, "Content-Type": "application/json" }, body: JSON.stringify(cursor ? { max_count: 20, cursor } : { max_count: 20 }) }, "TikTok");
          const d = j.data || {};
          let viejo = false;
          for (const x of d.videos || []) {
            const fecha = new Date((Number(x.create_time) || 0) * 1e3).toISOString();
            if (Date.parse(fecha) < desde) {
              viejo = true;
              break;
            }
            if (out.length >= max) break;
            const o = { post_id: String(x.id), fecha, tipo: "Video", texto: corto(x.video_description || x.title), enlace: x.share_url || "", imagen: x.cover_image_url || "", alcance: null, vistas: Number(x.view_count) || 0, me_gusta: Number(x.like_count) || 0, comentarios: Number(x.comment_count) || 0, compartidos: Number(x.share_count) || 0, guardados: null };
            o.interacciones = sumaInt(o);
            out.push(o);
          }
          mas = !viejo && d.has_more && d.cursor;
          cursor = d.cursor;
        }
        return out;
      }
      if (red === "YouTube") {
        const auth = { headers: { Authorization: `Bearer ${token.access}` } };
        const { j: ch } = await pedir(f, `${API.yt}/youtube/v3/channels?part=contentDetails&mine=true`, auth, "YouTube");
        const lista = (((ch.items || [])[0] || {}).contentDetails || {}).relatedPlaylists;
        if (!lista || !lista.uploads) return out;
        const { j: pl } = await pedir(f, `${API.yt}/youtube/v3/playlistItems?part=contentDetails&maxResults=${Math.min(max, 50)}&playlistId=${encodeURIComponent(lista.uploads)}`, auth, "YouTube");
        const ids = (pl.items || []).filter((x) => Date.parse(x.contentDetails.videoPublishedAt || 0) >= desde).map((x) => x.contentDetails.videoId);
        if (!ids.length) return out;
        const { j } = await pedir(f, `${API.yt}/youtube/v3/videos?part=snippet,statistics&id=${ids.join(",")}`, auth, "YouTube");
        for (const x of j.items || []) {
          const st = x.statistics || {};
          const o = { post_id: x.id, fecha: x.snippet.publishedAt, tipo: "Video", texto: corto(x.snippet.title), enlace: `https://www.youtube.com/watch?v=${x.id}`, imagen: ((x.snippet.thumbnails || {}).medium || {}).url || "", alcance: null, vistas: Number(st.viewCount) || 0, me_gusta: Number(st.likeCount) || 0, comentarios: Number(st.commentCount) || 0, compartidos: null, guardados: null };
          o.interacciones = sumaInt(o);
          out.push(o);
        }
        return out;
      }
      return out;
    }
    module.exports = { REDES, urlAutorizar, canjear, renovar, perfil, publicar, revisar, metricas, diaria, audiencia, contenido, bandeja, responder, ocultar, competidor, urlNegocioTikTok, canjearNegocioTikTok, renovarNegocioTikTok, bandejaTikTok, responderTikTok, ocultarTikTok, API };
  }
});

// src/main/push.js
var require_push = __commonJS({
  "src/main/push.js"(exports, module) {
    var sutil = () => globalThis.crypto && globalThis.crypto.subtle || (init_shim_crypto(), __toCommonJS(shim_crypto_exports)).webcrypto.subtle;
    var b64u = (buf) => Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    var deB64u = (s) => Buffer.from(String(s).replace(/-/g, "+").replace(/_/g, "/"), "base64");
    async function generarVapid() {
      const k = await sutil().generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
      const raw = await sutil().exportKey("raw", k.publicKey);
      const jwk = await sutil().exportKey("jwk", k.privateKey);
      return { publica: b64u(raw), privada: JSON.stringify(jwk) };
    }
    async function firmaVapid(settings, endpoint, ahora = Date.now()) {
      const aud = new URL(endpoint).origin;
      const jwk = JSON.parse(settings.vapid_privada);
      const key = await sutil().importKey("jwk", jwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
      const enc = (o) => b64u(Buffer.from(JSON.stringify(o)));
      const sub = /^mailto:|^https:/.test(settings.push_contacto || "") ? settings.push_contacto : `mailto:${settings.correo_soporte || "soporte@staydelirious.com"}`;
      const datos = `${enc({ typ: "JWT", alg: "ES256" })}.${enc({ aud, exp: Math.floor(ahora / 1e3) + 12 * 3600, sub })}`;
      const firma = await sutil().sign({ name: "ECDSA", hash: "SHA-256" }, key, Buffer.from(datos));
      return `vapid t=${datos}.${b64u(firma)}, k=${settings.vapid_publica}`;
    }
    async function enviarPush(settings, endpoint, fetchImpl = fetch) {
      if (!settings.vapid_privada || !settings.vapid_publica || !/^https:\/\//.test(endpoint)) return "error";
      try {
        const r = await fetchImpl(endpoint, { method: "POST", headers: { Authorization: await firmaVapid(settings, endpoint), TTL: "86400", Urgency: "normal", "Content-Length": "0" } });
        if (r.status === 404 || r.status === 410) return "borrar";
        return r.status >= 200 && r.status < 300 ? "ok" : "error";
      } catch (e) {
        return "error";
      }
    }
    async function repartir(core, eventos, fetchImpl = fetch) {
      const s = core.db.settings;
      let enviados = 0;
      if (!eventos.length || !s.vapid_privada) return 0;
      const porUsuario = /* @__PURE__ */ new Map();
      for (const ev of eventos) {
        const ids = core.destinatariosAviso(ev);
        if (!ids.length) continue;
        core.encolarAviso(ids, ev);
        for (const id of ids) porUsuario.set(id, true);
      }
      for (const id of porUsuario.keys()) {
        const u = core.db.users.find((x) => x.id === id);
        if (!u) continue;
        for (const sub of (u.push || []).slice()) {
          const r = await enviarPush(s, sub.endpoint, fetchImpl);
          if (r === "ok") enviados++;
          if (r === "borrar") u.push = (u.push || []).filter((x) => x.endpoint !== sub.endpoint);
        }
      }
      return enviados;
    }
    module.exports = { generarVapid, firmaVapid, enviarPush, repartir, b64u, deB64u };
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
    var P = require_push();
    var METODOS = [
      "setIdioma",
      "guardarBienvenida",
      "marcarAccesoSocio",
      "kitMarca",
      "generarPiezasPlan",
      "decidirGuion",
      "marcarChecklist",
      "checklistDe",
      "sinRespuesta",
      "prefsAvisos",
      "guardarSuscripcionPush",
      "quitarSuscripcionPush",
      "misAvisos",
      "cobranza",
      "pausarServicio",
      "riesgoClientes",
      "encuestaPendiente",
      "responderEncuesta",
      "resultadosEncuesta",
      "casoExito",
      "prepararCierre",
      "cerrarCliente",
      "reactivarCliente",
      "panelMeta",
      "capacidadClientes",
      "exportarCliente",
      "ideaAPieza",
      "aplicarRespuesta",
      "crearRespuestasBase",
      "miPortal19",
      "cargaSemanas",
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
      "reporteCliente",
      "metricasRedes",
      "fichaCliente",
      "marcarTutorial",
      "informeCliente",
      "mejorHora",
      "cargaEquipo",
      "bandeja",
      "dosPasosPreparar",
      "dosPasosActivar",
      "dosPasosDesactivar",
      "dosPasosCodigos",
      "horarios",
      "guardarHorario",
      "crearInvitacion",
      "primerUsoReal",
      "importarProspectos",
      "marcarMensaje",
      "hoyProspeccion",
      "embudo",
      "crearPlantillasBase",
      "proponerPlan",
      "facturarEntregado",
      "pagosFreelance",
      "pagarFreelance",
      "comisiones",
      "pagarComision",
      "margen",
      "bajaUsuario",
      "metodosPara"
    ];
    var SOLO_LECTURA = /* @__PURE__ */ new Set(["kitMarca", "checklistDe", "sinRespuesta", "misAvisos", "cobranza", "riesgoClientes", "encuestaPendiente", "resultadosEncuesta", "casoExito", "prepararCierre", "panelMeta", "capacidadClientes", "miPortal19", "cargaSemanas", "pagosFreelance", "comisiones", "margen", "metodosPara", "horarios", "hoyProspeccion", "embudo", "verInvitacion", "informeCliente", "mejorHora", "cargaEquipo", "bandeja", "fichaCliente", "metricasRedes", "reporteCliente", "metricasJuego", "hasUsers", "demoAccounts", "me", "meta", "list", "get", "directory", "options", "dashboard", "calendar", "report", "search", "auditList", "settings", "ping", "urlArchivo", "exportData"]);
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
      let trafico = 0;
      const metaLeer = async (clave3) => {
        try {
          const j = await (await rest(`dos_meta?select=valor&clave=eq.${clave3}`)).json();
          return j.length ? j[0].valor : null;
        } catch (e) {
          return null;
        }
      };
      const metaPoner = async (clave3, valor) => rest("dos_meta?on_conflict=clave", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify([{ clave: clave3, valor, actualizado: (/* @__PURE__ */ new Date()).toISOString() }]) });
      async function mantenimiento(db) {
        const r = {};
        const hoy = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        const mes = hoy.slice(0, 7);
        try {
          await metaPoner("ping", { fecha: (/* @__PURE__ */ new Date()).toISOString() });
          r.ping = true;
        } catch (e) {
        }
        try {
          const t = await metaLeer("trafico") || {};
          const base = t.mes === mes ? Number(t.bytes) || 0 : 0;
          await metaPoner("trafico", { mes, bytes: base + trafico });
          trafico = 0;
        } catch (e) {
        }
        try {
          const ult = await metaLeer("respaldo") || {};
          if (ult.dia !== hoy) {
            let datos = new TextEncoder().encode(JSON.stringify({ ...db, _respaldo: { fecha: (/* @__PURE__ */ new Date()).toISOString() } }));
            let ext = "json";
            if (typeof CompressionStream !== "undefined") {
              datos = new Uint8Array(await new Response(new Blob([datos]).stream().pipeThrough(new CompressionStream("gzip"))).arrayBuffer());
              ext = "json.gz";
            }
            const ruta = `respaldos/${hoy}.${ext}`;
            const u = await firmarSubida(ruta);
            const up = await fetchImpl(u, { method: "PUT", headers: { "x-upsert": "true", "Content-Type": "application/octet-stream" }, body: datos });
            if (!up.ok) throw new Error("no se subi\xF3");
            const lista = await (await fetchImpl(`${url}/storage/v1/object/list/archivos`, { method: "POST", headers: h({ "Content-Type": "application/json" }), body: JSON.stringify({ prefix: "respaldos/", limit: 100, sortBy: { column: "name", order: "asc" } }) })).json().catch(() => []);
            const viejos = (Array.isArray(lista) ? lista : []).map((x) => x.name).filter((n) => /^\d{4}-\d\d-\d\d/.test(n)).sort().slice(0, -7).map((n) => `respaldos/${n}`);
            if (viejos.length) await fetchImpl(`${url}/storage/v1/object/archivos`, { method: "DELETE", headers: h({ "Content-Type": "application/json" }), body: JSON.stringify({ prefixes: viejos }) });
            await metaPoner("respaldo", { dia: hoy, fecha: (/* @__PURE__ */ new Date()).toISOString(), bytes: datos.length, ruta });
            r.respaldo = ruta;
          }
        } catch (e) {
          r.respaldo_error = e.message;
        }
        return r;
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
          return ir(st.b ? R.urlNegocioTikTok(s, { redirect: vuelta(), estado: u.searchParams.get("s") }) : R.urlAutorizar(c.red, s, { redirect: vuelta(), estado: u.searchParams.get("s") }));
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
        const codigo = u.searchParams.get("code") || u.searchParams.get("auth_code");
        if (negado || !codigo) return ir(pagina(s, { error: `No se dio el permiso${negado ? ": " + String(negado).slice(0, 150) : "."}`, red: c.red }));
        const core = new Core(null, { db });
        const antes = foto(db);
        let fin;
        try {
          if (st.b) {
            const tk = await R.canjearNegocioTikTok(s, { code: codigo, redirect: vuelta() }, fetchImpl);
            core.redesConectarNegocio(c.id, tk);
            fin = pagina(s, { ok: "1", red: "TikTok", nombre: `${c.nombre || ""} (bandeja)` });
            await avisar(core, db);
            await guardarCambios(db, antes);
            return ir(fin);
          }
          const { token, cuenta } = await R.canjear(c.red, s, { code: codigo, redirect: vuelta(), estado }, fetchImpl);
          const r = core.redesConectar(c.id, cuenta, token);
          fin = pagina(s, { ok: "1", red: c.red, nombre: r.nombre || "", paginas: r.paginas ? String(r.paginas.length) : "" });
        } catch (e) {
          core.redesFallo(c.id, e);
          fin = pagina(s, { error: e.message, red: c.red });
        }
        await avisar(core, db);
        await guardarCambios(db, antes);
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
      async function tareasRedes(core, db, { postId = null, metricas = false, limite = 6, bandeja = false } = {}) {
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
        const inicio = Date.now();
        const presupuesto = metricas ? 11e4 : 8e4;
        const hoy = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        const toca = (c) => metricas || !c.metricas_al || Date.now() - Date.parse(c.metricas_al) > 6 * 3600 * 1e3 || c.metricas_pendiente;
        for (const cuenta of db.socials.filter((x) => x.estado === "Conectada" && x.cuenta_ext && toca(x))) {
          if (Date.now() - inicio > presupuesto) break;
          try {
            const t = await tokenListo(db, cuenta);
            const p = await R.perfil(cuenta.red, s, t, fetchImpl, cuenta.cuenta_ext);
            core.redesSeguidores(cuenta, p.seguidores);
            if (p.publicaciones_total !== void 0) cuenta.publicaciones_total = p.publicaciones_total;
            core.redesGuardarDia(cuenta, hoy, { seguidores: p.seguidores });
            let pendiente = false;
            let aviso = "";
            for (let i = 30; i >= 1; i--) {
              const dia = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
              if (i > 2 && core.redesDiaGuardado(cuenta, dia)) continue;
              if (Date.now() - inicio > presupuesto) {
                pendiente = true;
                break;
              }
              let m;
              try {
                m = await R.diaria(cuenta.red, s, t, cuenta, dia, fetchImpl);
              } catch (e) {
                if (e.code === "VENCIDO") throw e;
                aviso = e.message;
                break;
              }
              if (!m) break;
              core.redesGuardarDia(cuenta, dia, m);
            }
            if (!pendiente && Date.now() - inicio < presupuesto) {
              const desde = Date.now() - (cuenta.metricas_al ? 35 : 90) * 864e5;
              try {
                core.redesGuardarContenido(cuenta, await R.contenido(cuenta.red, s, t, cuenta, fetchImpl, { desde, max: cuenta.metricas_al ? 40 : 60 }));
              } catch (e) {
                if (e.code === "VENCIDO") throw e;
                aviso = e.message;
              }
              try {
                if (!cuenta.audiencia || Date.now() - Date.parse(cuenta.audiencia.fecha || 0) > 24 * 3600 * 1e3) core.redesAudiencia(cuenta, await R.audiencia(cuenta.red, s, t, cuenta, fetchImpl));
              } catch (e) {
                if (e.code === "VENCIDO") throw e;
              }
            } else pendiente = true;
            cuenta.metricas_pendiente = pendiente;
            if (!pendiente) cuenta.metricas_al = (/* @__PURE__ */ new Date()).toISOString();
            cuenta.ultimo_error = aviso ? `M\xE9tricas: ${aviso}`.slice(0, 300) : "";
            res.cuentas++;
          } catch (e) {
            core.redesFallo(cuenta.id, e);
            cuenta.metricas_al = (/* @__PURE__ */ new Date()).toISOString();
            res.errores.push(`${cuenta.red} ${cuenta.nombre}: ${e.message}`);
          }
        }
        if (metricas || Date.now() - (Date.parse(s.redes_ultima_sync || 0) || 0) > 6 * 3600 * 1e3) {
          s.redes_ultima_sync = (/* @__PURE__ */ new Date()).toISOString();
          const hace30 = Date.now() - 30 * 864e5;
          for (const post of db.posts.filter((x) => Date.parse(x.publicado_el || x.fecha || 0) > hace30)) for (const pub of (post.publicaciones || []).filter((x) => x.estado === "Publicado" && x.id && !(x.metricas && Date.now() - Date.parse(x.metricas.fecha || 0) < 3600 * 1e3))) {
            if (Date.now() - inicio > presupuesto) break;
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
        res.bandeja = await tareasBandeja(core, db, { inicio, presupuesto: presupuesto + 15e3, forzar: bandeja });
        if (core.tasasViejas() && (core.monedas() || []).some((m) => m.auto)) {
          try {
            await X.actualizarTasas(core, fetchImpl, { sinPermiso: true });
            res.tasas = true;
          } catch (e) {
          }
        }
        return res;
      }
      async function tokenNegocio(db, cuenta) {
        const t = db.social_tokens.find((x) => x.id === cuenta.id + ":negocio");
        if (!t || !t.access) throw Object.assign(new Error("TikTok: la bandeja no est\xE1 conectada."), { code: "VENCIDO" });
        const nuevo = await R.renovarNegocioTikTok(db.settings, t, fetchImpl);
        if (nuevo) Object.assign(t, nuevo, { actualizado: (/* @__PURE__ */ new Date()).toISOString() });
        return t;
      }
      const bandejaDe = async (db, cuenta, opciones) => cuenta.red === "TikTok" ? R.bandejaTikTok(db.settings, await tokenNegocio(db, cuenta), cuenta, fetchImpl, opciones) : R.bandeja(cuenta.red, db.settings, await tokenListo(db, cuenta), cuenta, fetchImpl, opciones);
      async function tareasBandeja(core, db, { inicio = Date.now(), presupuesto = 9e4, forzar = false, cuentaId = null } = {}) {
        const r = { cuentas: 0, nuevos: 0, errores: [] };
        const s = db.settings;
        const toca = (c) => forzar || !c.bandeja_al || Date.now() - Date.parse(c.bandeja_al) > 20 * 6e4;
        for (const cuenta of db.socials.filter((x) => (["Instagram", "Facebook"].includes(x.red) || x.red === "TikTok" && x.tiktok_bandeja) && x.estado === "Conectada" && x.cuenta_ext && (!cuentaId || x.id === cuentaId) && toca(x))) {
          if (Date.now() - inicio > presupuesto) break;
          try {
            const b = await bandejaDe(db, cuenta, { desde: Date.now() - (cuenta.bandeja_al ? 14 : 30) * 864e5 });
            r.nuevos += core.bandejaGuardar(cuenta, b);
            r.cuentas++;
            if (b.avisos.length) r.errores.push(`${cuenta.nombre}: ${b.avisos.join(" ")}`);
          } catch (e) {
            if (e.code === "VENCIDO" && cuenta.red !== "TikTok") core.redesFallo(cuenta.id, e);
            cuenta.bandeja_al = (/* @__PURE__ */ new Date()).toISOString();
            cuenta.bandeja_aviso = e.message.slice(0, 300);
            r.errores.push(`${cuenta.red} ${cuenta.nombre}: ${e.message}`);
          }
        }
        return r;
      }
      async function avisar(core, db) {
        const ev = core.takeEvents();
        if (!ev.length) return;
        await Promise.all([I.enviarDiscord(db.settings, ev, fetchImpl).catch(() => 0), P.repartir(core, ev, fetchImpl).catch(() => 0)]);
      }
      async function listarArchivos(prefijo = "", fondo = 0, out = []) {
        if (fondo > 4 || out.length >= 3e3) return out;
        let lista = [];
        try {
          lista = await (await fetchImpl(`${url}/storage/v1/object/list/archivos`, { method: "POST", headers: h({ "Content-Type": "application/json" }), body: JSON.stringify({ prefix: prefijo, limit: 1e3, offset: 0 }) })).json();
        } catch (e) {
          return out;
        }
        for (const x of Array.isArray(lista) ? lista : []) {
          const ruta = prefijo ? `${prefijo}/${x.name}` : x.name;
          if (x.id) out.push({ ruta, peso: x.metadata && x.metadata.size || null, actualizado: x.updated_at || null });
          else await listarArchivos(ruta, fondo + 1, out);
        }
        return out;
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
            if (core.esVideo(args[0])) throw Object.assign(new Error('Los videos no se suben a la nube gratis: s\xFAbelo a Google Drive, comp\xE1rtelo con "cualquiera con el enlace" y pega el enlace.'), { code: "INPUT" });
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
            if ((args[0] || {}).bandeja && (c.red !== "TikTok" || core.isClient())) throw Object.assign(new Error("La bandeja se conecta aparte solo en cuentas de TikTok."), { code: "INPUT" });
            const est = firmarEstado({ c: c.id, r: c.red, b: (args[0] || {}).bandeja ? 1 : 0, u: core.user.id, e: Date.now() + 7 * 864e5, n: crypto.randomBytes(6).toString("hex") });
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
          } else if (metodo === "clavePush") {
            core.requireUser();
            const s = db.settings;
            if (!s.vapid_publica || !s.vapid_privada) {
              const k = await P.generarVapid();
              s.vapid_publica = k.publica;
              s.vapid_privada = k.privada;
            }
            data = { publica: s.vapid_publica };
          } else if (metodo === "probarPush") {
            const u = core.requireUser();
            core.encolarAviso([u.id], { titulo: "Avisos activados \u2726", detalle: "As\xED te llegar\xE1n los avisos de Delirium OS.", tipo: "prueba" });
            let n = 0;
            for (const sub of u.push || []) if (await P.enviarPush(db.settings, sub.endpoint, fetchImpl) === "ok") n++;
            data = { enviados: n };
          } else if (metodo === "exportarTodo") {
            const u = core.requireUser();
            if (u.rol !== "founder") throw Object.assign(new Error("Solo el CEO exporta todos los datos de la nube."), { code: "ACCESS" });
            const base = JSON.parse(core.exportData());
            data = JSON.stringify({ formato: "delirium-os-exportacion", exportado: (/* @__PURE__ */ new Date()).toISOString(), base, archivos: await listarArchivos(""), enlaces: core.enlacesDeTodo() });
          } else if (metodo === "usoNube") {
            if (!core.isAdmin()) throw Object.assign(new Error("Solo Direcci\xF3n."), { code: "ACCESS" });
            let uso = null;
            try {
              uso = await (await rest("rpc/dos_uso", { method: "POST", body: "{}" })).json();
            } catch (e) {
              uso = null;
            }
            const [ping, tr, resp] = await Promise.all([metaLeer("ping"), metaLeer("trafico"), metaLeer("respaldo")]);
            data = { uso, falta_sql: !uso, ping, trafico: { ...tr || {}, bytes: (tr && tr.mes === (/* @__PURE__ */ new Date()).toISOString().slice(0, 7) ? Number(tr.bytes) || 0 : 0) + trafico }, respaldo: resp, limites: { db: 500 * 1048576, archivos: 1024 * 1048576, trafico: 5 * 1024 * 1048576 } };
          } else if (metodo === "descargarRespaldo") {
            if (!core.isAdmin()) throw Object.assign(new Error("Solo Direcci\xF3n."), { code: "ACCESS" });
            const resp = await metaLeer("respaldo");
            if (!resp || !resp.ruta) throw Object.assign(new Error("Todav\xEDa no hay respaldo en la nube. Se crea solo una vez al d\xEDa."), { code: "INPUT" });
            data = { url: await firmarDescarga(resp.ruta, 600), ...resp };
          } else if (metodo === "reportarProblema") {
            core.requireUser();
            if (!limitar("rp:" + core.user.id, 10, 36e5)) throw Object.assign(new Error("Ya enviaste varios reportes. Intenta en un rato."), { code: "INPUT" });
            data = await X.reportarProblema(core, args[0] || {}, fetchImpl);
          } else if (metodo === "verInvitacion") {
            if (!limitar("inv:" + (body.ip || "x"), 30, 6e5)) throw Object.assign(new Error("Demasiados intentos."), { code: "ACCESS" });
            data = core.verInvitacion(args[0]);
          } else if (metodo === "canjearInvitacion") {
            if (!limitar("inv:" + (body.ip || "x"), 30, 6e5)) throw Object.assign(new Error("Demasiados intentos."), { code: "ACCESS" });
            data = core.canjearInvitacion(args[0], args[1]);
            token = firmar(core.user.id);
          } else if (metodo === "competidores") {
            const c = core.rawScoped("clientes", args[0]);
            if (core.isClient() || !core.canRead("metricas")) throw Object.assign(new Error("Tu rol no puede ver la competencia."), { code: "ACCESS" });
            const handles = String(c.competidores || "").split(/[\s,;]+/).filter(Boolean).slice(0, 5);
            if (!handles.length) throw Object.assign(new Error("Escribe en la ficha del cliente los usuarios de Instagram de sus competidores."), { code: "INPUT" });
            const ig = db.socials.find((x) => x.red === "Instagram" && x.estado === "Conectada" && x.cuenta_ext && x.client_id === c.id) || db.socials.find((x) => x.red === "Instagram" && x.estado === "Conectada" && x.cuenta_ext);
            if (!ig) throw Object.assign(new Error("Hace falta al menos una cuenta de Instagram conectada para consultar la competencia."), { code: "INPUT" });
            const t = await tokenListo(db, ig);
            const lista = [];
            const propia = db.socials.find((x) => x.red === "Instagram" && x.client_id === c.id && x.cuenta_ext && x.nombre);
            for (const hnd of [...propia ? [propia.nombre] : [], ...handles]) {
              try {
                lista.push({ ...await R.competidor(db.settings, t, ig, hnd, fetchImpl), propia: !!propia && hnd === propia.nombre });
              } catch (e) {
                lista.push({ usuario: String(hnd).replace(/^@/, ""), error: e.message.replace(/^Instagram: /, "") });
              }
            }
            c.competencia = { fecha: (/* @__PURE__ */ new Date()).toISOString(), lista };
            data = c.competencia;
          } else if (metodo === "actualizarTasas") {
            core.requireUser();
            data = await X.actualizarTasas(core, fetchImpl, { forzar: true });
          } else if (metodo === "bandejaActualizar") {
            core.requireUser();
            if (core.isClient() || !core.canRead("bandeja")) throw Object.assign(new Error("Tu rol no puede ver la bandeja."), { code: "ACCESS" });
            data = await tareasBandeja(core, db, { forzar: true, presupuesto: 12e4 });
          } else if (metodo === "bandejaResponder") {
            const { it, c } = core.bandejaItem(args[0]);
            const r = c.red === "TikTok" ? await R.responderTikTok(db.settings, await tokenNegocio(db, c), it, args[1], fetchImpl) : await R.responder(c.red, db.settings, await tokenListo(db, c), c, it, args[1], fetchImpl);
            core.bandejaRespondida(it, args[1], r);
            data = { ok: true, id: it.id };
          } else if (metodo === "bandejaOcultar") {
            const { it, c } = core.bandejaItem(args[0]);
            if (c.red === "TikTok") await R.ocultarTikTok(db.settings, await tokenNegocio(db, c), it, args[1] !== false, fetchImpl);
            else await R.ocultar(c.red, db.settings, await tokenListo(db, c), c, it, args[1] !== false, fetchImpl);
            it.estado = args[1] !== false ? "Oculto" : "Nuevo";
            it.oculto = args[1] !== false;
            core.audit("editar", "bandeja", it.id, `${it.oculto ? "Ocult\xF3" : "Mostr\xF3"} un comentario en ${it.red}`);
            data = { ok: true, estado: it.estado };
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
          await avisar(core, db);
          await guardarCambios(db, antes);
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
            const r2 = core.ingestCrash(body, { gameId: g.id });
            await avisar(core, db);
            await guardarCambios(db, antes);
            return responder({ ok: true, id: r2.id, nuevo: r2.nuevo });
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
            let r2;
            try {
              r2 = await tareasRedes(core, db);
            } catch (e) {
              r2 = { error: e.message };
            }
            try {
              r2.automaticas = core.tareasAutomaticas();
            } catch (e) {
              r2.automaticas = { error: e.message };
            }
            try {
              r2.mantenimiento = await mantenimiento(db);
            } catch (e) {
            }
            await avisar(core, db);
            await guardarCambios(db, antes);
            return responder({ ok: true, ...r2 });
          }
          if (ruta.endsWith("/avisos")) {
            const endpoint = String(body.endpoint || "");
            if (!/^https:\/\//.test(endpoint) || endpoint.length > 600) return responder({ error: "Suscripci\xF3n inv\xE1lida." }, 400);
            if (!limitar("av:" + endpoint.slice(-40), 30, 6e4)) return responder({ error: "Demasiado seguido." }, 429);
            const db = await obtenerDb();
            const u = db.users.find((x) => x.activo && (x.push || []).some((p) => p.endpoint === endpoint));
            if (!u) return responder({ avisos: [] });
            const cola = ((db.meta || {}).avisos || {})[u.id] || [];
            const nuevos = cola.filter((a) => !a.entregado);
            if (nuevos.length) {
              const antes = foto(db);
              for (const a of cola) a.entregado = true;
              await guardarCambios(db, antes);
            }
            return responder({ avisos: nuevos.slice(-3).reverse().map((a) => ({ titulo: a.titulo, cuerpo: a.cuerpo, tipo: a.tipo })) });
          }
          if (ruta.endsWith("/tienda")) {
            const db = await obtenerDb();
            const core = new Core(null, { db });
            if (body.accion === "pedido") {
              if (body.website) return responder({ ok: true });
              const ip = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "x";
              if (!limitar("t:" + ip, 10, 36e5)) return responder({ error: "Recibimos varios pedidos desde tu conexi\xF3n. Escr\xEDbenos por redes para continuar." }, 429);
              const antes = foto(db);
              let r2;
              try {
                r2 = core.tiendaPedido(body);
              } catch (e) {
                cache = null;
                return responder({ error: e.message }, 400);
              }
              await avisar(core, db);
              await guardarCambios(db, antes);
              return responder({ ok: true, ...r2, datos_pago: db.settings.tienda_datos_pago || "" });
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
            await avisar(core, db);
            await guardarCambios(db, antes);
            return responder({ ok: true, mensaje: "\xA1Gracias! Te escribiremos pronto." });
          }
          body.ip = String(req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "x").split(",")[0].trim();
          const resultado = await api(body);
          const r = responder(resultado);
          trafico += JSON.stringify(resultado).length;
          return r;
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
