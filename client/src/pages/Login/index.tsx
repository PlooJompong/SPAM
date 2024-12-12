import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import CustomerHeader from "../../components/CustomerHeader";
import Container from "../../components/Container";
import margheritaHands from "../../assets/margheritaHands.jpeg";
import { motion, AnimatePresence } from "framer-motion";

const Login: React.FC = () => {
  const [createUsername, setCreateUsername] = useState<string>("");
  const [createPassword, setCreatePassword] = useState<string>("");
  const [createAdmin, setCreateAdmin] = useState<boolean>(false);
  const [createMessage, setCreateMessage] = useState<string>("");

  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState<string>("");

  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  const { login } = useAuth();

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        // "https://node-mongodb-api-ks7o.onrender.com/users"
        "http://localhost:8000/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: createUsername,
            password: createPassword,
            admin: createAdmin,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCreateMessage("Användare skapad!");
        setCreateUsername("");
        setCreatePassword("");
        setCreateAdmin(false);
      } else if (response.status === 409) {
        setCreateMessage(
          "Användarnamnet är redan taget. Vänligen välj ett annat."
        );
      } else {
        setCreateMessage(`Fel: ${data.message}`);
      }
    } catch (err) {
      console.error("Fel vid kommunikation med servern:", err);
      setCreateMessage("Kunde inte ansluta till servern.");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/users/login",
        // "https://node-mongodb-api-ks7o.onrender.com/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: loginUsername,
            password: loginPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setLoginMessage(`Välkommen, ${data.user.username}!`);
        login(data.user.username, data.user.admin, data.token); // Pass the token to the login function
      } else {
        setLoginMessage(`Fel: ${data.message}`);
      }
    } catch (err) {
      console.error("Fel vid kommunikation med servern:", err);
      setLoginMessage("Kunde inte ansluta till servern.");
    }
  };

  return (
    <>
      <CustomerHeader />
      <Container>
        <main className="flex items-center md:justify-center md:gap-20 md:mt-8 mt-2 justify-around">
          <section className="flex flex-col items-center justify-center gap-8 md:gap-12">
            <form
              className="flex flex-col w-5/6 md:w-full font-primary text-teal-900"
              onSubmit={handleLogin}
            >
              <h2 className="text-xl text-center mb-2">Logga in</h2>
              <fieldset>
                <label htmlFor="login-username">Användarnamn</label>
                <input
                  type="text"
                  id="login-username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                  className="mb-4 w-full border rounded-md border-gray-300 p-1 md:p-2 font-sans focus:outline-teal-900"
                />
              </fieldset>
              <fieldset>
                <label htmlFor="login-password">Lösenord</label>
                <input
                  type="password"
                  id="login-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="mb-4 w-full border rounded-md border-gray-300 p-1 md:p-2 focus:outline-teal-900"
                />
              </fieldset>
              <button
                type="submit"
                className="bg-teal-900  hover:bg-teal-800 text-white text-sm py-1 px-2 md:text-base md:py-2 md:px-4 rounded"
              >
                Logga in
              </button>

              {loginMessage && <p>{loginMessage}</p>}
            </form>

            {/* Button to create new user */}
            <button
              onClick={() => {
                setShowCreateForm((prev) => !prev);
                setShowLoginForm(false);
              }}
              className="rounded-full w-5/6 md:w-full text-xs md:text-base md:py-2 md:px-4 bg-orange-500 px-8 py-2 font-primary text-white"
            >
              Skapa användare
            </button>

            {/* Form to create new user */}
            <AnimatePresence>
              {showCreateForm && (
                <motion.form
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col w-5/6 md:w-full font-primary text-teal-900"
                  onSubmit={handleCreateUser}
                >
                  <fieldset>
                    <label htmlFor="create-username">Användarnamn</label>
                    <input
                      type="text"
                      id="create-username"
                      value={createUsername}
                      onChange={(e) => setCreateUsername(e.target.value)}
                      required
                      className="mb-4 w-full border rounded-md border-gray-300 p-1 md:p-2 font-sans focus:outline-teal-900"
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="create-password">Lösenord</label>
                    <input
                      type="password"
                      id="create-password"
                      value={createPassword}
                      onChange={(e) => setCreatePassword(e.target.value)}
                      required
                      className="mb-4 w-full border rounded-md border-gray-300 p-1 md:p-2 focus:outline-teal-900"
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="create-admin">Admin:</label>
                    <input
                      type="checkbox"
                      id="create-admin"
                      className="mb-4 mt-4 mx-1"
                      checked={createAdmin}
                      onChange={(e) => setCreateAdmin(e.target.checked)}
                    />
                  </fieldset>
                  <button
                    type="submit"
                    className="bg-teal-900 text-white text-sm py-1 px-2 md:text-base md:py-2 md:px-4 rounded hover:bg-teal-800"
                  >
                    Skapa användare
                  </button>
                  {createMessage && <p>{createMessage}</p>}
                </motion.form>
              )}
            </AnimatePresence>
          </section>
          <img
            src={margheritaHands}
            className="w-1/3 rounded hidden md:block"
          />
        </main>
      </Container>
    </>
  );
};

export default Login;
