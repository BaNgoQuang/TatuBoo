import {
  BsCheck,
  BsFileMusicFill,
  BsTrash2
} from "react-icons/bs"

import {
  SearchOutlined,
  LoadingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'

import {
  AiFillEdit,
  AiOutlineArrowRight,
  AiOutlineBarChart,
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlineUnorderedList,
} from "react-icons/ai"

import {
  BiErrorAlt,
  BiLogIn,
} from "react-icons/bi"

import {
  TbLock,
  TbLockOpen,
} from "react-icons/tb"

import {
  FaLanguage,
  FaMoneyCheckAlt,
  FaChalkboardTeacher,
  FaUserCog,
  FaUserGraduate,
  FaRegFile
} from "react-icons/fa"

import { MdReportProblem } from "react-icons/md"

import { ImBooks } from "react-icons/im"

const ListIcons = {
  ICON_SEARCH: <SearchOutlined className="blue-text fs-20" />,
  ICON_LOADING: <LoadingOutlined
    style={{
      color: "#0078d4"
    }}
    spin
  />,
  ICON_MENUFOLD: <MenuFoldOutlined />,
  ICON_MENUUNFOLD: <MenuUnfoldOutlined />,
  ICON_LOGOUT: <BiLogIn className="fs-20" />,
  ICON_BLOCK: <TbLock className="fs-18" />,
  ICON_UNBLOCK: <TbLockOpen className="fs-18" />,
  ICON_CHECK: <BsCheck className="fw-800" />,
  ICON_EDIT: <AiFillEdit className="text-green fs-18" />,
  ICON_STATISTIC: <AiOutlineBarChart className="fs-18" />,
  ICON_MUSIC: <BsFileMusicFill className="fs-18" />,
  ICON_LANGUAGE: <FaLanguage className="fs-18" />,
  ICON_PAYMENT: <FaMoneyCheckAlt className="fs-18" />,
  ICON_TEACHER: <FaChalkboardTeacher className="fs-18" />,
  ICON_STAFF: <FaUserCog className="fs-18" />,
  ICON_STUDENT: <FaUserGraduate className="fs-18" />,
  ICON_REPORT: <MdReportProblem className="fs-18" />,
  ICON_SUBJECT_CATE: <ImBooks className="fs-18" />,
  ICON_DELETE: <AiOutlineDelete className="fs-18" />,
  ICON_TRASH:
    <BsTrash2
      style={{
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        height: "80px",
        width: "80px",
        color: '#ed5151'
      }}
    />,
  ICON_FILE_DELETE: <FaRegFile className="fs-18" />,
  ICON_ERROR: <BiErrorAlt className="fs-18" />,
  ICON_SUSCESS: <AiOutlineCheckCircle className="fs-18" />,
  ICON_LIST: <AiOutlineUnorderedList className="fs-18" />,
  ICON_NEXT: <AiOutlineArrowRight className="fs-18" />,

}

export default ListIcons
