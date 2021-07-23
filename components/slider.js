import { LitElement, html } from 'https://unpkg.com/lit@2.0.0-rc.1/index.js?module';
import { classMap } from 'https://unpkg.com/lit@2.0.0-rc.1/directives/class-map.js?module';


class Slider extends LitElement {
    constructor() {
        super()
        this.category = null
    }

    createRenderRoot() { return this; }

    async connectedCallback() {
        this.categories = this.getAttribute("categories")
        super.connectedCallback()
    }

    changeCategory() {
        window.dispatchEvent(new CustomEvent("changeCategory", {
            detail: this.category
        }))
    }

    render() {
        return html`
                    <h2>Account</h2>
                   `;
    }
}

customElements.define('slider-component', Slider);