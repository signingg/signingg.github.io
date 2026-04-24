# Auction House — PocketMine-MP 3.x commission (2021)

A custom auction house plugin built for a live Minecraft Bedrock server economy. Shipped late 2021, still in production on the original server, and carried on a multi-year iteration loop well past the original delivery.

---

## Situation

A game-server operator running a player-driven economy needed a custom listings and bidding system for a production multiplayer environment. The ecosystem's off-the-shelf options were brittle under load, but the real blockers were architectural: none of them had a persistence or recovery story that could survive what a real production server throws at a plugin — mid-transaction crashes, rename events where the stable identity is a UUID but the display name isn't, disconnects mid-interaction, wallets that can't cover a transaction, items that have nowhere to return to because the destination inventory is full.

## Task

Design the plugin around three concerns from the start: persistence that survives restart, crash, and rename without losing player wealth; a reactive event-driven architecture that handles client state correctly across every disconnect boundary; and a deployment process where the operator could QA on live users, feed bugs back, and see each round land without an engineering redeploy cycle.

## Action

**Data persistence.** Each player's state got its own on-disk record: active listings, a refund pool of outbid money waiting to be claimed, and a rewards pool of items won — all serialized in a deterministic format on logout and on plugin disable, reloaded on the next interaction. Every listing also got a unique identifier written onto every item copy the UI rendered, as metadata attached to the item stack itself. That meant any clicked item at any point in any menu could be resolved back to its source listing — the identity round-trip survived crashes, restarts, and rename events, without needing to keep a separate lookup table in sync.

**Event listening.** Everything was driven by the game's native event model. Inventory transaction events handled every click and dispatched to the right menu flow. Player-join events reconciled persisted state — whose listings are still live? whose refunds are waiting? — on rejoin. Block-place events registered physical in-world billboards. Each live UI ran a repeating update task that observed window state, refreshed countdown timers, and self-cancelled cleanly when the player closed the window or disconnected. Rejection paths — insufficient funds, blacklisted items, permission failures — were each wired to the same close-and-recover pattern so no item ever vanished into a stuck inventory state.

**Process.** Built for iteration from the start. Fees, blacklists, rank-tiered permissions, webhook destinations, and duration caps all lived in config, meaning the operator could tune production behavior without a redeploy. Live QA drove rewrites — the largest being an optimization pass that moved every UI off a flickery form-based path onto chest inventories with sub-2-second live refresh. Each production bug that came back (crash-recovery edge cases, fee-vs-wallet interactions, enforcement corner cases) was folded back into the recovery model as a tightened path or an exposed knob.

## Result

Shipped to live production and has run on the same server continuously since. Player wealth has survived crash recovery, server updates, and rename events on the back of the on-disk plus tagged-identity persistence model. The config-driven surface meant the operator could tune fees, blacklists, and permissions without engineering support. The production feedback loop — bug report, recovery-path tightening, ship, next report — kept the plugin production-grade years past the original delivery date.

---

*The demo below walks through core flows. The build ships more than a short reel can cover: rank-tiered permissions, refund accounting, per-item identity metadata, and a personal player dashboard are all part of the production plugin.*
