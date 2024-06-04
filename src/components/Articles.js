// src/components/Articles.js
import { useState, useEffect } from 'react';
import { Card, Accordion, Badge, Button, Form, Modal } from 'react-bootstrap'; // Import necessary components from react-bootstrap
import axios from 'axios';
import './menu.css';
import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('et-EE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState(null);
  const [editModalShow, setEditModalShow] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [editedArticle, setEditedArticle] = useState({ title: '', description: '', body: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9898/api/articles');
        setArticles(response.data.articles); 
      } catch (error) {
        console.error('There was a problem with the axios operation:', error);
      }
    };

    const fetchUser = async () => {
      try {     
        const response = await axios.get('http://localhost:9898/api/auth/signin'); 
        setUser(response.data);   
      } catch (error) {   
        console.error('There was a problem:', error);  
      }    
    };
    
    fetchData();
    fetchUser();
  }, []);

  const handleDeleteArticle = async (articleSlug) => {
    try {
      await axios.delete(`http://localhost:9898/api/articles/${articleSlug}`);
      setArticles(articles.filter((article) => article.slug !== articleSlug));
    } catch (error) {
      console.error('There was a problem with the delete operation:', error);
    }
  };

  const handleEditArticle = (article) => {
    setCurrentArticle(article);
    setEditedArticle({ title: article.title, description: article.description, body: article.body });
    setEditModalShow(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:9898/api/articles/${currentArticle.slug}`, editedArticle);
      setArticles(articles.map(article => article.slug === currentArticle.slug ? response.data.article : article));
      setEditModalShow(false);
    } catch (error) {
      console.error('There was a problem with the edit operation:', error);
    }
  };

  const handleAddComment = async (articleSlug, articleId, commentBody) => {
    try {
      const response = await axios.post(`http://localhost:9898/api/comments/${articleId}`, { body: commentBody });
      setArticles(articles.map(article => article.slug === articleSlug ? response.data.article : article));
    } catch (error) {
      console.error('There was a problem with adding the comment:', error);
    }
  };

  const handleDeleteComment = async (articleSlug, articleId) => {
    try {
      const response =await axios.delete(`http://localhost:9898/api/comments/${articleId}`);
      setArticles(articles.map(article => article.slug === articleSlug ? response.data.article : article));
    } catch (error) {
      console.error('There was a problem with deleting the comment:', error);
    }
  };

  const handleEditComment = async (articleSlug, articleId, editedCommentBody) => {
    try {
      const response = await axios.put(`http://localhost:9898/api/comments/${articleId}`, { body: editedCommentBody });
      setArticles(articles.map(article => article.slug === articleSlug ? response.data.article : article));
    } catch (error) {
      console.error('There was a problem with editing the comment:', error);
    }
  };

  return (
    <div>
      {articles.map(article => (
        <Card key={article.id} className="mb-3">
          <Card.Header style={{ fontWeight: 'bold', fontSize: '2rem', justifyContent: 'space-between' }} as="h4">
            {article.title} 
          </Card.Header>

          <Card.Body>
            {isValidUrl(article.description) ? (
              <Card.Img variant="top" src={article.description} alt={article.title} className="card-img"/>
            ) : (
              <Card.Text>{article.description}</Card.Text>
            )}
            <Card.Text className="text-justify">{article.body}</Card.Text>
          </Card.Body>

          {user && user.id === article.author.username && (
            <div>
              <Button variant="danger" onClick={() => handleDeleteArticle(article.slug)}>Delete</Button>{' '}
              <Button variant="primary" onClick={() => handleEditArticle(article)}>Edit</Button>
            </div>
          )}

          <Card.Footer className="text-muted">
            Published: {formatDate(article.createdAt)} by {article.author.username}
          </Card.Footer>

            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="1">
                <Accordion.Header style={{ backgroundColor: '#007bff', color: 'white' }}>
                  <Badge bg="info">Comments number: {article.comment.length}</Badge><br></br>
                  <Link to={`/addComment`}>
                    <Button
                      style={{
                        fontColor: "#000",
                        width: '150px',
                        height: "30px",
                        borderRadius: '25px',
                        border: '2px solid #FFFF00'
                      }}
                      type='submit'
                      onClick={() => handleAddComment(article.slug)}
                    >
                      Add comment
                    </Button>
                  </Link>
                </Accordion.Header>
                <Accordion.Body>
                  {article.comment.map((comment, index) => (
                    <Card.Text key={index} className="mb-2">
                      {comment.body} - Username: <Badge>{comment.author.username}</Badge>
                    </Card.Text>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

          {user && user.id === article.comment.username && (
            <div>
              <Button variant="danger" onClick={() => handleDeleteComment(article.id)}>Delete</Button>{' '}
              <Button variant="primary" onClick={() => handleEditComment(article.id)}>Edit</Button>
            </div>
          )}          
        </Card>
      ))}

      <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editedArticle.title}
                onChange={(e) => setEditedArticle({ ...editedArticle, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={editedArticle.description}
                onChange={(e) => setEditedArticle({ ...editedArticle, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedArticle.body}
                onChange={(e) => setEditedArticle({ ...editedArticle, body: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalShow(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Articles;

