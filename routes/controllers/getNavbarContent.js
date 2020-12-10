import { dateValidate } from "../../utils/dateValidate.js";

//Passes the content for navigation bar
const getNavbarContent = async ({ session }) => {
    var d = new Date();
    const date = dateValidate(d.getDate(), d.getMonth() + 1, d.getFullYear())
    const userObj = await session.get('user');
    if (!userObj) {
        return {
            message: "You are not currently logged in.",
            loggedIn: false,
            date: date
        };
    } else {
        return {
            message: `Logged in as ${userObj.email}`,
            loggedIn: true,
            date: date
        };
    }
}

export { getNavbarContent };