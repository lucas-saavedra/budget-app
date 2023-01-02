import { BsPiggyBank, BsWallet2, BsBank, BsCreditCard, BsCoin, BsCash } from "react-icons/bs";
const AccountIcon = ({ children, type, color = 'white', fontSize = 100 }) => {

    const iconType = (type, fontSize, color, className = '') => {
        switch (type) {
            case 'cash':
                return <BsWallet2 className={className} fontSize={fontSize} color={color} />;
            case 'bank_account':
                return <BsBank className={className} fontSize={fontSize} color={color} />;
            case 'savings':
                return <BsPiggyBank className={className} fontSize={fontSize} color={color} />;
            case 'credit_card':
                return <BsCreditCard className={className} fontSize={fontSize} color={color} />;
            case 'e-wallet':
                return <BsCoin className={className} fontSize={fontSize} color={color} />;
            default:
                return <BsCash className={className} fontSize={fontSize} color={color} />
        }
    }

    return (
        <div className="d-flex align-content-center justify-content-center bg-light" >
            <div className="p-1">
                {iconType(type, fontSize, color)}
            </div>
            {children}
        </div>
    )
}
export default AccountIcon