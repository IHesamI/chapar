
const Menu = ({ image_src, username ,setuser}: { image_src?: string, username?: string, setuser?:any }) => {
    return (
        <div className="w-max flex flex-col" >
            <div className="image-username-div"  >
                <img className="w-20 h-20 rounded-full" src={`${image_src}`} alt="Avatar" />
                <p>{username}</p>
            </div>
            <div className="flex flex-col" >
                <div className={'chaticon'}>
                    <img className="w-10 h-10 rounded-full" src={`${image_src}`} alt="Avatar" />
                    <button
                    onClick={()=>{setuser('Konohagakure Group')}}>Konohagakure Group</button>
                </div>
                <div className={'chaticon'}>
                    <img className="w-10 h-10 rounded-full" src={`${image_src}`} alt="Avatar" />
                    <button onClick={()=>{setuser('Naruto')}}>Naruto</button>
                </div>
            </div>
        </div>
    )
}
export default Menu