import { zValidator } from "@hono/zod-validator";
import type { Hono } from "hono";
import { z } from "zod";
import type { Auth } from "../../auth";
import { createEnsureAuthenticatedSession } from "../../middlewares/authenticated-session";
import type { SyncService } from "./service";

export function registerSyncAccessRoutes(
  app: Hono,
  deps: { syncService: SyncService; auth: Auth },
): void {
  const ensureAuthenticatedSession = createEnsureAuthenticatedSession(deps.auth);

  app.post(
    "/v1/sync/token",
    ensureAuthenticatedSession,
    zValidator(
      "json",
      z.object({
        vaultId: z.string().trim().min(1),
        localVaultId: z.string().trim().min(1),
      }),
    ),
    async (c) => {
      const body = c.req.valid("json");

      return c.json(
        await deps.syncService.issueSyncToken(
          { userId: c.var.user.id },
          {
            vaultId: body.vaultId,
            localVaultId: body.localVaultId,
          },
        ),
      );
    },
  );
}
