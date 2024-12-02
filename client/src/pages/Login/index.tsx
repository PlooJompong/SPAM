import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  // Separata states för skapa användare och inloggning
  const [createUsername, setCreateUsername] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createAdmin, setCreateAdmin] = useState(false);
  const [createMessage, setCreateMessage] = useState("");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const { login } = useAuth();

  // Hantera skapande av användare
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://node-mongodb-api-ks7o.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: createUsername,
          password: createPassword,
          admin: createAdmin,
        }),
      });

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

  // Hantera inloggning
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://node-mongodb-api-ks7o.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoginMessage(`Välkommen, ${data.user.username}!`);
        login(data.user.username, data.user.admin); // Spara användaren i context och vidarebefordra
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
      <div className="flex justify-center gap-4">
        {/* Formulär för att skapa ny användare */}
        <div className="font-primary text-teal-900">
          <h2 className="text-xl mb-2">Skapa ny användare</h2>
          <form className="flex flex-col w-full" onSubmit={handleCreateUser}>
            <fieldset>
              <label htmlFor="create-username">Användarnamn</label>
              <input
                type="text"
                id="create-username"
                value={createUsername}
                onChange={(e) => setCreateUsername(e.target.value)}
                required
                className="mb-4 w-full border rounded-md border-gray-300 p-2 focus:outline-teal-900"
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
                className="mb-4 w-full border rounded-md border-gray-300 p-2 focus:outline-teal-900"
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
              className="bg-teal-900 text-white py-2 px-4 rounded"
            >
              Skapa användare
            </button>
          </form>
          {createMessage && <p>{createMessage}</p>}
        </div>

        {/* Formulär för inloggning */}
        <div className="flex flex-col font-primary text-teal-900">
          <h2 className="text-xl mb-2">Logga in</h2>
          <form
            className="flex flex-col items-start w-full"
            onSubmit={handleLogin}
          >
            <div>
              <label htmlFor="login-username">Användarnamn</label>
              <input
                type="text"
                id="login-username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
                className="mb-4 w-full border rounded-md border-gray-300 p-2 focus:outline-teal-900"
              />
            </div>
            <div>
              <label htmlFor="login-password">Lösenord</label>
              <input
                type="password"
                id="login-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="mb-4 w-full border rounded-md border-gray-300 p-2 focus:outline-teal-900"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-900 text-white py-2 px-4 rounded"
            >
              Logga in
            </button>
          </form>
          {loginMessage && <p>{loginMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
