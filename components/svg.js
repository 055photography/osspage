class Component extends HTMLElement {
    async connectedCallback() {
        await this.loadSvg()
        this.dispatchEvent(new CustomEvent("load"));
    }

    async loadSvg() {
        await fetch(this.getAttribute("src"))
            .catch(error => {
                console.warn("SVG source not found")
            })
            .then(response => response.text())
            .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
            .then(data => this.append(data.documentElement))
    }
}

customElements.define("svg-loader", Component);