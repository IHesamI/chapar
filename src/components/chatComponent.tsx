import ChatMessages from "@/pages/Messages"
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react'
import { useEffect, useReducer, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
let socket: Socket;
type Message = { message: string, username?: string | null, createtime?: string }
type Action = { type: string, message: Message }
type State = Message[]


function reducer(state: State, action: Action): State {

    switch (action.type) {
        case 'add':
            const date = new Date()
            let time = date.getHours() + ":" + date.getMinutes()
            return [...state, { message: action.message.message, username: action.message.username, createtime: time }]
        default:
            return state
    }

}
const Chat = ({ username, user }: { username?: string, user: string | null }) => {
    // console.log(username)
    const inputvalue = useRef<HTMLInputElement>(null);
    const formref = useRef<HTMLFormElement>(null);
    const [themessages, dispatch] = useReducer(reducer, [])
    const handleEnter = (e: React.KeyboardEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd()
        }
    }
    useEffect(() => {
        // console.log(user)
        const getmessage = () => {
            const body = JSON.stringify({
                'username': username,
                'user': user
            })

            const req: RequestInit = {
                method:'POST',
                body:body

            }
            fetch('api/getmessages', req
            ).then((response) => response.json())
                .then(res => console.log(res))
        }
        getmessage()
        // console.log(username)

    }, [user])

    const handleAdd = () => {
        if (inputvalue.current?.value) {
            socket.emit('message', JSON.stringify({ message: inputvalue.current?.value, username: username }))
            dispatch({ type: 'add', message: { message: inputvalue.current?.value, username: username } });
            formref.current?.reset();

        }
    }

    return (
        <div
            className='bg-cover'
            style={{ backgroundImage: `url(Wall.jpg)` }}>
            <div
                style={{ height: '650px', alignContent: 'baseline' }}
                className={'pt-2 space-y-1 grid justify-center gap-2 overflow-y-auto'}>
                {
                    themessages.map((themessage, index) => (
                        <ChatMessages
                            key={index}
                            authorUsername={themessage.username}
                            creationTime={themessage.createtime}
                            message={themessage.message}
                        />
                    ))
                }

            </div>
            <div className={'flex justify-center'}>
                <div>

                    <form ref={formref}
                        onKeyDown={(e) => handleEnter(e)}
                        className={'text-center justify-center pt-2 gap-2 space-x-1'}>
                        <input
                            onKeyDown={(e) => handleEnter(e)}
                            ref={inputvalue}
                            type={'text'}
                            placeholder={'...'}
                            className={"justify-center border border-black rounded-lg px-1"}
                        />
                        <button
                            onClick={handleAdd}
                            type={'button'}
                            className={'inline-block rounded text-white bg-blue-600 hover:bg-blue-500 px-3 pt-2 pb-2 text-xs font-medium uppercase focus:ring-4 focus:outline-none'}
                        >
                            send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Chat