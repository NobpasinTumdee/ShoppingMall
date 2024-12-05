import React from 'react';
import './CleaningPage.css';

const CleaningPage: React.FC = () => {
  return (
    <div className="cleaning-container">
      <header className="cleaning-header">
        <h1>Cleaning Task Management</h1>
      </header>
      <div className="cleaning-content">
        <aside className="sidebar">
          <h2>Task Categories</h2>
          <ul>
            <li>Floor Cleaning</li>
            <li>Glass Cleaning</li>
            <li>Trash Collection</li>
            <li>Restroom Cleaning</li>
          </ul>
        </aside>
        <main className="main-content">
          <h2>Task Logs</h2>
          <table>
            <thead>
              <tr>
                <th>Area</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lobby</td>
                <td>08:00</td>
                <td>09:30</td>
                <td>Completed</td>
              </tr>
              <tr>
                <td>Restroom</td>
                <td>10:00</td>
                <td>11:00</td>
                <td>In Progress</td>
              </tr>
            </tbody>
          </table>
        </main>
        <aside className="sidebar">
          <h2>Equipment Status</h2>
          <ul>
            <li>Mop: 5 available</li>
            <li>Bucket: 2 available</li>
            <li>Detergent: Running low</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default CleaningPage;
