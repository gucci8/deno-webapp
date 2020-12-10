//Passes the content for navigation bar
const getNavbarContent = async ({ session }) => {
    const userObj = await session.get('user');
    if (!userObj) {
        return {
            message: "You are not currently logged in.",
            loggedIn: false
        };
    } else {
        return {
            message: `Logged in as ${userObj.email}`,
            loggedIn: true
        };
    }
}

export { getNavbarContent };