import BookList from "../components/BookList";
import ImageBanner from "../components/ImageBannner";

function Home() {
  return (
    <div className="xl:container w-full p-3 mx-auto ">
      <ImageBanner />
      <BookList />
    </div>
  );
}

export default Home;
