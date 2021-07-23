import Router from './router.js';
import "./components/index.js"
import { render, html } from 'https://unpkg.com/lit-html?module';

window.router = new Router()

window.router.on("/contact", (event) => {

})

window.addEventListener("changeCategory", () => {

})

fetch("settings.json").catch(error => console.log(error)).then(data => data.json()).then(async settings => {

    window.settings = settings
    render(html`
        <menu-component></menu-component>
    
        <section id="page-content">
            <images-component></images-component>
        </section>

        <slider-component></slider-component>
    `, document.body)
})