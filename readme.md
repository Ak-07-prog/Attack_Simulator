# AttackSimulator

### Cybersecurity Simulation & Risk Assessment Platform

AttackSimulator is a cybersecurity awareness and risk-assessment platform that simulates real-world cyber attacks such as phishing, credential harvesting, and social engineering.

The platform allows organizations to safely test how employees respond to cyber threats and provides analytics to identify security vulnerabilities.

Instead of relying on theoretical cybersecurity training, AttackSimulator creates **controlled simulations of real attacks**, tracks employee behavior, and generates actionable insights for organizations.

---

# Hackathon

**Breach The FinTech Hackathon**

**Team:** Runtime Terrors

**Team Leader:** Dev Patel
**Team Members:**

* Vraj Patel
* Akshar Vandara
* Vani Goyani

**Institute:** PDEU
**Date:** March 2026

---

# Problem Statement

Cyber attacks today frequently exploit **human behavior instead of system vulnerabilities**.

Common threats include:

* Phishing Emails
* Credential Harvesting
* Social Engineering
* Business Email Compromise (BEC)

Organizations struggle to measure employee preparedness because most cybersecurity awareness programs rely on:

* Generic training videos
* Security workshops
* Online courses

These approaches fail to simulate real-world attack scenarios and therefore **do not accurately measure employee response behavior**. 

Additionally, enterprise solutions like KnowBe4 and Proofpoint are expensive, making them inaccessible for smaller organizations.

---

# Solution

AttackSimulator provides a **controlled cyber attack simulation platform** that allows organizations to safely test and improve their security posture.

The platform:

1. Simulates cyber attacks
2. Tracks employee responses
3. Provides analytics dashboards
4. Delivers instant training after failures

The goal is to **transform theoretical training into practical cybersecurity defense experience**. 

---

# Key Features

### Phishing Simulation

Create realistic phishing campaigns targeting employees across departments.

### Attack Engine

Simulates multiple cyber attack vectors including:

* Email phishing
* Credential harvesting
* Social engineering
* Malware simulations

### Real-Time Tracking

Tracks employee behavior such as:

* Email opens
* Link clicks
* Credential submission attempts
* Attack reports

### Analytics Dashboard

Provides insights such as:

* Click rate
* Credential submission rate
* Reporting rate
* Department risk score

### Security Awareness Training

If an employee fails a simulation, the platform provides **immediate educational feedback and training modules**.

### Role-Based Access

Different dashboards for:

* Admin
* Analyst
* Defender
* Employee

### Behavioral Risk Analysis

Tracks employee security behavior patterns to identify high-risk users.

---

# System Architecture

AttackSimulator follows a **three-layer architecture**:

### 1. Attack Engine

Responsible for launching simulated cyber attacks such as phishing emails and tracking employee interactions.

### 2. Analysis Engine

Processes simulation data and generates analytics including risk scores, infection maps, and kill-chain replay.

### 3. Awareness Engine

Provides personalized training modules and security awareness education based on user behavior. 

---

# Technology Stack

## Frontend

* React
* Vite
* TailwindCSS
* Chart.js
* Recharts
* ReactFlow (infection map)

## Backend

* Node.js
* Express.js

## Database

* MongoDB

## Authentication

* JSON Web Tokens (JWT)

## APIs & Services

* SendGrid (email simulation)
* Socket.io (real-time updates)

---

# Platform Modules

### Authentication System

Secure login system with role-based access control.

### Campaign Management

Admins can create and manage attack simulations.

### Email Simulation Engine

Simulates phishing emails and tracks user interactions.

### Event Tracking System

Records employee actions during simulations.

### Analytics Dashboard

Displays real-time cybersecurity metrics and insights.

### Awareness Training System

Automatically provides training when employees fail a simulation.

---

# User Flow

1. Administrator logs into the dashboard
2. Admin creates a phishing simulation campaign
3. System sends simulated attack emails
4. Employees interact with emails
5. System tracks actions such as clicks or credential attempts
6. Analytics dashboard displays results

---

# Example Simulation Results

Example campaign analytics:

```
Emails Sent: 200
Emails Opened: 140
Links Clicked: 60
Credentials Attempted: 20
Phishing Reported: 30
```

These insights help organizations identify **security weaknesses and high-risk employees**.

---

# Security Considerations

AttackSimulator is designed with strict safety measures:

* **Real credentials are never stored**
* Form fields are wiped before submission
* Simulations run in a controlled environment
* Data is anonymized for analytics

This ensures employees can safely interact with simulated attacks without compromising real security.

---

# Business Model

AttackSimulator can operate as a **Software-as-a-Service (SaaS)** platform.

Possible revenue streams include:

* Monthly subscription plans
* Premium analytics dashboards
* Corporate cybersecurity training services
* Enterprise simulation packages

Target customers include:

* Enterprises
* IT security teams
* Educational institutions
* Government organizations

---

# Challenges Faced

During development the team faced several challenges:

* Designing realistic phishing simulations
* Ensuring credentials are never stored
* Implementing secure authentication
* Creating accurate behavioral analytics
* Designing intuitive dashboards

These were addressed through careful system design and secure data handling practices.

---

# Future Scope

Future improvements may include:

* AI-based phishing email generation
* Machine learning risk prediction
* Integration with corporate email systems
* Advanced threat simulation scenarios
* Automated security awareness training

These enhancements can make AttackSimulator a **full cybersecurity awareness ecosystem**.

---

# Demo Credentials

Example demo roles:

Admin

```
sarah.chen@acmecorp.com
Admin@123456
```

Analyst

```
marcus.webb@acmecorp.com
Analyst@123456
```

Defender

```
james.ford@acmecorp.com
Defender@123456
```

---

# References

* MongoDB Documentation
* React Documentation
* SendGrid API
* Cybersecurity phishing research
* IBM Cost of a Data Breach Report
* Verizon DBIR Report

---

# License

This project is developed for educational and cybersecurity awareness purposes.

---

# Contributors

* Dev Patel
* Vraj Patel
* Akshar Vandara
* Vani Goyani

---

