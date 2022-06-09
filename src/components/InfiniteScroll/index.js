export default function InfiniteScroll(props) {
  window.onscroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      if(props.nextListUrl) {
        props.fetchNextPage();
      }
    }
  }

  return (
    <>
      <hr />
      <div className="text-center p-3 bg-[#333] rounded text-white mt-5">
        {props.isLoading ? "LOADING DATA..." : "CLICK TO LOAD MORE"}
      </div>
    </>
  );
}
