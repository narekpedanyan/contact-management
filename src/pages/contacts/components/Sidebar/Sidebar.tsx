import {Link, useMatch} from "@tanstack/react-router";
import { FC, useEffect } from "react";
import {useQuery} from "@tanstack/react-query";
import {TContact} from "../../../../types";
import styles from './sidebar.module.scss';
import Loading from "../../../../components/Loading/Loading.tsx";
import classNames from "classnames";
import {ContactsService} from "../../ContactsService.ts";
import {useSidebarContext} from "../../../../context/SidebarContext.tsx";

const Sidebar: FC = () => {
    const { sidebarEvents } = useSidebarContext();
    const match = useMatch({
        from: '/contacts/$contactId',
        shouldThrow: false,
    });
    const contactId = match?.params?.contactId;

    const { data: contactsData, isLoading, refetch } = useQuery<TContact[]>({
        queryKey: ['document-filing-info'],
        queryFn: ContactsService.FetchContacts,
        gcTime: 0,
    });
    const contacts = contactsData ?? [];

    useEffect(() => {
        if (sidebarEvents.includes('reFetchContacts')) {
            refetch();
        }
    }, [sidebarEvents]);

    return (
        <aside className={classNames(styles.sideBar)}>
            <div className="flex items-center p-4 border-b">
                <div className="flex-1 pr-4">
                    <input
                        type="text"
                        className="w-full p-1 rounded flex-1 text-base"
                    />
                </div>
                <div>
                    <Link
                        to="/contacts/new"
                        className="bg-white p-2 rounded text-blue-500"
                    >
                        New
                    </Link>
                </div>
            </div>
            <div className={classNames('p-4')}>
                {
                    isLoading ? (
                        <Loading/>
                    ) : (
                        <ul className="grid grid-cols-1 gap-2">
                            {contacts.map((contact: TContact) => {
                                const { id } = contact;
                                const isActive = id === contactId;
                                return (
                                    <li key={contact.id}>
                                        <Link
                                            className={classNames(' w-full block rounded p-2', {
                                                ['bg-blue-500 text-white']: isActive
                                            })}
                                            to={`/contacts/${contact.id}`}
                                        >
                                            {contact.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    )
                }
            </div>
        </aside>
    )
}

export default Sidebar;
