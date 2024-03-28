"use client";
import { useState, useEffect } from 'react';

export default function PatientDetails(props) {
    const { id } = props;
    const [patient, setPatient] = useState(null);

    async function getPatientData() {
        const response = await fetch(`http://127.0.0.1:5000/get_all_patient_corona_details/${id}`);
        const patientJson = await response.json();
        setPatient(patientJson);
    }

    useEffect(() => {
        getPatientData();
    }, []);

    return (
        <div className="patientDetailsContainer">
            <h1 >Patient Details</h1>
            {patient && (
                <div className="patientDetailsGrid">
                    <div className="detailItem">
                        <strong>Id:</strong> {patient.patient.id}
                    </div>
                    <div className="detailItem">
                        <strong>First Name:</strong> {patient.patient.firstName}
                    </div>
                    <div className="detailItem">
                        <strong>Last Name:</strong> {patient.patient.lastName}
                    </div>
                    <div className="detailItem">
                        <strong>Address:</strong> {patient.patient.address.street} {patient.patient.address.houseNumber} {patient.patient.address.city.cityName}
                    </div>
                    <div className="detailItem">
                        <strong>Date of Birth:</strong> {patient.patient.dateOfBirth}
                    </div>
                    <div className="detailItem">
                        <strong>Phone:</strong> {patient.patient.phone}
                    </div>
                    <div className="detailItem">
                        <strong>Mobile Phone:</strong> {patient.patient.mobilePhone}
                    </div>
                    <div className="detailItem">
                        <strong>Positivity Date:</strong> {patient.corona.PositivityDate}
                    </div>
                    <div className="detailItem">
                        <strong>Recovery Date:</strong> {patient.corona.recoveryDate}
                    </div>
                    <div className="detailItem">
                        <strong>Vaccine List:</strong>
                        <ul>
                            {patient.vaccines && patient.vaccines.map((vaccine) => (
                                <li key={vaccine.vaccineCode}>
                                    {vaccine.dateOfVaccine} - {vaccine.vaccineManufacturer.manufacturerName}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <style jsx>{`

                h1 {
                    margin-bottom: 20px;
                    color: turquoise;
                }
                .patientDetailsContainer {
                    padding: 20px;
                }

                .patientDetailsGrid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                }

                .detailItem {
                    padding: 10px;
                    border: 1px solid #ccc;
                }

                .detailItem strong {
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
}












// import { useState, useEffect } from 'react';

// export default function PatientDetails(props) {
//     const { id } = props;
//     const [patient, setPatient] = useState(null);

//     async function getPatientData() {
//         const response = await fetch(`http://127.0.0.1:5000/get_all_patient_corona_details/${id}`);
//         const patientJson = await response.json();
//         setPatient(patientJson);
//     }

//     useEffect(() => {
//         getPatientData();
//     }, []);

//     return (
//         <div >
//             <h1 >patient details</h1>
//             {patient && (
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td><strong>id:</strong></td>
//                             <td>{patient.patient.id}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>First Name:</strong></td>
//                             <td>{patient.patient.firstName}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>Last Name:</strong></td>
//                             <td>{patient.patient.lastName}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>Address:</strong></td>
//                             <td>{patient.patient.address.street} {patient.patient.address.houseNumber} {patient.patient.address.city.cityName}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>Date of Birth:</strong></td>
//                             <td>{patient.patient.dateOfBirth}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>Phone:</strong></td>
//                             <td>{patient.patient.phone}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>Mobile Phone:</strong></td>
//                             <td>{patient.patient.mobilePhone}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>Positivity Date:</strong></td>
//                             <td>{patient.corona.PositivityDate}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>recovery Date:</strong></td>
//                             <td>{patient.corona.recoveryDaterecoveryDate}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>Vaccine List:</strong></td>
//                             <td>
//                                 {patient.vaccines && patient.vaccines.map((vaccine) => (
//                                     <tr key={vaccine.vaccineCode}>
//                                         <td><li>{vaccine.dateOfVaccine}</li></td>
//                                         <td>{vaccine.vaccineManufacturer.manufacturerName}</td>
//                                     </tr>
//                                 ))}
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }
