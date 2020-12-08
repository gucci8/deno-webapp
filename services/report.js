import { executeQuery } from "../database/database.js";
import { dateValidate } from "../utils/dateValidate.js";

const reportMorning = async({ request, session, response }) => {
    const body = request.body();
    const params = await body.value;

    const sleepduration = Number(params.get('sleepduration'));
    const sleepquality = Number(params.get('sleepquality'));
    const genericmood = Number(params.get('genericmood'));

    const day = Number(params.get('day'));
    const month = Number(params.get('month'));
    const year = Number(params.get('year'));

    const user = await session.get('user');
    if (!user) {
        response.body = "No."; //in case of some poindexter curl posting data w/o authentication
        return;
    }

    const formattedDate = dateValidate(day, month, year);
    console.log(formattedDate);

    if (!formattedDate || !user) {
        response.body = "Enter a valid date.";
    } else {
        await executeQuery("INSERT INTO mreports (date, sleepduration, sleepquality, genericmood, user_id) VALUES ($1, $2, $3, $4, $5);",
        formattedDate, sleepduration, sleepquality, genericmood, user.id);
        response.redirect("/behavior/reporting");
    }
}

const reportEvening = async({ request, session, response }) => {
    const body = request.body();
    const params = await body.value;

    const sportduration = Number(params.get('sleepduration'));
    const studyduration = Number(params.get('studyduration'));
    const regularity = Number(params.get('regularity'));
    const eatquality = Number(params.get('eatquality'));
    const genericmood = Number(params.get('genericmood'));

    const day = Number(params.get('day'));
    const month = Number(params.get('month'));
    const year = Number(params.get('year'));

    const user = await session.get('user');
    if (!user) {
        response.body = "No."; //in case of some poindexter curl posting data w/o authentication
        return;
    }

    const formattedDate = dateValidate(day, month, year);
    console.log(formattedDate);

    if (!formattedDate || !user) {
        response.body = "Enter a valid date.";
    } else {
        await executeQuery("INSERT INTO ereports (date, sportduration, studyduration, regularity, eatquality, genericmood, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7);",
        formattedDate, sportduration, studyduration, regularity, eatquality, genericmood, user.id);
        response.redirect("/behavior/reporting");
    }
}

export { reportMorning, reportEvening };