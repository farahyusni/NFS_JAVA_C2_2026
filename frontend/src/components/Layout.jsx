<<<<<<< HEAD
import AppHeader from "./AppHeader";

export default function Layout({ children }) {
    return (
        <div className="app-shell"> 
            <AppHeader />
            <main>{children}</main>
        </div>

    );
}
=======
import AppHeader from './AppHeader.jsx';

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <AppHeader />
      <main>{children}</main>
    </div>
  );
}
>>>>>>> a2ba22e3d184f5cd9d97030666c810b5a4fc122d
