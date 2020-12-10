import { Router } from "../deps.js";
import { showLoginForm, showRegistrationForm } from "./controllers/authController.js";
import { showIndex, showRepIndex, showRepM, showRepE } from "./controllers/siteController.js";
import { showSummary } from "./controllers/summaryController.js";
import { postLoginForm, postRegistrationForm, logout } from "./../services/authentication.js";
import { reportMorning, reportEvening } from "./../services/report.js";
import { summaryApi, summaryApiDate } from "./apis/summaryApi.js";

const router = new Router();

router.get('/', showIndex);
router.get('/behavior/reporting', showRepIndex);

router.get('/behavior/reporting/morning', showRepM);
router.get('/behavior/reporting/evening', showRepE);
router.get('/behavior/summary', showSummary);

router.get('/auth/registration', showRegistrationForm);
router.get('/auth/login', showLoginForm);
router.get('/auth/logout', logout);
router.post('/auth/logout', logout);

router.get('/api/summary', summaryApi);
router.get('/api/summary/:year/:month/:day', summaryApiDate);

router.post('/auth/login', postLoginForm);
router.post('/auth/registration', postRegistrationForm);

router.post('/behavior/reporting/morning', reportMorning);
router.post('/behavior/reporting/evening', reportEvening);
router.post('/behavior/summary', showSummary);

export { router };