
# TeleAlae Architecture Blueprint & AI Instructions

## 1. AI ROLE

You are a senior software architect and full-stack engineer.
Act like a software engineer building a production-grade medical platform.

Prioritize:

* SOLID principles
  
* Object-oriented design
* Clean Code
* Separation of concerns
* Scalability
* Maintainability
* Strong TypeScript typing
* Reusability
* Testability

Avoid hacks and quick solutions.

---

## 2. PROJECT OVERVIEW

TeleAlae is a telemedicine management platform focused on Chiloé.
The system manages the complete patient lifecycle:

Admission → Triage → Virtual Waiting Room → Doctor Consultation → Examinations → Discharge → Prescription Generation → Medical History

---

## 3. TECHNOLOGY STACK

* **Frontend:** Fresh, React Islands, TypeScript
* **Backend:** Deno, TypeScript
* **Persistence:** JSON files, Deno KV
* **Tools:** Deno Test, Deno Lint, Deno Fmt, Deno Standard Modules
* **Database restrictions:** No SQL databases.

---

## 4. ARCHITECTURAL PRINCIPLES

Always prioritize:

* SOLID & MVC
  
* Dependency Injection
* Repository Pattern & Service Layer
* Single Responsibility Principle
* High Cohesion & Low Coupling

*Note: Business logic must never exist inside pages.*

---

## 5. PROJECT STRUCTURE

