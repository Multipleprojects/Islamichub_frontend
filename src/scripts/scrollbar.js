export const adjustScrollbar = (scrollBar, props, nextProps) => {
  if (Number(nextProps.highlight.highlight.toString().split(".")[0]) < Number(props.highlight.highlight.toString().split(".")[0])) {
    //console.log(Number(nextProps.highlight.highlight.toString().split(".")[0]), ' nextProps.highlight.highlight')
    //console.log(Number(props.highlight.highlight.toString().split(".")[0]), ' props.highlight.highlight')
    let scrollValue = scrollBar.getScrollValues().scrollTop;
    
    const ayahDiv = document.getElementById("ayah_".concat(props.highlight.highlight.toString().split(".")[0]));
    const transDiv = document.getElementById("trans_ayah_".concat(props.highlight.highlight.toString().split(".")[0]));

    const ayahDivHeight = ayahDiv !== null ? ayahDiv.offsetHeight : 0;
    const transDivHeight = transDiv !== null ? transDiv.offsetHeight : 0;
    console.log(ayahDivHeight, ' ayahDivHeight')
    scrollValue += ayahDivHeight + transDivHeight;
    console.log(scrollValue, ' scrollValue')
    scrollBar.scrollTo(scrollValue);
  }
  if (Number(nextProps.highlight.highlight.toString().split(".")[0]) > Number(props.highlight.highlight.toString().split(".")[0])) {
    scrollBar.scrollTo(0);
  }
};

export const scrollAayat = (scrollBar, aayatNumber) => {
  if(aayatNumber){
    let element = document.getElementById("ayah_".concat(aayatNumber));
    console.log(scrollBar, ' scrollBar')
    let scrollValue = scrollBar.getScrollValues().scrollTop;
    if(element !== null){
      const rect = element.getBoundingClientRect(); // Get the position and dimensions of the element
      scrollValue += (rect.top + window.screen.height); // Calculate the position from the top of the viewport
      console.log('Position from top:', scrollValue);
      //this.scrollBar
      scrollBar.scrollTo(scrollValue);
    }
  }
}
