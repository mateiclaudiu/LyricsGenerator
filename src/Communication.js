import React, { useState, useEffect } from 'react';
import './App.css';

const Communication = () => {
    const [lyrics, setLyrics] = useState('');
    const [messages, setMessages] = useState([]);

    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        setTimeout(() => {
            setMessages((prevMessages) => prevMessages.filter((msg) => msg !== message));
        }, 60000);
    };

    const handleLyricsChange = (event) => {
        setLyrics(event.target.value);
    };

    // Simuleert commando-acties en toont berichten op het scherm
    const handleCommand = (command) => {
        console.log(command);
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        addMessage(`${hours}:${minutes} - ${command}`);
    };

    return (
        <div className="app">
            <div className="music-controls">
                <button onClick={() => handleCommand('Verlaag toon')}>Toon Lager</button>
                <button onClick={() => handleCommand('Verhoog toon')}>Toon Hoger</button>
                <button onClick={() => handleCommand('Tempo hoger')}>Tempo Hoger</button>
                <button onClick={() => handleCommand('Tempo lager')}>Tempo Lager</button>
                <button onClick={() => handleCommand('Ik hoor mezelf niet')}>Ik Hoor Mezelf Niet</button>
            </div>

            <div className="lyrics-container">
        <textarea
            value={lyrics}
            onChange={handleLyricsChange}
            placeholder="Schrijf hier de lyrics..."
        />
            </div>

            <div className="camera-controls">
                <button onClick={() => handleCommand('Zoom in')}>Zoom In</button>
                <button onClick={() => handleCommand('Zoom uit')}>Zoom Uit</button>
            </div>

            <div className="stage-controls">
                <button onClick={() => handleCommand('Assistentie nodig')}>Assistentie Nodig</button>
            </div>

            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className="message">{message}</div>
                ))}
            </div>
        </div>
    );
};

export default Communication;
