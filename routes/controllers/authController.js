const showLoginForm = ({render}) => {
    render('login.ejs');
}

const showRegistrationForm = ({render}) => {
    render('register.ejs');
}

export { showLoginForm, showRegistrationForm };