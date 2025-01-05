const request = require('supertest');
const express = require('express');
const app = require('./index'); // Adjust the path as necessary

describe('POST /api/blogs', () => {
  it('should create a new blog', async () => {
    const token = 'your-auth-token'; // Replace with a valid token
    const newBlog = {
      title: 'Test Blog',
      description: 'This is a test blog',
      categorie_id: 1,
      image: 'test.jpg'
    };

    const response = await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should return 400 if required fields are missing', async () => {
    const token = 'your-auth-token'; // Replace with a valid token
    const newBlog = {
      title: '',
      description: '',
      categorie_id: null,
      image: 'test.jpg'
    };

    const response = await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'title, description, categorie_id and author_id are required');
  });
});