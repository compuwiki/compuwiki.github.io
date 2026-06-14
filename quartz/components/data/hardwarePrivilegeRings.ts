// Single source of truth for the Hardware Privilege Hierarchy figure.
// Imported by both HardwarePrivilegeRings.tsx (server render) and
// scripts/hardwarePrivilegeRings.inline.ts (client info-panel) so the
// ring data is defined exactly once. Keep this module free of JSX /
// preact imports so it bundles cleanly into the client inline script.

/** Privilege levels that map to a color class (.lc-3 … .lc3). */
export type RingLevel = -3 | -2 | -1 | 0 | 3

/** Stable ids for the six rings in panel 1 (also used as color classes). */
export type RingId = "r3" | "r1" | "r0" | "rm1" | "rm2" | "rm3"

/** Resolve a ring level to its scoped color helper class. */
export function lc(level?: RingLevel): string {
  switch (level) {
    case 3:
      return "lc3"
    case 0:
      return "lc0"
    case -1:
      return "lc-1"
    case -2:
      return "lc-2"
    case -3:
      return "lc-3"
    default:
      return ""
  }
}

// ─── Panel 1: ring geometry (drawn outermost → innermost) ───
export interface RingShape {
  id: RingId
  cx: number
  cy: number
  rx: number
  ry: number
  strokeWidth: number
  dash?: string
  glow?: boolean
  name: string
  desc: string
}

export const RING_SHAPES: RingShape[] = [
  {
    id: "r3",
    cx: 250,
    cy: 55,
    rx: 210,
    ry: 24,
    strokeWidth: 1.5,
    name: "Ring 3",
    desc: "Userspace / Apps",
  },
  {
    id: "r1",
    cx: 250,
    cy: 105,
    rx: 168,
    ry: 19,
    strokeWidth: 1.2,
    dash: "5,4",
    name: "Ring 1 / 2",
    desc: "Rarely used (x86)",
  },
  {
    id: "r0",
    cx: 250,
    cy: 150,
    rx: 130,
    ry: 15,
    strokeWidth: 1.8,
    name: "Ring 0",
    desc: "Kernel · Drivers · Anticheat",
  },
  {
    id: "rm1",
    cx: 250,
    cy: 190,
    rx: 96,
    ry: 11,
    strokeWidth: 1.8,
    name: "Ring −1",
    desc: "Hypervisor (VMX)",
  },
  {
    id: "rm2",
    cx: 250,
    cy: 225,
    rx: 66,
    ry: 8,
    strokeWidth: 2,
    name: "Ring −2",
    desc: "SMM · UEFI/iBoot",
  },
  {
    id: "rm3",
    cx: 250,
    cy: 255,
    rx: 41,
    ry: 6,
    strokeWidth: 2.2,
    glow: true,
    name: "Ring −3",
    desc: "ME · PSP · Bootrom",
  },
]

// ─── Panel 1: ring detail (info panel + click-to-explore script) ───
export interface RingInfo {
  badge: string
  title: string
  desc: string
  tags: string[]
}

