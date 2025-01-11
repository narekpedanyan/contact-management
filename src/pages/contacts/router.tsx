import {
    createRouter,
    createRoute,
    createRootRoute,
    redirect,
} from '@tanstack/react-router';
import Layout from './Layout.tsx';
import Details from './pages/ContactDetails/ContactDetails.tsx';
import CreateContact from "./pages/CreateContact/CreateContact.tsx";
import EditContact from "./pages/EditContact/EditContact.tsx";

const rootRoute = createRootRoute({
    component: Layout,
});

const contactsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'contacts', // This makes the base path '/contacts'
    component: Details,
});

const redirectToContactsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    loader: () => {
        throw redirect({ to: '/contacts' });
    },
});

const contactDetailsRoute = createRoute({
    getParentRoute: () => contactsRoute,
    path: '$contactId',
    component: Details,
});

const contactFormRoute = createRoute({
    getParentRoute: () => contactsRoute,
    path: '$contactId/edit',
    component: EditContact,
});

const createContactRoute = createRoute({
    getParentRoute: () => contactsRoute,
    path: 'new',
    component: CreateContact,
});

const routeTree = rootRoute.addChildren([
    redirectToContactsRoute,
    contactsRoute.addChildren([contactDetailsRoute, contactFormRoute, createContactRoute])
]);

const router = createRouter({ routeTree });

export default router;
