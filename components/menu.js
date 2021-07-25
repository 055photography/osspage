import { LitElement, html } from 'https://unpkg.com/lit@2.0.0-rc.1/index.js?module';
import { classMap } from 'https://unpkg.com/lit@2.0.0-rc.1/directives/class-map.js?module';

class Menu extends LitElement {
    constructor() {
        super()
        this.categories = ["Kõik", ...new Set(window.settings.images.map(item => item.category))]
    }

    createRenderRoot() { return this; }

    changeCategory(value) {
        window.dispatchEvent(new CustomEvent("changeCategory", {
            detail: value
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
                            ${this.categories.map(item => html`<span class="link" @click=${this.changeCategory.bind(this, item)}>${item}</span>`)}
                        </div>
                    </div>


                    <section id="links">
                        <a title="instagram" href="https://www.instagram.com/055photography" target="_blank">
                            <svg-loader src="icons/instagram.svg"></svg-loader>
                        </a>

                        <a title="e-mail" href="mailto:oskarkivilaan@gmail.com" target="_blank">
                            <svg-loader src="icons/email.svg"></svg-loader>
                            <span>oskar@gmail.ee</span>
                        </a>
                    </section>
                   `;
    }
}

customElements.define('menu-component', Menu);