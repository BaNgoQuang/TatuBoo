import styled from "styled-components"


export const MeetingRoomContainerStyled = styled.div`
  /* margin-top: 30px; */
  background-color: #e3e0e0;
  .header {
    background-color: white;
    padding: 8px 12px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom: 1px solid var(--color-border-matte);
  }
  .left-screen {
    padding: 20px 16px; 
    border-radius: 8px;
  }
  .video-container {
    position: relative;
    border-radius: 12px;
    width: 100%;
    height: 72vh;
    margin-bottom: 4px;
  }
  .player-wrapper {
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
    padding: 19px 16px;
    /* padding-top: 56.25%; Player ratio: 100 / (1280 / 720) */
  }
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
    /* right: 0;
    bottom: 0; */
    width: 100% !important;
    height: 100% !important;
  }
  video {
    height: auto !important;
  }
  .controller {
    background-color: white;
    padding: 19px 16px;
    border-radius: 8px;
    margin-top: 12px;
  }
  .right-screen {
    /* background-color: white; */
    height: 77vh;
    padding: 20px 16px 0px 0px;
  }
  .input-message {
    background-color: white;
    padding: 19px 16px;
    border-radius: 8px;
  }
  .avatar-wrapper {
    background-color: var(--color-border-matte);
  }
`