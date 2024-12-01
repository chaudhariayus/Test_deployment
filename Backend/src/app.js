import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authroutes from '../api/routes/auth.routes.js';
import profileroutes from '../api/routes/profile.route.js';
import adminroutes from '../api/routes/admin.routes.js';
import appointmentroutes from '../api/routes/appointments.routes.js';
import patientroutes from '../api/routes/patient.routes.js';
import Filterroutes from '../api/routes/Filter.routes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express(); 

// CORS configuration to allow requests from localhost (frontend)
const corsOptions = {
  origin: ['http://localhost:5173', 'https://your-backend.onrender.com'], // allow both localhost and Render backend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // specify allowed headers
  credentials: true, // allow cookies to be sent across origins (important for authentication)
};

// Apply CORS with the configured options
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authroutes);
app.use("/profile", profileroutes);
app.use("/admin", adminroutes);
app.use("/appointment", appointmentroutes);
app.use("/patient", patientroutes);
app.use("/", Filterroutes);

export default app;
