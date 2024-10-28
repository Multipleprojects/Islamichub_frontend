import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/article');
      setArticles(response.data.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const createArticle = async () => {
    try {
      const response = await axios.post('http://localhost:5000/article', { title, description });
      setArticles([...articles, response.data.data]);
      resetForm();
    } catch (error) {
      setError(error.response.data.message || 'Error creating article');
    }
  };
  const updateArticle = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/article/${currentId}`, { title, description });
      setArticles(articles.map(article => article._id === currentId ? response.data.data : article));
      resetForm();
    } catch (error) {
      setError(error.response.data.message || 'Error updating article');
    }
  };

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/article/${id}`);
      setArticles(articles.filter(article => article._id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateArticle();
    } else {
      createArticle();
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setEditing(false);
    setCurrentId(null);
    setError('');
    setShowModal(false);
  };

  const startEditing = (article) => {
    setTitle(article.title);
    setDescription(article.description);
    setEditing(true);
    setCurrentId(article._id);
    setShowModal(true);
  };
  // Function to truncate description and toggle
  const truncateDescription = (desc, isExpanded) => {
    const limit = 200;
    return isExpanded || desc.length <= limit
      ? desc
      : `${desc.substring(0, limit)}...`;
  };

  // Filter articles based on search query
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="">
   <div className="d-flex flex-column flex-md-row justify-content-between">
       <h1 className="text-center pb-2" style={{ color: 'rgb(8,124,128)', textDecoration:'underline'}}>Article Manager</h1>
      {/* Search Bar */}
      <div className="text-center mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid rgb(8,124,128)',
          }}
          className='search'
        />
      </div>

      <div className="text-center mb-4">
        <button
          style={{
            backgroundColor: 'rgb(8,124,128)',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '8px',
          }}
          onClick={() => setShowModal(true)}
        >
          Create Article
        </button>
      </div>
</div>
      <div className=" article-list articlescrollbar">
        {filteredArticles.map(article => (
          <div key={article._id} className="card mb-3 p-4 article border" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
            <h3>{article.title}</h3>
            <p>
              {truncateDescription(article.description, article.expanded)}
              {article.description.length > 200 && !article.expanded && (
                <span
                  onClick={() => setArticles(articles.map(a => a._id === article._id ? { ...a, expanded: true } : a))}
                  style={{ color: 'rgb(8,124,128)', cursor: 'pointer', marginLeft: '5px' }}
                >
                  Read More
                </span>
              )}
              {article.expanded && (
                <>
                  <span
                    onClick={() => setArticles(articles.map(a => a._id === article._id ? { ...a, expanded: false } : a))}
                    style={{ color: 'rgb(8,124,128)', cursor: 'pointer', marginLeft: '5px' }}
                  >
                    Show Less
                  </span>
                </>
              )}
            </p>
            <div className='d-flex flex-row'>
              <button
                style={{
                  backgroundColor: 'rgb(8,124,128)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  marginRight: '5px',
                }}
                onClick={() => startEditing(article)}
              >
                Edit
              </button>
              <button
                style={{
                  backgroundColor: 'rgb(8,124,128)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                }}
                onClick={() => deleteArticle(article._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={modalStyles.overlay} className='p-4'>
          <div style={modalStyles.modal}>
            <h2>{editing ? 'Edit Article' : 'Create Article'}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  cols={3}
                  rows={7}
                  style={{ marginBottom: '10px', padding: '8px', width: '100%', height:'80%'  }}
                />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button
                type="submit"
                style={{
                  backgroundColor: 'rgb(8,124,128)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                }}
              >
                {editing ? 'Update' : 'Create'} Article
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  backgroundColor: 'rgb(8,124,128)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  marginLeft: '10px',
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleManager;

// Modal Styles
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '500px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};
