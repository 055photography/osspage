
import "./components/index.js"
import { render, html } from 'https://unpkg.com/lit-html?module';



fetch("settings.json").catch(error => console.log(error)).then(data => data.json()).then(async settings => {

    window.settings = settings
    render(html`
        <menu-component></menu-component>
    
        <section id="page-content">
            <images-component></images-component>
        </section>
    `, document.body)
})