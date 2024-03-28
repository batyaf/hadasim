"use client";
import { useState, useEffect } from 'react';

export default function NewPatient() {
    const [patient, setPatient] = useState({
        id:'',
        firstName: '',
        lastName: '',
        address: {
            addressCode:' ',
            street: '',
            houseNumber: '',
            city: {
                cityName: '',
                cityCode: ''
            }
        },
        dateOfBirth: '',
        phone: '',
        mobilePhone: ''
    });
    const [cities,setCities]=useState(null)
    const [errorMessage, setErrorMessage] = useState('');

    async function getCitiesData() {
        try {
            const response = await fetch(`http://127.0.0.1:5000/get_all_cities`);
            const citiesJson = await response.json();
            setCities(citiesJson);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    }

    useEffect(() => {
        getCitiesData();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setPatient(prevPatient => ({
            ...prevPatient,
            [name]: value
        }));
    }

    function handleAddressChange(e) {
        const { name, value } = e.target;
        const [parent, field] = name.split('.');
        setPatient(prevPatient => ({
            ...prevPatient,
            address: {
                ...prevPatient.address,
                [field]: value
            }
        }));
    }

    function selectedCity(e) {
        const { value } = e.target;
        const selectedCity = cities.find(city => city.cityName === value);
        if (selectedCity) {
            setPatient(prevPatient => ({
                ...prevPatient,
                address: {
                    ...prevPatient.address,
                    city: {
                        cityName: selectedCity.cityName,
                        cityCode: selectedCity.cityCode
                    }
                }
            }));
        }
    }

    async function insertPatient() {
        let errorMessage = '';

        // Check for missing fields
        if (!patient.firstName) {
            errorMessage += 'First name is required.\n';
        }
        if (!patient.lastName) {
            errorMessage += 'Last name is required.\n';
        }
        if (!patient.address.street) {
            errorMessage += 'Street address is required.\n';
        }
        if (!patient.address.houseNumber) {
            errorMessage += 'House number is required.\n';
        }
        if (!patient.address.city.cityName) {
            errorMessage += 'City name is required.\n';
        }
        if (!patient.dateOfBirth) {
            errorMessage += 'Date of birth is required.\n';
        }
        if (!patient.phone) {
            errorMessage += 'Phone number is required.\n';
        }
        if (!patient.mobilePhone) {
            errorMessage += 'Mobile phone number is required.\n';
        }

        // Update the state with the error message
        setErrorMessage(errorMessage);

        // If all integrity checks pass, proceed with the insertion
        if (!errorMessage) {
            try {
                const response = await fetch('http://localhost:5000/insert_patient', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(patient),
                });
                const messageJson=await await response.json();
                if (response.ok) {
                  setErrorMessager('Patient inserted successfully');
                } else {
                   setErrorMessage(messageJson.erorr);
                }
            } catch (error) {
                console.error('Error inserting patient:', error);
            }
        }
    }

    return (
        <>
            <h1>Insert Patient</h1>
            <div className="insertPatientForm">
                <div className="formGrop">
                    <label htmlFor="id">ID:</label>
                    <input type="text" id="id" name="id" value={patient.id} onChange={handleChange} />
                </div>
                <div className="formGrop">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={patient.firstName} onChange={handleChange} />
                </div>
                <div className="formGrop">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={patient.lastName} onChange={handleChange} />
                </div>
                <div className="formGrop">
                    <label htmlFor="address.street">Street:</label>
                    <input type="text" id="address.street" name="address.street" value={patient.address.street} onChange={handleAddressChange} />
                </div>
                <div className="formGrop">
                    <label htmlFor="address.houseNumber">House Number:</label>
                    <input type="number" id="address.houseNumber" name="address.houseNumber" value={patient.address.houseNumber} onChange={handleAddressChange} />
                </div>
                <div className="formGrop">
                    <label htmlFor="address.city.cityName">City:</label>
                    <select id="address.city.cityName" name="address.city.cityName" value={patient.address.city.cityName} onChange={selectedCity}>
                        <option value="">Select City</option>
                        {cities && cities.map(city => (
                            <option key={city.cityCode} value={city.cityName}>{city.cityName}</option>
                        ))}
                    </select>
                </div>
                <div className="formGrop">
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" value={patient.dateOfBirth} onChange={handleChange} />
                </div>
                <div className="formGrop">
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" id="phone" name="phone" value={patient.phone} onChange={handleChange} />
                </div>
                <div className="formGrop">
                    <label htmlFor="mobilePhone">Mobile Phone:</label>
                    <input type="text" id="mobilePhone" name="mobilePhone" value={patient.mobilePhone} onChange={handleChange} />
                </div>
                <div className="formGrop">
                    <button className="submitButton" onClick={insertPatient}>Insert</button>
                </div>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <style jsx>{`
               h1 {
                margin-bottom: 20px;
                color: turquoise;
            }
            .insertPatientForm {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
            }

            .formGroup {
                display: flex;
                flex-direction: column;
            }

            label {
                font-weight: bold;
            }

            input, select {
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }

            button {
                padding: 8px 16px;
                background-color: turquoise;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                justify-self: center; /* Centers the button horizontally */
            }

            .error-message {
                color: red;
            }
            `}</style>
        </>
    );
}













// import { useState, useEffect } from 'react';

// export default function NewPatient() {
//     const [patient, setPatient] = useState({
//         id:'',
//         firstName: '',
//         lastName: '',
//         address: {
//             addressCode:' ',
//             street: '',
//             houseNumber: '',
//             city: {
//                 cityName: '',
//                 cityCode: ''
//             }
//         },
//         dateOfBirth: '',
//         phone: '',
//         mobilePhone: ''
//     });
//     const [cities,setCtieis]=useState(null)
//     const [errorMessage, setErrorMessage] = useState('');

//     async function getCitiesData() {
//         const response = await fetch(`http://127.0.0.1:5000/get_all_cities`);
//         const citiesJson = await response.json();
//         setCtieis(citiesJson);
//     }

//     useEffect(() => {
//         getCitiesData();
//     }, []);


//     function chngeDetail(e) {
//         const { name, value } = e.target;
//         console.log(name, value); 
//         if (name.startsWith("address")) {
//             const [parent, field] = name.split('.');
//             console.log(parent, field); 
//             setPatient(prevPatient => ({
//                 ...prevPatient,
//                 [parent]: {
//                     ...prevPatient[parent],
//                     [field]: value
//                 }
//             }));
//         } else {
//             setPatient(prevPatient => ({
//                 ...prevPatient,
//                 [name]: value
//             }));
//         }
//     };
    
    
    

//     function selectedCity(e) {
//         const { name, value } = e.target;
//         const selectedCity = cities.find(city => city.cityName === value);
//         if (selectedCity) {
//             setPatient(prevPatient => ({
//                 ...prevPatient,
//                 address: {
//                     ...prevPatient.address,
//                     city: {
//                         cityName: selectedCity.cityName,
//                         cityCode: selectedCity.cityCode
//                     }
//                 }
//             }));
//         }
//     }
    

//     async function insertPanient() {
//         let errorMessage = '';
    
//         // Check for missing fields
//         if (!patient.firstName) {
//             errorMessage += 'First name is required.\n';
//         }
//         if (!patient.lastName) {
//             errorMessage += 'Last name is required.\n';
//         }
//         if (!patient.address.street) {
//             errorMessage += 'Street address is required.\n';
//         }
//         if (!patient.address.houseNumber) {
//             errorMessage += 'House number is required.\n';
//         }
//         if (!patient.address.city.cityName) {
//             errorMessage += 'City name is required.\n';
//         }
//         if (!patient.dateOfBirth) {
//             errorMessage += 'Date of birth is required.\n';
//         }
//         if (!patient.phone) {
//             errorMessage += 'Phone number is required.\n';
//         }
//         if (!patient.mobilePhone) {
//             errorMessage += 'Mobile phone number is required.\n';
//         }
    
//         // Update the state with the error message
//         setErrorMessage(errorMessage);
    
//         // Additional integrity checks if needed
    
//         // If all integrity checks pass, proceed with the update
//         // If all integrity checks pass, proceed with the update
// if (!errorMessage) {
//     try {
//         const response = await fetch('http://localhost:5000/insert_patient', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(patient),
//         });
//         if (response.ok) {
//             console.error('patient insert successfully');
//         } else {
//             console.error('Error inserting patient');
//         }
//     } catch (error) {
//         console.error('Error inserting patient:', error);
//     }
// }

         
//     }
    

//     return (
//         <>
//             <h1>insert patient</h1>
//                 <>
//                     <div>
//                         id:
//                         <input type="text" name="id" onChange={chngeDetail}/><br /><br />
//                         First Name:
//                         <input type="text" name="firstName" onChange={chngeDetail}/><br /><br />
//                         Last Name:
//                         <input type="text" name="lastName" onChange={chngeDetail} /><br /><br />
//                        <h4>address:</h4>
//                         street:
//                         <input type="text" name="address.street" onChange={chngeDetail}/>
//                         house Number:
//                         <input type="number" name="address.houseNumber"  onChange={chngeDetail} />
//                         City:
//                         <select value={(patient && patient.address.city && patient.address.city.cityName) || ''} onChange={selectedCity}>

//                            <option value="{}">select city</option>
//                              {cities&&cities.map(city => (
//                                 <option key={city.cityCode} value={city.cityName} >{city.cityName} </option>
//                             ))}
//                         </select>
//                         <br /><br />
//                         Date of Birth:
//                         <input type="date" name="dateOfBirth"  onChange={chngeDetail} /><br /><br />
//                         Phone:
//                         <input type="number" name="phone"  onChange={chngeDetail} /><br /><br />
//                         Mobile Phone:
//                         <input type="number" name="mobilePhone" onChange={chngeDetail}   /><br /><br />
//                         <button onClick={insertPanient}>insert</button>
//                         {errorMessage && <div className="error-message">{errorMessage}</div>}

//                     </div>
//                 </>
//         </>
//     );
// }
