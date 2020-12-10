import { dateValidate } from "../../utils/dateValidate.js";
import { summary } from "../../services/summary.js";
import { getNavbarContent } from "./getNavbarContent.js";

const showSummary = async({request, session, render}) => {
  const body = request.body();
  const params = await body.value;

  const content = await getNavbarContent({session});

  if (request.method === 'POST') {
    content.date = params.get('date');
  } else {
    var d = new Date();
    content.date = dateValidate(d.getDate(), d.getMonth() + 1, d.getFullYear());
  }
  
  content.weekdata = await summary({request, session}, 7);
  content.monthdata = await summary({request, session}, 30);

  render('/summary/summary.ejs', content);
}

export { showSummary };