export const RING_INFO: Record<RingId, RingInfo> = {
  rm3: {
    badge: "Ring −3",
    title: "Intel ME / AMD PSP / Bootrom",
    desc: 'The absolute core. A separate microprocessor inside your CPU running its own OS (Intel ME uses MINIX). Always active — even when your PC is "off" in standby. Has its own RAM, its own network stack, and direct access to all system memory. The main CPU physically refuses to boot without a handshake from the ME. You cannot disable or audit it on any modern consumer hardware.',
    tags: ["Intel ME", "AMD PSP", "ARM Bootrom", "MINIX", "Always-on", "Inauditable", "Ring −3"],
  },
  rm2: {
    badge: "Ring −2",
    title: "SMM — System Management Mode + UEFI",
    desc: "SMM is a special CPU execution mode triggered by hardware interrupts (SMI). It runs in a protected memory region (SMRAM) that is completely invisible to the OS, hypervisors, antivirus, and anticheats. Used for power management, hardware emulation, and legacy compatibility. UEFI runs at boot to initialize hardware and verify the Secure Boot chain. A rootkit in UEFI/SMM survives any OS reinstall.",
    tags: ["SMM", "SMRAM", "UEFI", "iBoot", "Secure Boot", "SPI Flash", "Invisible to OS"],
  },
  rm1: {
    badge: "Ring −1",
    title: "Hypervisor — VMX / SVM Mode",
    desc: "Hypervisors (VMware, KVM, Hyper-V) run below guest OS kernels using Intel VT-x or AMD-V CPU extensions. Each guest OS believes it has Ring 0, but privileged instructions are intercepted and emulated. Anticheats detect virtualization via CPUID flags that reveal the hypervisor vendor, and via timing attacks — virtualized instructions take nanoseconds longer than bare-metal.",
    tags: ["VMware", "KVM", "Hyper-V", "QEMU", "VT-x", "AMD-V", "Ring −1"],
  },
  r0: {
    badge: "Ring 0",
    title: "OS Kernel / Drivers / Anticheat",
    desc: "The operating system kernel. Full, unrestricted access to all hardware and memory. This is where device drivers, antivirus engines, and game anticheats (Vanguard, EAC, Ricochet) operate. A single buggy kernel module can crash the entire system — CrowdStrike demonstrated this at global scale in July 2024, taking down 8.5 million Windows machines with one bad update.",
    tags: ["Windows NT", "Linux Kernel", "Vanguard", "EAC", "CrowdStrike", "GPU Drivers", "Ring 0"],
  },
  r1: {
    badge: "Ring 1 / 2",
    title: "Rings 1 & 2 — Formally defined, rarely used",
    desc: "x86 defines four hardware privilege levels (0–3). Rings 1 and 2 were designed for device drivers and OS services with less privilege than the kernel but more than applications. In practice, almost no modern OS uses them — Windows and Linux collapse everything to just Ring 0 (kernel) and Ring 3 (user). They exist as CPU hardware features but are effectively dormant.",
    tags: ["Formally defined", "Rarely used", "x86 legacy", "Ring 1", "Ring 2"],
  },
  r3: {
    badge: "Ring 3",
    title: "Userspace — Applications",
    desc: "The outermost ring. Everything you see, use, and interact with runs here: browsers, games, terminals, apps. Ring 3 code cannot directly access hardware or other processes' memory. It must ask the kernel (Ring 0) via system calls. This is the only layer you can fully observe, control, and audit. Everything below it is opaque to you by design.",
    tags: ["Applications", "Browser", "Games", "Sandboxed", "Syscalls", "Observable"],
  },
}

// ─── Panel 2: boot sequence (ordered top → bottom by privilege) ───
export interface BootStep {
  level: RingLevel
  /** Two-line chip label. */
  chip: [string, string]
  title: string
  blurb: string
  detail: string
}

export interface BootColumn {
  title: string
  steps: BootStep[]
}

