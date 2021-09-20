import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { ProtectedRoute } from './components/protectedRoute';

import { Home } from './pages/home';
import { Login } from './pages/login';
import { TokenConfirmation } from './pages/tokenConfirmation';

export const Routes = () => {

    const location = useLocation();

    return (
        <AnimatePresence exitBeforeEnter initial={false}>
            <Switch location={location} key={location.pathname}>
                <ProtectedRoute exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/confirmation/:token" component={TokenConfirmation} />
            </Switch>
        </AnimatePresence>
    )
};