
import { useSession, signIn, signOut } from 'next-auth/react'
import ChatMessages from './Messages';
import { useReducer, useRef } from 'react';

type Message = { message: string, username: string, createtime?: string }
type Action = { type: string, message: Message }
type State = Message[]
function reducer(state: State, action: Action): State {
  // console.log(action.type)
  // console.log(action.message)
  // console.log("state: ", state)
  switch (action.type) {
    case 'add':
      const date = new Date()
      let time = date.getHours() + ":" + date.getMinutes()
      return [...state, { message: action.message.message, username: action.message.username, createtime: time }]
    default:
      return state
  }

}
export default function Home({ messages }: { messages: Message }) {
  const inputvalue = useRef<HTMLInputElement>(null);
  const formref = useRef<HTMLFormElement>(null);
  const { data: session } = useSession();
  const username = session?.user?.name;
  const [themessages, dispatch] = useReducer(reducer, [])
  const handleAdd = () => {
    if (inputvalue.current?.value) {
      // console.log(inputvalue.current?.value)
      dispatch({ type: 'add', message: { message: inputvalue.current.value, username: username } });
      formref.current?.reset();
    }
  }
  if (session) {
    return (
      <div>
        <div
          style={{ height: '650px' }}
          className={'pt-2 space-y-1 grid justify-center'}>
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
              className={'text-center justify-center pt-2 gap-2 space-x-1'}>
              <input
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
