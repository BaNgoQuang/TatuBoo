import {
  BsCheck,
  BsFileMusicFill,
  BsFillTrash3Fill
} from "react-icons/bs"

import {
  SearchOutlined,
  LoadingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'

import {
  AiFillEdit,
  AiOutlineBarChart,
  AiOutlineCamera,
  AiOutlineWarning
} from "react-icons/ai"

import {
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
  FaUserGraduate
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
  ICON_EDIt: <AiFillEdit className="green-text fs-18" />,
  ICON_STATISTIC: <AiOutlineBarChart className="fs-18" />,
  ICON_MUSIC: <BsFileMusicFill className="fs-18" />,
  ICON_LANGUAGE: <FaLanguage className="fs-18" />,
  ICON_PAYMENT: <FaMoneyCheckAlt className="fs-18" />,
  ICON_TEACHER: <FaChalkboardTeacher className="fs-18" />,
  ICON_STAFF: <FaUserCog className="fs-18" />,
  ICON_STUDENT: <FaUserGraduate className="fs-18" />,
  ICON_REPORT: <MdReportProblem className="fs-18" />,
  ICON_SUBJECT_CATE: <ImBooks className="fs-18" />,
  ICON_CAMERA: <AiOutlineCamera className="fs-18" />,
  ICON_DELETE: <BsFillTrash3Fill className="red-text fs-18" />,
  ICON_WARNING: <AiOutlineWarning className="red-text" />
}

export default ListIcons
