// ============================================================
// FIFA WORLD CUP 2026 — Lógica de la aplicación
// SPA (Single Page Application) con router hash-based
// TUP Inc.
// ============================================================

// ============================================================
// ESTADO GLOBAL
// ============================================================
const state = {
  filters: {
    grupo: 'all',
    fase: 'all',
    estadioId: 'all',
    busqueda: ''
  },
  selectedTicket: {
    partidoId: null,
    categoria: 'general',
    cantidad: 1
  },
  // Simulación de inventario en memoria (se modifica al comprar)
  inventario: {}
};

// Inicializar inventario desde los datos
DATA.partidos.forEach(p => {
  state.inventario[p.id] = {
    general:      p.entradas.general.disponibles,
    preferencial: p.entradas.preferencial.disponibles,
    vip:          p.entradas.vip.disponibles
  };
});

// ============================================================
// UTILIDADES
// ============================================================

/** Devuelve el objeto equipo por su código */
function getEquipo(cod) {
  if (!cod) return { nombre: 'Por Definir', bandera: '❓' };
  return DATA.equipos[cod] || { nombre: cod, bandera: '🏳' };
}

/** Devuelve el objeto estadio por su ID */
function getEstadio(id) {
  return DATA.estadios.find(e => e.id === id);
}

/** Formatea "2026-06-11" → "11 JUN 2026" */
function formatFecha(fechaStr) {
  if (!fechaStr) return '-';
  const meses = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
  const [anio, mes, dia] = fechaStr.split('-').map(Number);
  return `${dia} ${meses[mes - 1]} ${anio}`;
}

/** Formatea número con separadores de miles */
function formatNum(n) {
  return new Intl.NumberFormat('es-AR').format(n);
}

/** Calcula el % vendido global de un partido */
function calcPctVendido(partidoId) {
  const p = DATA.partidos.find(x => x.id === partidoId);
  if (!p) return 0;
  let total = 0, disponibles = 0;
  ['general', 'preferencial', 'vip'].forEach(cat => {
    total       += p.entradas[cat].total;
    disponibles += state.inventario[partidoId][cat];
  });
  const vendidos = total - disponibles;
  return Math.round((vendidos / total) * 100);
}

/** Devuelve clases y texto del badge según estado del partido */
function getBadgeEstado(estado) {
  const map = {
    programado:  { cls: 'badge--programado',  label: 'Programado' },
    en_juego:    { cls: 'badge--en-juego',    label: '🟢 En Juego' },
    finalizado:  { cls: 'badge--finalizado',  label: 'Finalizado' },
    por_definir: { cls: 'badge--por-definir', label: 'Por Definir' }
  };
  return map[estado] || map.por_definir;
}

/** Genera un código de reserva aleatorio */
function generarCodigo() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let cod = 'FIFA-';
  for (let i = 0; i < 8; i++) cod += chars[Math.floor(Math.random() * chars.length)];
  return cod;
}

// ============================================================
// ROUTER — Navegación hash-based
// ============================================================

/** Navega a un hash dado (ej: '#/partidos') */
function navigate(hash) {
  window.location.hash = hash;
}

