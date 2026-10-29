import { describe, expect, it } from "vitest";
import {
  EPISODE_SECONDS,
  captionsPath,
  getTelenovela,
  telenovelas,
  toWebVtt,
  videoPath,
} from "@/lib/telenovelas";

describe("catálogo de telenovelas", () => {
  it("tiene slugs únicos", () => {
    const slugs = telenovelas.map((telenovela) => telenovela.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("cada telenovela tiene capítulos con subtítulos dentro de la duración del video", () => {
    for (const telenovela of telenovelas) {
      expect(telenovela.episodes.length).toBeGreaterThan(0);
      for (const episode of telenovela.episodes) {
        expect(episode.captions.length).toBeGreaterThan(0);
        for (const caption of episode.captions) {
          expect(caption.start).toBeLessThan(caption.end);
          expect(caption.end).toBeLessThanOrEqual(EPISODE_SECONDS);
        }
      }
    }
  });

  it("cada telenovela tiene reparto", () => {
    for (const telenovela of telenovelas) {
      expect(telenovela.cast.length).toBeGreaterThan(0);
    }
  });

  it("busca una telenovela por slug", () => {
    expect(getTelenovela("michimar")?.title).toBe("Michimar");
    expect(getTelenovela("no-existe")).toBeUndefined();
  });

  it("arma las rutas de video y subtítulos", () => {
    expect(videoPath("michimar", 2)).toBe("/videos/michimar-2.mp4");
    expect(captionsPath("michimar", 2)).toBe("/videos/michimar-2.vtt");
  });
});

describe("toWebVtt", () => {
  it("genera un archivo WebVTT válido", () => {
    const vtt = toWebVtt([
      { start: 0, end: 2.5, text: "¡Michi-maldita!" },
      { start: 2.5, end: 6, text: "[Música dramática]" },
    ]);

    expect(vtt).toBe(
      "WEBVTT\n\n" +
        "1\n00:00:00.000 --> 00:00:02.500\n¡Michi-maldita!\n\n" +
        "2\n00:00:02.500 --> 00:00:06.000\n[Música dramática]\n",
    );
  });
});
