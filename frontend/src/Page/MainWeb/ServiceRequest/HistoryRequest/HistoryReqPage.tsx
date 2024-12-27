import React, { useEffect, useState } from 'react';
import './HistoryReqPage.css'; // Create this CSS file for custom styles

interface ServiceRequest {
    RequestDate: string;
    ProblemDescription: string;
    Location: string;
    StatusService: string;
}

const ServiceRequest: React.FC = () => {
    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);

    useEffect(() => {
        fetch('/api/service-requests')
            .then(response => response.json())
            .then(data => setServiceRequests(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

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
                    </tr>
                </thead>
                <tbody>
                    {serviceRequests.map((request, index) => (
                        <tr key={index}>
                            <td>{new Date(request.RequestDate).toLocaleDateString()}</td>
                            <td>{request.ProblemDescription}</td>
                            <td>{request.Location}</td>
                            <td>{request.StatusService}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary btn-back" onClick={goBack}>Back</button>
        </div>
    );
};

export default ServiceRequest;