/** Router principal: lee el hash y renderiza la vista */
function router() {
  const raw  = window.location.hash.replace('#', '');
  const path = raw || '/';
  const app  = document.getElementById('app');

  // Mostrar loading brevemente
  app.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:50vh;">
      <div style="text-align:center;color:var(--c-text-muted)">
        <div style="font-size:2rem;margin-bottom:8px">⚽</div>
        <div>Cargando...</div>
      </div>
    </div>`;

  // Pequeño timeout para que el loader se vea (y simule fetch)
  setTimeout(() => {
    if (path === '/' || path === '') {
      renderHome();
      setNavActivo('home');
    } else if (path === '/partidos') {
      renderPartidos();
      setNavActivo('partidos');
    } else if (path.startsWith('/partido/')) {
      const id = path.split('/')[2];
      renderDetallePartido(id);
      setNavActivo('partidos');
    } else if (path === '/estadios') {
      renderEstadios();
      setNavActivo('estadios');
    } else if (path.startsWith('/estadio/')) {
      const id = path.split('/')[2];
      renderDetalleEstadio(id);
      setNavActivo('estadios');
    } else {
      renderNoEncontrado();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    cerrarMenu();
  }, 80);
}

/** Marca el enlace de nav activo */
function setNavActivo(key) {
  document.querySelectorAll('.navbar__link').forEach(a => a.classList.remove('navbar__link--active'));
  const link = document.querySelector(`[data-nav="${key}"]`);
  if (link) link.classList.add('navbar__link--active');
}

// ============================================================
// COMPONENTE: MATCH CARD
// ============================================================
function crearMatchCard(partido, darkMode = false) {
  const local     = getEquipo(partido.localCod);
  const visitante = getEquipo(partido.visitanteCod);
  const estadio   = getEstadio(partido.estadioId);
  const badge     = getBadgeEstado(partido.estado);
  const pct       = calcPctVendido(partido.id);

  const isLive      = partido.estado === 'en_juego';
  const isFinished  = partido.estado === 'finalizado';
  const isPorDef    = partido.estado === 'por_definir';
  const isAgotado   = pct >= 100;

  // Centro del marcador
  let centroHTML;
  if (isPorDef) {
    centroHTML = '';
  } else if (isFinished || isLive) {
    centroHTML = `<span class="match-score">${partido.golesLocal} - ${partido.golesVisitante}</span>`;
  } else {
    centroHTML = `<span class="match-vs">VS</span>`;
  }

  // Equipos
  let teamsHTML;
  if (isPorDef) {
    teamsHTML = `<div class="match-teams match-teams--tbd"><span class="match-team__tbd">🏆 Clasificados por determinar</span></div>`;
  } else {
    teamsHTML = `
      <div class="match-teams">
        <div class="match-team match-team--local">
          <span class="match-team__flag">${local.bandera}</span>
          <span class="match-team__name">${local.nombre}</span>
        </div>
        ${centroHTML}
        <div class="match-team match-team--visitante">
          <span class="match-team__name">${visitante.nombre}</span>
          <span class="match-team__flag">${visitante.bandera}</span>
        </div>
      </div>`;
  }

  // Clase de disponibilidad
  let availCls = 'avail--ok';
  if (isAgotado)    availCls = 'avail--agotado';
  else if (pct >= 90) availCls = 'avail--critico';
  else if (pct >= 70) availCls = 'avail--bajo';

  const availTxt = isAgotado
    ? '🚫 Agotado'
    : pct >= 90
      ? `⚡ ${pct}% vendido — ¡Últimas entradas!`
      : `${pct}% vendido`;

  const grupoInfo  = partido.grupo    ? `GRUPO ${partido.grupo} · ` : '';
  const jornadaInfo = partido.jornada ? `JOR. ${partido.jornada} · ` : '';

  // Crear el elemento
  const card = document.createElement('article');
  card.className = `match-card${isLive ? ' match-card--live' : ''}`;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `${local.nombre} vs ${visitante.nombre}, ${formatFecha(partido.fecha)}`);

  card.innerHTML = `
    <div class="match-card__header">
      <div class="match-card__meta-top">
        <span class="match-label">${grupoInfo}${jornadaInfo}${partido.fase}</span>
        <span class="badge ${badge.cls}">${badge.label}</span>
      </div>
    </div>

    <div class="match-card__body">
      ${teamsHTML}
    </div>

    <div class="match-card__footer">
      <div class="match-card__info">
        <span class="match-card__date">📅 ${formatFecha(partido.fecha)} · ${partido.hora}</span>
        <span class="match-card__stadium">📍 ${estadio ? estadio.nombre : ''}, ${estadio ? estadio.ciudad : ''}</span>
      </div>
      <div class="match-card__availability ${availCls}">
        <div class="avail-bar">
          <div class="avail-bar__fill" style="width:${pct}%"></div>
        </div>
        <span class="avail-text">${availTxt}</span>
      </div>
    </div>

    <div class="match-card__actions">
      <button class="btn btn--outline btn--sm btn--full">Ver detalles →</button>
    </div>`;

  // Evento: click en la tarjeta o en el botón → navegar a detalle
  function goDetail(e) {
    navigate(`#/partido/${partido.id}`);
  }

  card.addEventListener('click', goDetail);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') goDetail(e); });

  return card;
}

