> 🇬🇧 English version below

# ELS – EatLiftSleep  
**Adatvezérelt edzés- és életmód-napló webalkalmazás**

## Áttekintés
Az **ELS (EatLiftSleep)** egy full-stack webalkalmazás, amely lehetővé teszi az edzés, étkezés, testsúly és alvás strukturált naplózását, valamint az adatok hosszabb távú nyomon követését.

A projekt **diplomamunkaként készült**, elsődleges célja egy modern webes architektúra megtervezése és megvalósítása volt valós életből vett problémakörben.

---

## Fő funkciók

### Felhasználói rendszer
- Regisztráció és bejelentkezés
- Hitelesített API-hozzáférés

### Edzésnapló
- Edzések rögzítése
- Gyakorlatok és terhelések kezelése
- Időbeli visszakereshetőség

### Étkezésnapló
- Ételek és étkezések rögzítése
- Automatikus makró- és kalóriaszámítás
- Napi összesítések

### Testsúly és alvás
- Testsúly változásának követése
- Alvásidő rögzítése
- Idősoros adatok kezelése

---

## Technológiai stack

### Backend
- **Node.js**
- **Fastify**
- **Sequelize ORM**
- **MySQL**
- REST API architektúra

### Frontend
- **React**
- **Vite**
- **Tailwind CSS**
- **Redux Toolkit + RTK Query**
- Moduláris CRUD alapú felépítés

## Architektúra
- Elkülönített frontend és backend
- REST végpontok entitásonként
- Relációs adatmodell (felhasználó-centrikus)
- Környezeti változókkal konfigurálható backend

A rendszer kialakítása lehetővé teszi későbbi bővítések megvalósítását (pl. analitika, ajánlórendszer, vizualizációk).

---
## Futtatás helyben

### Előfeltételek
- Node.js
- MySQL szerver
- npm

### Lépések

```bash
# frontend
cd frontend
npm run install-and-build

# backend
cd ../backend
cp .env.example .env
# .env fájl kitöltése adatbázis adatokkal
npm run prod-setup
```

---

## English Version

# ELS – EatLiftSleep  
**Data-driven workout and lifestyle tracking web application**

## Overview
**ELS (EatLiftSleep)** is a full-stack web application designed to track workouts, nutrition, body weight, and sleep in a structured and consistent way, enabling long-term progress monitoring.

The project was developed as a **BSc thesis**, with the primary goal of designing and implementing a modern web application architecture based on a real-world problem domain.

The focus of the project is on:
- structured lifestyle data modeling
- scalable REST API design
- modern frontend state management
- a solid foundation for future analytics and decision-support features

---

## Core Features

### User Management
- User registration and authentication
- Authenticated access to the API

### Workout Tracking
- Logging workout sessions
- Managing exercises and loads
- Historical workout data access

### Nutrition Tracking
- Logging meals and food items
- Automatic macro- and calorie calculation
- Daily nutritional summaries

### Body Weight & Sleep
- Body weight tracking over time
- Sleep duration logging
- Time-series data handling

---

## Technology Stack

### Backend
- **Node.js**
- **Fastify**
- **Sequelize ORM**
- **MySQL**
- REST API architecture

### Frontend
- **React**
- **Vite**
- **Tailwind CSS**
- **Redux Toolkit + RTK Query**
- Modular CRUD-based architecture

---

## Architecture
- Decoupled frontend and backend
- Entity-based REST endpoints
- User-centric relational data model
- Environment-based configuration

The architecture is designed to support future extensions such as analytics, data visualization, and recommendation logic.

---

## Local Setup

### Prerequisites
- Node.js
- MySQL server
- npm

### Steps

```bash
# frontend
cd frontend
npm run install-and-build

# backend
cd ../backend
cp .env.example .env
# Fill in database credentials in the .env file
npm run prod-setup
```

## License
MIT License
