import {useRef, useState, ChangeEvent} from "react";

const useThrottleInputChange = () => {
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState('');
    const [isTyping, setTyping] = useState(false);
    const timeoutIdRef = useRef<null | number>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const eventTargetValue = e.target.value;
        setInputValue(eventTargetValue);
        if (!isTyping) {
            setTyping(true);
        }
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }

        timeoutIdRef.current = setTimeout(() => {
            setValue(eventTargetValue);
            setTyping(false);
        }, 500) as unknown as number;
    };
    const clearValue = () => {
        setInputValue('');
        setValue('');
    }
    return {
        value,
        inputValue,
        onChange,
        clearValue,
        isTyping,
    }
}

export default useThrottleInputChange;