// ============================================================
// VISTA: HOME
// ============================================================
function renderHome() {
  const app = document.getElementById('app');

  // Fechas importantes
  const inicio = new Date('2026-06-11');
  const hoy    = new Date();
  const diff   = Math.floor((hoy - inicio) / 86400000);

  let estadoMundial;
  if (diff < 0) {
    estadoMundial = `⏳ Faltan <strong>${Math.abs(diff)} días</strong> para el inicio`;
  } else if (diff <= 39) {
    estadoMundial = `🏆 Día <strong>${diff + 1}</strong> del Mundial · En curso`;
  } else {
    estadoMundial = `🏆 Mundial 2026 Finalizado`;
  }

  app.innerHTML = `
    <!-- HERO -->
    <section class="hero">
      <div class="container">
        <div class="hero__inner">
          <div class="hero__content">
            <div class="hero__eyebrow">
              <span class="live-dot"></span>
              Sistema Oficial de Entradas
            </div>
            <h1 class="hero__title">
              FIFA<br>
              <span class="gold">World Cup</span><br>
              2026™
            </h1>
            <p class="hero__subtitle">
              Adquirí tus entradas para los partidos del Mundial de Fútbol más grande de la historia. 48 equipos, 3 países, 104 partidos.
            </p>
            <div class="hero__ctas">
              <button class="btn btn--primary btn--lg" onclick="navigate('#/partidos')">
                🎟️ Ver Partidos
              </button>
              <button class="btn btn--white btn--lg" onclick="navigate('#/estadios')">
                🏟️ Estadios
              </button>
            </div>
          </div>

          <div class="hero__stats">
            <div class="stat-item">
              <div class="stat-item__value">48</div>
              <div class="stat-item__label">Equipos</div>
            </div>
            <div class="stat-item">
              <div class="stat-item__value">104</div>
              <div class="stat-item__label">Partidos</div>
            </div>
            <div class="stat-item">
              <div class="stat-item__value">16</div>
              <div class="stat-item__label">Estadios</div>
            </div>
            <div class="stat-item">
              <div class="stat-item__value">3</div>
              <div class="stat-item__label">Países sede</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero__ticker">${estadoMundial} · EE.UU. · México · Canadá</div>
    </section>

    <!-- PARTIDOS DE HOY / PRÓXIMOS -->
    <section class="featured-section" id="featured"></section>

    <!-- SECCIÓN RÁPIDA -->
    <section class="section">
      <div class="container">
        <div class="section__header">
          <div>
            <h2 class="section__title">Todas las Fases del Torneo</h2>
            <p class="section__subtitle">Explorá partidos por fase y encontrá tus entradas</p>
          </div>
        </div>
        <div id="fase-cards" style="display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(200px,1fr))"></div>
      </div>
    </section>
  `;

  // Partidos destacados: en_juego primero, luego próximos programados
  const destacados = [
    ...DATA.partidos.filter(p => p.estado === 'en_juego'),
    ...DATA.partidos.filter(p => p.estado === 'programado').slice(0, 6)
  ].slice(0, 6);

  const featured = document.getElementById('featured');
  if (destacados.length > 0) {
    featured.innerHTML = `
      <div class="container">
        <div class="section__header" style="margin-bottom:28px">
          <div>
            <h2 class="section__title" style="color:#fff">
              ${DATA.partidos.some(p => p.estado === 'en_juego') ? '🔴 En Juego Ahora' : '📅 Próximos Partidos'}
            </h2>
            <p class="section__subtitle">No te pierdas el partido</p>
          </div>
          <button class="btn btn--primary" onclick="navigate('#/partidos')">Ver todos →</button>
        </div>
        <div class="matches-grid" id="featured-grid"></div>
      </div>`;
    const grid = document.getElementById('featured-grid');
    destacados.forEach(p => grid.appendChild(crearMatchCard(p, true)));
  }

  // Cards de fases
  const fases = [...new Set(DATA.partidos.map(p => p.fase))];
  const faseIcons = {
    'Fase de Grupos': '⚽',
    'Octavos de Final': '🏅',
    'Cuartos de Final': '🥉',
    'Semifinal': '🥈',
    'Tercer Puesto': '🥉',
    'Gran Final': '🏆'
  };
  const faseContainer = document.getElementById('fase-cards');
  fases.forEach(fase => {
    const count = DATA.partidos.filter(p => p.fase === fase).length;
    const div   = document.createElement('div');
    div.className = 'info-card';
    div.style.cursor = 'pointer';
    div.style.transition = 'transform .2s, box-shadow .2s';
    div.innerHTML = `
      <div style="font-size:1.8rem;margin-bottom:8px">${faseIcons[fase] || '🏟️'}</div>
      <div style="font-family:var(--font-display);font-weight:600;font-size:.95rem;color:var(--c-primary);margin-bottom:4px">${fase}</div>
      <div style="font-size:.8rem;color:var(--c-text-muted)">${count} partido${count !== 1 ? 's' : ''}</div>
    `;
    div.addEventListener('mouseenter', () => { div.style.transform = 'translateY(-3px)'; div.style.boxShadow = 'var(--shadow-lg)'; });
    div.addEventListener('mouseleave', () => { div.style.transform = ''; div.style.boxShadow = ''; });
    div.addEventListener('click', () => navigate(`#/partidos`));
    faseContainer.appendChild(div);
  });
}

