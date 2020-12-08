const getNavbarContent = async({session}) => {
  const userObj = await session.get('user');
  if(!userObj) {
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

const showIndex = async({session, render}) => {
  const content = await getNavbarContent({session});
  render('index.ejs', content);
}

const showRepIndex = async({session, render}) => {
  const content = await getNavbarContent({session});
  render('/reporting/repindex.ejs', content);
}

const showRepM = async({session, render}) => {
  const content = await getNavbarContent({session});

  var d = new Date();
  content.day = d.getDate();
  content.month = d.getMonth() + 1;
  content.year = d.getFullYear();

  render('/reporting/morning.ejs', content);
}

const showRepE = async({session, render}) => {
  const content = await getNavbarContent({session});

  var d = new Date();
  content.day = d.getDate();
  content.month = d.getMonth() + 1;
  content.year = d.getFullYear();

  render('/reporting/evening.ejs', content);
}

export { showIndex, showRepIndex, showRepM, showRepE };