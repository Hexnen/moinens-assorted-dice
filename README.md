# Moinen's Assorted Dice

Custom 3D dice for [Dice So Nice!](https://foundryvtt.com/packages/dice-so-nice/) in Foundry VTT — **one
module that serves the dice set matching your game system automatically.**

When you roll in a world, the module looks at `game.system.id` and makes the matching set the default
(Dice So Nice "preferred"), while keeping every set available in the Dice So Nice library so you can
always pick another. All sets appear under one **Moinen's Assorted Dice** heading in the DSN UI.

## Included sets

Auto-preferred by game system:

| Game system (`id`) | Set | Look |
| --- | --- | --- |
| Stonetop (`stonetop`) | Stonetop | Carved parchment-stone faces |
| Mythic Bastionland (`mythicbastionland`) | Mythic Bastionland | Illuminated-manuscript parchment with gold/green foliate borders |
| Salvage Union (`salvage-union`) | Salvage Union | Weathered sky-blue salvage-crate faces with rust-orange stamped numerals |

Always available in the Dice So Nice library (extra looks, not tied to a system):

| Set | Look |
| --- | --- |
| Stonetop (Brown) | The carved-stone faces tinted to a darker brown stone |
| Stonetop (Brown Body) | Original stone faces on a recolourable brown die body |
| Stonetop Bone | Aged ivory/bone faces, carved beaded-rope border, spiral-pip d6, rune numerals |
| Stonetop Amber | The bone faces with a glossy translucent amber (resin) finish |

Each set covers d4, d6, d8, d10, d12, d20 (Stonetop variants also d2), with per-face textures and bump maps.
All sets appear under one **Moinen's Assorted Dice** heading in the Dice So Nice UI.

## Requirements

- Foundry VTT v13+ (verified on v14)
- [Dice So Nice!](https://foundryvtt.com/packages/dice-so-nice/) (required)

## Install

Paste this manifest URL into Foundry's **Add-on Modules → Install Module**:

```
https://github.com/Hexnen/moinens-assorted-dice/releases/latest/download/module.json
```

Then enable **Moinen's Assorted Dice** in your world. If you previously used the standalone
`stonetop-dice` / `mb-dice` / `salvage-union-dice` modules, **disable them** — this module replaces them
and they register the same Dice So Nice systems.

Reload the world after enabling (Dice So Nice registers presets at world load).

## Credits & legal

Unofficial, fan-made dice skins. Game names, settings and cover/logo artwork are trademarks of their
respective owners and are referenced only as the visual inspiration for these dice. The module **code**
is released under the MIT License (see `LICENSE`). The generated dice textures are provided for personal
use with the respective games.
