import { TitleTextColor } from "../Colors"

const DefTitles = ({ text, size }: { text: string | null, size?: string }) => {
    return (
        <h1 className={`${size ? size : 'text-xl'}   font-bold text-transparent bg-clip-text bg-gradient-to-r from-[${TitleTextColor}] to-[#4d7666]`}>
            {text ? text :''}
        </h1>
    )
}

export default DefTitles;