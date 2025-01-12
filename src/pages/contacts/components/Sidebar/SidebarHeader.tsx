import { FC, ChangeEvent } from 'react';
import {Link} from "@tanstack/react-router";

interface TSidebarHeaderProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    clearValue: () => void;
    inputValue: string;
}
const SidebarHeader: FC<TSidebarHeaderProps> = ({ onChange, clearValue, inputValue }) => {
    return (
        <div className="flex items-center p-4 border-b">
            <div className="flex-1 pr-4">
                <input
                    value={inputValue}
                    placeholder="Search by user name"
                    type="text"
                    className="w-full p-1 rounded flex-1 text-base placeholder-gray-600 placeholder:text-sm"
                    onChange={onChange}
                />
            </div>
            <div>
                <Link
                    onClick={clearValue}
                    to="/contacts/new"
                    className="bg-white p-2 rounded text-blue-500"
                >
                    New
                </Link>
            </div>
        </div>
    )
}

export default SidebarHeader;
