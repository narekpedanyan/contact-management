import {Link} from "@tanstack/react-router";
import { FC } from "react";

const contacts = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
];

const Sidebar: FC = () => {
    return (
        <aside>
            <div>
                <Link to="/contacts/new" style={{ display: 'block', marginTop: '20px' }}>
                    Create New Contact
                </Link>
            </div>
            <div>
                <div style={{width: '250px', background: '#f5f5f5', padding: '20px'}}>
                    <h2>Contacts</h2>
                    <ul>
                        {contacts.map((contact) => (
                            <li key={contact.id}>
                                <Link to={`/contacts/${contact.id}`}>{contact.name}</Link>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </aside>
    )
}

export default Sidebar;
