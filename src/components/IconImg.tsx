interface IProps {
  src: string;
  className?: string;
}

const IconImg = ({ src, className = "w-4 h-4" }: IProps) => {
  return <img src={src} className={className} />;
};

export default IconImg;
