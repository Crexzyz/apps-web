class HelloWorld extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const paragraph = document.createElement('p');
        paragraph.innerHTML = '¡Hola mundo!';
        shadow.appendChild(paragraph);
    }
}

customElements.define('hola-mundo', HelloWorld);
