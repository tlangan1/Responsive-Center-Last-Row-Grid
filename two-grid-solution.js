"use strict";

// The centering process works as follows:
// The centering process does nothing if the bottom row of the main grid is full
// or the main grid has only one row. If neither of these conditions apply then
// move the grid items in the bottom row of the main grid to the overflow grid.
//
// When the main grid is resized move the grid items from the overflow grid
// back to the main grid and re-execute the centering process.

const targetSelector = "div.grid-wrapper.main-grid";

// Determine the number of grid items per row
const mainGridWrapper = document.querySelector(targetSelector);
const overflowGrid = document.querySelector("div.grid-wrapper.overflow-grid");

centeringProcess();

var resizeObserver = new ResizeObserver(function (entries) {
  for (let entry of entries) {
    if (entry.target.matches(targetSelector)) {
      centeringProcess();
    }
  }
});

resizeObserver.observe(mainGridWrapper);

/* *** Helper functions for the code above *** */

function centeringProcess() {
  if (overflowGrid.childNodes.length > 0) {
    console.log(
      "Move the grid items from the overflow grid back to the main grid."
    );
    const overflowGridItems = [...overflowGrid.querySelectorAll("div")];
    overflowGridItems.forEach((gridItem, index) => {
      mainGridWrapper.appendChild(gridItem);
    });
  }

  var gridItems = [...mainGridWrapper.querySelectorAll("div")];
  const gridItemTop = gridItems[0].getBoundingClientRect().top;
  const columnCount = gridItems.filter((gridItem, index) =>
    gridItem.getBoundingClientRect().top == gridItemTop ? true : false
  ).length;

  const bottomRowItemCount = gridItems.length % columnCount;

  if (bottomRowItemCount == 0) {
    console.log("nothing to do...the bottom row is full");
  } else {
    console.log(
      "Move the grid items from the bottom row of the main into the overflow grid."
    );

    // const gridItemWidth = gridItems[0].getBoundingClientRect().width;

    const overflowGrid = document.querySelector(
      "div.grid-wrapper.overflow-grid"
    );
    const lastRowGridItems = gridItems.slice(-bottomRowItemCount);
    lastRowGridItems.forEach((gridItem, index) => {
      overflowGrid.appendChild(gridItem);
    });
  }
}
