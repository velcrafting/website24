import React, { useEffect, useRef } from 'react';

const TwitchEmbed = ({ channel }) => {
  const embedRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('src', 'https://embed.twitch.tv/embed/v1.js');
    script.addEventListener('load', () => {
      new window.Twitch.Embed(embedRef.current, {
        width: '100%',
        height: '100%',
        channel,
      });
    });
    embedRef.current.appendChild(script);
  }, [channel]);

  return <div ref={embedRef} style={{ width: '100%', height: '100%' }} />;
};

export default TwitchEmbed;
