#!/bin/bash

# Create folder structure
mkdir -p backend/{controllers,routes,models,config,middleware}

# Create files in each folder
touch backend/controllers/{userController.js,postController.js,commentController.js,notificationController.js,messageController.js}
touch backend/models/{User.js,Post.js,Comment.js,Notification.js,Message.js}
touch backend/routes/{userRoutes.js,postRoutes.js,commentRoutes.js,notificationRoutes.js,messageRoutes.js}
touch backend/config/{db.js,keys.js}
touch backend/middleware/authMiddleware.js

# Create additional files
touch backend/.env backend/package.json backend/server.js

echo "Backend folder structure and files created successfully."
