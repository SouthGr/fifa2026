// ============================================================
// FIFA WORLD CUP 2026 — DATOS DEL SISTEMA
// ============================================================

const DATA = {

  // ---- EQUIPOS ----
  equipos: {
    'ARG': { nombre: 'Argentina',      bandera: '🇦🇷' },
    'BRA': { nombre: 'Brasil',         bandera: '🇧🇷' },
    'FRA': { nombre: 'Francia',        bandera: '🇫🇷' },
    'ESP': { nombre: 'España',         bandera: '🇪🇸' },
    'GER': { nombre: 'Alemania',       bandera: '🇩🇪' },
    'ENG': { nombre: 'Inglaterra',     bandera: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    'POR': { nombre: 'Portugal',       bandera: '🇵🇹' },
    'MEX': { nombre: 'México',         bandera: '🇲🇽' },
    'USA': { nombre: 'Estados Unidos', bandera: '🇺🇸' },
    'CAN': { nombre: 'Canadá',         bandera: '🇨🇦' },
    'COL': { nombre: 'Colombia',       bandera: '🇨🇴' },
    'URU': { nombre: 'Uruguay',        bandera: '🇺🇾' },
    'JAP': { nombre: 'Japón',          bandera: '🇯🇵' },
    'MAR': { nombre: 'Marruecos',      bandera: '🇲🇦' },
    'SEN': { nombre: 'Senegal',        bandera: '🇸🇳' },
    'POL': { nombre: 'Polonia',        bandera: '🇵🇱' },
    'NED': { nombre: 'Países Bajos',   bandera: '🇳🇱' },
    'AUS': { nombre: 'Australia',      bandera: '🇦🇺' },
    'KOR': { nombre: 'Corea del Sur',  bandera: '🇰🇷' },
    'ECU': { nombre: 'Ecuador',        bandera: '🇪🇨' },
    'TUN': { nombre: 'Túnez',          bandera: '🇹🇳' },
    'PER': { nombre: 'Perú',           bandera: '🇵🇪' },
    'ALG': { nombre: 'Argelia',        bandera: '🇩🇿' },
    'NZL': { nombre: 'Nueva Zelanda',  bandera: '🇳🇿' },
    'CAM': { nombre: 'Camerún',        bandera: '🇨🇲' },
    'SAU': { nombre: 'Arabia Saudita', bandera: '🇸🇦' },
    'CRO': { nombre: 'Croacia',        bandera: '🇭🇷' },
    'BEL': { nombre: 'Bélgica',        bandera: '🇧🇪' },
    'GHA': { nombre: 'Ghana',          bandera: '🇬🇭' },
    'SUI': { nombre: 'Suiza',          bandera: '🇨🇭' },
    'DIN': { nombre: 'Dinamarca',      bandera: '🇩🇰' },
    'SER': { nombre: 'Serbia',         bandera: '🇷🇸' },
  },

  // ---- ESTADIOS ----
  estadios: [
    {
      id: 'EST001',
      nombre: 'Estadio Azteca',
      ciudad: 'Ciudad de México',
      pais: 'México',
      banderaPais: '🇲🇽',
      capacidad: 87523,
      superficie: 'Césped natural',
      inaugurado: 1966,
      descripcion: 'El estadio más icónico del fútbol latinoamericano y el primero en albergar dos finales mundialistas (1970 y 1986). En 2026 fue la sede del partido inaugural del torneo.',
      datos: 'Ha sido escenario de la "Mano de Dios" de Maradona (1986) y del "Gol del Siglo".',
      imagen_emoji: '🏟️'
    },
    {
      id: 'EST002',
      nombre: 'MetLife Stadium',
      ciudad: 'East Rutherford, Nueva Jersey',
      pais: 'Estados Unidos',
      banderaPais: '🇺🇸',
      capacidad: 82500,
      superficie: 'Césped sintético',
      inaugurado: 2010,
      descripcion: 'El estadio más grande de la Costa Este norteamericana y sede de la Gran Final del Mundial 2026. Hogar de los New York Giants y Jets de la NFL.',
      datos: 'Tendrá una de las pantallas de video más grandes jamás instaladas en un estadio de fútbol.',
      imagen_emoji: '🏟️'
    },
    {
      id: 'EST003',
      nombre: 'Rose Bowl Stadium',
      ciudad: 'Pasadena, California',
      pais: 'Estados Unidos',
      banderaPais: '🇺🇸',
      capacidad: 92542,
      superficie: 'Césped natural',
      inaugurado: 1922,
      descripcion: 'Uno de los estadios más históricos de los Estados Unidos. Fue sede de la final del Mundial 1994 (Brasil vs Italia). Su capacidad lo convierte en el más grande del Mundial 2026.',
      datos: 'La final de 1994 terminó 0-0 y Brasil ganó 3-2 en penales. Fue la primera final sin goles en tiempo regular.',
      imagen_emoji: '🏟️'
    },
    {
      id: 'EST004',
      nombre: 'AT&T Stadium',
      ciudad: 'Arlington, Texas',
      pais: 'Estados Unidos',
      banderaPais: '🇺🇸',
      capacidad: 80000,
      superficie: 'Césped sintético',
      inaugurado: 2009,
      descripcion: 'Conocido como "Jerry World", es uno de los estadios más modernos del planeta. Cuenta con la pantalla de video más grande suspendida de un estadio de fútbol americano.',
      datos: 'Construido con una inversión de 1,3 mil millones de dólares. Es un ícono del entretenimiento deportivo.',
      imagen_emoji: '🏟️'
    },
    {
      id: 'EST005',
      nombre: 'SoFi Stadium',
      ciudad: 'Inglewood, California',
      pais: 'Estados Unidos',
      banderaPais: '🇺🇸',
      capacidad: 70240,
      superficie: 'Césped natural',
      inaugurado: 2020,
      descripcion: 'El estadio más costoso jamás construido (5.500 millones de dólares), con una cubierta translúcida icónica y tecnología de última generación. Hogar de los Rams y Chargers de la NFL.',
      datos: 'Fue sede del Super Bowl LVI (2022). Su techo único permite ver el cielo mientras protege del sol.',
      imagen_emoji: '🏟️'
    },
    {
      id: 'EST006',
      nombre: 'Estadio BBVA',
      ciudad: 'Monterrey, Nuevo León',
      pais: 'México',
      banderaPais: '🇲🇽',
      capacidad: 51349,
      superficie: 'Césped natural',
      inaugurado: 2015,
      descripcion: 'Uno de los estadios más modernos de América Latina, ubicado en las faldas del majestuoso Cerro de la Silla. Es reconocido por su atmósfera única y arquitectura vanguardista.',
      datos: 'Sede habitual del club Rayados de Monterrey y frecuente escenario de partidos internacionales en CONCACAF.',
      imagen_emoji: '🏟️'
    },
    {
      id: 'EST007',
      nombre: 'BC Place',
      ciudad: 'Vancouver',
      pais: 'Canadá',
      banderaPais: '🇨🇦',
      capacidad: 54500,
      superficie: 'Césped sintético',
      inaugurado: 1983,
      descripcion: 'El estadio más grande de la Columbia Británica y el único estadio techado del Mundial 2026. Su techo de aire comprimido es la estructura de su tipo más grande del mundo.',
      datos: 'Fue sede de la Final de la Copa del Mundo Femenina 2015. Ofrece vistas privilegiadas de las montañas nevadas de Vancouver.',
      imagen_emoji: '🏟️'
    },
    {
      id: 'EST008',
      nombre: 'Stade Olympique',
      ciudad: 'Montreal',
      pais: 'Canadá',
      banderaPais: '🇨🇦',
      capacidad: 61000,
      superficie: 'Césped sintético',
      inaugurado: 1976,
      descripcion: 'Construido para los Juegos Olímpicos de Montreal 1976, es un ícono arquitectónico mundial con su característica torre inclinada, la más alta del mundo en su tipo.',
      datos: 'Su diseño futurista del arquitecto Roger Taillibert es único en el mundo. La torre mide 175 metros de altura.',
      imagen_emoji: '🏟️'
    }
  ],

  // ---- PARTIDOS ----
  partidos: [
    // === GRUPO A: México · Alemania · Nueva Zelanda · Argelia ===
    {
      id: 'M001', fase: 'Fase de Grupos', grupo: 'A', jornada: 1,
      fecha: '2026-06-11', hora: '18:00',
      localCod: 'MEX', visitanteCod: 'GER', estadioId: 'EST001',
      estado: 'finalizado', golesLocal: 2, golesVisitante: 1,
      entradas: {
        general:     { precio: 160, disponibles: 0,    total: 60000 },
        preferencial:{ precio: 380, disponibles: 0,    total: 18000 },
        vip:         { precio: 950, disponibles: 0,    total: 1000  }
      }
    },
    {
      id: 'M002', fase: 'Fase de Grupos', grupo: 'A', jornada: 1,
      fecha: '2026-06-11', hora: '12:00',
      localCod: 'NZL', visitanteCod: 'ALG', estadioId: 'EST004',
      estado: 'finalizado', golesLocal: 0, golesVisitante: 0,
      entradas: {
        general:     { precio: 120, disponibles: 0,    total: 68000 },
        preferencial:{ precio: 280, disponibles: 0,    total: 9000  },
        vip:         { precio: 750, disponibles: 0,    total: 800   }
      }
    },
    {
      id: 'M003', fase: 'Fase de Grupos', grupo: 'A', jornada: 2,
      fecha: '2026-06-15', hora: '12:00',
      localCod: 'MEX', visitanteCod: 'NZL', estadioId: 'EST006',
      estado: 'finalizado', golesLocal: 1, golesVisitante: 0,
      entradas: {
        general:     { precio: 130, disponibles: 0,    total: 42000 },
        preferencial:{ precio: 300, disponibles: 0,    total: 7000  },
        vip:         { precio: 800, disponibles: 0,    total: 600   }
      }
    },
    {
      id: 'M004', fase: 'Fase de Grupos', grupo: 'A', jornada: 2,
      fecha: '2026-06-15', hora: '21:00',
      localCod: 'GER', visitanteCod: 'ALG', estadioId: 'EST001',
      estado: 'finalizado', golesLocal: 3, golesVisitante: 1,
      entradas: {
        general:     { precio: 160, disponibles: 0,    total: 60000 },
        preferencial:{ precio: 380, disponibles: 0,    total: 18000 },
        vip:         { precio: 950, disponibles: 0,    total: 1000  }
      }
    },
    {
      id: 'M005', fase: 'Fase de Grupos', grupo: 'A', jornada: 3,
      fecha: '2026-06-19', hora: '18:00',
      localCod: 'ALG', visitanteCod: 'MEX', estadioId: 'EST004',
      estado: 'programado', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 120, disponibles: 4200,  total: 68000 },
        preferencial:{ precio: 280, disponibles: 380,   total: 9000  },
        vip:         { precio: 750, disponibles: 20,    total: 800   }
      }
    },
    {
      id: 'M006', fase: 'Fase de Grupos', grupo: 'A', jornada: 3,
      fecha: '2026-06-19', hora: '18:00',
      localCod: 'GER', visitanteCod: 'NZL', estadioId: 'EST006',
      estado: 'programado', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 130, disponibles: 28000, total: 42000 },
        preferencial:{ precio: 300, disponibles: 4500,  total: 7000  },
        vip:         { precio: 800, disponibles: 320,   total: 600   }
      }
    },

    // === GRUPO B: Argentina · Polonia · Senegal · Perú ===
    {
      id: 'M007', fase: 'Fase de Grupos', grupo: 'B', jornada: 1,
      fecha: '2026-06-12', hora: '15:00',
      localCod: 'ARG', visitanteCod: 'POL', estadioId: 'EST002',
      estado: 'finalizado', golesLocal: 3, golesVisitante: 0,
      entradas: {
        general:     { precio: 200, disponibles: 0,    total: 75000 },
        preferencial:{ precio: 500, disponibles: 0,    total: 9000  },
        vip:         { precio: 1200, disponibles: 0,   total: 800   }
      }
    },
    {
      id: 'M008', fase: 'Fase de Grupos', grupo: 'B', jornada: 1,
      fecha: '2026-06-12', hora: '21:00',
      localCod: 'SEN', visitanteCod: 'PER', estadioId: 'EST003',
      estado: 'finalizado', golesLocal: 1, golesVisitante: 1,
      entradas: {
        general:     { precio: 180, disponibles: 0,    total: 80000 },
        preferencial:{ precio: 420, disponibles: 0,    total: 9000  },
        vip:         { precio: 1000, disponibles: 0,   total: 900   }
      }
    },
    {
      id: 'M009', fase: 'Fase de Grupos', grupo: 'B', jornada: 2,
      fecha: '2026-06-16', hora: '21:00',
      localCod: 'ARG', visitanteCod: 'SEN', estadioId: 'EST002',
      estado: 'finalizado', golesLocal: 2, golesVisitante: 0,
      entradas: {
        general:     { precio: 200, disponibles: 0,    total: 75000 },
        preferencial:{ precio: 500, disponibles: 0,    total: 9000  },
        vip:         { precio: 1200, disponibles: 0,   total: 800   }
      }
    },
    {
      id: 'M010', fase: 'Fase de Grupos', grupo: 'B', jornada: 2,
      fecha: '2026-06-16', hora: '15:00',
      localCod: 'POL', visitanteCod: 'PER', estadioId: 'EST003',
      estado: 'finalizado', golesLocal: 1, golesVisitante: 1,
      entradas: {
        general:     { precio: 180, disponibles: 0,    total: 80000 },
        preferencial:{ precio: 420, disponibles: 0,    total: 9000  },
        vip:         { precio: 1000, disponibles: 0,   total: 900   }
      }
    },
    {
      id: 'M011', fase: 'Fase de Grupos', grupo: 'B', jornada: 3,
      fecha: '2026-06-20', hora: '18:00',
      localCod: 'ARG', visitanteCod: 'PER', estadioId: 'EST003',
      estado: 'programado', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 200, disponibles: 1200,  total: 80000 },
        preferencial:{ precio: 500, disponibles: 80,    total: 9000  },
        vip:         { precio: 1200, disponibles: 5,    total: 900   }
      }
    },

    // === GRUPO C: Francia · Marruecos · Japón · Ecuador ===
    {
      id: 'M012', fase: 'Fase de Grupos', grupo: 'C', jornada: 1,
      fecha: '2026-06-13', hora: '15:00',
      localCod: 'FRA', visitanteCod: 'MAR', estadioId: 'EST005',
      estado: 'finalizado', golesLocal: 2, golesVisitante: 0,
      entradas: {
        general:     { precio: 190, disponibles: 0,    total: 62000 },
        preferencial:{ precio: 450, disponibles: 0,    total: 8000  },
        vip:         { precio: 1100, disponibles: 0,   total: 700   }
      }
    },
    {
      id: 'M013', fase: 'Fase de Grupos', grupo: 'C', jornada: 1,
      fecha: '2026-06-13', hora: '21:00',
      localCod: 'JAP', visitanteCod: 'ECU', estadioId: 'EST005',
      estado: 'finalizado', golesLocal: 1, golesVisitante: 2,
      entradas: {
        general:     { precio: 190, disponibles: 0,    total: 62000 },
        preferencial:{ precio: 450, disponibles: 0,    total: 8000  },
        vip:         { precio: 1100, disponibles: 0,   total: 700   }
      }
    },
    {
      id: 'M014', fase: 'Fase de Grupos', grupo: 'C', jornada: 2,
      fecha: '2026-06-17', hora: '15:00',
      localCod: 'FRA', visitanteCod: 'JAP', estadioId: 'EST007',
      estado: 'en_juego', golesLocal: 1, golesVisitante: 0,
      entradas: {
        general:     { precio: 190, disponibles: 0,    total: 52000 },
        preferencial:{ precio: 450, disponibles: 0,    total: 7000  },
        vip:         { precio: 1100, disponibles: 0,   total: 600   }
      }
    },
    {
      id: 'M015', fase: 'Fase de Grupos', grupo: 'C', jornada: 2,
      fecha: '2026-06-17', hora: '18:00',
      localCod: 'MAR', visitanteCod: 'ECU', estadioId: 'EST008',
      estado: 'programado', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 150, disponibles: 25000, total: 58000 },
        preferencial:{ precio: 350, disponibles: 3200,  total: 7000  },
        vip:         { precio: 900, disponibles: 280,   total: 600   }
      }
    },

    // === GRUPO D: Brasil · Inglaterra · Portugal · Túnez ===
    {
      id: 'M016', fase: 'Fase de Grupos', grupo: 'D', jornada: 1,
      fecha: '2026-06-14', hora: '18:00',
      localCod: 'BRA', visitanteCod: 'ENG', estadioId: 'EST003',
      estado: 'finalizado', golesLocal: 1, golesVisitante: 1,
      entradas: {
        general:     { precio: 220, disponibles: 0,    total: 85000 },
        preferencial:{ precio: 550, disponibles: 0,    total: 9000  },
        vip:         { precio: 1350, disponibles: 0,   total: 900   }
      }
    },
    {
      id: 'M017', fase: 'Fase de Grupos', grupo: 'D', jornada: 1,
      fecha: '2026-06-14', hora: '21:00',
      localCod: 'POR', visitanteCod: 'TUN', estadioId: 'EST002',
      estado: 'finalizado', golesLocal: 4, golesVisitante: 0,
      entradas: {
        general:     { precio: 200, disponibles: 0,    total: 75000 },
        preferencial:{ precio: 500, disponibles: 0,    total: 9000  },
        vip:         { precio: 1200, disponibles: 0,   total: 800   }
      }
    },
    {
      id: 'M018', fase: 'Fase de Grupos', grupo: 'D', jornada: 2,
      fecha: '2026-06-18', hora: '18:00',
      localCod: 'BRA', visitanteCod: 'TUN', estadioId: 'EST001',
      estado: 'programado', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 180, disponibles: 12000, total: 80000 },
        preferencial:{ precio: 450, disponibles: 900,   total: 14000 },
        vip:         { precio: 1100, disponibles: 50,   total: 1000  }
      }
    },
    {
      id: 'M019', fase: 'Fase de Grupos', grupo: 'D', jornada: 2,
      fecha: '2026-06-18', hora: '21:00',
      localCod: 'ENG', visitanteCod: 'POR', estadioId: 'EST002',
      estado: 'programado', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 220, disponibles: 2500,  total: 75000 },
        preferencial:{ precio: 550, disponibles: 150,   total: 9000  },
        vip:         { precio: 1350, disponibles: 8,    total: 800   }
      }
    },

    // === GRUPO E: España · Países Bajos · Camerún · Arabia Saudita ===
    {
      id: 'M020', fase: 'Fase de Grupos', grupo: 'E', jornada: 1,
      fecha: '2026-06-17', hora: '12:00',
      localCod: 'ESP', visitanteCod: 'NED', estadioId: 'EST007',
      estado: 'programado', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 170, disponibles: 9000,  total: 52000 },
        preferencial:{ precio: 400, disponibles: 800,   total: 7000  },
        vip:         { precio: 990, disponibles: 60,    total: 600   }
      }
    },
    {
      id: 'M021', fase: 'Fase de Grupos', grupo: 'E', jornada: 1,
      fecha: '2026-06-17', hora: '21:00',
      localCod: 'CAM', visitanteCod: 'SAU', estadioId: 'EST008',
      estado: 'programado', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 150, disponibles: 38000, total: 58000 },
        preferencial:{ precio: 350, disponibles: 5500,  total: 7000  },
        vip:         { precio: 900, disponibles: 490,   total: 600   }
      }
    },

    // === GRUPO F: Uruguay · Colombia · Australia · Corea del Sur ===
    {
      id: 'M022', fase: 'Fase de Grupos', grupo: 'F', jornada: 1,
      fecha: '2026-06-18', hora: '12:00',
      localCod: 'URU', visitanteCod: 'COL', estadioId: 'EST004',
      estado: 'programado', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 170, disponibles: 48000, total: 75000 },
        preferencial:{ precio: 400, disponibles: 6500,  total: 9000  },
        vip:         { precio: 1000, disponibles: 560,  total: 800   }
      }
    },
    {
      id: 'M023', fase: 'Fase de Grupos', grupo: 'F', jornada: 1,
      fecha: '2026-06-18', hora: '15:00',
      localCod: 'AUS', visitanteCod: 'KOR', estadioId: 'EST003',
      estado: 'programado', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 180, disponibles: 60000, total: 85000 },
        preferencial:{ precio: 420, disponibles: 7000,  total: 9000  },
        vip:         { precio: 1050, disponibles: 700,  total: 900   }
      }
    },

    // === CUARTOS DE FINAL ===
    {
      id: 'M024', fase: 'Cuartos de Final', grupo: null, jornada: null,
      fecha: '2026-07-10', hora: '18:00',
      localCod: null, visitanteCod: null, estadioId: 'EST001',
      estado: 'por_definir', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 350, disponibles: 70000, total: 82000 },
        preferencial:{ precio: 800, disponibles: 8500,  total: 10000 },
        vip:         { precio: 2000, disponibles: 750,  total: 1000  }
      }
    },
    {
      id: 'M025', fase: 'Cuartos de Final', grupo: null, jornada: null,
      fecha: '2026-07-11', hora: '21:00',
      localCod: null, visitanteCod: null, estadioId: 'EST002',
      estado: 'por_definir', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 400, disponibles: 72000, total: 82000 },
        preferencial:{ precio: 900, disponibles: 8000,  total: 9000  },
        vip:         { precio: 2200, disponibles: 720,  total: 800   }
      }
    },
    {
      id: 'M026', fase: 'Cuartos de Final', grupo: null, jornada: null,
      fecha: '2026-07-12', hora: '18:00',
      localCod: null, visitanteCod: null, estadioId: 'EST003',
      estado: 'por_definir', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 380, disponibles: 78000, total: 90000 },
        preferencial:{ precio: 850, disponibles: 8200,  total: 9000  },
        vip:         { precio: 2100, disponibles: 780,  total: 900   }
      }
    },
    {
      id: 'M027', fase: 'Cuartos de Final', grupo: null, jornada: null,
      fecha: '2026-07-12', hora: '21:00',
      localCod: null, visitanteCod: null, estadioId: 'EST005',
      estado: 'por_definir', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 360, disponibles: 62000, total: 68000 },
        preferencial:{ precio: 820, disponibles: 7500,  total: 8000  },
        vip:         { precio: 2050, disponibles: 680,  total: 750   }
      }
    },

    // === SEMIFINALES ===
    {
      id: 'M028', fase: 'Semifinal', grupo: null, jornada: null,
      fecha: '2026-07-15', hora: '21:00',
      localCod: null, visitanteCod: null, estadioId: 'EST002',
      estado: 'por_definir', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 550, disponibles: 75000, total: 82000 },
        preferencial:{ precio: 1300, disponibles: 8500, total: 9000  },
        vip:         { precio: 3200, disponibles: 790,  total: 800   }
      }
    },
    {
      id: 'M029', fase: 'Semifinal', grupo: null, jornada: null,
      fecha: '2026-07-16', hora: '21:00',
      localCod: null, visitanteCod: null, estadioId: 'EST003',
      estado: 'por_definir', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 550, disponibles: 82000, total: 90000 },
        preferencial:{ precio: 1300, disponibles: 8800, total: 9000  },
        vip:         { precio: 3200, disponibles: 870,  total: 900   }
      }
    },

    // === TERCER PUESTO ===
    {
      id: 'M030', fase: 'Tercer Puesto', grupo: null, jornada: null,
      fecha: '2026-07-18', hora: '18:00',
      localCod: null, visitanteCod: null, estadioId: 'EST001',
      estado: 'por_definir', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 300, disponibles: 72000, total: 87000 },
        preferencial:{ precio: 700, disponibles: 9000,  total: 10000 },
        vip:         { precio: 1800, disponibles: 850,  total: 1000  }
      }
    },

    // === GRAN FINAL ===
    {
      id: 'M031', fase: 'Gran Final', grupo: null, jornada: null,
      fecha: '2026-07-19', hora: '17:00',
      localCod: null, visitanteCod: null, estadioId: 'EST002',
      estado: 'por_definir', golesLocal: null, golesVisitante: null,
      entradas: {
        general:     { precio: 800, disponibles: 70000, total: 82000 },
        preferencial:{ precio: 2000, disponibles: 8000, total: 9000  },
        vip:         { precio: 5000, disponibles: 750,  total: 800   }
      }
    }
  ]
};