// ============================================================
// VISTA: LISTADO DE PARTIDOS
// ============================================================
function renderPartidos() {
  const app = document.getElementById('app');

  const grupos  = [...new Set(DATA.partidos.filter(p => p.grupo).map(p => p.grupo))].sort();
  const fases   = [...new Set(DATA.partidos.map(p => p.fase))];
  const estadios = DATA.estadios;

  app.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="section__header">
          <div>
            <h1 class="section__title">Partidos</h1>
            <p class="section__subtitle">
              Mostrando <strong id="count-visible">${DATA.partidos.length}</strong>
              de ${DATA.partidos.length} partidos
            </p>
          </div>
        </div>

        <!-- FILTROS -->
        <div class="filters">
          <div class="filter-group">
            <label for="f-busqueda">🔍 Buscar equipo</label>
            <input type="text" id="f-busqueda" placeholder="Ej: Argentina, Brasil..." value="${state.filters.busqueda}">
          </div>
          <div class="filter-group">
            <label for="f-grupo">Grupo</label>
            <select id="f-grupo">
              <option value="all">Todos los grupos</option>
              ${grupos.map(g => `<option value="${g}" ${state.filters.grupo === g ? 'selected' : ''}>Grupo ${g}</option>`).join('')}
            </select>
          </div>
          <div class="filter-group">
            <label for="f-fase">Fase</label>
            <select id="f-fase">
              <option value="all">Todas las fases</option>
              ${fases.map(f => `<option value="${f}" ${state.filters.fase === f ? 'selected' : ''}>${f}</option>`).join('')}
            </select>
          </div>
          <div class="filter-group">
            <label for="f-estadio">Estadio</label>
            <select id="f-estadio">
              <option value="all">Todos los estadios</option>
              ${estadios.map(e => `<option value="${e.id}" ${state.filters.estadioId === e.id ? 'selected' : ''}>${e.nombre}</option>`).join('')}
            </select>
          </div>
          <button class="btn btn--ghost filters__reset" onclick="resetFiltros()">✕ Limpiar</button>
        </div>

        <!-- GRID DE PARTIDOS -->
        <div class="matches-grid" id="partidos-grid"></div>

        <!-- ESTADO VACÍO -->
        <div id="empty-state" style="display:none" class="empty-state">
          <div class="empty-state__icon">🔍</div>
          <div class="empty-state__title">No se encontraron partidos</div>
          <div class="empty-state__desc">Intentá con otros filtros de búsqueda</div>
          <br>
          <button class="btn btn--outline" onclick="resetFiltros()">Limpiar filtros</button>
        </div>
      </div>
    </section>`;

  // Conectar eventos de filtros
  document.getElementById('f-busqueda').addEventListener('input', e => {
    state.filters.busqueda = e.target.value;
    aplicarFiltros();
  });
  document.getElementById('f-grupo').addEventListener('change', e => {
    state.filters.grupo = e.target.value;
    aplicarFiltros();
  });
  document.getElementById('f-fase').addEventListener('change', e => {
    state.filters.fase = e.target.value;
    aplicarFiltros();
  });
  document.getElementById('f-estadio').addEventListener('change', e => {
    state.filters.estadioId = e.target.value;
    aplicarFiltros();
  });

  // Renderizado inicial
  aplicarFiltros();
}

/** Filtra y renderiza las tarjetas de partidos */
function aplicarFiltros() {
  const { grupo, fase, estadioId, busqueda } = state.filters;
  const query = busqueda.toLowerCase().trim();

  const filtrados = DATA.partidos.filter(p => {
    // Filtro grupo
    if (grupo !== 'all' && p.grupo !== grupo) return false;
    // Filtro fase
    if (fase !== 'all' && p.fase !== fase) return false;
    // Filtro estadio
    if (estadioId !== 'all' && p.estadioId !== estadioId) return false;
    // Búsqueda de texto
    if (query) {
      const local     = getEquipo(p.localCod).nombre.toLowerCase();
      const visitante = getEquipo(p.visitanteCod).nombre.toLowerCase();
      const estadio   = (getEstadio(p.estadioId) || {}).nombre || '';
      if (!local.includes(query) && !visitante.includes(query) && !estadio.toLowerCase().includes(query)) return false;
    }
    return true;
  });

  const grid  = document.getElementById('partidos-grid');
  const empty = document.getElementById('empty-state');
  const count = document.getElementById('count-visible');

  grid.innerHTML = '';
  if (count) count.textContent = filtrados.length;

  if (filtrados.length === 0) {
    grid.style.display = 'none';
    empty.style.display = 'block';
  } else {
    grid.style.display = 'grid';
    empty.style.display = 'none';
    filtrados.forEach(p => grid.appendChild(crearMatchCard(p)));
  }
}

/** Resetea todos los filtros */
function resetFiltros() {
  state.filters = { grupo: 'all', fase: 'all', estadioId: 'all', busqueda: '' };
  renderPartidos();
}

// ============================================================
// VISTA: DETALLE DE PARTIDO
// ============================================================
function renderDetallePartido(id) {
  const app     = document.getElementById('app');
  const partido = DATA.partidos.find(p => p.id === id);

  if (!partido) { renderNoEncontrado(); return; }

  const local     = getEquipo(partido.localCod);
  const visitante = getEquipo(partido.visitanteCod);
  const estadio   = getEstadio(partido.estadioId);
  const badge     = getBadgeEstado(partido.estado);

  const isPorDef   = partido.estado === 'por_definir';
  const isFinished = partido.estado === 'finalizado';
  const isLive     = partido.estado === 'en_juego';

  // Centro del marcador en el hero
  let centroHero;
  if (isPorDef) {
    centroHero = `<div class="detail-vs">VS</div>`;
  } else if (isFinished || isLive) {
    centroHero = `<div class="detail-scoreboard">${partido.golesLocal} – ${partido.golesVisitante}</div>`;
  } else {
    centroHero = `
      <div class="detail-vs">VS</div>
      <div style="font-size:.82rem;color:rgba(255,255,255,.5);margin-top:4px">${partido.hora} hs</div>`;
  }

  // Equipos del hero
  let teamsHero;
  if (isPorDef) {
    teamsHero = `
      <div class="detail-teams">
        <div style="font-size:3rem;text-align:center;flex:1">🏆<br><small style="font-size:.75rem;color:rgba(255,255,255,.5)">Clasificado</small></div>
        <div class="detail-center">${centroHero}</div>
        <div style="font-size:3rem;text-align:center;flex:1">🏆<br><small style="font-size:.75rem;color:rgba(255,255,255,.5)">Clasificado</small></div>
      </div>`;
  } else {
    teamsHero = `
      <div class="detail-teams">
        <div class="detail-team">
          <div class="detail-team__flag">${local.bandera}</div>
          <div class="detail-team__name">${local.nombre}</div>
        </div>
        <div class="detail-center">${centroHero}</div>
        <div class="detail-team">
          <div class="detail-team__flag">${visitante.bandera}</div>
          <div class="detail-team__name">${visitante.nombre}</div>
        </div>
      </div>`;
  }

  const grupoStr = partido.grupo ? `Grupo ${partido.grupo} · ` : '';

  app.innerHTML = `
    <!-- HERO DEL PARTIDO -->
    <div class="detail-hero">
      <div class="container">
        <button class="back-btn" onclick="navigate('#/partidos')">← Volver a Partidos</button>

        <div class="detail-hero__badge-row">
          <span class="badge ${badge.cls}">${badge.label}</span>
          <span class="badge badge--grupo">${grupoStr}${partido.fase}</span>
          ${partido.jornada ? `<span class="badge badge--grupo">Jornada ${partido.jornada}</span>` : ''}
        </div>

        ${teamsHero}

        <div class="detail-hero__meta">
          <div class="detail-meta-item">📅 ${formatFecha(partido.fecha)}</div>
          <div class="detail-meta-item">🕐 ${partido.hora} hs</div>
          <div class="detail-meta-item">📍 ${estadio ? estadio.nombre : ''}</div>
          <div class="detail-meta-item">🏙 ${estadio ? estadio.ciudad + ', ' + estadio.pais : ''}</div>
        </div>
      </div>
    </div>

    <!-- CONTENIDO PRINCIPAL -->
    <div class="container">
      <div class="detail-layout">

        <!-- COLUMNA PRINCIPAL -->
        <div>
          ${isFinished ? `
            <div class="info-card" style="margin-bottom:24px;border-left:4px solid var(--c-accent)">
              <div style="font-family:var(--font-display);font-weight:700;color:var(--c-primary);font-size:1rem;margin-bottom:8px">
                ✅ Partido Finalizado
              </div>
              <p style="font-size:.9rem;color:var(--c-text-sec)">
                Este partido ya se disputó. El resultado final fue
                <strong>${local.nombre} ${partido.golesLocal} – ${partido.golesVisitante} ${visitante.nombre}</strong>.
              </p>
            </div>` : ''}

          ${isLive ? `
            <div class="info-card" style="margin-bottom:24px;border-left:4px solid var(--c-live)">
              <div style="font-family:var(--font-display);font-weight:700;color:var(--c-live);font-size:1rem;margin-bottom:8px;animation:blink 1s infinite">
                🔴 PARTIDO EN VIVO
              </div>
              <p style="font-size:.9rem;color:var(--c-text-sec)">
                El partido está en curso. Marcador actual:
                <strong>${local.nombre} ${partido.golesLocal} – ${partido.golesVisitante} ${visitante.nombre}</strong>.
              </p>
            </div>` : ''}

          <!-- INFO DEL ESTADIO EN DETALLE -->
          ${estadio ? `
            <div class="info-card" style="margin-bottom:24px;cursor:pointer"
              onclick="navigate('#/estadio/${estadio.id}')">
              <div class="info-card__title">🏟️ Estadio</div>
              <div style="display:flex;align-items:flex-start;gap:16px;flex-wrap:wrap">
                <div style="font-size:3rem">${estadio.imagen_emoji}</div>
                <div style="flex:1">
                  <div style="font-family:var(--font-display);font-size:1.1rem;font-weight:600;color:var(--c-primary)">${estadio.nombre}</div>
                  <div style="font-size:.85rem;color:var(--c-text-sec);margin-top:4px">📍 ${estadio.ciudad}, ${estadio.pais} ${estadio.banderaPais}</div>
                  <div style="display:flex;gap:16px;margin-top:12px;flex-wrap:wrap">
                    <div class="stadium-stat">
                      <div class="stadium-stat__value">${formatNum(estadio.capacidad)}</div>
                      <div class="stadium-stat__label">Capacidad</div>
                    </div>
                    <div class="stadium-stat">
                      <div class="stadium-stat__value">${estadio.inaugurado}</div>
                      <div class="stadium-stat__label">Inaugurado</div>
                    </div>
                    <div class="stadium-stat">
                      <div class="stadium-stat__value">${estadio.superficie}</div>
                      <div class="stadium-stat__label">Superficie</div>
                    </div>
                  </div>
                  <p style="font-size:.82rem;color:var(--c-text-sec);margin-top:10px;line-height:1.5">${estadio.descripcion.substring(0, 140)}…</p>
                  <div style="font-size:.8rem;color:var(--c-primary);margin-top:8px;font-weight:500">Ver más sobre el estadio →</div>
                </div>
              </div>
            </div>` : ''}
        </div>

        <!-- SIDEBAR: COMPRA DE ENTRADAS -->
        <div class="detail-sidebar">
          <div class="ticket-section">
            <div class="ticket-section__title">🎟️ Comprar Entradas</div>

            ${isFinished ? `
              <div style="text-align:center;padding:24px;color:var(--c-text-muted)">
                <div style="font-size:2rem;margin-bottom:8px">⛔</div>
                <p style="font-size:.9rem">La venta de entradas para este partido ya ha cerrado.</p>
              </div>` : `
              <!-- CATEGORÍAS -->
              <div class="ticket-categories" id="ticket-cats"></div>

              <!-- CANTIDAD -->
              <div class="ticket-qty-row">
                <label>Cantidad de entradas</label>
                <div class="qty-control">
                  <button id="qty-menos" onclick="cambiarCantidad(-1)">−</button>
                  <span id="qty-value">1</span>
                  <button id="qty-mas" onclick="cambiarCantidad(1)">+</button>
                </div>
              </div>

              <!-- TOTAL -->
              <div class="ticket-total">
                <div>
                  <div class="ticket-total__label">Total a pagar</div>
                  <div style="font-size:.75rem;color:rgba(255,255,255,.5);margin-top:2px">USD · Precio final</div>
                </div>
                <div class="ticket-total__amount" id="ticket-total">USD 0</div>
              </div>

              <button class="btn btn--primary btn--full btn--lg" id="btn-comprar" onclick="procesarCompra('${partido.id}')">
                🎟️ Comprar Ahora
              </button>

              <p style="font-size:.72rem;color:var(--c-text-muted);text-align:center;margin-top:12px">
                ✓ Pago seguro · ✓ Entradas digitales · ✓ Transferible
              </p>`}
          </div>
        </div>
      </div>
    </div>`;

  // Inicializar selector de entradas si el partido no finalizó
  if (!isFinished) {
    state.selectedTicket.partidoId = partido.id;
    state.selectedTicket.cantidad  = 1;
    state.selectedTicket.categoria = 'general';
    inicializarSelectorEntradas(partido);
  }
}

/** Crea las opciones de categoría de entradas */
function inicializarSelectorEntradas(partido) {
  const container = document.getElementById('ticket-cats');
  if (!container) return;

  const categorias = [
    { id: 'general',      nombre: 'General',      desc: 'Acceso a todas las zonas generales' },
    { id: 'preferencial', nombre: 'Preferencial',  desc: 'Ubicación preferencial, mejor visibilidad' },
    { id: 'vip',          nombre: 'VIP',           desc: 'Acceso VIP con servicios premium' }
  ];

  container.innerHTML = '';

  categorias.forEach((cat, idx) => {
    const precio     = partido.entradas[cat.id].precio;
    const disponibles = state.inventario[partido.id][cat.id];
    const agotado    = disponibles === 0;

    const div = document.createElement('label');
    div.className = `ticket-cat${idx === 0 && !agotado ? ' is-selected' : ''}${agotado ? ' is-agotado' : ''}`;

    div.innerHTML = `
      <input type="radio" name="ticket-cat" value="${cat.id}"
        ${idx === 0 && !agotado ? 'checked' : ''}
        ${agotado ? 'disabled' : ''}>
      <div class="ticket-cat__info">
        <div class="ticket-cat__name">${cat.nombre}</div>
        <div class="ticket-cat__avail ${disponibles < 100 && !agotado ? 'low' : ''}">
          ${agotado ? 'AGOTADO' : `${formatNum(disponibles)} disponibles`}
        </div>
      </div>
      <div class="ticket-cat__price">USD ${precio}</div>
      ${agotado ? '<span class="ticket-cat__agotado-tag">AGOTADO</span>' : ''}`;

    if (!agotado) {
      div.querySelector('input').addEventListener('change', e => {
        document.querySelectorAll('.ticket-cat').forEach(el => el.classList.remove('is-selected'));
        div.classList.add('is-selected');
        state.selectedTicket.categoria = e.target.value;
        state.selectedTicket.cantidad  = 1;
        document.getElementById('qty-value').textContent = '1';
        actualizarTotal(partido);
      });
    }

    container.appendChild(div);
  });

  // Si la categoría por defecto está agotada, seleccionar la primera disponible
  const primeraDisp = categorias.find(c => state.inventario[partido.id][c.id] > 0);
  if (primeraDisp) {
    state.selectedTicket.categoria = primeraDisp.id;
    const radios = document.querySelectorAll('input[name="ticket-cat"]');
    radios.forEach(r => {
      if (r.value === primeraDisp.id) {
        r.checked = true;
        r.closest('.ticket-cat').classList.add('is-selected');
      }
    });
  }

  actualizarTotal(partido);
}

/** Cambia la cantidad de entradas (+/-) */
function cambiarCantidad(delta) {
  const partido = DATA.partidos.find(p => p.id === state.selectedTicket.partidoId);
  if (!partido) return;

  const maxDisp = state.inventario[partido.id][state.selectedTicket.categoria];
  const actual  = state.selectedTicket.cantidad;
  const nueva   = Math.max(1, Math.min(maxDisp, actual + delta));

  state.selectedTicket.cantidad = nueva;
  document.getElementById('qty-value').textContent = nueva;

  document.getElementById('qty-menos').disabled = nueva <= 1;
  document.getElementById('qty-mas').disabled   = nueva >= Math.min(maxDisp, 10);

  actualizarTotal(partido);
}

/** Actualiza el total mostrado */
function actualizarTotal(partido) {
  const precio   = partido.entradas[state.selectedTicket.categoria].precio;
  const cantidad = state.selectedTicket.cantidad;
  const total    = precio * cantidad;

  const totalEl = document.getElementById('ticket-total');
  if (totalEl) totalEl.textContent = `USD ${formatNum(total)}`;

  const menos = document.getElementById('qty-menos');
  const mas   = document.getElementById('qty-mas');
  if (menos) menos.disabled = cantidad <= 1;
  if (mas)   mas.disabled   = cantidad >= Math.min(10, state.inventario[partido.id][state.selectedTicket.categoria]);
}

/** Procesa la compra de entradas */
function procesarCompra(partidoId) {
  const partido   = DATA.partidos.find(p => p.id === partidoId);
  if (!partido) return;

  const { categoria, cantidad } = state.selectedTicket;
  const disponibles = state.inventario[partidoId][categoria];
  const precio      = partido.entradas[categoria].precio;
  const total       = precio * cantidad;

  if (cantidad > disponibles) {
    mostrarToast(`Solo quedan ${disponibles} entradas disponibles en esa categoría.`, 'error');
    return;
  }
  if (cantidad < 1) {
    mostrarToast('Seleccioná al menos 1 entrada.', 'error');
    return;
  }

  // Simular actualización de inventario
  state.inventario[partidoId][categoria] -= cantidad;

  const codigo = generarCodigo();
  const local  = getEquipo(partido.localCod);
  const visit  = getEquipo(partido.visitanteCod);

  // Mostrar modal de éxito
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal__icon">🎉</div>
      <div class="modal__title">¡Compra Exitosa!</div>
      <div class="modal__desc">
        Tu compra de <strong>${cantidad} entrada${cantidad !== 1 ? 's' : ''} (${categoria.charAt(0).toUpperCase() + categoria.slice(1)})</strong>
        para <strong>${partido.estado === 'por_definir' ? partido.fase : local.nombre + ' vs ' + visit.nombre}</strong>
        fue procesada correctamente.<br><br>
        Total cobrado: <strong>USD ${formatNum(total)}</strong>
      </div>
      <div class="modal__code">${codigo}</div>
      <p style="font-size:.78rem;color:var(--c-text-muted);margin-bottom:20px">
        Guardá este código de reserva. Te llegará también por email.
      </p>
      <button class="btn btn--primary btn--full btn--lg" onclick="this.closest('.modal-overlay').remove()">
        ✓ Entendido
      </button>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  // Actualizar la UI de entradas
  inicializarSelectorEntradas(partido);
}

// ============================================================
// VISTA: LISTADO DE ESTADIOS
// ============================================================
function renderEstadios() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="section__header">
          <div>
            <h1 class="section__title">Estadios</h1>
            <p class="section__subtitle">${DATA.estadios.length} sedes en EE.UU., México y Canadá</p>
          </div>
        </div>
        <div class="stadiums-grid" id="stadiums-grid"></div>
      </div>
    </section>`;

  const grid = document.getElementById('stadiums-grid');
  DATA.estadios.forEach(estadio => {
    grid.appendChild(crearStadiumCard(estadio));
  });
}

