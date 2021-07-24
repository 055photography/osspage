import { LitElement, html } from 'https://unpkg.com/lit@2.0.0-rc.1/index.js?module';
import { classMap } from 'https://unpkg.com/lit@2.0.0-rc.1/directives/class-map.js?module';

class Menu extends LitElement {
    constructor() {
        super()
        this.category = null
        this.categories = [...new Set(window.settings.images.map(item => item.category)), "Kõik"]
    }

    createRenderRoot() { return this; }

    changeCategory() {
        window.dispatchEvent(new CustomEvent("changeCategory", {
            detail: this.category
        }))
        this.querySelector(".dropdown").classList.remove("visible")
    }

    showCategories(event) {
        event.currentTarget.classList.add("visible")
    }

    removeCategories(event) {
        this.querySelector(".dropdown").classList.remove("visible")
    }

    render() {
        return html`
                    <div class="dropdown" @mouseover=${this.showCategories}>
                        <span class="link">Kategooriad <svg-loader src="icons/down.svg"></svg-loader></span>
                        <div @mouseleave=${this.removeCategories} class="link-list">
                            ${this.categories.map(item => html`<span class="link" @click=${e => this.changeCategory(e, item)}>${item}</span>`)}
                        </div>
                    </div>
                   `;
    }
}

customElements.define('menu-component', Menu);