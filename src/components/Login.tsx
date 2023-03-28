import { signIn } from "next-auth/react"
const Login = () => {
    return (
        <div
            className="justify-center text-center align-middle flex flex-wrap ">
            <div
                className="pt-[20%]">
                <h1
                    className="text-4xl font-serif">
                    Welcome To {' '}
                    <span style={{color:"blue"}}>
                        Chapar
                    </span>
                </h1>
                <h2>
                    Socket Based Chat Application
                </h2>
                <br />
                <br />

                <button
                className="bg-slate-500 p-3 rounded-md text-white"
                    onClick={() => signIn()}>
                    Sign In
                </button>

            </div>
        </div>)

}

export default Login