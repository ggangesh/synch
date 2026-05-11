---
title: "Obsidian Remotely Save：设置、优缺点和替代方案"
description: "了解 Obsidian 社区插件 Remotely Save 的存储后端、加密、冲突处理、移动端同步，以及它和 Synch 的区别。"
pubDate: 2026-05-11
---

如果你想在不购买官方 Sync 的情况下同步 Obsidian，**Remotely Save** 通常会很快出现在候选列表里。

它受欢迎的原因很直接：你不必被绑定到某一个同步服务，而是可以把 Obsidian vault 接到自己选择的存储上。它支持 S3 兼容存储、WebDAV、Dropbox、OneDrive、Google Drive、Box、pCloud、Koofr、Azure Blob Storage 等后端，其中部分能力取决于功能版本。

它的核心价值是自由。

但自由也意味着你要自己承担设置和维护的责任。

如果你已经知道要把 vault 数据放在哪里，并且愿意仔细配置同步选项，Remotely Save 可能很适合你。如果你真正想要的是一个面向 Obsidian 的简单同步服务，其他工具可能会更省心。

这篇文章会说明 Remotely Save 的工作方式、适合什么人、需要注意什么，以及什么时候 Synch 这样的替代方案会更自然。

![连接到多个自带存储后端的 Obsidian vault](./remotely-save-storage-options.webp)

## Remotely Save 是什么？

