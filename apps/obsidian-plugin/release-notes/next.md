# Next Obsidian plugin release

## Fixed

- Mobile (Android) sync no longer fails with "not able to create file" when filenames contain characters invalid on the Android filesystem (`\:*?"<>|`). Invalid characters are automatically replaced with underscores.
- Sync on Android devices is now resilient to individual file write failures — a single file that cannot be written no longer aborts the entire sync batch, preventing infinite retry loops.
- Directory creation on mobile devices is more robust, falling back to an Obsidian API method when the filesystem adapter fails.
