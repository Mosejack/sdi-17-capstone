import React, {useState} from 'react'
import './add.css'


const AddTrailer = ({ currentUser, setVehicleType }) => {
    const [type, setType] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [length, setLength] = useState('');
    const [condition , setCondition] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [sold, setSold] = useState('');
    const [image, setImage] = useState('');

    return (
        <div className='car-creation-container'>
            <div className ='additem'>
                <div>
                    <label>Type</label>
                    <input type='textbox' id='type' onChange={(e) => setType(e.target.value)} />
                </div>
                <div>
                    <label>Make</label>
                    <input type='textbox' id='make' onChange={(e) => setMake(e.target.value)} />
                </div>
                <div>
                    <label>Model</label>
                    <input type='textbox' id='model' onChange={(e) => setModel(e.target.value)} />
                </div>
                <div>
                    <label>Year</label>
                    <input type='textbox' id='year' onChange={(e) => setYear(e.target.value)} />
                </div>
                <div>
                    <label>Price</label>
                    <input type='textbox' id='price' onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <label>Length</label>
                    <input type='textbox' id='length' onChange={(e) => setLength(e.target.value)} />
                </div>
                <div>
                    <label>Condition</label>
                    <input type='textbox' id='condition' onChange={(e) => setCondition(e.target.value)} />
                </div>
                <div>
                    <label>Location</label>
                    <input type='textbox' id='loction' onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea type='textbox' id='description' onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>
            <button
                className='addbutton'
                onClick={() => {
                    fetch(`http://localhost:3001/addListing/trailers`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            'type': type,
                            'description': description,
                            'make': make,
                            'model': model,
                            'year': Number(year),
                            'price': Number(price),
                            'length': Number(length),
                            'condition': condition,
                            'location': location,
                            'userId': currentUser.userId,
                        })
                    })
                        .then(data => data.json())
                        .then(res => console.log(res))
                        .then(window.location = '/listings')
                        .then(alert('Added Successful!'));
                    }}
            >addbutton</button>
            <button onClick={() => setVehicleType('')}>Go Back</button>
        </div>
    );

}

export default AddTrailer