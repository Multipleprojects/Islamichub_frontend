import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Islamicarticle = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedArticles, setExpandedArticles] = useState({});
  const [showMore, setShowMore] = useState(false);

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

  // Filter articles based on search query
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle the expand/collapse state
  const toggleExpand = (id) => {
    setExpandedArticles(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  // Toggle between showing more or fewer articles
  const handleToggleShow = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="pb-5 pt-5 container">
        <h1 className="underline mb-4 mt-2 ">Islamic Articles</h1>
     
      <div className="row">
        {filteredArticles.slice(0, showMore ? filteredArticles.length : 8).map(article => (
          <div key={article._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  {expandedArticles[article._id] || article.description.length <= 200
                    ? article.description
                    : `${article.description.substring(0, 100)}...`
                  }
                  {article.description.length > 200 && (
                    <span
                      onClick={() => toggleExpand(article._id)}
                      style={{ color: 'rgb(255,193,7)', cursor: 'pointer', marginLeft: '5px', fontWeight:'bold' }}
                    >
                      {expandedArticles[article._id] ? ' Show Less' : ' Show More'}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length > 4 && (
        <p onClick={handleToggleShow} style={{ cursor: 'pointer', color: 'rgb(209,173,60)', textDecoration: 'underline', textAlign: 'center' }}>
          {showMore ? 'Show Less' : 'Show More'}
        </p>
      )}
    </div>
  );
};

export default Islamicarticle;
