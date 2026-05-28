---
title: "How to Sync Obsidian Between iPhone and Android"
description: "Learn how to sync Obsidian between iPhone and Android with Obsidian Sync, Synch, iCloud, Google Drive, Syncthing, Git, and other options."
pubDate: 2026-05-28
---

If you want to sync Obsidian between **iPhone and Android**, the practical answer is: use Obsidian Sync if you want the official option, use Synch if you want a private end-to-end encrypted alternative, and be careful with iCloud, Google Drive, Syncthing, or Git because mobile file access is not the same on both platforms.

Obsidian stores your notes as local Markdown files. That is one of its biggest strengths. Your vault is not locked inside a database, and you can copy it, back it up, or inspect it with normal tools.

But that local-first design also means sync has to handle a real folder with notes, attachments, plugin settings, themes, snippets, and the `.obsidian` configuration folder. On iPhone and Android, that folder does not behave the same way.

## Why iPhone and Android Sync Is Harder Than It Looks

On desktop, syncing Obsidian is often straightforward. You can put a vault in a synced folder, open it in Obsidian, and let the sync tool move files in the background.

Mobile is different.

iPhone and iPad use Apple's Files system and app sandboxing. iCloud Drive works naturally inside the Apple ecosystem, but it is not a normal shared folder that Android can use as an Obsidian vault.

Android gives users more direct access to local folders, so tools like Syncthing can be practical. But Android also has battery optimization, background execution limits, and storage permission rules that can delay or block sync.

That is why a method that works well on iPhone may be awkward on Android, and a method that works well on Android may not be realistic on iPhone.

## Quick Recommendation

| Method | Best For | Privacy | Ease |
| --- | --- | --- | --- |
| Obsidian Sync | Users who want the official integrated service | End-to-end encrypted | Easy |
| Synch | Users who want a private hosted alternative | End-to-end encrypted | Easy |
| iCloud | Apple-only setups | Depends on Apple account and settings | Easy on Apple devices |
| Google Drive, Dropbox, OneDrive | Desktop-heavy workflows | Depends on provider | Mixed on mobile |
| Syncthing | Technical Android-heavy setups | Private peer-to-peer | Medium to hard |
| Git | Developers who want version control | Depends on remote and setup | Hard |

For most people who use both iPhone and Android, the cleanest choice is an Obsidian-focused sync service. General cloud drives and folder sync tools can work, but they usually require more attention.

## Before You Sync: Back Up Your Vault

Before connecting any sync tool, make a copy of your vault.

Your vault is just a folder. Copy it somewhere outside the sync setup, such as another local folder, an external drive, or a separate backup location.

The first sync is the riskiest moment. If one device uploads an old copy, another device starts from an empty folder, or the wrong folder gets connected, a backup gives you a way back.

Also decide what to do with the `.obsidian` folder. It contains plugins, themes, hotkeys, snippets, workspace state, and app settings. Syncing it can make devices feel consistent, but some desktop plugins or layouts may not make sense on mobile.

If you are not sure, start with your notes and attachments first. Then sync settings only after you know the basic vault sync is stable.

## Option 1: Obsidian Sync

