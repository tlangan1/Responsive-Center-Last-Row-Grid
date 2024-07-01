"use strict";

/* *** Instructions *** */
// Write the code to move the grid items in the bottom row of the
// main grid to the overflow grid if the main grid has more than one
// row and the last row of the main grid is not full.
// Initially, execute this on page load and then bundle it so it can
// be used when the window is resized.

// If the last row of the main grid is not full, then execute the
// following steps:
// Remove the grid items from the last row of the main grid and
// place them in the overflow grid.

const targetSelector = "div.grid-wrapper.main-grid";

// Determine the number of grid items per row
const gridWrapper = document.querySelector(targetSelector);
// var gridNodes = gridWrapper.childNodes;
var gridItems = [...gridWrapper.querySelectorAll("div")];
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

  const overflowGrid = document.querySelector("div.grid-wrapper.overflow-grid");
  const lastRowGridItems = gridItems.slice(-bottomRowItemCount);
  lastRowGridItems.forEach((gridItem, index) => {
    overflowGrid.appendChild(gridItem);
  });
}
