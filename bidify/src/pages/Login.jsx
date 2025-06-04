import LoginForm from "../components/LoginForm";
/**
 * Login component that renders the login form.
 * It is styled to fill the screen height and uses a gradient background.
 * The form is centered both vertically and horizontally.
 */
const Login = () => {
  return (
    <div className="min-h-screen flex-styled justify-center bg-gradient-to-t from-secondary-default to-primary-default">
      <LoginForm />
    </div>
  );
};

export default Login;
