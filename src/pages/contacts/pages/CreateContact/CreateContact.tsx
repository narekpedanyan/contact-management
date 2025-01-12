import ContactForm from '../../components/ContactForm/ContactForm.tsx';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import {TContactFormValues} from "../../../../types";
import {ContactsService} from "../../ContactsService.ts";
import {useSidebarContext} from "../../../../context/SidebarContext.tsx";
import {toast} from "react-hot-toast";
import {errorDefaultMessage} from "../../../../utils";
import ImageUrls from "../../../../components/ImageUrls/ImageUrls.tsx";

const CreateContact = () => {
    const { triggerEvent } = useSidebarContext();

    const createNewContact = useMutation({
        mutationFn: ContactsService.CreateContact,
        onSuccess: async () => {
            triggerEvent('reFetchContacts');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.message || errorDefaultMessage);
        },
    });

    const onSubmit = (values: TContactFormValues) => {
        createNewContact.mutate({ params: values });
    }

    return (
        <div>
            <ContactForm onSubmit={onSubmit} />
            <ImageUrls />
        </div>
    )
}

export default CreateContact;
