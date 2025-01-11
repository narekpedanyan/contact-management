import {Link} from "@tanstack/react-router";
import { FC } from "react";
import {useQuery} from "@tanstack/react-query";
import {requests} from "../../../../service/HttpService.ts";
import {Contact} from "../../../../types";
import styles from './sidebar.module.scss';
import Loading from "../../../../components/Loading/Loading.tsx";
import classNames from "classnames";

const Sidebar: FC = () => {
    const { data: contactsData, isLoading } = useQuery<Contact[]>({
        queryKey: ['document-filing-info'],
        queryFn: async () => {
            return requests.get(`/contacts`);
        },
        gcTime: 0,
    });
    const contacts = contactsData ?? [];
    return (
        <aside className={classNames(styles.sideBar)}>
            <div className="flex items-center p-4">
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
            <div>
                {
                    isLoading ? (
                        <Loading/>
                    ) : (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <Link to={`/contacts/${contact.id}`}>{contact.name}</Link>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
        </aside>
    )
}

export default Sidebar;
