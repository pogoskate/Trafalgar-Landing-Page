const template = document.createElement('template');

template.innerHTML = `
<style>
    @import "web-components/test/test.css";
</style>

<div class="test-component-container">
    <h3>This is a test web component</h3>
    <p>We will be using this a lot</p>
    <button id="click-me-button">Click Me</button>
</div>`;

class Test extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const button = this.shadowRoot.getElementById('click-me-button');

        button.addEventListener('click', () => {
            alert('Button has been clicked!')
        })
    }

    connectedCallback() {
    }

    render() {
    }


}

window.customElements.define('app-test', Test);
