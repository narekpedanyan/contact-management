import {Link, useMatch} from "@tanstack/react-router";
import { FC, useEffect, useMemo } from "react";
import {useQuery} from "@tanstack/react-query";
import {TContact} from "../../../../types";
import styles from './sidebar.module.scss';
import Loading from "../../../../components/Loading/Loading.tsx";
import classNames from "classnames";
import {ContactsService} from "../../ContactsService.ts";
import {useSidebarContext} from "../../../../context/SidebarContext.tsx";
import useThrottleInputChange from "../../../../hooks/useThrottleInputChange.tsx";
import SidebarHeader from "./SidebarHeader.tsx";

const Sidebar: FC = () => {
    const {
        value: searchKey,
        onChange,
        clearValue,
        inputValue,
        isTyping
    } = useThrottleInputChange();
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

    const contacts = useMemo(() => {
        const data = contactsData ?? [];
        if (!searchKey) return data;
        return data.filter(
            (item) => {
                return item.name.toLowerCase().includes(searchKey.toLowerCase());
            }
        );
    }, [contactsData, searchKey]);

    useEffect(() => {
        if (sidebarEvents.includes('reFetchContacts')) {
            void refetch();
        }
    }, [sidebarEvents]);

    return (
        <aside className={classNames(styles.sideBar)}>
            <SidebarHeader
                onChange={onChange}
                clearValue={clearValue}
                inputValue={inputValue}
            />
            <div className={classNames('p-4')}>
                {
                    isLoading ? (
                        <Loading/>
                    ) : (
                        <ul className="grid grid-cols-1 gap-2">
                            {
                                contacts.length === 0 ? (
                                    <div className="text-center italic text-gray-400 pt-24">
                                        {
                                            Boolean(searchKey) ? 'No results found for your search.' : 'No contact found'
                                        }
                                    </div>
                                ) : (
                                    <>
                                        {contacts.map((contact: TContact) => {
                                            const {id} = contact;
                                            const isActive = id === contactId;
                                            return (
                                                <li key={contact.id} style={{ opacity: isTyping ? 0.5 : 1 }}>
                                                    <Link
                                                        className={classNames(' w-full block rounded p-2', {
                                                            ['bg-blue-500 text-white']: isActive
                                                        })}
                                                        to={`/contacts/${contact.id}`}
                                                        disabled={isTyping}
                                                    >
                                                        {contact.name}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </>
                                )
                            }
                        </ul>
                    )
                }
            </div>
        </aside>
    )
}

export default Sidebar;
