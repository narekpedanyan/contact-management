import React from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from "zod";
import {TContactFormValues} from "../../../../types";
import FieldInfo from "../FieldInfo/FieldInfo.tsx";

type TFieldName = 'name' | 'userName' | 'bio' | 'imageUrl';

type TConfigItem = {
    fieldName: TFieldName;
    label: string;
    placeholder: string;
}
const fieldsConfig: TConfigItem[] = [
    { fieldName: 'name', label: 'Name', placeholder: 'Enter name' },
    { fieldName: 'userName', label: 'Username', placeholder: 'Enter username' },
    { fieldName: 'bio', label: 'Bio', placeholder: 'Enter bio information' },
    { fieldName: 'imageUrl', label: 'Image url', placeholder: 'Enter image url' },
];

const contactSchema = z.object({
    name: z.string().nonempty("Name is required"),
    userName: z.string().nonempty("Username is required"),
    bio: z.string().optional(),
    imageUrl: z.string().url("Invalid URL").optional(),
});

interface FormProps {
    initialValues?: TContactFormValues;
    onSubmit: (values: TContactFormValues) => void;
}

const ContactForm: React.FC<FormProps> = ({ initialValues, onSubmit }) => {
    const form = useForm({
        defaultValues: initialValues || {
            name: "",
            userName: "",
            bio: "",
            imageUrl: "",
        },
        onSubmit: async ({ value }: { value: TContactFormValues }) => {
            onSubmit(value);
            form.reset();
        },
        validatorAdapter: zodValidator(),
        validators: {
            onChange: contactSchema,
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="max-w-md mx-auto space-y-4 p-4 border border-gray-200 rounded-lg shadow-sm"
        >
            {
                fieldsConfig.map((item: TConfigItem) => {
                    const { fieldName, label, placeholder } = item;
                    return (
                        <div key={fieldName}>
                            <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700">{`${label}:`}</label>
                            <form.Field
                                name={fieldName}
                                children={(field) => {
                                    const isError = false;
                                    return (
                                        <>
                                            <input
                                                className={`mt-1 block w-full p-2 border rounded ${
                                                    isError
                                                        ? "border-red-500 focus:ring-red-500"
                                                        : "border-gray-300 focus:ring-indigo-500"
                                                }`}
                                                placeholder={placeholder}
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                            <FieldInfo field={field}/>
                                        </>
                                    )
                                }}
                            />
                        </div>
                    )
                })
            }
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
                Submit
            </button>
        </form>
    );
};

export default ContactForm;
