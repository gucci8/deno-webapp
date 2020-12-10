import { executeCachedQuery } from "../database/database.js";
import { dateValidate } from "../utils/dateValidate.js";

const summary = async({request, session}, period) => {
    const body = request.body();
    const params = await body.value;

    let date = null;

    if (request.method === 'POST') {
        date = params.get('date');
    } else {
        var d = new Date();
        date = dateValidate(d.getDate(), d.getMonth() + 1, d.getFullYear());
    }

    const user = await session.get('user');

    if(!user) {
        response.body = "No."; //in case of some poindexter not using this via UI
        return;
    }

    const res_m = await executeCachedQuery("SELECT AVG(sleepduration) AS sld, AVG(sleepquality) AS slq FROM mreports WHERE user_id = $1 AND date <= $2::DATE AND date > $2::DATE - $3::INTEGER;",
    user.id, date, period);
    const res_e = await executeCachedQuery("SELECT AVG(sportduration) AS spd, AVG(studyduration) AS std, AVG(regularity) AS r, AVG(eatquality) AS eq FROM ereports WHERE user_id = $1 AND date <= $2::DATE AND date > $2::DATE - $3::INTEGER;",
    user.id, date, period);
    const avg_genericmood = await executeCachedQuery("SELECT AVG(genericmood) AS gm FROM ( ( SELECT date, genericmood, user_id FROM mreports UNION SELECT date, genericmood, user_id FROM ereports ) EXCEPT ( SELECT m.date, m.genericmood, m.user_id FROM mreports AS m, ereports AS e WHERE m.date = e.date AND m.user_id = e.user_id UNION SELECT e.date, e.genericmood, e.user_id FROM mreports AS m, ereports AS e WHERE m.date = e.date AND m.user_id = e.user_id ) UNION SELECT m.date, (m.genericmood + e.genericmood) / 2 AS genericmood, m.user_id FROM mreports AS m, ereports AS e WHERE m.date = e.date AND m.user_id = e.user_id ) AS S WHERE S.user_id = $1 AND S.date <= $2::DATE AND S.date > $2::DATE - $3::INTEGER;",
    user.id, date, period);

    const mornings = res_m.rowsOfObjects();
    const evenings = res_e.rowsOfObjects();
    const genericmood = avg_genericmood.rowsOfObjects();

    return {
        mornings: mornings[0],
        evenings: evenings[0],
        genericmood: genericmood[0]
    };
}

//The data glimpse to be shown at landing page
const glimpse = async({session}) => {
    const user = await session.get('user');
    if (!user) {
        return;
    }
    var d = new Date()
    const date = dateValidate(d.getDate(), d.getMonth() + 1, d.getFullYear());

    const res_today = await executeCachedQuery("SELECT AVG(S.genericmood) AS avg FROM ( SELECT genericmood, date, user_id FROM mreports UNION SELECT genericmood, date, user_id FROM ereports ) AS S WHERE S.user_id = $1 AND S.date = $2::DATE",
    user.id, date);
    const res_yesterday = await executeCachedQuery("SELECT AVG(S.genericmood) AS avg FROM ( SELECT genericmood, date, user_id FROM mreports UNION SELECT genericmood, date, user_id FROM ereports ) AS S WHERE S.user_id = $1 AND S.date = $2::DATE - 1",
    user.id, date);

    if (res_today.rowCount === 0 || res_yesterday.rowCount === 0) {
        return {
            mood_today: 'I have no idea :(',
            mood_yesterday: 'I have no idea :(',
            greet: 'Report your today and yesterday to let me catch a glimpse of your feelings :3'
        };
    } else {
        const ret = {};
        ret.mood_today = Number(res_today.rowsOfObjects()[0].avg).toPrecision(2);
        ret.mood_yesterday = Number(res_yesterday.rowsOfObjects()[0].avg).toPrecision(2);

        if (ret.mood_today < ret.mood_yesterday) {
            ret.greet = 'Things are looking gloomy today.';
        } else if (ret.mood_today > ret.mood_yesterday) {
            ret.greet = 'Things are looking bright today.';
        } else {
            ret.greet = '';
        }
        return ret;
    }
}

export { summary, glimpse };