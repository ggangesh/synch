import { describe, expect, it } from "vitest";

import { DEFAULT_SYNC_FILE_RULES } from "../core/file-rules";
import { DEFAULT_VAULT_CONFIG_SYNC_RULES } from "../core/vault-config-rules";
import { createTestPlugin } from "../../test-support/test-plugin";
import { ObsidianSyncVaultAdapter } from "./obsidian-vault-adapter";

describe("ObsidianSyncVaultAdapter", () => {
  it("lists files from included hidden folders through the adapter", async () => {
    const plugin = createTestPlugin();
    await plugin.app.vault.adapter.mkdir(".assets");
    await plugin.app.vault.adapter.mkdir(".assets/nested");
    await plugin.app.vault.adapter.writeBinary(
      ".assets/nested/file.md",
      new TextEncoder().encode("hidden").buffer,
    );
    await plugin.app.vault.adapter.mkdir(".git");
    await plugin.app.vault.adapter.writeBinary(
      ".git/config",
      new TextEncoder().encode("ignored").buffer,
    );
    const adapter = new ObsidianSyncVaultAdapter(
      plugin,
      () => ({
        ...DEFAULT_SYNC_FILE_RULES,
        includedHiddenFolders: [".assets", ".git"],
      }),
      () => DEFAULT_VAULT_CONFIG_SYNC_RULES,
    );

    const files = await adapter.listFiles();

    expect(files.map((file) => file.path)).toEqual([".assets/nested/file.md"]);
    await expect(files[0]?.readBytes()).resolves.toEqual(
      new TextEncoder().encode("hidden"),
    );
  });

  describe("sanitizePath", () => {
    it("replaces invalid Android filename characters with underscores", async () => {
      const plugin = createTestPlugin();
      const adapter = new ObsidianSyncVaultAdapter(
        plugin,
        () => DEFAULT_SYNC_FILE_RULES,
        () => DEFAULT_VAULT_CONFIG_SYNC_RULES,
      );

      await adapter.writeBinary("file*.md", new Uint8Array([1, 2, 3]));
      expect(
        await plugin.app.vault.adapter.exists("file_.md"),
      ).toBe(true);
    });

    it("sanitizes multiple invalid characters in a path", async () => {
      const plugin = createTestPlugin();
      const adapter = new ObsidianSyncVaultAdapter(
        plugin,
        () => DEFAULT_SYNC_FILE_RULES,
        () => DEFAULT_VAULT_CONFIG_SYNC_RULES,
      );

      await adapter.writeBinary("a:b/c<d>.md", new Uint8Array([1]));
      expect(await plugin.app.vault.adapter.exists("a_b/c_d_.md")).toBe(true);
    });

    it("sanitizes paths in write and writeText methods", async () => {
      const plugin = createTestPlugin();
      const adapter = new ObsidianSyncVaultAdapter(
        plugin,
        () => DEFAULT_SYNC_FILE_RULES,
        () => DEFAULT_VAULT_CONFIG_SYNC_RULES,
      );

      await adapter.writeText("note*.md", "hello");
      expect(await plugin.app.vault.adapter.exists("note_.md")).toBe(true);
      expect(await plugin.app.vault.adapter.read("note_.md")).toBe("hello");
    });

    it("sanitizes paths in rename method", async () => {
      const plugin = createTestPlugin();
      const adapter = new ObsidianSyncVaultAdapter(
        plugin,
        () => DEFAULT_SYNC_FILE_RULES,
        () => DEFAULT_VAULT_CONFIG_SYNC_RULES,
      );

      await plugin.app.vault.adapter.writeBinary(
        "old.md",
        new TextEncoder().encode("data").buffer,
      );
      await adapter.rename("old.md", "new*.md");
      expect(await plugin.app.vault.adapter.exists("new_.md")).toBe(true);
      expect(await plugin.app.vault.adapter.exists("old.md")).toBe(false);
    });

    it("does not modify paths without invalid characters", async () => {
      const plugin = createTestPlugin();
      const adapter = new ObsidianSyncVaultAdapter(
        plugin,
        () => DEFAULT_SYNC_FILE_RULES,
        () => DEFAULT_VAULT_CONFIG_SYNC_RULES,
      );

      await adapter.writeBinary("normal-file.md", new Uint8Array([1, 2, 3]));
      expect(
        await plugin.app.vault.adapter.exists("normal-file.md"),
      ).toBe(true);
    });

    it("sanitizes paths in remove method", async () => {
      const plugin = createTestPlugin();
      const adapter = new ObsidianSyncVaultAdapter(
        plugin,
        () => DEFAULT_SYNC_FILE_RULES,
        () => DEFAULT_VAULT_CONFIG_SYNC_RULES,
      );

      await plugin.app.vault.adapter.writeBinary(
        "file*.md",
        new TextEncoder().encode("data").buffer,
      );
      await adapter.remove("file*.md");
      expect(
        await plugin.app.vault.adapter.exists("file_.md"),
      ).toBe(false);
    });
  });

  describe("mkdir", () => {
    it("creates directories via adapter", async () => {
      const plugin = createTestPlugin();
      const adapter = new ObsidianSyncVaultAdapter(
        plugin,
        () => DEFAULT_SYNC_FILE_RULES,
        () => DEFAULT_VAULT_CONFIG_SYNC_RULES,
      );

      await adapter.mkdir("some-folder");
      expect(await plugin.app.vault.adapter.exists("some-folder")).toBe(true);
    });
  });
});
