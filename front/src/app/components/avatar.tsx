import Image from 'next/image';

interface IAvatarProps {
    src: string;
    alt: string;
    size: number;
    redirect?: string;
}

export default function Avatar({ src, alt, size, redirect }: IAvatarProps) {
    return (
        <div onClick = {() => redirect && (window.location.href = redirect)}>
            <Image
                src={src}
                alt={alt}
                width={size}
                height={size}
                className="rounded-full "
                style={{ width: `${size}px`, height: `${size}px`}}
            />
        </div>
    )
}