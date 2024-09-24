import { TitleTextColor } from "../Colors"

const HeaderTitles = ({ text, size, color = "text-transparent" }: { text: string, size?: string, color?: string }) => {
    return (
        <h1 className={`${size ? size : 'text-4xl'} font-bold ${color} bg-clip-text mt-2 bg-gradient-to-r from-[${TitleTextColor}] to-[#4d7666]`}>
            {text}
        </h1>
    )
}

export default HeaderTitles