[Remotely Save](https://github.com/remotely-save/remotely-save) 是一个非官方 Obsidian 社区插件，用来在本地 vault 和远程云存储之间同步笔记。

它不是 Obsidian 官方的 Sync 服务。它作为插件运行在 Obsidian 里，并使用你选择的存储提供商作为远程同步位置。

基本模型可以这样理解：

```txt
设备 A 上的 Obsidian vault
        |
Remotely Save 插件
        |
你选择的远程存储
        |
Remotely Save 插件
        |
设备 B 上的 Obsidian vault
```

远程存储充当设备之间的中转站。根据你的配置，它可能是 S3 兼容 bucket、WebDAV 服务器、Dropbox、OneDrive、Google Drive，或其他受支持服务。

## 为什么有人选择 Remotely Save

主要原因是控制权。

使用官方 Obsidian Sync 时，同步服务由 Obsidian 提供。使用 Remotely Save 时，你可以自带存储。对于已经有可信云账号、希望数据保存在特定位置、或者不想依赖单一托管同步产品的用户，这很有吸引力。

它尤其适合这些情况：

- 你想通过已经信任的存储来同步 Obsidian
- 你想使用 Cloudflare R2、Backblaze B2、MinIO、Amazon S3 等 S3 兼容存储
- 你想使用自建服务器、Synology、Nextcloud 或其他 WebDAV 环境
- 你更喜欢 Obsidian 插件流程，而不是单独的桌面同步工具
- 你希望移动端和桌面端通过同一个插件同步
- 你愿意在真正同步重要 vault 前仔细阅读设置并测试

对技术用户来说，这种灵活性可能比最简单的安装流程更重要。

## 支持的存储后端

Remotely Save 支持多种存储后端。具体列表会随插件版本和功能版本变化，但项目文档列出了以下选择。

| 存储后端 | 为什么选择它 | 主要取舍 |
| --- | --- | --- |
| S3 兼容存储 | 灵活、价格可控，可用于 R2、B2、MinIO、S3 等服务 | 需要理解 bucket、密钥、endpoint 和费用 |
| WebDAV | 适合自建服务、NAS、Nextcloud 等环境 | 稳定性很依赖 WebDAV 服务器质量 |
| Dropbox | 熟悉的通用云盘 | 依赖的是通用云盘，不是 Obsidian 专用同步 |
| OneDrive | 对 Microsoft 个人账号用户方便 | 免费版使用 App Folder；个人 OneDrive 全盘访问是 PRO 功能，Business 账号不是文档中的主要目标 |
| Google Drive | 很多人已经在用 | Google Drive 支持是 PRO connect 功能 |
| Box、pCloud、Koofr、Azure Blob 等 | 已经使用这些服务时很方便 | 这些列出的提供商属于 PRO connect 功能 |

这正是 Remotely Save 和许多 Obsidian 同步替代方案的主要区别。它不只是一个同步服务，更像是 Obsidian 和多种远程存储之间的桥。

这座桥很有用，但桥另一端的存储系统如何工作，你也需要理解。

## 基本设置流程

不同提供商的细节不同，但大多数 Remotely Save 配置大致是这样：

1. 先在同步目标之外备份 Obsidian vault。
2. 从 Obsidian 社区插件浏览器安装 Remotely Save。
3. 在插件设置里选择远程服务。
4. 输入凭据、endpoint、bucket、文件夹或授权信息。
5. 决定是否启用加密。
6. 决定是否跳过大文件或排除某些路径。
7. 执行第一次同步。
8. 在其他设备上安装并配置插件。
9. 在多设备编辑前，确认同一个 vault 能正确显示。

第一步最重要。任何同步工具都可能快速传播错误。把真实 vault 接入新同步系统前，应该先在插件无法触及的位置保留一份完整副本。

## Remotely Save 的加密

Remotely Save 支持基于密码的端到端加密。如果你设置了加密密码，文件会在发送到远程存储前被加密。

如果你要把私人笔记放到通用云盘或对象存储里，这是一个重要功能。

但仍然有一些细节需要注意：

- 每台设备上的加密设置都必须正确一致。
- 如果忘记加密密码，可能无法从远程存储恢复已同步数据。
- 某些元数据的处理方式可能不同于专门设计的加密同步服务。
- 插件设置文件可能包含敏感信息，不应该分享或提交到 Git。

加密不是一个随手勾选的选项。它会改变恢复模型。真正依赖它之前，先用小 vault 测试，并确认另一台设备可以正确解密。

## 冲突处理

Obsidian 同步里的冲突处理，比普通文件上传重要得多。

Obsidian vault 会产生很多细小变化。你可能在电脑上修改一个 Markdown 笔记，同时又在手机上改了同一篇。某个插件可能在另一台设备上更新设置文件。一个大附件还在上传时，另一台设备已经开始编辑相关内容。如果两台设备在看到彼此最新状态前都修改了相关文件，同步工具就必须决定如何处理。

Remotely Save 提供基础冲突检测和处理，更高级的 Smart Conflict 行为由 PRO merge 功能提供。它能帮忙，但不能替代良好的同步习惯。

最好避免：

- 在两台设备上大量编辑同一篇笔记后才同步
- 在同一个 active vault 上同时运行多个同步系统
- 把云端后端当作完整备份
- 不理解移动端和桌面端差异就同步插件设置
- 把冲突副本当作无关紧要的小问题

重要 vault 必须有独立备份。同步让设备保持一致。备份是在错误状态被同步出去后可以回到的地方。

![两台设备同时编辑同一个 Obsidian vault 时的冲突风险](./sync-conflict-risk.webp)

## 移动端同步

Remotely Save 支持 Obsidian 移动端，这也是它受欢迎的原因之一。

很多通用文件同步工具在桌面端还可以，但在手机和平板上会受限。Android 和 iOS 都限制后台活动、文件访问和长时间任务。一个运行在 Obsidian 内部的插件，往往比单独的文件同步应用更容易使用。

不过移动端仍然有现实限制：

- 同步通常只有在 Obsidian 打开时更可靠。
- 大文件在移动端可能很慢，甚至出问题。
- OAuth 和登录流程可能因平台而异。
- 移动网络切换可能中断长时间同步。
- 各设备上的插件设置需要保持一致。

对于以 Markdown 为主的小 vault，这可能完全够用。对于包含大量附件、大 PDF、录音文件，或者经常跨设备编辑的 vault，应该先认真测试，再把它当作主要同步方案。

## Remotely Save vs Obsidian Sync

Remotely Save 和 Obsidian Sync 解决的问题有重叠，但承诺不同。

| 方案 | 最适合 | 优势 | 取舍 |
| --- | --- | --- | --- |
| Remotely Save | 想自带存储的用户 | 存储提供商选择灵活 | 设置和后端责任更多 |
| Obsidian Sync | 想要官方集成服务的用户 | 体验成熟，和 Obsidian 集成好 | 付费订阅和专有托管服务 |

如果你想要最少摩擦，Obsidian Sync 通常更容易推荐。它由 Obsidian 团队构建，并直接集成在应用里。

如果你更在意自己选择存储提供商，Remotely Save 更灵活。

## Remotely Save vs Syncthing

Syncthing 也是同步 Obsidian vault 的常见免费选择。它是开源的，并采用点对点模式，也就是设备之间可以直接同步，不需要中央云存储。

这对桌面到桌面的环境很强。

取舍在于可用性。设备通常需要在合适的时间在线。移动端设置也可能更别扭，尤其是你希望整个体验自然地留在 Obsidian 内部时。

Remotely Save 使用远程存储作为中转站。Syncthing 使用设备到设备同步。哪一个更好，取决于你更喜欢云端中转，还是点对点。

## Remotely Save vs Self-hosted LiveSync

Self-hosted LiveSync 是一个强大的 Obsidian 同步插件，适合想要更高级自托管同步系统的用户。如果你能运行并维护后端基础设施，它可以很有吸引力。

和 Remotely Save 相比，Self-hosted LiveSync 对同步架构更有自己的模型。Remotely Save 的优势是存储后端选择更广。LiveSync 在你接受它的模型并能正确运维时会更强。

对非技术用户来说，两者都可能比预期更像是在维护基础设施。

## 什么时候 Remotely Save 很适合

如果你喜欢自己配置同步栈，Remotely Save 值得考虑。

它适合这些情况：

- 你已经有偏好的存储提供商
- 你想使用 S3、R2、B2、MinIO、WebDAV 或其他特定后端
- 你能管理凭据和插件设置
- 你理解同步不是备份
- 你愿意先用 vault 副本测试
- 你想使用社区插件，而不是专门的托管同步服务

在这些场景下，Remotely Save 可能正是你需要的工具。

## 什么时候 Remotely Save 可能不合适

如果你的真实目标只是“尽量少配置，让 Obsidian 私密同步”，Remotely Save 可能不是最合适的选择。

如果你符合下面这些情况，可以考虑其他方案：

- 不想选择或配置存储后端
- 不想管理访问密钥、WebDAV URL、bucket 或服务专属设置
- 想要围绕 Obsidian vault 行为设计的同步服务
- 想在不使用官方 Obsidian Sync 的情况下使用托管同步
- 希望多设备启用和恢复流程更简单

区别很清楚：

Remotely Save 是给愿意自带存储的人使用的灵活同步插件。

这和想要一个开箱即用的 Obsidian 同步服务并不是同一件事。

## 更简单的替代方案：Synch

如果你喜欢 Remotely Save 的私密同步方向，但不想自己选择和配置后端，可以考虑 [Synch](https://synch.run/)。

Synch 是为 Obsidian 用户构建的开源端到端加密同步服务。它不要求你自带存储提供商再接入插件，而是提供托管同步层，并直接围绕 Obsidian vault 工作流设计。

可以这样选择：

| 选择 Remotely Save，如果... | 选择 Synch，如果... |
| --- | --- |
| 你想自带存储 | 你想要托管 Obsidian 同步 |
| 你熟悉提供商配置 | 你想减少设置 |
| 你已经使用 S3、WebDAV、Dropbox 等后端 | 你想要围绕 vault 设计的服务 |
| 你最看重后端灵活性 | 你想要更简单的加密同步路径 |

Remotely Save 仍然很适合想控制存储层的用户。Synch 更适合那些真正想要私密 Obsidian 同步，而不是把选择存储变成另一个项目的人。

![通过托管服务加密同步到多台设备的 Obsidian vault](./hosted-encrypted-sync.webp)

## 实用安全清单

无论选择哪种同步方式，在连接重要 vault 前都建议做到：

- 第一次同步前做完整备份。
- 先用小 vault 测试。
- 不要在同一个 active vault 上运行两个同步工具。
- 在第二台设备上确认加密和解密都正常。
- 不要把凭据和插件设置提交到 Git。
- 观察 `.obsidian` 设置会如何同步。
- 即使同步看起来正常，也保留独立备份。

最后一点不是可选项。同步工具的目标是让设备达成一致。如果错误删除或空文件成了共同状态，你需要一个在同步循环之外的备份。

## 总结

Remotely Save 是一个很有价值的 Obsidian 同步插件，因为它给你选择权。你可以连接已经使用的存储，配置加密，在桌面和移动端同步，并避免被锁定在一个官方服务里。

但这种选择也带来责任。你需要选择后端、正确配置、理解限制，并测试恢复路径。

如果你想要这种控制权，Remotely Save 值得认真考虑。

如果你主要想要的是移动部件更少的私密托管端到端加密 Obsidian 同步，Synch 可能是更简单的选择。
