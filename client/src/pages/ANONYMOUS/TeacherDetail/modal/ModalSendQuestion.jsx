import ModalCustom from "src/components/ModalCustom"
import ButtonCustom from "src/components/MyButton/ButtonCustom"

const ModalSendQuestion = ({ open, onCancel, onOk }) => {

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      title={
        <div className="d-flex">
          <img
            src={open?.AvatarPath}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              marginRight: "12px"
            }}
          />
          <div className="fw-600 fs-16">{open?.FullName}</div>
        </div>
      }
      footer={
        <div className="d-flex-end">
          <ButtonCustom
            className="third"
          >
            Đóng
          </ButtonCustom>
        </div>
      }
    >

    </ModalCustom>
  )
}

export default ModalSendQuestion