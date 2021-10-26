import { useState } from "react";

function OneAnimal({ fieldAnimal, goHome, addWeight, addDate }) {

    const [weight, setWeight] = useState('');

    const [date, setDate] = useState('');

    const handleDate = event => {
        setDate(event.target.value);
    }

    const handleWeight = event => {
        setWeight(event.target.value);
    }

    const submitWeight = () => {
        addWeight(fieldAnimal.id, weight);
        setWeight('');

    }

    const submitDate = () => {
        addDate(fieldAnimal.id, date);
        setDate('');
    }

    return (
        <>
            <h2>Gyvulėlio ID: {fieldAnimal.id}</h2>
            <h2>Gyvulėlio svoris: {fieldAnimal.weight}</h2>
            <input type="text" onChange={handleWeight} value={weight} />
            <button className='btn' onClick={submitWeight}>Add</button>
            <h2>Pamaitintas: {fieldAnimal.date}</h2>
            <input type="date" onChange={handleDate} value={date} />
            <button className='btn' onClick={submitDate}>Add date</button>
            <button className='btn' onClick={() => goHome(fieldAnimal.id)}>Home</button>
        </>

    );
}
export default OneAnimal;