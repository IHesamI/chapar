import { GetServerSideProps } from 'next';
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import ChatMessages from './Messages';
import { useEffect, useReducer, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import Wall from 'public/Wall.jpg';
let socket: Socket;
type Message = { message: string, username?: string, createtime?: string }
type Action = { type: string, message: Message }
type State = Message[]


export const getServerSideProps: GetServerSideProps = async (context) => {
  const userinfo = await getSession(context).then((session) => session?.user)
  if (userinfo) {
    const user = userinfo.name
    return {
      props: { username: user }
    }

  }
  else return {
    props: {}
  }
}


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
// export default function Home({ messages }: { messages: Message }) {
export default function Home({ username }: { username?: string }) {
  const inputvalue = useRef<HTMLInputElement>(null);
  const formref = useRef<HTMLFormElement>(null);
  const [themessages, dispatch] = useReducer(reducer, [])
  const handleEnter = (e: React.KeyboardEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd()
    }
  }
  const handleAdd = () => {
    if (inputvalue.current?.value) {
      socket.emit('message', JSON.stringify({ message: inputvalue.current?.value, username: username }))
      dispatch({ type: 'add', message: { message: inputvalue.current?.value, username: username } });
      formref.current?.reset();

    }
  }

  if (username) {
    useEffect(() => {
      const socketinitalizer = async () => {
        await fetch('/api/socket')
        socket = io();
        socket.on('connect', () => {
          // console.log('connected',)
        })
        socket.on('update-message', (msg) => {
          dispatch({ type: 'add', message: JSON.parse((msg)) })
        })
      }
      socketinitalizer()
    }, [])


    return (
      <div
      className='bg-cover'
        style={{ backgroundImage: `url(Wall.jpg)` }}>
        <div

          style={{ height: '650px', alignContent: 'baseline' }}
          className={'pt-2 space-y-1 grid justify-center gap-2'}>
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

        <div className={'flex justify-center'}
        // style={{ backgroundImage: '/Wall.jpg' }}

        >
          {/* Signed in as {session.user?.name}<br />
        <button
          onClick={() => signOut()}
        >
          Sign out
        </button> */}

          <div
          >
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

  return (<>
    Not signed in<br />
    <button
      onClick={() => signIn()}
    >Sign in</button>
  </>)
}
