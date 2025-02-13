"use strict"
const body = document.querySelector("body")
const todoList = document.getElementById("todoList")
const input = document.getElementById("todoInput")
const all = document.getElementById("all")
const active = document.getElementById("active")
const completed = document.getElementById("completed")
const leftCount = document.getElementById("leftCount")
const clearCompleted = document.getElementById("clearCompleted")
const theme = document.getElementById("theme")
const bground = document.getElementById("bground")
const checkBox = document.getElementById("checkBox")
const info = document.getElementById("info")
const settings = document.getElementById("settings")
const themeIcon = document.getElementById("themeIcon")

let todos = JSON.parse(sessionStorage.getItem("todos") || "[]")
let currentTheme = "dark"

window.addEventListener("DOMContentLoaded", () => {
    const storedTodos = sessionStorage.getItem("todos")
    if (storedTodos) {
        todos = JSON.parse(storedTodos)
    }
    renderUI()
})

const addItem = (event) => {
    event.preventDefault()
    if (input.value.trim() === "") {
        alert("Please enter todo")
    } else {
        todos.push({
            id: Date.now(),
            text: input.value.trim(),
            completed: false,
        })
        addToStorage()
        renderUI()
        input.value = ""
    }
}

const renderUI = (displayTodos = todos) => {
    todoList.innerHTML = ""

    leftCount.textContent = todos.filter((todo) => !todo.completed).length
    if (currentTheme === "dark") {
        displayTodos.forEach((todo, index) => {
            let todoItem = document.createElement("div")
            todoItem.className = "flex items-center border-b-gray-700 border-b-1"
            let todoCheck = document.createElement("div")
            todoCheck.className = "bg-[#25273C] h-12 w-16 flex items-center justify-center rounded-l-md md:h-14"
            let todoCheckSpan = document.createElement("span")
            todoCheckSpan.className =
                "w-5 h-5 border-[#cacde8] hover:border-[#57ddff] transition-all  rounded-full border-1 flex items-center justify-center md:hover:cursor-pointer"
            let todoText = document.createElement("p")
            todoText.className =
                "w-full p-3 text-[#f5f5f5e7] bg-[#25273C] font-josefin-sans md:h-14 flex items-center md:text-xl"
            let todoCross = document.createElement("div")
            todoCross.className = "bg-[#25273C] h-12 w-16 flex items-center justify-center rounded-r-md md:h-14 "
            let crossBtn = document.createElement("button")
            crossBtn.className = "md:cursor-pointer"
            let crossImg = document.createElement("img")
            crossImg.src = "src/images/icon-cross.svg"

            todoText.textContent = todo.text

            todoCheck.appendChild(todoCheckSpan)
            crossBtn.appendChild(crossImg)
            todoCross.appendChild(crossBtn)
            todoItem.appendChild(todoCheck)
            todoItem.appendChild(todoText)
            todoItem.appendChild(todoCross)
            todoList.appendChild(todoItem)

            if (todo.completed) {
                const checkImg = document.createElement("img")
                checkImg.src = "src/images/icon-check.svg"
                todoCheckSpan.appendChild(checkImg)
                todoCheckSpan.classList.add("bg-gradient-to-r", "from-[#57ddff]", "to-[#c058f3]")
                todoText.classList.add("line-through")
            }

            all.addEventListener("click", () => {
                all.classList.remove("text-[#f5f5f579]")
                all.classList.add("text-blue-400")
                active.classList.remove("text-blue-400")
                completed.classList.remove("text-blue-400")
                active.classList.add("text-[#f5f5f579]")
                completed.classList.add("text-[#f5f5f579]")
            })

            active.addEventListener("click", () => {
                active.classList.remove("text-[#f5f5f579]")
                active.classList.add("text-blue-400")
                all.classList.remove("text-blue-400")
                completed.classList.remove("text-blue-400")
                all.classList.add("text-[#f5f5f579]")
                completed.classList.add("text-[#f5f5f579]")
            })

            completed.addEventListener("click", () => {
                completed.classList.remove("text-[#f5f5f579]")
                completed.classList.add("text-blue-400")
                active.classList.remove("text-blue-400")
                all.classList.remove("text-blue-400")
                active.classList.add("text-[#f5f5f579]")
                all.classList.add("text-[#f5f5f579]")
            })

            crossBtn.addEventListener("click", () => {
                deleteItem(todo.id)
            })
            todoCheckSpan.addEventListener("click", () => {
                if (!todo.completed) {
                    let checkImg = document.createElement("img")
                    checkImg.src = "src/images/icon-check.svg"
                    todoCheckSpan.appendChild(checkImg)
                    todoCheckSpan.classList.add("bg-linear-to-r", "from-[#57ddff]", "to-[#c058f3]")
                    todoText.classList.add("line-through")
                    todo.completed = !todo.completed
                    addToStorage()
                    renderUI()
                } else {
                    todoCheckSpan.innerHTML = ""
                    todoCheckSpan.classList.remove("bg-linear-to-r", "from-[#57ddff]", "to-[#c058f3]")
                    todoText.classList.remove("line-through")
                    todo.completed = !todo.completed
                    addToStorage()
                    renderUI()
                }
            })
        })
    } else {
        displayTodos.forEach((todo, index) => {
            let todoItem = document.createElement("div")
            todoItem.className = "flex items-center border-b-gray-700 border-b-1"
            let todoCheck = document.createElement("div")
            todoCheck.className = "flex items-center justify-center w-16 h-12 bg-white rounded-l-md md:h-14"
            let todoCheckSpan = document.createElement("span")
            todoCheckSpan.className =
                "w-5 h-5 border-[#cacde8] hover:border-[#57ddff] transition-all rounded-full border-1 flex items-center justify-center md:hover:cursor-pointer"
            let todoText = document.createElement("p")
            todoText.className =
                "w-full p-3 text-[#25273C] bg-white font-josefin-sans md:h-14 flex items-center md:text-xl"
            let todoCross = document.createElement("div")
            todoCross.className = "flex items-center justify-center w-16 h-12 bg-white rounded-r-md md:h-14"
            let crossBtn = document.createElement("button")
            crossBtn.className = "md:cursor-pointer"
            let crossImg = document.createElement("img")
            crossImg.src = "src/images/icon-cross.svg"

            todoText.textContent = todo.text

            todoCheck.appendChild(todoCheckSpan)
            crossBtn.appendChild(crossImg)
            todoCross.appendChild(crossBtn)
            todoItem.appendChild(todoCheck)
            todoItem.appendChild(todoText)
            todoItem.appendChild(todoCross)
            todoList.appendChild(todoItem)

            if (todo.completed) {
                const checkImg = document.createElement("img")
                checkImg.src = "src/images/icon-check.svg"
                todoCheckSpan.appendChild(checkImg)
                todoCheckSpan.classList.add("bg-gradient-to-r", "from-[#57ddff]", "to-[#c058f3]")
                todoText.classList.add("line-through")
            }

            all.addEventListener("click", () => {
                all.classList.remove("text-[#f5f5f579]")
                all.classList.add("text-blue-400")
                active.classList.remove("text-[#f5f5f579]")
                completed.classList.remove("text-[#f5f5f579]")
                active.classList.remove("text-blue-400")
                completed.classList.remove("text-blue-400")
                active.classList.add("text-[#25273C]")
                completed.classList.add("text-[#25273C]")
                renderUI()
            })

            active.addEventListener("click", () => {
                active.classList.remove("text-[#f5f5f579]")
                active.classList.add("text-blue-400")
                all.classList.remove("text-blue-400")
                all.classList.remove("text-[#f5f5f579]")
                completed.classList.remove("text-[#f5f5f579]")
                completed.classList.remove("text-blue-400")
                all.classList.add("text-[#25273C]")
                completed.classList.add("text-[#25273C]")
            })

            completed.addEventListener("click", () => {
                completed.classList.remove("text-[#f5f5f579]")
                completed.classList.add("text-blue-400")
                all.classList.remove("text-[#f5f5f579]")
                active.classList.remove("text-[#f5f5f579]")
                active.classList.remove("text-blue-400")
                all.classList.remove("text-blue-400")
                active.classList.add("text-[#25273C]")
                all.classList.add("text-[#25273C]")
            })

            crossBtn.addEventListener("click", () => {
                deleteItem(todo.id)
            })
            todoCheckSpan.addEventListener("click", () => {
                if (!todo.completed) {
                    let checkImg = document.createElement("img")
                    checkImg.src = "src/images/icon-check.svg"
                    todoCheckSpan.appendChild(checkImg)
                    todoCheckSpan.classList.add("bg-linear-to-r", "from-[#57ddff]", "to-[#c058f3]")
                    todoText.classList.remove("text-[#f5f5f5e7]")
                    todoText.classList.add("line-through")
                    todo.completed = !todo.completed
                    addToStorage()
                    renderUI()
                } else {
                    todoCheckSpan.innerHTML = ""
                    todoCheckSpan.classList.remove("bg-linear-to-r", "from-[#57ddff]", "to-[#c058f3]")
                    todoText.classList.remove("line-through")
                    todo.completed = !todo.completed
                    addToStorage()
                    renderUI()
                }
            })
        })
    }
}

