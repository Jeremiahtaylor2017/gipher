import 'dotenv/config';
import imageResults, { carousel, loader, hideLoader, showLoader } from './helpers/carousel';
import addPost, { addFakePost } from './helpers/post.js';
import User from './classes/user.js';


// global variables
const profileArea = document.querySelector('#sidebar-1 .profile');
const form = document.querySelector('form');
const textarea = document.querySelector('textarea');
const userContainer = document.getElementById('userContainer');
const postButton = document.querySelector('.postButton');
// const anchors = document.querySelectorAll('.navAchors');
// console.log(anchors); //stuck here. Getting null?????
let initialLimit = 5;
let initialOffset = 0;

hideLoader();

const users = {
    jt: new User('Jeremiah Taylor', '@jeremiahtaylor', 'https://i.imgur.com/WmRUduL.jpeg'),
    michael: new User('Michael B Jordan', '@michaelbjordan', 'https://www.theperfumegirl.com/perfumes/celebrity-perfumes/michael-b-jordan/images/michael-b-jordan.jpg'),
    ron: new User('Ron Swanson', '@ronswanson', 'https://external-preview.redd.it/X_NIeIS1ofKGGaLHdCOhCgzrvviyHSVW_q90CsXiyAg.jpg?auto=webp&s=9269c7058c08cc8e6ef63d679cbbc53c11eacb36'),
    chris: new User('Chris Rock', '@chrisrock', 'https://c4.wallpaperflare.com/wallpaper/71/441/287/chris-rock-actor-face-smile-wallpaper-preview.jpg'),
    rock: new User('Dwayne "The Rock" Johnson', '@therock', 'https://www.themoviedb.org/t/p/w500/kuqFzlYMc2IrsOyPznMd1FroeGq.jpg')
}

users.jt.setProfileDetails(profileArea);

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

userContainer.prepend(users.jt.addImage('75px', '75px'));

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
        carousel.innerHTML = '';
    }
})

postButton.addEventListener('click', e => {
    e.preventDefault();
    addPost(users.jt.name, users.jt.handle, users.jt.addImage('75px', '75px'));
})

const ronStatus = "Give 100%. 110% is impossible. Only idiots recommend that.";
addFakePost(users.ron.name, users.ron.handle, users.ron.addImage('75px', '75px'), ronStatus, 'https://media4.giphy.com/media/3o85xnoIXebk3xYx4Q/giphy.gif?cid=ecf05e47668kru8ysx2ecw3eanbxn2az90y8xf0whfvaznpi&rid=giphy.gif&ct=g');

const willStatus = "Will Smith just slapped the shit out of me!";
addFakePost(users.chris.name, users.chris.handle, users.chris.addImage('75px', '75px'), willStatus, 'https://media0.giphy.com/media/qyjexFwQwJp9yUvMxq/giphy.gif?cid=ecf05e476v291ozm46mffrnzxjthn6lugtlvbrdhshfipl9j&rid=giphy.gif&ct=g');

const michaelStatus = "For some reason, everyone is disappointed when they meet me. #TheOtherMJ";
addFakePost(users.michael.name, users.michael.handle, users.michael.addImage('75px', '75px'), michaelStatus, `https://media2.giphy.com/media/LAFShX32UwUj6/giphy.gif?cid=ecf05e47wpezstj06eyfwt3jr3b1jciifsyr7m7cnz2l2qqw&rid=giphy.gif&ct=g`);

const rockStatus = "Ya'll smell that?";
addFakePost(users.rock.name, users.rock.handle, users.rock.addImage('75px', '75px'), rockStatus, 'https://media1.giphy.com/media/2cdYfc9hMr9df6dS2s/giphy.gif?cid=ecf05e4775y1ub1nphs35lq3qf50r94bfmj5w310tluuk7pk&rid=giphy.gif&ct=g');

const rock = document.querySelector('.rock');
users.rock.setProfileDetails(rock);

const michael = document.querySelector('.michael');
users.michael.setProfileDetails(michael);

const chris = document.querySelector('.chris');
users.chris.setProfileDetails(chris);

const ron = document.querySelector('.ron');
users.ron.setProfileDetails(ron);

// anchor.addEventListener("mouseleave", e => {
//     e.preventDefault();
// })