# 🌐 Clustering Web App

Welcome to the Clustering Web App! This web application allows you to perform clustering on datasets using various clustering algorithms and visualize the results. It's a handy tool for data analysis enthusiasts and professionals alike.

## ✨ Features

- 🗃️ **Generate Sample Datasets**: 2D, Hierarchical, DBSCAN, and Mean Shift data.
- 📁 **Upload Custom Datasets**: Supports CSV format.
- 📊 **Clustering Algorithms**: Apply K-Means, Hierarchical, DBSCAN, and Mean Shift.
- 📈 **Data Visualization**: View original and clustered data using scatter plots.

## 🛠️ Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher) 🌟
- npm (v6 or higher) 🌟
- Python (v3.6 or higher) 🐍
- Flask (v2.0 or higher) 🔥

## 📦 Installation

### Backend

1. **Navigate to the `backend` directory:**

    ```bash
    cd clustering-web-app/backend
    ```

2. **Create a virtual environment and activate it:**

    ```bash
    python -m venv venv
    source venv/bin/activate   # On Windows use `venv\Scripts\activate`
    ```

3. **Install the required Python packages:**

    ```bash
    pip install -r requirements.txt
    ```

### Frontend

1. **Navigate to the `frontend` directory:**

    ```bash
    cd ../frontend
    ```

2. **Install the required Node.js packages:**

    ```bash
    npm install
    ```

## 🚀 Running the App

### Start the Backend Server

1. **Navigate to the `backend` directory:**

    ```bash
    cd ../backend
    ```

2. **Run the Flask server:**

    ```bash
    python app.py
    ```

    The backend server will start on `http://localhost:5000`.

### Start the Frontend Development Server

1. **Navigate to the `frontend` directory:**

    ```bash
    cd ../frontend
    ```

2. **Run the React development server:**

    ```bash
    npm start
    ```

    The frontend development server will start on `http://localhost:3000`.

## 📚 Usage

1. **Generate Sample Data:**
    - Click on the buttons to generate 2D data, hierarchical data, DBSCAN data, or mean shift data.
    - Download the generated data as a CSV file.

2. **Upload Custom Data:**
    - Click the "Choose File" button to upload your dataset (CSV format).

3. **Select Clustering Algorithm:**
    - Choose a clustering algorithm from the dropdown menu (K-Means, Hierarchical, DBSCAN, Mean Shift).

4. **Cluster Data:**
    - Click the "Cluster Data" button to apply the selected clustering algorithm.
    - Download the clustered data as a CSV file.

5. **Visualize Data:**
    - View the original and clustered data in scatter plot visualizations.

## 📁 File Structure

```plaintext
clustering-web-app/
├── backend/
│   ├── app.py
│   ├── clustering.py
│   ├── requirements.txt
│   └── data/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.js
│   │   │   └── ...
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── index.js
│   └── package.json
└── README.md
