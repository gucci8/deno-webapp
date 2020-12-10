import { executeCachedQuery, clearCache } from "../database/database.js";
import { dateValidate } from "../utils/dateValidate.js";

const reportMorning = async({ request, session, response }) => {
    const body = request.body();
    const params = await body.value;

    const sleepduration = Number(params.get('sleepduration'));
    const sleepquality = Number(params.get('sleepquality'));
    const genericmood = Number(params.get('genericmood'));
    const date = params.get('date');

    const user = await session.get('user');

    if (!user) {
        response.body = "No."; //in case of some poindexter posting data w/o authentication by curl
    } else {
        await executeCachedQuery("DELETE FROM mreports WHERE date = $1 AND user_id = $2;", date, user.id); //Remove previous report from same day, if so
        clearCache();
        await executeCachedQuery("INSERT INTO mreports (date, sleepduration, sleepquality, genericmood, user_id) VALUES ($1, $2, $3, $4, $5);",
        date, sleepduration, sleepquality, genericmood, user.id);
        clearCache();
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
    const date = params.get('date');

    const user = await session.get('user');

    if (!user) {
        response.body = "No."; //in case of some poindexter posting data w/o authentication by curl
    } else {
        await executeCachedQuery("DELETE FROM ereports WHERE date = $1 AND user_id = $2;", date, user.id); //Remove previous report from same day, if so
        clearCache();
        await executeCachedQuery("INSERT INTO ereports (date, sportduration, studyduration, regularity, eatquality, genericmood, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7);",
        date, sportduration, studyduration, regularity, eatquality, genericmood, user.id);
        clearCache();
        response.redirect("/behavior/reporting");
    }
}

const isItDoneToday = async({session}) => {
    var d = new Date();
    const currdate = dateValidate(d.getDate(), d.getMonth() + 1, d.getFullYear())
    const user = await session.get('user');

    if (!user) {
        return;
    } else {
        let morning = false;
        let evening = false;

        const res_m = await executeCachedQuery("SELECT * FROM mreports WHERE date = $1::DATE AND user_id = $2", currdate, user.id);
        const res_e = await executeCachedQuery("SELECT * FROM ereports WHERE date = $1::DATE AND user_id = $2", currdate, user.id);
        if (res_m.rowCount !== 0) {
            morning = true;
        }
        if (res_e.rowCount !== 0) {
            evening = true;
        }
        return {
            morning: morning,
            evening: evening
        };
    }
}

export { reportMorning, reportEvening, isItDoneToday };