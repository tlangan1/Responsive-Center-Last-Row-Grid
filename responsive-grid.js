var targetSelector = "div.grid-wrapper.indeterminate-number-of-columns";
var indeterminateGrid = document.querySelector(
  ".grid-wrapper.indeterminate-number-of-columns"
);

var resizeObserver = new ResizeObserver(function (entries) {
  for (let entry of entries) {
    if (entry.target.matches(targetSelector)) {
      var gridColumns = getComputedStyle(indeterminateGrid).getPropertyValue(
        "grid-template-columns"
      );
      var gridColumnCount = gridColumns.split(" ").length;
      var gridItemCount = indeterminateGrid.childElementCount;

      if (gridItemCount % gridColumnCount != 0) {
        console.log("We got orphans");
        var lastRowItemCount = gridItemCount % gridColumnCount;
        var indeterminateGridColumnCount =
          gridColumnCount * (gridColumnCount - 1);
      } else {
        console.log("No orphans...nothing to do");
      }
    }
  }
});

resizeObserver.observe(indeterminateGrid);
