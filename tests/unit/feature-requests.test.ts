import { describe, expect, it } from "vitest";
import { UPSTREAM_REPO_URL, branchCommand, featureRequests } from "@/lib/feature-requests";

describe("solicitudes de funcionalidades", () => {
  it("hay cuatro solicitudes numeradas en orden", () => {
    expect(featureRequests.map((request) => request.number)).toEqual([1, 2, 3, 4]);
  });

  it("cada solicitud tiene ramas únicas", () => {
    const branches = featureRequests.map((request) => request.branch);
    const respaldo = featureRequests.flatMap((request) => [request.brokenBranch, request.fixedBranch]);
    expect(new Set(branches).size).toBe(featureRequests.length);
    expect(new Set(respaldo).size).toBe(featureRequests.length * 2);
  });

  it("cada prompt incluye el contexto, los pasos finales y su rama", () => {
    for (const request of featureRequests) {
      expect(request.prompt).toContain("Next.js 16");
      expect(request.prompt).toContain("npm test");
      expect(request.prompt).toContain(request.branch);
    }
  });

  it("las ramas de respaldo siguen el orden del taller", () => {
    for (const request of featureRequests) {
      const n = String(request.number).padStart(2, "0");
      expect(request.brokenBranch).toMatch(new RegExp(`^02-feature-${n}-[a-z]+-BROKEN$`));
      expect(request.fixedBranch).toBe(request.brokenBranch.replace(/^02/, "03").replace(/BROKEN$/, "FIXED"));
    }
  });

  it("el comando de respaldo sube la rama a tu fork con el mismo nombre", () => {
    expect(branchCommand("02-feature-01-reacciones-BROKEN")).toBe(
      `git fetch ${UPSTREAM_REPO_URL}.git 02-feature-01-reacciones-BROKEN && ` +
        "git switch -C 02-feature-01-reacciones-BROKEN FETCH_HEAD && git push -u origin 02-feature-01-reacciones-BROKEN",
    );
  });
});