export const BOOT_COLUMNS: BootColumn[] = [
  {
    title: "🖥 PC — UEFI / x86-64",
    steps: [
      {
        level: 3,
        chip: ["Apps", "Ring 3"],
        title: "Userspace — Ring 3",
        blurb: "Everything you see and run. Fully supervised by the kernel.",
        detail:
          "Cannot access hardware directly. Must ask the kernel via syscalls. This is where your browser, games, and terminal live. The only layer you can fully observe and control.",
      },
      {
        level: 0,
        chip: ["OS", "Kernel"],
        title: "OS Kernel — Ring 0",
        blurb:
          "Windows NT / Linux. Full hardware access. Vanguard, EAC, and CrowdStrike load here.",
        detail:
          "A Ring 0 bug can crash every machine running it simultaneously — as CrowdStrike proved in July 2024 (8.5M Windows machines). Vanguard starts here before you launch the game.",
      },
      {
        level: -1,
        chip: ["Hyper-", "visor"],
        title: "Hypervisor — Ring −1",
        blurb: "Optional. VMware, KVM, Hyper-V. Manages VMs below the guest kernel.",
        detail:
          "Uses Intel VT-x / AMD-V CPU extensions. Guest OS believes it runs in Ring 0, but privileged instructions are intercepted. Anticheats detect this via CPUID flags and instruction timing deltas (nanoseconds slower).",
      },
      {
        level: -2,
        chip: ["UEFI", "Firmware"],
        title: "UEFI / Secure Boot",
        blurb: "Initializes RAM, PCIe, storage. Verifies cryptographic signature chain.",
        detail:
          "Lives on an SPI Flash chip soldered to the motherboard. A rootkit here survives full OS reinstalls and drive formats. Secure Boot signs everything before handing control to the bootloader.",
      },
      {
        level: -2,
        chip: ["SMM", "Ring −2"],
        title: "System Management Mode",
        blurb: "Invisible to hypervisors, OS, and anticheat. Hardware emulation, power management.",
        detail:
          "SMM runs in a protected memory region (SMRAM) that the OS cannot read or write. Triggered by System Management Interrupts (SMI). Completely invisible to everything above it — including Vanguard and CrowdStrike.",
      },
      {
        level: -3,
        chip: ["Intel ME", "AMD PSP"],
        title: "Management Engine (Ring −3)",
        blurb: "Separate microprocessor. Runs MINIX internally (Intel). Always on.",
        detail:
          "The main CPU will NOT boot without a handshake from the ME. It has its own RAM, its own network stack, and can access all system memory independently of the OS. You cannot fully disable it on modern hardware.",
      },
      {
        level: -3,
        chip: ["POWER", "ON"],
        title: "Physical power-on",
        blurb: "CPU executes its first instruction from a hardwired ROM address.",
        detail:
          "x86 reset vector: 0xFFFFFFF0. No OS, no RAM initialized. Just the CPU and the ROM. Everything else is offline.",
      },
    ],
  },
  {
    title: "📱 Smartphone — ARM",
    steps: [
      {
        level: 3,
        chip: ["iOS /", "Android"],
        title: "Userspace — Sandboxed",
        blurb: "Apps, UI, everything you interact with.",
        detail:
          "iOS sandbox is among the strictest in consumer OS. Android varies significantly by OEM. Apps request permissions; the kernel enforces them. Root = breaking this boundary.",
      },
      {
        level: 0,
        chip: ["XNU /", "Linux"],
        title: "OS Kernel — Ring 0",
        blurb: "XNU (iOS/macOS) or Linux (Android). Full hardware access.",
        detail:
          "iOS kernel is sealed and signed by Apple. Android kernel is open-source but OEMs add proprietary blobs. Kernel exploits are the core of most mobile jailbreaks and root exploits.",
      },
      {
        level: -2,
        chip: ["iBoot /", "BL"],
        title: "Second Bootloader",
        blurb: "iBoot (Apple) or OEM bootloader (Android). Locked by default.",
        detail:
          "Unlocking the Android bootloader breaks the trust chain and usually trips Knox / Widevine fuses permanently. Enables custom ROMs but voids the cryptographic guarantee that the OS hasn't been tampered with.",
      },
      {
        level: -3,
        chip: ["Base", "band"],
        title: "Baseband Processor",
        blurb: "Separate CPU for the modem. Runs its own RTOS (REX on Qualcomm).",
        detail:
          "Has independent network access. On some SoC designs, shares DMA with the application processor — meaning a compromised baseband can read app memory. Completely opaque. Historically riddled with critical CVEs.",
      },
      {
        level: -3,
        chip: ["Trust", "Zone"],
        title: "ARM TrustZone — Secure World",
        blurb: "Parallel execution environment. Biometrics, payments, encryption keys.",
        detail:
          "Two worlds run simultaneously on the same cores: Secure World and Normal World. The Normal World (Android/iOS) cannot read Secure World memory. But Secure World can access Normal World. One-way mirror.",
      },
      {
        level: -3,
        chip: ["Boot", "ROM"],
        title: "Bootrom — etched in silicon",
        blurb: "Physically immutable. The absolute root of trust. Cannot be patched.",
        detail:
          "Apple's checkm8 exploit (2019) found a vulnerability here affecting A5–A11 chips. It can never be patched because it's in read-only silicon. Millions of iPhones are permanently jailbreakable at the lowest level.",
      },
    ],
  },
]

