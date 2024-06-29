const flexJustifyContentValue = document.getElementById(
  "flexJustifyContentValue"
);
const flexWrapper = document.querySelector(".flex-wrapper");

setFlexJustifyContentValue();

flexJustifyContentValue.addEventListener("change", setFlexJustifyContentValue);

function setFlexJustifyContentValue() {
  flexWrapper.style.justifyContent = flexJustifyContentValue.value;
}
