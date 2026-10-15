// Vector facets, not a raster texture or a physical diffraction simulation.
// Every instance owns its paint IDs; header, footer and feature can coexist.
let nextCrystal = 0;

export function crystalMark({ feature = false } = {}) {
  const id = `crystal-${++nextCrystal}`;
  const paint = (name) => `url(#${id}-${name})`;
  const shell = "M160 24 278 92 278 228 160 296 42 228 42 92Z";
  const letter =
    "M74 228 160 85 246 228ZM160 128 124 193H196ZM115 209 104 228H216L205 209Z";
  const facets = [
    ["160,24 42,92 100,125", "ice"],
    ["160,24 220,125 278,92", "ice"],
    ["42,92 42,228 100,125", "glass"],
    ["278,92 220,125 278,228", "glass"],
    ["42,228 160,296 104,228", "ice"],
    ["160,296 278,228 216,228", "ice"],
    ["104,228 160,296 216,228", "glass"],
  ];
  return `<svg class="brand-mark crystal-mark${feature ? " crystal-mark-feature" : ""}" data-crystal viewBox="0 0 320 320" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient class="crystal-ice-paint" id="${id}-ice" x1="42" y1="50" x2="245" y2="264" gradientUnits="userSpaceOnUse"><stop stop-color="#f5e9ff"/><stop offset=".22" stop-color="#a58af0" stop-opacity=".8"/><stop offset=".46" stop-color="#7160bb" stop-opacity=".2"/><stop offset=".7" stop-color="#c7a8ff" stop-opacity=".85"/><stop offset="1" stop-color="#f7edff"/></linearGradient>
      <linearGradient id="${id}-glass" x1="65" y1="240" x2="252" y2="67" gradientUnits="userSpaceOnUse"><stop stop-color="#ae88fc" stop-opacity=".8"/><stop offset=".3" stop-color="#6750b2" stop-opacity=".18"/><stop offset=".56" stop-color="#30336e" stop-opacity=".12"/><stop offset=".8" stop-color="#bda0ff" stop-opacity=".65"/><stop offset="1" stop-color="#eee3ff"/></linearGradient>
      <linearGradient id="${id}-edge" x1="42" y1="90" x2="278" y2="230" gradientUnits="userSpaceOnUse"><stop stop-color="#f5eaff"/><stop offset=".33" stop-color="#a485e8" stop-opacity=".3"/><stop offset=".65" stop-color="#d5bdff" stop-opacity=".85"/><stop offset="1" stop-color="#faf1ff"/></linearGradient>
      <linearGradient class="crystal-letter-paint" id="${id}-letter" x1="108" y1="108" x2="217" y2="232" gradientUnits="userSpaceOnUse"><stop stop-color="#f8eeff"/><stop offset=".28" stop-color="#c7a3ff"/><stop offset=".5" stop-color="#9373d8"/><stop offset=".74" stop-color="#ead5ff"/><stop offset="1" stop-color="#b390f2"/></linearGradient>
      <linearGradient id="${id}-spectrum" x1="0" y1="0" x2="0" y2="1" gradientTransform="rotate(-32 .5 .5)"><stop stop-color="#a585ff" stop-opacity="0"/><stop offset=".32" stop-color="#a585ff" stop-opacity="0"/><stop offset=".43" stop-color="#778aff" stop-opacity=".7"/><stop offset=".49" stop-color="#99f0f1" stop-opacity=".9"/><stop offset=".53" stop-color="#fff2ca"/><stop offset=".58" stop-color="#f4adcf" stop-opacity=".7"/><stop offset=".69" stop-color="#b895ff" stop-opacity="0"/><stop offset="1" stop-color="#b895ff" stop-opacity="0"/></linearGradient>
      <linearGradient id="${id}-polish" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#fcf3ff" stop-opacity=".75"/><stop offset=".24" stop-color="#b691fa" stop-opacity="0"/><stop offset=".56" stop-color="#6744a9" stop-opacity=".12"/><stop offset=".78" stop-color="#ead7ff" stop-opacity=".65"/><stop offset=".83" stop-color="#fff8ff" stop-opacity=".9"/><stop offset="1" stop-color="#c6a0f5" stop-opacity=".12"/></linearGradient>
      <linearGradient id="${id}-guided" x1="42" y1="92" x2="278" y2="228" gradientUnits="userSpaceOnUse"><stop stop-color="#75d9ec"/><stop offset=".3" stop-color="#c0a3ff"/><stop offset=".52" stop-color="#fff1ce"/><stop offset=".76" stop-color="#e5a2d4"/><stop offset="1" stop-color="#89e0ee"/></linearGradient>
      <linearGradient id="${id}-escape"><stop stop-color="#b48ae0" stop-opacity="0"/><stop offset=".45" stop-color="#82d6ed" stop-opacity=".08"/><stop offset=".83" stop-color="#baa2ff" stop-opacity=".32"/><stop offset="1" stop-color="#fff0d5" stop-opacity=".8"/></linearGradient>
      <radialGradient id="${id}-spark"><stop stop-color="#fff5ff"/><stop offset=".18" stop-color="#e3c8ff" stop-opacity=".8"/><stop offset="1" stop-color="#b591ff" stop-opacity="0"/></radialGradient>
      <linearGradient id="${id}-refraction" x1="0" y1="-30" x2="0" y2="30" gradientUnits="userSpaceOnUse"><stop stop-color="#8f6aea" stop-opacity="0"/><stop offset=".2" stop-color="#7d8aff" stop-opacity=".1"/><stop class="crystal-spectral-stop crystal-spectral-cool" offset=".38" stop-color="#8ee9fa" stop-opacity=".55"/><stop offset=".49" stop-color="#f6fff5" stop-opacity=".8"/><stop class="crystal-spectral-stop crystal-spectral-warm" offset=".52" stop-color="#fff5cd" stop-opacity=".8"/><stop class="crystal-spectral-stop crystal-spectral-rose" offset=".66" stop-color="#f2a9dc" stop-opacity=".45"/><stop offset=".85" stop-color="#9c7de5" stop-opacity=".1"/><stop offset="1" stop-color="#9c7de5" stop-opacity="0"/></linearGradient>
      <filter id="${id}-caustic-softness" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="1.6" result="spectral-source"/><feGaussianBlur in="spectral-source" stdDeviation="${feature ? 20 : 18}" result="spill"/><feComponentTransfer in="spill" result="outer-glow"><feFuncA type="linear" slope="${feature ? 2.8 : 3.2}"/></feComponentTransfer><feGaussianBlur in="spectral-source" stdDeviation="5" result="near-glow"/><feGaussianBlur in="SourceGraphic" stdDeviation="1.15" result="reflection"/><feMerge><feMergeNode in="outer-glow"/><feMergeNode in="near-glow"/><feMergeNode in="reflection"/></feMerge></filter>
      <filter id="${id}-facet-bloom" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="7"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <linearGradient id="${id}-brilliance" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e4d0ff"/><stop offset=".22" stop-color="#efffff"/><stop offset=".45" stop-color="#ffffff"/><stop offset=".7" stop-color="#fff9e6"/><stop offset="1" stop-color="#c8bcff"/></linearGradient>
      <linearGradient id="${id}-depth" x1="42" y1="40" x2="250" y2="280" gradientUnits="userSpaceOnUse"><stop stop-color="#3959bd"/><stop offset=".28" stop-color="#5641b5"/><stop offset=".52" stop-color="#2998ad"/><stop offset=".74" stop-color="#a4439b"/><stop offset="1" stop-color="#b77542"/></linearGradient>
      <linearGradient id="${id}-dispersion" x1="0" y1="-12" x2="0" y2="12" gradientUnits="userSpaceOnUse"><stop stop-color="#494cce" stop-opacity="0"/><stop offset=".22" stop-color="#6975f6" stop-opacity=".5"/><stop offset=".4" stop-color="#5dd9dd" stop-opacity=".8"/><stop offset=".49" stop-color="#ddf8e7" stop-opacity=".85"/><stop offset=".54" stop-color="#efd496" stop-opacity=".85"/><stop offset=".67" stop-color="#d97eab" stop-opacity=".65"/><stop offset=".81" stop-color="#8850c8" stop-opacity=".25"/><stop offset="1" stop-color="#8850c8" stop-opacity="0"/></linearGradient>
      <filter id="${id}-depth-spill" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="9"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="${id}-stream"><stop stop-color="#e4fff4" stop-opacity=".7"/><stop offset=".2" stop-color="#85ddd8" stop-opacity=".65"/><stop offset=".52" stop-color="#9b91ef" stop-opacity=".35"/><stop offset=".78" stop-color="#da9bc2" stop-opacity=".12"/><stop offset="1" stop-color="#8e7add" stop-opacity="0"/></radialGradient>
      <linearGradient id="${id}-mist" x1="0" y1="0" x2="52" y2="0" gradientUnits="userSpaceOnUse"><stop stop-color="#d7f5f3" stop-opacity=".7"/><stop offset=".25" stop-color="#86bdda" stop-opacity=".35"/><stop offset=".62" stop-color="#b49ddd" stop-opacity=".1"/><stop offset="1" stop-color="#b49ddd" stop-opacity="0"/></linearGradient>
      <filter id="${id}-mist-softness" x="-25%" y="-100%" width="150%" height="300%"><feGaussianBlur stdDeviation="3.5"/></filter>
      <clipPath id="${id}-shell-cut"><path d="${shell}"/></clipPath>
      ${facets.map(([points], i) => `<clipPath id="${id}-face-${i}"><polygon points="${points}"/></clipPath>`).join("")}
      <clipPath id="${id}-face-7"><path d="${letter}" clip-rule="evenodd"/></clipPath>
      <clipPath id="${id}-cut"><g>${facets.map(([points]) => `<polygon points="${points}"/>`).join("")}<path d="${letter}" clip-rule="evenodd"/></g></clipPath>
      ${[
        ["cyan", "#4674e9", "#8af1eb"],
        ["rose", "#924ae3", "#f3a7cb"],
        ["gold", "#ef9974", "#fff3b0"],
      ]
        .map(
          ([name, edge, core]) =>
            `<linearGradient id="${id}-${name}"><stop stop-color="${edge}" stop-opacity="0"/><stop offset=".36" stop-color="${edge}" stop-opacity=".2"/><stop offset=".52" stop-color="${core}" stop-opacity=".85"/><stop offset=".58" stop-color="#fffcef" stop-opacity=".65"/><stop offset=".7" stop-color="${edge}" stop-opacity=".3"/><stop offset="1" stop-color="${edge}" stop-opacity="0"/></linearGradient>`,
        )
        .join("")}
    </defs>
    <g class="crystal-air" fill="${paint("mist")}" filter="${paint("mist-softness")}">
      ${[
        [42, 92, 210],
        [278, 228, 32],
        [278, 92, -40],
      ]
        .map(
          ([x, y, angle], i) =>
            `<g transform="translate(${x} ${y}) rotate(${angle})"><g class="crystal-air-beam crystal-air-beam-${i}"><path d="M-3-2Q20-6 52-14V14Q20 6-3 2Z"/><path d="M0-1Q24-1 48-5V5Q24 1 0 1Z" opacity=".45"/></g></g>`,
        )
        .join("")}
    </g>
    <!-- A subdued rear pavilion: the glow is made from the facet pixels,
         not an unrelated circular halo. Its peaks follow the front flashes. -->
    <g class="crystal-depth" transform="translate(0 5)" fill="${paint("depth")}" filter="${paint("depth-spill")}">
      ${facets.map(([points], i) => `<polygon class="crystal-rear-facet crystal-facet-flash-${i}" points="${points}"/>`).join("")}
      <path class="crystal-rear-facet crystal-facet-flash-7" d="${letter}" fill-rule="evenodd"/>
    </g>
    <g class="crystal-body">
      <path d="${shell}" fill="#604b9e" fill-opacity=".07"/>
      <g class="crystal-inner-cuts" clip-path="${paint("shell-cut")}" fill="${paint("dispersion")}" filter="${paint("facet-bloom")}">
        ${[
          [114, 100, -48, "M-39-16 45-5-15 28Z"],
          [222, 161, 60, "M-30-18 48 8-35 30Z"],
          [150, 259, -24, "M-44-21 53 4-8 27Z"],
        ]
          .map(
            ([x, y, angle, d], i) =>
              `<g transform="translate(${x} ${y}) rotate(${angle})"><path class="crystal-inner-glint crystal-inner-glint-${i}" d="${d}"/></g>`,
          )
          .join("")}
      </g>
      ${facets.map(([points, fill]) => `<polygon points="${points}" fill="${paint(fill)}"/>`).join("")}
      <path d="M160 24 42 92V228L160 296 278 228V92ZM160 32 49 96V224L160 288 271 224V96Z" fill="${paint("edge")}" fill-rule="evenodd" opacity=".65"/>
      <path d="${letter}" fill="${paint("letter")}" fill-rule="evenodd"/>
      <g class="crystal-letter-facets" clip-path="url(#${id}-face-7)">
        <path d="M74 228 160 85 142 150Z M160 85 246 228 178 150Z" fill="${paint("ice")}" opacity=".7"/>
        <path d="M74 228 142 150 160 128 104 228Z M160 128 178 150 246 228 216 228Z" fill="${paint("glass")}" opacity=".6"/>
        <path d="M160 85 142 150 160 128 178 150Z M124 193 196 193 160 203Z M115 209 160 203 205 209Z" fill="${paint("polish")}" opacity=".8"/>
        <path d="M74 228 142 150 160 85 178 150 246 228M124 193 160 203 196 193" fill="none" stroke="${paint("edge")}" stroke-width=".8" opacity=".6"/>
      </g>
      <path d="M79 225 160 91 241 225M107 225 160 133 213 225M125 195H195M117 208H203" stroke="${paint("edge")}" stroke-width="1.6" stroke-linejoin="round"/>
      <g class="crystal-light crystal-light-a" fill="${paint("spectrum")}">
        <path d="M42 92 160 24 100 125Z"/><path d="M220 125 278 92 278 228Z"/><path d="M42 228 160 296 104 228Z"/>

      </g>
      <g class="crystal-light crystal-light-b" fill="${paint("spectrum")}" transform="rotate(180 160 160)">
        <path d="M42 92 160 24 100 125Z"/><path d="M220 125 278 92 278 228Z"/>
      </g>
      <g class="crystal-pulse-field" clip-path="url(#${id}-cut)">
        <g class="crystal-incidence">
        <g class="crystal-pulse crystal-pulse-cyan"><path d="M-90-100H10L250 420H150Z" fill="${paint("cyan")}"/></g>
        <g class="crystal-pulse crystal-pulse-rose"><path d="M210-100H300L60 420H-30Z" fill="${paint("rose")}"/></g>
        <g class="crystal-pulse crystal-pulse-gold"><path d="M-180 270 380-70 420-5-140 335Z" fill="${paint("gold")}"/></g>
        </g>
      </g>
      <g class="crystal-refraction-field" filter="url(#${id}-caustic-softness)">
        ${[
          ...facets.map(([points]) => {
            const vertices = points
              .split(" ")
              .map((p) => p.split(",").map(Number));
            return vertices.reduce(
              (c, p) => [c[0] + p[0] / 3, c[1] + p[1] / 3],
              [0, 0],
            );
          }),
          [160, 163],
        ]
          .map(
            (
              [x, y],
              i,
            ) => `<g clip-path="url(#${id}-face-${i})"><g transform="translate(${x} ${y}) rotate(${[-28, 28, -55, 55, 30, -30, 0, -20][i]})"><g class="crystal-deflection" data-wave-x="${x}" data-wave-y="${y}"><g class="crystal-refraction crystal-refraction-${i}">
          <path d="M-160-20Q-65-65 0-5T160-20L160-2Q65 40 0 9T-160-2Z" fill="${paint("refraction")}"/>
          <path class="crystal-refraction-white" d="M-160-10Q-65-55 0 0T160-10" fill="none" stroke="#fff9f4" stroke-width="2"/>
          <path d="M-130 22Q-35-6 50 28T150 15L150 30Q65 66 0 37T-130 29Z" fill="${paint("refraction")}" opacity=".18"/>
        </g></g></g></g>`,
          )
          .join("")}
      </g>
      <!-- Sharp internal dispersion above the softened reflections. The A
           shares this optical field, so its bevels catch the same incident light. -->
      <g class="crystal-transmission" clip-path="url(#${id}-cut)">
        <g class="crystal-transmission-incidence">
          ${[
            [72, -28],
            [168, 32],
            [255, -18],
          ]
            .map(
              ([y, angle], i) =>
                `<g transform="translate(160 ${y}) rotate(${angle})"><g class="crystal-internal-band crystal-internal-band-${i}"><path d="M-180-12Q-60-22 20-5T180-12V12Q60 22-20 5T-180 12Z" fill="${paint("dispersion")}"/></g></g>`,
            )
            .join("")}
        </g>
      </g>
      <g class="crystal-guided-field" clip-path="${paint("cut")}" fill="${paint("stream")}">
        ${[0, 1, 2].map((i) => `<g class="crystal-route crystal-route-${i}"><g class="crystal-guided crystal-guided-core"><ellipse rx="46" ry="16"/><ellipse rx="27" ry="7" opacity=".45"/></g></g>`).join("")}
      </g>
      <g class="crystal-seams" stroke="${paint("edge")}" stroke-width=".65" stroke-linejoin="round">
        <path d="M160 24V85M42 92 100 125 42 228H278L220 125 278 92M104 228 160 296 216 228"/>
      </g>
      <path d="${shell}M74 228 160 85 246 228M104 228 160 128 216 228" stroke="var(--af-purple, #9873cc)" stroke-opacity=".5" stroke-width="2" stroke-linejoin="round"/>
      <path d="${shell}M160 24 100 125M160 24 220 125M74 228 160 85 246 228M104 228 160 128 216 228" stroke="${paint("edge")}" stroke-width="1.05" stroke-linejoin="round"/>
      <path d="M160 24 42 92 100 125M278 92 278 228 216 228M74 228 160 85M160 296 104 228M125 193H195" stroke="#fff2ff" stroke-opacity=".75" stroke-width=".7"/>
      <g class="crystal-facet-shine" fill="none" stroke="${paint("edge")}" stroke-linecap="round">
        <path class="crystal-shine crystal-shine-a" d="M42 92 160 24 220 125"/>
        <path class="crystal-shine crystal-shine-b" d="M74 228 142 150 160 85 178 150 246 228"/>
        <path class="crystal-shine crystal-shine-c" d="M104 228 160 296 278 228"/>
      </g>
      <g class="crystal-facet-flashes" fill="${paint("brilliance")}" filter="url(#${id}-facet-bloom)">
        ${[...facets.map(([points]) => points), "74,228 160,85 142,150", "160,85 246,228 178,150", "124,193 196,193 160,203"].map((points, i) => `<polygon class="crystal-facet-flash crystal-facet-flash-${i}" points="${points}"/>`).join("")}
      </g>
      <g class="crystal-afterglows" filter="${paint("facet-bloom")}">
        ${[
          [0, facets[0][0], "#57cdd6"],
          [3, facets[3][0], "#9773e8"],
          [6, facets[6][0], "#dba85c"],
          [7, "74,228 160,85 142,150", "#75b8e2"],
        ]
          .map(
            ([i, points, colour]) =>
              `<polygon class="crystal-afterglow crystal-facet-flash-${i}" points="${points}" fill="${colour}"/>`,
          )
          .join("")}
      </g>
    </g>
    <g class="crystal-coupling" fill="${paint("escape")}" filter="${paint("mist-softness")}">
      <g class="crystal-port crystal-port-a"><path d="M4 68 42 90 42 96 4 88Z"/><path class="crystal-port-spectrum" d="M6 74 42 91 42 94 6 82Z"/></g>
      <g class="crystal-port crystal-port-b" transform="rotate(180 160 160)"><path d="M4 68 42 90 42 96 4 88Z"/><path class="crystal-port-spectrum" d="M6 74 42 91 42 94 6 82Z"/></g>
      <g class="crystal-port crystal-port-c" transform="rotate(-60 42 228)"><path d="M6 215 42 226 42 231 6 239Z"/></g>
    </g>
    <g class="crystal-glints crystal-light crystal-light-c" fill="${paint("spark")}">
      <circle cx="160" cy="24" r="12"/><circle cx="42" cy="228" r="11"/><circle cx="278" cy="92" r="10"/><circle cx="160" cy="296" r="13"/>
    </g>
    <g class="crystal-freckles crystal-light crystal-light-b" fill="${paint("spark")}">
      <ellipse cx="42" cy="92" rx="16" ry="2" transform="rotate(-30 42 92)"/>
      <ellipse cx="278" cy="228" rx="19" ry="2" transform="rotate(30 278 228)"/>
      <circle cx="42" cy="92" r="3"/><circle cx="278" cy="228" r="3"/>
    </g>
  </svg>`;
}

