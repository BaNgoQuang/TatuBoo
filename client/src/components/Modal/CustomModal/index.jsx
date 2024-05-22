import { CustomStyledModal } from "./styled";


const CustomModal = ({ footer = null, ...props }) => {
  return (
    <CustomStyledModal footer={footer} {...props}>
      {props.children}
    </CustomStyledModal>
  );
};

export default CustomModal;