// ─── Panel 3: devices (layers ordered top → bottom by privilege) ───
export interface DeviceLayer {
  label: string
  tag: string
  level?: RingLevel
}

export interface DeviceCard {
  title: string
  layers: DeviceLayer[]
  note?: string
}

export const DEVICES: DeviceCard[] = [
  {
    title: "💻 PC / Laptop",
    layers: [
      { label: "Applications", tag: "Ring 3", level: 3 },
      { label: "OS Kernel + Vanguard/EAC", tag: "Ring 0", level: 0 },
      { label: "Hypervisor (optional)", tag: "Ring −1", level: -1 },
      { label: "UEFI Firmware", tag: "Ring −2", level: -2 },
      { label: "SMM (invisible)", tag: "Ring −2", level: -2 },
      { label: "Intel ME / AMD PSP", tag: "Ring −3", level: -3 },
    ],
  },
  {
    title: "📱 Smartphone",
    layers: [
      { label: "Apps (sandboxed)", tag: "Ring 3", level: 3 },
      { label: "XNU / Linux Kernel", tag: "Ring 0", level: 0 },
      { label: "iBoot / Bootloader", tag: "Locked", level: -2 },
      { label: "Baseband Processor", tag: "Parallel", level: -3 },
      { label: "TrustZone Secure World", tag: "Parallel", level: -3 },
      { label: "Bootrom (immutable ROM)", tag: "−∞", level: -3 },
    ],
  },
  {
    title: "🖧 Server",
    layers: [
      { label: "Guest OS Kernels (×N)", tag: "Ring 0", level: 0 },
      { label: "Hypervisor (VMware/KVM)", tag: "Ring −1", level: -1 },
      { label: "SMM + UEFI", tag: "Ring −2", level: -2 },
      { label: "Intel ME", tag: "Ring −3", level: -3 },
      { label: "BMC / iDRAC / iLO", tag: "Always ON", level: -3 },
    ],
    note: 'BMC has independent network access. Can power cycle, reinstall OS, or access console even when the server is "off". Dell iDRAC, HP iLO, Supermicro IPMI.',
  },
  {
    title: "💽 SSD / HDD",
    layers: [
      { label: "Direct data access", tag: "Total", level: -2 },
      { label: "Survives full format", tag: "Persistent", level: -3 },
      { label: "Drive controller firmware", tag: "⚠ Invisible", level: -3 },
    ],
    note: "Equation Group (NSA-linked) deployed malware that lived in HDD firmware — discovered by Kaspersky in 2015. Survived complete drive formats and OS reinstalls. The drive itself was the implant.",
  },
  {
    title: "📡 Router / Network",
    layers: [
      { label: "Embedded OS (Linux/VxWorks)", tag: "Kernel", level: 0 },
      { label: "Proprietary firmware", tag: "Opaque", level: -2 },
      { label: "Sees ALL your traffic", tag: "⚠ Total", level: -3 },
    ],
    note: "Every packet leaving your network passes through here before the internet. A compromised router is worse than any OS-level malware — it sits above your encryption at the network layer.",
  },
  {
    title: "📺 Smart TV",
    layers: [
      { label: "Streaming apps / UI", tag: "User", level: 3 },
      { label: "Tizen / WebOS / Android TV", tag: "Kernel", level: 0 },
      { label: "SoC firmware (Samsung/LG)", tag: "Opaque", level: -2 },
    ],
    note: "Always-on microphone in many models. Remote update subsystems operate independently of the visible OS. Samsung's ACR (Automatic Content Recognition) tracks what you watch by default.",
  },
  {
    title: "🖨 Printer",
    layers: [
      { label: "Network stack", tag: "Exposed" },
      { label: "Embedded Linux / RTOS", tag: "Kernel", level: 0 },
      { label: "ARM CPU + firmware", tag: "Opaque", level: -2 },
    ],
    note: "Historically a neglected attack vector on corporate networks. HP and Xerox have had critical firmware RCEs. Printers are often network-connected, rarely patched, and can pivot to other internal systems.",
  },
  {
    title: "⌚ Wearables / IoT",
    layers: [
      { label: "Biometrics / location / mic", tag: "⚠ Sensors", level: -3 },
      { label: "RTOS (FreeRTOS / Zephyr)", tag: "Kernel", level: 0 },
      { label: "Vendor firmware (opaque)", tag: "Opaque", level: -2 },
    ],
    note: "Continuous biometric collection (HR, SpO2, GPS, accelerometer). Bluetooth always scanning. Firmware updates delivered OTA with minimal user visibility. Least-audited category of personal devices.",
  },
]

