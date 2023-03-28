import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react'
import ChatMessages from './Messages';
import { useEffect, useReducer, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import Login from '@/components/Login';
import Menu from '@/components/LeftMenu';
import Chat from '@/components/chatComponent';

let socket: Socket;
type Message = { message: string, username?: string, createtime?: string }
type Action = { type: string, message: Message }
type State = Message[]


export const getServerSideProps: GetServerSideProps = async (context) => {

  const userinfo = await getSession(context).then((session) => session?.user)
  if (userinfo) {
    console.log(userinfo)
    const user = userinfo.name
    const image = userinfo.image
    return {
      props: { username: user, image_src: image }
    }

  }
  else return {
    props: {}
  }

}


export default function Home({ username, image_src }: { username?: string, image_src?: string }) {
  if (username) {
    return (
      <div className='flex'>
        <Menu image_src={image_src} username={username} />
        <Chat username={''} />
      </div>
    )
  }

  return (<>
    <Login />
  </>)
}
