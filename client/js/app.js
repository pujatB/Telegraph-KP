// ********************************************
// SETUP
const btn = document.querySelector('#msg-btn');
const form = document.querySelector('#new-shop-form');
const shopList = document.querySelector('table');

// Bind event listeners
btn.addEventListener('click', getMessage);
form.addEventListener('submit', submitItem);

// Fetch all items as soon as app is loaded
getAllItems();

// ********************************************

// Shop FLOW
// index
function getAllItems(){
    fetch('http://localhost:3000/shop')
        .then(r => r.json())
        .then(appendItems)
        .catch(console.warn)
};

// create
function submitItem(e){
    e.preventDefault();

    const shopData = {
        name: e.target.name.value,
        price: e.target.price.value,
        stock_left: e.target.stock.value
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(shopData),
        headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3000/shop', options)
        .then(r => r.json())
        .then(appendItem)
        .then(() => e.target.reset())
        .catch(console.warn)
};

// function updateDog(id, tr){
//     const options = { 
//         method: 'PATCH',
//     };
//     fetch(`http://localhost:3000/dogs/${id}`, options)
//         .then(r => r.json())
//         .then(data => {
//             const { dog } = data
//             tr.querySelectorAll('td')[1].textContent = dog.age
//         })
//         .catch(console.warn)
// }

function deleteItem(id, li){
    console.log('deleting', id)
    const options = { 
        method: 'DELETE',
    };
    fetch(`http://localhost:3000/dogs/${id}`, options)
        .then(li.remove())
        .catch(console.warn)
}

// helpers
function appendItems(data){
    data.items.forEach(appendItem);
};

function appendItem(itemData){
    const newRow = document.createElement('tr');
    const itemLi = formatItemTr(itemData, newRow)
    shopList.append(newRow);
};


function formatItemTr(item, tr){
    const nameTd = document.createElement('td');
    const priceTd = document.createElement('td');
    const stockTd = document.createElement('td');

    const delTd = document.createElement('td');
    const uptTd = document.createElement('td');
    const delBtn = document.createElement('button');
    const uptBtn = document.createElement('button');

    delBtn.setAttribute('class', 'delete')
    uptBtn.setAttribute('class', 'update')
    delBtn.textContent = 'X';
    // uptBtn.textContent = '+';
    delBtn.onclick = () => deleteItem(item.id, tr);
    // uptBtn.onclick = () => updateDog(item.id, tr);
    delTd.append(delBtn);
    // uptTd.append(uptBtn);

    nameTd.textContent = item.name
    priceTd.textContent = item.price
    stockTd.textContent = item.stock_left

    tr.append(nameTd)
    tr.append(priceTd)
    tr.append(stockTd)
    tr.append(delTd)
    tr.append(uptTd)

    return tr
}

// ********************************************

// MESSAGE FLOW
function getMessage(){
    fetch('http://localhost:3000')
        .then(r => r.text())
        .then(renderMessage)
        .catch(console.warn)
};

function renderMessage(msgText){
    document.querySelector('#msg-btn').textContent = msgText;
};



// ********************************************