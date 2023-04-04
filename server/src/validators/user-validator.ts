import { body } from "express-validator";

class UserValidator {
    loginValidator(){
        return[
            body("email").isEmail().withMessage("Invalid Email"),
            body("password").notEmpty().withMessage("Password field should not be empty"),
        ];
    };

    registrationValidator(){
        return[
            body("email").isEmail().withMessage("InvalidEmail"),
            body("password").isStrongPassword().withMessage("Password is too simple"),
            body("first_name").isString().isLength({min: 2, max:100}),
            body('last_name').isString().isLength({min: 2, max:100}),
            body("height").optional().isNumeric(),
            body("weight").optional().isNumeric(),
            body("fat_percent").optional().isNumeric(),
        ]
    };
}


export default new UserValidator();