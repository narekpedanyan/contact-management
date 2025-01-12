import { useState } from 'react';
import {useMatch, useNavigate} from '@tanstack/react-router';
import {useMutation, useQuery} from "@tanstack/react-query";
import {TContact} from "../../../../types";
import {ContactsService} from "../../ContactsService.ts";
import Loading from "../../../../components/Loading/Loading.tsx";
import Modal from "../../../../components/Modal/Modal.tsx";
import {AxiosError} from "axios";
import {useSidebarContext} from "../../../../context/SidebarContext.tsx";

const ContactDetails = () => {
    const [isDeleteModalOpened, toggleDeleteModal] = useState(false);
    const navigate = useNavigate({ from: '/contacts/$contactId' });

    const { triggerEvent } = useSidebarContext();
    const match = useMatch({ from: '/contacts/$contactId' });
    const { contactId } = match.params;

    const { data: contactDetails, isLoading } = useQuery<TContact>({
        queryKey: ['contact-details', contactId],
        queryFn: () => ContactsService.FetchContactDetails({ id: contactId }),
        gcTime: 0,
    });

    const {
        name,
        imageUrl,
        userName,
        bio,
    } = contactDetails ?? {};

    const deleteContact = useMutation({
        mutationFn: ContactsService.DeleteContact,
        onSuccess: async () => {
            triggerEvent('reFetchContacts');
            void navigate({ to: '/contacts' });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            console.log(error, 'error');
        },
    });

    const onConfirm = () => {
        deleteContact.mutate({ id: contactId });
    }

    const onCloseModal = () => {
        toggleDeleteModal(false);
    }
    return (
        <div>
            <Modal
                isOpen={isDeleteModalOpened}
                title="Removing contact information"
                message="Are you sure you want to delete this user?"
                onClose={onCloseModal}
                onConfirm={onConfirm}
                confirmLabel="Yes"
                cancelLabel="No"
            />
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <div className="max-w-3xl p-6 bg-white rounded-lg shadow-md flex items-start space-x-4">
                        <div className="w-24 h-24 flex-shrink-0">
                            <img
                                src={imageUrl}
                                alt={`${name}'s avatar`}
                                className="w-full h-full object-cover rounded-full border border-gray-300"
                            />
                        </div>
                        <div className="flex-1">
                            {/* Contact Info */}
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
                                <p className="text-sm text-gray-500">@{userName}</p>
                                <p className="text-sm text-gray-600 mt-1">{bio}</p>
                            </div>
                            <div className="flex space-x-3">
                                <a
                                    href={`/contacts/${contactId}/edit`}
                                    className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Edit
                                </a>
                                <button
                                    onClick={() => toggleDeleteModal(true)}
                                    className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-400"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ContactDetails;
