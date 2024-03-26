const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const bodyParser = require("body-parser");

// Route files
const dentists = require("./routes/dentists");
const bookings = require("./routes/bookings");
const auth = require("./routes/auth");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Body parser
app.use(express.json());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rate Limiting
const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollutions
app.use(hpp());

// Cookie parser
app.use(cookieParser());

// Mount routes
app.use("/api/v1/dentists", dentists);
app.use("/api/v1/bookings", bookings);
app.use("/api/v1/auth", auth);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    "Server running in ",
    process.env.NODE_ENV,
    "on " + process.env.HOST + " :" + PORT
  )
);

const swaggerOptions={
  swaggerDefinition:{
    openapi: '3.0.0',
    info: {
    title: 'Library API',
    version: '1.0.0',
    description: 'Dentist Booking API'
    },
    servers: [
      {
        url: process.env.HOST + ':' + PORT + '/api/v1'
      }
    ],
  },
  apis:['./routes/*.js'],
};
const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});