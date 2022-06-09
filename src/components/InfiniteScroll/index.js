export default function InfiniteScroll(props) {
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (props.nextListUrl) {
        props.fetchNextPage();
      }
    }
  };

  return (
    <>
      <hr />
      {props.nextListUrl && (
        <div className="text-center p-3 bg-[#333] rounded text-white mt-5">
          {props.isLoading
            ? "LOADING DATA..."
            : "IF YOU CAN READ THIS, THERE IS SOMETHING WRONG WITH OUR INFINITE SCROLL"}
        </div>
      )}
    </>
  );
}
