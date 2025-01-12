const Loading = () => {
    return (
        <div className="flex items-center justify-center p-8 pt-24">
            <div className="flex justify-center items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200" />
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-400" />
            </div>
        </div>
    )
}

export default Loading;