/** Crea una tarjeta de estadio */
function crearStadiumCard(estadio) {
  const partidosEstadio = DATA.partidos.filter(p => p.estadioId === estadio.id).length;

  const card = document.createElement('article');
  card.className = 'stadium-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');

  card.innerHTML = `
    <div class="stadium-card__visual">
      <span class="stadium-card__emoji">${estadio.imagen_emoji}</span>
      <span class="stadium-card__country-flag">${estadio.banderaPais}</span>
    </div>
    <div class="stadium-card__body">
      <div class="stadium-card__name">${estadio.nombre}</div>
      <div class="stadium-card__city">📍 ${estadio.ciudad}, ${estadio.pais}</div>
      <div class="stadium-card__stats">
        <div class="stadium-stat">
          <div class="stadium-stat__value">${formatNum(estadio.capacidad)}</div>
          <div class="stadium-stat__label">Capacidad</div>
        </div>
        <div class="stadium-stat">
          <div class="stadium-stat__value">${estadio.inaugurado}</div>
          <div class="stadium-stat__label">Inaugurado</div>
        </div>
        <div class="stadium-stat">
          <div class="stadium-stat__value">${partidosEstadio}</div>
          <div class="stadium-stat__label">Partidos</div>
        </div>
      </div>
    </div>
    <div class="stadium-card__footer">
      <button class="btn btn--outline btn--sm">Ver detalles →</button>
    </div>`;

  const goDetail = () => navigate(`#/estadio/${estadio.id}`);
  card.addEventListener('click', goDetail);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') goDetail(); });

  return card;
}

