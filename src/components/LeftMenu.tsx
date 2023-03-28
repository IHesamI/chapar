
const Menu = ({ image_src, username }: { image_src?: string, username?: string }) => {
    return (
        <div className="w-max flex flex-col" >
            <div className="image-username-div"  >
                <img className="w-20 h-20 rounded-full" src={`${image_src}`} alt="Avatar" />
                <p>{username}</p>
            </div>
            <div className="flex flex-col" >
                <div className={'chaticon'}>
                    <img className="w-10 h-10 rounded-full" src={`${image_src}`} alt="Avatar" />
                    <button>Konohagakure Group</button>
                </div>
                <div className={'chaticon'}>
                    <img className="w-10 h-10 rounded-full" src={`${image_src}`} alt="Avatar" />
                    <button
                    // className={'chaticon'}
                    >Naruto</button>
                </div>
            </div>
        </div>
    )
}
export default Menu