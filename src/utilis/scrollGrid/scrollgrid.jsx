let currentColumn = 0; // Which column (0-6) is at left edge
let scrollBy;
let lastKnownColumnWidth = getColWidth();

// Calculate column width dynamically
function getColWidth() {
  return window.innerWidth * 0.8; // 80vw
}

// Update current column tracking
function updateCurrentColumn(gridContainer) {
  // Use LAST known column width for consistency
  currentColumn = Math.floor(gridContainer.scrollLeft / lastKnownColumnWidth);
}

function updateButtons(
  gridContainer,
  updateScrollStartStatus,
  updateScrollEndStatus,
  scrollEndStatus,
) {
  const currentScroll = gridContainer.scrollLeft;
  const containerWidth = gridContainer.clientWidth;
  const contentWidth = gridContainer.scrollWidth;
  const maxScroll = contentWidth - containerWidth;
  // Disable left button if at the start
  if (gridContainer.scrollLeft <= 0) {
    updateScrollStartStatus(true);
  } else {
    updateScrollStartStatus(false);
  }

  // Disable right button if at the end
  // scrollWidth = total content width
  // clientWidth = visible width
  if (currentScroll >= maxScroll - 1) {
    updateScrollEndStatus(true);
  } else {
    updateScrollEndStatus(false);
  }
}

export default function scrollGrid(
  gridContainer,
  direction,
  updateScrollStartStatus,
  updateScrollEndStatus,
  scrollEndStatus,
) {
  const viewport = window.innerWidth;
  // Update with current column width BEFORE scroll
  lastKnownColumnWidth = getColWidth();
  updateCurrentColumn(gridContainer);

  // Scroll by 90vw
  if (viewport <= 768) {
    scrollBy = window.innerWidth * 0.82;
  } else if (viewport >= 1024) {
    scrollBy = window.innerWidth * 0.77;
  } else {
    scrollBy = window.innerWidth * 0.84;
  }
  gridContainer.scrollLeft += direction === "right" ? scrollBy : -scrollBy;

  // Update current column after scroll
  currentColumn = Math.floor(gridContainer.scrollLeft / getColWidth());

  updateButtons(
    gridContainer,
    updateScrollStartStatus,
    updateScrollEndStatus,
    scrollEndStatus,
  ); // Update button states after scrolling
}

export { getColWidth, updateButtons };
