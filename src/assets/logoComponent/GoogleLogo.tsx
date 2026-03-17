import Image from 'next/image';
import Google from "@/assets/images/google.png";

const GoogleLogo = () => {
    return (
        <Image
            src={Google}
            alt="Google Logo"
            width={16}
            height={16}
        />
    );
};

export default GoogleLogo;