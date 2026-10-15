import fs from 'node:fs';
import { crystalMark } from './brand-source/crystal-mark.mjs';

const css = fs.readFileSync(new URL('./brand-source/crystal.css', import.meta.url), 'utf8');
const mark = crystalMark({feature:true}).replace('<svg ', '<svg x="35" y="35" width="290" height="290" ').replace('data-crystal ', 'data-crystal="" ').replace('aria-hidden="true"', '');
const style = `${css}\n.crystal-mark{--crystal-letter-1:#f8eeff;--crystal-letter-2:#c7a3ff;--crystal-letter-3:#9373d8;--crystal-letter-4:#ead5ff;--crystal-letter-5:#b390f2;--crystal-ice-edge:#f5e9ff;width:290px!important;height:290px!important} .is-crystal-lit *{animation-play-state:running} @media(prefers-reduced-motion:reduce){*{animation:none!important}}`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="360" viewBox="0 0 1200 360" role="img" aria-labelledby="title desc"><title id="title">Artifactory — Design with light. Read the world.</title><desc id="desc">The Artifactory crystal with gently changing spectral highlights. Optical sensing, photonics and engineering tools.</desc><style>${style}</style><defs><linearGradient id="background"><stop stop-color="#171326"/><stop offset="1" stop-color="#0d1117"/></linearGradient></defs><rect width="1200" height="360" rx="20" fill="url(#background)"/><g class="is-crystal-lit" data-theme="dark">${mark}</g><g font-family="Arial,Helvetica,sans-serif"><text x="370" y="115" fill="#f1edf7" font-size="50" font-weight="600" letter-spacing="-2">artifactory<tspan fill="#bd98f3">.</tspan></text><text x="373" y="181" fill="#f1edf7" font-size="32">Design with light. Read the world.</text><text x="374" y="226" fill="#b2adbf" font-size="20">Optical sensing · Photonic design · Engineering tools</text><text x="374" y="286" fill="#b99bdf" font-size="16" letter-spacing="2">ARTIFACTORY.TECH</text></g></svg>`;
fs.mkdirSync('profile/assets', {recursive:true});
fs.writeFileSync('profile/assets/artifactory-header.svg',svg);
fs.writeFileSync('profile/assets/artifactory-header-static.svg',svg.replace('</style>','*{animation:none!important}</style>'));
console.log('Built animated and static brand headers.');
