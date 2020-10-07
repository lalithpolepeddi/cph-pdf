import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf'; 
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import './App.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function App() {
  const [pdf, setPdf] = useState(null);
  const [startPageNumber, setStartPageNumber] = useState(null);
  const [endPageNumber, setEndPageNumber] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.5);

  useEffect(() => {
    setPdf('/nrel.pdf')
    setStartPageNumber(17);
    setEndPageNumber(20);
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <div className="header">
        <p><strong>Read</strong>: Variable Renewable Energy Grid Integration Studies: A Guidebook for Practitioners</p>
      </div>
      <div className="pdf">
        <Document
          file={pdf}
          width={500}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(
            new Array(endPageNumber - startPageNumber),
            (el, index) => (
              <Page
                key={`page_${startPageNumber + index}`}
                pageNumber={startPageNumber + index}
                scale={scale}
              />
            ),
          )}
        </Document>
      </div>
      <div className="footer">
        <p>Read pages 10-12</p>
        <div className="controls">
          <button
            onClick={() => {
              setScale(scale + 0.5)
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              setScale(scale - 0.5)
            }}
          >
            -
          </button>
        </div>        
      </div>
    </>
  );
}

export default App;
