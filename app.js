require('dotenv').config();

const form = document.querySelector('form');
const carousel = document.querySelector('.carousel');

const getGiphy = e => {
    if (e.target.id === 'btnSearch') {
        e.preventDefault();
        let str = document.getElementById('search').value.trim();
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&limit=5&q=${str}`;
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(content => {
            console.log(content.data);
            console.log(content.meta);
            let images = [];
            for (let i = 0; i < content.data.length; i++) {
                let img = document.createElement('img');
                img.src = content.data[i].images.fixed_height.url;
                img.alt = content.data[i].title;
                images.push(img);
                let div = document.createElement('div');
                div.classList.add('item');
                div.innerHTML = `<img src="${img.src}" alt="${img.alt}"></img>`;
                carousel.appendChild(div);
            }
        })
        .catch(err => console.log(err));
    }
}

form.addEventListener('click', getGiphy)

carousel.addEventListener("wheel", e => {
    e.preventDefault();
    carousel.scrollLeft += e.deltaY;
})