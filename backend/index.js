const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
require('dotenv').config();

const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

// Middleware
app.use(cors({
  origin: corsOrigin, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(bodyParser.json()); 

// Routes
app.get('/', (req, res) => {
  res.send('API is working!');
});

app.post('/users', async (req, res) => {
  try {
    const { uid, username, profilePicture, profileBanner, bio } = req.body;

    if (!uid || !username) {
      return res.status(400).send({ message: 'UID and username are required' });
    }

    const userDoc = {
      username,
      profilePicture: profilePicture || null,
      profileBanner: profileBanner || null,
      bio: bio || "",
      createdAt: new Date().toISOString(),
    };

    await db.collection('users').doc(uid).set(userDoc);
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Internal server error' });
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

app.get('/users/:uid', async (req, res) => {
  try {
    const { uid } = req.params;

    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = userDoc.data();

    res.status(200).json({
      username: userData.username || '',
      bio: userData.bio || '',
      avatar: userData.avatar || '',
      banner: userData.banner || '',
      createdAt: userData.createdAt || '',
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
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

    const { bio, avatar, banner } = req.body;

    if (!bio && !avatar && !banner) {
      return res.status(400).send({ message: 'At least one field (bio, avatar, or banner) must be provided' });
    }

    const updates = {};
    if (bio) updates.bio = bio;
    if (avatar) updates.avatar = avatar;
    if (banner) updates.banner = banner;

    await db.collection('users').doc(uid).update(updates);
    res.status(200).send({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

  

  app.post('/posts', async (req, res) => {
    try {
      const { userId, content, image } = req.body;
  
      if (!userId || !content) {
        return res.status(400).send({ message: 'userId and content are required' });
      }
  
      const post = {
        userId,
        content,
        image: image || null,
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
      const postsSnapshot = await db.collection('posts')
        .orderBy('createdAt', 'desc')
        .get();
  
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

  app.get('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
  
    try {
      const postDoc = await db.collection('posts').doc(postId).get();
  
      if (!postDoc.exists) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const postData = postDoc.data();
  
      const userDoc = await db.collection('users').doc(postData.userId).get();
      const username = userDoc.exists ? userDoc.data().username : 'Unknown User';
  
      res.status(200).json({
        ...postData,
        username,
        id: postId,
      });
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.get('/posts/:postId/comments', async (req, res) => {
    try {
      const { postId } = req.params;
      const commentsSnapshot = await db.collection('posts').doc(postId).collection('comments').get();
      const comments = [];
  
      for (const commentDoc of commentsSnapshot.docs) {
        const commentData = commentDoc.data();
        const userDoc = await db.collection('users').doc(commentData.userId).get();
        const username = userDoc.exists ? userDoc.data().username : 'Unknown User';
  
        comments.push({
          id: commentDoc.id,
          ...commentData,
          username,
        });
      }
  
      res.status(200).send(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

  app.delete('/posts/:postId', async (req, res) => {
    try {
      const { postId } = req.params;
      const idToken = req.headers.authorization?.split(' ')[1];
  
      if (!idToken) {
        return res.status(401).send({ message: 'Authorization token is required' });
      }
  
      const decodedToken = await admin.auth().verifyIdToken(idToken);
  
      const postDoc = await db.collection('posts').doc(postId).get();
      if (!postDoc.exists) {
        return res.status(404).send({ message: 'Post not found' });
      }
  
      const postData = postDoc.data();
      if (postData.userId !== decodedToken.uid) {
        return res.status(403).send({ message: 'You are not authorized to delete this post' });
      }
  
      await db.collection('posts').doc(postId).delete();
      res.status(200).send({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
