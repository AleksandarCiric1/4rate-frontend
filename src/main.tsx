import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { UserProvider } from "./providers/user.tsx";
import { NotificationProvider } from "./providers/notification.tsx";

createRoot(document.getElementById("root")!).render(
  <NotificationProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </NotificationProvider>
);
