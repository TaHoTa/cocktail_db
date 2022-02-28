document.getElementById('search_button').addEventListener('click', function () {
    const inputText = document.getElementById('input_field');
    const inputValue = inputText.value
    inputText.value = '';

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getData(data.drinks));
})

const getData = items => {
    console.log(items);

    const parentDiv = document.getElementById('parent');
    parentDiv.innerHTML = '';

    if (items == null) {
        alert("Please input a valid item name");
    }
    else {
        items.forEach(element => {
            const div = document.createElement('div');
            div.classList.add('item_div');
            div.innerHTML = `
        <div onclick="showDetail('${element.idDrink}')" class="items">
        <img src=${element.strDrinkThumb} alt="">
        <h3>${element.strDrink}</h3>
        <p>${element.strCategory}</p>
        <p>Category ${element.strAlcoholic}</p>
        <p>Category ${(element.strInstructions).slice(0, 100)}</p>
    </div>
        `;
            parentDiv.appendChild(div);
        });
    }
}

const showDetail = details => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getDetail(data.drinks[0]));
}

const getDetail = info => {
    modal.style.display = "block";

    const detailDiv = document.getElementById('detail');
    detailDiv.innerHTML = '';

    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';

    const div2 = document.createElement('div');
    div2.classList.add('detail_div');
    div2.innerHTML = `
        <div class="detailInfo">
            <div >
                <h1>Details</h1>
                <span onclick="closeDetail()" class="close">&times;</span>
            </div>
        <img  class="detail_img" src=${info.strDrinkThumb} alt="">
        <h3>${info.strDrink}</h3>
        <p>${info.strCategory}</p>
        <p>Category ${info.strAlcoholic}</p>
        <p>Category ${(info.strInstructions)}</p>
    </div>
        `;
    detailDiv.appendChild(div2);
}

const modal = document.getElementById('detail');
const overlay = document.getElementById('overlay');

const closeDetail = () => {
    modal.style.display = "none";
    overlay.style.display = "none";
}


// input_field
// search_button
// parent
// detail

// console.log();
//