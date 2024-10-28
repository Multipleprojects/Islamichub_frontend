import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';

const Message = () => {
  const [messages, setMessages] = useState([]); // Store all messages
  const [show, setShow] = useState(false); // Modal visibility
  const [selectedMessage, setSelectedMessage] = useState(null); // Selected message for update
  const [updatedMessage, setUpdatedMessage] = useState(''); // Store updated message content

  // Function to fetch all messages (GET method)
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/message/get');
      const data = await response.json();
      if (data.success) {
        setMessages(data.data); // Set the messages in state
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Function to handle update click (opens modal and pre-fills message content)
  const handleUpdateClick = (message) => {
    setSelectedMessage(message); // Set the clicked message to update
    setUpdatedMessage(message.message); // Pre-fill the modal with current content
    setShow(true); // Show the modal
  };

  // Function to close the modal
  const handleClose = () => setShow(false);

  // Function to handle message update (PUT method)
  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/message/update/${selectedMessage._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: updatedMessage }), // Send updated message
      });

      const data = await response.json();
      if (data.success) {
        // Update the message list locally after successful update
        const updatedMessages = messages.map((msg) =>
          msg._id === selectedMessage._id ? data.data : msg
        );
        setMessages(updatedMessages);
        handleClose(); // Close modal after updating
      } else {
        console.error('Error updating message:', data.message);
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  // Fetch messages when component loads
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={{overflowY:'hidden'}}>
      <h3>Message List</h3>
      <div  >
        {messages.map((message) => (
          <div key={message._id} className="col-md-3 mb-3">
            <Card>
              <Card.Body>
                <Card.Text>{message.message}</Card.Text>
                <Button variant="warning" onClick={() => handleUpdateClick(message)}>
                  Update
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal for updating message */}
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Update Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control
  as="textarea" // Changes input type to textarea
  rows={3} // Sets number of visible rows
  value={updatedMessage}
  onChange={(e) => setUpdatedMessage(e.target.value)}
/>


            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="warning" onClick={handleUpdateSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Message;
