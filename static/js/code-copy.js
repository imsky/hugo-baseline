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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
          <span class="copy-text">Copied!</span>
        `;

        // Reset after 2 seconds
        setTimeout(function() {
          button.classList.remove('copied');
          button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            <span class="copy-text">Copy</span>
          `;
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy code:', err);
      });
    });
  });
});
