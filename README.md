# Visium - Uptime Monitoring Tool

Visium is an uptime monitoring tool designed to track website availability, response times, and real-time logs. It provides an interactive dashboard with live updates, scheduled downtime tracking, and data visualization for enhanced analytics.

## 🚀 Features

- **Interactive Dashboard** – Monitor website availability and response times in real time.
- **Real-Time Logging** – Utilizes **Server-Sent Events (SSE)** to efficiently stream live logs.
- **Scheduled Downtime Tracking** – Uses **Spring Boot scheduled tasks** to log events without active polling.
- **Data Visualization** – Integrated graphs for better analytics and user experience.

![Dashboard](https://github.com/this-is-aishwarya/Visium/blob/master/images/visium-dash.png)

![Stats](https://github.com/this-is-aishwarya/Visium/blob/master/images/visium-stats.png)

![Down](https://github.com/this-is-aishwarya/Visium/blob/master/images/visium-down.png)

![Downgraph](https://github.com/this-is-aishwarya/Visium/blob/master/images/visium-downgraph.png)

## 🛠️ Tech Stack

- **Backend:** Spring Boot, Java
- **Frontend:** React.js
- **Database:** MongoDB
- **Real-Time Streaming:** Server-Sent Events (SSE)

## 📦 Installation & Setup

### Prerequisites
- Java 17+
- Node.js 16+
- MongoDB

### Backend Setup (Spring Boot)
```sh
# Clone the repository
git clone https://github.com/this-is-aishwarya/visium.git
cd visium/visium

# Configure MongoDB connection in application.yml

# Run the backend service
mvn spring-boot:run
```
### Frontend Setup (React)
```sh
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm start
```

## 📊 Usage
- Access the dashboard at ```http://localhost:3000```
- Add websites to monitor
- View real-time logs and response time analytics
