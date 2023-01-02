import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Accounts from "../pages/Accounts";
import NewAccount from "../pages/create/NewAccount";
import NewTransaction from "../pages/create/NewTransaction";
import EditAccount from "../pages/edit/EditAccount";
import Home from "../pages/Home";
import { PageNotFound } from "../pages/PageNotFound";
import Transactions from "../pages/Transactions";
import { authRoutes } from "./auth.routes";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [{
            path: '',
            element: <Home />
        },
        {
            path: 'transactions',
            element: <Transactions />
        },
        {
            path: 'accounts',
            children: [
                {
                    path: '',
                    element: <Accounts />,
                },
                {
                    path: 'new-transaction/:id',
                    element: <NewTransaction />
                },
                {
                    path: 'new-account',
                    element: <NewAccount />
                },
                {
                    path: 'edit/:id',
                    element: <EditAccount />
                }
            ]
        },

        ]
    },
    ...authRoutes,
    {
        path: '*',
        element: <PageNotFound />
    }
]);