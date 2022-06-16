export default imageResults = (carousel, response) => {
    let images = [];
    response.data.forEach(item => {
        let img = document.createElement('img');
        img.src = item.images.fixed_height.url;
        img.alt = item.title;
        images.push(img);
        let div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `<img src="${img.src}" alt="${img.alt}"></img>`;
        carousel.appendChild(div);
    })
}

export const xScroll = carousel => carousel.addEventListener("wheel", e => {
    e.preventDefault();
    // console.log(e);
    carousel.scrollLeft += e.deltaY;
    console.log(carousel.scrollLeft);
});