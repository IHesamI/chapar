export default function ChatMessages(
    {
        message,
        creationTime,
        authorUsername
    }: {
        message?: string,
        creationTime?: string,
        authorUsername?: string|null,
    }) {
    const time = new Date()
    return (
        <div
            style={{ height: 'fit-content' ,width:'fit-content'}}
            className={'border border-sky-500 rounded-lg max-w-lg p-2 space-y-2 backdrop-blur-sm  bg-white/30 '}
        >
            <p className={'font-sans text-lg break-words'}>{message} </p>
            <div
                className={'flex flex-row justify-between'}>
                <p className={'font-serif text-sm'}>{authorUsername}</p>
                <p className={'font-sans text-xs px-2'}>{creationTime}</p>
            </div>



        </div>
    )

}