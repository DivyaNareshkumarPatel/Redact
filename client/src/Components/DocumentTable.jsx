import React, { useState } from 'react';
import '../style/documents.css';

const documents = [
  { type: 'PDF', name: 'Document 1', status: 'Active', modified: '2024-09-01' },
  { type: 'Word', name: 'Document 2', status: 'Inactive', modified: '2024-08-15' },
  { type: 'Excel', name: 'Document 3', status: 'Active', modified: '2024-07-22' },
  { type: 'PDF', name: 'Document 4', status: 'Pending', modified: '2024-09-05' },
];

export default function DocumentTable() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleOptionsClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleEdit = (name) => {
    alert(`Edit ${name}`);
  };

  const handleDelete = (name) => {
    alert(`Delete ${name}`);
  };

  const handleRename = (name) => {
    alert(`Rename ${name}`);
  };

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
                <div className='options-menu'>
                  <button
                    className='options-button'
                    onClick={() => handleOptionsClick(index)}
                  >
                    <i class="dot fa-solid fa-ellipsis"></i>
                  </button>
                  {activeIndex === index && (
                    <div className='dropdown-menu'>
                      <button onClick={() => handleEdit(doc.name)} className='dropdown-item'>Edit</button>
                      <button onClick={() => handleDelete(doc.name)} className='dropdown-item'>Delete</button>
                      <button onClick={() => handleRename(doc.name)} className='dropdown-item'>Rename</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
