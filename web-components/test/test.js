const template = document.createElement('template');

template.innerHTML = `
<style>
  .test-component-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-flow: column;
    text-align: center;    
  }
  h3 {
    color: red;
  }
  p {
    color: steelblue;
  }
</style>

<div class="test-component-container">
    <h3>This is a test web component</h3>
    <p>We will be using this a lot</p>
</div>`;

class Test extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
    }

    render() {
    }
}

window.customElements.define('app-test', Test);
