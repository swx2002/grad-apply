import LoginButton from "./ui/login-button";
import RegisterForm from "./ui/signup-button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoginButton />
      <RegisterForm />
    </div>
  );
}
