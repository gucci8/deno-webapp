import { executeCachedQuery } from "../../database/database.js";
import { dateValidate } from "../../utils/dateValidate.js";

const summaryApi = async({response}) => {
    var d = new Date();
    const date = dateValidate(d.getDate(), d.getMonth() + 1, d.getFullYear());

    const res_m = await executeCachedQuery("SELECT AVG(sleepduration) AS averagesleepduration, AVG(sleepquality) AS averagesleepquality FROM mreports WHERE date <= $1::DATE AND date > $1::DATE - 7::INTEGER;",
    date);
    const res_e = await executeCachedQuery("SELECT AVG(sportduration) AS averagesportduration, AVG(studyduration) AS averagestudyduration, AVG(regularity) AS averageregularity, AVG(eatquality) AS averageeatingquality FROM ereports WHERE date <= $1::DATE AND date > $1::DATE - 7::INTEGER;",
    date);
    const res_gm = await executeCachedQuery("SELECT AVG(genericmood) AS averagegenericmood FROM ( ( SELECT date, genericmood, user_id FROM mreports UNION SELECT date, genericmood, user_id FROM ereports ) EXCEPT ( SELECT m.date, m.genericmood, m.user_id FROM mreports AS m, ereports AS e WHERE m.date = e.date AND m.user_id = e.user_id UNION SELECT e.date, e.genericmood, e.user_id FROM mreports AS m, ereports AS e WHERE m.date = e.date AND m.user_id = e.user_id ) UNION SELECT m.date, (m.genericmood + e.genericmood) / 2 AS genericmood, m.user_id FROM mreports AS m, ereports AS e WHERE m.date = e.date AND m.user_id = e.user_id ) AS S WHERE S.date <= $1::DATE AND S.date > $1::DATE - 7::INTEGER;",
    date);

    const mornings = res_m.rowsOfObjects()[0];
    const evenings = res_e.rowsOfObjects()[0];
    const genericmood = res_gm.rowsOfObjects()[0];

    response.body = {
        averageSleepDuration: mornings.averagesleepduration,
        averageSportDuration: evenings.averagepportduration,
        averageStudyDuration: evenings.averagestudyduration,
        averageSleepQuality: mornings.averagesleepquality,
        averageEatingQuality: evenings.averageeatingquality,
        averageRegularity: evenings.averageregularity,
        averageGenericMood: genericmood.averagegenericmood
    };
}

const summaryApiDate = async({params, response}) => {
    const day = params.day;
    const month = params.month;
    const year = params.year;
    const date = dateValidate(day, month, year);
    if (date === null) {
        return '{"error":"Invalid date"}';
    }

    const res_m = await executeCachedQuery("SELECT AVG(sleepduration) AS averagesleepduration, AVG(sleepquality) AS averagesleepquality FROM mreports WHERE date = $1::DATE;",
    date);
    const res_e = await executeCachedQuery("SELECT AVG(sportduration) AS averagesportduration, AVG(studyduration) AS averagestudyduration, AVG(regularity) AS averageregularity, AVG(eatquality) AS averageeatingquality FROM ereports WHERE date = $1::DATE;",
    date);
    const res_gm = await executeCachedQuery("SELECT AVG(genericmood) AS averagegenericmood FROM ( ( SELECT date, genericmood, user_id FROM mreports UNION SELECT date, genericmood, user_id FROM ereports ) EXCEPT ( SELECT m.date, m.genericmood, m.user_id FROM mreports AS m, ereports AS e WHERE m.date = e.date AND m.user_id = e.user_id UNION SELECT e.date, e.genericmood, e.user_id FROM mreports AS m, ereports AS e WHERE m.date = e.date AND m.user_id = e.user_id ) UNION SELECT m.date, (m.genericmood + e.genericmood) / 2 AS genericmood, m.user_id FROM mreports AS m, ereports AS e WHERE m.date = e.date AND m.user_id = e.user_id ) AS S WHERE S.date = $1::DATE;",
    date);


    const mornings = res_m.rowsOfObjects()[0];
    const evenings = res_e.rowsOfObjects()[0];
    const genericmood = res_gm.rowsOfObjects()[0];

    response.body = {
        averageSleepDuration: mornings.averagesleepduration,
        averageSportDuration: evenings.averagepportduration,
        averageStudyDuration: evenings.averagestudyduration,
        averageSleepQuality: mornings.averagesleepquality,
        averageEatingQuality: evenings.averageeatingquality,
        averageRegularity: evenings.averageregularity,
        averageGenericMood: genericmood.averagegenericmood
    };
}

export { summaryApi, summaryApiDate };