let elForm = document.querySelector(".todo-form")
let inputValue = document.querySelector(".todo-input")
let elTodoList = document.querySelector(".todo-list")

let elModaWrapper = document.querySelector(".modal-wrapper")
let elModaInner = document.querySelector(".modal-inner")

let elAllCount = document.querySelector(".all-count")
let elComplatedCount = document.querySelector(".complated-count-btn")
let elUncomplatedCount = document.querySelector(".uncomplated-count")
let elCountBtnWrapper = elAllCount.parentElement.parentElement

let elchoosenImg = document.querySelector(".chusen-img")
let elUploadImg = document.querySelector(".todo-form")

let todos = JSON.parse(localStorage.getItem("todos"))

// elCountBtnWrapper.addEventListener("click", function(e) {
//     if (
//         e.target.matches(".all-count")
//         renderTodos(todos)
//     )
    
//     else if(e.target.matches(".complated-count-btn")) {
//         const filteredArr = todos.filter(item => item.isComplated == true)
//         renderTodos(filteredArr)
//     }
    
//     else if(e.target.matches(".upcomplated-count-btn")) {
//         const filteredArr = todos.filter(item => item.isComplated == false)
//         renderTodos(filteredArr)
//     }
// })

elForm.addEventListener("submit", function (e) {
    e.preventDefault()
    const data = {
        id: todos.length + 1,
        todoValue: inputValue.value,
        isComplated: false, 
        imgURL:e.target.elchoosenImg.files[0] ? URL.createObjectURL(e.target.elchoosenImg.files[0]) : null
    }
    
    e.target.reset()
    todos.push(data)
    renderTodos(todos)
    elUploadImg.src = "./images/upload-svgrepo-com.svg"
    localStorage.setItem("todos", JSON.stringify(todos))
})

function renderTodos(arr) {
    elTodoList.innerHTML = null
    arr.forEach((item, index) => {
        let elTodoItem = document.createElement("li")
        elTodoItem.className = `flex bg-gray p-2 rounded-lg items-center justify-between ${item.isComplated ? "opacity-70 line-through" : ""}`
        elTodoItem.innerHTML = `
                <div class="flex item-center">
                    <span>${index + 1}.</span>
                    ${item.imgURL ? `<img class="rounded-lg" scr="${item.imgURL}" alt="" width="50" height="50"/>` : ""}
                </div>
                <div class="flex items-center space-x-1">
                    <div onclick="handleComplatedClick(${item.id})" class="w-[20px] relative h-[20px] cursor-pointer rounded-full border-[2px] border-black">
                        <div class="absolute inset-[2px] ${item.isComplated ? "bg-blue-500" : ""}"></div>
                    </div>
                    <button id="${item.id}" onclick="handleDeleteTodo(${item.id})" type="button" class="delete-btn p-[6px] rounded-lg bg-red-500 text-white border-[2px] border-transparentfont-semibold">Delete</button>
                    <button onclick="handleUpdateTodo(${item.id}) type="button" class="p-[6px] rounded-lg bg-red-500 text-white border-[2px] border-transparentfont-semibold">Update</button>
                </div>
            `
        elTodoList.append(elTodoItem)
    })

    elAllCount.textContent = todos.length
    elComplatedCount.textContent = todos.filter(item => item.isComplated == true)
    elUncomplatedCount.textContent = todos.filter(item => item.isComplated == false)
}
renderTodos(todos)


function handleDeleteTodo(id) {
    const findedIndex = todos.findIndex(item => item.id == id)
    todos.splice(findedIndex, 1)
    renderTodos(todos)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function handleComplatedClick(id) {
    const findedObj = todos.findIndex(item => item.id == id)
    findedObj.isComplated = !findedObj.isComplated
    renderTodos(todos)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function handleUpdateTodo(id) {
    elModaWrapper.classList.remove(scale-0)
    const findedObj = todos.find(item => item.id == id)
    elModaInner.innerHTML =`
        <form class="update-form">
            <div class="flex justify-between">
                <input value = "${findedObj.todoValue}" class="w-[80%] rounded-lg pl-2" type="text" name="updateTodoValue" plakeholder="Update todo"/>
                <button id="${id}" type="subpur" class="p-[6px] rounded-lg bg-blue-500 text-white border-[2px] border-transparent font-semibold"></button>
            </div>
            <lable>
                <input class="hidden update-file" type="file"/>
                <img class="update-img rounded-lg" scr="${findedObj.imgURL}"  alt="" width="100" height="100"/>
            </lable>
        </form>
    `
}