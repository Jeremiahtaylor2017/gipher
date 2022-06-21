export default class User {
    constructor(name, handle, image) {
        this.name = name;
        this.handle = handle;
        this.image = document.createElement('img');
        this.image.src = image;
        this.image.style.width = '100px';
        this.image.style.height = '100px';
        this.image.style.borderRadius = '50%';
    }

    setProfileDetails(element) {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.flexDirection = 'row';
        const innerDiv = document.createElement('div');
        const name = document.createElement('p');
        name.innerText = this.name;
        name.classList.add('profileName');
        name.style.fontSize = '16px';
        const handle = document.createElement('p');
        handle.innerText = this.handle;
        handle.classList.add('profileHandle');
        handle.style.fontSize = '12px';
        innerDiv.style.lineHeight = '0.2';
        innerDiv.style.margin = 'auto 10px';
        innerDiv.appendChild(name);
        innerDiv.appendChild(handle);
        div.style.marginTop = '10px';
        div.style.marginLeft = '22px';
        div.appendChild(this.image);
        div.appendChild(innerDiv);
        element.appendChild(div);
    }

    addImage(height='100px', width='100px') {
        const image = document.createElement('img');
        image.src = this.image.src;
        image.style.borderRadius = '50%';
        image.style.height = height;
        image.style.width = width;
        return image;
    }
}