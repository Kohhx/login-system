# Login Application

This project is a login application that allows users to log in, view their profile details, and access restricted content based on their role. The application is implemented using the React frontend framework with tailwind CSS and the Spring framework for the backend. It includes modules such as Spring Security and JWT for authentication and authorization, and Spring Data JPA for database interaction. The database used in the backend is MySQL. 

## Features

- User-friendly and beautiful login application interface developed using React
- Secure backend implemented in Java with Spring framework
- Spring Security and JWT for handling authentication and authorization
- Upon successful login, users are redirected to a welcome page displaying their name, username, and role (manager/user)
- Managers have access to a restricted webpage with additional functionalities such as manager user and perform delete and update of users
- Logout functionality to securely end the session
- Route guards and validation, method level security (spring) are implemented both frontend and backend server to increase security of application.
  - If a user who is not authenticated visit a page which require he/she to be authenticated, user will be redirected to login page.
  - If user visit a page not part of the application route, he will be redirected to a 404 not found page
  - If user visit a page that he/she is not authorized, he will be redirected to a 403 forbidden access page

## Tech Stack

- Frontend: React
- CSS : TailWind CSS
- Backend: Java with Spring framework
- Modules: Spring Security, JWT, Spring Data JPA
- Database: MySQL

## MVC Pattern with Nth Tier architecture Backend

The application has been designed following the Model-View-Controller (MVC) pattern to ensure a clear separation of concerns. This pattern provides a structured approach for organizing code and maintaining scalability.

- Model: Represents the data and business logic of the application. It handles interactions with the database and performs CRUD operations on user data.
- View: Responsible for the user interface and rendering of information. It presents the login form, welcome page, restricted content based on the user's role and manager manage all user page.
- Controller: Serves as an intermediary between the model and view. It processes user input, interacts with the model to fetch data, and communicates with the view to display appropriate information.

- Nth Tier Architecture (Backend) -  Divides an application into multiple layers or tiers, each responsible for specific functionality. It provides modularity, separation of concerns, and scalability to the application. The common layers in N-Tier Architecture are Presentation (Controller), Business Logic (Service), and Data Access (Repository) layers

Multi-language Support

The application also supports multi-language functionality. Currently, it is available in English and Mandarin. Users can choose their preferred language during login or switch the language from the settings menu.

## Manager Feature

The recent update includes a "Manager" feature that allows managers to manage all users. Managers have the ability to delete and edit user profiles. This feature provides enhanced control and administration capabilities.

## Setup and Installation

1. Clone the repository
2. Install the required dependencies for the frontend and backend 
3. Configure a local MySQL server and create a database named "loginSystemDb"
4. Configure the database settings in the backend
  - Add a application.properties files in the backend under resources folder containing the following information:
![image](https://github.com/Kohhx/login-system/assets/108639973/4234c4dc-ebc7-4eb6-bb95-f93f5dc09580)
  - Include the username and password of local MySQL server 
5. Build and run the application
6. For Frontend react, within the frontend folder directory. Run "npm start".

## Learning 

I have minimized the use of external packages in React and have implemented most functionalities, such as form validation, modal, and custom hooks, through hand-written code. 

## Video

https://github.com/Kohhx/login-system/assets/108639973/ab4eb947-00c4-459b-962e-da4c68538231


