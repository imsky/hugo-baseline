// Add copy buttons to code blocks
document.addEventListener('DOMContentLoaded', function() {
  // Find all code blocks
  const codeBlocks = document.querySelectorAll('.highlight');

  codeBlocks.forEach(function(codeBlock) {
    // Create copy button
    const button = document.createElement('button');
    button.className = 'copy-code-button';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.innerHTML = `
      <svg class="copy-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <path d="M3 10.5V3.5C3 2.67157 3.67157 2 4.5 2H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <span class="copy-text">Copy</span>
    `;

    // Add button to code block
    codeBlock.style.position = 'relative';
    codeBlock.insertBefore(button, codeBlock.firstChild);

    // Get the code content
    const getCodeContent = function() {
      // Try to find code in table structure (with line numbers)
      const codeTable = codeBlock.querySelector('table');
      if (codeTable) {
        // Get the second column which contains the actual code
        const codeCell = codeTable.querySelector('td:last-child');
        if (codeCell) {
          return codeCell.textContent;
        }
      }

      // Fallback: get code from pre > code
      const code = codeBlock.querySelector('code');
      return code ? code.textContent : '';
    };

    // Copy functionality
    button.addEventListener('click', function() {
      const code = getCodeContent();

      // Copy to clipboard
      navigator.clipboard.writeText(code).then(function() {
        // Success feedback
        button.classList.add('copied');
        button.innerHTML = `
          <svg class="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8L6.5 11.5L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="copy-text">Copied!</span>
        `;

        // Reset after 2 seconds
        setTimeout(function() {
          button.classList.remove('copied');
          button.innerHTML = `
            <svg class="copy-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
              <path d="M3 10.5V3.5C3 2.67157 3.67157 2 4.5 2H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span class="copy-text">Copy</span>
          `;
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy code:', err);
      });
    });
  });
});
