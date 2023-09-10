import "./index.css";
import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];
function App() {
  const [items, setItems] = useState([]);
  const handleAddItems = (newItems) => {
    setItems((items) => [...items, newItems]);
  };
  return (
    <>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </>
  );
}
//LOGO
function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}
//FORM
function Form(props) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!description) return;

    const newItems = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    props.onAddItems(newItems);

    console.log(newItems);
    setDescription("");
    setQuantity(1);
  };
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        name="order"
        id="order"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

//PACKING LIST
function PackingList(props) {
  return (
    <div className="list">
      <ul className="list">
        {props.items.map((item) => (
          <Item item={item} key={item?.id} />
        ))}
      </ul>
    </div>
  );
}

//ITEM
function Item({ item }) {
  return (
    <li>
      <input type="checkbox" id="myCheckbox" value="checkboxValue" />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

//STATS
function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

export default App;
