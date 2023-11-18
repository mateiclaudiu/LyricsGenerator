import React, { useState } from 'react';
import './App.css';
import PowerPointExport from "./PowerpointExport";
import Footer from "./Footer";
import Communication from "./Communication";

function App() {
    const [text, setText] = useState('');
    const [presentationWindow, setPresentationWindow] = useState(null);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleStartPresentation = () => {
        const slides = text.split('\n\n').map((slideText, index) => ({
            id: index,
            content: slideText.replace(/\n/g, '<br/>') // Convert newlines to <br> for HTML rendering
        }));

        const newWindow = window.open('', '_blank');
        setPresentationWindow(newWindow);

        // Set up the initial HTML for the presentation
        newWindow.document.write(`
            <html>
                <head><title>Presentation</title></head>
                <body style="background-color: black; color: white; text-align: center; margin: 0; overflow: hidden;">
                    <div id="presentation" style="display: flex; align-items: center; justify-content: center; height: 100vh;"></div>
                </body>
            </html>
        `);
        newWindow.document.close();

        // Pass the slides to the new window
        newWindow.slides = slides;
        newWindow.currentSlideIndex = 0;

        // Function to display the current slide
        newWindow.showSlide = function (index) {
            const slide = newWindow.slides[index];
            const presentationDiv = newWindow.document.getElementById('presentation');
            presentationDiv.innerHTML = slide.content;
            newWindow.currentSlideIndex = index;
            newWindow.resizeTextToFit();
        };

        // Resize function to fit text on the screen
        newWindow.resizeTextToFit = function () {
            const presentationDiv = newWindow.document.getElementById('presentation');
            let fontSize = 300; // Start with a large font size
            presentationDiv.style.fontSize = `${fontSize}px`;

            // Reduce the font size if the content overflows the viewport height
            while (fontSize > 0 && (presentationDiv.scrollHeight > newWindow.innerHeight || presentationDiv.scrollWidth > newWindow.innerWidth)) {
                fontSize--;
                presentationDiv.style.fontSize = `${fontSize}px`;
            }
        };

        // Add an event listener for resizing
        newWindow.onresize = newWindow.resizeTextToFit;

        // Initial call to display the first slide and resize text
        newWindow.showSlide(newWindow.currentSlideIndex);
        newWindow.resizeTextToFit();
    };

    const handleNextSlide = () => {
        if (presentationWindow && presentationWindow.currentSlideIndex < presentationWindow.slides.length - 1) {
            presentationWindow.showSlide(presentationWindow.currentSlideIndex + 1);
        }
    };

    const handlePrevSlide = () => {
        if (presentationWindow && presentationWindow.currentSlideIndex > 0) {
            presentationWindow.showSlide(presentationWindow.currentSlideIndex - 1);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Biserica Elim Antwerpen</h1>
                <h2>Presentations Generator</h2>
                <div style={{ fontSize: '12pt', fontFamily: 'monospace' }}>
                    <p>Paragraph break = new slide.</p>
                    <p>Enjoy and God bless you.</p>
                </div>
                <textarea
                    value={text}
                    onChange={handleChange}
                    placeholder="Paste your lyrics here"
                    rows="10"
                    style={{ width: '80%', marginBottom: '20px' }}
                />
                <button disabled={!text} onClick={handleStartPresentation}>Start Presentation</button>
                <br />
                <button disabled={!text} onClick={handlePrevSlide}>Previous</button>
                <button disabled={!text} onClick={handleNextSlide}>Next</button>
                <br />
                <PowerPointExport text={text} />
            </header>
            <Footer />
        </div>
    );
}

export default App;
