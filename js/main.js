const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount');
const total = document.getElementById('total');
const count = document.getElementById('count');
const category = document.getElementById('category');
const submit = document.getElementById('submit');
const search = document.getElementById('search');

let mood = 'create';
let prcingInputs= [price, taxes, ads];
let dataInputs= [title, price, taxes, ads, discount, count, category] ;
let tmp;
let dataProduct;

if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
    dataProduct = [];
}

// Get total 
getTotal = _=> {   
    if(price.value != ''){
        let result = prcingInputs.map(input => +input.value ).reduce((acc, curr)=> acc + curr) - +discount.value
        total.innerHTML = result;
        total.style.backgroundColor = `#7FB77E`
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = ``
    }
}
// Create product

submit.addEventListener('click', event=>{   
    // if(dataInputs.map(input=>JSON.stringify(input.value))){
    //     event.preventDefault()
    // } 
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value.toLowerCase(),
        total: total.innerHTML
    }


// count
    if ([price,title,category].every(input=>input.value != '' && newProduct.count < 100 )){
        if (mood === "create") {
            if (newProduct.count > 1 ){
                for (let i = 0; i < newProduct.count; i++ ){
                    dataProduct.push(newProduct);   
        
                }
            } else {
                dataProduct.push(newProduct);
            }
            clearData();
        } else {
            dataProduct[tmp] = newProduct;        
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
    } else {
    }
    
    
    // Save Local Storage
    localStorage.setItem(`product`, JSON.stringify(dataProduct));
    
    
    showData();


})

// clear the inputs text 

 clearData = ()=>{
    dataInputs.map(input=>{
        input.value = '',
        total.innerHTML = ''
        total.style.backgroundColor = ''
    })        
 }

// read
(showData = ()=>{   
    let table = ``; 
    for (let i = 0; i < dataProduct.length; i++){
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button id="update" class="btn orange" onclick = "updateData(${i})">update</button></td>
                <td><button id="delete" class="btn orange" onclick = "deleteData( ${i} )">delete</button></td>
            </tr>
            `;        
    }

    

    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('deleteAll');
    dataProduct.length > 0 ? btnDeleteAll.innerHTML= `<button class="btn red" onclick = "deleteAll()">Delete All (${dataProduct.length})</button>` : btnDeleteAll.innerHTML= ``;
})();

// delete 

deleteData = (i)=>{
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData()
}

// Delete All 
deleteAll = _=>{
    dataProduct.splice(0);
    localStorage.removeItem('product');
    showData()
}

// update
updateData = i=>{
    dataInputs.map(input=>{        
        input.value = dataProduct[i][`${input.id}`];        
        count.style.display = 'none';
        getTotal();
        submit.innerHTML = 'Update';
        mood = 'update';
        tmp = i;
        scroll({
            top: 0,
            behavior: 'smooth'
        })
    })    
} 

// search 
let searchMood = 'title'; 

getSearchMood = id=>{
    if (id === 'searchTitle'){ 
        searchMood = 'title';
        
    } else {        
        searchMood = 'category';
    }
    search.placeholder = `Search By ${searchMood}`;
    search.focus()
    search.value = '';
    showData()
}

searchData = value=>{
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        if (dataProduct[i][`${searchMood}`].includes(value.toLowerCase())) {
            table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button id="update" class="btn orange" onclick = "updateData(${i})">update</button></td>
                    <td><button id="delete" class="btn orange" onclick = "deleteData( ${i} )">delete</button></td>
                </tr>
                `;               
        } else {

        }

        document.getElementById('tbody').innerHTML = table;
    }
}

// clean data



/* Code Backup */

