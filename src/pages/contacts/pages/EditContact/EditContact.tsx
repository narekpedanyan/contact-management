import {useMatch} from "@tanstack/react-router";
import {useMutation, useQuery} from "@tanstack/react-query";
import {TContact, TContactFormValues} from "../../../../types";
import {ContactsService} from "../../ContactsService.ts";
import ContactForm from "../../components/ContactForm/ContactForm.tsx";
import Loading from "../../../../components/Loading/Loading.tsx";
import {AxiosError} from "axios";
import {useSidebarContext} from "../../../../context/SidebarContext.tsx";

const EditContact = () => {
    const { triggerEvent } = useSidebarContext();
    const match = useMatch({ from: '/contacts/$contactId/edit' });
    const { contactId } = match.params;

    const { data: contactDetails, isLoading, refetch } = useQuery<TContact>({
        queryKey: ['contact-details', contactId],
        queryFn: () => ContactsService.FetchContactDetails({ id: contactId }),
        gcTime: 0,
    });

    const updateContact = useMutation({
        mutationFn: ContactsService.UpdateContact,
        onSuccess: async () => {
            triggerEvent('reFetchContacts');
            void refetch();
        },
        onError: (error: AxiosError<{ message: string }>) => {
            console.log(error, 'error');
        },
    });

    const onSubmit = (values: TContactFormValues) => {
        updateContact.mutate({ params: values, id: contactId });
    }
    const { id, ...initialValues } = contactDetails || {};
    return (
        <div>
            {
                isLoading ? (
                    <Loading/>
                ) : (
                    <ContactForm
                        onSubmit={onSubmit}
                        initialValues={initialValues as TContactFormValues}
                    />
                )
            }
        </div>
    )
}

export default EditContact;
