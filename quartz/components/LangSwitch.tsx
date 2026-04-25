// @ts-ignore
import langswitchScript from "./scripts/langswitch.inline"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const LangSwitch: QuartzComponent = () => {
  return (
    <a
      id="lang-switch-link"
      class="lang-switch"
      href="#"
      aria-label="Switch language"
    >
      EN
    </a>
  )
}

LangSwitch.css = `
.lang-switch {
  font-family: var(--headerFont);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--darkgray);
  border: 1px solid var(--lightgray);
  border-radius: 2px;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  transition: color 0.15s, border-color 0.15s;
}
.lang-switch:hover {
  color: var(--secondary);
  border-color: var(--secondary);
}
`

LangSwitch.afterDOMLoaded = langswitchScript

export default (() => LangSwitch) satisfies QuartzComponentConstructor
