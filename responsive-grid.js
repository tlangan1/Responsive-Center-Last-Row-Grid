var targetSelector = "div.grid-wrapper.indeterminate-number-of-columns";
var indeterminateGrid = document.querySelector(
  ".grid-wrapper.indeterminate-number-of-columns"
);

// var resizeObserver = new ResizeObserver(function (entries) {
//   for (let entry of entries) {
//     if (entry.target.matches(targetSelector)) {
//       var gridColumns = getComputedStyle(indeterminateGrid).getPropertyValue(
//         "grid-template-columns"
//       );
//       var gridColumnCount = gridColumns.split(" ").length;
//       var gridItemCount = indeterminateGrid.childElementCount;

//       if (gridItemCount % gridColumnCount != 0) {
//         console.log("We got orphans");
//         var lastRowItemCount = gridItemCount % gridColumnCount;
//         var indeterminateGridColumnCount =
//           gridColumnCount * (gridColumnCount - 1);
//         indeterminateGrid.style.gridTemplateColumns = `repeat(${indeterminateGridColumnCount}, 1fr)`;
//       } else {
//         console.log("No orphans...nothing to do");
//       }
//     }
//   }
// });

var resizeObserver = new ResizeObserver(function (entries) {
  for (let entry of entries) {
    if (entry.target.matches(targetSelector)) {
      var gridStyles = window.getComputedStyle(indeterminateGrid);
      var minimumColumnWidth = gridStyles.getPropertyValue(
        "--minimum-grid-column-width"
      );
      var gridGap = gridStyles.getPropertyValue("--grid-gap");

      var currentGridWidth = entry.borderBoxSize[0].inlineSize;
      //   var currentGridHeight = entry.borderBoxSize[0].blockSize;
      calculatedColumnCount = Math.floor(
        currentGridWidth / parseInt(minimumColumnWidth)
      );
      console.log(
        "Maximum number of columns is calculated to be",
        calculatedColumnCount
      );
      indeterminateGrid.style.setProperty(
        "grid-template-columns",
        `repeat(${calculatedColumnCount}, 1fr)`
      );

      var gridItemCount = indeterminateGrid.childElementCount;

      if (gridItemCount % calculatedColumnCount != 0) {
        console.log("We got orphans");
        var lastRowItemCount = gridItemCount % calculatedColumnCount;

        var ele = indeterminateGrid.querySelector(
          `div:nth-last-child(${lastRowItemCount}):nth-child(${calculatedColumnCount}n + ${lastRowItemCount})`
        );

        ele.style.setProperty(
          "grid-column",
          `span ${calculatedColumnCount / 1}`
        );
      } else {
        console.log("No orphans...nothing to do");
      }
    }
  }
});

resizeObserver.observe(indeterminateGrid);
