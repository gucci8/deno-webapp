import { Router } from "../deps.js";
import { showLoginForm, showRegistrationForm } from "./controllers/authController.js";
import { showIndex } from "./controllers/indexController.js";
import { postLoginForm, postRegistrationForm, logout } from "./../services/authentication.js";

const router = new Router();

router.get('/', showIndex);
//router.get('/behavior/reporting');

router.get('/auth/registration', showRegistrationForm);
router.get('/auth/login', showLoginForm);
router.get('/auth/logout', logout);
router.post('/auth/logout', logout);

//router.get('api/summary', weekSummaryApi);
//router.get('api/summary/:year/:month/:day', summaryAPI);

router.post('/auth/login', postLoginForm);
router.post('/auth/registration', postRegistrationForm);
/*router.post();
router.post();
router.post();*/

export { router };