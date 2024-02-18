import Header from './Header';
import Content from './Content';
import Footer from './Footer'; 
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';

function App() {
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState("");

  const [search, setSearch] = useState("");


  useEffect(() => {
    // Check if "todo_list" exists in localStorage
    const storedItems = localStorage.getItem("todo_list");
  
    // If "todo_list" doesn't exist or is null, set an empty array
    if (!storedItems) {
      localStorage.setItem("todo_list", JSON.stringify([]));
      setItems([]); 
    } else {
      setItems(JSON.parse(storedItems));
    }
  }, []);
  

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id +1 : 1;
   
    const addNewItem = {id, checked:false, item};
    const listItems = [...items, addNewItem];
    setItems(listItems);
    localStorage.setItem("todo_list",JSON.stringify(listItems));
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id===id ? {...item, checked: !item.checked} : item);
    setItems(listItems);
    localStorage.setItem("todo_list",JSON.stringify(listItems));
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => (item.id!==id));
    setItems(listItems);
    localStorage.setItem("todo_list",JSON.stringify(listItems));
  }

const handleSubmit = (e) => {
  e.preventDefault(); 
  if(newItem.trim().length === 0)
  {
    alert("Cannot Add an Empty Item");
    return; 
  }
  addItem(newItem);
  setNewItem("");
}

  return (
    <div className="App">
      <Header />

      <AddItem
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />

      <SearchItem
        search = {search} 
        setSearch = {setSearch}
       />

      <Content 
        items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
      />

      <Footer length = {items.length}/>
    </div>

  );
}

export default App;
