const profileArea = document.querySelector('#sidebar-1 .profile');

export default class User {
    constructor(name, handle, image) {
        this.name = name;
        this.handle = handle;
        this.image = document.createElement('img');
        this.image.src = image;
        this.image.style.width = '100px';
        this.image.style.height = '100px';
        this.image.style.borderRadius = '50%';
        this.posts = [];
    }

    setProfileDetails() {
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
        profileArea.appendChild(div);
    }
}