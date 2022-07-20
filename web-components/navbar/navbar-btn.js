const navbarBtn = document.createElement('template')
navbarBtn.innerHTML = `
<style>
  @import "web-components/navbar/navbar-btn.css";
</style>
<button aria-label="Menu Button">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</button>
`

class NavbarBtn extends HTMLElement {
    constructor (breakpoint) {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(navbarBtn.content.cloneNode(true))
        this.breakpoint = breakpoint
    }

    connectedCallback () {
        const btn = this.shadowRoot.querySelector('button')

        btn.addEventListener('click', () => {
            btn.classList.toggle('change')
        })

        window.addEventListener('resize', () => { this.reset(btn, this.breakpoint) })
    }

    disconnectedCallback () {
        window.removeEventListener('resize', this.reset)
    }

    reset (element, breakpoint) {
        if (window.innerWidth > breakpoint && element.classList.contains('change')) {
            element.classList.remove('change')
        }
    }
}

window.customElements.define('navbar-btn', NavbarBtn)
