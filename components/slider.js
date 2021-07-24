import { LitElement, html } from 'https://unpkg.com/lit@2.0.0-rc.1/index.js?module';
import { classMap } from 'https://unpkg.com/lit@2.0.0-rc.1/directives/class-map.js?module';


class Slider extends LitElement {
    constructor() {
        super()
        this.images = []
        this.activeImage = null
        // window.addEventListener("openCategory", this.init.bind(this))
    }

    init(event) {
        this.classList.add("visible")
        this.images = window.settings.images.filter(image => image.category == event.detail.category)
        this.activeImage = this.images[0].file
        this.requestUpdate()
    }

    createRenderRoot() { return this; }

    openCategory() {
       
    }

    closeSlider() {
        this.classList.remove("visible")
        this.activeImage = null
    }

    viewImage(image, event) {
        this.activeImage = image.file
        this.requestUpdate()
    }

    render() {
        return html`
                    <svg-loader @click=${this.closeSlider} id="close" src="/icons/close.svg"></svg-loader>
                    <section id="active-image">
                        <img src="images/${this.activeImage}"></img>
                    </section>
                    <section id="image-list">
                        ${this.images.map(image => html`<img src="images/${image.file}" @click=${this.viewImage.bind(this, image)}></img>`)}
                    </section>
                   `;
    }
}

customElements.define('slider-component', Slider);