interface AvatarProps {
    src: string;
    alt: string;
    size: 'sm' | 'md' | 'lg';
    }

const Avatar = ({ src, alt, size }: AvatarProps) => {
  return (
    <img 
      src={src}
      alt={alt}
      className={`avatar avatar-${size}`}
    />
  );
};

export default Avatar;