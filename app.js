import 'dotenv/config';
import imageResults, { xScroll } from './helpers/carousel';

const form = document.querySelector('form');
const carousel = document.querySelector('.carousel');
let initialLimit = 10;


const getGiphy = async (limit) => {
    let str = document.getElementById('search').value.trim();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&limit=${limit}&q=${str}`;
    let response = await fetch(url)
    if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
    }
    return await response.json();
}
// let response = getGiphy(initialLimit);
// console.log(response.data);
// const showGiphy = e => {
//     if (e.target.id === 'btnSearch') {
//         const response = getGiphy(initialLimit);
//         console.log(response.data);
//         imageResults(carousel, response.data);
//     }
// }

const showGiphy = e => {
    if (e.target.id === 'btnSearch') {
        e.preventDefault();
        getGiphy(initialLimit)
        .then(content => {
            console.log(content.meta);
            console.log(content.data);
            imageResults(carousel, content);
        })
        // let str = document.getElementById('search').value.trim();
        // let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&limit=${limit}&q=${str}`;
        // console.log(url);
        // fetch(url)
        // .then(res => res.json())
        // .then(content => {
        //     // content.pagination.count = 35;
        //     console.log(content.data);
        //     console.log(content.meta);
        //     console.log(content.pagination);
        //     imageResults(carousel, content);
        // })
        // .catch(err => console.log(err));
    }
}

form.addEventListener('click', showGiphy)
xScroll(carousel);
