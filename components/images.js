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

        const images = window.settings.images.filter(img => img.category == image.category).map(img => `images/${img.file}`);
        const lightbox = new FsLightbox();

        // set up props, like sources, types, events etc.
        lightbox.props.sources = images
        lightbox.props.thumbs = images
        lightbox.props.onInit = () => console.log('Lightbox initialized!');

        lightbox.open();
    }

    render() {
        const images = window.settings.images
        return html`
                    ${images.map((image, index) => { 
                        const groupTitle = html`<div class="group-title"><span>${image.category}</span></div>`;
                        return html`${index == 0 ? groupTitle : ""}
                                    ${index > 1 && image.category != images[index - 1].category ? groupTitle : ""}
                                     <img @click=${this.openCategory.bind(this, image)} @load=${this.getSize.bind(this)} src="images/${image.file}"></img>`
                    })}
                   `;
    }
}

customElements.define('images-component', Images);