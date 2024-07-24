import React, { useState} from 'react';
import { IoMdAdd } from "react-icons/io";
import { Checkbox } from 'antd';
import axios from 'axios';      
import './App.css'; 

const App = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    const date = new Date();
    const todayDate = `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`;   

    const addTask = async (taskText) => {
        if (taskText.trim()) {
            try {
                const response = await axios.post('http://127.0.0.1:5000/add', { task: taskText });
                setItems(response.data.map((task, index) => ({ id: index, text: task, checked: false })));
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };

    const handleClick = () => { 
        setItems([...items, { id: items.length, text: newItem, checked: false }]);
        setNewItem('');
    };

    const handleInputChange = (event, index) => {
        const newItems = [...items];
        newItems[index].text = event.target.value;
        setItems(newItems);
    };

    const handleInputBlur = (index) => {
        const item = items[index];
        addTask(item.text);
    };

    const handleCheckboxChange = (index) => {
        const newItems = [...items];
        newItems[index].checked = !newItems[index].checked;
        setItems(newItems);
    };

    const deleteTask = async (taskId) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/delete/${taskId}`);
            setItems(response.data.map((task, index) => ({ id: index, text: task, checked: false })));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className='mainContainer'>
            <h1>My Planner</h1>
            <div className='header'>
                <h5>{todayDate}</h5>
                <button onClick={handleClick}> <IoMdAdd /></button>
            </div>
            <div className='items'>
                {items.map((item, index) => (
                    <div key={item.id} className='item'>
                        <Checkbox 
                            checked={item.checked} 
                            onChange={() => handleCheckboxChange(index)} 
                        />
                        <input
                            id='text-input'
                            type='text'
                            value={item.text}
                            onChange={(event) => handleInputChange(event, index)}
                            onBlur={() => handleInputBlur(index)}
                            className={item.checked ? 'checked-input' : ''}
                        />
                        <button onClick={() => deleteTask(index)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
