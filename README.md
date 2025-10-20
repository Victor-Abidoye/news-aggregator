## 💻 Local Development Setup

### 1️⃣ Prerequisites

Make sure you have the following installed:

- [[Node.js](https://nodejs.org/)](https://nodejs.org/) (v18 or later)
- [[npm](https://www.npmjs.com/)](https://www.npmjs.com/) or [[pnpm](https://pnpm.io/)](https://pnpm.io/)
- [[Git](https://git-scm.com/)](https://git-scm.com/)

### 2️⃣ Clone the Repository

```sh
git clone https://github.com/Victor-Abidoye/news-aggregator.git
cd news-aggregator
```

### 3️⃣ Install Dependencies

```sh
npm install
# OR
pnpm install
```

### 4️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add your API keys:

```sh
VITE_NEWSAPI_KEY=your_news_api_key
VITE_GUARDIAN_KEY=your_guardian_api_key
VITE_NYT_KEY=your_nytimes_api_key
```

### 5️⃣ Start the Development Server

```sh
npm run dev
```

The app will be available at **http://localhost:5173/**

---

## 🐳 Running with Docker

### 📌 Prerequisites

- **Docker** (>= 20.x)
- **Docker Compose** (>= 2.x)

### 🚀 Steps

#### 🔹 Run with Docker CLI

```sh
# 1️⃣ Build the Docker image
docker build -t news-aggregator .

# 2️⃣ Run the container
docker run -p 5173:5173 news-aggregator
```

_App will be available at **http://localhost:5173/**._

#### 🔹 Run with Docker Compose

```sh
# 1️⃣ Start the application
docker-compose up --build
```

_App will be available at **http://localhost:5173/**._

#### 🔹 Stop the container

```sh
docker-compose down
```

---

## 🛠️ Environment Variables

To use APIs, create a `.env` file in the root directory and add:

```env
VITE_NEWSAPI_KEY=your_news_api_key
VITE_GUARDIAN_KEY=your_guardian_api_key
VITE_NYT_KEY=your_nytimes_api_key
```

---