import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, Toaster } from 'react-hot-toast';
// Define Tasbeeh data
const tasbeehData = [
  { name: 'الحمدللہ', count: 33 },
  { name: 'سبحان اللہ', count: 33 },
  { name: 'اللہ اکبر', count: 34 }
];

const Tasbeeh = ({ show, handleClose }) => {
  // Initialize state to keep track of counts
  const [counts, setCounts] = useState(
    tasbeehData.reduce((acc, item) => ({ ...acc, [item.name]: 0 }), {})
  );

  // Increment the count for a specific Tasbeeh item
  const incrementCount = (name, target) => {
    setCounts((prevCounts) => {
      const newCount = prevCounts[name] + 1;
      return { ...prevCounts, [name]: newCount };
    });
    // Display a message if the count equals the target
    if (counts[name] + 1 === target) {
      toast.success(`${name} completed!`);
    counts[name]=-1;
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '20px',
  };

  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgb(8,124,128)',
    paddingBottom: '10px',
    color: 'rgb(8,124,128)',
    fontSize: '18px',
    lineHeight: '1.5',
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title style={{ color: 'rgb(8,124,128)' }}>Tasbeeh</Modal.Title>
      </Modal.Header>
      <Modal.Body style={containerStyle}>
        {tasbeehData.map((item) => (
          <div key={item.name} style={itemStyle}>
            <span>{item.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>{counts[item.name]}</span>
              <FaPlus
                size={20}
                color='rgb(8,124,128)'
                style={{ cursor: 'pointer' }}
                onClick={() => incrementCount(item.name, item.count)}
              />
            </div>
            <Toaster />
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Tasbeeh;
