import { body } from "express-validator";

export const signupValidation = [
  body("email").isEmail().withMessage("Email must be valid").normalizeEmail(),

  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),

  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name must contain only letters and spaces"),
];
