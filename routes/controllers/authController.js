const showLoginForm = ({render}) => {
    const error = "";
    const email = "";
    render('login.ejs', { email, error });
}

const showRegistrationForm = ({render}) => {
    const error = "";
    const email = "";
    render('register.ejs', { email, error });
}

export { showLoginForm, showRegistrationForm };