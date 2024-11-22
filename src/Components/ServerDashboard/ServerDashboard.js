import React, { useEffect, useState } from 'react';
import './Server.css';
import axios from 'axios';


const ServerDashboard = () => {
    const [leads, setLeads] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch leads when component mounts
    useEffect(() => {
        const fetchLeads = async () => {
            const token = localStorage.getItem('token'); // Assuming token is stored here

            if (!token) {
                setError("Unauthorized. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/leads', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setLeads(response.data.leads);
            } catch (err) {
                console.error("Error fetching leads:", err);
                setError(err.response?.data?.error || "Failed to fetch leads.");
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Leads Dashboard</h1>
            {loading ? (
                <p>Loading leads...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : leads.length === 0 ? (
                <p>No leads found.</p>
            ) : (
                <table className="leads-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Submitted At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead) => (
                            <tr key={lead._id}>
                                <td>{lead.name}</td>
                                <td>{lead.email}</td>
                                <td>{lead.message}</td>
                                <td>{new Date(lead.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ServerDashboard;
