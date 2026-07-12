# SkillSphere — Intelligent Hyperlocal Freelance Ecosystem

SkillSphere is a full-stack MERN platform that connects clients with freelancers in a hyperlocal environment. It combines AI-powered job matching, milestone-based escrow payments, verified reputation scoring, and real-time collaboration tools into a single professional freelance ecosystem.

Clients can discover verified local professionals, post projects, and manage payments securely. Freelancers can build rich portfolios, receive AI-driven recommendations, collaborate directly with clients in real time, and grow their reputation through verified work history.

> Built as part of the Nayoda Full Stack Development Internship.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database Schema (Collections)](#database-schema-collections)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development Timeline](#development-timeline)
- [Project Review](#project-review)

---

## Features

### 1. Multi-Role Authentication System
Supports three roles — **Client**, **Freelancer**, and **Admin** — with:
- JWT-based authentication
- Role-based access control (RBAC)
- Google OAuth login
- Email verification
- Password reset via token
- Two-Factor Authentication (2FA)

### 2. AI-Powered Job Matching
Goes beyond simple filtering using Hugging Face AI:
- AI matching algorithm for gigs
- Skill similarity scoring
- Personalized freelancer recommendations
- Trending skills detection

**Example:** When a client posts a "React Developer" job, the system automatically recommends the top freelancers near the client's location, ranked by rating and skill similarity.

### 3. Freelancer Professional Profiles
- Skills with proficiency levels
- Portfolio gallery
- Resume upload
- Certifications
- Work experience timeline
- Availability calendar
- Hourly & milestone-based pricing
- Verification badge system

### 4. Gig / Project Marketplace
**Clients can:** create gigs with budget ranges, define milestones, attach documents, invite freelancers, and track progress.

**Freelancers can:** apply to gigs, submit proposals, and track application status.

### 5. Proposal & Bidding System
Freelancers submit a proposal description, bid amount, and estimated completion time. Clients can accept, negotiate, or reject proposals.

### 6. Real-Time Chat + Collaboration
Built using Socket.IO:
- Instant messaging
- File sharing
- Typing indicators
- Message read receipts
- Optional WebRTC video call integration

### 7. Secure Payment System
Integrated via Razorpay / Stripe:
- Escrow payments
- Milestone-based payouts
- Automatic freelancer payout
- Refund management
- Transaction history

### 8. Smart Reputation & Review System
- Weighted reputation score
- Verified reviews
- Fraud detection for fake reviews
- Review analytics

### 9. Admin Dashboard
Admins manage the entire platform:
- User management & account suspension
- Freelancer verification
- Gig approval
- Payment monitoring
- Fraud detection

**Admin analytics:** platform revenue, active freelancers, top categories, job success rate.

### 10. Advanced Search Engine
- Location-based search
- Skill-based search
- Price range filters
- Rating filters
- Experience filters

Powered by MongoDB Atlas Search or ElasticSearch (advanced option).

### 11. Real-Time Notification System
Delivered via Socket.IO and email notifications for:
- New gig posted
- Proposal accepted
- Payment received
- Review added

### 12. Freelancer Availability Scheduler
- Availability slots
- Booking system
- Automatic scheduling

### 13. Dispute Resolution System
- Dispute request submission
- Admin mediation
- Evidence upload
- Resolution tracking

### 14. Project Progress Tracker
- Task completion percentage
- File uploads
- Progress logs
- Deadline reminders

### 15. Analytics Dashboard for Freelancers
Freelancers can view:
- Profile views
- Gig applications
- Earnings statistics
- Monthly revenue chart
- Client feedback analytics

---

## Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- React Query
- Socket.IO Client

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Socket.IO
- JWT Authentication

### Integrations
- Razorpay / Stripe — payments
- Cloudinary — file uploads
- Nodemailer — transactional emails
- Redis — caching (optional)
- Hugging Face AI — job matching engine

---

## Database Schema (Collections)

| Collection      | Purpose                                  |
|------------------|-------------------------------------------|
| `Users`          | Base user accounts (all roles)            |
| `Freelancers`    | Freelancer-specific profile data          |
| `Clients`        | Client-specific profile data              |
| `Gigs`           | Posted projects/jobs                      |
| `Proposals`      | Freelancer bids on gigs                   |
| `Reviews`        | Ratings and feedback                      |
| `Messages`       | Real-time chat data                       |
| `Payments`       | Transaction and escrow records            |
| `Notifications`  | Real-time and email notification logs     |
| `Disputes`       | Dispute cases and resolutions             |
| `AdminLogs`       | Admin action audit trail                  |

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account
- Cloudinary account (for file uploads)
- Razorpay/Stripe account (for payments)
- Hugging Face API key (for AI matching)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd skillsphere

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Running the App

```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm run dev
```

---

## Environment Variables

Create a `.env` file in the `/server` directory with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
HUGGINGFACE_API_KEY=your_huggingface_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
REDIS_URL=your_redis_url_optional
```

---

## Development Timeline

### Week 1 — Foundation
**Backend:** Authentication system, user role management, profile APIs
**Frontend:** Login/Register UI, profile pages, dashboard layout

### Week 2 — Marketplace Core
**Backend:** Gig APIs, proposal system, search APIs
**Frontend:** Gig marketplace UI, proposal submission, search filters

### Week 3 — Collaboration & Trust
**Backend:** Chat with Socket.IO, review & rating APIs, notification system
**Frontend:** Messaging interface, review UI, notifications

### Week 4 — Payments & Admin
**Backend:** Payment integration, admin dashboard APIs, security improvements
**Frontend:** Payment UI, admin dashboard, final UI polish

---


## License

Internal project developed under the Nayoda Full Stack Development Internship program.