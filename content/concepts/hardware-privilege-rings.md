---
title: Hardware Privilege Rings
tags:
  - hardware
  - security
  - firmware
hardwareRings: true
---

Every modern computer enforces a hierarchy of **privilege levels** — concentric layers
of control where each inner layer can see and override everything above it, but not the
reverse. Most people only ever interact with the outermost layer: the applications they
run. Underneath sit the kernel, firmware, and a set of management processors that are
effectively invisible to the operating system itself.

The classic teaching model is the **x86 protection rings** (Ring 0–3). Reality is deeper.
Below the kernel live the hypervisor (Ring −1), System Management Mode (Ring −2), and the
platform's management engine — Intel ME or AMD PSP (Ring −3) — a separate computer inside
your computer that runs before, during, and after the main CPU, and which you cannot
audit or disable on consumer hardware.

## Why it matters

- **Trust is transitive and one-directional.** A higher ring must trust every layer beneath
  it, and has no technical mechanism to verify them. If a lower layer lies, everything above
  inherits the lie — silently.
- **The most powerful code is the least auditable.** Userspace (Ring 3) is the only layer you
  can fully observe. The deeper you go, the more absolute the power and the more opaque the
  implementation.
- **Persistence lives below the OS.** A rootkit in UEFI/SMM or drive firmware survives a full
  format and OS reinstall, because the implant is not in the OS at all.

## How to read the diagram

The interactive figure below has four views:

- **Privilege Rings** — the layered model as a downward-tapering cone; click any ring to
  read what runs there and why it matters.
- **Boot Sequence** — what actually executes, in order, from power-on to userspace, for both
  a PC (UEFI / x86-64) and a smartphone (ARM). Click a step to expand the detail.
- **Devices** — how these firmware layers map onto everyday hardware: laptops, phones,
  servers, drives, routers, TVs, printers, and wearables.
- **Trust Chain** — the chain of entities you implicitly trust every time you power on,
  from the silicon foundry down to you.

> [!note] Common-diagram correction
> Ring −2 is **SMM (System Management Mode)**, a special CPU execution mode invisible to the
> hypervisor and OS — not UEFI itself. UEFI runs during boot; SMM persists at runtime.
