import { useState } from "react";

// let items= [
//   {id:1 , desc: ' passport' , quantity: 15 , packed: false},
//   {id:2 , desc: ' map' , quantity: 12 , packed: false},
//   {id:3 , desc: ' socks' , quantity: 4 , packed: true},
// ]

export default function App() {
  const [items , setItems] = useState([])
    const handelItems = (item)=> {
    setItems([...items , item])
  }
  return (
    <div className="App bg-dark position-relative ">
      <div className="">
        <Logo/>
        <Form onAddItems={handelItems}/>
        <PackingList items={items} setItems={setItems}/>
        <States number={items}/>
      </div>
    </div>
  );
}


function Logo(){
  return (
    <>
    <div className="logo">
    <h1 className="text-center fs-1 text-capitalize py-4  text-info"> 🌲 far away 🎒 </h1>
    </div>
    </>
  )
}


function Form({onAddItems}){

  const [isEmpty , setIsEmpty] = useState(false)

  const [formatData , setFormatData] = useState({
    desc : "",
    quantity : 1,
  })

  const handelChange = (e)=> {
      const {name , value} = e.target
    setFormatData({
      ...formatData,
      [name] : value,
    })
  }


  function handelSubmit(e){
    e.preventDefault()
    // console.log(e);
    if(formatData.desc.trim() !== ''){
      const newItem = {id: Date.now() , ...formatData , packed: false};
      console.log(newItem);
      onAddItems(newItem)
      setFormatData(
        {
          desc : "",
          quantity : 1,
        })

        setIsEmpty(false)

    }else if(formatData.desc.trim() === ''){
        console.log('empty');
        setIsEmpty(true)
    }

  }

  return(
    <>
    {isEmpty && <div className="position-absolute top-50 w-100 alert alert-danger z-2 text-center fs-2" role="alert">fill the field first</div>}
    <div className="form bg-dark-subtle py-4 text-dark d-flex justify-content-center flex-wrap gap-3">
      <h2 className="text-center fs-3 text-capitalize  ">
        what do you need for your trip 😊❓
        </h2>
        <form action="" className="d-flex justify-content-between gap-lg-5 gap-2" onSubmit={handelSubmit}>
        <select className="form-control"
          name="quantity"
            value={formatData.quantity}
            onChange={handelChange}
        >
          {Array.from({length : 20} , ( _ ,i )=> i + 1 ).map((option)=>
            <option value={option} key={option}>{option}</option>) }
        </select>
        <input type="text" className="form-control" placeholder="name" 
            name="desc"
            value={formatData.desc}
            onChange={handelChange}
        />
        <button className="add btn btn-outline-dark">add</button>
        </form>
    </div>
    </>
  )
}



function PackingList({ items , setItems }) {

  if (!items || items.length === 0) {
    return <p className="text-info fs-2 text-center my-3">add any items to your packing list</p>;
  }


  const handelDelete = (e) => {
    const newItems = items.filter((item) => item.id !== e);
    setItems(newItems);
  };

  const handelCheck = (e) => {
    const newItems = items.map((item) =>
      item.id === e ? { ...item, packed: !item.packed } : item
    );
    setItems(newItems);
  };

  return (
    <>
      <div className="list text-capitalize py-4 text-info fs-5 text-center d-flex justify-content-evenly flex-wrap gap-5">
        {items.map((item) => (
          <Item key={item.id} item={item} onDelete={handelDelete} check={handelCheck} />
        ))}
      </div>
    </>
  );
}


function Item({item , onDelete , check}){

  

  return(
    <>
    <div className="form-check d-flex align-items-center justify-content-evenly gap-2">
        <input className="form-check-input" onClick={()=>check(item.id)}  type="checkbox" value="" id={item.id}/>
        <label className="form-check-label" style={{textDecoration : item.packed ? 'line-through' : 'none' , color: item.packed ? 'grey' : ''}} htmlFor={item.id}>
          {item.quantity} {item.desc}
        </label>
        <button className="btn fs-5" id={item.id} onClick={()=> onDelete(item.id)}>❌</button>
      </div>
    </>
  )
}




function States({number}){

  const packedItems = number.filter((item)=> item.packed ).length;
  const itemsNumber = number.length;
  const percentagePacked = itemsNumber !== 0 ? (packedItems / itemsNumber) * 100 : 0;

  return(
    <>
    <footer className="states text-center text-capitalize text-dark fw-bold fs-3 position-absolute bottom-0 py-4 bg-dark-subtle w-100">
      you have <span>{itemsNumber}</span> items on your list, and you already packed <span>{packedItems}</span> <span>
        ({percentagePacked.toFixed()}%)
        </span>
    </footer>
    </>
  )
}