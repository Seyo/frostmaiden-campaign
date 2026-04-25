document.addEventListener("nav", () => {
  const link = document.getElementById("lang-switch-link") as HTMLAnchorElement | null
  if (!link) return

  const path = window.location.pathname
  // Base path is /frostmaiden-campaign/ — EN wiki lives under /frostmaiden-campaign/en/
  const enSegment = "/en/"
  const idx = path.indexOf(enSegment)

  if (idx !== -1 && path.slice(idx) !== enSegment.slice(0, -1)) {
    // We are in the EN wiki — link switches to SV (remove /en/ segment)
    link.href = path.slice(0, idx) + "/" + path.slice(idx + enSegment.length)
    link.textContent = "SV"
    link.title = "Switch to Swedish wiki"
  } else {
    // We are in the SV wiki — link switches to EN (insert /en/ after base)
    const base = path.endsWith("/") ? path.slice(0, -1) : path
    const parts = base.split("/")
    // Insert 'en' after the repo segment (index 1 for /frostmaiden-campaign/...)
    parts.splice(2, 0, "en")
    link.href = parts.join("/")
    link.textContent = "EN"
    link.title = "Switch to English wiki"
  }
})
