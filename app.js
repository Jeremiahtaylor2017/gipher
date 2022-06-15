require('dotenv').config();

const form = document.querySelector('form');

const getGiphy = e => {
    if (e.target.id === 'btnSearch') {
        e.preventDefault();
        let str = document.getElementById('search').value.trim();
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${str}`;
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(content => {
            console.log(content.data);
            console.log(content.meta);
            let figure = document.createElement('figure');
            let img = document.createElement('img');
            img.src = content.data[0].images.downsized.url;
            img.alt = content.data[0].title;
            figure.appendChild(img);
            let out = document.querySelector('.out');
            out.insertAdjacentElement('afterbegin', figure);
        })
        .catch(err => console.log(err));
    }
}

form.addEventListener('click', getGiphy)