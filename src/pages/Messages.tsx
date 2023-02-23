export default function ChatMessages(
    {
        message,
        creationTime,
        authorUsername
    }: {
        message?: string,
        creationTime?: string,
        authorUsername?: string,
    }) {
    const time = new Date()
    return (
        <div
            style={{ height: 'fit-content' }}
            className={'border border-sky-500 rounded-lg max-w-lg p-2 space-y-2'}
        >
            <p className={'font-sans text-lg'}>{message} </p>
            <div
                className={'flex flex-row justify-between'}>
                <p className={'font-serif text-sm'}>{authorUsername}</p>
                <p className={'font-sans text-xs px-2'}>{creationTime}</p>
            </div>



        </div>
    )

}