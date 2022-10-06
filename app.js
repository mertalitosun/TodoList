const todoList = document.querySelector(".todoList");
const brand = document.querySelector(".brand");
const input = document.getElementById("input");
const add = document.getElementById("add");
const dlt = document.getElementById("dlt");
const addBrand = document.getElementById("addBrand");
const header = document.querySelector(".navbar");
const brandspan = document.getElementById("brand");
const brandTodo = document.querySelector(".brandTodo")


// localstorage da todos key ile dizi oluşturur.
const getStorage = () => {
    const storage = JSON.parse(localStorage.getItem("todos"));
    return (storage) ? storage : [] ;
}


const todos = getStorage();


// oluşturulan dizide döner ve dizidekileri ekrana yazdırır
const getTodosToPage = () => {
    todos.forEach((todo) => {
        createTodo(todo);
    });
}

// ekran yenilendiğinde fonksiyonu çağırır
window.addEventListener("load", () => {
    getTodosToPage();
})

// localStorage'a todo ekler
const saveTodoStorage = (todo) => {

    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
    createTodo(todo);
}

// ekrandan todo siler
const removeTodo = (target) => {
    // console.log(target.parentNode.childNodes[0].innerHTML);
    const todo = target.parentNode.childNodes[0].innerHTML;
    target.parentNode.parentNode.remove();
    removeTodoStorage(todo);
}
// localStorage dan todo siler
const removeTodoStorage = (todo) => {
    const index = todos.indexOf(todo);
    todos.splice(index,1);
    localStorage.setItem("todos",JSON.stringify(todos));
}

// todoList brand input alma
const createBrand = () => {
    const brandInput = document.createElement("input");
    const brandbtn = document.createElement("button")
    brandbtn.classList.add("btn","btn-primary","fa-solid", "fa-plus");

    header.appendChild(brandInput);
    header.appendChild(brandbtn);

    brandbtn.addEventListener("click", () => {
        createBrandSpan(brandInput.value);
        brandInput.style.visibility = "hidden";
        brandbtn.style.visibility = "hidden";
        todoList.style.visibility = "visible";
    });
}

// todolist ad ekleme 
const createBrandSpan = (brandinp) => {
    const brandText = document.createElement("span");
    brandText.innerHTML = brandinp;
    const branddltbtn = document.createElement("button");
    branddltbtn.classList.add("btn", "btn-danger","fa-solid", "fa-trash",);
    brandspan.appendChild(brandText);
    brandTodo.appendChild( branddltbtn);
}



// inputları ekrana yazdırır
const createTodo = (text) =>{
    const todoItem = document.createElement("div");
    todoItem.classList.add("todoItem");
    const todoItemLi = document.createElement("li");
    const todoText = document.createElement("span");
    todoText.innerHTML = text;
    const dltbtn = document.createElement("button");
    dltbtn.classList.add("delete", "btn", "btn-danger","fa-solid", "fa-trash", "dltbtn");
    dltbtn.setAttribute("onclick","removeTodo(this)");

    // edit butonu
    // const edtbtn = document.createElement("button");
    // edtbtn.classList.add("delete", "btn", "btn-warning","fa-solid", "fa-trash");
    // edtbtn.setAttribute("onclick","todoEdit(this)");
    todoItem.appendChild(todoItemLi);
    todoItemLi.appendChild(todoText);
    todoItemLi.appendChild(dltbtn);
    todoList.appendChild(todoItem);

    


}

// butona tıklandığında ekrana yazan fonksiyonu çağırır
add.addEventListener("click", () => {
    if(input)
    saveTodoStorage(input.value);
    input.value = "";
})

addBrand.addEventListener("click", () => {
    createBrand();
    addBrand.style.visibility = "hidden";
})

