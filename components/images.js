import { LitElement, html } from 'https://unpkg.com/lit@2.0.0-rc.1/index.js?module';
import { classMap } from 'https://unpkg.com/lit@2.0.0-rc.1/directives/class-map.js?module';


class Images extends LitElement {
    createRenderRoot() { return this; }

    getSize(event) {
        const image = event.currentTarget
        const imageRatio = image.naturalWidth / image.naturalHeight
        image.classList.add(imageRatio > 1 ? "image-wide" : "image-tall")
    }

    openCategory(image, event) {
        window.dispatchEvent(new CustomEvent("openCategory", {
            detail: image
        }))
    }

    render() {
        const images = window.settings.images
        return html`
                    ${images.map((image, index) => { 
                        return html`${index == 0 ? html`<div class="group-title">${image.category}</div>` : ""}
                                    ${index > 1 && image.category != images[index - 1].category ? html`<div class="group-title">${image.category}</div>` : ""}
                                     <img @click=${this.openCategory.bind(this, image)} @load=${this.getSize.bind(this)} src="images/${image.file}"></img>`
                    })}
                   `;
    }
}

customElements.define('images-component', Images);