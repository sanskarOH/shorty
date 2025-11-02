# 🚀 Shorty - URL Shortener

Shorty is a full-stack URL shortener app built with Node.js, Express, and MongoDB.  
The backend also serves the frontend, so once the build is done — everything runs together in one container.

---

## 🧰 Prerequisites

Before you begin, make sure you have the following installed:

- [Podman](https://podman.io/getting-started/installation)
- [Node.js](https://nodejs.org/) (for local builds)
- [Git](https://git-scm.com/)
- A MongoDB connection (Atlas cluster or local)

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/shorty.git
cd shorty
```

---

### 2️⃣ Environment Variables

Your repository includes an `env.example` file.  
Create a new `.env` file based on it:

```bash
cp env.example .env
```

Then open `.env` and fill in the required values:

```env
PORT=3000
NODE_ENV=development
MONGODB_URL=mongodb+srv://<your-cluster-url>
BASE_URL=https://shorty.yourdomain.com
```

---

### 3️⃣ Build the Frontend

The frontend is located in the `client` folder and is served by the backend after building.

```bash
cd client
npm install
npm run build
cd ..
```

---

### 4️⃣ Build the Container Image

Make sure you’re back in the project root directory.

```bash
podman build -t shorty:latest .
```

---

### 5️⃣ Run the Container

Run the app with your environment variables.

```bash
podman run -d   -p 3000:3000   -e PORT=3000   -e NODE_ENV=development   -e MONGODB_URL="your-mongodb-url"   -e BASE_URL="https://shorty.yourdomain.com"   --name shorty-container   localhost/shorty:latest
```

✅ The app should now be running on:  
**http://localhost:3000**

---

## 🧩 Useful Commands

### Stop the Container
```bash
podman stop shorty-container
```

### Restart the Container
```bash
podman start shorty-container
```

### View Logs
```bash
podman logs -f shorty-container
```

### Remove Container and Image
```bash
podman rm -f shorty-container
podman rmi shorty:latest
```

---

## 🧱 Development Notes

- The frontend build output (`client/build`) is automatically served by the backend Express server.
- `.dockerignore` ensures `.env` and unnecessary files are not included in the image.
- MongoDB should be hosted externally (e.g., Atlas), as the container does not include a database.

---

## 🌐 Deployment Option

If you’ve pushed your image to Docker Hub or Podman registry, others can directly pull and run:

```bash
podman pull docker.io/sanskarspamz/shorty:latest
podman run -d -p 3000:3000 --name shorty docker.io/sanskarspamz/shorty:latest
```

You can also add environment variables in the run command as shown above.

---

## 🤝 For Contributors

If you’d like to contribute to **Shorty**, follow these steps:

### 1️⃣ Fork and Clone

```bash
git fork https://github.com/<your-username>/shorty.git
git clone https://github.com/<your-username>/shorty.git
cd shorty
```

### 2️⃣ Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 3️⃣ Make Changes and Test

Build and test locally:

```bash
cd client
npm install && npm run build
cd ..
podman build -t shorty:test .
podman run -p 3000:3000 --env-file .env shorty:test
```

### 4️⃣ Commit and Push

```bash
git add .
git commit -m "Added new feature"
git push origin feature/your-feature-name
```

### 5️⃣ Create a Pull Request

Go to your fork on GitHub and create a pull request to the main repo.

---

## 🧠 Troubleshooting

- If you get **“connection refused”** on MongoDB, ensure your cluster’s IP whitelist includes `0.0.0.0/0`.
- If `localhost:3000` doesn’t load, check container logs using `podman logs shorty-container`.
- Always rebuild (`podman build ...`) if you make code changes in `src/` or `client/`.

---

## 👨‍💻 Author

**Sanskar Diwedi**  
📧 [Contact](mailto:sanskar@example.com)  
🌐 [https://sanskardiwedi.in](https://sanskardiwedi.in)
