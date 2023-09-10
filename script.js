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

const itemsFromStore = JSON.parse(localStorage.getItem('todos'));

const inputField = document.getElementById('input_field');

const TodoPad = document.getElementById("todo_pad");

console.log(itemsFromStore)

TodoPad.addEventListener("submit", (e) => {
    e.preventDefault();
  
    if (inputField.value == "") {
        alert("Ensure you input a value in both fields!");
        return null
      } else {
        itemsFromStore.push({'todo': inputField.value, 'completed': false});

       localStorage.setItem('todos', JSON.stringify(itemsFromStore))

    
        inputField.value = "";
      }
  });


  var wrapper = document.getElementById("todo_list");
  var myHTML = '';
  for (var i = 0; i < itemsFromStore.length; i++) {
    
    myHTML += `<span class="test">${itemsFromStore.todo}` + (i + 1) + '</span><br/><br/>';
  }
  wrapper.innerHTML = myHTML
  