// ─── Panel 4: trust chain (ordered You → … → foundry) ───
export interface TrustNode {
  icon: string
  title: string
  desc: string
  badge: string
  level: RingLevel
}

export const TRUST_CHAIN: TrustNode[] = [
  {
    icon: "👤",
    title: "You — the end user",
    desc: "You see Ring 3. You cannot audit any layer below. You trust every entity above implicitly, transitively, every time you power on your device.",
    badge: "Ring 3",
    level: 3,
  },
  {
    icon: "🎮",
    title: "Game Anticheat — Riot Vanguard, EAC, Ricochet",
    desc: "Ring 0. Starts before the game. Vanguard is partially owned by Tencent, which has legal obligations to the Chinese government. You trust all of the above to trust this.",
    badge: "Ring 0",
    level: 0,
  },
  {
    icon: "🛡️",
    title: "Security Software — CrowdStrike, Antivirus vendors",
    desc: "Also Ring 0. A bug here crashed 8.5M Windows machines simultaneously in July 2024. No malicious intent needed — just a bad update.",
    badge: "Ring 0",
    level: 0,
  },
  {
    icon: "🖥️",
    title: "OS Vendor — Microsoft, Apple, Google, Linux",
    desc: "Controls Ring 0. Decides which kernel modules are allowed. Windows kernel signing (required since Vista 64-bit) reduced but didn't eliminate malicious Ring 0 code.",
    badge: "Ring 0",
    level: 0,
  },
  {
    icon: "🏭",
    title: "OEM — Dell, Lenovo, Apple, Samsung",
    desc: "Writes UEFI and SMM code, may add proprietary modules. Controls Secure Boot keys. Some OEMs have shipped firmware with backdoors (Lenovo Superfish, 2015).",
    badge: "Ring −2",
    level: -2,
  },
  {
    icon: "🔧",
    title: "Chip Vendor — Intel, AMD, Qualcomm, Apple",
    desc: "Writes Ring −3 firmware: Intel ME (runs MINIX), AMD PSP, Qualcomm baseband. Closed source, signed, and non-removable on modern hardware.",
    badge: "Ring −3",
    level: -3,
  },
  {
    icon: "🔬",
    title: "IP Designer — ARM, x86 (Intel/AMD), RISC-V",
    desc: "Designs the instruction set architecture and core IP. Everyone else licenses it. ARM is now owned by SoftBank; RISC-V is open and the only truly auditable option.",
    badge: "ISA",
    level: -3,
  },
  {
    icon: "⚛️",
    title: "Silicon Foundry — TSMC, Samsung, Intel Fabs",
    desc: "Physically manufactures the chip. Could embed hardware backdoors at gate level — undetectable by any software audit. Geopolitically concentrated in Taiwan and South Korea.",
    badge: "Ring −∞",
    level: -3,
  },
]