// ============================================================
// VISTA: DETALLE DE ESTADIO
// ============================================================
function renderDetalleEstadio(id) {
  const app     = document.getElementById('app');
  const estadio = DATA.estadios.find(e => e.id === id);

  if (!estadio) { renderNoEncontrado(); return; }

  const partidos = DATA.partidos.filter(p => p.estadioId === id);

  app.innerHTML = `
    <!-- HERO ESTADIO -->
    <div class="stadium-detail__header">
      <div class="container">
        <button class="back-btn" onclick="navigate('#/estadios')">← Volver a Estadios</button>
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          <div style="font-size:5rem">${estadio.imagen_emoji}</div>
          <div>
            <div style="font-size:.8rem;color:rgba(255,255,255,.5);margin-bottom:8px;text-transform:uppercase;letter-spacing:.06em">
              ${estadio.banderaPais} ${estadio.pais}
            </div>
            <h1 style="font-family:var(--font-display);font-size:clamp(1.5rem,4vw,2.5rem);font-weight:700;line-height:1.1;margin-bottom:8px">
              ${estadio.nombre}
            </h1>
            <div style="font-size:.9rem;color:rgba(255,255,255,.6)">📍 ${estadio.ciudad}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="stadium-detail__grid">

        <!-- INFO PRINCIPAL -->
        <div>
          <div class="info-card" style="margin-bottom:20px">
            <div class="info-card__title">📋 Información General</div>
            <table class="info-table">
              <tr><td>Nombre</td><td>${estadio.nombre}</td></tr>
              <tr><td>Ciudad</td><td>${estadio.ciudad}, ${estadio.pais} ${estadio.banderaPais}</td></tr>
              <tr><td>Capacidad</td><td>${formatNum(estadio.capacidad)} espectadores</td></tr>
              <tr><td>Superficie</td><td>${estadio.superficie}</td></tr>
              <tr><td>Inaugurado</td><td>${estadio.inaugurado}</td></tr>
              <tr><td>Partidos 2026</td><td>${partidos.length} partido${partidos.length !== 1 ? 's' : ''}</td></tr>
            </table>
          </div>

          <div class="info-card" style="margin-bottom:20px">
            <div class="info-card__title">ℹ️ Sobre el Estadio</div>
            <p style="font-size:.9rem;color:var(--c-text-sec);line-height:1.7;margin-bottom:12px">${estadio.descripcion}</p>
            <p style="font-size:.85rem;color:var(--c-text-muted);line-height:1.6;border-left:3px solid var(--c-accent);padding-left:12px;font-style:italic">${estadio.datos}</p>
          </div>
        </div>

        <!-- PARTIDOS EN ESTE ESTADIO -->
        <div>
          <div class="info-card">
            <div class="info-card__title">⚽ Partidos en este Estadio</div>
            ${partidos.length === 0
              ? `<p style="font-size:.88rem;color:var(--c-text-muted)">No hay partidos asignados aún.</p>`
              : `<div style="display:flex;flex-direction:column;gap:10px">
                  ${partidos.map(p => {
                    const local     = getEquipo(p.localCod);
                    const visitante = getEquipo(p.visitanteCod);
                    const badge     = getBadgeEstado(p.estado);
                    return `
                      <div style="border:1.5px solid var(--c-border);border-radius:var(--r-md);padding:12px;cursor:pointer;transition:all .2s"
                        onclick="navigate('#/partido/${p.id}')"
                        onmouseenter="this.style.borderColor='var(--c-primary)';this.style.background='var(--c-surface-2)'"
                        onmouseleave="this.style.borderColor='var(--c-border)';this.style.background=''">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                          <span style="font-size:.72rem;font-weight:600;color:var(--c-text-muted);text-transform:uppercase">
                            ${p.grupo ? `Grupo ${p.grupo} · ` : ''}${p.fase}
                          </span>
                          <span class="badge ${badge.cls}" style="font-size:.65rem">${badge.label}</span>
                        </div>
                        <div style="font-weight:600;font-size:.88rem;color:var(--c-text)">
                          ${p.estado === 'por_definir'
                            ? '🏆 Clasificados por determinar'
                            : `${local.bandera} ${local.nombre} vs ${visitante.nombre} ${visitante.bandera}`}
                        </div>
                        <div style="font-size:.78rem;color:var(--c-text-muted);margin-top:4px">
                          📅 ${formatFecha(p.fecha)} · ${p.hora} hs
                        </div>
                      </div>`;
                  }).join('')}
                </div>`}
          </div>
        </div>
      </div>
    </div>`;
}

