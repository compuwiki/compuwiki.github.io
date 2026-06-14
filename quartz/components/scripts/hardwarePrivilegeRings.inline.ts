import { RING_INFO, type RingId } from "../data/hardwarePrivilegeRings"

function setupWidget(root: HTMLElement) {
  const tabs = Array.from(root.querySelectorAll<HTMLElement>(".hw-tab"))

  // ── actions ──
  const activateTab = (tab: HTMLElement, focus = false) => {
    const id = tab.dataset.tab
    for (const t of tabs) {
      const active = t === tab
      t.classList.toggle("active", active)
      t.setAttribute("aria-selected", String(active))
      t.tabIndex = active ? 0 : -1
    }
    root
      .querySelectorAll<HTMLElement>(".hw-panel")
      .forEach((p) => p.classList.toggle("active", p.dataset.panel === id))
    if (focus) tab.focus()
  }

  const selectRing = (id: string) => {
    const d = RING_INFO[id as RingId]
    if (!d) return

    root.querySelectorAll(".ell").forEach((e) => e.classList.remove("selected"))
    root.querySelector(`.ell[data-ring="${id}"]`)?.classList.add("selected")

    const panel = root.querySelector<HTMLElement>("[data-ring-info]")
    if (!panel) return

    const badge = document.createElement("span")
    badge.className = `ring-badge ${id}`
    badge.textContent = d.badge

    const h3 = document.createElement("h3")
    h3.textContent = d.title

    const p = document.createElement("p")
    p.textContent = d.desc

    const tags = document.createElement("div")
    tags.className = "examples"
    for (const t of d.tags) {
      const tag = document.createElement("span")
      tag.className = "ex-tag"
      tag.textContent = t
      tags.append(tag)
    }

    panel.replaceChildren(badge, h3, p, tags)
  }

  const toggleStep = (step: HTMLElement) => {
    const open = step.classList.toggle("open")
    step.setAttribute("aria-expanded", String(open))
  }

  // ── pointer ──
  const onClick = (e: Event) => {
    const target = e.target as HTMLElement

    const tab = target.closest<HTMLElement>(".hw-tab")
    if (tab && root.contains(tab)) return activateTab(tab)

    const ell = target.closest<HTMLElement>(".ell")
    if (ell && root.contains(ell) && ell.dataset.ring) return selectRing(ell.dataset.ring)

    const step = target.closest<HTMLElement>(".boot-step")
    if (step && root.contains(step)) toggleStep(step)
  }

  // ── keyboard ──
  const onKeydown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement

    // tabs: arrow-key roving (Enter/Space fire click natively on <button>)
    const tab = target.closest<HTMLElement>(".hw-tab")
    if (tab && root.contains(tab)) {
      const i = tabs.indexOf(tab)
      let next = -1
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        next = (i - 1 + tabs.length) % tabs.length
      else if (e.key === "Home") next = 0
      else if (e.key === "End") next = tabs.length - 1
      if (next >= 0) {
        e.preventDefault()
        activateTab(tabs[next], true)
      }
      return
    }

    // ellipses & boot steps are role=button divs/groups → activate manually
    if (e.key !== "Enter" && e.key !== " " && e.key !== "Spacebar") return

    const ell = target.closest<HTMLElement>(".ell")
    if (ell && root.contains(ell) && ell.dataset.ring) {
      e.preventDefault()
      return selectRing(ell.dataset.ring)
    }

    const step = target.closest<HTMLElement>(".boot-step")
    if (step && root.contains(step)) {
      e.preventDefault()
      toggleStep(step)
    }
  }

  root.addEventListener("click", onClick)
  root.addEventListener("keydown", onKeydown)
  window.addCleanup?.(() => {
    root.removeEventListener("click", onClick)
    root.removeEventListener("keydown", onKeydown)
  })
}

document.addEventListener("nav", () => {
  document.querySelectorAll<HTMLElement>(".hw-rings").forEach(setupWidget)
})
