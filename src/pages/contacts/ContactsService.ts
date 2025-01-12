import {requests} from "../../service/HttpService.ts";
import {TContactFormValues} from "../../types";

const FetchContacts = () => requests.get(`/contacts`);

const FetchContactDetails = ({ id }: { id: string }) => requests.get(`/contacts/${id}`);

const CreateContact = ({ params }: { params: TContactFormValues; }) =>
    requests.post(
        `/contacts`,
        params,
    );

const UpdateContact = ({ params, id }: { params: TContactFormValues; id: string }) =>
    requests.patch(
        `/contacts/${id}`,
        params,
    );

const DeleteContact = ({ id }: { id: string }) => requests.delete(`/contacts/${id}`);

export const ContactsService = {
    FetchContacts,
    CreateContact,
    FetchContactDetails,
    UpdateContact,
    DeleteContact,
}