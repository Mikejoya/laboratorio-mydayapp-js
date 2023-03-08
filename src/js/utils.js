export const sayHello = (text) => {
  return text;
};

const ul = document.querySelector('.todo-list');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const newTask = document.querySelector('.new-todo');
const buttonClean = document.querySelector('.clear-completed');
const counterText = document.querySelector('.value-count');
//const inputEdit = document.querySelector('.edit');

let completedCounter = 0;

export function editTaskStatuses(){
  
  newTask.addEventListener('keyup', (event)=>{
    if(event.keyCode === 13){
      const newTaskValue = newTask.value;
      if(newTaskValue !== ''){
        main.style.display = 'block';
        footer.style.display = 'block';
        createElementTask(newTaskValue);
        localStorage.setItem(newTaskValue, 'incomplete');
        newTask.value = '';
      }
      console.log(newTaskValue);
    }
    
  
  });

  if(localStorage.length > 0) {
    main.style.display = 'block';
    footer.style.display = 'block';
  }
  
  Object.keys(localStorage).forEach(key =>{
    createElementTask(key);
    if (localStorage.getItem(key) === 'completed') {
    ul.lastElementChild.classList.add('completed');
    ul.lastElementChild.firstElementChild.firstElementChild.checked = true;
    completedCounter++;
  }
});
counterText.textContent = completedCounter;

}


function createElementTask(value){
  const li = document.createElement('li');
  li.classList.add('clean')
  const div = document.createElement('div');
  div.classList.add('view');
  const inputCheck = document.createElement('input');
  inputCheck.classList.add('toggle');
  inputCheck.type = 'checkbox';
  const label = document.createElement('label');
  label.textContent = value;
  const button = document.createElement('button');
  button.classList.add('destroy');
  const inputText = document.createElement('input');
  inputText.classList.add('edit');
  
  ul.appendChild(li);
  li.appendChild(div);
  div.appendChild(inputCheck);
  div.appendChild(label);
  div.appendChild(button);
  li.appendChild(inputText);
  main.appendChild(ul);
  
  inputCheck.addEventListener('change', () => {
    if (inputCheck.checked) {
      li.classList.add('completed');
      localStorage.setItem(label.textContent, 'completed');
      completedCounter++;
      counterText.textContent = completedCounter;
    } else {
      li.classList.remove('completed');
      localStorage.setItem(label.textContent, 'incompleted');
      completedCounter--;
      counterText.textContent = completedCounter;
    }
  });
  
  label.addEventListener('dblclick', ()=>{
    inputText.value = label.textContent;
    inputText.style.display = 'block';
    div.style.display = 'none';
  });
  
  inputText.addEventListener('keyup', (event)=>{
    if(event.keyCode === 13){
      const newLabelText = inputText.value;
      label.textContent = newLabelText;
      inputText.style.display = 'none';
      div.style.display = 'block';

      const oldValue = localStorage.getItem(value);
      localStorage.setItem(newLabelText, oldValue);
      localStorage.removeItem(value);
      value = newLabelText;
    }
  });
  if (!localStorage.getItem(value)) {
    localStorage.setItem(value, 'incomplete');
  }
  
  button.addEventListener('click', ()=>{
    console.log('Holaa');
    if(li.classList.contains('completed')){
      completedCounter--;
      counterText.textContent = completedCounter;
    }
    li.remove();
    localStorage.removeItem(value);
  });

  buttonClean.addEventListener('click', ()=>{
    if(localStorage.getItem(label.textContent) === 'completed'){
      if(li.classList.contains('completed')){
        completedCounter--;
        counterText.textContent = completedCounter;
      }
      li.remove();
      localStorage.removeItem(value);
    }
  });
  
  
}

window.addEventListener('hashchange', ()=>{
  const tasks = Array.from(document.querySelectorAll('.todo-list li'));
  if(window.location.hash === '#/pending'){
    tasks.forEach(task => {
      const label = task.querySelector('label');
      if(localStorage.getItem(label.textContent) === 'incomplete'){
        task.style.display = 'block';
      }else{
        task.style.display = 'none';
      }
    });

  }else if(window.location.hash === '#/completed'){
    tasks.forEach(task =>{
      const label = task.querySelector('label');
      if(localStorage.getItem(label.textContent) === 'completed'){
        task.style.display = 'block';
      }else{
        task.style.display = 'none';
      }
    });
  }else{
    tasks.forEach(task =>{
      task.style.display = 'block';
    });
  }
});