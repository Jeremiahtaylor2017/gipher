export default imageResults = (carousel, response) => {
    let images = [];
    response.data.forEach(item => {
        let img = document.createElement('img');
        img.src = item.images.fixed_height.url;
        img.alt = item.title;
        images.push(img);
        let div = document.createElement('div');
        div.classList.add('item');
        let a = document.createElement('a');
        a.classList.add('returnedGiphy');
        a.href = "#";
        a.innerHTML = `<img src="${img.src}" alt="${img.alt}"></img>`;
        div.appendChild(a);
        carousel.appendChild(div);
    })
}

export const loader = document.querySelector('.lds-roller');
export const hideLoader = () => {
    loader.classList.remove('lds-roller');
}

export const showLoader = () => {
    loader.classList.add('lds-roller');
}

export const carousel = document.querySelector('.carousel');
carousel.style.display = 'none'; // Uncomment this to show carousel