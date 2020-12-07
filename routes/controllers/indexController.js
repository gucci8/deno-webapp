const showIndex = async({session, render}) => {
  const userObj = await session.get('user');
  if(!userObj) {
    const content = {
      message: "You are not currently logged in.",
      loggedIn: false
    };
    render('index.ejs', content);
  } else {
    const content = {
      message: `Logged in as ${userObj.email}`,
      loggedIn: true
    };
    render('index.ejs', content);
  }
}
 
export { showIndex };