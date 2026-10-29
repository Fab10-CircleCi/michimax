import { describe, expect, it } from "vitest";
import { UPSTREAM_REPO_URL, fallbackCommand, featureRequests } from "@/lib/feature-requests";

describe("solicitudes de funcionalidades", () => {
  it("hay cuatro solicitudes numeradas en orden", () => {
    expect(featureRequests.map((request) => request.number)).toEqual([1, 2, 3, 4]);
  });

  it("cada solicitud tiene ramas únicas", () => {
    const branches = featureRequests.map((request) => request.branch);
    const fallbacks = featureRequests.map((request) => request.fallbackBranch);
    expect(new Set(branches).size).toBe(featureRequests.length);
    expect(new Set(fallbacks).size).toBe(featureRequests.length);
  });

  it("cada prompt incluye el contexto, los pasos finales y su rama", () => {
    for (const request of featureRequests) {
      expect(request.prompt).toContain("Next.js 16");
      expect(request.prompt).toContain("npm test");
      expect(request.prompt).toContain(request.branch);
    }
  });

  it("el comando de respaldo usa su propia rama para no chocar con la del agente", () => {
    const [first] = featureRequests;
    expect(fallbackCommand(first)).toBe(
      `git fetch ${UPSTREAM_REPO_URL}.git fallback/01-reacciones && ` +
        "git switch -C respaldo/reacciones FETCH_HEAD && git push -u origin respaldo/reacciones",
    );
  });
});
