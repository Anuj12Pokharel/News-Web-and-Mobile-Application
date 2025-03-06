============================================================
Unified Application: Django, React & React Native
============================================================

Overview:
---------
This repository contains a unified application that combines a Django backend API, a React-based web frontend, and a React Native mobile application. The Django project handles business logic and data management, while the React and React Native projects provide user interfaces for web and mobile respectively.

------------------------------------------------------------
Table of Contents:
------------------------------------------------------------
1. Project Structure
2. Prerequisites
3. Installation & Setup
   3.1. Django (Backend)
   3.2. React (Frontend)
   3.3. React Native (Mobile)
4. Running the Application
5. Deployment
6. Contributing
7. License
8. Contact Information

------------------------------------------------------------
1. Project Structure:
------------------------------------------------------------
/backend/       - Django project files and configuration
/frontend/      - React web application source code
/mobile/        - React Native mobile application source code
README.txt      - This file

------------------------------------------------------------
2. Prerequisites:
------------------------------------------------------------
- Python 3.8+ installed
- Node.js and npm installed
- (Optional) Virtualenv for Python environment isolation
- For React Native:
   • React Native CLI or Expo CLI installed
   • Android Studio and/or Xcode if building native apps

------------------------------------------------------------
3. Installation & Setup:
------------------------------------------------------------

3.1. Django (Backend)
-----------------------
a. Navigate to the backend directory:
   cd backend

b. (Optional) Create and activate a virtual environment:
   python -m venv env
   On Windows: env\Scripts\activate
   On Mac/Linux: source env/bin/activate

c. Install required packages:
   pip install -r requirements.txt

d. Apply database migrations:
   python manage.py migrate

e. (Optional) Create a superuser for admin access:
   python manage.py createsuperuser

3.2. React (Frontend)
-----------------------
a. Navigate to the frontend directory:
   cd frontend

b. Install dependencies:
   npm install

c. Start the development server:
   npm start

3.3. React Native (Mobile)
-----------------------------
a. Navigate to the mobile directory:
   cd mobile

b. Install dependencies:
   npm install

c. To run on an Android emulator:
   npm run android

d. To run on an iOS simulator (Mac only):
   npm run ios

e. Alternatively, if using Expo:
   expo start

------------------------------------------------------------
4. Running the Application:
------------------------------------------------------------
- Django Backend:
   • Activate your virtual environment in the backend directory.
   • Run: python manage.py runserver

- React Frontend:
   • Make sure the backend is running (if API calls are needed).
   • In the frontend directory, run: npm start

- React Native Mobile App:
   • Ensure your emulator/device is ready.
   • In the mobile directory, run:
         For Android: npm run android
         For iOS: npm run ios
      (Or use expo start if using Expo)

------------------------------------------------------------
5. Deployment:
------------------------------------------------------------
- Django:
   • Consider using Gunicorn with Nginx for production deployment.
   • Set up appropriate environment variables and secure your settings.

- React:
   • Build the production version with: npm run build
   • Serve the static files via a web server or integrate with Django.

- React Native:
   • Use Android Studio and/or Xcode for creating release builds.
   • Follow the official guidelines for deploying to the App Store or Google Play.

------------------------------------------------------------
6. Contributing:
------------------------------------------------------------
We welcome contributions! If you have suggestions, improvements, or bug fixes:
- Please open an issue or submit a pull request.
- Ensure your changes are well-tested and documented.

------------------------------------------------------------
7. License:
------------------------------------------------------------
This project is licensed under the MIT License. See the LICENSE file for more details.

------------------------------------------------------------
8. Contact Information:
------------------------------------------------------------
For any questions, feedback, or further assistance, please contact:
Anujpokharel
anujpokharel2@gmail.com

============================================================
