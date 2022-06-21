import 'dotenv/config';
import imageResults, { carousel, loader, hideLoader, showLoader, returnedGiphy } from './helpers/carousel';
import User from './classes/user.js';

// global variables
const form = document.querySelector('form');
const textarea = document.querySelector('textarea');
const userContainer = document.getElementById('userContainer');
const postButton = document.querySelector('.postButton');
// const anchors = document.querySelectorAll('.navAchors');
// console.log(anchors); //stuck here. Getting null?????
let initialLimit = 5;
let initialOffset = 0;


hideLoader();



const jt = {
    user: new User('Jeremiah Taylor', '@jeremiahtaylor', 'https://i.imgur.com/WmRUduL.jpeg')
}

jt.user.setProfileDetails();


const getGiphy = async (limit, offset) => {
    let str = document.getElementById('search').value.trim();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&limit=${limit}&q=${str}&offset=${offset}`;
    let response = await fetch(url)
    if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
    }
    return await response.json();
}

const showGiphy = e => {
    if (e.target.id === 'btnSearch') {
        e.preventDefault();
        carousel.style.display = 'flex';
        showLoader();
        setTimeout(() => {
            try {
                getGiphy(initialLimit, initialOffset)
                .then(content => {
                    console.log(content);
                    console.log(content.meta);
                    console.log(content.data);
                    imageResults(carousel, content);
                })
            } catch (error) {
                console.log(error.message);
            } finally {
                hideLoader();
            }
        }, 500)
    }
}

form.addEventListener('click', showGiphy)

let scrollEvents = [];
carousel.addEventListener("wheel", e => {
    e.preventDefault();
    carousel.scrollLeft += e.deltaY;
    scrollEvents.push(carousel.scrollLeft);
    let condition = false;
    for (let i = 0; i < scrollEvents.length; i++) {
        if (scrollEvents[i] === scrollEvents[i - 1]) {
            condition = true;
        } else {
            condition = false;
        }
    }
    if (condition && carousel.scrollLeft !== 0) {
        initialOffset += 5;
        carousel.appendChild(loader);
        showLoader();
        setTimeout(() => {
            try {
                getGiphy(initialLimit, initialOffset)
                .then(content => {
                    console.log(content);
                    console.log(content.meta);
                    console.log(content.data);
                    imageResults(carousel, content);
                })
            } catch (error) {
                console.log(error.message);
            } finally {
                hideLoader();
            }
        }, 500)
    }
    
});

userContainer.prepend(jt.user.addImage('75px', '75px'));

const autoResize = e => {
    e.preventDefault();
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
}

textarea.addEventListener('input', autoResize, false);

carousel.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.tagName === 'IMG') {
        const image = document.createElement('img');
        image.src = e.target.src;
        image.alt = e.target.alt;
        image.classList.add('selectedImage');
        image.style.height = `${e.target.height}`;
        document.querySelector('.separator').before(image);
        document.getElementById('search').value = '';
        carousel.style.display = 'none';
    }
})

postButton.addEventListener('click', e => {
    e.preventDefault();
    const image = document.querySelector('.selectedImage')
    const nameDiv = document.createElement('div');
    nameDiv.style.display = 'flex';
    nameDiv.style.flexDirection = 'row';
    const name = document.createElement('p');
    name.classList.add('nameInPost');
    name.innerText = jt.user.name;
    const handle = document.createElement('p');
    handle.innerText = jt.user.handle;
    handle.classList.add('handleInPost');
    nameDiv.appendChild(name);
    nameDiv.appendChild(handle);
    const status = document.createElement('p');
    status.innerText = document.querySelector('textarea').value;
    status.classList.add('status');
    const postContainer = document.createElement('div');
    postContainer.classList.add('postContainer');
    postContainer.appendChild(jt.user.addImage('75px', '75px'));
    const post = document.createElement('div');
    post.classList.add('userPost', 'border', 'postData');
    post.appendChild(nameDiv);
    post.appendChild(status);
    post.appendChild(image);
    postContainer.appendChild(post);
    userContainer.insertAdjacentElement('afterend', postContainer);
    document.querySelector('textarea').value = '';
})

// anchor.addEventListener("mouseleave", e => {
//     e.preventDefault();
// })