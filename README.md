# Weather App API (Advanced)

Welcome to the **Weather App API (Advanced)**!  
This project is a continuation of [Weather App Task 1](https://github.com/Fathan-Akbar-Nur-Habibi/WeatherAPP-Task1), with added features and advanced functionality.

### 🛠 Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express, SQLite3
- **API**: OpenWeatherMap API
- **Tools**: POSTMAN (for API testing)

### 📋 Key Features
- **CRUD** (Create, Read, Update, Delete) functionality to manage weather data using an SQL database.
- **API Connection** to OpenWeatherMap API to fetch real-time weather data.
- **Export Data** to PDF for reporting.

### ⚙️ Installation and Setup
Before running this project, there are a few things you need to take care of:

1. **Install Dependencies**:
   Run the following command to install required dependencies:

npm install express sqlite3 body-parser cors

Create Database: Create an SQLite3 database file named weather.db and define the following table:

CREATE TABLE weather (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT,
    startDate TEXT,
    endDate TEXT,
    temperature REAL
);

###🖥 **Running the Frontend**

Right-click on the index.html file.

Select "Open with Live Server".

The app will open in your browser and be ready to use.


###🔧**Running the Backend**

Start the backend server by running the following command in your VS Code terminal:

node server/server.js

Open POSTMAN and create a workspace to test the backend Weather App.

Enter the localhost URL according to the CRUD method you want to test. (The required URL can be found in the GIF video above).


###📝 **Testing the API with POSTMAN**

Once the backend is running, you can use POSTMAN to test the developed API, including CRUD operations related to weather data.

###📽 **Demo**
![WeatherAPPTask2](https://github.com/user-attachments/assets/d68297db-a092-4d8e-9bdb-27814a6cbf81)


To see a demo of how the application works, you can refer to the GIF video above.

Thank you for using this project! If you encounter any issues or have any questions, feel free to open an issue or reach out to me.
