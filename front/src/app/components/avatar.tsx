interface IAvatarProps {
    src: string;
    alt: string;
    size: number;
    redirect?: string;
}

export default function Avatar({ src, alt, size, redirect }: IAvatarProps) {
    return (
        <div onClick = {() => redirect && (window.location.href = redirect)}>
            <img src={src} alt={alt} 
            className="rounded-full scale-100"
            style={{ width: `${size}px`, height: `${size}px`}} />
        </div>
    )
}