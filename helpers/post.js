export default addPost = (username, userhandle, userImage) => {
    const image = document.querySelector('.selectedImage');
    const nameDiv = document.createElement('div');
    nameDiv.style.display = 'flex';
    nameDiv.style.flexDirection = 'row';

    const name = document.createElement('p');
    name.classList.add('nameInPost');
    name.innerText = username;

    const handle = document.createElement('p');
    handle.innerText = userhandle;
    handle.classList.add('handleInPost');

    nameDiv.appendChild(name);
    nameDiv.appendChild(handle);

    const status = document.createElement('p');
    status.innerText = document.querySelector('textarea').value;
    status.classList.add('status');

    const postContainer = document.createElement('div');
    postContainer.classList.add('postContainer');
    postContainer.appendChild(userImage);

    const post = document.createElement('div');
    post.classList.add('userPost', 'border', 'postData');
    post.appendChild(nameDiv);
    post.appendChild(status);
    post.appendChild(image);

    postContainer.appendChild(post);
    const userContainer = document.getElementById('userContainer');
    userContainer.insertAdjacentElement('afterend', postContainer);

    document.querySelector('textarea').value = '';
}

export const addFakePost = (username, userhandle, userImage, 
    userStatus, giphy) => {
        const image = document.createElement('img');
        image.src = giphy;
        image.classList.add('selectedImage');
        const nameDiv = document.createElement('div');
        nameDiv.style.display = 'flex';
        nameDiv.style.flexDirection = 'row';
    
        const name = document.createElement('p');
        name.classList.add('nameInPost');
        name.innerText = username;
    
        const handle = document.createElement('p');
        handle.innerText = userhandle;
        handle.classList.add('handleInPost');
    
        nameDiv.appendChild(name);
        nameDiv.appendChild(handle);
    
        const status = document.createElement('p');
        status.innerText = userStatus
        status.classList.add('status');
    
        const postContainer = document.createElement('div');
        postContainer.classList.add('postContainer');
        postContainer.appendChild(userImage);
    
        const post = document.createElement('div');
        post.classList.add('userPost', 'border', 'postData');
        post.appendChild(nameDiv);
        post.appendChild(status);
        post.appendChild(image);
    
        postContainer.appendChild(post);
        const userContainer = document.getElementById('userContainer');
        userContainer.insertAdjacentElement('afterend', postContainer);
}