[Obsidian Sync](https://obsidian.md/sync) is the official sync service for Obsidian.

For an iPhone and Android setup, it is the easiest recommendation if you want the most integrated experience. It works inside Obsidian, supports end-to-end encryption, and includes features such as version history and selective sync.

The main advantage is that you do not need to make iCloud, Google Drive, Android storage, or a third-party file sync tool behave like an Obsidian-aware sync layer. Obsidian Sync is built for this exact job.

The tradeoff is price. If the official subscription fits your budget, it is usually the lowest-friction option.

## Option 2: Synch

Synch is an open-source, end-to-end encrypted sync service for Obsidian.

It is designed for users who want private hosted sync without depending on a general-purpose cloud drive and without running their own peer-to-peer setup.

That matters for iPhone and Android because the hard part is not just moving files. The hard part is making sync feel reliable across two mobile platforms with different file systems and background behavior.

With Synch, vault data is encrypted on your device before it is uploaded. The server stores encrypted data, not readable notes. The sync workflow is built around Obsidian vaults rather than generic folders.

Synch is a good fit if:

- You use both iPhone and Android
- You want end-to-end encrypted hosted sync
- You want something simpler than Syncthing or Git
- You do not want to depend on iCloud, Google Drive, Dropbox, or OneDrive
- You want an open-source alternative to Obsidian Sync

If you are choosing between Obsidian Sync and Synch, choose Obsidian Sync for the official built-in service. Choose Synch if you want an open-source, private, end-to-end encrypted alternative with a hosted workflow.

## Option 3: iCloud

iCloud is a good fit when all of your devices are Apple devices.

If your setup is Mac, iPhone, and iPad, iCloud Drive can be enough for a simple Obsidian vault. Many users start there because it is already available and requires little setup.

But iCloud is not a good answer for syncing Obsidian between iPhone and Android.

The problem is not just whether Android can access iCloud files somehow. The problem is whether Android can use an iCloud-backed folder as a reliable local Obsidian vault with offline access, background sync, and predictable conflict behavior.

For most users, that is not a setup worth relying on.

Use iCloud for Apple-only Obsidian workflows. If Android is part of your daily setup, choose another method.

## Option 4: Google Drive, Dropbox, or OneDrive

Cloud drives are familiar, but Obsidian mobile sync asks more from them than ordinary document storage does.

Obsidian expects a local vault folder it can read and write reliably. On mobile, cloud drive apps often expose files through their own app, a file picker, or an offline cache. That is not always the same as giving Obsidian a normal always-available folder.

Android is usually more flexible than iPhone here, but the result depends on the provider, offline settings, storage permissions, and third-party helper apps.

The common risks are:

- Files may not be available when Obsidian expects them
- Uploads or downloads may happen late
- Two devices may edit before sync finishes
- Attachments may arrive after the notes that reference them
- `.obsidian` settings may behave differently across devices

Cloud drives can be acceptable if you mostly edit on one device and use the other for reading. They are less ideal for daily two-way editing between iPhone and Android.

## Option 5: Syncthing

[Syncthing](https://syncthing.net/) is a popular free peer-to-peer sync tool.

On Android, Syncthing can be a strong option. Android gives enough folder access for many users to sync an Obsidian vault directly between devices.

On iPhone, the story is different. iOS restrictions make a normal Syncthing-style folder sync workflow much harder. There are third-party approaches, but they are not as simple or predictable as the Android experience.

Syncthing is worth considering if your setup is mostly desktop and Android, and you are comfortable managing devices, folders, network availability, and conflicts.

For iPhone and Android together, it is usually not the easiest path.

## Option 6: Git

Git can sync Obsidian notes because Markdown files work well with version control.

For developers, Git can be attractive. You get commits, history, diffs, and explicit control over changes.

But Git is not a seamless mobile sync solution for most people. You need to handle commits, pulls, pushes, authentication, merge conflicts, and sometimes a Git plugin or mobile Git app. Large attachments can also make the repository unpleasant to manage.

Use Git if you want version control and already understand the workflow. If your goal is to open Obsidian on iPhone and Android and keep writing, Git is usually too much work.

## Common Problems

The most common problem is editing before the first sync finishes. If your Android phone has not downloaded the latest note yet and your iPhone edits the same note, you can create duplicates or conflicts.

Attachments can also lag behind notes. A Markdown file may arrive quickly, while an image, PDF, audio file, or video takes longer. Until the attachment arrives, the note may look broken.

Plugin settings are another source of friction. A desktop plugin may not work on mobile. A workspace layout that feels right on iPad may be awkward on an Android phone. Syncing the entire `.obsidian` folder is convenient, but it is not always the safest default.

Do not run multiple sync tools on the same active vault. For example, do not put a vault inside iCloud Drive while also syncing it through another Obsidian sync service. Mixing sync layers is one of the easiest ways to create confusing conflicts.

## FAQ

### Can I sync Obsidian between iPhone and Android for free?

Yes, but free options usually involve tradeoffs. Syncthing is strong on Android but difficult on iPhone. Git can work for technical users but is not seamless. Cloud drives may need extra tools or manual habits. If you want the easiest experience, use a sync service designed for Obsidian.

### Can I use iCloud to sync Obsidian with Android?

For most users, no. iCloud is reasonable for Apple-only Obsidian workflows, but it is not a clean cross-platform sync layer for Android.

### Can I use Google Drive to sync Obsidian between iPhone and Android?

It may be possible with extra tools or manual workflows, but it is not the most reliable setup. Obsidian needs dependable local file access, and mobile cloud drive apps do not always provide that in the way Obsidian expects.

### Does Syncthing work with iPhone?

Syncthing is much more practical on Android than on iPhone. iOS file system restrictions make a normal Syncthing-style setup difficult.

### Should I sync the `.obsidian` folder?

Sync it if you want settings, themes, hotkeys, and plugins to stay similar across devices. Do not sync it blindly if you want different mobile and desktop setups, or if some plugins behave badly on mobile.

### Is Synch an alternative to Obsidian Sync?

Yes. Synch is built as an open-source, end-to-end encrypted Obsidian Sync alternative. It is especially relevant if you want private hosted sync without using a general cloud drive or managing your own peer-to-peer setup.

## Final Recommendation

Syncing Obsidian between iPhone and Android is possible, but the best method depends on how much setup you want to manage.

Use Obsidian Sync if you want the official integrated option.

Use Synch if you want an open-source, end-to-end encrypted Obsidian Sync alternative with a hosted workflow.

Use iCloud only for Apple-only setups. Use Syncthing if you are technical and mostly rely on Android or desktop. Use Git if you want version control and are comfortable resolving conflicts yourself.

For most iPhone and Android users, the long-term answer is to choose a sync tool built for Obsidian instead of forcing a general cloud drive or file sync tool into a mobile workflow.
