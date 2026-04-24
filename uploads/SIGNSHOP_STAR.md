# SignShop — PocketMine-MP 3.x commission (2021)

A custom sign-based shop plugin built for the same live Minecraft Bedrock server as the Auction House commission. Shipped late 2021, still in production, and carried on a multi-year iteration loop with the operator past the original delivery.

---

## Situation

The same server operator needed a faster way for players to trade raw materials in bulk — shops placed anywhere in the world via ordinary signs, no menu navigation, no chest-UI indirection. A specific prior failure was on the table: a competing plugin had been installed, the server restarted, and every placed shop sign had vanished because the plugin's persistence had been wiped on reload. "Where does the data actually live" was not a theoretical question. A database-backed design was initially on the table and was deliberately rejected after pushback — it would have introduced schema migrations, a connection pool, and an orphaned-record class of failures for what was structurally a set of self-describing records placed in the world.

## Task

Build the system around a data-management choice that eliminated an entire class of plugin-side staleness failures: make every shop sign its own self-describing record embedded directly in the world's own save file. On top of that, layer a timed server-wide sell-multiplier system for promotional events — and make sure the multiplier state survived logout, crash, and rejoin without drift.

## Action

**Data persistence.** Rather than maintaining a separate database of `(world, coordinates) → (item, price)` records, each shop sign rewrites itself as a custom tile subclass at creation time, with the shop's type, item, and price written into the tile's own persisted metadata. The world save *is* the persistence layer — the tiles deserialize with the world chunk, the shops are immediately interactive on server boot, and there's no orphaned-record cleanup path because orphaned records can't exist. The plugin's only side-tables are a small config file for cosmetic item-name overrides and a per-player file for active boost state (expiration timestamp + multiplier amount).

**Event listening.** The plugin is event-driven end to end. Player-interact events handle every sign tap, gated by a per-player cooldown to prevent rapid-click exploits. Player-join events reconcile active boosts against wall-clock time: if the boost expired while the player was offline, it's cleared and the player is messaged; if it's still active, the booster task is rescheduled with the remaining time. A repeating scheduled task expires boosts in real-time during active sessions. Sign creation uses a per-player session pattern — an admin arms a session via a command, and the next plain sign they tap is consumed and rewrapped into the shop tile in a single transaction, with parallel session types kept isolated so they can't collide on the same player.

**Process.** Shipped against a written spec and maintained on a long iteration loop with the operator. Cosmetic display names were made config-driven from day one so signs could be re-skinned without redeploys. Production bugs — most visibly a null-player crash in the boost-expiry task months after delivery — were diagnosed from stack traces forwarded from the live server and fixed inline. The "world tile is the record" architectural choice was validated over years of zero "signs disappeared after restart" reports, which was the exact failure mode the design was chosen to prevent.

## Result

Shipped alongside the auction-house work and has run on the operator's server since, with every placed shop sign surviving every restart the operator has put the server through — the exact thing the architecture was designed to make impossible to break. Boost state survived logout and rejoin via on-disk storage plus the join-time reconciliation pass. The operator and their staff have added hundreds of shop signs over the years without editing a single config file. The long iteration loop produced a plugin that's still carrying the server's raw-material economy today.

---

*The demo below walks through core flows. The build ships more than a short reel can cover: per-player targeted boosts, state reconciliation on rejoin, config-driven cosmetics, and the in-place tile-rewrap pattern are all part of the production plugin.*
