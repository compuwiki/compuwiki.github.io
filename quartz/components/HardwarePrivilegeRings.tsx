import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore: keep as a non-module critical script (see Darkmode for rationale)
import script from "./scripts/hardwarePrivilegeRings.inline"
import style from "./styles/hardwarePrivilegeRings.scss"
import { classNames } from "../util/lang"
import { BOOT_COLUMNS, DEVICES, RING_SHAPES, TRUST_CHAIN, lc } from "./data/hardwarePrivilegeRings"

const HardwarePrivilegeRings: QuartzComponent = ({
  displayClass,
  fileData,
}: QuartzComponentProps) => {
  // Opt-in per page via `hardwareRings: true` frontmatter. Renders nothing elsewhere.
  if (!(fileData.frontmatter as any)?.hardwareRings) {
    return null
  }

  return (
    <div class={classNames(displayClass, "hw-rings")}>
      <div class="hw-header">
        <h2>
          The <em>Hardware</em> Privilege Hierarchy — The One Ring
        </h2>
        <p>
          Privilege rings, firmware layers, boot sequences, and trust chains in modern devices. The
          deeper the layer, the more absolute its power — and the less you can audit it.
        </p>
      </div>

      <div class="hw-tabs" role="tablist" aria-label="Hardware privilege views">
        <button
          class="hw-tab active"
          type="button"
          role="tab"
          id="hw-tab-rings"
          aria-controls="hw-panel-rings"
          aria-selected="true"
          tabindex={0}
          data-tab="rings"
        >
          Privilege Rings
        </button>
        <button
          class="hw-tab"
          type="button"
          role="tab"
          id="hw-tab-boot"
          aria-controls="hw-panel-boot"
          aria-selected="false"
          tabindex={-1}
          data-tab="boot"
        >
          Boot Sequence
        </button>
        <button
          class="hw-tab"
          type="button"
          role="tab"
          id="hw-tab-devices"
          aria-controls="hw-panel-devices"
          aria-selected="false"
          tabindex={-1}
          data-tab="devices"
        >
          Devices
        </button>
        <button
          class="hw-tab"
          type="button"
          role="tab"
          id="hw-tab-trust"
          aria-controls="hw-panel-trust"
          aria-selected="false"
          tabindex={-1}
          data-tab="trust"
        >
          Trust Chain
        </button>
      </div>

      {/* ══ PANEL 1: RINGS ══ */}
      <div
        class="hw-panel active"
        data-panel="rings"
        role="tabpanel"
        id="hw-panel-rings"
        aria-labelledby="hw-tab-rings"
        tabindex={0}
      >
        <p class="hw-hint">Click any ellipse — bottom = most privileged</p>
        <div class="ellipse-scene">
          <div class="ellipse-svg-wrap">
            <svg
              viewBox="0 0 500 340"
              xmlns="http://www.w3.org/2000/svg"
              style="width:100%;height:auto;overflow:visible"
            >
              <defs>
                <filter id="hwGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Stacked, flattened ellipses → downward-tapering cone.
                  Top = least privileged (Ring 3) → bottom = most privileged (Ring −3). */}
              {RING_SHAPES.map((r) => (
                <g
                  class={`ell ${r.id}`}
                  data-ring={r.id}
                  role="button"
                  tabindex={0}
                  aria-label={`${r.name}: ${r.desc}`}
                >
                  <ellipse
                    cx={r.cx}
                    cy={r.cy}
                    rx={r.rx}
                    ry={r.ry}
                    stroke-width={r.strokeWidth}
                    stroke-dasharray={r.dash}
                    filter={r.glow ? "url(#hwGlow)" : undefined}
                  />
                </g>
              ))}

              {/* labels — aligned right column; geometry derived from each ring */}
              {RING_SHAPES.map((r) => (
                <g class={`lbl ${r.id}`}>
                  <line class="lead" x1={r.cx + r.rx} y1={r.cy} x2={466} y2={r.cy} />
                  <text class="name" x={470} y={r.cy - 2}>
                    {r.name}
                  </text>
                  <text class="desc" x={470} y={r.cy + 8}>
                    {r.desc}
                  </text>
                </g>
              ))}

              <text class="depth-axis" x="16" y="30" transform="rotate(90,16,30)">
                MORE PRIVILEGED →
              </text>
            </svg>
          </div>

          <div class="ring-info-panel" data-ring-info role="status" aria-live="polite">
            <p class="dim" style="font-size:0.8rem;margin-top:60px;text-align:center">
              ← Click an ellipse
              <br />
              to explore that layer
            </p>
          </div>
        </div>

        <div class="hw-note warn">
          ⚠ Correction vs common diagrams: Ring −2 is <strong>SMM (System Management Mode)</strong>,
          a special CPU execution mode completely invisible to the hypervisor and OS — not UEFI
          itself. UEFI runs during boot but SMM persists at runtime. AMD Sinkclose (2024 DEF CON)
          exposed a 20-year-old CPU flaw enabling Ring −2 privilege escalation.
        </div>
      </div>

      {/* ══ PANEL 2: BOOT ══ */}
      <div
        class="hw-panel"
        data-panel="boot"
        role="tabpanel"
        id="hw-panel-boot"
        aria-labelledby="hw-tab-boot"
        tabindex={0}
      >
        <p class="hw-hint">Click each step to expand technical detail</p>
        <div class="boot-grid">
          {BOOT_COLUMNS.map((col) => (
            <div class="boot-col">
              <h3>{col.title}</h3>
              {col.steps.map((s, i) => (
                <div class="boot-step" role="button" tabindex={0} aria-expanded="false">
                  <div class="boot-left">
                    <div class={`boot-chip tinted ${lc(s.level)}`}>
                      {s.chip[0]}
                      <br />
                      {s.chip[1]}
                    </div>
                    {i < col.steps.length - 1 && <div class="boot-line"></div>}
                  </div>
                  <div class="boot-right">
                    <h4 class={`tinted ${lc(s.level)}`}>{s.title}</h4>
                    <p>{s.blurb}</p>
                    <div class="boot-detail">{s.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══ PANEL 3: DEVICES ══ */}
      <div
        class="hw-panel"
        data-panel="devices"
        role="tabpanel"
        id="hw-panel-devices"
        aria-labelledby="hw-tab-devices"
        tabindex={0}
      >
        <p class="hw-section-label">Firmware layers across everyday devices</p>
        <div class="device-grid">
          {DEVICES.map((d) => (
            <div class="dev-card">
              <h3>{d.title}</h3>
              {d.layers.map((l) => (
                <div class={["dev-layer", lc(l.level)].filter(Boolean).join(" ")}>
                  <span>{l.label}</span>
                  <span>{l.tag}</span>
                </div>
              ))}
              {d.note && <div class="dev-note">{d.note}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* ══ PANEL 4: TRUST CHAIN ══ */}
      <div
        class="hw-panel"
        data-panel="trust"
        role="tabpanel"
        id="hw-panel-trust"
        aria-labelledby="hw-tab-trust"
        tabindex={0}
      >
        <p class="hw-section-label">Who do you actually trust?</p>
        <p class="hw-hint">
          Trust is transitive — every layer inherits the risks of the layer below it
        </p>

        <div class="trust-wrap">
          {TRUST_CHAIN.map((t, i) => (
            <>
              <div class="trust-node">
                <div class="trust-ico">{t.icon}</div>
                <div class="trust-body">
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
                <span class={`trust-badge ${lc(t.level)}`}>{t.badge}</span>
              </div>
              {i < TRUST_CHAIN.length - 1 && <div class="trust-arrow">↓ trusts ↓</div>}
            </>
          ))}

          <div class="hw-note danger">
            ⚠ The trust chain is only as strong as its weakest link.
            <br />
            If any lower layer lies, everything above inherits that lie — silently, invisibly.
            <br />
            <span class="dim">
              There is no technical mechanism to verify lower layers from higher ones.
              <br />
              This is not a bug. It is how the architecture was designed.
            </span>
          </div>

          <div class="hw-note ok">
            🌱 <strong>The only real escape: RISC-V</strong>
            <br />
            Open instruction set architecture. No proprietary ME equivalent. Fully auditable from
            ISA to silicon (in theory). Projects like Talos II (IBM POWER9) offer fully open
            firmware stacks today but cost thousands and target servers. RISC-V for general consumer
            hardware is still a decade away from maturity.
          </div>
        </div>
      </div>
    </div>
  )
}

HardwarePrivilegeRings.css = style
HardwarePrivilegeRings.afterDOMLoaded = script

export default (() => HardwarePrivilegeRings) satisfies QuartzComponentConstructor
