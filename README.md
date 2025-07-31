# 📅 Slot Booking Application

A Calendly-style appointment booking system built with **Laravel (API)** and **React.js (frontend)**.

---

## 🛠 Tech Stack

| Layer       | Tech                             |
|-------------|----------------------------------|
| Backend     | Laravel 12.0 (REST API)          |
| Frontend    | React.js, Tailwind CSS, Axios    |
| Database    | MySQL                            |
| Auth        | Laravel Sanctum                  |
| Email       | Mailtrap (for development)       |
| AI Tools    | ChatGPT (for code optimization)  |

---

## 🚀 Installation & Setup

### ✅ Backend (Laravel API)

#### Requirements
- PHP 8.2
- Composer
- MySQL

#### Setup

```bash
git clone <your-repo-url>
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
⚠️ Note: Configure your .env file with correct Mailtrap and database credentials.

✅ Frontend (React)
Requirements
Node.js v18+

npm or yarn

Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
⚙️ Note: Ensure your API base URL is correctly set inside axios.js.

🧱 Data Model Design (ER Diagram - Description)
Tables
users
id, name, email, password, created_at, updated_at

availabilities
id, day, user_id (FK), start_time, end_time, created_at, updated_at

bookings
id, title, name, email, date, booked_time, availability_id (FK), created_at, updated_at

Relationships
A User has many Availabilities

An Availability has many Bookings

A Booking belongs to one Availability

🧠 AI Tools Used
We used ChatGPT to assist with:

Optimizing Laravel & React code

Formatting booking confirmation emails with dynamic values

Converting time formats (24-hour to 12-hour with AM/PM)

Structuring folders and component reusability

✉️ Booking Email Preview
Each confirmed booking sends an email that includes:

Booking Title

Customer Name & Email

Selected Date & Time (e.g., 3:00 PM, 01 August 2025)

A Google Meet–like invite link (e.g., https://meet.example.com/abc-defg-hij)