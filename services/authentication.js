import { executeQuery } from "../database/database.js";
import { bcrypt } from "../deps.js";

//Registration/login queries not cached for security reasons

const postRegistrationForm = async({request, render, response}) => {
    const body = request.body();
    const params = await body.value;
    const email = params.get('email');
    const password = params.get('password');
    const verification = params.get('verification');

    let error = "";

    if (password.length <= 4) {
      error = 'Password must contain at least 4 characters.';
      render('register.ejs', { email, error });
      return;
    }

    if (password !== verification) {
      error = 'The entered passwords did not match.';
      render('register.ejs', { email, error });
      return;
    }
    const existingUsers = await executeQuery("SELECT * FROM users WHERE email = $1;", email);
    if (existingUsers.rowCount > 0) {
      error = 'The email is already reserved.';
      render('register.ejs', { email, error });
      return;
    }

    const hash = await bcrypt.hash(password);
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);
    response.body = 'Registration successful!';
    response.redirect('/auth/login');
  };
  
const postLoginForm = async({request, response, render, session}) => {
    const body = request.body();
    const params = await body.value;
    const email = params.get('email');
    const password = params.get('password');

    let error = "";
    
    const res = await executeQuery("SELECT * FROM users WHERE email = $1;", email);
    if (res.rowCount === 0) {
        error = "Invalid email. Have you signed up?"
        render('login.ejs', { email, error });
        return;
    }
    
    const userObj = res.rowsOfObjects()[0];
    const hash = userObj.password;
    const passwordCorrect = await bcrypt.compare(password, hash);

    if (!passwordCorrect) {
      error = 'Wrong password.';
      render('login.ejs', { email, error });
      return;
    } else {
      await session.set('authenticated', true);
      await session.set('user', {
        id: userObj.id,
        email: userObj.email
      });
      response.body = 'Authentication successful!';
      response.redirect('/');
    }
}

const logout = async({response, session}) => {
  await session.set('user', null);
  await session.set('authenticated', false);
  response.body = 'Logged out.';
  response.redirect('/');
}

export { postLoginForm, postRegistrationForm, logout };