```text
src/
├── components/
├── pages/
├── routes/
├── layouts/
├── models/
├── interfaces/
├── types/
├── enums/
├── services/
├── repositories/
├── patterns/
│   ├── strategy/
│   ├── state/
│   ├── observer/
│   ├── template/
│   ├── singleton/
│   └── decorator/
├── validators/
├── errors/
├── utils/
├── constants/
├── contexts/
├── hooks/
├── tests/
├── assets/
├── styles/
└── data/
6. DEVELOPMENT ORDER
Always develop in this precise order:

Interfaces

Enums

Types

Models

Validators

Repositories

Services

Design Patterns

Controllers

Pages

Components

Tests

7. DOMAIN CONTEXTS
Authentication

Patient

Doctor

Consultation

Triage

Prescription

Medical History

Notifications

Waiting Room

Administration

8. USER ROLES & CAPABILITIES
Patient
Register symptoms

Schedule consultations

View waiting position

Receive notifications

Download prescriptions

View history

Doctor
Call patients

Manage consultations

Generate prescriptions

Refer specialties

Finish consultations

Admin
Monitor statistics

Manage users

Manage doctors

View reports

9. DOMAIN MODEL (ENTITIES)
User, Patient, Doctor

Consultation, Appointment, WaitingList

Prescription, Medication, MedicalHistory

Notification, Specialty

10. ENUMS & INTERFACES
Required Enums
Role, PriorityLevel, ConsultationStatus, PrescriptionType, NotificationType, SpecialtyType, Gender, AppointmentStatus

Required Interfaces
Create interfaces before models (e.g., IUser, IPatient, IDoctor, IConsultation, IPrescription, IMedicalHistory, IWaitingList).

Crucial rule: Never use any. Prefer strict typing.

11. REPOSITORY LAYER
Repositories are responsible strictly for loading/saving JSON and accessing Deno KV. They never contain business logic.

Examples: PatientRepository, DoctorRepository, ConsultationRepository, PrescriptionRepository, MedicalHistoryRepository.

12. SERVICE LAYER
Services contain all business rules. Pages should only communicate with services.

Examples: PatientService, DoctorService, ConsultationService, PrescriptionService, NotificationService, WaitingListService, AuthenticationService.

13. VALIDATORS & CUSTOM ERRORS
Validators
Create validators for: Patient, Doctor, Consultation, Prescription, Appointment, Symptoms, Email, Password, RUT.

Custom Errors
Create: AppError, AuthenticationError, ValidationError, RepositoryError, PrescriptionError, StateTransitionError, NotificationError.

Rule: Never silently ignore errors.

14. GOF DESIGN PATTERNS IMPLEMENTATION
Avoid giant if-else chains. Use patterns with clear purposes.

Strategy Pattern (Triage Module)
Levels: C1, C2, C3, C4, C5

Files: strategy/ITriageStrategy.ts, C1Strategy.ts to C5Strategy.ts, and TriageContext.ts.

State Pattern (Consultation Lifecycle)
Flow: Waiting → With Doctor → Exams → Discharged

Rule: Invalid state transitions must throw exceptions. Each state must be its own class.

Template Method (Prescription Generation)
Base Workflow: Doctor Info → Patient Info → Diagnosis → Medications → Dosage → Instructions → Signature → PDF Generation.

Specialties: Cardiology, Pediatrics, Hematology, General Medicine (only override necessary steps).

Observer Pattern (Waiting Room Updates)
Subject: WaitingList, Consultation

Observers: DoctorDashboard, PatientDashboard, NotificationCenter

Singleton Pattern
Target: MedicalHistoryRepository must have only one centralized instance.

Decorator Pattern (Optional Features)
Examples: SeniorCitizenDecorator, UrgentConsultationDecorator, InsuranceDecorator.

15. DATA & API ARCHITECTURE
Entity IDs & Format
All entities must use UUIDs. Never use array indexes.

Every entity has its own JSON file in data/ (e.g., patients.json).

Must contain createdAt and updatedAt in ISO 8601 format (2026-06-15T10:30:00Z).

API Design
Follow REST conventions using nouns:

/api/auth, /api/patients, /api/doctors, /api/consultations, /api/prescriptions

Standardized Responses:

Success: { "success": true, "data": {} }

Error: { "success": false, "message": "" }

Rule: Create DTOs for data transfer. Never expose entities directly.

16. UI/UX & DESIGN SYSTEM
Inspiration: Apple, Stripe, Notion, Linear. Clean spacing, rounded corners, soft shadows.

Typography: Roboto Bold (Titles), Open Sans (Body).

Color Palette
Primary: #211C84

Interactive: #39409D

Accent: #4D55CC

Secondary: #6259C3

Decorative: #B5A8D5

Background: #FFFFFF | Alternative: #F4F2FA

Priority Badges
C1: Red | C2: Orange | C3: Blue | C4: Green | C5: Gray

### 16.1 Visual Reference for TeleAlae UI
Use this as the default visual language for all new screens and components.

Structure and hierarchy
- The page should follow a clear top-to-bottom hierarchy: header, main content, footer.
- The header is composed of a logo on the left, a centered title/subtitle, and a menu trigger on the right.
- Main content should be centered and spaced generously, with one primary action area per section.
- Important information should be emphasized with larger typography and stronger contrast, while secondary information stays lighter.

Card style
- Cards should use rounded rectangles with large corner radii (28px–40px).
- The dominant card treatment uses a strong purple-blue background (#4D55CC or #211C84), white text, and subtle elevation.
- Cards should have generous internal padding and clear vertical rhythm.
- Content inside cards should be grouped into short blocks with visual separation.

Layout patterns
- Use a centered composition for dashboards and forms.
- For lists or tables, use a strong header row followed by clean rows with alternating background tones.
- Buttons should appear as rounded pills, with full-width buttons for actions inside panels and compact buttons for inline actions.
- Modal feedback and alerts should use a centered overlay with a soft dimmed background.

Interaction and state
- Hover states should be subtle and consistent, usually a darker or brighter version of the same palette.
- Disabled buttons should reduce opacity rather than changing the layout.
- Empty states should be clear, calm, and centered, with short explanatory text.

Design intent
- The experience should feel trustworthy, modern, and medical: clean, calm, precise, and not overly playful.
- Visual emphasis should come from spacing, contrast, and hierarchy rather than visual clutter.

17. CODE QUALITY & FILE LIMITS
TypeScript: strict: true enabled. No any, no duplicated code.

Functions: Max 30 lines.

Classes: Max 300 lines.

Files: Max 500 lines.

Documentation: Every class must contain Purpose, Responsibilities, Relationships, Pattern used, and Dependencies.

18. AI WORKFLOW RULES
Before writing any code, you MUST explain:

Folder structure involved.

Interfaces required.

Classes required.

Relationships.

Design pattern used and why it is appropriate.

AI Restrictions: Never rewrite unrelated files, never break existing architecture, never introduce hacks, and never create God classes.
