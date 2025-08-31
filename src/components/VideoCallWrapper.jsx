import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AGORA_APP_ID } from '../store/constant';
import AgoraRTC, {
  AgoraRTCProvider,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  useRemoteUsers, 
  LocalVideoTrack,
  RemoteUser,  
} from 'agora-rtc-react';
import axios from 'axios';

const appId = AGORA_APP_ID; 
const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

const VideoCall = () => {
  const { channelName } = useParams();
  const [isInCall, setIsInCall] = useState(false);
  
  const { ready: micReady, localMicrophoneTrack } = useLocalMicrophoneTrack();
  const { ready: cameraReady, localCameraTrack } = useLocalCameraTrack();
  

  const remoteUsers = useRemoteUsers();

  const handleJoinCall = async () => {
    try {
      const response = await axios.post('http://localhost:7777/api/v1/users/agora/token', { channelName }, { withCredentials: true });
      const { token } = response.data;
      await client.join(appId, channelName, token, 0);

      const tracksToPublish = [];
      if (micReady) tracksToPublish.push(localMicrophoneTrack);
      if (cameraReady) tracksToPublish.push(localCameraTrack);
      if (tracksToPublish.length > 0) {
        await client.publish(tracksToPublish);
      }
      
      setIsInCall(true);
      
    } catch (error) {
      console.error("Failed to join the call:", error);
    }
  };
  
  const handleLeaveCall = async () => {
    await client.leave();
    setIsInCall(false);
  };

  return (
    <div className="w-full h-screen bg-gray-900 rounded-lg p-4 flex flex-col relative">
      {!isInCall ? (
        <div className="flex flex-col items-center justify-center h-full">
           <p className="text-white text-2xl mb-6">Ready to join the call?</p>
           <button onClick={handleJoinCall} className="btn btn-primary btn-lg bg-cyan-500 border-none">
             Join Call
           </button>
        </div>
      ) : (
        <>
      
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
   
            {remoteUsers.length > 0 ? (
              remoteUsers.map(user => (
                <div key={user.uid} className="bg-black rounded-lg overflow-hidden">
                  <RemoteUser user={user} playVideo={true} playAudio={true} />
                </div>
              ))
            ) : (
              <div className="bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Waiting for your partner to join...</p>
              </div>
            )}
          </div>
          
        
          <div className="absolute bottom-6 right-6 w-48 h-32 md:w-64 md:h-48 bg-black rounded-lg overflow-hidden border-2 border-cyan-500">
            <p className="text-white text-xs absolute top-1 left-2 z-10">You</p>
            <LocalVideoTrack track={localCameraTrack} play={true} style={{ width: '100%', height: '100%' }} />
          </div>

          {/* Leave Call Button */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <button onClick={handleLeaveCall} className="btn btn-error rounded-full w-16 h-16">
              End
            </button>
          </div>
        </>
      )}
    </div>
  );
};


// Wrapper remains the same
const VideoCallWrapper = () => (
  <AgoraRTCProvider client={client} appId={appId}>
    <VideoCall />
  </AgoraRTCProvider>
);

export default VideoCallWrapper;