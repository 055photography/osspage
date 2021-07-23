import { LitElement, html } from 'https://unpkg.com/lit@2.0.0-rc.1/index.js?module';
import { classMap } from 'https://unpkg.com/lit@2.0.0-rc.1/directives/class-map.js?module';

class Menu extends LitElement {
    constructor() {
        super()
        this.category = null
        this.categories = [...new Set(window.settings.images.map(item => item.category))]
    }

    createRenderRoot() { return this; }

    changeCategory() {
        window.dispatchEvent(new CustomEvent("changeCategory", {
            detail: this.category
        }))
    }

    showCategories(event) {
        event.currentTarget.classList.add("visible")
    }

    removeCategories(event) {
        event.currentTarget.classList.remove("visible")
    }

    render() {
        return html`
                    <span class="link">Kodu</span>
                    <div class="dropdown" @mouseleave=${this.removeCategories} @mouseover=${this.showCategories}>
                        <span class="link">Kategooriad <svg-loader src="icons/down.svg"></svg-loader></span>
                        <div class="link-list">
                            ${this.categories.map(item => html`<span class="link" @click=${e => this.changeCategory(e, item)}>${item}</span>`)}
                        </div>
                    </div>
                    <span class="link">Kontakt</span>
                   `;
    }
}

customElements.define('menu-component', Menu);