const navbar = document.createElement('template');

navbar.innerHTML = `
<style>
 @import "web-components/navbar/navbar.css";
</style>

<header>

  <nav>
    <div class="logo">
     <slot name="brand"></slot>
    </div>
    
    <slot></slot>
  </nav>
  
</header>
`

class Navbar extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(navbar.content.cloneNode(true));
  }

  connectedCallback() {

    const props = {
      active: this.getAttribute('active'),
      breakpoint: this.getAttribute('breakpoint')
    }

    const btn = new NavbarBtn(props.breakpoint)
    this.shadowRoot.querySelector('header div').append(btn)

    const data = {
      header: this.shadowRoot.querySelector('header'),
      button: this.shadowRoot.querySelector('header navbar-btn'),
      nav: this.shadowRoot.querySelector('header nav'),
      links: this.shadowRoot.querySelectorAll('navigation-bar a'),
    }

    const dist = data.nav.offsetHeight - 48

    this.checkIfMobile(data.nav, props.breakpoint, dist)

    this.createStyle(data.header.offsetHeight)
    this.breakpointStyles(props.breakpoint, props.position)

    this.setActiveLink(data.links, props.active)

    data.button.addEventListener('click', () => {
      data.nav.classList.toggle('show')
    })

    window.addEventListener('resize', () => {
      this.checkIfMobile(data.nav, props.breakpoint, dist);
    })
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.checkIfMobile)
  }

  setActiveLink (elements, attr) {
    elements.forEach((link) => {
      if (link.innerHTML.toLowerCase() === attr.toLowerCase()) {
          link.classList.add('nav-link--active')
      }
    })
  }

  createStyle (distance) {
    const styles = `.show { transform: translateY(${distance}px) !important; }`;
    this.shadowRoot.querySelector('style').append(styles)
  }

  breakpointStyles (breakpoint) {
    const styles = `
    @media screen and (min-width: ${breakpoint}px) {
      header {
        box-shadow: var(--navbar-shadow);
        overflow: hidden;
      }
      header div {
        border-bottom: none !important;
      }
      header nav {
        align-items: center;
        flex-direction: row;
        justify-content: flex-end;
        padding: 0 1rem 0 0;
        position: relative !important;
        transform: translateY(0) !important;
        z-index: unset;
        border: none;
      }
      header nav a {
        padding: 0 1rem;
      }
    }
    `
    this.shadowRoot.querySelector('style').append(styles)
  }

  calTransDistance (nav) {
    return nav.offsetHeight
  }

  checkIfMobile (nav, breakpoint, distance) {
    if (window.innerWidth < breakpoint) {
      nav.style.transform = `translateY(-${distance}px)`
      setTimeout(() => {
        nav.classList.add('animate')
      }, 1)
    } else {
      nav.classList.remove('show')
      nav.classList.remove('animate')
    }
  }
}

window.customElements.define('navigation-bar', Navbar)
