const targetSelector = "div.grid-wrapper.indeterminate-number-of-columns";
var indeterminateGrid = document.querySelector(targetSelector);

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
        var lastRowItemCount = gridItemCount % calculatedColumnCount;
        console.log(
          `We have ${lastRowItemCount} un-centered grid item${
            lastRowItemCount > 1 ? "s" : ""
          } in the last row.`
        );

        /* *** Set the number of columns of the grid-container to calculatedColumnCount! *** */
        var columnsRequired = factorial(calculatedColumnCount);

        indeterminateGrid.style.setProperty(
          "grid-template-columns",
          `repeat(${columnsRequired}, 1fr)`
        );

        /* *** set the grid-column span of the grid-container to (calculatedColumnCount - 1) *** */
        indeterminateGrid.querySelectorAll("div").forEach((element) => {
          element.style.setProperty(
            "grid-column",
            `span ${columnsRequired / calculatedColumnCount}`
          );
        });

        // var ele = indeterminateGrid.querySelectorAll(
        //   `div:nth-last-child(${lastRowItemCount}):nth-child(${calculatedColumnCount}n + 1), div:nth-last-child(${lastRowItemCount}):nth-child(${calculatedColumnCount}n + 1) ~ div`
        // );
        // var ele = document.querySelector(
        //   `.grid-wrapper.indeterminate-number-of-columns > div:nth-last-child(${lastRowItemCount}):nth-child(${calculatedColumnCount}n + 1)`
        // );
        indeterminateGrid
          .querySelectorAll(
            `div:nth-last-child(${lastRowItemCount}):nth-child(${calculatedColumnCount}n + 1), div:nth-last-child(${lastRowItemCount}):nth-child(${calculatedColumnCount}n + 1) ~ div`
          )
          .forEach((element) => {
            element.style.setProperty(
              "grid-column",
              `span ${columnsRequired / lastRowItemCount}`
            );
          });
        // ele.style.setProperty(
        //   "grid-column",
        //   `span ${columnsRequired / lastRowItemCount}`
        // );

        console.log("Completed the resizing");
      } else {
        console.log("No orphans...nothing to do");
      }
    }
  }
});

function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

resizeObserver.observe(indeterminateGrid);
