import { ProfileCard } from "../../styled"


const CourseProfile = ({ title, description, imageUrl }) => {

  return (
    <ProfileCard title={title} cover={<img alt="Profile" src={imageUrl} />}>
      <p>{description}</p>
    </ProfileCard>
  )
}
export default CourseProfile