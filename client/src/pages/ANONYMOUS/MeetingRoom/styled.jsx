import styled from "styled-components"


export const MeetingRoomContainerStyled = styled.div`
  /* margin-top: 30px; */
  background-color: #e3e0e0;
  .header {
    background-color: white;
    padding: 8px 12px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .left-screen {
    padding: 20px 16px; 
    border-radius: 8px;
  }
  .video-container {
    border-radius: 12px;
    width: 100%;
    height: 72vh;
  }
  .controller {
    background-color: white;
    padding: 20px 16px;
    border-radius: 8px;
    margin-top: 12px;
  }
  .right-screen {
    /* background-color: #dcdada; */
    height: 77vh;
    padding: 20px 16px 0px 0px;
  }
  .input-message {
    background-color: white;
    padding: 19px 16px;
    border-radius: 8px;
  }
`