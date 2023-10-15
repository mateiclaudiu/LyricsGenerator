import React from 'react';
import PptxGenJS from 'pptxgenjs';

const PowerPointExport = ({ text }) => {
    const exportToPowerpoint = () => {
        if (!text.trim()) {
            console.error('No text provided for the export.');
            return;
        }

        const pptx = new PptxGenJS();
        const slidesContent = text.split('\n\n');

        // Define a slide master with the background color and text color you want
        pptx.defineSlideMaster({
            title: 'LYRIC_SLIDE',
            objects: [
                { 'rect': { x: 0.0, y: 0.0, w: '100%', h: '100%', fill: '000000' } }, // black background
            ],
            slideNumber: { color: 'FFFFFF' }, // white slide number, if used
        });

        slidesContent.forEach((slideText) => {
            // Use the master layout for the slides
            const slide = pptx.addSlide({ masterName: 'LYRIC_SLIDE' });

            // Here, we'll implement a basic strategy to estimate the best font size.
            // This strategy is simplistic and you might need a more complex one based on actual text metrics.
            let fontSize = 100; // Start with a large font size
            const lines = slideText.split('\n');
            lines.forEach((line) => {
                // Calculate the reduction factor based on the line length, adjust the values as necessary
                const reductionFactor = Math.max(line.length / 20, 1); // assuming 20 is the max length to fit the width at fontSize 100
                fontSize = Math.min(fontSize, 100 / reductionFactor); // adjust fontSize based on longest line
            });
            fontSize = Math.max(fontSize, 18); // Minimum font size, for readability

            // Add text box with specific formatting
            slide.addText(
                lines.join('\n'), // Keep line breaks
                {
                    x: 0,  // X position
                    y: 0,  // Y position
                    w: '100%', // width of the text box (100% of the slide)
                    h: '100%', // height of the text box (100% of the slide)
                    margin: 0, // No margin to utilize the whole area
                    fontSize: fontSize, // dynamic font size based on calculations
                    color: 'FFFFFF', // text color: white
                    align: 'center', // horizontally center-aligned
                    valign: 'middle', // vertically middle-aligned
                    isTextBox: true, // specifies that it's a text box, allowing for background formatting, etc.
                    autoFit: { multiLine: true, size: false, shrinkText: false, verticalAlign: 'middle', wrap: true }, // enables the auto-fit feature
                }
            );
        });

        pptx.writeFile({ fileName: 'LyricsPresentation.pptx' });
    };

    return (
        <button onClick={exportToPowerpoint}>
            Export to PowerPoint
        </button>
    );
};

export default PowerPointExport;
