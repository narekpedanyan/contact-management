const Loading = () => {
    return (
        <div>
            <div className="flex justify-center items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-400"></div>
            </div>
        </div>
    )
}

export default Loading;
