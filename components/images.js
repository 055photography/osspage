import { LitElement, html } from 'https://unpkg.com/lit@2.0.0-rc.1/index.js?module';

class Images extends LitElement {
    constructor() {
        super()

        window.addEventListener("changeCategory", (event) => {
            const value = event.detail
            if (value == "Kõik") this.images = window.settings.images
            else this.images = window.settings.images.filter(img => img.category == value)
            this.requestUpdate()
        })

        this.images = window.settings.images
    }

   createRenderRoot() { return this; }

   setNaturalProps(index, event) {
        const image = event.currentTarget
        const imageRatio = image.naturalWidth / image.naturalHeight
        window.settings.images[index].class = imageRatio > 1 ? "image-wide" : "image-tall"
        if (index == window.settings.images.length - 1) this.requestUpdate()
    }

    openCategory(image, event) {
        const filteredImages =  window.settings.images.filter(img => img.category == image.category)
        const imageUrls = filteredImages.map(img => `images/${img.file}`);
        const lightbox = new FsLightbox();
  
        lightbox.props.sources = imageUrls
        lightbox.props.onInit = () => {
            lightbox.core.slideIndexChanger.changeTo(filteredImages.findIndex(img => img.file == image.file))
        }
      
        lightbox.open();
    }

    render() {
        return html`
                    ${this.images.map((image, index) => { 
                        const groupTitle = html`<div class="group-title"><span>${image.category}</span></div>`;
                        return html`${index == 0 ? groupTitle : ""}
                                    ${index > 1 && image.category != this.images[index - 1].category ? groupTitle : ""}
                                     <img class="${image.class}" @click=${this.openCategory.bind(this, image)} @load=${this.setNaturalProps.bind(this, index)} src="images/${image.file}"></img>`
                    })}
                   `;
    }
}

customElements.define('images-component', Images);