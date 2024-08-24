import { AiOutlinePlayCircle } from 'react-icons/ai';

const PlayButton = () => {
    return (
        <div>
            <button
                className="
                    transition
                    opacity-0
                    rounded-full
                    flex
                    items-center
                    bg-white
                    p-2
                    drop-shadow-md
                    translate
                    translate-y-1/4
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    hover:scale-110
                "
            >
                <AiOutlinePlayCircle className="text-black" />
            </button>
        </div>
    );
}

export default PlayButton;
