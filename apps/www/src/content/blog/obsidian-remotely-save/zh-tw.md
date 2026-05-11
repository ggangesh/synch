---
title: "Obsidian Remotely Save：設定、優缺點與替代方案"
description: "了解 Obsidian 社群外掛 Remotely Save 的儲存後端、加密、衝突處理、行動端同步，以及它和 Synch 的差異。"
pubDate: 2026-05-11
---

如果你想在不購買官方 Sync 的情況下同步 Obsidian，**Remotely Save** 通常會很快進入候選名單。

它受歡迎的原因很明確：你不必被綁在某一個同步服務上，而是可以把 Obsidian vault 接到自己選的儲存空間。它支援 S3 相容儲存、WebDAV、Dropbox、OneDrive、Google Drive、Box、pCloud、Koofr、Azure Blob Storage 等後端，其中部分功能會依方案而不同。

它的重點是彈性。

但彈性也代表設定與維護的責任會回到你身上。

如果你已經知道要把 vault 資料放在哪裡，也願意仔細設定同步選項，Remotely Save 可能很適合你。反過來，如果你真正想要的是一個簡單、針對 Obsidian 設計的同步服務，其他工具可能會更省事。

這篇文章會整理 Remotely Save 的運作方式、適合哪些人、需要注意什麼，以及 Synch 這類替代方案在什麼情況下更自然。

![連接到多個自帶儲存後端的 Obsidian vault](./remotely-save-storage-options.webp)

## Remotely Save 是什麼？

