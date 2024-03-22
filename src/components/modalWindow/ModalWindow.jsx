import './modalWindow.scss';

const ModalWindow = ({active, setActive, children, position}) => {
    const modalClassName = active ? `modalWindow active` : `modalWindow`;
    const contentClassName = active ? `modalWindowContent active ${position}` : "modalWindowContent";
    return (
        <div className={modalClassName} onClick={()=> setActive(false)}>
            <div className={contentClassName} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}


export default ModalWindow;