import { beforeEach, describe, expect, it } from "vitest";
import { resetObsidianMocks, setLanguage } from "obsidian";

import { getSynchLocale, t } from "./i18n";

describe("Synch i18n", () => {
  beforeEach(() => {
    resetObsidianMocks();
  });

  it("defaults unsupported languages to English", () => {
    setLanguage("fr");

    expect(getSynchLocale()).toBe("en");
    expect(t("sync.label")).toBe("Sync");
  });

  it("uses Korean for ko language codes", () => {
    setLanguage("ko-KR");

    expect(getSynchLocale()).toBe("ko");
    expect(t("sync.label")).toBe("동기화");
  });

  it("uses Japanese for ja language codes", () => {
    setLanguage("ja-JP");

    expect(getSynchLocale()).toBe("ja");
    expect(t("sync.label")).toBe("同期");
  });

  it("uses simplified Chinese for zh-CN language codes", () => {
    setLanguage("zh-CN");

    expect(getSynchLocale()).toBe("zh-cn");
    expect(t("sync.label")).toBe("同步");
  });

  it("uses traditional Chinese for zh-TW language codes", () => {
    setLanguage("zh-TW");

    expect(getSynchLocale()).toBe("zh-tw");
    expect(t("sync.label")).toBe("同步");
  });
});
