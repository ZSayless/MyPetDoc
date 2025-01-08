import { Link } from "react-router-dom";

const ButtonLink = ({ text, link, onClick }) => {
  return (
    <Link
      to={link}
      onClick={onClick}
      className="flex h-full items-center xl:text-[16px] md:text-[12px] font-medium uppercase text-[#fff]"
    >
      {text}
    </Link>
  );
};

export default ButtonLink;
