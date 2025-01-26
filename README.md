# development-platforms-CA

# API Endpoints

## User Endpoints
- **GET /users/:uid**  
  Fetches user profile data by UID.  
  **Authentication**: Not required  

- **PUT /users/:uid**  
  Updates the profile of a user (bio, avatar, or banner).  
  **Authentication**: Required (only the profile owner can update)

## Post Endpoints
- **POST /posts**  
  Creates a new post.  
  **Authentication**: Required  

- **GET /posts**  
  Fetches all posts or posts for a specific user (`?userId=`).  
  **Authentication**: Not required  

- **GET /posts/:postId**  
  Fetches a single post by its ID.  
  **Authentication**: Not required  

- **DELETE /posts/:postId**  
  Deletes a specific post by its ID.  
  **Authentication**: Required (only the post owner can delete)

## Comment Endpoints
- **POST /posts/:postId/comments**  
  Adds a comment to a specific post.  
  **Authentication**: Required  

- **GET /posts/:postId/comments**  
  Fetches comments for a specific post.  
  **Authentication**: Not required  

## Storage Rules
- **Avatars and Banners (Firebase Storage)**  
  **Read**: Allowed for all users  
  **Write**: Only authenticated users  

- **Posts (Firebase Storage)**  
  **Read**: Allowed for all users  
  **Write**: Only authenticated users  