// ============================================================
// VISTA: 404
// ============================================================
function renderNoEncontrado() {
  document.getElementById('app').innerHTML = `
    <div class="empty-state" style="padding:100px 20px">
      <div class="empty-state__icon">😕</div>
      <div class="empty-state__title">Página no encontrada</div>
      <div class="empty-state__desc">La página que buscás no existe.</div>
      <br>
      <button class="btn btn--primary" onclick="navigate('#/')">Ir al Inicio</button>
    </div>`;
}

// ============================================================
// SISTEMA DE TOASTS (notificaciones)
// ============================================================
function mostrarToast(mensaje, tipo = 'info') {
  const container = document.getElementById('toastContainer');
  const toast     = document.createElement('div');
  toast.className = `toast toast--${tipo}`;
  toast.innerHTML = `
    <span style="font-size:1.2rem">${tipo === 'success' ? '✅' : tipo === 'error' ? '❌' : 'ℹ️'}</span>
    <span>${mensaje}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('is-leaving');
    toast.addEventListener('animationend', () => toast.remove());
  }, 4000);
}

// ============================================================
// NAVBAR MÓVIL
// ============================================================
function cerrarMenu() {
  const menu   = document.getElementById('navMenu');
  const toggle = document.getElementById('navToggle');
  if (menu)   menu.classList.remove('is-open');
  if (toggle) toggle.classList.remove('is-open');
}

// ============================================================
// INICIALIZACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger toggle
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open');
    });
  }

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', e => {
    if (!e.target.closest('.navbar__inner')) cerrarMenu();
  });

  // Iniciar router
  window.addEventListener('hashchange', router);
  router();
});
