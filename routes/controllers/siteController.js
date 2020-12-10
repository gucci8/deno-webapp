import { dateValidate } from "../../utils/dateValidate.js";
import { isItDoneToday } from "../../services/report.js"
import { glimpse } from "../../services/summary.js"
import { getNavbarContent } from "./getNavbarContent.js";

const showIndex = async({session, render}) => {
  const content = await getNavbarContent({session});

  content.glimpse = await glimpse({session});
  
  render('index.ejs', content);
}

const showRepIndex = async({session, render}) => {
  const content = await getNavbarContent({session});

  const repyet = await isItDoneToday({session});

  if (repyet.morning && repyet.evening) {
    content.greet = 'You have already reported everything today.';
  } else if (repyet.morning) {
    content.greet = 'You have already reported your morning today.';
  } else if (repyet.evening) {
    content.greet = 'You have already reported your evening today.';
  } else {
    content.greet = "Welcome! You haven't reported anything yet today.";
  }

  render('/reporting/repindex.ejs', content);
}

const showRepM = async({session, render}) => {
  const content = await getNavbarContent({session});

  var d = new Date();
  content.date = dateValidate(d.getDate(), d.getMonth() + 1, d.getFullYear())

  render('/reporting/morning.ejs', content);
}

const showRepE = async({session, render}) => {
  const content = await getNavbarContent({session});

  var d = new Date();
  content.date = dateValidate(d.getDate(), d.getMonth() + 1, d.getFullYear())

  render('/reporting/evening.ejs', content);
}

export { showIndex, showRepIndex, showRepM, showRepE };