const addToStorage = () => {
    sessionStorage.setItem("todos", JSON.stringify(todos))
}

const deleteItem = (id) => {
    todos = todos.filter((todo) => todo.id !== id)
    addToStorage()
    renderUI()
}

all.addEventListener("click", () => {
    renderUI(todos)
})

active.addEventListener("click", () => {
    const activeTodos = todos.filter((todo) => !todo.completed)
    renderUI(activeTodos)
})

completed.addEventListener("click", () => {
    const completedTodos = todos.filter((todo) => todo.completed)
    renderUI(completedTodos)
})

clearCompleted.addEventListener("click", () => {
    todos = todos.filter((todo) => !todo.completed)
    renderUI()
    addToStorage()
})

theme.addEventListener("click", () => {
    if (currentTheme === "dark") {
        bground.src = "src/images/bg-mobile-light.jpg"
        themeIcon.src = "src/images/icon-moon.svg"
        body.classList.remove("bg-[#161722]")
        body.classList.add("bg-[#F6F3F3]")
        checkBox.classList.remove("bg-[#25273C]")
        checkBox.classList.add("bg-[#ffffff]")
        input.classList.remove("bg-[#25273C]")
        input.classList.add("bg-[#ffffff]")
        input.classList.add("placeholder:text-[#25273C]")
        input.classList.remove("text-white")
        input.classList.add("text-[#25273C]")
        info.classList.remove("bg-[#25273C]")
        info.classList.add("bg-[#ffffff]")
        info.classList.remove("text-[#f5f5f579]")
        info.classList.add("text-[#25273C]")
        settings.classList.remove("bg-[#25273C]")
        settings.classList.add("bg-[#ffffff]")
        settings.classList.remove("text-[#f5f5f5e7]")
        settings.classList.add("text-[#25273C]")
        active.classList.remove("text-[#f5f5f579]")
        active.classList.add("text-[#25273C]")
        completed.classList.remove("text-[#f5f5f579]")
        completed.classList.add("text-[#25273C]")
        currentTheme = "light"
        renderUI()
    } else {
        bground.src = "src/images/bg-mobile-dark.jpg"
        themeIcon.src = "src/images/icon-sun.svg"
        body.classList.add("bg-[#161722]")
        body.classList.remove("bg-[#F6F3F3]")
        checkBox.classList.add("bg-[#25273C]")
        checkBox.classList.remove("bg-[#ffffff]")
        input.classList.add("bg-[#25273C]")
        input.classList.remove("bg-[#ffffff]")
        input.classList.remove("placeholder:text-[#25273C]")
        input.classList.add("text-white")
        input.classList.remove("text-[#25273C]")
        info.classList.add("bg-[#25273C]")
        info.classList.remove("bg-[#ffffff]")
        info.classList.add("text-[#f5f5f5e7]")
        info.classList.remove("text-[#25273C]")
        settings.classList.add("bg-[#25273C]")
        settings.classList.remove("bg-[#ffffff]")
        settings.classList.add("text-[#f5f5f5e7]")
        settings.classList.remove("text-[#25273C]")
        active.classList.remove("text-[#25273C]")
        active.classList.add("text-[#f5f5f579]")
        completed.classList.remove("text-[#25273C]")
        completed.classList.add("text-[#f5f5f579]")
        currentTheme = "dark"
        renderUI()
    }
})
