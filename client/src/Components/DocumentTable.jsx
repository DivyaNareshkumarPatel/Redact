import React from 'react';
import '../style/documents.css';

const documents = [
  { type: 'PDF', name: 'Document 1', status: 'Active', modified: '2024-09-01' },
  { type: 'Word', name: 'Document 2', status: 'Inactive', modified: '2024-08-15' },
  { type: 'Excel', name: 'Document 3', status: 'Active', modified: '2024-07-22' },
  { type: 'PDF', name: 'Document 4', status: 'Pending', modified: '2024-09-05' },
];

export default function DocumentTable() {
  return (
    <div className='doc-content'>
      <h2>Documents</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Content Type</th>
            <th>Name</th>
            <th>Status</th>
            <th>Modified</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index}>
              <td>{doc.type}</td>
              <td>{doc.name}</td>
              <td>{doc.status}</td>
              <td>{doc.modified}</td>
              <td className='options-btn'>
                <button className='btn-edit'>Edit</button>
                <button className='btn-delete'>Delete</button>
                <button className='btn-rename'>Rename</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
