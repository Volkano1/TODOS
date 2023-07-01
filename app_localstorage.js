const btn = document.getElementById('todo-button');
const todoInput = document.getElementById('todo-input');
const todoUl  = document.getElementById('todo-ul');
//başlangıçta input a odaklanması aktif olması için//

let todos= JSON.parse(localStorage.getItem('todos')) || [];

renderSavedTodos();

function renderSavedTodos() {
 todos.forEach((todo) => {
    //her bir todo objejesini destructure yaptık//
   createListElement(todo);
 });
}

function createListElement(todo) {
    const {id, content, isDone} = todo;
    todoUl.innerHTML += `
    <li  id=${id} class=${isDone ? 'checked' : ''}>
    <i class="fa fa-check"></i>
    <p>${content}</p>
    <i class="fa fa-trash"></i>
    </li>`;
};

window.onload = function() {
    todoInput.focus();
};



btn.addEventListener("click", (e) => {
if(!todoInput.value){
    alert("please enter your todo");    
}else{

    const todoObject = {
        id: new Date().getTime(),
        isDone: false,
        content:todoInput.value,
    };
//yeni oluşturulan todo yu diziye sakla//
    todos.push(todoObject);
//todos dizisinin son halini localstorage ye sakla//
localStorage.setItem('todos', JSON.stringify(todos));
todoUl.innerHTML +=`
<li>
    <i class="fa fa-check"></i>
    <p>${todoInput.value}</p>
    <i class="fa fa-trash"></i>
    </li>`;
    todoInput.value='';
}
});
// klavyeden enter tuşuna basılması ile add butonunun click fonk. çağrılması//
todoInput.addEventListener("keydown", (e) => {
if(e.key==="Enter"){
    btn.click();
}
});
// delete ve ok butonları için event tanımlaması//
todoUl.addEventListener('click', (e) => {
    // Event,sil butonlarının birisinden geldiyse// 
    if(e.target.classList.contains("fa-trash")) {
        //ilgili li elementini silerek dom u güncelle//
        e.target.parentElement.remove();
    }
    if(e.target.classList.contains("fa-check")) {
        // ilgili li elementinde checked adında bir clas varsa bunu sil//
        if(e.target.parentElement.classList.contains("checked")){
            e.target.parentElement.classList.remove("checked");
        }else{
            //ilgili li elementinde checked adında bir class yoksa ekle//
            e.target.parentElement.classList.add('checked');
        }
    }
});
