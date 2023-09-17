const data = [
    {
        "todo": "wake up",
        "completed": true,
      },
      {
        "todo": "Do something",
        "completed": false,
      },
      {
        "todo": "just do it",
        "completed": false,
      },
]

if(!localStorage.length) localStorage.setItem('todos',JSON.stringify(data));
const getData = localStorage.getItem('todos')
const itemsFromStore = JSON.parse(getData);

const inputField = document.getElementById('input_field');

const TodoPad = document.getElementById("todo_pad");

// console.log(itemsFromStore)

TodoPad.addEventListener("submit", (e) => {
    e.preventDefault();
  
    if (inputField.value == "") {
        alert("Ensure you input a value in both fields!");
        return null
      } else {
        itemsFromStore.push({'todo': inputField.value, 'completed': false});

       localStorage.setItem('todos', JSON.stringify(itemsFromStore))
       setLocalStorage()
    
        inputField.value = "";
      }
      console.log(itemsFromStore)
  });


  const wrapper = document.getElementById("todo_list");

  function setLocalStorage() {

    if (localStorage.getItem('todos')) {
        let showDiv = document.querySelector('#todo_list');
        showDiv.innerHTML = "";
        let arr = JSON.parse(localStorage.getItem('todos'));
        arr.forEach((todo, id) => {
            let newDiv = document.createElement('div');
            if(todo.completed){
              newDiv.className += "task-completed";
             
            }else{
              newDiv.className += "task-no-completed";
            }
            let htmlData = `${todo.todo}
        <input id="checkbox" type='checkbox' class="task_check_btn" onClick="onCheck(${id})"></input>
        <button onClick='onDelete(${id})'>Delete</button>
        <button id="btnEdit" onClick='onEdit(${id})'>EDIT</button>
        `;
            newDiv.insertAdjacentHTML('afterbegin', htmlData);
            showDiv.insertAdjacentElement('afterbegin', newDiv)
        });


    } else {
        let arr = [];
        let arrData = {
            name: "",
            password: ""
        };
        arr.push(arrData);
        localStorage.setItem('todos', JSON.stringify(arr));
        console.log("data pushed successfully ");



    }
}
setTimeout(() => {
    setLocalStorage();
}, 2);
  
// checked
function onCheck(id) {
document.querySelectorAll('#checkbox').forEach( elem => {
  elem.addEventListener('click', function (e) {
   
    e.stopImmediatePropagation()
    if(e.target.chacked){
      e.target.parentElement.className = "task-no-completed";
      e.target.chacked = false
      
    //  localStorage.setItem('todos')[id].completed = 'false'
    }else{
      e.target.parentElement.className = "task-completed";
      e.target.chacked = true
    }
    console.log(JSON.parse(localStorage.getItem('todos'))[id].completed = !e.target.chacked)
    // console.log(e.target.parentElement, id)
  })})
}

// delete_button
function onDelete(id) {
  console.log(id)
  let arr = JSON.parse(localStorage.getItem('todos'));
  let deleteArr = [...arr];

  deleteArr.splice(id, 1);
  arr = [...deleteArr];
  localStorage.setItem('todos', JSON.stringify(arr));
  setLocalStorage();
}

// edit
function onEdit(id) {
  console.log(id);
  let arr = JSON.parse(localStorage.getItem('todos'));

  submitBtn.setAttribute('disabled', true)

  let editBtn = document.createElement('button');
  let form = document.querySelector('#submitBtn');
  let btnEdit = document.querySelectorAll('#btnEdit');
  
  editBtn.innerHTML = "save edit";
  btnEdit.forEach((element) => { element.setAttribute('disabled', true); })
  form.insertAdjacentElement('beforeend', editBtn)

  editBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let input_field = document.querySelector("#input_field");
      
      arr.splice(id, 1, { todo: input_field.value, completed: false })
      localStorage.setItem('todos', JSON.stringify(arr));
      setLocalStorage();
      input_field.value = ""
     
      form.removeChild(form.lastElementChild);
      submitBtn.removeAttribute('disabled')
  })
}