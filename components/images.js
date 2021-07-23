import { LitElement, html } from 'https://unpkg.com/lit@2.0.0-rc.1/index.js?module';
import { classMap } from 'https://unpkg.com/lit@2.0.0-rc.1/directives/class-map.js?module';


class Images extends LitElement {
    constructor() {
        super()
    }

    createRenderRoot() { return this; }

    firstUpdated() {
        var macy = Macy({
            container: 'images-component',
            trueOrder: false,
            waitForImages: false,
            margin: 10,
            columns: 6,
            breakAt: {
                1200: 5,
                940: 3,
                520: 2,
                400: 1
            }
        });
    }

    render() {
        return html`
                    ${window.settings.images.map((image, index) => {
                        return html`<img src="images/${image.file}"></img>`
                    })}
                   `;
    }
}

customElements.define('images-component', Images);