export function crystalMotionControl(lang) {
  const pl = lang === "pl";
  return `<button class="crystal-motion-control" type="button" data-crystal-motion hidden aria-pressed="false"><span aria-hidden="true">◈</span> ${pl ? "Światło logo" : "Logo light"}: <span data-crystal-motion-label>${pl ? "zatrzymaj" : "pause"}</span></button>`;
}

// Optical-size version: preserve the crystal and open A at 16 px. Frames are
// generated once during the build, never drawn in a browser animation loop.
function crystalTabIcon(frame = 0) {
  const angle = (frame / 12) * Math.PI * 2;
  const x = (32 + Math.sin(angle) * 25).toFixed(2);
  const y = (32 - Math.cos(angle) * 28).toFixed(2);
  const pulse = (0.55 + 0.2 * Math.cos(angle * 2)).toFixed(2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><defs><linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e9d4ff"/><stop offset=".4" stop-color="#8060b6"/><stop offset=".72" stop-color="#c1c6f8"/><stop offset="1" stop-color="#9e73cc"/></linearGradient><radialGradient id="light" gradientUnits="userSpaceOnUse" cx="${x}" cy="${y}" r="40"><stop stop-color="#fff9ec"/><stop offset=".2" stop-color="#c5f8ef"/><stop offset=".42" stop-color="#a3abff"/><stop offset=".62" stop-color="#e6b2ec" stop-opacity=".65"/><stop offset="1" stop-color="#a77bdb" stop-opacity="0"/></radialGradient><clipPath id="facets"><path d="M32 3 6 18 19 25ZM32 3 45 25 58 18ZM6 18V46L19 25ZM58 18V46L45 25ZM6 46 32 61 20 46ZM58 46 32 61 44 46Z"/><path fill-rule="evenodd" d="M14 46 32 16 50 46ZM32 29 26 38H38ZM24 43 22 46H42L40 43Z"/></clipPath></defs><path d="M32 3 58 18V46L32 61 6 46V18Z" fill="#302447" stroke="#9e80c6" stroke-width="2"/><g fill="url(#glass)"><path d="M32 3 6 18 19 25ZM32 3 45 25 58 18ZM6 18V46L19 25ZM58 18V46L45 25ZM6 46 32 61 20 46ZM58 46 32 61 44 46Z"/><path fill-rule="evenodd" d="M14 46 32 16 50 46ZM32 29 26 38H38ZM24 43 22 46H42L40 43Z"/></g><rect width="64" height="64" fill="url(#light)" opacity="${pulse}" clip-path="url(#facets)"/><path d="M32 3 6 18V46L32 61 58 46V18ZM14 46 32 16 50 46M6 18 19 25M58 18 45 25M6 46H58" fill="none" stroke="#eedfff" stroke-width=".85" stroke-linejoin="round"/></svg>`;
}

export const crystalFavicon = crystalTabIcon();
export const crystalFaviconFrames = Array.from(
  { length: 12 },
  (_, i) => `data:image/svg+xml,${encodeURIComponent(crystalTabIcon(i))}`,
);

export function crystalButton(lang, feature = false) {
  return `<button type="button" class="crystal-trigger${feature ? " crystal-trigger-feature" : ""}" data-crystal-trigger aria-pressed="false" aria-label="${lang === "pl" ? "Rozświetl kryształ" : "Illuminate the crystal"}">${crystalMark({ feature })}</button>`;
}
