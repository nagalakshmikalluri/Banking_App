# Banking App - Full Stack Application

A modern, full-stack banking application built with Spring Boot (backend) and vanilla JavaScript (frontend).

## Features

### Backend (Spring Boot)
- RESTful API for account management
- MySQL database integration
- Account operations: Create, Read, Update, Delete
- Transaction support: Deposit and Withdraw
- Exception handling and error management

### Frontend (HTML/CSS/JavaScript)
- Modern, responsive UI with gradient design
- Real-time account management dashboard
- Interactive forms for account creation and transactions
- Search and filter functionality
- Toast notifications for user feedback
- Beautiful animations and transitions
- Mobile-responsive design

## Prerequisites

- Java 21
- MySQL 8.0+
- Maven 3.6+
- Modern web browser

## Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE banking_app;
```

2. Update database credentials in `src/main/resources/application.yaml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/banking_app
    username: your_username
    password: your_password
```

## Running the Application

1. Clone the repository
```bash
cd Banking_App
```

2. Build the project:
```bash
./mvnw clean install
```

3. Run the application:
```bash
./mvnw spring-boot:run
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

## API Endpoints

- `POST /api/accounts` - Create a new account
- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/{id}` - Get account by ID
- `PUT /api/accounts/{id}/deposit` - Deposit money
- `PUT /api/accounts/{id}/withdraw` - Withdraw money
- `DELETE /api/accounts/{id}` - Delete account

## Frontend Features

### Dashboard
- Total accounts count
- Total balance across all accounts
- Average balance per account

### Account Management
- Create new accounts with initial balance
- View all accounts in a beautiful table
- Search accounts by ID or name
- Real-time balance updates

### Transactions
- Deposit money with validation
- Withdraw money with balance checks
- Animated transaction modals
- Instant feedback via toast notifications

### UI Highlights
- Gradient color scheme (Purple/Blue)
- Font Awesome icons
- Smooth animations and transitions
- Responsive design for all devices
- Professional card-based layout

## Technology Stack

### Backend
- Spring Boot 4.0.0
- Spring Data JPA
- MySQL Database
- Maven

### Frontend
- HTML5
- CSS3 (with modern gradients and animations)
- Vanilla JavaScript (ES6+)
- Font Awesome 6.4.0
- RESTful API integration

## Project Structure

```
Banking_App/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── net/javaguides/banking_app/
│   │   │       ├── controller/      # REST Controllers
│   │   │       ├── service/         # Business Logic
│   │   │       ├── repository/      # Data Access
│   │   │       ├── entity/          # JPA Entities
│   │   │       ├── dto/             # Data Transfer Objects
│   │   │       ├── mapper/          # Entity-DTO Mappers
│   │   │       ├── exception/       # Exception Handling
│   │   │       └── config/          # Configuration
│   │   └── resources/
│   │       ├── static/              # Frontend Files
│   │       │   ├── index.html       # Main HTML
│   │       │   ├── styles.css       # Styling
│   │       │   └── app.js           # JavaScript Logic
│   │       └── application.yaml     # Application Config
│   └── test/                        # Test Files
└── pom.xml                          # Maven Configuration
```

## Development

The application runs on port 8080 by default. The frontend automatically connects to the backend API at `/api/accounts`.

## Error Handling

The application includes comprehensive error handling:
- Account not found (404)
- Insufficient balance for withdrawal
- Invalid input validation
- Database connectivity issues

All errors are displayed to users via friendly toast notifications.

## License

This project is for educational purposes.

## Author

Banking App Demo Project
