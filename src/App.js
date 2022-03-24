import React,{ useState, useEffect } from 'react'; 
import TodoItem from './components/TodoItem';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);


    const getData = async () =>{
      const result = await fetch ('http://localhost:3030/todos');
      return await result.json();
    
    };

    useEffect (() => {
      getData().then((res) => setTodos(res));
    }, []);


//-------------custom code---------------

  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  function addItem(){

    if(!newItem){
      alert("Enter an item");
      return;
    }

    const item = {
      id: Math.floor(Math.random()*1000),
      value: newItem
    };

    setItems(oldList => [...oldList, item]);
    setNewItem("");

    console.log(items);
  }

  function deleteItem(id){
    const newArray = items.filter(item => item.id !== id)
    setItems(newArray);
  }


  return (
  <div className="App">

    <h1>Todo List</h1> 
        <input
        type="text"
        placeholder="Add new item"
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
        />

      <button class="btn_add" onClick={ () => addItem() }><b>Add</b></button>

      <ul>
        {items.map(item => {
          return(
            <li key={item.id}><span class="list-item">{item.value}</span> <button class="btn_delete" onClick={ () => deleteItem(item.id) }>X</button></li>
          )
        })}
      </ul>


    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo}/>
      ))}
    </ul>
  </div>
  );
}

export default App;
