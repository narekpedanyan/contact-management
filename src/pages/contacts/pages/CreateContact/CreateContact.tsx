import ContactForm from '../../components/ContactForm/ContactForm.tsx';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import {TContactFormValues} from "../../../../types";
import {ContactsService} from "../../ContactsService.ts";
import {useSidebarContext} from "../../../../context/SidebarContext.tsx";

const CreateContact = () => {
    const { triggerEvent } = useSidebarContext();

    const createNewContact = useMutation({
        mutationFn: ContactsService.CreateContact,
        onSuccess: async () => {
            triggerEvent('reFetchContacts');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            console.log(error, 'error');
        },
    });

    const onSubmit = (values: TContactFormValues) => {
        createNewContact.mutate({ params: values });
    }

    return (
        <div>
            <ContactForm onSubmit={onSubmit} />
        </div>
    )
}

export default CreateContact;
