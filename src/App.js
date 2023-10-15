import React, { useState } from 'react';
import './App.css';
import PowerPointExport from "./PowerpointExport";
import Footer from "./Footer";

function App() {
    const [text, setText] = useState('');
    const [presentationWindow, setPresentationWindow] = useState(null);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleStartPresentation = () => {
        // Split the text into slides, each separated by a double newline
        const slides = text.split('\n\n').map((slideText, index) => ({
            id: index,
            content: slideText.split('\n').join('<br/>')  // Convert newlines to <br> for HTML rendering
        }));

        // Open a new tab for the presentation
        const newWindow = window.open();
        setPresentationWindow(newWindow);

        // Set up the initial HTML for the presentation
        newWindow.document.open();
        newWindow.document.write(`
      <html>
        <head><title>Presentation</title></head>
        <body style="background-color: black; color: white; font-size: 4.3vw; text-align: center;">
          <div id="presentation" style="padding: 50px;"></div>
          <script>
            // Inline script to handle messages from the control tab
            let currentSlideIndex = 0;
            window.addEventListener('message', (event) => {
              if (event.data.type === 'goToSlide') {
                const slide = window.slides[event.data.index];
                document.getElementById('presentation').innerHTML = slide.content;
                currentSlideIndex = event.data.index; // Save the current slide index
              } else if (event.data.type === 'changeSlide') {
                if (event.data.direction === 'next' && currentSlideIndex < window.slides.length - 1) {
                  currentSlideIndex++;
                } else if (event.data.direction === 'prev' && currentSlideIndex > 0) {
                  currentSlideIndex--;
                }
                document.getElementById('presentation').innerHTML = window.slides[currentSlideIndex].content;
              }
            });
          </script>
        </body>
      </html>
    `);
        newWindow.document.close();

        // Pass the slides to the new tab
        newWindow.slides = slides;

        // Trigger the initial display of the first slide
        newWindow.postMessage({ type: 'goToSlide', index: 0 }, '*');
    };

    const handleNextSlide = () => {
        if (presentationWindow) {
            presentationWindow.postMessage({ type: 'changeSlide', direction: 'next' }, '*');
        }
    };

    const handlePrevSlide = () => {
        if (presentationWindow) {
            presentationWindow.postMessage({ type: 'changeSlide', direction: 'prev' }, '*');
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Biserica Elim Antwerpen</h1>
                <h2>Generator de Versuri</h2>
                <textarea
                    value={text}
                    onChange={handleChange}
                    placeholder="Paste your lyrics here"
                    rows="10"
                    style={{ width: '80%', marginBottom: '20px' }}
                />
                <button onClick={handleStartPresentation}>Start Presentation</button>
                <br/>
                <button onClick={handlePrevSlide}>Previous</button>
                <button onClick={handleNextSlide}>Next</button>
                <br/>
                <PowerPointExport text={text} /> {/* Here we are passing the raw text */}
            </header>
            <Footer/>
        </div>
    );
}

export default App;
