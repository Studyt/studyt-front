import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { ProtectedRoute } from "./components/protectedRoute";
import { Header } from "./components/header";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { TokenConfirmation } from "./pages/tokenConfirmation";

import { useAppSelector } from "./store";
import { Subject } from "./pages/subject";

export const Routes = () => {
  const location = useLocation();
  const id = useAppSelector((state) => state.auth.id);

  return (
    <>
    {id && <Header />}
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        <ProtectedRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/confirmation/:token" component={TokenConfirmation} />
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/subjects/:subjectID" component={Subject} />
      </Switch>
      </AnimatePresence>
      </>
  );
};
