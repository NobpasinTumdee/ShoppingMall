import React, { useEffect, useState } from 'react';
import './RepairRePage.css';

interface ServiceRequest {
    RequestDate: string;
    ProblemDescription: string;
    Location: string;
    StatusService: string;
    RequestforRepair: string;
}

const ServiceRequest: React.FC = () => {
    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);

    useEffect(() => {
        fetch('/api/service-requests') // API endpoint ที่ดึงข้อมูลจาก backend
            .then(response => response.json())
            .then(data => setServiceRequests(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleAccept = (index: number) => {
        console.log(`Accepted repair request for index: ${index}`);
        // สามารถเพิ่ม logic เพื่อส่งสถานะ accept ไป backend ได้
    };

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">Service Request</h1>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Date</th>
                        <th>Problem</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Repair</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceRequests.map((request, index) => (
                        <tr key={index}>
                            <td>{new Date(request.RequestDate).toLocaleDateString()}</td>
                            <td>{request.ProblemDescription}</td>
                            <td>{request.Location}</td>
                            <td>{request.StatusService}</td>
                            <td>
                                <button
                                    className="btn btn-link"
                                    onClick={() => handleAccept(index)}
                                >
                                    {request.RequestforRepair}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary btn-back" onClick={goBack}>Back</button>
        </div>
    );
};

export default ServiceRequest;
