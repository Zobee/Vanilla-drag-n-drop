const list = document.querySelector('.list');
const checkBtn = document.querySelector(".check");

const todos = [
  "Do laundry",
  "Buy milk",
  "Call mom",
  "Go to the gym",
  "Study for midterm",
  "Write essay",
  "Read chapter 2 of econ textbook"
]

const liElems = []

const buildList = () => {
  [...todos]
    .forEach((todo, ind) => {
    const listItem = document.createElement('li');
    listItem.setAttribute('data-index', ind);
    
    listItem.innerHTML = `
      <span>-</span>
      <div class='draggable' draggable="true">
        <p>${todo}</p>
        <div>
          <button class='edit'>Edit</button>
          <button class='delete'>Delete</button>
        </div>
      </div>
    `
    liElems.push(listItem)
    list.appendChild(listItem)
  })

  addEventListeners()
}

function swapItems(start, end){
  const itemOne = liElems[start].querySelector('.draggable')
  const itemTwo = liElems[end].querySelector('.draggable')

  liElems[start].appendChild(itemTwo)
  liElems[end].appendChild(itemOne)
}

let startInd;

function dragStart(){
  startInd = parseInt(this.closest('li').getAttribute('data-index'))
}

function dragOver(e){
  e.preventDefault();
}

function dragDrop(){
  const endInd = parseInt(this.getAttribute('data-index'))
  swapItems(startInd, endInd)
  this.classList.remove('active')
}

function dragEnter(){
  this.classList.add('active')
}

function dragLeave(){
  this.classList.remove('active')
}

function editTodo(){
  console.log(this.closest('li'))
}

function deleteTodo(){
  let todoInd = this.closest('li').getAttribute('data-index');
  liElems[todoInd].remove()
}

const addEventListeners = () => {
  const draggables = document.querySelectorAll('.draggable')
  const dragLis = document.querySelectorAll('.list li')
  const editBtns = document.querySelectorAll('.edit')
  const deleteBtns = document.querySelectorAll('.delete')
  
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart)
  })
  
  dragLis.forEach(item => {
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave)
  })

  editBtns.forEach(btn => btn.addEventListener('click', editTodo))
  deleteBtns.forEach(btn => btn.addEventListener('click', deleteTodo))
}


buildList()