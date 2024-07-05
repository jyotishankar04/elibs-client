import BookList from "../components/BookList";
import ImageBanner from "../components/ImageBannner";

function Home() {
  return (
    <div className="container mx-auto ">
      <ImageBanner />
      <BookList />
    </div>
  );
}

export default Home;