[Remotely Save](https://github.com/remotely-save/remotely-save) 是一個非官方 Obsidian 社群外掛，用來在本機 vault 和遠端雲端儲存之間同步筆記。

它不是 Obsidian 官方的 Sync 服務。它以外掛形式在 Obsidian 裡執行，並使用你選擇的儲存服務作為遠端同步位置。

基本模型可以這樣看：

```txt
裝置 A 上的 Obsidian vault
        |
Remotely Save 外掛
        |
你選擇的遠端儲存
        |
Remotely Save 外掛
        |
裝置 B 上的 Obsidian vault
```

遠端儲存會成為裝置之間的中繼點。依照設定，它可能是 S3 相容 bucket、WebDAV 伺服器、Dropbox、OneDrive、Google Drive，或其他支援的服務。

## 為什麼有人選 Remotely Save

主要原因是控制權。

使用官方 Obsidian Sync 時，同步服務由 Obsidian 提供。使用 Remotely Save 時，你可以自帶儲存空間。對於已經有信任的雲端帳號、想把資料放在特定位置、或不想依賴單一託管同步產品的人來說，這很有吸引力。

它特別適合這些情況：

- 你想透過已經信任的儲存空間同步 Obsidian
- 你想使用 Cloudflare R2、Backblaze B2、MinIO、Amazon S3 等 S3 相容儲存
- 你想使用自架伺服器、Synology、Nextcloud 或其他 WebDAV 環境
- 你偏好 Obsidian 外掛流程，而不是另外安裝桌面同步工具
- 你希望行動端和桌面端透過同一個外掛同步
- 你願意在真正同步重要 vault 前仔細閱讀設定並測試

對技術使用者來說，這種彈性有時比最簡單的安裝流程更重要。

## 支援的儲存後端

Remotely Save 支援多種儲存後端。實際清單可能隨外掛版本和功能方案變動，但專案文件列出了以下選項。

| 儲存後端 | 為什麼選它 | 主要取捨 |
| --- | --- | --- |
| S3 相容儲存 | 彈性高、成本可控，可用於 R2、B2、MinIO、S3 等服務 | 需要理解 bucket、金鑰、endpoint 和費用 |
| WebDAV | 適合自架服務、NAS、Nextcloud 等環境 | 穩定性很依賴 WebDAV 伺服器品質 |
| Dropbox | 熟悉的通用雲端硬碟 | 依賴的是通用雲端硬碟，不是 Obsidian 專用同步 |
| OneDrive | 對 Microsoft 個人帳號使用者方便 | 免費版使用 App Folder；個人 OneDrive 全域存取是 PRO 功能，Business 帳號不是文件中的主要目標 |
| Google Drive | 很多人已經在使用 | Google Drive 支援是 PRO connect 功能 |
| Box、pCloud、Koofr、Azure Blob 等 | 已經使用這些服務時很方便 | 這些列出的提供商屬於 PRO connect 功能 |

這正是 Remotely Save 和許多 Obsidian 同步替代方案的主要差異。它不只是同步服務，更像是 Obsidian 和多種遠端儲存之間的橋。

這座橋很有用，但橋另一端的儲存系統如何運作，你也需要理解。

## 基本設定流程

不同提供商的細節不同，但大多數 Remotely Save 設定大致如下：

1. 先在同步目標之外備份 Obsidian vault。
2. 從 Obsidian 社群外掛瀏覽器安裝 Remotely Save。
3. 在外掛設定中選擇遠端服務。
4. 輸入憑證、endpoint、bucket、資料夾或授權資訊。
5. 決定是否啟用加密。
6. 決定是否略過大檔案或排除特定路徑。
7. 執行第一次同步。
8. 在其他裝置上安裝並設定外掛。
9. 在多裝置編輯前，確認同一個 vault 能正確顯示。

第一步最重要。任何同步工具都可能快速傳播錯誤。把真實 vault 接入新同步系統之前，應該先在外掛碰不到的位置保留完整副本。

## Remotely Save 的加密

Remotely Save 支援以密碼為基礎的端對端加密。如果你設定了加密密碼，檔案會在送到遠端儲存前被加密。

如果你要把私人筆記放到通用雲端硬碟或物件儲存裡，這是一個重要功能。

但仍然有幾點需要理解：

- 每台裝置上的加密設定都必須正確一致。
- 如果忘記加密密碼，可能無法從遠端儲存恢復已同步資料。
- 某些中繼資料的處理方式可能不同於專門設計的加密同步服務。
- 外掛設定檔可能包含敏感資訊，不應該分享或提交到 Git。

加密不是隨手勾選的選項。它會改變復原模型。真正依賴它之前，先用小 vault 測試，並確認另一台裝置可以正確解密。

## 衝突處理

Obsidian 同步裡的衝突處理，比一般檔案上傳重要得多。

Obsidian vault 會產生很多小變更。你可能在電腦上修改 Markdown 筆記，同時又在手機上改了同一篇。某個外掛可能在另一台裝置上更新設定檔。大附件還在上傳時，另一台裝置可能已經開始編輯相關內容。如果兩台裝置在看到彼此最新狀態前都修改了相關檔案，同步工具就必須決定如何處理。

Remotely Save 提供基本衝突偵測和處理，更進階的 Smart Conflict 行為由 PRO merge 功能提供。它能幫忙，但不能取代良好的同步習慣。

最好避免：

- 在兩台裝置上大量編輯同一篇筆記後才同步
- 在同一個 active vault 上同時執行多個同步系統
- 把雲端後端當成完整備份
- 不理解行動端和桌面端差異就同步外掛設定
- 把衝突副本當成無關緊要的小問題

重要 vault 必須有獨立備份。同步讓裝置保持一致。備份是在錯誤狀態被同步出去後可以回到的地方。

![兩台裝置同時編輯同一個 Obsidian vault 時的衝突風險](./sync-conflict-risk.webp)

## 行動端同步

Remotely Save 支援 Obsidian 行動端，這也是它受歡迎的原因之一。

很多通用檔案同步工具在桌面端還可以，但在手機和平板上會受限。Android 和 iOS 都限制背景活動、檔案存取和長時間任務。執行在 Obsidian 內部的外掛，往往比單獨的檔案同步 App 更容易使用。

不過行動端仍然有現實限制：

- 同步通常在 Obsidian 開啟時更可靠。
- 大檔案在行動端可能很慢，甚至出問題。
- OAuth 和登入流程可能因平台而異。
- 行動網路切換可能中斷長時間同步。
- 各裝置上的外掛設定需要保持一致。

對於以 Markdown 為主的小 vault，這可能完全夠用。對於包含大量附件、大 PDF、錄音檔，或經常跨裝置編輯的 vault，應該先認真測試，再把它當成主要同步方案。

## Remotely Save vs Obsidian Sync

Remotely Save 和 Obsidian Sync 解決的問題有重疊，但承諾不同。

| 方案 | 最適合 | 優勢 | 取捨 |
| --- | --- | --- | --- |
| Remotely Save | 想自帶儲存的使用者 | 儲存提供商選擇彈性高 | 設定和後端責任更多 |
| Obsidian Sync | 想要官方整合服務的使用者 | 體驗成熟，和 Obsidian 整合好 | 付費訂閱和專有託管服務 |

如果你想要最少摩擦，Obsidian Sync 通常更容易推薦。它由 Obsidian 團隊建立，並直接整合在 App 裡。

如果你更在意自己選擇儲存提供商，Remotely Save 更彈性。

## Remotely Save vs Syncthing

Syncthing 也是同步 Obsidian vault 的常見免費選擇。它是開源的，並採用點對點模式，也就是裝置之間可以直接同步，不需要中央雲端儲存。

這對桌面到桌面的環境很強。

取捨在於可用性。裝置通常需要在合適的時間在線。行動端設定也可能更彆扭，尤其是你希望整個體驗自然地留在 Obsidian 裡時。

Remotely Save 使用遠端儲存作為中繼站。Syncthing 使用裝置到裝置同步。哪一個更好，取決於你更喜歡雲端中繼，還是點對點。

## Remotely Save vs Self-hosted LiveSync

Self-hosted LiveSync 是一個強大的 Obsidian 同步外掛，適合想要更進階自託管同步系統的使用者。如果你能執行並維護後端基礎設施，它可以很有吸引力。

和 Remotely Save 相比，Self-hosted LiveSync 對同步架構更有自己的模型。Remotely Save 的優勢是儲存後端選擇更廣。LiveSync 在你接受它的模型並能正確維運時會更強。

對非技術使用者來說，兩者都可能比預期更像是在維護基礎設施。

## 什麼時候 Remotely Save 很適合

如果你喜歡自己配置同步堆疊，Remotely Save 值得考慮。

它適合這些情況：

- 你已經有偏好的儲存提供商
- 你想使用 S3、R2、B2、MinIO、WebDAV 或其他特定後端
- 你能管理憑證和外掛設定
- 你理解同步不是備份
- 你願意先用 vault 副本測試
- 你想使用社群外掛，而不是專門的託管同步服務

在這些情境下，Remotely Save 可能正是你需要的工具。

## 什麼時候 Remotely Save 可能不適合

如果你的真正目標只是「盡量少設定，讓 Obsidian 私密同步」，Remotely Save 可能不是最合適的選擇。

如果你符合下面這些情況，可以考慮其他方案：

- 不想選擇或設定儲存後端
- 不想管理存取金鑰、WebDAV URL、bucket 或服務專屬設定
- 想要圍繞 Obsidian vault 行為設計的同步服務
- 想在不使用官方 Obsidian Sync 的情況下使用託管同步
- 希望多裝置啟用和復原流程更簡單

區別很清楚：

Remotely Save 是給願意自帶儲存的人使用的彈性同步外掛。

這和想要一個開箱即用的 Obsidian 同步服務並不是同一件事。

## 更簡單的替代方案：Synch

如果你喜歡 Remotely Save 的私密同步方向，但不想自己選擇和設定後端，可以考慮 [Synch](https://synch.run/)。

Synch 是為 Obsidian 使用者建立的開源端對端加密同步服務。它不要求你自帶儲存提供商再接入外掛，而是提供託管同步層，並直接圍繞 Obsidian vault 工作流程設計。

可以這樣選：

| 選擇 Remotely Save，如果... | 選擇 Synch，如果... |
| --- | --- |
| 你想自帶儲存 | 你想要託管 Obsidian 同步 |
| 你熟悉提供商設定 | 你想減少設定 |
| 你已經使用 S3、WebDAV、Dropbox 等後端 | 你想要圍繞 vault 設計的服務 |
| 你最重視後端彈性 | 你想要更簡單的加密同步路徑 |

Remotely Save 仍然很適合想控制儲存層的使用者。Synch 更適合那些真正想要私密 Obsidian 同步，而不是把選擇儲存變成另一個專案的人。

![透過託管服務加密同步到多台裝置的 Obsidian vault](./hosted-encrypted-sync.webp)

## 實用安全清單

無論選擇哪種同步方式，在連接重要 vault 前都建議做到：

- 第一次同步前做完整備份。
- 先用小 vault 測試。
- 不要在同一個 active vault 上執行兩個同步工具。
- 在第二台裝置上確認加密和解密都正常。
- 不要把憑證和外掛設定提交到 Git。
- 觀察 `.obsidian` 設定會如何同步。
- 即使同步看起來正常，也保留獨立備份。

最後一點不是可選項。同步工具的目標是讓裝置達成一致。如果錯誤刪除或空檔案成了共同狀態，你需要一個在同步循環之外的備份。

## 總結

Remotely Save 是一個很有價值的 Obsidian 同步外掛，因為它給你選擇權。你可以連接已經使用的儲存空間，設定加密，在桌面和行動端同步，並避免被鎖定在一個官方服務裡。

但這種選擇也帶來責任。你需要選擇後端、正確設定、理解限制，並測試復原路徑。

如果你想要這種控制權，Remotely Save 值得認真考慮。

如果你主要想要的是移動部件更少的私密託管端對端加密 Obsidian 同步，Synch 可能是更簡單的選擇。
