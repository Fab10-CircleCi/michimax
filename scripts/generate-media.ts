// Genera los videos verticales (9:16), pósters y subtítulos de cada capítulo.
// Requisitos: ffmpeg en el PATH y `npx playwright install chromium`.
// Uso: npm run media
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import { EPISODE_SECONDS, telenovelas, toWebVtt } from "../lib/telenovelas.ts";
import type { Episode, Palette, Telenovela } from "../lib/telenovelas.ts";

const WIDTH = 360;
const HEIGHT = 640;
const FPS = 25;
const root = new URL("..", import.meta.url).pathname;
const videosDir = join(root, "public", "videos");
const postersDir = join(root, "public", "posters");

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function catSvg({ fur, accent }: Palette): string {
  return `
  <svg viewBox="0 0 200 220" width="400" height="440" xmlns="http://www.w3.org/2000/svg">
    <path d="M150 190 C200 180 200 120 170 110" stroke="${fur}" stroke-width="14" fill="none" stroke-linecap="round"/>
    <ellipse cx="100" cy="160" rx="62" ry="55" fill="${fur}"/>
    <circle cx="100" cy="85" r="48" fill="${fur}"/>
    <path d="M58 62 L62 18 L92 46 Z" fill="${fur}"/>
    <path d="M142 62 L138 18 L108 46 Z" fill="${fur}"/>
    <path d="M66 54 L68 30 L86 47 Z" fill="${accent}" opacity="0.7"/>
    <path d="M134 54 L132 30 L114 47 Z" fill="${accent}" opacity="0.7"/>
    <ellipse cx="82" cy="82" rx="9" ry="12" fill="#1b1b1b"/>
    <ellipse cx="118" cy="82" rx="9" ry="12" fill="#1b1b1b"/>
    <circle cx="85" cy="78" r="3" fill="#fff"/>
    <circle cx="121" cy="78" r="3" fill="#fff"/>
    <path d="M86 98 Q90 104 100 100 Q110 104 114 98" stroke="#1b1b1b" stroke-width="3" fill="none"/>
    <path d="M96 94 L104 94 L100 99 Z" fill="${accent}"/>
    <g stroke="#1b1b1b" stroke-width="2" opacity="0.6">
      <line x1="40" y1="92" x2="78" y2="96"/><line x1="40" y1="104" x2="78" y2="100"/>
      <line x1="160" y1="92" x2="122" y2="96"/><line x1="160" y1="104" x2="122" y2="100"/>
    </g>
    <path d="M124 95 Q129 106 125 114" stroke="#9ad0ff" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.9"/>
  </svg>`;
}

function cardHtml(telenovela: Telenovela, episode: Episode): string {
  const { background, accent } = telenovela.palette;
  return `<!doctype html>
  <html><head><meta charset="utf-8"><style>
    * { margin: 0; box-sizing: border-box; }
    body {
      width: ${WIDTH * 2}px; height: ${HEIGHT * 2}px; overflow: hidden;
      background: radial-gradient(circle at 50% 35%, ${accent}55, transparent 60%), ${background};
      color: #fff; font-family: Georgia, serif; display: flex; flex-direction: column;
      align-items: center; justify-content: space-between; padding: 80px 48px; text-align: center;
    }
    .brand { font-family: "Arial Black", Arial, sans-serif; letter-spacing: 8px; font-size: 34px; color: ${accent}; }
    h1 { font-size: 92px; line-height: 1; font-style: italic; text-shadow: 0 6px 24px #0008; }
    .ep { font-family: Arial, sans-serif; font-size: 30px; text-transform: uppercase; letter-spacing: 4px; color: ${accent}; }
    .ep-title { font-size: 44px; margin-top: 12px; }
  </style></head><body>
    <div class="brand">MICHIMAX</div>
    ${catSvg(telenovela.palette)}
    <div>
      <h1>${escapeHtml(telenovela.title)}</h1>
      <p class="ep" style="margin-top:32px">Capítulo ${episode.number}</p>
      <p class="ep-title">${escapeHtml(episode.title)}</p>
    </div>
  </body></html>`;
}

function dramaticChord(): string {
  const notes = [220, 261.63, 329.63];
  const sum = notes.map((hz) => `0.09*sin(2*PI*${hz}*t)*exp(-0.35*t)`).join("+");
  return `aevalsrc=${sum}:s=44100:d=${EPISODE_SECONDS}`;
}

async function main() {
  mkdirSync(videosDir, { recursive: true });
  mkdirSync(postersDir, { recursive: true });
  const work = mkdtempSync(join(tmpdir(), "michimax-media-"));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: WIDTH * 2, height: HEIGHT * 2 } });

  try {
    for (const telenovela of telenovelas) {
      for (const episode of telenovela.episodes) {
        const name = `${telenovela.slug}-${episode.number}`;
        const card = join(work, `${name}.png`);
        await page.setContent(cardHtml(telenovela, episode));
        await page.screenshot({ path: card });

        execFileSync("ffmpeg", [
          "-y", "-loglevel", "error",
          "-i", card,
          "-f", "lavfi", "-i", dramaticChord(),
          "-filter_complex",
          `[0:v]zoompan=z='1+0.0009*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${EPISODE_SECONDS * FPS}:s=${WIDTH}x${HEIGHT}:fps=${FPS},format=yuv420p[v]`,
          "-map", "[v]", "-map", "1:a",
          "-c:v", "libx264", "-preset", "veryslow", "-crf", "32", "-profile:v", "main",
          "-c:a", "aac", "-b:a", "40k", "-ac", "1",
          "-t", String(EPISODE_SECONDS), "-movflags", "+faststart",
          join(videosDir, `${name}.mp4`),
        ]);

        execFileSync("ffmpeg", [
          "-y", "-loglevel", "error", "-i", card,
          "-vf", `scale=${WIDTH}:${HEIGHT}`, "-q:v", "4",
          join(postersDir, `${name}.jpg`),
        ]);

        writeFileSync(join(videosDir, `${name}.vtt`), toWebVtt(episode.captions));
        console.log(`✔ ${name}`);
      }
    }
  } finally {
    await browser.close();
    rmSync(work, { recursive: true, force: true });
  }
}

await main();
