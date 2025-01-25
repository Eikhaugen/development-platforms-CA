const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); 

// Routes
app.get('/', (req, res) => {
  res.send('API is working!');
});

app.post('/users', async (req, res) => {
    try {
      const { uid, username, profilePicture, profileBanner, bio } = req.body;
      const userDoc = {
        username,
        profilePicture: profilePicture || null,
        profileBanner: profileBanner || null,
        bio: bio || "",
        createdAt: new Date().toISOString()
      };
  
      await db.collection('users').doc(uid).set(userDoc);
      res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

app.get('/users', async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.put('/users/:uid', async (req, res) => {
    try {
      const { uid } = req.params;
      const idToken = req.headers.authorization?.split(' ')[1];
  
      if (!idToken) {
        return res.status(401).send({ message: 'Authorization token is required' });
      }

      const decodedToken = await admin.auth().verifyIdToken(idToken);
  
      if (decodedToken.uid !== uid) {
        return res.status(403).send({ message: 'You are not authorized to update this profile' });
      }
  
      const { username, profilePicture, bio } = req.body;
  
      if (!username && !profilePicture && !bio) {
        return res.status(400).send({ message: 'At least one field (username, profilePicture, or bio) must be provided' });
      }
  
      const updates = {};
      if (username) updates.username = username;
      if (profilePicture) updates.profilePicture = profilePicture;
      if (bio) updates.bio = bio;
  
      await db.collection('users').doc(uid).update(updates);
      res.status(200).send({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.code === 'auth/id-token-expired') {
        return res.status(401).send({ message: 'Authorization token has expired' });
      }
      res.status(500).send({ message: 'Internal server error' });
    }
  });
  

app.post('/posts', async (req, res) => {
    try {
      const { userId, content } = req.body;
  
      if (!userId || !content) {
        return res.status(400).send({ message: 'userId and content are required' });
      }
  
      const post = {
        userId,
        content,
        createdAt: new Date().toISOString(),
      };
  
      const postRef = await db.collection('posts').add(post);
      res.status(201).send({ message: 'Post created successfully', postId: postRef.id });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });
  
  app.get('/posts', async (req, res) => {
    try {
      const postsSnapshot = await db.collection('posts').get();
      const posts = [];
  
      for (const doc of postsSnapshot.docs) {
        const postData = doc.data();
        const userDoc = await db.collection('users').doc(postData.userId).get();
        const username = userDoc.exists ? userDoc.data().username : 'Unknown User';
  
        posts.push({
          id: doc.id,
          ...postData,
          username,
        });
      }
  
      res.status(200).send(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });
  
  
  app.post('/posts/:postId/comments', async (req, res) => {
    try {
      const { postId } = req.params;
      const { userId, content } = req.body;
  
      if (!userId || !content) {
        return res.status(400).send({ message: 'userId and content are required' });
      }
  
      const comment = {
        userId,
        content,
        createdAt: new Date().toISOString(),
      };
  
      await db.collection('posts').doc(postId).collection('comments').add(comment);
      res.status(201).send({ message: 'Comment added successfully' });
    } catch (error) {
      console.error('Error commenting on post:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });
  
  app.get('/posts/:postId/comments', async (req, res) => {
    try {
      const { postId } = req.params;
  
      const snapshot = await db.collection('posts').doc(postId).collection('comments').get();
      const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).send(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
